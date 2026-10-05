import { hongKongShenzhenBorderCrossingGuide } from "@/lib/posts/hong-kong-shenzhen-border-crossing-guide";
import { howToPayInChinaAsAForeigner } from "@/lib/posts/how-to-pay-in-china-as-a-foreigner";
import { whyHongKongPeopleSpendMoneyInShenzhen } from "@/lib/posts/why-hong-kong-people-spend-money-in-shenzhen";
import { whyShenzhenIsChinasTechCapital } from "@/lib/posts/why-shenzhen-is-chinas-tech-capital";
import { shenzhenBeforeAndAfter } from "@/lib/posts/shenzhen-before-and-after";
import { topFiveHighTechShenzhen } from "@/lib/posts/top-5-high-tech-shenzhen";
import { shenzhenRobotStreet } from "@/lib/posts/shenzhen-robot-street";
import { shenzhenInternationalMuseumOfArt } from "@/lib/posts/shenzhen-international-museum-of-art";

/**
 * BLOG POSTS.
 *
 * ⚠️ THE THREE PLACEHOLDERS BELOW ARE STILL PLACEHOLDERS AND SAY SO IN THEIR
 * OWN TEXT. The first entry in the array is a real, published post and is the
 * one exception to everything the next paragraph says. They exist
 * to prove the index, the dates, the slugs and the article layout render — not
 * to be published. Nothing here may be quietly promoted to real by deleting the
 * word PLACEHOLDER: these are claims about Shenzhen that a visitor will plan a
 * trip around, and this codebase has no way to check a single one of them. The
 * same rule `shenzhenDevelopments` and `testimonials` follow in lib/content.ts.
 *
 * WRITING A REAL POST: replace one of these entries whole — `title`, `excerpt`,
 * `body`, and a `published` date in ISO form — or add a new entry and delete a
 * placeholder. `slug` is the URL and should not change once a post is live;
 * changing it breaks every link anybody has shared.
 *
 * WHEN THIS ARRAY IS EMPTY the index says so rather than rendering a bare
 * heading over nothing. An empty blog is honest. A blog of invented articles
 * about visa rules and metro lines is how somebody misses a border crossing.
 *
 * `body` is an array of paragraphs, deliberately not Markdown or MDX: three
 * placeholder posts do not justify a parser, and adding one later is a smaller
 * job than unpicking one that was added too early.
 */
/**
 * A photograph and the credit that has to travel with it.
 *
 * `width`/`height` are the INTRINSIC size of the file served, not the size it
 * is displayed at. They exist so the browser can reserve the box before the
 * image arrives; getting them wrong is worse than omitting them, because the
 * layout then shifts to a shape nothing asked for.
 */
export interface PostImage {
  src: string;
  /** Width-descriptor set. Omit only for images with a single rendition. */
  srcSet?: string;
  /** Paired with srcSet. Tells the browser the displayed width before layout. */
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Above the fold. Loads eagerly and at high priority instead of lazily.
   * Exactly one image per page should set this. Lazy-loading the image a
   * visitor is already looking at delays the largest paint rather than
   * deferring it.
   */
  priority?: boolean;
  /** Photographer's name, shown under the image. */
  credit: string;
  /** Their profile, linked from the credit. */
  creditUrl: string;
  /** The photo's own page, linked from "Pexels". */
  sourceUrl: string;
}

export interface PostSection {
  /** Anchor id. The table of contents links to it; do not change it once live. */
  id: string;
  heading: string;
  paragraphs: string[];
  image?: PostImage;
  /**
   * The practical block under a listicle item. Every competing page for this
   * keyword carries one, so a post without it reads as the thin version.
   *
   * WHAT DOES NOT GO IN HERE: opening hours, ticket prices, metro line numbers,
   * or anything else that changes without telling us. Those are the facts that
   * strand somebody at a locked door, and this codebase cannot check them.
   * Keep it to judgement the guides can stand behind, and say plainly that the
   * bookable details need confirming.
   */
  facts?: { label: string; value: string }[];
  /**
   * A real list, for the places where the prose was a list pretending not to
   * be. Ordered when the sequence matters, unordered when it does not.
   * `intro` is the line that introduces it, since a list dropped straight
   * under a paragraph reads as an interruption.
   */
  list?: { intro?: string; ordered?: boolean; items: string[] };
}

export interface PostFaq {
  question: string;
  answer: string;
}

/**
 * The keyword cluster a post is written against.
 *
 * IT IS NOT RENDERED AS A LIST ANYWHERE, and that is the point. A visible strip
 * of keywords is the oldest spam signal there is; the cluster earns its keep by
 * deciding what the headings and the FAQ questions say. It lives in the data so
 * the next person editing the post can see what it was aimed at rather than
 * guessing from the prose.
 */
export interface KeywordCluster {
  primary: string;
  secondary: string[];
  longTail: string[];
}

