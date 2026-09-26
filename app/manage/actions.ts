"use server";

import { headers } from "next/headers";
import {
  CalError,
  calConfigured,
  getBookingByUid,
  verifyAttendeeEmail,
} from "@/lib/cal";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { getTour, policy } from "@/lib/content";
import { formatMoney } from "@/lib/pricing";

/**
 * Booking lookup for /manage.
 *
 * THE ONE RULE IN THIS FILE: never reveal whether a booking reference exists.
 *
 * "No such booking" and "that email is not on this booking" return the SAME
 * message. If they differed, the form becomes an oracle: an attacker types
 * references with a junk email and learns which ones are real from the
 * wording, then only has to find the customer's address. Keeping the two
 * indistinguishable means a wrong guess teaches nothing.
 *
 * That is also why lookup failures are not logged with the reference attached.
 *
 * Read-only by design. Rescheduling and cancelling were deliberately left out:
 * cancelling would move real money, and the cancellation terms in
 * lib/content.ts are still placeholders.
 */

const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

/** Everything the page is allowed to render. Nothing sensitive beyond this. */
export interface BookingView {
  reference: string;
  status: string;
  startIso: string;
  durationMinutes: number | null;
  guestTimeZone: string | null;
  name: string | null;
  tourName: string | null;
  guests: string | null;
  pickup: string | null;
  flightNumber: string | null;
  purpose: string | null;
  amountPaid: string | null;
  cancellationHours: number;
}

export type LookupState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "found"; booking: BookingView };

export async function lookupBooking(
  _prev: LookupState,
  formData: FormData,
): Promise<LookupState> {
  const reference = String(formData.get("reference") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!reference || !email) {
    return { status: "error", message: "Enter both your booking reference and your email address." };
  }

  // Rate limit BEFORE touching Cal.com — otherwise a brute-force attempt still
  // costs us an API call per guess even when it is being blocked.
  const limit = rateLimit(`manage:${clientKey(await headers())}`, MAX_ATTEMPTS, WINDOW_MS);
  if (!limit.ok) {
    const minutes = Math.ceil(limit.retryAfter / 60);
    return {
      status: "error",
      message: `Too many attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}, or call us and we will look it up for you.`,
    };
  }

  if (!calConfigured()) {
    return {
      status: "error",
      message: "Booking lookup is not available right now. Please call or email us.",
    };
  }

  // Identical for both failure modes. See the note at the top of this file.
  const notFound: LookupState = {
    status: "error",
    message:
      "We could not find a booking with that reference and email address. Check both against your confirmation email, or call us.",
  };

  let booking;
  try {
    booking = await getBookingByUid(reference);
  } catch (error) {
    // Our fault, not theirs — say so rather than implying the booking is gone.
    console.error("[manage] lookup failed", error instanceof CalError ? error.status : error);
    return {
      status: "error",
      message: "Something went wrong looking that up. Please try again, or call us.",
    };
  }

  if (!booking) return notFound;
  if (!verifyAttendeeEmail(booking, email)) return notFound;

  const meta = booking.metadata ?? {};
  const tour = meta.tour ? getTour(meta.tour) : undefined;

  const amountPaid = Number(meta.amountPaid);
  const attendee = (booking.attendees ?? [])[0];

  return {
    status: "found",
    booking: {
      reference: booking.uid,
      status: booking.status,
      startIso: booking.start,
      durationMinutes: booking.duration ?? null,
      guestTimeZone: attendee?.timeZone ?? null,
      name: attendee?.name ?? null,
      tourName: tour?.name ?? null,
      guests: meta.guests || null,
      pickup: meta.pickup || null,
      flightNumber: meta.flightNumber || null,
      purpose: meta.purpose || null,
      amountPaid: Number.isFinite(amountPaid) && amountPaid > 0
        ? formatMoney(amountPaid, policy.currency)
        : null,
      cancellationHours: policy.cancellationHours,
    },
  };
}
