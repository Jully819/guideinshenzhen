import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { business } from "@/lib/content";

/**
 * Trip inquiries from /inquiry.
 *
 * SAME TRANSPORT AND SAME HONESTY AS /api/message. It posts to a webhook and
 * says plainly whether that worked; with nothing configured it answers 503
 * `no-transport` and the form shows the direct channels instead of a
 * confirmation. An inquiry silently dropped is worse than a contact form
 * silently dropped — this one is somebody planning a trip around the reply.
 *
 * INQUIRY_WEBHOOK_URL first, MESSAGES_WEBHOOK_URL as the fallback, so a small
 * operation can point both at one Slack channel and a larger one can route
 * quote requests somewhere they will not be lost among general questions.
 *
 * VALIDATION IS DELIBERATELY THIN. Everything except name, email and trip type
 * is optional, because a half-filled inquiry from someone who gave up on
 * question four is still a lead worth answering. The one thing worth being
 * strict about is the address the reply goes to.
 */

const MAX_PER_WINDOW = 4;
const WINDOW_MS = 15 * 60 * 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Anything longer than this is being pasted by a bot, not typed by a guest. */
const LIMITS = {
  short: 120,
  long: 2000,
  list: 20,
} as const;

export async function POST(request: Request) {
  const limit = rateLimit(
    `inquiry:${clientKey(request.headers)}`,
    MAX_PER_WINDOW,
    WINDOW_MS,
  );
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "Too many inquiries from this connection. Try again shortly.",
        code: "rate-limited",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed request.", code: "bad-request" },
      { status: 400 },
    );
  }

  // Honeypot: answer 200 so a script learns nothing from being caught.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const name = str(body.name, LIMITS.short);
  const email = str(body.email, LIMITS.short);

  if (!name) {
    return NextResponse.json(
      { error: "A name is needed so we know who we are writing to.", code: "incomplete" },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      {
        error: "That email does not look right — it is where the quote goes.",
        code: "bad-email",
      },
      { status: 400 },
    );
  }

  const inquiry = {
    name,
    email,
    whatsapp: str(body.whatsapp, LIMITS.short),
    organisation: str(body.organisation, LIMITS.short),
    tripType: str(body.tripType, 40),
    startDate: str(body.startDate, 40),
    days: str(body.days, 20),
    travellers: str(body.travellers, 20),
    languages: str(body.languages, LIMITS.short),
    interests: list(body.interests),
    pace: str(body.pace, 40),
    pickup: str(body.pickup, LIMITS.short),
    dietary: str(body.dietary, LIMITS.short),
    notes: str(body.notes, LIMITS.long),
    receivedAt: new Date().toISOString(),
  };

  const webhook =
    process.env.INQUIRY_WEBHOOK_URL || process.env.MESSAGES_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      `[inquiry] No INQUIRY_WEBHOOK_URL or MESSAGES_WEBHOOK_URL set — nothing was delivered.\n` +
        JSON.stringify(inquiry, null, 2),
    );
    return NextResponse.json(
      { error: "The inquiry form is not connected yet.", code: "no-transport" },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: asText(inquiry), ...inquiry }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error(`[inquiry] webhook rejected: ${response.status}`);
      return NextResponse.json(
        { error: "The inquiry could not be delivered.", code: "undelivered" },
        { status: 502 },
      );
    }
  } catch (error) {
    // The inquiry body is not logged here — this path fires on every request
    // while a webhook is down, and the log would fill with trip plans and
    // contact details nobody is guarding.
    console.error("[inquiry] webhook failed", error);
    return NextResponse.json(
      { error: "The inquiry could not be delivered.", code: "undelivered" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}

/**
 * Pre-formatted for Slack and Discord, which render `text` directly. Written
 * as the person answering would want to read it: who and how to reach them
 * first, then the trip, then whatever they typed themselves last — that last
 * line is usually the one that decides the quote.
 */
function asText(i: Record<string, unknown>): string {
  const line = (label: string, value: unknown) =>
    value && String(value).length ? `${label}: ${value}\n` : "";

  return (
    `New trip inquiry — ${business.name}\n\n` +
    line("From", `${i.name} <${i.email}>`) +
    line("WhatsApp/WeChat", i.whatsapp) +
    line("Company", i.organisation) +
    `\n` +
    line("Trip type", i.tripType) +
    line("Starting", i.startDate) +
    line("Days", i.days) +
    line("Travellers", i.travellers) +
    line("Languages", i.languages) +
    line("Interests", Array.isArray(i.interests) ? i.interests.join(", ") : "") +
    line("Pace", i.pace) +
    line("Pickup", i.pickup) +
    line("Dietary", i.dietary) +
    (i.notes ? `\nIn their words:\n${i.notes}\n` : "")
  );
}

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function list(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .slice(0, LIMITS.list)
    .map((v) => v.trim().slice(0, LIMITS.short));
}
