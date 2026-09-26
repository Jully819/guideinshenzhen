import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { business } from "@/lib/content";

/**
 * Messages from the chat widget (components/chat-widget.tsx).
 *
 * THERE IS NO CHAT SERVER, AND THE WIDGET DOES NOT PRETEND THERE IS. Nobody is
 * sitting at the other end of a socket. This endpoint takes one message, hands
 * it to whatever transport is configured, and says plainly whether that
 * worked. The widget's copy promises a reply by email, never "someone will be
 * with you shortly".
 *
 * TRANSPORT IS A WEBHOOK, ON PURPOSE. `MESSAGES_WEBHOOK_URL` accepts anything
 * that takes a JSON POST — a Slack or Discord incoming webhook, Zapier, n8n, a
 * mail-sending function. That keeps an email provider, an API key and a
 * deliverability problem out of this codebase for the sake of one form. Point
 * it at whatever the business already reads.
 *
 * WITH NO TRANSPORT SET IT FAILS LOUDLY. It returns 503 with `no-transport`
 * and the widget switches to WhatsApp and email links. The one thing this must
 * never do is accept a message, drop it, and show a tick — a visitor who
 * believes they have been in touch and hears nothing back is worse off than
 * one who was told to send an email.
 */

const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;

const LIMITS = {
  name: 80,
  email: 200,
  message: 2000,
} as const;

/** Deliberately loose. Real validation is the reply bouncing or not. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Payload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot. Named to look like a field a bot would want to fill. */
  company?: unknown;
  /** Which page the visitor was on. Context for whoever answers. */
  page?: unknown;
}

export async function POST(request: Request) {
  const limit = rateLimit(
    `message:${clientKey(request.headers)}`,
    MAX_PER_WINDOW,
    WINDOW_MS,
  );
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: "Too many messages from this connection. Try again shortly.",
        code: "rate-limited",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed request.", code: "bad-request" },
      { status: 400 },
    );
  }

  // Honeypot. A human never sees this field, so anything in it is a bot.
  // Answer 200 rather than 400: telling a script it was caught is telling it
  // what to change.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const name = str(body.name).slice(0, LIMITS.name);
  const email = str(body.email).slice(0, LIMITS.email);
  const message = str(body.message).slice(0, LIMITS.message);
  const page = str(body.page).slice(0, 200);

  if (!name || !message) {
    return NextResponse.json(
      { error: "A name and a message are both needed.", code: "incomplete" },
      { status: 400 },
    );
  }

  if (message.length < 5) {
    return NextResponse.json(
      { error: "That message is too short to act on.", code: "incomplete" },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      {
        error: "That email does not look right — it is where the reply goes.",
        code: "bad-email",
      },
      { status: 400 },
    );
  }

  const webhook = process.env.MESSAGES_WEBHOOK_URL;

  if (!webhook) {
    // Logged so a message typed during development is not simply lost, and so
    // the missing configuration is obvious in the server output rather than
    // only in the visitor's browser.
    console.warn(
      `[message] MESSAGES_WEBHOOK_URL is not set — nothing was delivered.\n` +
        `          from: ${name} <${email}>\n` +
        `          page: ${page || "unknown"}\n` +
        `          text: ${message}`,
    );
    return NextResponse.json(
      {
        error: "The message form is not connected yet.",
        code: "no-transport",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        // `text` first and pre-formatted: Slack and Discord both render this
        // field directly, so the message is readable without any mapping step
        // in between. The structured fields below are for everything else.
        text:
          `New message via ${business.name}\n` +
          `From: ${name} <${email}>\n` +
          `Page: ${page || "unknown"}\n\n${message}`,
        name,
        email,
        message,
        page,
        receivedAt: new Date().toISOString(),
      }),
      // Without this a hung webhook holds the request open until the platform
      // kills it, and the visitor watches a spinner for the whole timeout.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error(
        `[message] webhook rejected the message: ${response.status}`,
      );
      return NextResponse.json(
        { error: "The message could not be delivered.", code: "undelivered" },
        { status: 502 },
      );
    }
  } catch (error) {
    // The message text is deliberately NOT logged here: this path can fire on
    // every request if the webhook is down, and a log full of visitors'
    // messages is a copy of their personal data in a place nobody is guarding.
    console.error("[message] webhook failed", error);
    return NextResponse.json(
      { error: "The message could not be delivered.", code: "undelivered" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
