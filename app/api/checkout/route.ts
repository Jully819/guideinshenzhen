import { NextResponse } from "next/server";
import { isSlotAvailable, calConfigured } from "@/lib/cal";
import { stripe, siteUrl } from "@/lib/stripe";
import { getTour, getDuration, business, policy } from "@/lib/content";
import { quote, PricingError } from "@/lib/pricing";
import { SHENZHEN_TZ, formatDateLong, formatTime } from "@/lib/tz";

/**
 * Same wall-clock time, `n` days later.
 *
 * Plain 24h arithmetic is exact here ONLY because Shenzhen runs a single UTC+8
 * offset all year with no daylight saving. Do not lift this helper into a
 * codebase that books in a DST zone — there, adding 86,400,000ms across a
 * transition lands an hour out.
 */
function addDays(iso: string, n: number): string {
  return new Date(Date.parse(iso) + n * 86_400_000).toISOString();
}

export const dynamic = "force-dynamic";

interface CheckoutBody {
  tour: string;
  hours: number;
  guests: number;
  days: number;
  startIso: string;
  name: string;
  email: string;
  guestTimeZone: string;
  phone?: string;
  pickup?: string;
  flightNumber?: string;
  purpose?: string;
  notes?: string;
}

function bad(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/**
 * POST /api/checkout
 *
 * Re-checks the slot, prices the selection, and opens a Stripe Checkout
 * session for the FULL amount. The booking is NOT created here — the webhook
 * creates it once payment succeeds, so an abandoned checkout never consumes a
 * slot.
 *
 * THE PRICE IS NEVER TAKEN FROM THE REQUEST. The body carries what was chosen;
 * `quote()` decides what it costs. A client that could post an amount could
 * post an amount of zero.
 */
export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return bad("Malformed request");
  }

  const tour = getTour(body.tour);
  if (!tour) return bad("Unknown tour");

  const duration = getDuration(Number(body.hours));
  if (!duration) return bad("Unknown duration");

  // Defaults to 1 so an older client that does not send `days` still works.
  const days = body.days === undefined ? 1 : Number(body.days);

  if (!body.startIso || Number.isNaN(Date.parse(body.startIso))) {
    return bad("A valid start time is required");
  }
  if (Date.parse(body.startIso) < Date.now()) {
    return bad("That time has already passed");
  }
  if (!body.name?.trim()) return bad("Your name is required");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email ?? "")) {
    return bad("A valid email is required");
  }

  let priced;
  try {
    priced = quote(tour, duration.hours, Number(body.guests), days);
  } catch (error) {
    if (error instanceof PricingError) return bad(error.message);
    throw error;
  }

  const guestTimeZone = body.guestTimeZone || SHENZHEN_TZ;

  try {
    // Last check before we take money. Closes most — not all — of the race.
    // Skipped when Cal.com is not configured, which can only happen outside
    // production: /api/availability refuses to serve mock slots there.
    if (calConfigured()) {
      // EVERY day in the run, not just the first. A multi-day trip is only
      // sellable if the whole run is free — taking money for day one and
      // discovering day three is gone leaves the customer with half a trip and
      // us owing a partial refund. The message names the day that failed so
      // they can shorten the booking rather than guess.
      for (let i = 0; i < days; i++) {
        const dayStart = addDays(body.startIso, i);
        const stillFree = await isSlotAvailable(dayStart, duration.minutes);
        if (!stillFree) {
          return NextResponse.json(
            {
              error: "slot_taken",
              message:
                days === 1
                  ? "That time was just booked. Choose another and nothing is charged."
                  : `Day ${i + 1} of ${days} (${formatDateLong(new Date(dayStart), SHENZHEN_TZ)}) is not free at that time. Nothing has been charged — try fewer days or another start date.`,
            },
            { status: 409 },
          );
        }
      }
    }

    const start = new Date(body.startIso);
    const when = `${formatDateLong(start, SHENZHEN_TZ)}, ${formatTime(start, SHENZHEN_TZ)} Shenzhen time`;

    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      customer_email: body.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: priced.currency,
            unit_amount: priced.total,
            product_data: {
              name:
                days > 1
                  ? `${tour.name} — ${duration.label.toLowerCase()} × ${days} days`
                  : `${tour.name} — ${duration.label.toLowerCase()}`,
              description: `${when}. ${body.guests} guest${Number(body.guests) === 1 ? "" : "s"}. Free cancellation up to ${policy.cancellationHours} hours before.`,
            },
          },
        },
      ],
      success_url: `${siteUrl()}/book/confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl()}/book?tour=${tour.slug}&hours=${duration.hours}&cancelled=1`,
      // Everything the webhook needs to create the booking. Stripe caps values
      // at 500 chars, so free text is truncated rather than dropped.
      metadata: {
        tour: tour.slug,
        hours: String(duration.hours),
        minutes: String(duration.minutes),
        days: String(days),
        startIso: start.toISOString(),
        name: body.name.slice(0, 300),
        email: body.email.slice(0, 300),
        guestTimeZone,
        guests: String(body.guests ?? "").slice(0, 20),
        phone: (body.phone ?? "").slice(0, 40),
        pickup: (body.pickup ?? "").slice(0, 300),
        flightNumber: (body.flightNumber ?? "").slice(0, 40),
        purpose: (body.purpose ?? "").slice(0, 500),
        notes: (body.notes ?? "").slice(0, 500),
      },
      payment_intent_data: {
        description: `${business.name} — ${tour.name}, ${duration.label.toLowerCase()}`,
      },
    });

    if (!session.url) throw new Error("Stripe returned no checkout URL");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json(
      { error: "Could not start checkout. Nothing has been charged." },
      { status: 502 },
    );
  }
}
