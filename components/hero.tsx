import { existsSync } from "node:fs";
import { join } from "node:path";
import { BookingBar } from "@/components/booking/booking-bar";
import { HeroVideo } from "@/components/hero-video";

const HERO_IMAGE = "/hero-shenzhen.jpg";

/**
 * Checked on the server rather than letting a missing file 404 in the browser
 * on every page load. This is a server component, so the check costs nothing
 * and never reaches the client.
 */
function heroImageInstalled(): boolean {
  return existsSync(join(process.cwd(), "public", HERO_IMAGE));
}

/**
 * Full-bleed BONE hero: headline left, booking bar across the bottom.
 *
 * IT USED TO BE INK. The section, the eyebrow, the outlined headline, the
 * subcopy and the line drawing all carried colours chosen for a near-black
 * background, and every one of them had to move when the surface did. The two
 * that fail silently rather than visibly are worth knowing about: the citron
 * eyebrow drops to roughly 1.2:1 on bone, and `.text-outline` defaults its
 * stroke to bone, so the second headline line disappears completely unless
 * --outline is overridden.
 *
 * PHOTOGRAPHY — the one thing to know before editing this file.
 *
 * The site ships with no photograph. Drop a licensed landscape image at
 * `public/hero-shenzhen.jpg` and it becomes the full-bleed background, and the
 * drawn skyline steps aside — a photograph and a line drawing fighting for the
 * same hero is noise, so it is one or the other, never both.
 *
 * Wanted: 2400px wide or better, landscape, and dark or busy on the LEFT THIRD
 * where the headline sits. A bright sky behind that text is what breaks it.
 *
 * Do not put a watermarked stock preview here. It is not licensed, and the
 * watermark is visible at hero size.
 */
/**
 * Every prop is optional and defaults to the home page's own words, so the home
 * page calls <Hero /> and is unchanged. The landing pages pass their own.
 *
 * `title` and `titleOutlined` are two lines, not one string, because the second
 * line gets the outlined treatment and the break between them is deliberate.
 * Keep `titleOutlined` short. Measured at 1024px, "With local guides" already
 * fills 464px of a 538px column, so there is very little slack.
 *
 * `as` exists because a page may only have one h1. On the home page this block
 * IS the h1. If a landing page ever puts its h1 somewhere else, pass "p".
 */
