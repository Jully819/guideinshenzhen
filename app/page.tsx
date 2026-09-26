import type { Metadata } from "next";
import Link from "next/link";
import { AttractionsSection } from "@/components/attractions-section";
import { ServicesSection } from "@/components/services-section";
import { MarqueeBar } from "@/components/marquee-bar";
import { OneDayTour } from "@/components/one-day-tour";
import { PastWork } from "@/components/past-work";
import ClientFeedback from "@/components/ui/testimonial";
import { Hero } from "@/components/hero";
import { testimonials } from "@/lib/content";

/**
 * SURFACE RHYTHM — read this before adding a section.
 *
 * No two adjacent sections share a background. The page steps between three
 * light surfaces. It used to bookend with ink at both ends; the hero is bone
 * now, so only the closing CTA is dark:
 *
 *   hero            paper
 *   claim strip     paper-card
 *   attractions     paper
 *   services        paper-dim
 *   one day         paper
 *   testimonials    paper-dim
 *   past work       paper
 *   closing CTA     ink
 *
 * Each background lives on its own component, not here, so a section can be
 * reordered without carrying a colour that then collides. If you move one,
 * check its new neighbours — two touching sections of the same bone is exactly
 * the flat run this rhythm was introduced to fix.
 *
 * Section order follows the Viator reference's conversion structure — a
 * date-first hero, trust marks, priced cards, a flexibility band — while the
 * treatment follows the AskSEOCoach reference.
 *
 * What is deliberately NOT borrowed from Viator: star ratings and review
 * counts. There are no real reviews yet, and inventing them is a lie to
 * customers and unlawful in several jurisdictions. The testimonials section
 * below stays hidden until `testimonials` has genuine entries.
 */
