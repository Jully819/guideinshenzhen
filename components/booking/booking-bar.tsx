"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  MAX_GUESTS,
  business,
  durations,
  policy,
  type TourSlug,
} from "@/lib/content";

/**
 * The booking bar. Structure taken from the SIXT reference: category pills
 * sitting on the dark band, a light card of labelled fields beneath them, and
 * the primary action at the end of the row.
 *
 * It sticks. Once the hero scrolls past, this same element fixes itself below
 * the header so the path to the calendar is never more than one click away —
 * which is the entire job of this page.
 *
 * ONE INSTANCE, ONE STATE. The obvious implementation is a second copy of the
 * bar rendered in the header, but two copies means two sets of state to keep in
 * sync and the second one always drifts — you pick "Full day" in the hero,
 * scroll, and the sticky copy still says "Half day". Instead a sentinel above
 * the bar reports when it leaves the viewport and the bar switches to
 * `position: fixed`, with a spacer holding its height so the page does not jump
 * at the moment it detaches.
 *
 * WHY THE PORTAL. `position: fixed` is resolved against the nearest ancestor
 * that establishes a containing block, and a `transform` — including one that
 * only exists in an animation's keyframes — is enough to create one. This bar
 * sits inside the hero's entrance animation, so fixing it in place pinned it to
 * that animated wrapper instead of the viewport and it rendered 300px above the
 * top of the screen. Portalling to <body> when stuck makes the positioning
 * independent of whatever the hero happens to be doing.
 *
 * This step captures INTENT only. A native date input is enough here; real
 * availability, in both timezones, is step 2 on /book.
 */
