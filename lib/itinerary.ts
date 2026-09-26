import type { SpineItem } from "@/components/time-spine";

/**
 * One day in Shenzhen, as an example rather than a product.
 *
 * WHAT THIS IS. A route that front-loads Guangming and groups the northeastern
 * stops, so the day is spent in the places rather than in the car. It is a
 * worked example of how a day gets planned here, not a fixed itinerary anybody
 * is buying. The closing line on the section says so.
 *
 * PURE DATA. No `node:fs` and no server-only imports, same rule as
 * lib/attractions.ts.
 *
 * CLOCK TIMES, BY REQUEST, to match the business day on /tours/business that
 * sits beside this one on the home page. They are not arbitrary. They were
 * derived from the per-leg drive times that used to be in this file, so the
 * gaps still hold: 1 hour 15 out to Longgang, 25 minutes on to Pingshan, an
 * hour back into Futian, 20 minutes across it, with time in each place around
 * them. The first stop is 10:00 rather than 09:00 because the art museum does
 * not open earlier. An hour out from a central hotel puts the pickup at
 * around 09:00, which is where the deleted start-time line used to sit.
 *
 * ⚠️ THEY ARE ILLUSTRATIVE, exactly as the business sample day's times are.
 * This is an example of a day's shape, not a schedule anybody is booked onto,
 * and the section says so underneath. Do not let a real booking be planned off
 * these without checking the day's own opening times.
 *
 * ONE LINE PER STOP, BY REQUEST. Each `detail` is kept under about 60
 * characters so it sets on a single line in the card on this site's desktop
 * column, which measures 452px. Going over runs it to two lines and the
 * timeline stops scanning as a list. The fuller version of every stop below
 * lives in its own blog post, which is where the argument belongs.
 *
 * VOICE. The supplied draft used a car emoji per leg, em dashes as the default
 * joint, and the words curated, cutting-edge and future-forward. CLAUDE.md bans
 * all of that and references/voice.md counts the punctuation, so this is the
 * same facts and the same order in the house voice. Nothing was dropped. The
 * stops, the districts, the drive times, the start time and the offer to
 * reorder are all still here.
 *
 * ⚠️ THE PER-LEG DRIVE TIMES WERE DELETED ON REQUEST, 23 August 2026. Each stop
 * used to carry a `travel` line naming the drive on to the next one. The
 * removed values are recorded in the scratchpad note that accompanied the
 * change. The whole-day figure survives in components/one-day-tour.tsx, which
 * still says the leisure day spends two and a half to three hours in the car,
 * and still says that is an estimate.
 *
 * ⚠️ NO PRICES. references/stats.md does not exist, so no figure about what a
 * day costs appears in this file. Add one once it does.
 *
 * FACT-CHECKED, August 2026:
 *   - The Shenzhen International Museum of Art opened on 30 May 2026 in
 *     Guangming. It has its own post at /blog/shenzhen-international-museum-of-art.
 *   - The Shenzhen Natural History Museum opened on 28 July 2026 at Yanzi Lake
 *     in Pingshan, so "newly opened" holds as written.
 *   - Longgang and Pingshan are adjacent, which is what makes the middle of
 *     this day work.
 * Opening hours, ticket prices and metro lines are deliberately absent. They
 * change, and nobody is going to keep them current here.
 */
export const oneDayShenzhen: SpineItem[] = [
  {
    time: "10:00",
    place: "Shenzhen International Museum of Art, Guangming",
    detail:
      "Contemporary work and design. Quiet before lunch.",
  },
  {
    time: "12:45",
    place: "Robot Block, Longgang",
    detail:
      "Robots on the pavement, in a shop and on a stage.",
  },
  {
    time: "14:15",
    place: "Shenzhen Natural History Museum, Pingshan",
    detail:
      "Opened July 2026. Evolution, dinosaurs, the delta.",
  },
  {
    time: "17:00",
    place: "Huaqiangbei, Futian",
    detail:
      "More than twenty malls of components in one quarter.",
  },
  {
    time: "19:00",
    place: "Something near the middle, or dinner",
    detail:
      "Lianhuashan Park, or the Shenzhen Museum if it rains.",
  },
];
