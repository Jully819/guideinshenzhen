import type { Metadata } from "next";
import Link from "next/link";
import { shenzhenDevelopments, shenzhenEvents } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/calendar" },
  title: "Calendar",
  description:
    "The Shenzhen exhibition year — AI, drones, semiconductors, electronics, e-commerce and CHTF — month by month, with venues, dates and the quiet months in between.",
};

/**
 * Recomputed daily. This page divides the year at today's date, so a build from
 * March would otherwise keep calling June "upcoming" until the next deploy.
 */
export const revalidate = 86400;

const MONTHS = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/**
 * The exhibition year, as its own page.
 *
 * NOT A MONTH GRID. A grid of numbered squares is the obvious reading of
 * "calendar" and the wrong shape here: these fairs run three or four days each,
 * they cluster (six separate shows open on 26 November alone), and several
 * entries still have no exact dates at all. A year read as a list says the same
 * thing truthfully and works on a phone.
 *
 * WHAT A PAGE ADDS OVER A HOME PAGE SECTION: the quiet months. A visitor asking
 * "can I come in July" is answered by seeing July listed and empty — something
 * a filtered list of fairs cannot do.
 *
 * PAST FAIRS ARE SHOWN, NOT HIDDEN. A visitor planning next year's trip needs
 * to know that SEMIBAY is a mid-October fair even when this year's has run.
 * They are dimmed and labelled rather than dropped, and the page opens with the
 * next one still to come so nobody reads a finished fair as an invitation.
 *
 * DATES ARE ONLY AS GOOD AS THEIR SOURCE. Entries carry `confirmed`; the
 * unconfirmed ones print a window ("Typically late October") and the footnote
 * says to check with the organiser. See the header of `shenzhenEvents`.
 */
export default function CalendarPage() {
  // Compared as ISO day strings, not Date objects: `end` is a plain calendar
  // day in Shenzhen, and turning it into a Date makes it a UTC instant, which
  // flips a fair to "past" a few hours early for anyone west of China.
  const today = new Date().toISOString().slice(0, 10);

  const events = [...shenzhenEvents].sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    // Undated entries sort after dated ones inside the same month.
    if (!a.start) return 1;
    if (!b.start) return -1;
    return a.start.localeCompare(b.start);
  });

  const isPast = (event: (typeof events)[number]) =>
    Boolean(event.end) && event.end < today;

  const next = events.find((event) => event.start && !isPast(event));
  const anyUnconfirmed = events.some((event) => !event.confirmed);

  // Indexed once rather than filtered inside the month loop — twelve passes
  // over the array to draw twelve rows stops being free as this list grows.
  const byMonth = new Map<number, typeof events>();
  for (const event of events) {
    byMonth.set(event.month, [...(byMonth.get(event.month) ?? []), event]);
  }

  return (
    <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-24">
      <header className="max-w-[46rem]">
        <p className="eyebrow text-slate">Calendar</p>
        <h1 className="font-display mt-6 text-[2.4rem] text-balance sm:text-[3rem]">
          The Shenzhen exhibition year.
        </h1>
        <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/70">
          The fairs that bring most of our business visitors, month by month —
          and the months that stay quiet. Travelling for one of these? Tell us
          which and we will build the days around it: booth support,
          interpreting, and a car for the week.
        </p>

        {next && (
          <p className="tabular mt-6 text-[0.85rem] text-ink/60">
            Next up · {next.dates || next.window} · {next.name}
          </p>
        )}
      </header>

      <div className="mt-14 grid gap-x-12 gap-y-14 lg:grid-cols-12">
        {/* ------------------------------------------------ The year */}
        <div className="lg:col-span-8">
          <h2 className="eyebrow text-slate">Exhibitions and trade fairs</h2>

          <ol className="mt-6 border-t border-ink/15">
            {MONTHS.slice(1).map((label, i) => {
              const monthEvents = byMonth.get(i + 1) ?? [];

              return (
                <li
                  key={label}
                  className="grid gap-x-6 gap-y-3 border-b border-ink/15 py-6 sm:grid-cols-[7rem_1fr]"
                >
                  <h3
                    className={`font-display text-[0.95rem] ${
                      /* /60 is the floor for body text on this palette. It
                         measures 4.81:1 on paper-dim; /35 measured 2.27 and
                         failed WCAG AA. A quiet month still has to be read. */
                      monthEvents.length > 0 ? "text-moss" : "text-ink/60"
                    }`}
                  >
                    {label}
                  </h3>

                  {monthEvents.length === 0 ? (
                    /* An empty month is an answer, not a gap — a visitor with
                       flexible dates is choosing precisely this. */
                    <p className="text-[0.88rem] text-ink/60">
                      No major fair. A good month for sightseeing days and
                      factory visits without the crowds.
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {monthEvents.map((event) => {
                        const past = isPast(event);

                        return (
                          <article
                            key={`${event.name}-${event.start}`}
                            className={past ? "opacity-45" : undefined}
                          >
                            <h4 className="font-display text-[1.05rem] leading-tight">
                              {event.url ? (
                                <a
                                  href={event.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                                >
                                  {event.name}
                                </a>
                              ) : (
                                event.name
                              )}
                            </h4>

                            <p className="tabular mt-1.5 text-[0.78rem] text-ink/65">
                              {event.confirmed && event.dates
                                ? event.dates
                                : event.window}
                              {past && " · finished"}
                              {!event.confirmed && " · dates to confirm"}
                            </p>

                            {event.detail && (
                              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink/65">
                                {event.detail}
                              </p>
                            )}

                            <p className="mt-1.5 text-[0.82rem] text-ink/65">
                              {event.sector} · {event.venue}
                            </p>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {anyUnconfirmed && (
            <p className="mt-5 max-w-[42rem] text-[0.82rem] leading-relaxed text-ink/65">
              Entries marked &ldquo;dates to confirm&rdquo; show the window that
              fair has historically run in. Confirm exact dates with the
              organiser before booking travel — and if you already have your
              dates, send them to us and we will work to them.
            </p>
          )}
        </div>

        {/* ------------------------------------------------ Aside */}
        <aside className="lg:col-span-4">
          <div className="border-l-2 border-moss bg-paper-card px-5 py-4">
            <p className="eyebrow text-slate">Booking around a fair</p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/75">
              Fair weeks fill early — guides, cars and hotel rooms go at once,
              and six shows open on the same morning in late November. Send your
              dates as soon as you have them.
            </p>
          </div>

          <Link
            href="/inquiry"
            className="btn btn-secondary mt-6 py-2.5 text-[0.85rem]"
          >
            Ask about your dates
          </Link>

          {/* Same rule as everywhere else on this site: the column hides itself
              when the array is empty. No entries is honest, stale ones are
              not. */}
          {shenzhenDevelopments.length > 0 && (
            <div className="mt-12">
              <h2 className="eyebrow text-slate">Latest in the city</h2>

              <ul className="mt-6 space-y-6">
                {shenzhenDevelopments.map((item) => (
                  <li key={item.title} className="border-t border-ink/15 pt-5">
                    <h3 className="font-display text-[1.02rem] leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-ink/65">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-16 border-t border-ink/12 pt-10">
        <h2 className="font-display text-[1.9rem] text-balance">
          Know your dates? Start there.
        </h2>
        <p className="mt-3 max-w-[40rem] text-[0.92rem] leading-relaxed text-ink/70">
          Pick the day and we will tell you who you are meeting. Fair weeks,
          factory weeks and single days all book the same way.
        </p>
        <Link href="/book" className="btn btn-primary mt-8">
          Book a day
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