export interface Post {
  slug: string;
  title: string;
  /** ISO day. Drives ordering and the dateline. */
  published: string;
  /** ISO day, when the post has been meaningfully revised since publishing. */
  updated?: string;
  /**
   * The byline's credentials, shown under the article and used by the Person
   * schema. Say what makes this person worth reading on this subject. Vague
   * authority ("passionate about travel") is worse than none.
   */
  authorBio?: string;
  /** One or two sentences. Shown on the index, and the fallback meta description. */
  excerpt: string;
  /**
   * The <title> tag, when the headline is the wrong length for one. Target 50
   * to 60 characters with the primary keyword near the front. Set this and the
   * layout's "%s — Guide in Shenzhen" template is bypassed entirely, so include
   * whatever branding you want inside the 60.
   */
  metaTitle?: string;
  /** 150 to 160 characters. Keyword, benefit, and a soft call to action. */
  metaDescription?: string;
  /** Who wrote it. Kept vague until real bylines exist — see lib/guides.ts. */
  author: string;
  /** Roughly how long it takes to read. Stated, not computed: a word count
   *  divided by 200 is a guess dressed up as a measurement. */
  readingMinutes?: number;
  keywords?: KeywordCluster;
  hero?: PostImage;
  /**
   * The 1200x630 social card, as a site-relative path. Separate from `hero`
   * because the two jobs are different. The hero is cropped for the article
   * column; a card cropped to that shape gets letterboxed by every platform
   * that renders it.
   */
  socialImage?: string;
  /** Paragraphs before the first heading. */
  intro?: string[];
  /** The body of a long-form post. Drives the table of contents. */
  sections?: PostSection[];
  /** Rendered as an accordion-free list, and as FAQPage JSON-LD. */
  faqs?: PostFaq[];
  /** Plain paragraphs, for posts with no section structure. */
  body?: string[];
}

export const posts: Post[] = [
  hongKongShenzhenBorderCrossingGuide,
  shenzhenInternationalMuseumOfArt,
  shenzhenRobotStreet,
  howToPayInChinaAsAForeigner,
  whyHongKongPeopleSpendMoneyInShenzhen,
  whyShenzhenIsChinasTechCapital,
  /* The long-form post lives in its own file. A 250-line object inline here
     buried the three placeholders and the helpers underneath it. */
  shenzhenBeforeAndAfter,
  topFiveHighTechShenzhen,
  {
    slug: "placeholder-getting-around",
    title: "PLACEHOLDER — getting around Shenzhen without a Chinese phone",
    published: "2026-07-28",
    excerpt:
      "PLACEHOLDER — a post about metro cards, ride-hailing and what actually works for a visitor whose apps do not. Replace with something the guides have tested this month.",
    author: "Guide in Shenzhen",
    body: [
      "PLACEHOLDER. This paragraph exists to set the measure of the article column and nothing else. Replace the whole post before publishing — every sentence here is furniture.",
      "A real version of this post would say which payment method the guides actually watched a visitor use last month, at which counter, and what happened when it failed. That is the post nobody else writes, and it is the only kind worth writing.",
      "Delete this entry, or overwrite it. Do not edit around it.",
    ],
  },
  {
    slug: "placeholder-fair-week",
    title: "PLACEHOLDER — what a fair week in Shenzhen actually costs you",
    published: "2026-06-12",
    excerpt:
      "PLACEHOLDER — hotels, taxis and the hours lost between halls during CHTF or CIOE. Replace with figures the business has seen, not figures from a listing site.",
    author: "Guide in Shenzhen",
    body: [
      "PLACEHOLDER. See the note at the top of lib/posts.ts before touching this file.",
      "The honest version of this article is mostly arithmetic: how far the venue is from the hotels that still have rooms, how long the queue for a taxi runs at closing, and what a day is worth to somebody who flew in for three of them.",
    ],
  },
  {
    slug: "placeholder-factory-visit",
    title: "PLACEHOLDER — questions to ask on a first factory visit",
    published: "2026-05-04",
    excerpt:
      "PLACEHOLDER — what to look at on the floor, and which answers to write down. Replace with what the guides ask when they are in the room.",
    author: "Guide in Shenzhen",
    body: [
      "PLACEHOLDER. Every claim in a real version of this post is checkable, which is exactly why it cannot be invented here.",
      "It would be a list of questions, in the order they are worth asking, with the reason each one matters — written by somebody who has stood on the floor and heard the answers change when they were asked in Mandarin.",
    ],
  },
];

/** Newest first. The index and the article pages both read this, not `posts`. */
export function getPosts(): Post[] {
  return [...posts].sort((a, b) => b.published.localeCompare(a.published));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * 28 July 2026. Written out rather than localised at render time: a date
 * formatted with the visitor's locale renders differently on the server and in
 * the browser, and React logs a hydration mismatch for it.
 */
export function formatPublished(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${day} ${months[month - 1]} ${year}`;
}
