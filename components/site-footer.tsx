import Link from "next/link";
import { business, tours } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-[1.5rem]">{business.name}</p>
            <p className="mt-3 max-w-[24rem] text-[0.9rem] leading-relaxed text-paper/60">
              {business.tagline}
            </p>
            <p className="tabular mt-5 text-[0.9rem]">
              WeChat: {business.wechatId}
            </p>
            <p className="tabular mt-1 text-[0.85rem] text-paper/60">
              Replies {business.hours.open}–{business.hours.close}{" "}
              {business.city} time
            </p>
          </div>

          <div>
            <p className="eyebrow text-mist">A day for</p>
            <ul className="mt-4 space-y-2">
              {tours.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tours/${t.slug}`}
                    className="text-[0.9rem] text-paper/70 hover:text-paper"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-mist">More</p>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/services", label: "Services" },
                /* The landing page is deliberately NOT in the header nav. It
                   targets people arriving from search, not people already on
                   the site, and a header tab pointing at a near-duplicate of
                   the home page is confusing to both. The footer link exists so
                   it is crawlable. */
                {
                  href: "/private-tour-guide-shenzhen",
                  label: "Private tour guide in Shenzhen",
                },
                { href: "/business-trip", label: "Business trip support" },
                { href: "/calendar", label: "Fair calendar" },
                { href: "/blog", label: "Blog" },
                { href: "/cancellation-policy", label: "Cancellation policy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.9rem] text-paper/70 hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 text-[0.8rem] text-paper/65">
          <p>
            © {new Date().getFullYear()} {business.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
