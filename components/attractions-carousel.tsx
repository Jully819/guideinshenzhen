"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AttractionPlaceholder } from "@/components/attraction-placeholder";
import { themeLabel, type AttractionCard } from "@/lib/attractions";

/**
 * Horizontal card carousel, structure borrowed from the supplied reference:
 * copy column on the left, scrolling cards on the right. The treatment is this
 * site's own — bone, near-black, no shadows — and the paging buttons sit above
 * the track rather than beneath it.
 *
 * NATIVE SCROLL, NOT A CAROUSEL LIBRARY. The track is an ordinary
 * overflow-x-auto element with CSS scroll-snap. That buys, for free, what a JS
 * carousel has to reimplement badly: touch and trackpad momentum, keyboard
 * arrow scrolling, screen-reader reading order, and correct behaviour when the
 * cards reflow at a breakpoint. The buttons only call scrollBy() on it.
 *
 * Consequences worth knowing before changing this:
 *   - The buttons page by the measured width of the first card plus the gap,
 *     read from the DOM rather than hard-coded, so card widths can change in
 *     the class list without touching this file.
 *   - Button disabled state is derived from scroll position on every scroll
 *     event. The 2px tolerance is not superstition: scrollLeft is fractional on
 *     zoomed or hi-dpi displays and an exact comparison leaves the "next"
 *     button live at the true end of the track.
 *   - The track is focusable with an accessible name. A scrollable region that
 *     cannot be reached or named is a keyboard trap in reverse — the content
 *     is simply unreachable without a mouse.
 */
/**
 * ⚠️ NO LONGER RENDERED ANYWHERE. The About section now shows the photo
 * carousel from components/gallery-carousel.tsx instead of this card track,
 * and the copy column that used to live in here moved to
 * components/attractions-section.tsx with it.
 *
 * Kept, not deleted, because it is the only treatment that works without
 * photography: if the Unsplash placeholders come out before real photographs
 * go in, this is what goes back. Its drawn placeholders are in
 * components/attraction-placeholder.tsx.
 */
