import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, webhookSecret } from "@/lib/stripe";
import {
  cancelBooking,
  createBooking,
  findBookingByStripeSession,
  isSlotAvailable,
  CalError,
} from "@/lib/cal";
import { MAX_DAYS, getTour, getDuration } from "@/lib/content";

/**
 * First-line dedupe guard. Survives only as long as the process does, which on
 * serverless means "until the next cold start" — so it is a cheap fast path,
 * NOT the guarantee. The Cal.com metadata lookup below is the real check, and
 * a database is the right answer at any real volume.
 */
const processedSessions = new Set<string>();

export const dynamic = "force-dynamic";
// Signature verification needs the raw body, so this route must not run on the
// edge runtime and must never parse the body before verifying.
export const runtime = "nodejs";

/**
 * POST /api/stripe/webhook
 *
 * The source of truth for bookings. Payment succeeding is what creates the
 * Cal.com booking — not the browser returning to the success page, which a
 * guest can close.
 *
 * IDEMPOTENCY: Stripe retries failed deliveries, and will send the same event
 * more than once. We key on the Checkout Session id, stored in Cal.com booking
 * metadata as `stripeSessionId`, and look it up before creating anything.
 *
 * NOTE FOR PRODUCTION: that lookup is the only dedupe mechanism, and it costs a
 * round trip. If you add a database later, write a `processed_stripe_events`
 * row keyed on `event.id` and check that first — it is both cheaper and
 * stricter. Documented in README.md.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const raw = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(raw, signature, webhookSecret());
  } catch (error) {
    console.error("[webhook] signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Only act on genuinely paid sessions.
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true, skipped: "unpaid" });
  }

  const meta = session.metadata ?? {};
  const tour = getTour(meta.tour ?? "");
  const duration = getDuration(Number(meta.hours));
  const startIso = meta.startIso;

  /**
   * Days in the run. Clamped rather than trusted: this metadata is echoed back
   * by Stripe and a malformed or absent value must not turn into a loop that
   * creates hundreds of bookings. Absent means 1, which is also what a session
   * created before multi-day existed will look like.
   */
  const days = Math.min(
    Math.max(Number.parseInt(meta.days ?? "1", 10) || 1, 1),
    MAX_DAYS,
  );

  if (!tour || !duration || !startIso) {
    console.error("[webhook] session missing metadata", session.id, meta);
    // 200 on purpose: retrying will not fix malformed metadata, and we do not
    // want Stripe hammering this endpoint. Surfaced via logs instead.
    return NextResponse.json({ received: true, error: "bad metadata" });
  }

  // --- Idempotency -------------------------------------------------------
  // Stripe retries, and will deliver the same event more than once.
  if (processedSessions.has(session.id)) {
    return NextResponse.json({ received: true, deduped: "memory" });
  }

  const existing = await findBookingByStripeSession(session.id);
  if (existing) {
    processedSessions.add(session.id);
    return NextResponse.json({ received: true, bookingUid: existing.uid });
  }

  // --- The race we cannot fully close ------------------------------------
  // Cal.com has no slot-hold API, so the slot could have gone while the guest
  // was in Checkout. If it has, refund immediately rather than take money for
  // a booking we cannot honour. This matters more under full prepayment than
  // it did under a deposit: the sum being held is the whole price of the day.
  // A multi-day trip re-checks every day, for the same reason /api/checkout
  // does: half a trip is worse than none.
  try {
    for (let i = 0; i < days; i++) {
      const stillFree = await isSlotAvailable(addDays(startIso, i), duration.minutes);
      if (!stillFree) {
        await refund(session, "slot_unavailable");
        processedSessions.add(session.id);
        console.error(
          `[webhook] day ${i + 1}/${days} taken during checkout, refunded`,
          session.id,
        );
        return NextResponse.json({ received: true, refunded: true });
      }
    }
  } catch (error) {
    // If the availability check itself fails, prefer attempting the booking
    // over refunding a guest who probably has a valid slot.
    console.error("[webhook] availability re-check failed, continuing", error);
  }

  // --- Create the bookings ------------------------------------------------
  //
  // ONE BOOKING PER DAY, ALL OR NOTHING. Cal.com has no transaction, so a
  // failure on day three leaves days one and two standing against a payment
  // that is about to be refunded. Those two would block slots nobody had paid
  // for, so anything already created is cancelled before the refund goes out.
  //
  // Only the FIRST booking carries `stripeSessionId`. That key is what makes
  // this handler idempotent — findBookingByStripeSession above looks it up on
  // every Stripe retry — and stamping it on all N would make the lookup return
  // an arbitrary one of them. The rest carry `runId` so a human can find the
  // whole set.
  const created: string[] = [];
  try {
    for (let i = 0; i < days; i++) {
      const booking = await createBooking({
        startIso: addDays(startIso, i),
        duration: duration.minutes,
        attendee: {
          name: meta.name || "Guest",
          email: meta.email || session.customer_email || "",
          timeZone: meta.guestTimeZone || "Asia/Shanghai",
          ...(meta.phone ? { phoneNumber: meta.phone } : {}),
        },
        metadata: {
          ...(i === 0 ? { stripeSessionId: session.id } : {}),
          runId: session.id,
          dayNumber: String(i + 1),
          ofDays: String(days),
          stripePaymentIntent: String(session.payment_intent ?? ""),
          tour: tour.slug,
          hours: String(duration.hours),
          guests: meta.guests ?? "",
          pickup: meta.pickup ?? "",
          flightNumber: meta.flightNumber ?? "",
          purpose: meta.purpose ?? "",
          // Only on day one: it is the whole payment, not this day's share, and
          // repeating it per day would read as N separate charges on /manage.
          ...(i === 0 ? { amountPaid: String(session.amount_total ?? "") } : {}),
        },
        notes: meta.notes || undefined,
      });
      created.push(booking.uid);
    }

    processedSessions.add(session.id);
    return NextResponse.json({ received: true, bookingUids: created });
  } catch (error) {
    console.error(
      `[webhook] booking creation failed on day ${created.length + 1}/${days}`,
      error,
    );

    // Cal.com rejected it outright (bad request) — retrying won't help, so roll
    // back, refund, and return 200. Transient failures get a 500 so Stripe
    // retries; the partial run is still rolled back first so the retry starts
    // from a clean slate rather than double-booking the days that succeeded.
    for (const uid of created) {
      await cancelBooking(uid, "Could not complete the multi-day booking");
    }

    if (error instanceof CalError && error.status >= 400 && error.status < 500) {
      await refund(session, "booking_failed");
      processedSessions.add(session.id);
      return NextResponse.json({ received: true, refunded: true });
    }

    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}

/**
 * Same wall-clock time, `n` days later. Exact only because Shenzhen has no
 * daylight saving — see the twin of this helper in /api/checkout.
 */
function addDays(iso: string, n: number): string {
  return new Date(Date.parse(iso) + n * 86_400_000).toISOString();
}

async function refund(session: Stripe.Checkout.Session, reason: string) {
  const paymentIntent = session.payment_intent;
  if (!paymentIntent) return;
  try {
    await stripe().refunds.create({
      payment_intent: String(paymentIntent),
      metadata: { reason },
    });
  } catch (error) {
    // A failed refund must be visible — this is money owed to a guest.
    console.error("[webhook] REFUND FAILED, manual action required", session.id, error);
  }
}
