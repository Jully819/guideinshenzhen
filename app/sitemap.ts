import type { MetadataRoute } from "next";
import { tours } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

/**
 * Generates /sitemap.xml at build time.
 *
 * ROUTES ARE LISTED EXPLICITLY rather than discovered by walking app/. A
 * filesystem walk looks clever until it quietly publishes the next private
 * route somebody adds. Adding a page here is one line, and it is a line that
 * makes you decide whether searchers should find it.
 *
 * ⚠️ PLACEHOLDER POSTS ARE EXCLUDED. Three of the four entries in lib/posts.ts
 * are scaffolding that says so in its own title. Submitting them to a search
 * engine gets invented articles about visa rules crawled, cached and possibly
 * ranked, and removing a URL from an index is far slower than never offering
 * it. The filter is on the title prefix, so a post stops being excluded the
 * moment it stops calling itself a placeholder.
 *
 * /manage and /book/confirmed are absent for the same reason they are in
 * PRIVATE_ROUTES. `lastModified` is a real date where the content carries one,
 * and omitted where it does not, because a build timestamp on every URL tells a
 * crawler that the whole site changed every deploy and is worth exactly nothing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    {
      path: "/private-tour-guide-shenzhen",
      priority: 0.9,
      changeFrequency: "monthly",
    },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/business-trip", priority: 0.8, changeFrequency: "monthly" },
    /* Weekly, and it means it. The fair list changes as dates are confirmed
       and the page recomputes what has already happened every day. */
    { path: "/calendar", priority: 0.8, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/book", priority: 0.6, changeFrequency: "monthly" },
    { path: "/inquiry", priority: 0.6, changeFrequency: "monthly" },
    {
      path: "/cancellation-policy",
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ];

  const tourRoutes = tours.map((tour) => ({
    url: `${SITE_URL}/tours/${tour.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const postRoutes = getPosts()
    .filter((post) => !post.title.startsWith("PLACEHOLDER"))
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.published),
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      priority: route.priority,
      changeFrequency: route.changeFrequency,
    })),
    ...tourRoutes,
    ...postRoutes,
  ];
}
