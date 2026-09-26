import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TimeSpine } from "@/components/time-spine";
import { durations, getTour, policy, tours } from "@/lib/content";
import { GUESTS_INCLUDED, formatMoney, quote } from "@/lib/pricing";

/** Three purposes, three static pages. Generated at build time. */
export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return { title: tour.name, description: tour.promise };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  return (
    <>
      <section className="on-ink bg-ink text-paper">
        <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow text-citron">A day for</p>
          <h1 className="font-display mt-6 max-w-[20ch] text-[2.4rem] text-balance sm:text-[3.4rem]">
            {tour.name}
          </h1>
          <p className="mt-6 max-w-[38rem] text-[1rem] leading-relaxed text-paper/75">
            {tour.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`/book?tour=${tour.slug}&hours=4`}
              className="btn btn-primary"
            >
              Check availability
              <span aria-hidden="true">→</span>
            </Link>
            <p className="tabular text-[0.85rem] text-paper/60">
              From {formatMoney(quote(tour, 4, 1).total, policy.currency)} ·
              half day
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- What is included */}
      <section className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-slate">Included</p>
            <ul className="mt-6 space-y-3">
              {tour.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.95rem] leading-relaxed"
                >
                  <span
                    className="mt-[0.5rem] inline-block size-1.5 shrink-0 rotate-45 bg-moss"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-slate">Not included</p>
            <ul className="mt-6 space-y-3">
              {tour.excludes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/70"
                >
                  {/* Deliberately not a moss diamond: the two lists sit side by
                      side, and giving both the same marker made the exclusions
                      scan as more things you get. */}
                  <span className="mt-[0.15rem] shrink-0 text-ink/35" aria-hidden="true">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Sample day */}
      <section className="on-ink bg-ink text-paper">
        <div className="mx-auto grid max-w-[76rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
          <header className="lg:col-span-4">
            <p className="eyebrow text-mist">Roughly how it runs</p>
            <h2 className="font-display mt-6 text-[2rem] text-balance sm:text-[2.4rem]">
              An example, not a timetable.
            </h2>
            <p className="mt-5 max-w-[26rem] text-[0.95rem] leading-relaxed text-paper/65">
              Nothing here is fixed. The order gets rebuilt around what you want
              and what the day is doing — this is what a full day tends to look
              like once it is.
            </p>
          </header>
          <div className="lg:col-span-7 lg:col-start-6">
            <TimeSpine items={tour.sampleDay} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Price */}
      <section className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8 sm:py-24">
        <p className="eyebrow text-slate">What it costs</p>
        <h2 className="font-display mt-6 text-[2rem] sm:text-[2.4rem]">
          Fixed, and quoted before you pay.
        </h2>

        <table className="mt-10 w-full max-w-[36rem] text-left">
          <caption className="sr-only">
            Price by length of day, for up to {GUESTS_INCLUDED} guests
          </caption>
          <thead>
            <tr className="border-b border-ink/20">
              <th scope="col" className="eyebrow py-3 font-normal text-slate">
                Length
              </th>
              <th scope="col" className="eyebrow py-3 text-right font-normal text-slate">
                Up to {GUESTS_INCLUDED} guests
              </th>
            </tr>
          </thead>
          <tbody>
            {durations.map((d) => (
              <tr key={d.hours} className="border-b border-ink/12">
                <th scope="row" className="py-4 text-[0.95rem] font-normal">
                  {d.label}
                  <span className="text-ink/60"> · {d.hours} hours</span>
                </th>
                <td className="tabular py-4 text-right text-[1.05rem]">
                  {formatMoney(quote(tour, d.hours, 1).total, policy.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-5 max-w-[36rem] text-[0.88rem] leading-relaxed text-ink/60">
          Parties larger than {GUESTS_INCLUDED} are charged per additional
          guest, shown before you pay. Free cancellation up to{" "}
          {policy.cancellationHours} hours before the start.
        </p>

        <Link
          href={`/book?tour=${tour.slug}&hours=4`}
          className="btn btn-primary mt-10"
        >
          Pick a date
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* ------------------------------------------------- The other two */}
      <section className="border-t border-ink/10 bg-paper-card">
        <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8">
          <p className="eyebrow text-slate">Came for something else?</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {tours
              .filter((t) => t.slug !== tour.slug)
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/tours/${t.slug}`}
                  className="font-display text-[1.4rem] underline underline-offset-8 hover:text-ink/60"
                >
                  {t.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
