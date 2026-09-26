/**
 * Where a day can go. Feeds the carousel below the hero.
 *
 * These are places, not products. Nothing here is bookable on its own — the
 * product is still one guide for one day, and this section exists to answer
 * "what would we actually do?" before a visitor commits to a date.
 *
 * PURE DATA — no `node:fs` here. The carousel is a client component and imports
 * these types, so anything server-only in this file would break the build.
 * Photograph lookup happens in components/attractions-section.tsx instead.
 *
 * FACT-CHECKING NOTE. Every claim below is either verifiable or hedged, because
 * this is a commercial page and a visitor may plan a day around it:
 *   - Ping An is given as "599m, one of the tallest in the world" rather than a
 *     numbered global ranking. Rankings move as buildings top out — Merdeka 118
 *     completing pushed Ping An down one place — and a stale ranking on a
 *     booking page is the kind of small wrongness that costs trust.
 *   - Robotaxi, humanoid-robot and drone-delivery access genuinely varies week
 *     to week, so that card says so rather than promising it.
 * Opening hours and ticket prices are deliberately absent: they change, and
 * nobody is going to keep them current here.
 *
 * BLURB LENGTH — keep every one to TWO OR THREE LINES on the card, which is
 * about 105 characters. The cards sit in a row and a fourth line on one of them
 * staggers the others, so the carousel stops reading as a set. The card clamps
 * at three lines as a backstop, but a clamped blurb ends mid-sentence in an
 * ellipsis, so treat the character budget as the real limit. Measured at both
 * card widths: 272px from lg up, 248px on a phone.
 */

export type AttractionTheme =
  | "tech"
  | "skyline"
  | "culture"
  | "nature"
  | "shopping";

export const themes: { slug: AttractionTheme; label: string }[] = [
  { slug: "tech", label: "Futuristic tech" },
  { slug: "skyline", label: "Skyline views" },
  { slug: "culture", label: "Culture & history" },
  { slug: "nature", label: "Nature & downtime" },
  { slug: "shopping", label: "Shopping & markets" },
];

export function themeLabel(slug: AttractionTheme): string {
  return themes.find((t) => t.slug === slug)?.label ?? slug;
}

export interface Attraction {
  slug: string;
  theme: AttractionTheme;
  /** Rides on the image, in the pill where the reference shows a city. */
  name: string;
  /**
   * NOT CURRENTLY RENDERED. It used to be the pill over the image, then a meta
   * line under it; both were removed so the card carries one title and nothing
   * that reads like a second one. Kept because it is the only thing that tells
   * a visitor whether two places are near each other, and it is wanted the
   * moment these get their own pages. Delete it if that never happens.
   */
  district: string;
  blurb: string;
}

/** Resolved server-side: a public/ path, or null to draw the placeholder. */
export interface AttractionCard extends Attraction {
  photo: string | null;
}

export const attractions: Attraction[] = [
  {
    slug: "futuristic-tech",
    theme: "tech",
    name: "Robotaxis, robots and drones",
    district: "Across the city",
    blurb:
      "Driverless taxis, robot demos and drone delivery. What is running shifts weekly — tell us and we confirm.",
  },
  {
    slug: "huaqiangbei",
    theme: "tech",
    name: "Huaqiangbei Electronics Market",
    district: "Futian",
    blurb:
      "The world's largest electronics market. Bargain hard, and bring someone who hears the real price.",
  },
  {
    slug: "lianhuashan",
    theme: "skyline",
    name: "Lianhuashan Park",
    district: "Futian",
    blurb:
      "The best panoramic view of the CBD, and it is free. A huge green space with drone-delivery pickups.",
  },
  {
    slug: "shenzhen-international-art-museum",
    theme: "culture",
    name: "Shenzhen International Museum of Art",
    district: "Guangming",
    blurb:
      "Fifteen halls in two hull-shaped buildings. Opened in May 2026, and it borrows rather than collects.",
  },
  {
    slug: "shenzhen-natural-history-museum",
    theme: "culture",
    name: "Shenzhen Natural History Museum",
    district: "Pingshan",
    blurb:
      "Opened July 2026 at Yanzi Lake. Evolution, dinosaurs and the ecology of this delta.",
  },
  {
    slug: "robot-block",
    theme: "tech",
    name: "Robot Block",
    district: "Longgang",
    blurb:
      "Robots pour the coffee, cook the dinner and work a junction outside. A showroom, not a theme park.",
  },
];
