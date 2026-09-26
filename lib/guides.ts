/**
 * The guides customers meet.
 *
 * PURE DATA — no `node:fs` here. Photograph lookup happens in
 * components/guides-section.tsx, the same split as lib/attractions.ts.
 *
 * NO RATINGS ARE INVENTED. The reference this section is modelled on shows
 * "5.0 (234)" under every face. `rating` below is null on every entry and the
 * card renders nothing at all when it is null — not "No reviews yet", not an
 * empty row of stars, nothing. A fabricated score attached to a named person
 * is a lie about that person as well as to the customer, and it is unlawful
 * under UK CPUTR / the EU UCPD and actionable under the US FTC Act. The field
 * exists so that real numbers drop straight in later; see `Rating`.
 *
 * WHY THIS DOES NOT CONTRADICT "ONE GUIDE, ALL DAY". That promise in
 * `assurances` is about one person staying with you from pickup to drop-off
 * rather than a handover between a driver, a guide and an interpreter. A team
 * of guides is compatible with it. What WOULD break it is assigning two people
 * to the same day.
 */

export interface Rating {
  /** Mean score, e.g. 4.9. Only ever from real reviews. */
  score: number;
  /** How many reviews it is drawn from. Never rounded up, never estimated. */
  count: number;
}

export interface Guide {
  slug: string;
  /** PLACEHOLDER names. Obviously fake so they cannot ship unnoticed. */
  name: string;
  /** Where they work most, shown under the name. */
  based: string;
  languages: string[];
  /** One line. What this guide is actually best at. */
  focus: string;
  /**
   * Null until real reviews exist. See the note at the top of this file
   * before you consider putting a number here.
   */
  rating: Rating | null;
}

export const guides: Guide[] = [
  {
    slug: "guide-one",
    name: "Guide One", // PLACEHOLDER
    based: "Futian, Shenzhen",
    languages: ["English", "Mandarin"],
    focus:
      "PLACEHOLDER — what this guide is best at. Sourcing, the skyline, food, meetings.",
    rating: null,
  },
  {
    slug: "guide-two",
    name: "Guide Two", // PLACEHOLDER
    based: "Nanshan, Shenzhen",
    languages: ["English", "Mandarin", "Cantonese"],
    focus:
      "PLACEHOLDER — what this guide is best at. Sourcing, the skyline, food, meetings.",
    rating: null,
  },
  {
    slug: "guide-three",
    name: "Guide Three", // PLACEHOLDER
    based: "Luohu, Shenzhen",
    languages: ["English", "Mandarin"],
    focus:
      "PLACEHOLDER — what this guide is best at. Sourcing, the skyline, food, meetings.",
    rating: null,
  },
];
