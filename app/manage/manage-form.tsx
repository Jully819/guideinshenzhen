"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { lookupBooking, type LookupState } from "@/app/manage/actions";
import { business } from "@/lib/content";
import { SHENZHEN_TZ, formatDateLong, formatTime, formatOffset } from "@/lib/tz";

const initial: LookupState = { status: "idle" };

export function ManageForm() {
  const [state, action, pending] = useActionState(lookupBooking, initial);
  const refId = useId();
  const emailId = useId();
  const errorId = useId();

  /**
   * CONTROLLED ON PURPOSE. React 19 resets a form after its action resolves,
   * so with uncontrolled inputs a failed lookup wiped both fields and the
   * customer had to retype their reference and email to try again — the exact
   * moment they are least patient. Holding the values here survives the reset.
   */
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");

  const failed = state.status === "error";

  return (
    <>
      {/* noValidate is deliberate: the server action validates anyway, and the
          browser's own bubble cannot be styled or announced consistently. */}
      <form action={action} className="mt-10 max-w-[30rem]" noValidate>
        <div>
          <label htmlFor={refId} className="eyebrow text-slate">
            Booking reference
          </label>
          <input
            id={refId}
            name="reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
            autoComplete="off"
            spellCheck={false}
            aria-describedby={failed ? errorId : undefined}
            placeholder="e.g. mNqR8vTxKd2"
            className="tabular mt-2.5 w-full rounded-full border border-ink/25 bg-paper-card px-5 py-3 text-[0.92rem] hover:border-ink/50 focus:border-ink"
          />
        </div>

        <div className="mt-5">
          <label htmlFor={emailId} className="eyebrow text-slate">
            Email you booked with
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-describedby={failed ? errorId : undefined}
            placeholder="you@example.com"
            className="mt-2.5 w-full rounded-full border border-ink/25 bg-paper-card px-5 py-3 text-[0.92rem] hover:border-ink/50 focus:border-ink"
          />
        </div>

        <button type="submit" disabled={pending} className="btn btn-primary mt-6">
          {pending ? "Looking…" : "Find my booking"}
          {!pending && <span aria-hidden="true">→</span>}
        </button>
      </form>

      {/* role=status rather than role=alert: this is the result of something
          the visitor asked for, not an interruption. */}
      <div role="status" aria-live="polite">
        {failed && (
          <p
            id={errorId}
            className="mt-6 max-w-[34rem] border-l-2 border-alert py-1 pl-4 text-[0.92rem] leading-relaxed text-ink/80"
          >
            {state.message}
          </p>
        )}

        {state.status === "found" && <BookingCard booking={state.booking} />}
      </div>
    </>
  );
}

function BookingCard({
  booking,
}: {
  booking: Extract<LookupState, { status: "found" }>["booking"];
}) {
  const start = new Date(booking.startIso);
  const cancelled = booking.status === "cancelled" || booking.status === "rejected";

  const guestTz = booking.guestTimeZone;
  const showGuestTime = Boolean(guestTz) && guestTz !== SHENZHEN_TZ;

  const hours = booking.durationMinutes ? booking.durationMinutes / 60 : null;

  return (
    <section className="mt-10 max-w-[42rem] rounded-2xl border border-ink/15 bg-paper-card p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="eyebrow text-slate">
          {cancelled ? "Cancelled" : "Booked"}
        </p>
        <p className="tabular text-[0.82rem] text-slate">{booking.reference}</p>
      </div>

      <h2 className="font-display mt-4 text-[1.8rem] leading-tight sm:text-[2.2rem]">
        {formatDateLong(start, SHENZHEN_TZ)}
      </h2>

      {/* Both timezones, always — 09:00 in Shenzhen is the previous evening in
          much of the Americas, and that is how people miss a pickup. */}
      <p className="tabular mt-2 text-[0.95rem] text-ink/75">
        {formatTime(start, SHENZHEN_TZ)} Shenzhen ({formatOffset(start, SHENZHEN_TZ)})
        {showGuestTime && (
          <span className="text-ink/65">
            {" "}
            — {formatTime(start, guestTz!)} your time
          </span>
        )}
      </p>

      {cancelled && (
        <p className="mt-5 border-l-2 border-alert py-1 pl-4 text-[0.92rem] leading-relaxed text-ink/80">
          This booking has been cancelled. If that is not what you expected,
          call us and we will sort it out.
        </p>
      )}

      <dl className="mt-7 grid gap-x-8 gap-y-4 border-t border-ink/12 pt-6 sm:grid-cols-2">
        <Row label="Name" value={booking.name} />
        <Row label="What the day is for" value={booking.tourName} />
        <Row label="Length" value={hours ? `${hours} hours` : null} />
        <Row label="Guests" value={booking.guests} />
        <Row label="Pickup" value={booking.pickup} />
        <Row label="Flight" value={booking.flightNumber} />
        <Row label="Paid" value={booking.amountPaid} />
      </dl>

      {booking.purpose && (
        <div className="mt-6 border-t border-ink/12 pt-6">
          <dt className="eyebrow text-slate">What you told us</dt>
          <dd className="mt-2 text-[0.92rem] leading-relaxed text-ink/75">
            {booking.purpose}
          </dd>
        </div>
      )}

      {/* Changes are handled by a person, not this page. Say so plainly rather
          than leaving the visitor hunting for an edit button that is not here. */}
      {!cancelled && (
        <div className="mt-7 border-t border-ink/12 pt-6">
          <p className="text-[0.92rem] leading-relaxed text-ink/75">
            Need to move the date, change the party size, or cancel? Reply to
            your confirmation email or call us and we will handle it. Cancel
            more than {booking.cancellationHours} hours before the start and you
            are refunded in full to the card you paid with.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className="btn btn-primary"
            >
              Call {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="btn btn-secondary">
              Email us
            </a>
          </div>
        </div>
      )}

      {cancelled && (
        <div className="mt-7 border-t border-ink/12 pt-6">
          <Link href="/book" className="btn btn-primary">
            Book another day
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}

/** Renders nothing at all when the value is missing, rather than an empty row. */
function Row({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="eyebrow text-slate">{label}</dt>
      <dd className="mt-1.5 text-[0.95rem] text-ink/80">{value}</dd>
    </div>
  );
}
