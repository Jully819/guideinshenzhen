import { marqueeClaims } from "@/lib/content";

/**
 * The scrolling claim strip under the hero.
 *
 * HOW THE SEAMLESS LOOP WORKS. The list is rendered TWICE inside a flex track,
 * and the track is animated from `translateX(0)` to `translateX(-50%)`. At the
 * end of the cycle the second copy sits exactly where the first one started,
 * so the reset is invisible and the strip appears to run forever. That is why
 * the duplicate exists — it is not a copy-paste mistake, and deleting it turns
 * the loop into a visible jump every time it restarts.
 *
 * The duplicate is aria-hidden. A screen reader should hear the eight claims
 * once, not sixteen times, and the animation means nothing to it either way.
 *
 * NO JAVASCRIPT. A CSS transform on one element, composited, runs on the GPU
 * and costs nothing while it is off screen. The usual React marquee libraries
 * measure widths on every resize to do the same job.
 *
 * PAUSES ON HOVER, and stops dead under `prefers-reduced-motion` — see
 * app/globals.css. Text that slides past continuously is a genuine problem for
 * anyone who reads slowly, and a strip that cannot be stopped is a strip whose
 * content may as well not be there.
 */
export function MarqueeBar() {
  return (
    <section
      aria-label="What is included"
      /* Cream, a step deeper than the page. This strip sits between the ink
         hero and the bone attractions section, and on bone it read as part of
         whichever it touched. See the surface rhythm noted in app/page.tsx. */
      className="marquee border-y border-ink/10 bg-paper-card py-4"
    >
      <div className="marquee-track">
        <Claims />
        <Claims aria-hidden="true" />
      </div>
    </section>
  );
}

function Claims({ "aria-hidden": ariaHidden }: { "aria-hidden"?: "true" }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
    >
      {marqueeClaims.map((claim) => (
        <li
          key={claim}
          className="font-display flex shrink-0 items-center gap-10 text-[0.82rem] tracking-[0.12em] whitespace-nowrap text-slate uppercase sm:gap-14 sm:text-[0.9rem]"
        >
          {claim}
          {/* The separator belongs to the item before it, so the spacing
              between claims is identical everywhere including across the seam
              between the two copies of the list. */}
          <span
            aria-hidden="true"
            className="inline-block size-1.5 shrink-0 rotate-45 bg-citron"
          />
        </li>
      ))}
    </ul>
  );
}