export function Hero({
  eyebrow = "Business Trip & Leisure Tours Support",
  title = "Discover Shenzhen",
  titleOutlined = "With local guides",
  /* THE RANKING CLAIM IS GONE FROM THIS LINE, deliberately. It used to read
     "Top 1% of 2,000+ English-speaking guides in China", which was a
     comparative superlative against a stated pool with no source behind it.
     That is the kind of claim a business has to be able to prove on request
     under UK CPUTR, the EU UCPD and the US FTC Act, and references/stats.md
     still does not exist, so nothing in this repo could have backed it.

     ⚠️ DO NOT PUT A NUMBER BACK IN HERE without a source recorded in
     stats.md. "Expert" and "know Shenzhen inside and out" are opinion and
     puffery, which is a different and much safer category than a measured
     rank. Adding "top 1%" or a guide count moves the sentence back across
     that line.

     The subcopy before all of these was not deleted, it now opens the About
     section in components/attractions-section.tsx. */
  subcopy = "Expert English-speaking guides who know Shenzhen inside and out. Whether you're here for business or leisure, we handle the logistics so you can focus on what matters.",
  as: Heading = "h1",
}: {
  eyebrow?: string;
  title?: string;
  titleOutlined?: string;
  subcopy?: string;
  as?: "h1" | "p";
} = {}) {
  const hasPhoto = heroImageInstalled();

  return (
    <section className="on-paper relative isolate overflow-hidden bg-paper text-ink">
      {hasPhoto && (
        /* Decorative, so empty-alt and hidden from assistive tech. Not
           next/image: this is a single full-bleed background that must be
           eager, and the optimiser buys nothing here. */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
      )}

      {/* Both exist ONLY to make a photograph safe to put display text on.
          The scrim is a near-black gradient and the grain stops it banding. On
          the bone hero with no photograph installed the scrim would wash the
          whole section almost black, which is the opposite of the point, so
          neither renders unless there is an image under them. */}
      {hasPhoto && (
        <>
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
        </>
      )}

      {/* The bottom padding is deliberately larger than the top rhythm needs.
          The marquee claim strip sits flush under this section, and at pb-8 it
          read as an extension of the booking bar rather than as the join into
          the page. The extra space is what separates the two. Reducing it puts
          the strip back on the bar's shoulder. */}
      <div className="relative mx-auto max-w-[76rem] px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20 lg:pt-20">
        {/* Headline left, city right. items-end rather than items-center: the
            drawing's ground line and the baseline of the copy should sit on
            the same shelf, which centring breaks the moment the copy wraps to
            a different number of lines. */}
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
          {/* NOT animated, deliberately. This block holds the h1 and the
              subheading, and the subheading is this page's Largest Contentful
              Paint. `.animate-spine-rise` starts at opacity 0 with fill mode
              `both`, so an animated LCP element is invisible until the
              animation finishes and the metric is charged for every millisecond
              of it. Lighthouse measured 2,230ms of "element render delay" here
              and this was all of it. The skyline and the booking bar below
              still animate, because neither is ever the largest paint. */}
          <div className="lg:col-span-7">
            {/* text-slate, not text-citron. Citron is the accent for ink
                bands and measures about 1.2:1 on bone, which globals.css
                already records as unreadable. Slate is the eyebrow colour the
                light sections use. */}
            <p className="eyebrow text-slate">{eyebrow}</p>

            {/* "Business Trip & Leisure Tours Support" USED TO BE A DECK LINE
                INSIDE THIS HEADING. It moved up into the eyebrow above, so it
                is deliberately not repeated here — printing the same phrase
                twice, forty pixels apart, reads as a mistake rather than as
                emphasis. The eyebrow is the better home for it anyway: it is
                the slot on this site that exists for naming what a page is.

                Back to two lines, so the sizes step back up towards where they
                were before the long headline forced them down. */}
            <Heading className="font-display mt-6 text-[2.1rem] sm:text-[3.1rem] xl:text-[3.5rem]">
              {/* No comma after "Shenzhen" and no full stop anywhere in this
                  hero: the line break already does the work the comma was
                  doing, and terminal punctuation on display type reads as
                  hesitation at this size. */}
              {title}
              <br />
              {/* The outlined-phrase treatment, used exactly once on the site.
                  It lands on the second line, which is now "With local guides"
                  rather than "Your Way" — so the heaviest type treatment on the
                  page says who you are with instead of how flexible the day is.

                  Twice the characters of the phrase it replaced. Measured at
                  1024px, the tightest case: it fills roughly 464px of the 538px
                  column, so it still holds one line, but there is not much
                  slack left for a longer phrase here. */}
              {/* --outline defaults to bone because its only home used to be
                  the ink hero. On the bone hero that is bone-on-bone, so the
                  line vanishes entirely. globals.css says to override the
                  custom property rather than the class, which is what this is. */}
              <span className="text-outline [--outline:var(--color-ink)]">
                {titleOutlined}
              </span>
            </Heading>

            {/* Subheadline, supplied by the business and used verbatim.
                It names the four things sold; the services section on the home
                page is where each one is explained.

                NOTE FOR WHOEVER EDITS lib/content.ts NEXT: this line claims
                coverage of the Greater Bay Area, which is wider than
                `business.city` and wider than anything else on the site
                promises. If the service really does travel to Guangzhou,
                Dongguan or Hong Kong, the pricing, the travel time in a day
                and the FAQ all need to say so too. */}
            <p className="mt-5 max-w-[34rem] text-[1rem] leading-relaxed text-ink/70 lg:text-[1.05rem]">
              {subcopy}
            </p>
          </div>

          {/* The welcome film, where the drawn skyline used to be. Still
              desktop-only, for the reason the drawing was: on a phone the
              booking bar is the only thing that matters above the fold. The
              component gates itself on a media query rather than relying on
              `hidden`, because a hidden video still downloads and this one is
              14MB. See the header of components/hero-video.tsx.

              No `animate-spine-rise` on it. That animation starts at opacity 0
              with fill mode `both`, and putting it on the largest element in
              the hero is how the subheading ended up charged for 2,230ms of
              render delay before. The video arrives on its own poster instead.

              components/skyline.tsx is now unused by this file. It is still
              imported by nothing else, so it is dead unless something adopts
              it. Left in place rather than deleted, as the drawing is the
              fallback if the film is ever pulled. */}
          {!hasPhoto && <HeroVideo />}
        </div>

        {/* The bar goes below the copy, not beside it: it is the widest element
            on the page and the last thing read before acting. */}
        <div
          className="animate-spine-rise mt-10 sm:mt-12"
          style={{ animationDelay: "120ms" }}
        >
          <BookingBar />
        </div>
      </div>
    </section>
  );
}
