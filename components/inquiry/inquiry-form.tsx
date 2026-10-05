"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  MAX_GUESTS,
  business,
  inquiryInterests,
  inquiryPaces,
  inquiryTripTypes,
  policy,
} from "@/lib/content";

/**
 * The trip inquiry, asked one step at a time.
 *
 * WHY A WIZARD AND NOT ONE LONG FORM. Fourteen fields on one screen is a wall,
 * and the fields that get abandoned are the free-text ones at the bottom —
 * which are exactly the ones that make a quote possible. Five short steps ask
 * the same questions and each screen looks answerable.
 *
 * NOTHING IS REQUIRED EXCEPT A NAME, AN EMAIL AND A TRIP TYPE. Someone who
 * gives up at step three has still told us enough to write back and ask. The
 * Next button is therefore never disabled: it validates, and only the last
 * step can fail on missing information.
 *
 * NO ACCOUNT, NO PAYMENT, NO AVAILABILITY CHECK. This produces a written quote
 * from a person. Computing a price from five dropdowns would either be wrong
 * or so hedged as to be useless, and asking for a card before anyone has
 * agreed what the trip is would be worse.
 *
 * STATE IS ONE OBJECT AND NO LIBRARY. It never leaves this component except as
 * the JSON payload at the end, so the ceremony of a form library buys nothing
 * here.
 *
 * FOCUS MOVES TO THE STEP HEADING on every change. Without it, a keyboard or
 * screen-reader user presses Next and focus stays on a button that has just
 * been re-labelled, with no announcement that the questions changed.
 */

type Answers = {
  tripType: string;
  startDate: string;
  days: string;
  travellers: string;
  languages: string;
  interests: string[];
  pace: string;
  pickup: string;
  dietary: string;
  notes: string;
  name: string;
  email: string;
  whatsapp: string;
  organisation: string;
  /** Honeypot. Never shown to a human; anything in it means a script. */
  company: string;
};

const EMPTY: Answers = {
  tripType: "",
  startDate: "",
  days: "1",
  travellers: "2",
  languages: "",
  interests: [],
  pace: "balanced",
  pickup: "",
  dietary: "",
  notes: "",
  name: "",
  email: "",
  whatsapp: "",
  organisation: "",
  company: "",
};

const STEPS = [
  "What kind of trip",
  "When and how many",
  "What you want from it",
  "Practicalities",
  "Where to send the quote",
] as const;

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