export function AttractionsCarousel({ items }: { items: AttractionCard[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const trackId = useId();

  /**
   * Where we intend the track to be, which is not always where it is.
   *
   * Under smooth scrolling the element reports its PRE-animation scrollLeft for
   * the duration of the animation. Paging off that value makes a second click
   * before the first finishes re-page from the old position, so two quick
   * clicks advance one card. Tracking the intent separately fixes that, and
   * `syncButtons` re-adopts reality whenever the visitor scrolls by hand.
   */
  const targetRef = useRef(0);

  const applyEdges = useCallback((position: number, max: number) => {
    // 2px tolerance — scrollLeft is fractional at non-integer zoom and on
    // hi-dpi displays, and an exact comparison leaves the button live at the
    // true end of the track.
    setAtStart(position <= 2);
    setAtEnd(position >= max - 2);
  }, []);

  const syncButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    targetRef.current = el.scrollLeft;
    applyEdges(el.scrollLeft, el.scrollWidth - el.clientWidth);
  }, [applyEdges]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Sets the initial edge state as well as tracking later resizes: a track
    // that does not overflow at this width must not keep a live "next" button.
    // ResizeObserver rather than a resize listener, because the track also
    // changes width when a sibling reflows, which window resize never fires for.
    const ro = new ResizeObserver(syncButtons);
    ro.observe(el);
    return () => ro.disconnect();
  }, [syncButtons]);

  /**
   * Pages by exactly one card.
   *
   * ASSIGNS scrollLeft RATHER THAN CALLING scrollBy({behavior:"smooth"}).
   * The scroll APIs' `behavior: "smooth"` is silently a no-op in more
   * environments than you would expect — any browser or embedded webview with
   * smooth scrolling switched off leaves scrollLeft untouched and the carousel
   * simply does not move. Assigning scrollLeft always scrolls; the animation
   * then comes from `motion-safe:scroll-smooth` on the track, which degrades to
   * an instant jump instead of to nothing.
   *
   * That also gets reduced-motion handling for free: motion-safe drops the
   * smoothing for users who asked for less movement, without a matchMedia call
   * here.
   *
   * The edge state is set from the TARGET rather than re-read from the element,
   * because the scroll event that would correct it is a frame away at best and
   * never arrives at all in a background tab.
   */
  function page(direction: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;

    const target = Math.max(0, Math.min(targetRef.current + step * direction, max));
    targetRef.current = target;
    el.scrollLeft = target;
    applyEdges(target, max);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      {/* ------------------------------------------------ Copy column */}
      <div className="lg:col-span-4">
        <p className="eyebrow text-slate">About</p>

        <h2 className="font-display mt-6 text-[2.1rem] text-balance sm:text-[2.6rem]">
          Shenzhen moves fast.
        </h2>

        {/* Copy supplied by the business, used verbatim.

            ⚠️ THE FIRST SENTENCE DOES NOT RESOLVE. "whether that means the
            futuristic skyline of Futian, the artsy laneways of OCT-LOFT, the
            electronics markets of Huaqiangbei, our private guides give you
            local access…" — the list never gets its verb, and the sentence
            restarts mid-clause. Left exactly as supplied rather than quietly
            rewritten, because it is the owner's voice; the fix is one word and
            one full stop: "…the electronics markets of Huaqiangbei. Our
            private guides give you local access…" */}
        <div className="mt-5 max-w-[30rem] space-y-4 text-[0.95rem] leading-relaxed text-ink/70">
          <p>
            Our private tours of Shenzhen are built around you &mdash; whether
            that means the
            futuristic skyline of Futian, the artsy laneways of OCT-LOFT, the
            electronics markets of Huaqiangbei, our private guides give you
            local access, language support, and on-the-ground problem-solving
            &mdash; all built around your schedule.
          </p>
          <p>
            Our experienced, English-speaking guides tailor every route to match
            what you actually want to see &mdash; with a private vehicle and
            driver, so there&rsquo;s no waiting and no crowds.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------ Track */}
      {/* min-w-0 is load-bearing: a grid child defaults to min-content width,
          so without it the track refuses to shrink, never overflows, and never
          scrolls — it just widens the page instead. */}
      <div className="min-w-0 lg:col-span-8">
        {/* Paging sits above the track, hard right. aria-controls points at the
            track so the relationship is announced; beyond that the buttons add
            nothing for a screen reader, since the track is itself focusable and
            scrollable with the arrow keys. */}
        <div className="mb-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-controls={trackId}
            className="flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-ink/25"
          >
            <span className="sr-only">Previous attractions</span>
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-controls={trackId}
            className="flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-ink disabled:opacity-30 disabled:hover:border-ink/25"
          >
            <span className="sr-only">More attractions</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <ul
          ref={trackRef}
          id={trackId}
          onScroll={syncButtons}
          tabIndex={0}
          role="region"
          aria-label="Shenzhen attractions"
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 motion-safe:scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((a) => (
            <li
              key={a.slug}
              className="w-[15.5rem] shrink-0 snap-start sm:w-[17rem]"
            >
              <article className="flex h-full flex-col">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-paper-dim">
                  {a.photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={a.photo}
                      alt=""
                      className="size-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <AttractionPlaceholder
                      slug={a.slug}
                      theme={a.theme}
                      className="size-full text-ink/60"
                    />
                  )}

                  {/* The place name rides on the image, where the reference
                      puts a city. Still an <h3>: moving it out of the flow is
                      a visual change, and each card should keep a real heading
                      so the section still has an outline to navigate by.

                      NOT font-display — that face carries -0.03em tracking and
                      closes its counters below 20px, which globals.css warns
                      about. Body medium instead.

                      right-3 + w-fit: the box hugs short names like a pill but
                      is capped at the card width, so "Free Sky 116, Ping An
                      Finance Centre" wraps to two lines instead of running off
                      the edge. rounded-2xl reads as a pill at one line and
                      still looks deliberate at two, which rounded-full does
                      not. */}
                  <h3 className="absolute top-3 right-3 left-3 w-fit rounded-2xl bg-paper/92 px-3.5 py-1.5 text-[0.85rem] leading-snug font-medium backdrop-blur-sm">
                    {a.name}
                  </h3>

                  <p className="eyebrow absolute right-3 bottom-3 left-3 rounded-full bg-ink/85 px-3.5 py-2 text-paper backdrop-blur-sm">
                    {themeLabel(a.theme)}
                  </p>
                </div>

                {/* line-clamp-3 is a backstop, not the layout. Every blurb in
                    lib/attractions.ts is written to fit in two or three lines
                    at both card widths, so nothing is clipped today; the clamp
                    only bites if someone later writes a longer one, and a card
                    growing a fourth line staggers the whole row. Keep the copy
                    short rather than relying on the ellipsis. */}
                <p className="mt-3.5 line-clamp-3 text-[0.85rem] leading-relaxed text-ink/65">
                  {a.blurb}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