export function BookingBar() {
  const router = useRouter();

  // Fixed, not stateful: the pills that used to change it are gone. Kept so the
  // promise line and the price below have a trip to quote — /inquiry asks which
  // one it actually is.
  const tour: TourSlug = "private";
  const [hours, setHours] = useState(durations[0].hours);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [submitting, setSubmitting] = useState(false);

  const [stuck, setStuck] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(0);

  const dateId = useId();
  const hoursId = useId();
  const guestsId = useId();


  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      // Fires as the sentinel passes under the sticky header rather than the
      // very top of the viewport, so the bar does not overlap itself.
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Measured rather than hardcoded: the bar's height changes with the
  // breakpoint, and a wrong spacer is a visible jump at the moment it sticks.
  //
  // Only measured while INLINE. The stuck bar is shorter, and reserving the
  // stuck height would let the page collapse by the difference at the moment
  // it detaches — the jump this spacer exists to prevent.
  useEffect(() => {
    const node = bar.current;
    if (!node || stuck) return;
    const update = () => setBarHeight(node.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [stuck]);

  /**
   * Earliest bookable date, as a Shenzhen-local YYYY-MM-DD. Not "today" — the
   * lead time means today is usually already gone, and offering a date the
   * calendar will then show as empty is a dead end.
   */
  const minDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: business.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(Date.now() + policy.leadTimeHours * 3_600_000));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // GOES TO /inquiry, NOT /book. The bar captures intent; the inquiry form
    // turns it into a plan and a quote from a person. /book still exists and
    // is still the flow for someone who already knows exactly what they want,
    // reachable from the footer and the tour pages.
    //
    // The parameters are carried across so the first two steps of the form
    // arrive already answered — re-asking someone what they just typed into
    // the hero is how a form loses them on screen one.
    const params = new URLSearchParams({
      hours: String(hours),
      guests: String(guests),
    });
    if (date) params.set("date", date);
    router.push(`/inquiry?${params.toString()}`);
  }

  // No trip name in here any more. With the pills gone the visitor never chose
  // one, and a summary that opens "Private Trip" would be the bar telling them
  // something about their day that they did not say.
  const summary = `${durations.find((d) => d.hours === hours)!.label} · ${guests} guest${
    guests === 1 ? "" : "s"
  }`;

  const barMarkup = (
    <div
      ref={bar}
      className={
        stuck
          ? "on-ink fixed inset-x-0 top-16 z-30 border-b border-paper/10 bg-ink shadow-[0_18px_40px_-24px_rgb(0_0_0/0.9)] sm:top-18"
          /* No .on-ink when unstuck any more: the hero behind it is bone.
             The stuck variant above paints its own bg-ink and keeps it. */
          : "relative"
      }
    >
        <div className={stuck ? "mx-auto max-w-[76rem] px-5 py-3 sm:px-8" : ""}>
          {/* The Private Trip / Business Trip pills used to sit here. Removed:
              /inquiry now opens by asking exactly that question, with more room
              to explain the difference than two pills on a dark band ever had,
              so the bar was making a visitor answer it twice.

              `tour` is still held in state below and still drives the promise
              line and the price, both of which need SOME trip to quote. It is
              fixed at the first entry in `tours` and is deliberately no longer
              sent to /inquiry — see onSubmit. */}

          {/* -------------------------------------------------- Compact row.
              Only below sm, and only once stuck: the full field set is taller
              than a phone can spare under a fixed header. Tapping the summary
              returns to the full bar rather than trying to edit in place. */}
          {stuck && (
            <div className="flex items-center gap-3 sm:hidden">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="min-w-0 flex-1 text-left"
              >
                <span className="block truncate text-[0.85rem] text-paper">
                  {summary}
                </span>
                <span className="tabular block text-[0.75rem] text-paper/55">
                  {date || "Pick a date"}
                </span>
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={submitting}
                className="btn btn-primary shrink-0 px-5 py-2.5 text-[0.85rem]"
              >
                {/* Still just "Book" in the stuck bar on a phone: the full
                    "Book Now" pushes the summary beside it into a truncation
                    at 375px, and the label is unambiguous here either way. */}
                Book
              </button>
            </div>
          )}

          {/* -------------------------------------------------- The field card */}
          <form
            onSubmit={onSubmit}
            /* on-paper: this card is a light surface nested inside the hero's
               .on-ink scope, which would otherwise invert the submit button to
               bone-on-cream. */
            /* border, added when the hero went from ink to bone. On the dark
               hero this cream card separated by 14:1 and needed no edge. On
               bone it separates by 1.09:1, which is a card you can only see if
               you already know it is there. */
            className={`on-paper border border-ink/10 bg-paper-card text-ink ${
              stuck
                ? "mt-3 hidden rounded-xl p-3 sm:block"
                : "mt-3 rounded-2xl p-4 sm:p-5"
            }`}
            aria-label="Booking"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.7fr_auto] lg:items-end">
              <Field label="Date" htmlFor={dateId}>
                <input
                  id={dateId}
                  type="date"
                  value={date}
                  min={minDate}
                  required
                  onChange={(e) => setDate(e.target.value)}
                  className="tabular w-full rounded-lg border border-ink/15 bg-transparent min-h-12 px-3 py-2.5 text-[0.9rem] focus:border-ink"
                />
              </Field>

              <Field label="Length" htmlFor={hoursId}>
                <select
                  id={hoursId}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full rounded-lg border border-ink/15 bg-transparent min-h-12 px-3 py-2.5 text-[0.9rem] focus:border-ink"
                >
                  {durations.map((d) => (
                    <option key={d.hours} value={d.hours}>
                      {d.label} ({d.hours}h)
                    </option>
                  ))}
                </select>
              </Field>

              {/* NO "DAYS" FIELD. The bar's job is to capture intent in one
                  glance, and a fourth control asking for a number of days made
                  the visitor answer a question most of them answer with "1".
                  Multi-day is still fully supported downstream — lib/pricing
                  quotes it, /api/checkout verifies every day is free and the
                  webhook books them one per day — it is just no longer asked
                  for here. A ?days=N in the URL is still honoured by /book. */}
              <Field label="Guests" htmlFor={guestsId}>
                <select
                  id={guestsId}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full rounded-lg border border-ink/15 bg-transparent min-h-12 px-3 py-2.5 text-[0.9rem] focus:border-ink"
                >
                  {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary w-full justify-center lg:w-auto"
              >
                {submitting ? "Opening…" : "Book Now"}
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* THE PROMISE LINE UNDER THE BAR IS GONE, by request. It read
                "Shenzhen at your pace, with the friction taken out." and came
                from the active tour's `promise` in lib/content.ts.

                The whole row went, not just the <p>. It was the only child, and
                the row carried a top rule with mt-3/pt-3 around it, so leaving
                it behind would have hung an empty bordered strip under the bar.

                `promise` itself is untouched and still headlines /tours/private
                and /tours/business, and still labels each trip in the booking
                flow. Only this one render site was removed. */}
          </form>
        </div>
    </div>
  );

  return (
    <>
      {/* h-px, not a bare div: a zero-area target never reports an
          intersection in Chrome, so the bar silently never sticks. */}
      <div ref={sentinel} className="h-px" aria-hidden="true" />

      {/* Reserves the height the bar gives up the moment it goes fixed. */}
      {stuck && <div style={{ height: barHeight }} aria-hidden="true" />}

      {/* `stuck` can only become true from the IntersectionObserver, which is
          client-only, so the server always renders the inline branch and
          `document` is guaranteed to exist by the time the portal is used. */}
      {stuck ? createPortal(barMarkup, document.body) : barMarkup}
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow mb-1.5 text-slate">
        {label}
      </label>
      {children}
    </div>
  );
}
