import { GalleryCarousel } from "@/components/gallery-carousel";

/**
 * The About section: the copy, then the photographs.
 *
 * WHAT CHANGED: this section used to pair the copy with
 * components/attractions-carousel.tsx — a track of nine drawn cards — while a
 * second section further down the page, "Where a day goes", showed the same
 * nine places again as photographs. One list, two carousels, two treatments.
 * The photo carousel moved up here and the card track was retired; see the
 * note at the top of components/attractions-carousel.tsx, which is now unused.
 *
 * The copy below moved here from that component and is the business's own
 * wording, kept verbatim.
 *
 * ⚠️ THE FIRST SENTENCE DOES NOT RESOLVE. "whether that means the futuristic
 * skyline of Futian, the artsy laneways of OCT-LOFT, the electronics markets of
 * Huaqiangbei, our private guides give you local access…" — the list never gets
 * its verb, and the sentence restarts mid-clause. Left exactly as supplied
 * rather than quietly rewritten, because it is the owner's voice; the fix is
 * one word and one full stop: "…the electronics markets of Huaqiangbei. Our
 * private guides give you local access…"
 */
export function AttractionsSection() {
  return (
    <section
      id="attractions"
      /* border-transparent: this bottom rule and the top rule on
         components/why-book.tsx are the SAME seam, drawn by both sides. The
         "why book with us" band is meant to meet this section without a line,
         so clearing one without the other would have changed nothing. */
      /* Asymmetric padding: full above, half below. The services section
         underneath opens with its own generous top padding, so the two stacked
         defaults were adding up to 224px of empty page between the carousel
         and the next eyebrow. Halved on each side of the seam rather than
         removed from one, so neither section ends up looking like it is
         missing its own breathing room. The colour changes at that seam now,
         which does some of the separating that the space used to do. */
      className="border-b border-transparent bg-paper pt-20 pb-10 sm:pt-28 sm:pb-14"
    >
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <p className="eyebrow text-slate">About</p>

        <h2 className="font-display mt-6 text-[2.1rem] text-balance sm:text-[2.6rem]">
          Shenzhen moves fast, we move faster.
        </h2>

        <div className="mt-5 max-w-[46rem] space-y-4 text-[0.95rem] leading-relaxed text-ink/70">
          {/* This line used to be the hero's subcopy in components/hero.tsx.
              It was moved here, and the hero now opens on the "Top 1%" claim
              instead, so the sentence appears once on the page rather than
              twice. */}
          <p>
            Private, English-speaking local guides for city exploration, trade
            shows, factory visits, sourcing trips, and business meetings across
            Shenzhen and the Greater Bay Area.
          </p>
          <p>
            Our experienced, English-speaking guides tailor every route to match
            what you actually want to see &mdash; with a private vehicle and
            driver, so there&rsquo;s no waiting and no crowds.
          </p>
        </div>
      </div>

      {/* Outside the max-width wrapper on purpose: the carousel runs to the
          edge of the viewport, which is the whole point of its layout. */}
      <GalleryCarousel />
    </section>
  );
}
