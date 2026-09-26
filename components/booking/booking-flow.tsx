"use client";

import { useEffect, useState } from "react";
import { AvailabilityCalendar } from "@/components/booking/availability-calendar";
import { SpineSteps } from "@/components/time-spine";
import {
  MAX_GUESTS,
  business,
  durations,
  getDuration,
  getTour,
  policy,
  tours,
  type TourSlug,
} from "@/lib/content";
import { formatMoney, quote } from "@/lib/pricing";
import { SHENZHEN_TZ, detectGuestTimeZone, formatDual } from "@/lib/tz";

const STEPS = ["The day", "Date & time", "Your details", "Payment"];

/** Client-only, so the first render matches the server and hydration is clean. */
function useGuestTimeZone() {
  const [tz, setTz] = useState<string | undefined>(undefined);
  useEffect(() => setTz(detectGuestTimeZone()), []);
  return tz;
}

interface Props {
  initialTour: TourSlug;
  initialHours: number;
  initialGuests: number;
  initialDays: number;
  /** True when the hero bar already chose a purpose — skip step 1. */
  skipFirstStep: boolean;
  cancelled: boolean;
}

export function BookingFlow({
  initialTour,
  initialHours,
  initialGuests,
  initialDays,
  skipFirstStep,
  cancelled,
}: Props) {
  const guestTimeZone = useGuestTimeZone();

  const [step, setStep] = useState(skipFirstStep ? 1 : 0);
  const [tour, setTour] = useState<TourSlug>(initialTour);
  const [hours, setHours] = useState(initialHours);
  const [guests, setGuests] = useState(initialGuests);
  const [days] = useState(initialDays);
  const [startIso, setStartIso] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const active = getTour(tour)!;
  const duration = getDuration(hours)!;
  const priced = quote(active, hours, guests, days);

  async function pay() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Note what is NOT sent: a price. The server recomputes it.
        body: JSON.stringify({
          tour,
          hours,
          guests,
          days,
          startIso,
          name,
          email,
          phone,
          pickup,
          flightNumber,
          purpose,
          notes,
          guestTimeZone: guestTimeZone ?? SHENZHEN_TZ,
        }),
      });
      const body = await res.json();

      if (res.status === 409) {
        setError(body.message ?? "That time was just taken.");
        setStartIso(null);
        setStep(1);
        return;
      }
      if (!res.ok) throw new Error(body?.error ?? "Checkout failed");

      window.location.href = body.url;
    } catch {
      setError("Could not open checkout. Nothing has been charged.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[46rem] px-5 py-14 sm:px-8 sm:py-20">
      <SpineSteps steps={STEPS} current={step} />

      {cancelled && step === 1 && (
        <p className="mt-6 border-l-2 border-moss bg-paper-card px-4 py-3 text-[0.9rem]">
          Checkout was cancelled. Nothing was charged — pick a time to try again.
        </p>
      )}
      {error && (
        <p className="mt-6 border-l-2 border-alert bg-paper-card px-4 py-3 text-[0.9rem]">
          {error}
        </p>
      )}

      {/* ---------------------------------------------------- Step 1 */}
      {step === 0 && (
        <section className="mt-10">
          <h1 className="font-display text-[2.2rem] sm:text-[2.8rem]">
            What is the day for?
          </h1>

          <div className="mt-8 grid gap-px border border-ink/12 bg-ink/12">
            {tours.map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => {
                  setTour(t.slug);
                  setStartIso(null);
                  setStep(1);
                }}
                className="bg-paper-card p-5 text-left transition-colors hover:bg-paper-dim"
              >
                <h2 className="font-display text-[1.3rem]">{t.name}</h2>
                <p className="mt-1.5 text-[0.9rem] text-ink/70">{t.promise}</p>
                <p className="tabular mt-2 text-[0.82rem] text-ink/65">
                  From {formatMoney(quote(t, 4, 1).total, priced.currency)}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- Step 2 */}
      {step === 1 && (
        <section className="mt-10">
          <h1 className="font-display text-[2.2rem] sm:text-[2.8rem]">
            When suits you?
          </h1>

          {/* Length lives here, not on step 1: it changes which start times
              exist, so it has to be adjustable next to the calendar rather
              than a step behind it. */}
          <fieldset className="mt-6">
            <legend className="eyebrow mb-2 text-slate">How long</legend>
            <div className="flex flex-wrap gap-2">
              {durations.map((d) => {
                const selected = d.hours === hours;
                return (
                  <label
                    key={d.hours}
                    className={`cursor-pointer rounded-full px-4 py-2 text-[0.85rem] transition-colors ${
                      selected
                        ? "bg-ink text-paper"
                        : "border border-ink/20 hover:border-ink/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="hours"
                      checked={selected}
                      onChange={() => {
                        setHours(d.hours);
                        setStartIso(null);
                      }}
                      className="sr-only"
                    />
                    {d.label} ({d.hours}h)
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8">
            <AvailabilityCalendar
              hours={hours}
              guestTimeZone={guestTimeZone}
              selected={startIso}
              onSelect={setStartIso}
            />
          </div>

          <Nav
            onBack={skipFirstStep ? undefined : () => setStep(0)}
            onNext={() => setStep(2)}
            nextLabel="Add your details"
            nextDisabled={!startIso}
          />
        </section>
      )}

      {/* ---------------------------------------------------- Step 3 */}
      {step === 2 && (
        <section className="mt-10">
          <h1 className="font-display text-[2.2rem] sm:text-[2.8rem]">
            Who are we meeting?
          </h1>
          {startIso && (
            <p className="mt-3 text-[0.9rem] text-ink/70">
              {formatDual(new Date(startIso), guestTimeZone)}
            </p>
          )}

          <form
            className="mt-8 grid gap-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
          >
            <Field label="Full name" value={name} onChange={setName} required />
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              hint="Where the confirmation goes"
            />
            <Field
              label="Phone or WhatsApp"
              value={phone}
              onChange={setPhone}
              hint="How your guide reaches you on the day"
            />

            <div>
              <label htmlFor="guests" className="eyebrow mb-1.5 text-slate">
                Guests
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2.5 text-[0.9rem] focus:border-ink"
              >
                {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <Field
                label="Pickup point"
                value={pickup}
                onChange={setPickup}
                hint="Hotel, terminal, or border crossing"
              />
            </div>

            <div className="sm:col-span-2">
              <Field
                label="Flight number"
                value={flightNumber}
                onChange={setFlightNumber}
                hint="Optional. If you give it we track the flight, and a delay does not cost you the day."
              />
            </div>

            {/* Replaces the old per-service conditional fields. One product
                now, so the useful question is what you want out of the day. */}
            <div className="sm:col-span-2">
              <label htmlFor="purpose" className="eyebrow mb-1.5 text-slate">
                What would make this a good day?
              </label>
              <textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder={
                  tour === "business"
                    ? "What you are sourcing and your target price, or who you are meeting and what you need to come away with…"
                    : "Anywhere you already want to see, and anything to avoid…"
                }
                className="w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2.5 text-[0.9rem] focus:border-ink"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="notes" className="eyebrow mb-1.5 text-slate">
                Anything else
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                maxLength={500}
                placeholder="Mobility, dietary needs, children…"
                className="w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2.5 text-[0.9rem] focus:border-ink"
              />
            </div>

            <div className="sm:col-span-2">
              <Nav onBack={() => setStep(1)} nextLabel="Review and pay" submit />
            </div>
          </form>
        </section>
      )}

      {/* ---------------------------------------------------- Step 4 */}
      {step === 3 && (
        <section className="mt-10">
          <h1 className="font-display text-[2.2rem] sm:text-[2.8rem]">
            Confirm the day.
          </h1>

          <dl className="mt-8 border-t border-ink/15">
            <Row label="Day" value={`${active.name} · ${duration.label}`} />
            {startIso && (
              <Row
                label="When"
                value={formatDual(new Date(startIso), guestTimeZone)}
              />
            )}
            <Row label="Name" value={name} />
            <Row label="Email" value={email} />
            <Row label="Guests" value={String(guests)} />
            {pickup && <Row label="Pickup" value={pickup} />}
            {flightNumber && <Row label="Flight" value={flightNumber} />}
          </dl>

          {/* Itemised, because the total is the whole price rather than a
              holding deposit and a guest is entitled to see how it is made. */}
          <div className="mt-8 bg-paper-card p-5">
            <dl>
              {priced.lines.map((line) => (
                <div
                  key={line.label}
                  className="flex justify-between gap-4 py-1.5"
                >
                  <dt className="text-[0.9rem]">
                    {line.label}
                    {line.detail && (
                      <span className="block text-[0.78rem] text-ink/65">
                        {line.detail}
                      </span>
                    )}
                  </dt>
                  <dd className="tabular shrink-0 text-[0.9rem]">
                    {formatMoney(line.amount, priced.currency)}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-3 flex items-baseline justify-between border-t border-ink/15 pt-3">
              <p className="text-[0.95rem]">Total, paid now</p>
              <p className="tabular font-display text-[1.6rem]">
                {formatMoney(priced.total, priced.currency)}
              </p>
            </div>

            <p className="mt-3 text-[0.85rem] leading-relaxed text-ink/65">
              Entry tickets and meals are not included and stay yours to choose.
              Free cancellation up to {policy.cancellationHours} hours before the
              start, refunded to the same card. Card details are handled by
              Stripe and never touch our servers.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn btn-secondary"
            >
              Back
            </button>
            <button
              type="button"
              onClick={pay}
              disabled={submitting || !startIso}
              className="btn btn-primary"
            >
              {submitting
                ? "Opening checkout…"
                : `Pay ${formatMoney(priced.total, priced.currency)}`}
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <p className="mt-4 text-[0.85rem] text-ink/60">
            Rather talk first? Call{" "}
            <a
              href={`tel:${business.phone.replace(/\s/g, "")}`}
              className="tabular text-moss underline underline-offset-2"
            >
              {business.phone}
            </a>
            .
          </p>
        </section>
      )}
    </div>
  );
}

function Nav({
  onBack,
  onNext,
  nextLabel,
  nextDisabled,
  submit,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
  submit?: boolean;
}) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      {onBack && (
        <button type="button" onClick={onBack} className="btn btn-secondary">
          Back
        </button>
      )}
      <button
        type={submit ? "submit" : "button"}
        onClick={onNext}
        disabled={nextDisabled}
        className="btn btn-primary"
      >
        {nextLabel}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-1.5 text-slate">
        {label}
        {required && <span className="text-alert"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2.5 text-[0.9rem] focus:border-ink"
      />
      {hint && <p className="mt-1 text-[0.78rem] text-ink/65">{hint}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-4 border-b border-ink/15 py-3">
      <dt className="text-[0.85rem] text-ink/65">{label}</dt>
      <dd className="max-w-[26rem] text-right text-[0.9rem]">{value}</dd>
    </div>
  );
}
