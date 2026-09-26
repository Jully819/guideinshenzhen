import { Gallery4, type Gallery4Item } from "@/components/ui/gallery4";
import { attractions } from "@/lib/attractions";

/**
 * The photo carousel, built on the supplied Gallery4 block.
 *
 * WHERE THIS LIVES NOW: inside the About section, under "Shenzhen moves fast."
 * It used to be a section of its own further down the page titled "Where a day
 * goes", showing the same nine places the About carousel above it was already
 * showing — the same list, twice, in two treatments. The photographs won, the
 * card track was retired, and the About copy now introduces this.
 *
 * It therefore renders NO heading of its own: `title` and `description` are
 * deliberately not passed, and Gallery4 drops its header row to the arrows
 * alone when they are absent.
 *
 * ITEMS COME FROM lib/attractions.ts. The block shipped with shadcn / Tailwind
 * / Astro / React / Next.js case-study cards, which would be five links off
 * this site advertising other people's frameworks in the middle of a page
 * selling a day out in Shenzhen. The places are already written down in one
 * place, so the carousel reads them rather than restating them.
 *
 * ⚠️ EVERY PHOTOGRAPH IS A STOCK PLACEHOLDER. They are generic city, market and
 * studio stock, not photographs of these places or of any day this business has
 * run. Replace them with real photography before launch — a stock skyline
 * captioned with a real venue is a claim about something that did not happen.
 * See REPLACE_BEFORE_LAUNCH in lib/content.ts.
 */

/**
 * Stock stand-ins, keyed by attraction slug, served from public/.
 *
 * THEY USED TO BE HOTLINKED FROM UNSPLASH and it was the most expensive thing
 * on the home page. Lighthouse measured 1,231KB across these nine cards with
 * 815KB of it wasted, because Unsplash served full-width JPEGs into a card that
 * renders at 320 to 360 CSS pixels. They are now local WebP at two widths, of
 * which a visitor downloads one.
 *
 * Dropping the remote host also removed a third-party origin from the critical
 * path, which is what the "preconnect to images.unsplash.com" hint in that
 * report was really telling us. The best preconnect is not needing one.
 *
 * SWAPPED TO PEXELS. The nine Unsplash files were replaced with Pexels
 * photography, chosen per slug after reviewing the top three results for each
 * query. Credits are recorded in PHOTO_CREDITS below.
 *
 * THE CROP CHANGED WITH THEM, and this is the part worth knowing. The old files
 * ran from 0.64 to 1.56 in aspect while the card below declares width={720}
 * height={984}, so the reserved box was wrong for eight of the nine and most of
 * each landscape frame was thrown away by object-cover. Every file is now cut to
 * 720x984 and 400x547, matching what the card claims. That is twice the pixel
 * area of the old landscape crops, so the set is heavier — about 600KB across
 * all nine at 720, against roughly 260KB before — but none of it is cropped off
 * and discarded, and the browser now reserves the right box.
 *
 * Quality floor is 55. Two frames, the night market and the fabric rolls, are
 * detailed enough that hitting a smaller budget meant q30, which is visibly
 * blocky on a 360px card.
 *
 * ⚠️ STILL PLACEHOLDERS. Changing the source changed the delivery, not the
 * honesty. These remain generic stock rather than photographs of these places.
 * Replace the files, keep the names.
 */

/**
 * Pexels photographer credits, by slug.
 *
 * NOT RENDERED. The Gallery4 card has no caption slot and the Pexels licence
 * does not require attribution, so nothing is shown on the page. They are kept
 * here because the alternative is nine files nobody can trace, and because the
 * blog renderer credits its Pexels photography on the page — if a caption slot
 * is ever added to this card, the data is already here.
 */
