import type { Metadata } from "next";
import Link from "next/link";
import { services, tours } from "@/lib/content";
import { formatMoney, fromPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description:
    "Private city tours, exhibition and trade show support, sourcing and factory visits, meeting interpretation, logistics and on-call support in Shenzhen and the Greater Bay Area.",
};

/**
 * /services — everything this business sells, on one page.
 *
 * WHY IT EXISTS ALONGSIDE THE HOME PAGE SECTION AND /business-trip. The home
 * page's services block is a summary a visitor scrolls past on the way to a
 * date; /business-trip is one long argument aimed at somebody flying in to
 * work. This page is the index between them: every service, leisure and
 * business, with the one link that goes deeper on each.
 *
 * IT RESTATES NOTHING. The cards read `services` from lib/content.ts — the
 * same array the home page renders — and the prices come from lib/pricing via
 * `fromPrice`, so there is still exactly one number in the codebase for each
 * trip. Copy typed out again here would be copy that drifts.
 */
export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-24">
      <header className="max-w-[46rem]">
        <p className="eyebrow text-slate">Services</p>
        <h1 className="font-display mt-6 text-[2.4rem] text-balance sm:text-[3rem]">
          One guide, whatever the day is for.
        </h1>
        <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/70">
          The same person meets you at the hotel on Monday for a factory run and
          on Saturday for the skyline. Everything below is a day, or part of
          one, with a private vehicle and driver included and the price quoted
          before you commit.
        </p>
      </header>

      {/* ------------------------------------------------ The services */}
      <ol className="mt-14 grid gap-x-12 gap-y-10 border-t border-ink/15 pt-10 sm:grid-cols-2">
        {services.map((service, i) => (
          <li key={service.title}>
            {/* The numeral is decoration, not content — a screen reader
                announcing "zero one" before every heading adds nothing. */}
            <span className="ghost-numeral block text-[2.5rem]" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h2 className="font-display mt-2 text-[1.3rem] leading-tight">
              {service.title}
            </h2>

            <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
              {service.detail}
            </p>

            <Link
              href={service.href}
              className="nav-link mt-4 inline-block text-[0.85rem]"
            >
              Learn more
              <span aria-hidden="true"> →</span>
            </Link>
          </li>
        ))}
      </ol>

      {/* ------------------------------------------------ What it costs */}
      <section className="mt-20 border-t border-ink/12 pt-10">
        <p className="eyebrow text-slate">What it costs</p>
        <h2 className="font-display mt-6 text-[1.9rem] text-balance">
          Two ways to book a day.
        </h2>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {tours.map((tour) => {
            const price = fromPrice(tour);

            return (
              <li
                key={tour.slug}
                className="border-l-2 border-moss bg-paper-card px-5 py-5"
              >
                <h3 className="font-display text-[1.2rem]">{tour.name}</h3>
                <p className="tabular mt-2 text-[0.85rem] text-ink/60">
                  {price.label} {formatMoney(price.amount, "usd")}
                </p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/70">
                  {tour.promise}
                </p>
                <Link
                  href={`/tours/${tour.slug}`}
                  className="nav-link mt-4 inline-block text-[0.85rem]"
                >
                  What the day includes
                  <span aria-hidden="true"> →</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-[42rem] text-[0.85rem] leading-relaxed text-ink/65">
          Multi-day and anything outside these two shapes is quoted by
          arrangement — tell us the week and we will price it before you book.
        </p>
      </section>

      <div className="mt-16 border-t border-ink/12 pt-10">
        <h2 className="font-display text-[1.9rem] text-balance">
          Not sure which you need?
        </h2>
        <p className="mt-3 max-w-[40rem] text-[0.92rem] leading-relaxed text-ink/70">
          Describe the trip and we will tell you what it takes — including when
          the answer is less than you thought.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/book" className="btn btn-primary">
            Book a day
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/inquiry" className="btn btn-secondary">
            Ask a question
          </Link>
        </div>
      </div>
    </div>
  );
}