export function InquiryForm() {
  const params = useSearchParams();

  /**
   * Seeded from the hero's booking bar, which sends `tour`, `date`, `hours`
   * and `guests`. Everything is validated rather than trusted: this is query
   * string, so `tour=<script>` and `guests=999999` both arrive here.
   *
   * Lazy initial state, not a useEffect. Setting these after the first render
   * would flash the empty form and would fight any typing the visitor started
   * in the meantime.
   */
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(() => {
    const tour = params.get("tour");
    const guests = Number(params.get("guests"));
    const date = params.get("date") ?? "";

    return {
      ...EMPTY,
      tripType:
        tour === "business" ? "business" : tour === "private" ? "leisure" : "",
      startDate: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "",
      travellers:
        Number.isInteger(guests) && guests >= 1 && guests <= 40
          ? String(guests)
          : EMPTY.travellers,
    };
  });
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [error, setError] = useState<string | null>(null);

  const heading = useRef<HTMLHeadingElement>(null);
  const formId = useId();

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  useEffect(() => {
    heading.current?.focus();
  }, [step]);

  /**
   * Earliest sensible start date, in Shenzhen's timezone rather than the
   * visitor's — the lead time is the guide's, and someone booking from London
   * at 23:00 is already on tomorrow's date locally.
   */
  const minDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: business.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(Date.now() + policy.leadTimeHours * 3_600_000));

  const isLast = step === STEPS.length - 1;

  function next() {
    if (step === 0 && !answers.tripType) {
      setError("Pick one so we know who should answer this.");
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!answers.name.trim()) return setError("We need a name to reply to.");
    if (!answers.email.trim()) return setError("We need an email for the quote.");

    setError(null);
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(answers),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          state: "error",
          message:
            body.code === "no-transport"
              ? "The form is not connected yet — send this to us directly instead:"
              : (body.error ?? "That did not send. Try again, or reach us directly:"),
        });
        return;
      }

      setStatus({ state: "sent" });
    } catch {
      setStatus({
        state: "error",
        message: "No connection. You can reach us directly instead:",
      });
    }
  }

  if (status.state === "sent") return <Sent answers={answers} />;

  return (
    <form onSubmit={submit} className="mt-12" aria-labelledby={`${formId}-h`}>
      {/* Progress. A list of step names rather than a bar: a bar says how far
          you are, names say what is left, and "Where to send the quote" being
          visible from step one is what tells someone this ends in an email
          rather than a payment screen. */}
      <ol className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
        {STEPS.map((label, i) => (
          <li
            key={label}
            aria-current={i === step ? "step" : undefined}
            className={`font-display text-[0.7rem] tracking-[0.12em] uppercase ${
              i === step
                ? "text-ink"
                : i < step
                  ? "text-moss"
                  : "text-ink/35"
            }`}
          >
            <span className="tabular">{String(i + 1).padStart(2, "0")}</span>{" "}
            {label}
          </li>
        ))}
      </ol>

      <h2
        id={`${formId}-h`}
        ref={heading}
        tabIndex={-1}
        className="step-heading font-display text-[1.6rem] sm:text-[2rem]"
      >
        {STEPS[step]}
      </h2>

      <div className="mt-8 max-w-[42rem]">
        {step === 0 && (
          <Fieldset legend="What kind of trip is this?">
            <div className="grid gap-3 sm:grid-cols-3">
              {inquiryTripTypes.map((t) => (
                <Choice
                  key={t.value}
                  name="tripType"
                  value={t.value}
                  checked={answers.tripType === t.value}
                  onChange={() => set("tripType", t.value)}
                  label={t.label}
                  detail={t.detail}
                />
              ))}
            </div>
          </Fieldset>
        )}

        {step === 1 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="First day" hint="Approximate is fine — nothing is booked here.">
              {(id) => (
                <input
                  id={id}
                  type="date"
                  min={minDate}
                  value={answers.startDate}
                  onChange={(e) => set("startDate", e.target.value)}
                  className="tabular w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                />
              )}
            </Field>

            <Field label="How many days">
              {(id) => (
                <input
                  id={id}
                  type="number"
                  min={1}
                  max={30}
                  value={answers.days}
                  onChange={(e) => set("days", e.target.value)}
                  className="tabular w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                />
              )}
            </Field>

            <Field label="How many travelling">
              {(id) => (
                <input
                  id={id}
                  type="number"
                  min={1}
                  max={40}
                  value={answers.travellers}
                  onChange={(e) => set("travellers", e.target.value)}
                  className="tabular w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                />
              )}
            </Field>

            <Field
              label="Languages needed"
              hint={`Above ${MAX_GUESTS} guests we may send a second guide.`}
            >
              {(id) => (
                <input
                  id={id}
                  value={answers.languages}
                  onChange={(e) => set("languages", e.target.value)}
                  placeholder="English, Mandarin, Cantonese…"
                  className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                />
              )}
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            {/* Both lists are shown when the trip is "both", and only the
                relevant one otherwise. Asking a sightseer about factory
                vetting is how a form teaches people it was not written for
                them. */}
            {(answers.tripType === "leisure" || answers.tripType === "both") && (
              <CheckGroup
                legend="Leisure"
                options={inquiryInterests.leisure}
                selected={answers.interests}
                onToggle={(v) => toggle(v, answers, set)}
              />
            )}
            {(answers.tripType === "business" || answers.tripType === "both") && (
              <CheckGroup
                legend="Business"
                options={inquiryInterests.business}
                selected={answers.interests}
                onToggle={(v) => toggle(v, answers, set)}
              />
            )}
            {!answers.tripType && (
              <CheckGroup
                legend="Interests"
                options={[...inquiryInterests.leisure, ...inquiryInterests.business]}
                selected={answers.interests}
                onToggle={(v) => toggle(v, answers, set)}
              />
            )}

            <Field
              label="Anything specific"
              hint="The detail that decides the day: a show you are exhibiting at, somewhere you have already booked, a supplier you need vetted."
            >
              {(id) => (
                <textarea
                  id={id}
                  rows={4}
                  maxLength={2000}
                  value={answers.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  className="w-full resize-y rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                />
              )}
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <Fieldset legend="How full should the days be?">
              <div className="grid gap-3 sm:grid-cols-3">
                {inquiryPaces.map((p) => (
                  <Choice
                    key={p.value}
                    name="pace"
                    value={p.value}
                    checked={answers.pace === p.value}
                    onChange={() => set("pace", p.value)}
                    label={p.label}
                    detail={p.detail}
                  />
                ))}
              </div>
            </Fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Where should we collect you" hint="Hotel, airport, or the border crossing.">
                {(id) => (
                  <input
                    id={id}
                    value={answers.pickup}
                    onChange={(e) => set("pickup", e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                  />
                )}
              </Field>

              <Field label="Dietary or access needs">
                {(id) => (
                  <input
                    id={id}
                    value={answers.dietary}
                    onChange={(e) => set("dietary", e.target.value)}
                    placeholder="Halal, vegetarian, step-free…"
                    className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                  />
                )}
              </Field>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Your name" required>
                {(id) => (
                  <input
                    id={id}
                    required
                    autoComplete="name"
                    value={answers.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                  />
                )}
              </Field>

              <Field label="Email" required hint="Where the plan and the quote go.">
                {(id) => (
                  <input
                    id={id}
                    type="email"
                    required
                    autoComplete="email"
                    value={answers.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                  />
                )}
              </Field>

              <Field label="WhatsApp or WeChat" hint="Optional, and faster on the day.">
                {(id) => (
                  <input
                    id={id}
                    value={answers.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                  />
                )}
              </Field>

              <Field label="Company" hint="Optional.">
                {(id) => (
                  <input
                    id={id}
                    autoComplete="organization"
                    value={answers.organisation}
                    onChange={(e) => set("organisation", e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-[0.95rem] focus:border-ink"
                  />
                )}
              </Field>
            </div>

            {/* Honeypot — off screen, out of the tab order, hidden from
                assistive tech. Only a script fills this. */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor={`${formId}-co`}>Company name</label>
              <input
                id={`${formId}-co`}
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={answers.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>

            <Review answers={answers} onJump={setStep} />
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-6 text-[0.9rem] text-alert">
          {error}
        </p>
      )}

      {status.state === "error" && (
        <div className="mt-6 rounded-xl border border-alert/40 bg-alert/5 p-5">
          <p role="alert" className="text-[0.9rem] text-alert">
            {status.message}
          </p>
          <p className="tabular mt-3 text-[0.9rem]">
            WeChat: {business.wechatId}
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-ink/12 pt-6">
        {step > 0 && (
          <button type="button" onClick={back} className="btn btn-secondary">
            Back
          </button>
        )}

        {isLast ? (
          <button
            type="submit"
            disabled={status.state === "sending"}
            className="btn btn-primary"
          >
            {status.state === "sending" ? "Sending…" : "Send inquiry"}
            <span aria-hidden="true">→</span>
          </button>
        ) : (
          <button type="button" onClick={next} className="btn btn-primary">
            Next
            <span aria-hidden="true">→</span>
          </button>
        )}

        <p className="text-[0.82rem] text-ink/65">
          No payment, and nothing is booked yet.
        </p>
      </div>
    </form>
  );
}

function toggle(
  value: string,
  answers: Answers,
  set: <K extends keyof Answers>(k: K, v: Answers[K]) => void,
) {
  set(
    "interests",
    answers.interests.includes(value)
      ? answers.interests.filter((v) => v !== value)
      : [...answers.interests, value],
  );
}

/* ------------------------------------------------------------------ pieces */

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="eyebrow mb-4 text-slate">{legend}</legend>
      {children}
    </fieldset>
  );
}

/** A radio drawn as a card. The input stays real so the group is one arrow-key
    stop and the label is clickable; only its appearance is replaced. */
function Choice({
  name,
  value,
  checked,
  onChange,
  label,
  detail,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  detail: string;
}) {
  return (
    <label
      className={`cursor-pointer rounded-xl border p-4 transition-colors ${
        checked
          ? "border-ink bg-paper-card"
          : "border-ink/15 hover:border-ink/40"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="font-display block text-[1rem]">{label}</span>
      <span className="mt-1.5 block text-[0.85rem] leading-relaxed text-ink/60">
        {detail}
      </span>
    </label>
  );
}

function CheckGroup({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <Fieldset legend={legend}>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = selected.includes(option);
          return (
            <label
              key={option}
              className={`cursor-pointer rounded-full border px-4 py-2 text-[0.88rem] transition-colors ${
                on
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 hover:border-ink/50"
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => onToggle(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </Fieldset>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: (id: string) => React.ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-1.5 text-slate">
        {label}
        {required && (
          <span className="text-alert" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children(id)}
      {hint && <p className="mt-1.5 text-[0.8rem] text-ink/65">{hint}</p>}
    </div>
  );
}

/** What they have said so far, on the last step, with a way back to fix it. */
function Review({
  answers,
  onJump,
}: {
  answers: Answers;
  onJump: (step: number) => void;
}) {
  const rows: { label: string; value: string; step: number }[] = [
    { label: "Trip", value: answers.tripType, step: 0 },
    {
      label: "When",
      value: [answers.startDate, answers.days && `${answers.days} day(s)`]
        .filter(Boolean)
        .join(" · "),
      step: 1,
    },
    { label: "Travellers", value: answers.travellers, step: 1 },
    { label: "Interests", value: answers.interests.join(", "), step: 2 },
    { label: "Pace", value: answers.pace, step: 3 },
    { label: "Pickup", value: answers.pickup, step: 3 },
  ].filter((r) => r.value);

  if (!rows.length) return null;

  return (
    <div className="rounded-xl bg-paper-card p-5">
      <p className="eyebrow mb-3 text-slate">What we have so far</p>
      <dl className="space-y-2 text-[0.88rem]">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-wrap gap-x-3">
            <dt className="min-w-[6rem] text-ink/65">{row.label}</dt>
            <dd className="flex-1 text-ink/85">{row.value}</dd>
            <button
              type="button"
              onClick={() => onJump(row.step)}
              className="text-[0.8rem] text-moss underline underline-offset-4 hover:text-ink"
            >
              Change
            </button>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Sent({ answers }: { answers: Answers }) {
  return (
    <div className="mt-12 max-w-[38rem]">
      <p className="eyebrow text-moss">Inquiry sent</p>
      <h2 role="status" className="font-display mt-5 text-[1.8rem] sm:text-[2.2rem]">
        Thank you — we will write back with a plan.
      </h2>
      <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/70">
        A person reads this, not a system. You will get a reply at{" "}
        <span className="text-ink">{answers.email}</span> with a suggested day,
        what it includes, and a fixed price — usually the same day, and always
        within one working day. Nothing is booked and nothing is charged until
        you say yes.
      </p>
      <p className="mt-6 text-[0.9rem] text-ink/60">
        If it is urgent, message {business.wechatId} on WeChat.
      </p>
    </div>
  );
}
