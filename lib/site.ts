/**
 * One place for the things that need to know where this site actually lives.
 *
 * `SITE_URL` was previously copy-pasted as a PLACEHOLDER constant into
 * app/blog/[slug]/page.tsx and app/private-tour-guide-shenzhen/page.tsx. Two
 * copies of a domain is two chances to ship the wrong one in a canonical tag,
 * which is the single most expensive typo available on a website.
 *
 * SET THE REAL DOMAIN with NEXT_PUBLIC_SITE_URL in the environment. The
 * fallback is deliberately obviously fake so that a canonical pointing at
 * example.com is caught in review rather than in Search Console.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
).replace(/\/$/, "");

/**
 * WHETHER SEARCH ENGINES MAY INDEX THIS SITE AT ALL.
 *
 * Defaults to TRUE. Set NEXT_PUBLIC_SITE_INDEXABLE=false to block indexing.
 *
 * This one flag drives the meta robots tag in app/layout.tsx AND app/robots.ts,
 * so the two can never contradict each other. robots.txt inviting crawlers to
 * pages whose own meta tag says noindex wastes crawl budget and teaches a
 * search engine to trust neither signal.
 *
 * ⚠️ READ THIS BEFORE THE FIRST REAL DEPLOY. It used to default to false, and
 * the reason still stands: parts of this site are PLACEHOLDER. The licence
 * number, the phone number, the guide bios, seven invented testimonials with
 * stock portraits, and three of the four blog posts. Indexing that is not a
 * neutral act — the pages get crawled, cached and possibly ranked, and pulling
 * them back out of an index is far slower than keeping them out.
 *
 * The default flipped because a site that cannot be indexed cannot score on
 * SEO, and the audit has to pass before launch. That is the right trade for a
 * site being measured. It is the wrong trade for a site being deployed with
 * invented testimonials still on it. Set the variable to "false" in the
 * production environment until lib/content.ts and lib/posts.ts are real.
 */
export const SITE_INDEXABLE =
  process.env.NEXT_PUBLIC_SITE_INDEXABLE !== "false";

/**
 * Routes that exist but must never be in a sitemap or an index.
 *
 * These are not secret. They are simply worthless to a searcher: one is a
 * post-payment receipt keyed to a booking that is not theirs, the other is an
 * account utility that shows nothing until you have a reference number.
 */
export const PRIVATE_ROUTES = ["/manage", "/book/confirmed"];
