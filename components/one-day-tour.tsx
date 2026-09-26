import { Check } from "lucide-react";
import { TimeSpine } from "@/components/time-spine";
import { oneDayShenzhen } from "@/lib/itinerary";
import { getTour } from "@/lib/content";

/**
 * One day, in its two shapes. Leisure on the left, business on the right.
 *
 * WHY IT SITS HERE. The services section above answers "what do you do". The
 * testimonials below answer "did it go well". Neither answers "what does a day
 * actually look like", which is the question in between.
 *
 * SURFACE: bone, carrying two cream cards. The services band above and the
 * testimonial wall below are both paper-dim, so neither the section nor the
 * cards may be paper-dim without putting back the flat run this section was
 * placed here to close. Cream is the third surface and is the one the marquee
 * already uses. See the surface rhythm at the top of app/page.tsx.
 *
 * ⚠️ EVERY STOP ON BOTH SIDES IS EXISTING, ALREADY-VETTED CONTENT. The leisure
 * day is lib/itinerary.ts, the route supplied for this section. The business
 * day is the sample day that has been on /tours/business all along, in
 * lib/content.ts. Nothing here was written to fill a column. If a third shape
 * of day is ever wanted, write the day first and add it to one of those two
 * files, rather than inventing stops in this component.
 *
 * WHY THE TWO COLUMNS ARE TIMED DIFFERENTLY, deliberately. The leisure day runs
 * on parts of the day and carries drive times between districts, because it is
 * a route and the driving is what decides whether it works. The business day
 * runs on the clock, because a day with meetings in it does. Both render
 * through TimeSpine, which takes either.
 *
 * ON THE COMPONENT THIS WAS MODELLED ON. The supplied compare-2.tsx is a
 * two-column comparison with a headed list per side and a filled right-hand
 * column, and that structure is what is used here. Three things about it were
 * NOT carried over, on purpose:
 *
 *   1. `@aliimam/icons` was not installed. lucide-react is already a
 *      dependency of this project and exports the same Check. A second icon
 *      package for one glyph is a dependency bought for nothing.
 *   2. Its type scale, `text-5xl tracking-tighter` and `text-md`, is not this
 *      site's. The headings here use `font-display` at the same sizes as every
 *      other H2 on the page, so the section does not read as pasted in.
 *   3. Its check is a filled `bg-primary` disc. This site's language is
 *      hairlines and restraint, so the check is a moss glyph and the columns
 *      are separated by a rule rather than a slab of colour.
 *
 * `bg-secondary` from the original WOULD have resolved, since globals.css maps
 * --secondary to --color-paper-dim, but paper-dim is exactly the value that
 * would have collided with the sections above and below.
 */
export function OneDayTour() {
  const leisure = getTour("private");
  const business = getTour("business");

  return (
    <section id="one-day" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <header className="max-w-[46rem]">
          <p className="eyebrow text-slate">Itinerary</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[3rem]">
            Customized Tours
          </h2>
          {/* Supplied copy, used as written with one character changed. The
              original joined the clause with an em dash, and references/voice.md
              measures zero em dashes across the sample, so it is a comma here.
              Nothing else about the sentence moved. */}
          <p className="mt-5 max-w-[38rem] text-[0.98rem] leading-relaxed text-ink/70">
            Every visit is different, so we design each itinerary around your
            goals, whether that&apos;s sourcing, sightseeing, or a mix of both.
            Below are two sample itineraries to give you a sense of what we can
            arrange.
          </p>
        </header>

        {/* items-stretch, by request, so the two cards are the same height.
            The business day has one more stop than the leisure day, so left to
            themselves the cards end 21px apart and the cream blocks do not
            line up along the bottom. Stretching pays for that with a little
            empty cream under the shorter day's last stop, which is the trade
            being made deliberately. If a third day is ever added, check this
            again: the wider the gap in stop counts, the more dead space the
            shorter column carries. */}
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
          {/* Both columns are the same card on the same cream. They are two
              shapes of one day rather than a thing and its alternative, so
              giving one of them a different surface made the plainer one read
              as the lesser option. The alignment problem the old inset caused
              goes away with it: identical padding on both sides means the two
              headings start level without compensating for anything. */}
          <div className="rounded-2xl bg-paper-card p-6 sm:p-10">
            <DayHeading
              kicker="For leisure"
              title="Shenzhen Highlights Tour"
              blurb="A one-day cultural and innovation route covering art, technology, and natural history."
            />

            <TimeSpine
              items={oneDayShenzhen}
              tone="paper"
              className="mt-10 max-w-[34rem]"
            />

            {leisure && <Included items={leisure.includes} />}
          </div>

          <div className="rounded-2xl bg-paper-card p-6 sm:p-10">
            <DayHeading
              kicker="For business"
              title="Business Sourcing Trip"
              blurb="A one-day itinerary focused on supplier visits, factory inspections, and sourcing opportunities."
            />

            {business && (
              <TimeSpine
                items={business.sampleDay}
                tone="paper"
                className="mt-10 max-w-[34rem]"
              />
            )}

            {business && <Included items={business.includes} />}
          </div>
        </div>

        <div className="mt-14 max-w-[42rem] border-t border-ink/12 pt-8">
          {/* Supplied copy, used as written with one character changed. The
              original joined the clause with an em dash, and references/voice.md
              measures zero em dashes across the sample, so it is a comma here.
              Nothing else about the sentence moved.

              ⚠️ THIS PARAGRAPH IS BUSINESS-SPECIFIC AND SITS UNDER BOTH CARDS.
              Supplier lists, factory visits and interpreters do not describe
              the leisure day above it. If it stays shared it should be worded
              for both, and if it is meant only for the sourcing trip it belongs
              inside that card. */}
          <p className="text-[0.95rem] leading-relaxed text-ink/70">
            Note: This itinerary is fully flexible based on your supplier list
            and priorities, we can add or remove factory visits, adjust meeting
            times, and arrange interpreters as needed.
          </p>
        </div>
      </div>
    </section>
  );
}

function DayHeading({
  kicker,
  title,
  blurb,
}: {
  kicker: string;
  title: string;
  blurb: string;
}) {
  return (
    <header>
      <p className="eyebrow text-moss">{kicker}</p>
      <h3 className="font-display mt-4 text-[1.6rem] leading-tight sm:text-[1.9rem]">
        {title}
      </h3>
      <p className="mt-3 max-w-[32rem] text-[0.92rem] leading-relaxed text-ink/65">
        {blurb}
      </p>
    </header>
  );
}

/**
 * What the day includes. Taken from the tour's own `includes` array rather
 * than restated here, so this list and the one on /tours/[slug] cannot drift
 * apart and quietly start promising different things.
 *
 * `includes` and not `removes`. The removes array is phrased as the problems
 * the day takes away, and a tick beside "Maps that will not resolve a Chinese
 * address" reads as though we are promising the problem.
 */
function Included({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-10 border-t border-ink/12 pt-6">
      <p className="eyebrow text-slate">Included</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-moss"
            />
            <span className="text-[0.9rem] leading-relaxed text-ink/75">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
