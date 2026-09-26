import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { SITE_URL } from "@/lib/site";
import { MarqueeBar } from "@/components/marquee-bar";
import { ServicesSection } from "@/components/services-section";
import { GuidesSection } from "@/components/guides-section";
import { WhyBookWithUs } from "@/components/why-book";
import { business, tours } from "@/lib/content";
import { GUESTS_INCLUDED, formatMoney, fromPrice } from "@/lib/pricing";
import { guides } from "@/lib/guides";

/**
 * /private-tour-guide-shenzhen — the service landing page.
 *
 * PRIMARY KEYWORD: "private tour guide Shenzhen". Everything else in the
 * supplied list is a supporting cluster and is mapped to a section below:
 *
 *   core service terms       hero, and the services block
 *   purpose-driven searches  "What people actually hire us for"
 *   traveller intent         "Days that are not about work"
 *   price and logistics      "What a day costs"
 *   language-specific        "Which languages, honestly"
 *   platform and marketplace "Where to find us, and what we cannot show you"
 *
 * ⚠️ WHY THIS IS NOT A COPY OF THE HOME PAGE, despite being asked to look like
 * one. Two URLs with the same words is the definition of duplicate content, and
 * the usual outcome is that a search engine picks one and ignores the other —
 * often the wrong one. So the LAYOUT and the shared components are the same
 * (hero, claim strip, services, guides, why us), and every word that is not in
 * a shared component is written for this keyword and appears nowhere else.
 * If you add a section here, ask which page it belongs to. It cannot be both.
 *
 * ⚠️ CLAIMS THIS PAGE REFUSES TO MAKE, because the codebase cannot back them:
 *   - Korean or Japanese guides. lib/guides.ts lists English, Mandarin and
 *     Cantonese. The languages section says so rather than chasing the keyword.
 *   - Review scores, star ratings, or a presence on Viator, GetYourGuide,
 *     Trip.com or Reddit. `testimonials` in lib/content.ts is still empty.
 *   - Any cancellation window or lead time. Both are PLACEHOLDER in `policy`.
 * Chasing a keyword with a sentence that is not true is how a landing page
 * becomes a complaint.
 */

const PATH = "/private-tour-guide-shenzhen";

export const metadata: Metadata = {
  title: "Private tour guide in Shenzhen, English speaking",
  description:
    "Hire a private English-speaking tour guide and interpreter in Shenzhen. Factory visits, Huaqiangbei, trade shows and city days, with a private car and driver included.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PATH}`,
    title: "Private tour guide in Shenzhen, English speaking",
    description:
      "A private guide and interpreter in Shenzhen for factory visits, sourcing, trade shows and city days. Fixed price, quoted first.",
    /* Declaring an `openGraph` block REPLACES the layout's, it does not merge
       with it. Without this line the page shipped with no og:image at all,
       while every page that stayed silent inherited one. */
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Private tour guide and interpreter in Shenzhen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private tour guide in Shenzhen, English speaking",
    description:
      "A private guide and interpreter in Shenzhen for factory visits, sourcing, trade shows and city days.",
    images: ["/og-default.jpg"],
  },
};

/**
 * The purpose-driven cluster, which is the highest-intent group in the list.
 * Somebody searching "Shenzhen factory visit translator" has a date and a
 * problem. They are not browsing.
 */
const reasons = [
  {
    title: "Business meetings and negotiations",
    detail:
      "An interpreter in the room for contract talks and supplier negotiations, including the technical vocabulary a general interpreter guesses at. You get told what was said, and also what was meant.",
  },
  {
    title: "Factory and supplier visits",
    detail:
      "Three or four plants in a day across Bao'an and Dongguan, with the driving planned around them. Someone with you who understands what is being shown on the floor and what is being skipped.",
  },
  {
    title: "Huaqiangbei and the electronics markets",
    detail:
      "More than twenty multi-storey malls, and prices that move depending on who is asking. A guide who hears the local number is the difference between sourcing and shopping.",
  },
  {
    title: "Trade shows and exhibitions",
    detail:
      "Booth-to-booth support at CHTF, CIOE, NEPCON and the rest, with a shortlist drawn up the night before. Specs and prices written down as they are said, not remembered afterwards.",
  },
  {
    title: "Canton Fair, from a Shenzhen base",
    detail:
      "Guangzhou is about an hour away, and a lot of sourcing visitors pair the fair with a Shenzhen factory week. We work to whichever city your days are in.",
  },
  {
    title: "Sourcing trips end to end",
    detail:
      "Market day, shortlist, factory visits, then the meetings that follow. One person across the whole week rather than a different face at each stop.",
  },
];