export const PHOTO_CREDITS: Record<string, { by: string; source: string }> = {
  "shenzhen-international-art-museum": {
    by: "Dua'a Al-Amad",
    source:
      "https://www.pexels.com/photo/museum-visitors-observing-sculptures-indoors-30435051/",
  },
  "shenzhen-natural-history-museum": {
    by: "Sami Abdullah",
    source:
      "https://www.pexels.com/photo/dinosaur-skeleton-in-historic-museum-interior-29152282/",
  },
  "robot-block": {
    by: "Kindel Media",
    source:
      "https://www.pexels.com/photo/white-and-blue-illuminated-toy-robot-8566521/",
  },
  "futuristic-tech": {
    by: "Gezer Amorim",
    source: "https://www.pexels.com/photo/white-dog-robot-26804169/",
  },
  huaqiangbei: {
    by: "Bulat843",
    source:
      "https://www.pexels.com/photo/man-adjusting-electronic-equipment-on-workbench-35290690/",
  },
  "free-sky-116": {
    by: "Salvatore De Lellis",
    source:
      "https://www.pexels.com/photo/backview-of-man-in-black-jacket-in-a-viewing-deck-9574947/",
  },
  /* Third pick, and both rejections are worth recording so nobody re-picks them.
     A Primrose Hill frame had the BT Tower in it and a later one had Berlin's
     Fernsehturm — both recognisably the wrong city under a caption reading
     Lianhuashan Park. Generic stock is a placeholder; stock with a landmark in
     it is a wrong answer.

     A third frame was rejected on weight rather than content: dense sunlit
     foliage would not compress, landing at 160KB against a 80KB budget, and
     dropping quality barely moved it because the cost is real detail. */
  lianhuashan: {
    by: "Erik Shafiev",
    source:
      "https://www.pexels.com/photo/a-city-buildings-under-the-blue-sky-8540795/",
  },
  "oct-loft": {
    by: "Adrien Olichon",
    source:
      "https://www.pexels.com/photo/modern-industrial-warehouse-interior-with-people-36126273/",
  },
  dafen: {
    by: "Aedrian Salazar",
    source: "https://www.pexels.com/photo/lots-of-artists-paintbrushes-12181027/",
  },
  "shenzhen-bay-park": {
    by: "Emre Gencer",
    source:
      "https://www.pexels.com/photo/scenic-waterfront-boardwalk-at-sunset-38809839/",
  },
  dongmen: {
    by: "Sandaru Muthuwadige",
    source:
      "https://www.pexels.com/photo/men-selling-food-in-a-booth-in-the-evening-17351169/",
  },
  "luohu-commercial-city": {
    by: "Antoni Shkraba",
    source:
      "https://www.pexels.com/photo/hand-of-a-person-measuring-a-man-s-checkered-blazer-5264933/",
  },
};
const STOCK = "/attractions-stock";
const STOCK_SLUGS = new Set([
  "futuristic-tech",
  "huaqiangbei",
  "free-sky-116",
  "lianhuashan",
  "shenzhen-international-art-museum",
  "shenzhen-natural-history-museum",
  "robot-block",
]);

/**
 * Cache-buster. Bump this whenever the bytes behind these filenames change.
 *
 * WHY IT EXISTS: these files are served with
 * `Cache-Control: public, max-age=31536000, immutable`. That header is a
 * promise that the content at a URL will never change, and swapping the photos
 * while keeping the filenames breaks that promise — a browser holding the old
 * copy will not revalidate for a year, so it keeps painting the previous set.
 * This is exactly what happened on the swap to the current photographs: the
 * files on disk were correct and the page still showed the old ones.
 *
 * `immutable` is the right header for this directory, so the URL changes
 * instead. Renaming nine files on every swap would also work and would churn
 * the filenames the whole file is written around; a token in the query string
 * is the smaller change and does the same job.
 */
const PHOTO_VERSION = "4";

/**
 * Falls back to the one slug guaranteed to exist, as the old map did.
 *
 * ⚠️ "free-sky-116" IS NO LONGER AN ATTRACTION. The Ping An slide was deleted
 * from lib/attractions.ts, but its files stay in public/attractions-stock and
 * its slug stays in STOCK_SLUGS and PHOTO_CREDITS, because this function still
 * names it as the fallback. Deleting those files would turn a missing slug into
 * three broken images rather than one stand-in. If you want them gone, point
 * this fallback at a slug that is still in the list first.
 */
function stockFor(slug: string) {
  const name = STOCK_SLUGS.has(slug) ? slug : "free-sky-116";
  const v = `?v=${PHOTO_VERSION}`;
  return {
    image: `${STOCK}/${name}-720.webp${v}`,
    /* Three tiers, not two. The card is 320 CSS px on mobile, so at the ~1.75
       DPR Lighthouse emulates the browser needs about 560 device px. With only
       400w and 720w on offer it rounded UP to 720w and pulled ~70KB per card,
       and four of those cards land inside Chrome's lazy-load margin during the
       initial load. On a simulated Slow 4G connection that bandwidth is what
       the hero copy is queued behind, which is why the LCP element was a
       paragraph of text sitting at 3.4s. The 560w tier is the size actually
       asked for. */
    imageSrcSet: `${STOCK}/${name}-400.webp${v} 400w, ${STOCK}/${name}-560.webp${v} 560w, ${STOCK}/${name}-720.webp${v} 720w`,
  };
}

const items: Gallery4Item[] = attractions.map((a) => ({
  id: a.slug,
  title: a.name,
  description: a.blurb,
  // ⚠️ NO LONGER USED. The cards stopped being links, so this never becomes an
  // href. It is still passed because Gallery4Item requires it. Every card used
  // to land on /book, which was this section's only conversion path.
  href: "/book",
  ...stockFor(a.slug),
}));

export function GalleryCarousel() {
  return (
    /* The block owns its own <section> and py-32. That padding is too much at
       both ends for something now sitting inside the About section rather than
       opening a section of its own: above it left a hole between the copy and
       the cards, below it stacked on top of the services section's own top
       padding. Pulled back with negative margins here rather than by editing
       the vendored block, which other pages may yet use at its own size. */
    <div id="gallery" className="-mt-20 -mb-16 sm:-mt-24 sm:-mb-20">
      <Gallery4 items={items} />
    </div>
  );
}
