import Link from "next/link";
import { policy, tours, tripComparison } from "@/lib/content";
import { fromPrice } from "@/lib/pricing";

/**
 * Private Trip vs Business Trip.
 *
 * ADAPTED FROM THE SUPPLIED shadcn COMPARISON BLOCK, NOT INSTALLED FROM IT.
 * That component is built on shadcn primitives (Card, Badge, Separator,
 * Button), Radix, class-variance-authority and @remixicon/react, and it styles
 * itself with shadcn's token names — bg-primary, text-muted-foreground,
 * bg-card, border-input. None of those tokens exist in this project's theme,
 * which is bone/ink/citron in app/globals.css. Installing it would have added
 * four dependencies and a second, competing set of design tokens, and the
 * component would have rendered grey-on-grey against everything around it.
 * The structure is kept: two cards side by side, a tick column against a
 * neutral column, a recommended badge, a footer action on each.
 *
 * WHAT IS DELIBERATELY DIFFERENT. The original compares "us" against "the
 * others" — eight glowing ticks beside eight crosses aimed at unnamed
 * competitors. Both columns here are things this business sells, so every row
 * is answered for both and neither column is a strawman. A cross is used only
 * where something genuinely is not part of that day, never to imply one choice
 * is worse. Ticking one column and crossing the other for the same row would
 * be an advert wearing a comparison's clothes.
 */
export function TripComparison() {
  const [privateTrip, businessTrip] = tours;

  return (
    <section
      id="compare"
      className="border-t border-ink/10 bg-paper-dim py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <header className="max-w-[46rem]">
          <p className="eyebrow text-slate">Which day to book</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[3rem]">
            Two ways to spend a day here.
          </h2>
          <p className="mt-5 max-w-[36rem] text-[0.98rem] leading-relaxed text-ink/70">
            Same guide, same car, same fixed price up front. What changes is
            what the day is pointed at — and what you go home with.
          </p>
        </header>

        {/* On mobile the two cards stack, which is why each row repeats its own
            label inside the card rather than relying on a shared header column:
            a comparison table that loses its labels when it stacks is unusable
            on the device most people will read it on. */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <TripCard
            name={privateTrip.name}
            promise={privateTrip.promise}
            slug={privateTrip.slug}
            price={fromPrice(privateTrip).label}
            rows={tripComparison.map((r) => ({
              label: r.label,
              value: r.private,
            }))}
            featured
          />
          <TripCard
            name={businessTrip.name}
            promise={businessTrip.promise}
            slug={businessTrip.slug}
            price={fromPrice(businessTrip).label}
            rows={tripComparison.map((r) => ({
              label: r.label,
              value: r.business,
            }))}
          />
        </div>

        <p className="mt-8 text-[0.88rem] text-ink/60">
          Both are refunded in full if you cancel more than{" "}
          {policy.cancellationHours} hours before the start.
        </p>
      </div>
    </section>
  );
}

interface Row {
  label: string;
  value: string;
}

function TripCard({
  name,
  promise,
  slug,
  price,
  rows,
  featured = false,
}: {
  name: string;
  promise: string;
  slug: string;
  price: string;
  rows: Row[];
  featured?: boolean;
}) {
  return (
    <article
      className={`flex flex-col rounded-2xl bg-paper-card ${
        featured ? "border-2 border-ink" : "border border-ink/15"
      }`}
    >
      <header className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-[1.5rem] leading-none">{name}</h3>
          {featured && (
            <span className="eyebrow rounded-full bg-ink px-3 py-1.5 text-paper">
              Most booked
            </span>
          )}
        </div>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
          {promise}
        </p>
        <p className="tabular mt-4 text-[0.9rem] text-ink/60">
          From {price}
          <span className="text-ink/40"> · half day, 1 guest</span>
        </p>
      </header>

      <div className="border-t border-ink/12 px-6 py-2 sm:px-8">
        <dl>
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex gap-4 border-b border-ink/10 py-4 last:border-b-0"
            >
              <Mark included={isIncluded(row.value)} />
              <div className="min-w-0">
                <dt className="eyebrow text-slate">{row.label}</dt>
                <dd
                  className={`mt-1.5 text-[0.9rem] leading-snug ${
                    isIncluded(row.value) ? "text-ink/80" : "text-ink/60"
                  }`}
                >
                  {row.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {/* mt-auto: the two cards carry the same rows so they usually match in
          height, but the copy wraps differently at some widths and the buttons
          must still line up. */}
      <div className="mt-auto border-t border-ink/12 p-6 sm:p-8">
        <Link
          href={`/book?tour=${slug}`}
          className={`btn w-full justify-center ${
            featured ? "btn-primary" : "btn-secondary"
          }`}
        >
          Book a {name.toLowerCase()}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

/**
 * A row is "not included" only when the copy says so outright. Deliberately a
 * whitelist of exact phrases rather than a keyword search: a fuzzy match on
 * "not" would cross out "Prices that move depending on who is asking" the
 * moment someone rewrote it, and a wrongly crossed row misrepresents what is
 * being sold.
 */
const NOT_INCLUDED = new Set(["Not part of this day", "Not usually needed"]);

function isIncluded(value: string): boolean {
  return !NOT_INCLUDED.has(value);
}

function Mark({ included }: { included: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
        included ? "bg-ink text-paper" : "bg-ink/10 text-ink/40"
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {included ? <path d="M5 13l4 4L19 7" /> : <path d="M6 6l12 12M18 6L6 18" />}
      </svg>
    </span>
  );
}