/**
 * The home page had no `metadata` export at all, so it inherited the layout's
 * title and description and shipped with no canonical URL. Title and
 * description still come from the layout, deliberately — they are the site
 * defaults and this IS the site's front door. The canonical is what was
 * missing: without it, every tracking parameter somebody appends to the domain
 * is a separate URL as far as a crawler is concerned.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ---------------------------------------------------------------
          The claim strip, directly under the hero. It is the join between
          the dark hero and the bone page, and it carries the facts a
          visitor would otherwise have to scroll to find.
      --------------------------------------------------------------- */}
      <MarqueeBar />

      {/* ---------------------------------------------------------------
          REMOVED: "What's on" — the fair calendar that sat here.

          It now has a page of its own at /calendar, linked from the header,
          where the whole year fits including the quiet months. The data
          (`shenzhenEvents`, `shenzhenDevelopments` in lib/content.ts) is
          unchanged and components/whats-on.tsx still exists, now unused —
          nothing else imports it.

          Surface rhythm: this leaves the paper-card claim strip touching the
          paper attractions section, which is still two different bones, so
          the rule above holds.
      --------------------------------------------------------------- */}

      {/* ---------------------------------------------------------------
          Where a day can go. Answers "what would we actually do?" while
          the hero's booking bar is still in reach — the visitor scrolls
          back up to it rather than leaving to research the city.
      --------------------------------------------------------------- */}
      <AttractionsSection />

      {/* ---------------------------------------------------------------
          What is actually sold, in five cards. Replaced the "Built around
          you" band that briefly sat here; the customisation argument now
          lives inside the first card's copy rather than in a section of
          its own. `customisation` in lib/content.ts is what that band was
          built from and is currently unused.
      --------------------------------------------------------------- */}
      <ServicesSection />

      {/* ---------------------------------------------------------------
          REMOVED: "Which day to book" — the Private vs Business comparison
          table that sat here. The services section above now covers the
          same ground in prose, and the two trips are still compared row by
          row on each /tours/[slug] page.

          components/trip-comparison.tsx and `tripComparison` in
          lib/content.ts are both still present and now unused; nothing else
          imports either.
      --------------------------------------------------------------- */}

      {/* ---------------------------------------------------------------
          REMOVED: "The team" — the GuidesSection band that sat here, the
          question a visitor asks once they know what they are booking.

          components/guides-section.tsx still exists and is still rendered on
          /private-tour-guide-shenzhen, so deleting the file would break that
          page. lib/guides.ts is still read by it. Nothing else on the home
          page imports either.

          ⚠️ SURFACE RHYTHM. This band was bg-paper and it was the only thing
          separating the services section above from the testimonials below,
          both of which are paper-dim. Those two now touch in the same colour,
          which is the flat run the note under "Why us" was written about.
          Fixing it means stepping one of the two back to bg-paper.
      --------------------------------------------------------------- */}

      {/* REMOVED: "Why us" — the WhyBookWithUs band that sat here, directly
          under the team. components/why-book.tsx still exists and is still
          rendered on /private-tour-guide-shenzhen, so deleting the file would
          break that page. Nothing else on the home page imports it.

          Its removal is why the two surfaces below changed. It was paper-dim,
          and taking it out left guides (paper) touching testimonials (paper),
          which is the flat run the rhythm above exists to prevent. */}

      {/* ---------------------------------------------------------------
          A worked example of one day, in the slot the team section used to
          hold. It answers the question that sits between the two sections
          around it — services says what is sold, the quotes below say it went
          well, and neither says what a day is actually like.

          It is also what puts the surface rhythm back. Removing the team band
          left services (paper-dim) touching testimonials (paper-dim), and this
          section is bone between them.
      --------------------------------------------------------------- */}
      <OneDayTour />

      {/* ---------------------------------------------------------------
          Customer quotes, directly under the guides — the question "who
          will I be with?" and the question "did that go well for anybody
          else?" are the same question asked twice.

          ⚠️ EVERY QUOTE IN HERE IS INVENTED. See the header of
          components/ui/testimonial.tsx: this block must have real,
          permissioned quotes before launch, or be removed. The `testimonials`
          array in lib/content.ts is the honest version of this section and is
          still empty on purpose.
      --------------------------------------------------------------- */}
      <ClientFeedback />

      {/* ---------------------------------------------------------------
          Past work, directly under the quotes: the same argument in the
          other direction — the quotes say it went well, this says what
          "it" was. Sits on paper-dim against the testimonial wall's paper.

          ⚠️ The cards describe day TYPES, not jobs that happened, and say
          so on the page. See the header of components/past-work.tsx before
          launch.
      --------------------------------------------------------------- */}
      <PastWork />

      {/* ---------------------------------------------------------------
          REMOVED: "Where a day goes" — the photo carousel that sat here.

          It has moved up into the About section, which was already showing
          the same nine places from lib/attractions.ts as a track of drawn
          cards. The photographs replaced those cards rather than joining
          them: one list shown twice on one page, in two treatments, is the
          kind of duplication that drifts. The #gallery anchor moved with it
          and nothing links to it.
      --------------------------------------------------------------- */}

      {/* REMOVED: the four-block trust strip — "One guide, all day", "Pay by
          card", "Fixed price, quoted first", "Free cancellation". `assurances`
          in lib/content.ts is what it was built from and is now unused.

          Worth knowing what went with it: that strip was the only place on the
          home page stating the payment method and the cancellation terms. The
          cancellation terms now live on /cancellation-policy, linked from the
          footer and from the closing CTA below. */}

      {/* ---------------------------------------------------------------
          REMOVED: three sections used to sit here.

            - "What a day is for" (#tours) — the two priced trip cards
            - "A day, handled" — the sample day on the time-spine
            - "How it works" (#how) — the four numbered steps

          None of the data behind them was deleted. `tours`, `sampleDay` and
          `howItWorks` all still live in lib/content.ts, the sample day still
          renders on each /tours/[slug] page, and the trip comparison above
          still carries both trips and their prices — so this is a change to
          what the home page ARGUES, not to what the site knows.

          The header nav lost its "What a day is for" and "How it works"
          entries in the same edit: both were anchors to these sections, and
          an anchor to an id that no longer exists is a link that silently
          does nothing.
      --------------------------------------------------------------- */}

      {/* Real testimonials only. Section stays hidden until they exist. */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-[76rem] px-5 pb-20 sm:px-8">
          <ul className="grid gap-8 sm:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name}>
                <blockquote className="font-display text-[1.2rem] leading-snug">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-3 text-[0.85rem] text-ink/60">
                  {t.name} · {t.origin}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------------------------------------------------------
          The "Paying" band that used to sit here has moved to /faq. The
          payment terms are still on the home page in the trust strip near the
          top ("Pay by card", "Fixed price, quoted first", "Free
          cancellation"), which is where a visitor deciding whether to book
          needs them — the full band was the same argument a second time,
          lower down, where it delayed the closing CTA.
      --------------------------------------------------------------- */}

      {/* The FAQ preview that used to sit here is gone. /faq now carries the
          same questions in a tabbed accordion, and repeating the first four
          flat on the home page meant a visitor met them twice, in two
          different treatments, one of which quietly disagreed with the other
          about how many there were. FAQ is reachable from the header nav and
          the footer. */}

      {/* Closing CTA on the dark band. The button inverts to bone on ink —
          see .on-ink .btn-primary. */}
      <section className="on-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-[76rem] flex-wrap items-center justify-between gap-8 px-5 py-16 sm:px-8">
          <p className="font-display max-w-[32rem] text-[1.9rem] text-balance sm:text-[2.4rem]">
            Pick a date. We&rsquo;ll take it from there.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/inquiry" className="btn btn-primary">
              Book Now
              <span aria-hidden="true">→</span>
            </Link>
            {/* The policy sits beside the CTA, not buried in the footer: it is
                the question a visitor asks immediately after "how much" and
                immediately before committing to dates. */}
            <Link href="/cancellation-policy" className="btn btn-secondary">
              Cancellation policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
