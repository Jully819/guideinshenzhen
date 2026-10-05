import Link from "next/link";
import { business } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8 sm:py-16">
        <div>
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

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {/* The landing page is deliberately NOT in the header nav. It targets
              people arriving from search, and a header tab pointing at a
              near-duplicate of the home page is confusing. This link is what
              keeps it crawlable from every page. */}
          {[
            {
              href: "/private-tour-guide-shenzhen",
              label: "Private tour guide in Shenzhen",
            },
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

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 text-[0.8rem] text-paper/65">
          <p>
            © {new Date().getFullYear()} {business.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
