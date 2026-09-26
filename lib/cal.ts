import "server-only";

/**
 * Cal.com API v2 client.
 *
 * Endpoints and version headers verified against the v2 reference:
 *   GET  /v2/slots     — cal-api-version: 2024-09-04
 *   POST /v2/bookings  — cal-api-version: 2026-02-25
 *
 * ONE EVENT TYPE, TWO DURATIONS. The business sells a half day and a full day
 * of the same guide, so both are durations on a single Cal.com event type
 * configured for multiple durations, and `duration` is passed per request.
 *
 * The alternative — one event type per length — needs each to mark the host
 * busy for the other, or the same guide gets booked twice at 09:00. That is a
 * property of the host's schedule rather than of the event types, so it has to
 * be proven rather than assumed. One event type removes the question.
 *
 * IMPORTANT — there is no documented slot-hold/reservation endpoint. A slot can
 * be taken by someone else while a guest is inside Stripe Checkout. We handle
 * that by re-checking in /api/checkout and refunding in the webhook if the slot
 * has gone. See README.md before changing this flow.
 */

const BASE = "https://api.cal.com/v2";

const SLOTS_VERSION = "2024-09-04";
const BOOKINGS_VERSION = "2026-02-25";

/** True when no Cal.com credentials exist. Drives the dev-only mock. */
export function calConfigured(): boolean {
  return Boolean(process.env.CAL_API_KEY && process.env.CAL_EVENT_TYPE_ID_GUIDE);
}

function apiKey(): string {
  const key = process.env.CAL_API_KEY;
  if (!key) throw new Error("CAL_API_KEY is not set");
  return key;
}

/** The single event type backing every booking. */
export function eventTypeId(): number {
  const raw = process.env.CAL_EVENT_TYPE_ID_GUIDE;
  if (!raw) throw new Error("CAL_EVENT_TYPE_ID_GUIDE is not set");
  const id = Number(raw);
  if (!Number.isFinite(id)) {
    throw new Error("CAL_EVENT_TYPE_ID_GUIDE is not a number");
  }
  return id;
}

async function calFetch(
  path: string,
  version: string,
  init: RequestInit = {},
): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "cal-api-version": version,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const detail =
      body && typeof body === "object" && "error" in body
        ? JSON.stringify((body as Record<string, unknown>).error)
        : res.statusText;
    throw new CalError(`Cal.com ${path} failed (${res.status}): ${detail}`, res.status);
  }

  return body;
}

export class CalError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "CalError";
  }
}

/**
 * Available start times between two instants, for a day of `duration` minutes.
 *
 * The v2 response groups slots by date:
 *   { data: { "2026-04-14": [{ start: "2026-04-14T09:00:00Z" }, ...] } }
 * We flatten to a plain list of ISO start strings — the calendar regroups by
 * Shenzhen-local day itself, which is not necessarily the same grouping.
 */
export async function getSlots(opts: {
  start: string;
  end: string;
  /** Minutes. Must be one of the durations configured on the event type. */
  duration: number;
  timeZone?: string;
}): Promise<string[]> {
  const params = new URLSearchParams({
    eventTypeId: String(eventTypeId()),
    start: opts.start,
    end: opts.end,
    duration: String(opts.duration),
  });
  if (opts.timeZone) params.set("timeZone", opts.timeZone);

  const body = (await calFetch(`/slots?${params}`, SLOTS_VERSION)) as {
    data?: Record<string, Array<{ start?: string } | string>>;
  };

  const grouped = body?.data ?? {};
  const out: string[] = [];

  for (const entries of Object.values(grouped)) {
    if (!Array.isArray(entries)) continue;
    for (const entry of entries) {
      const iso = typeof entry === "string" ? entry : entry?.start;
      if (iso) out.push(new Date(iso).toISOString());
    }
  }

  return [...new Set(out)].sort();
}

/** True if `startIso` is still bookable at that length. Used before and after payment. */
export async function isSlotAvailable(
  startIso: string,
  duration: number,
): Promise<boolean> {
  const start = new Date(startIso);
  // A tight window around the slot keeps the check cheap.
  const from = new Date(start.getTime() - 60_000).toISOString();
  const to = new Date(start.getTime() + 24 * 3_600_000).toISOString();

  const slots = await getSlots({ start: from, end: to, duration });
  return slots.includes(start.toISOString());
}

