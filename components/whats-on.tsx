import Link from "next/link";
import { shenzhenDevelopments, shenzhenEvents } from "@/lib/content";

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
 * What is on in Shenzhen, and what has changed in the city.
 *
 * A YEAR, NOT A MONTH GRID. The obvious reading of "calendar" is a grid of
 * numbered squares, and it is the wrong shape here twice over: these fairs run
 * for three or four days each, six times a year, so a month grid would be
 * ninety per cent empty cells — and it cannot be drawn at all without exact
 * dates, which are the one thing this data does not have yet. A list ordered by
 * month says the same thing truthfully and reads on a phone.
 *
 * DATES ARE SHOWN AS A WINDOW UNTIL SOMEBODY CONFIRMS THEM. Every entry carries
 * `confirmed`; while it is false the card shows "Typically mid-November" and a
 * line saying to confirm with the organiser. See the note on `shenzhenEvents`
 * in lib/content.ts. Printing an exact date this codebase cannot verify would
 * put a visitor on a plane in the wrong week.
 *
 * The developments column hides itself when its array is empty, the same rule
 * the testimonials section follows: no entries is honest, stale entries are
 * not.
 */
export function WhatsOn() {
  const events = [...shenzhenEvents].sort((a, b) => a.month - b.month);
  const anyUnconfirmed = events.some((event) => !event.confirmed);

  return (
    <section id="whats-on" className="bg-paper-dim py-20 sm:py-28">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <header className="max-w-[46rem]">
          <p className="eyebrow text-slate">What&rsquo;s on</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[3rem]">
            The Shenzhen year, and what just changed.
          </h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/70">
            The fairs that bring most of our business visitors, and the city
            changes worth knowing about before you arrive. Travelling for one of
            these? Tell us which and we will build the days around it.
          </p>
        </header>

        <div className="mt-14 grid gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* ------------------------------------------------ Events */}
          <div className="lg:col-span-7">
            <h3 className="eyebrow text-slate">Exhibitions and trade fairs</h3>

            <ol className="mt-6 border-t border-ink/15">
              {events.map((event) => (
                <li
                  key={event.name}
                  className="grid gap-x-6 gap-y-2 border-b border-ink/15 py-5 sm:grid-cols-[7rem_1fr]"
                >
                  <div>
                    <p className="font-display text-[0.95rem] text-moss">
                      {MONTHS[event.month]}
                    </p>
                    {/* tabular so confirmed dates line up down the column once
                        they exist; until then this slot carries the window. */}
                    <p className="tabular mt-1 text-[0.78rem] text-ink/65">
                      {event.confirmed && event.dates
                        ? event.dates
                        : event.window}
                    </p>
                  </div>

                  <div>
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
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink/65">
                      {event.detail}
                    </p>
                    <p className="mt-1.5 text-[0.82rem] text-ink/65">
                      {event.venue}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {anyUnconfirmed && (
              <p className="mt-5 text-[0.82rem] leading-relaxed text-ink/65">
                Windows are the months these fairs have historically run in.
                Confirm exact dates with the organiser before booking travel —
                and if you already have your dates, send them to us and we will
                work to them.
              </p>
            )}
          </div>

          {/* ------------------------------------------------ Developments */}
          {shenzhenDevelopments.length > 0 && (
            <div className="lg:col-span-5">
              <h3 className="eyebrow text-slate">Latest in the city</h3>

              <ul className="mt-6 space-y-6">
                {shenzhenDevelopments.map((item) => (
                  <li
                    key={item.title}
                    className="border-t border-ink/15 pt-5"
                  >
                    <h4 className="font-display text-[1.02rem] leading-tight">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-ink/65">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>

              <Link
                href="/inquiry"
                className="btn btn-secondary mt-8 py-2.5 text-[0.85rem]"
              >
                Ask about your dates
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