/** The traveller cluster. Lower intent, higher volume, different reader. */
const visitorDays = [
  {
    title: "A private city day",
    detail:
      "Futian's skyline, OCT-LOFT, Huaqiangbei, the food. Built around what you actually want to see rather than a fixed route.",
  },
  {
    title: "An airport layover",
    detail:
      "A long connection at Bao'an is enough for a real half day if somebody meets you and watches the clock. Tell us the flight numbers and we will say honestly whether it fits.",
  },
  {
    title: "Coming over from Hong Kong",
    detail:
      "The border is the whole logistical story of a day trip. We plan around the crossing and keep the first stop near it. Entry rules are yours to check for your own passport.",
  },
  {
    title: "A custom itinerary",
    detail:
      "Send the dates and what the trip is for. You get a plan back before you pay for anything.",
  },
];

export default function PrivateTourGuideShenzhenPage() {
  const languages = [...new Set(guides.flatMap((g) => g.languages))];

  const faqs = [
    {
      question: "How much does a private tour guide in Shenzhen cost?",
      answer: `A half day starts at ${fromPrice(tours[0]).label} and a business day with an interpreter starts at ${fromPrice(tours[1]).label}. The price covers up to ${GUESTS_INCLUDED} guests and includes a private vehicle and driver. You are quoted the total before you book, and nothing is charged on the day.`,
    },
    {
      question: "Is a driver included, or do I arrange transport myself?",
      answer:
        "A private vehicle and driver are included in the price, with fuel, tolls and parking. You are not paying a guide and then a separate car on top, and you are not waiting for taxis between stops.",
    },
    {
      question: "Can I hire an interpreter for meetings without a tour?",
      answer:
        "Yes. Interpreting is a service in its own right here, priced as a business day rather than as sightseeing. Half day or full day, in the room, at the factory, or at a stand.",
    },
    {
      question: "Which languages do your guides speak?",
      answer: `Between them our guides work in ${languages.join(", ")}. We do not have Korean or Japanese speakers in house. If you need one we will tell you that rather than send somebody who is close enough.`,
    },
    {
      question: "Can you help at Huaqiangbei and the electronics markets?",
      answer:
        "That is one of the most common reasons people book us. Bring a specific errand rather than a browse, and allow half a day if you are sourcing rather than looking.",
    },
    {
      question: "Do you cover the Canton Fair in Guangzhou?",
      answer:
        "Yes. Guangzhou is about an hour from Shenzhen and sourcing visitors routinely do both in one trip. Tell us which phase you are attending and we will build the week around it.",
    },
    {
      question: "How far ahead should I book?",
      answer:
        "As early as you have dates, especially in a fair week, when guides, cars and hotel rooms go at once. Send the dates and we will tell you what is left.",
    },
    {
      question: "Can I see reviews before booking?",
      answer:
        "Not yet, and we would rather say so than show you something invented. This is a new site and there are no published reviews on it. Ask for a call with the guide you would be meeting instead.",
    },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Private tour guide and interpreter in Shenzhen",
      serviceType: "Private tour guide, interpreter and translator",
      areaServed: [
        { "@type": "City", name: "Shenzhen" },
        { "@type": "City", name: "Guangzhou" },
      ],
      provider: {
        "@type": "LocalBusiness",
        name: business.name,
        url: SITE_URL,
        areaServed: "Shenzhen, Guangdong, China",
      },
      availableLanguage: languages,
      url: `${SITE_URL}${PATH}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Private tour guide in Shenzhen",
          item: `${SITE_URL}${PATH}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Same hero as the home page, different words. The booking bar inside it
          is the whole point of a landing page, so it stays. */}
      <Hero
        eyebrow="Private guide, interpreter and driver"
        title="A private tour guide"
        titleOutlined="in Shenzhen"
        subcopy="Hire an English-speaking guide and interpreter for factory visits, sourcing, trade shows and city days. Private car and driver included. Fixed price, quoted before you book."
      />

      <MarqueeBar />

      {/* --------------------------------------------------- Purpose */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
          <header className="max-w-[46rem]">
            <p className="eyebrow text-slate">Why people book</p>
            <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[2.8rem]">
              What people actually hire us for.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/70">
              Most of the work is not sightseeing. It is somebody who speaks
              both languages standing next to you while something expensive gets
              decided.
            </p>
          </header>

          <ol className="mt-14 grid gap-x-12 gap-y-10 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, i) => (
              <li key={reason.title}>
                <span
                  className="ghost-numeral block text-[2.5rem]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-[1.2rem] leading-tight">
                  {reason.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
                  {reason.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ServicesSection />

      {/* --------------------------------------------------- Traveller */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
          <header className="max-w-[46rem]">
            <p className="eyebrow text-slate">Not here for work</p>
            <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[2.8rem]">
              Days that are not about business.
            </h2>
          </header>

          <ul className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {visitorDays.map((day) => (
              <li key={day.title} className="border-t border-ink/15 pt-5">
                <h3 className="font-display text-[1.15rem] leading-tight">
                  {day.title}
                </h3>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink/70">
                  {day.detail}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-[42rem] text-[0.9rem] leading-relaxed text-ink/60">
            Planning a tech-heavy day yourself? The{" "}
            <Link
              href="/blog/top-5-high-tech-places-to-visit-in-shenzhen"
              className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              five places worth your time
            </Link>{" "}
            are written up in full, including the ones you do not need us for.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------- Price */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
          <header className="max-w-[46rem]">
            <p className="eyebrow text-slate">What it costs</p>
            <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[2.8rem]">
              One price, quoted before you book.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/70">
              Guide, car and driver in one number. No hourly meter running while
              you decide where to have lunch.
            </p>
          </header>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {tours.map((tour) => {
              const price = fromPrice(tour);
              return (
                <li
                  key={tour.slug}
                  className="border-l-2 border-moss bg-paper-card px-5 py-5"
                >
                  <h3 className="font-display text-[1.2rem]">{tour.name}</h3>
                  <p className="tabular mt-2 text-[0.85rem] text-ink/60">
                    From {price.label} for a half day
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

          <p className="mt-6 max-w-[44rem] text-[0.85rem] leading-relaxed text-ink/65">
            Prices cover up to {GUESTS_INCLUDED} guests and include the vehicle,
            fuel, tolls and parking. Entry tickets and meals stay yours to
            choose. Multi-day and anything outside these two shapes is quoted by
            arrangement, in writing, before you commit.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------- Languages */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
            <header className="lg:col-span-5">
              <p className="eyebrow text-slate">Languages</p>
              <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[2.8rem]">
                Which languages, honestly.
              </h2>
            </header>

            <div className="space-y-5 text-[0.95rem] leading-relaxed text-ink/75 lg:col-span-7">
              <p>
                Our guides work in {languages.join(", ")}. Every one of them
                speaks English and works this city daily, and the interpreting
                on a business day is done by the same person who is with you all
                day rather than by somebody who arrives for the meeting.
              </p>
              <p>
                We do not have Korean or Japanese speakers in house. People ask,
                and the honest answer is worth more than a booking. If that is
                what you need, say so when you write and we will tell you
                straight away rather than sending somebody who is close enough.
              </p>
              <p>
                Technical vocabulary is the part that separates an interpreter
                from a bilingual friend. Tell us the industry before the day and
                the terminology gets prepared in advance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GuidesSection />
      <WhyBookWithUs />

      {/* --------------------------------------------------- Marketplaces */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
            <header className="lg:col-span-5">
              <p className="eyebrow text-slate">Booking direct</p>
              <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[2.8rem]">
                What we cannot show you yet.
              </h2>
            </header>

            <div className="space-y-5 text-[0.95rem] leading-relaxed text-ink/75 lg:col-span-7">
              <p>
                People look for a guide on the big marketplaces, then look for
                reviews, then look for a way to message somebody. That is a
                sensible order and we are going to fail the middle step. There
                are no published reviews on this site, because there are no real
                ones yet, and an invented one is worse than none.
              </p>
              <p>
                What we can offer instead is a conversation with the person who
                would actually be with you. Send your dates and what the trip is
                for, and you get a plan and a price back before any money moves.
              </p>
              <p>
                Booking direct also means the person answering is the person
                turning up. Nothing is passed to a subcontracted driver and a
                separate interpreter on the morning.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/inquiry" className="btn btn-primary">
              Send your dates
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/calendar" className="btn btn-secondary">
              Check the fair calendar
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- FAQ */}
      <section className="bg-paper-dim py-20 sm:py-28">
        <div className="mx-auto max-w-[46rem] px-5 sm:px-8">
          <p className="eyebrow text-slate">Questions</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[2.8rem]">
            What people ask before booking.
          </h2>

          <dl className="mt-12 space-y-7">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-t border-ink/15 pt-5">
                <dt className="font-display text-[1.05rem] leading-tight">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-[0.94rem] leading-relaxed text-ink/75">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-[0.9rem] leading-relaxed text-ink/60">
            More on terms and payment is on the{" "}
            <Link
              href="/faq"
              className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              main FAQ
            </Link>
            , and the cancellation terms are in full on the{" "}
            <Link
              href="/cancellation-policy"
              className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              policy page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* --------------------------------------------------- Close */}
      <section className="on-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-[76rem] flex-wrap items-center justify-between gap-8 px-5 py-16 sm:px-8">
          <p className="font-display max-w-[32rem] text-[1.9rem] text-balance sm:text-[2.4rem]">
            Tell us the date and what the day is for.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/book" className="btn btn-primary">
              Book a day
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/inquiry" className="btn btn-secondary">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