export interface CreateBookingInput {
  startIso: string;
  /** Minutes. Cal.com needs this explicitly on a multi-duration event type. */
  duration: number;
  attendee: { name: string; email: string; timeZone: string; phoneNumber?: string };
  /** Max 50 keys, 40 chars per key, 500 chars per value. */
  metadata?: Record<string, string>;
  notes?: string;
}

export interface CalBooking {
  id: number;
  uid: string;
  status: "accepted" | "pending" | "cancelled" | "rejected" | string;
}

/** The shape /manage needs. Wider than CalBooking, which is write-path only. */
export interface CalBookingDetail extends CalBooking {
  start: string;
  end: string;
  duration?: number;
  attendees?: { name?: string; email?: string; timeZone?: string }[];
  metadata?: Record<string, string>;
}

export async function createBooking(
  input: CreateBookingInput,
): Promise<CalBooking> {
  const body = (await calFetch(`/bookings`, BOOKINGS_VERSION, {
    method: "POST",
    body: JSON.stringify({
      eventTypeId: eventTypeId(),
      start: new Date(input.startIso).toISOString(),
      lengthInMinutes: input.duration,
      attendee: input.attendee,
      metadata: input.metadata ?? {},
      ...(input.notes ? { bookingFieldsResponses: { notes: input.notes } } : {}),
    }),
  })) as { data?: CalBooking };

  if (!body?.data?.uid) {
    throw new CalError("Cal.com returned no booking", 502);
  }
  return body.data;
}

/**
 * Cancel a booking. Used to roll back a partly-created multi-day run.
 *
 * Never throws. A rollback runs when something has ALREADY gone wrong and the
 * customer is about to be refunded; letting this reject would replace a clean
 * "refunded, nothing booked" outcome with an unhandled error and a booking
 * still standing. Failures are logged loudly instead, because a booking left
 * behind blocks a slot nobody paid for and a human has to clear it.
 */
export async function cancelBooking(uid: string, reason: string): Promise<boolean> {
  try {
    await calFetch(`/bookings/${encodeURIComponent(uid)}/cancel`, BOOKINGS_VERSION, {
      method: "POST",
      body: JSON.stringify({ cancellationReason: reason }),
    });
    return true;
  } catch (error) {
    console.error("[cal] CANCEL FAILED, slot still held, needs clearing by hand", uid, error);
    return false;
  }
}

/**
 * Fetch one booking by its reference (Cal.com's `uid`).
 *
 * Read-only, and it does NOT authenticate the caller — the uid alone is enough
 * to fetch it. Anything customer-facing MUST check the attendee email before
 * showing what comes back; see verifyAttendeeEmail below and its only caller,
 * app/manage/actions.ts.
 *
 * Returns null when Cal.com says 404 so the caller can treat "no such booking"
 * as an ordinary outcome, but still throws on 5xx and network failures — those
 * are our fault and should not be reported to a customer as "not found".
 */
export async function getBookingByUid(
  uid: string,
): Promise<CalBookingDetail | null> {
  try {
    const body = (await calFetch(
      `/bookings/${encodeURIComponent(uid)}`,
      BOOKINGS_VERSION,
    )) as { data?: CalBookingDetail };
    return body?.data ?? null;
  } catch (error) {
    if (error instanceof CalError && error.status === 404) return null;
    throw error;
  }
}

/**
 * Does this booking belong to this email address?
 *
 * Case-insensitive and trimmed, because people type their address with a
 * capital or a trailing space and being pedantic about it just locks customers
 * out of their own booking. Compares against every attendee rather than the
 * first, since Cal.com can carry more than one.
 */
export function verifyAttendeeEmail(
  booking: CalBookingDetail,
  email: string,
): boolean {
  const given = email.trim().toLowerCase();
  if (!given) return false;
  return (booking.attendees ?? []).some(
    (a) => (a.email ?? "").trim().toLowerCase() === given,
  );
}

/**
 * Find a booking previously created for a Stripe session. This is what makes
 * the webhook idempotent — Stripe retries, and we must not double-book.
 */
export async function findBookingByStripeSession(
  sessionId: string,
): Promise<CalBooking | null> {
  const params = new URLSearchParams({ "metadata[stripeSessionId]": sessionId });
  try {
    const body = (await calFetch(
      `/bookings?${params}`,
      BOOKINGS_VERSION,
    )) as { data?: CalBooking[] };
    return body?.data?.[0] ?? null;
  } catch {
    // A failed lookup must not block the booking — the caller falls back to
    // its own idempotency record.
    return null;
  }
}
