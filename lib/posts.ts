import { huaqiangbeiElectronicsMarketGuide } from "@/lib/posts/huaqiangbei-electronics-market-guide";
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
 * Every entry is a real post in its own file under lib/posts/. The three
 * PLACEHOLDER scaffolding entries that used to sit at the end of the array were
 * removed on 24 October 2026, along with the banner on the index that labelled
 * them. Do not add scaffolding posts back. These are claims about Shenzhen that
 * a visitor will plan a trip around, and this codebase has no way to check a
 * single one of them.
 *
 * WRITING A REAL POST: add a file under lib/posts/ and register it below.
 * `slug` is the URL and should not change once a post is live. Changing it
 * breaks every link anybody has shared.
 *
 * WHEN THIS ARRAY IS EMPTY the index says so rather than rendering a bare
 * heading over nothing. An empty blog is honest. A blog of invented articles
 * about visa rules and metro lines is how somebody misses a border crossing.
 *
 * `body` is an array of paragraphs for posts with no section structure. The
 * long-form posts use `intro`, `sections` and `faqs` instead.
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
  huaqiangbeiElectronicsMarketGuide,
  hongKongShenzhenBorderCrossingGuide,
  shenzhenInternationalMuseumOfArt,
  shenzhenRobotStreet,
  howToPayInChinaAsAForeigner,
  whyHongKongPeopleSpendMoneyInShenzhen,
  whyShenzhenIsChinasTechCapital,
  shenzhenBeforeAndAfter,
  topFiveHighTechShenzhen,
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
