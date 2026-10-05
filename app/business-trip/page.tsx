import type { Metadata } from "next";
import Link from "next/link";
import { business, getTour, policy } from "@/lib/content";
import { formatMoney, quote } from "@/lib/pricing";

/**
 * /business-trip — the service page for people flying in to work.
 *
 * WHY THIS EXISTS ALONGSIDE /tours/business. That page is the PRODUCT: what a
 * day contains, what it costs, what is excluded, generated from `tours` in
 * lib/content.ts. This one is the ARGUMENT — exhibitions, sourcing,
 * interpreting, logistics — written as prose for someone searching for
 * business interpreting in Shenzhen rather than browsing a tour list. Both
 * point at the same booking flow with `tour=business` preselected.
 *
 * Two pages about one product is a real risk: they compete for the same search
 * term and they drift apart when only one gets edited. They are cross-linked
 * in both directions for that reason, and the PRICE is not restated here —
 * it is read from lib/pricing so there is exactly one number in the codebase.
 *
 * Copy supplied by the business, used as given. The claims in "Why work with
 * us" are theirs to stand behind: sector experience, terminology, briefing.
 * Nothing here invents a testimonial, a certification or a client name.
 */

const businessTour = getTour("business")!;

export const metadata: Metadata = {
  alternates: { canonical: "/business-trip" },
  title: "Business trip support in Shenzhen",
  description:
    "A dedicated English-fluent guide and interpreter for exhibitions, factory visits, sourcing and business meetings in Shenzhen.",
};

/**
 * `id` is the anchor the home page's service cards link to — see `services`
 * in lib/content.ts. Renaming one without the other silently turns a "Learn
 * more" into a link that dumps the visitor at the top of this page.
 */
const services = [
  {
    id: "exhibitions",
    title: "Exhibition & trade show support",
    detail:
      "Navigate major exhibitions in Shenzhen with a guide who handles booth negotiations, vendor conversations, and real-time translation so you never miss a detail or an opportunity.",
  },
  {
    id: "sourcing",
    title: "Sourcing & factory visits",
    detail:
      "Vet factories, negotiate terms, and avoid costly miscommunications on-site with a guide who knows how to get things done.",
  },
  {
    id: "interpretation",
    title: "Business meeting interpretation",
    detail:
      "Professional, accurate translation for negotiations, contract discussions, and client meetings — technical, legal, and industry-specific vocabulary included.",
  },
  {
    id: "logistics",
    title: "Logistics & local navigation",
    detail:
      "Transportation, scheduling, and cultural guidance so you can focus entirely on business.",
  },
  {
    id: "insight",
    title: "Cultural & negotiation insight",
    detail:
      "Understand what is really being said in the room, and how to respond.",
  },
];

const reasons = [
  "Fluent in business, technical, and industry-specific terminology",
  "Experienced across manufacturing, electronics, and trade sectors",
  "Flexible scheduling — single meetings, multi-day trips, or full trade show coverage",
  "Discreet, professional, and fully briefed before every engagement",
];

export default function BusinessTripPage() {
  const from = formatMoney(quote(businessTour, 4, 1).total, policy.currency);

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="on-ink bg-ink text-paper">
        <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow text-citron">Business trip</p>
          <h1 className="font-display mt-6 max-w-[18ch] text-[2.4rem] text-balance sm:text-[3.4rem]">
            Your business partner on the ground in China.
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1rem] leading-relaxed text-paper/75">
            Doing business in China takes more than a translator — it takes
            someone who understands the market, the culture, and how to get
            things done. Our business support service gives you a dedicated,
            English-fluent guide and interpreter for every stage of your trip.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/book?tour=business&hours=8"
              className="btn btn-primary"
            >
              Arrange your trip
              <span aria-hidden="true">→</span>
            </Link>
            <p className="tabular text-[0.85rem] text-paper/60">
              From {from} · half day
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- What we help with
          Numbered rather than bulleted: these are the five things the day can
          be pointed at, and a visitor picks one. Ghost numerals are the same
          device the home page's "How it works" uses. */}
      <section className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8 sm:py-28">
        <header className="max-w-[42rem]">
          <p className="eyebrow text-slate">What we help with</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[2.8rem]">
            Five ways a day gets used.
          </h2>
        </header>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            /* scroll-mt: the header is sticky, so an anchored jump would put
               the heading underneath it. This pushes the target down by the
               header's height plus a little air. */
            <li
              key={s.title}
              id={s.id}
              className="scroll-mt-28 border-t border-ink/15 pt-5"
            >
              <span
                className="ghost-numeral block text-[3rem]"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-[1.25rem]">{s.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink/70">
                {s.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------- Why work with us */}
      <section className="on-ink bg-ink text-paper">
        <div className="mx-auto grid max-w-[76rem] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
          <header className="lg:col-span-5">
            <p className="eyebrow text-mist">Why work with us</p>
            <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[2.6rem]">
              Briefed before you land.
            </h2>
            <p className="mt-5 max-w-[26rem] text-[0.95rem] leading-relaxed text-paper/65">
              Send the agenda, the terminology and the documents ahead of the
              day. Whoever meets you has read them.
            </p>
          </header>

          <ul className="space-y-4 lg:col-span-6 lg:col-start-7">
            {reasons.map((r) => (
              <li
                key={r}
                className="flex gap-4 border-b border-paper/15 pb-4 text-[0.98rem] leading-relaxed text-paper/85"
              >
                {/* Drawn, not a "✓" character: a tick typed into the text is
                    read aloud as "check mark" before every single line. */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="mt-1 shrink-0 text-citron"
                  aria-hidden="true"
                >
                  <path d="M3 9.5 7 13.5 15 4.5" />
                </svg>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------ Close */}
      <section className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-[46rem]">
          <h2 className="font-display text-[2rem] text-balance sm:text-[2.6rem]">
            Travelling to China for business shouldn&rsquo;t mean navigating it
            alone.
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-ink/70">
            Let us bridge the language and logistics gap — so your deals move
            faster and smoother. Tell us the dates and what the trip is for, and
            we will arrange your dedicated business support in {business.city}.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/book?tour=business&hours=8"
              className="btn btn-primary"
            >
              Arrange your trip
              <span aria-hidden="true">→</span>
            </Link>
            <p className="tabular text-[0.9rem] text-slate">
              WeChat: {business.wechatId}
            </p>
          </div>

          <p className="mt-10 border-t border-ink/12 pt-6 text-[0.9rem] text-ink/60">
            Prices, inclusions and what a business day actually contains are on{" "}
            <Link
              href="/tours/business"
              className="text-moss underline underline-offset-4 hover:text-ink"
            >
              the Business Trip day page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
