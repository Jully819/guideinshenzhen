import type { MetadataRoute } from "next";
import { PRIVATE_ROUTES, SITE_INDEXABLE, SITE_URL } from "@/lib/site";

/**
 * Generates /robots.txt at build time.
 *
 * IT AGREES WITH THE META ROBOTS TAG BY CONSTRUCTION. Both read
 * `SITE_INDEXABLE` from lib/site.ts, so the file cannot end up inviting
 * crawlers to pages that then tell them to go away. While the site is not
 * indexable this emits a blanket disallow and no sitemap reference, because
 * advertising a sitemap for pages you do not want indexed is just a faster way
 * to get them crawled.
 *
 * ⚠️ robots.txt IS NOT A SECURITY BOUNDARY. It is a request, honoured by the
 * big crawlers and ignored by everything else. Nothing under `PRIVATE_ROUTES`
 * may rely on this file to stay unread.
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXABLE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
