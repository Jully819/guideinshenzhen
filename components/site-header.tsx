"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { business, tours } from "@/lib/content";

/**
 * "What a day is for" (/#tours) and "How it works" (/#how) are gone from this
 * list because the sections they pointed at were removed from the home page.
 * A nav item whose anchor no longer exists does not error — it just scrolls
 * nowhere, which is worse than not being there.
 *
 * "Manage booking" is also gone from this header, desktop row and mobile menu
 * both. The /manage route still exists and is still linked from the booking
 * confirmation page and the cancellation policy — the two places a returning
 * customer actually arrives from — so the header no longer spends a slot on it.
 */
const nav = [
  /* "Business trip" gave up this slot to Home. That page is not orphaned —
     every card in the services section links into it by anchor
     (/business-trip#logistics and friends) — but it is no longer one click
     from every page, so if it starts mattering again it needs its slot back
     rather than a link buried further down. */
  { href: "/", label: "Home" },
  { href: "/calendar", label: "Calendar" },
  /* "About" was dropped from this row. /about still exists and is still linked
     from the footer, and the home page carries its own About section — so the
     page is reachable and the argument is not lost, it just no longer costs a
     header slot. FAQ went the same way, and is likewise still in the footer. */
  /* "Services" was dropped from this row. /services still exists, is still
     linked from the footer, and the home page carries its own services
     section — so the page is reachable and the argument is not lost, it just
     no longer costs a header slot. About and FAQ went the same way. */
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Exact match, not `startsWith`. "/" is a prefix of every route, so a
   * prefix test would mark the home tab current on every page of the site —
   * and `aria-current="page"` is a factual claim to a screen reader, not a
   * decoration. Sub-paths of a nav item are a separate problem and do not
   * exist yet; when /business-trip/x appears, widen this deliberately.
   */
  const isCurrent = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[76rem] items-center gap-6 px-5 sm:h-18 sm:px-8">
        {/* Wordmark. The only place the brand name is set at this size. */}
        <Link
          href="/"
          className="font-display shrink-0 text-[1.3rem] leading-none"
        >
          {business.name}
        </Link>

        {/* gap-1, not gap-7: the tabs carry their own horizontal padding so a
            hovered pill extends past its label. A large gap on top of that
            padding makes two adjacent pills read as unrelated buttons. */}
        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className="nav-tab"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* The phone number used to sit here, xl and up. Removed from this row
            deliberately, not lost: it is still in the footer, in the mobile
            menu below, on /manage and inside the chat widget. Dropping it also
            gives the tab row back the width it was competing for at 1280. */}

        {/* Auto-margin chain: exactly one visible element may claim the free
            space at any breakpoint, or the space gets split and things drift
            to the middle. Below sm that's the menu button; from sm up it's
            this control; from lg up it's the nav.

            The wrapper carries the breakpoint and margin rules rather than the
            trigger inside AccountMenu, because the panel is positioned against
            this box — moving the layout classes onto the button would leave
            the dropdown anchored to a full-width parent and hanging off the
            right edge of the screen. */}
        {/* "Book Now" replaced the account dropdown in this slot. The
            Travellers/Partners menu still exists in
            components/account-menu.tsx and is no longer rendered anywhere —
            this site has one job, and the header's one button should do it.
            Restore it by putting <AccountMenu /> back here. */}
        <Link
          href="/inquiry"
          className="btn btn-primary hidden shrink-0 py-2.5 text-[0.85rem] sm:ml-auto sm:inline-flex lg:ml-0"
        >
          Book Now
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          /* -mr-3 with p-3: the tap area grows to 48px in every direction
             while the icon stays optically aligned with the edge of the
             container. Padding alone would push the icon inwards. */
          className="-mr-3 ml-auto inline-flex size-12 items-center justify-center p-3 sm:ml-0 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <path
              d={open ? "M4 4 L18 18 M18 4 L4 18" : "M3 6h16M3 11h16M3 16h16"}
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-ink/10 bg-paper px-5 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {tours.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/tours/${t.slug}`}
                  onClick={() => setOpen(false)}
                  className="nav-link block w-fit py-2 text-[0.95rem]"
                >
                  {t.name}
                </Link>
              </li>
            ))}
            {/* The whole list, not nav.slice(1). The slice existed to drop
                "What a day is for", whose anchor duplicated the tour links
                rendered just above; that entry is gone, so slicing now would
                silently swallow "Business trip". */}
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="nav-link block w-fit py-2 text-[0.95rem]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* The Travellers/Partners links that used to be flattened here went
              with the dropdown they mirrored. Below sm the CTA in the row above
              is hidden, so without this the menu is the one place on a phone
              with no way to start a booking. */}
          <Link
            href="/inquiry"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-4 w-full justify-center sm:hidden"
          >
            Book Now
            <span aria-hidden="true">→</span>
          </Link>

          <a
            href={`tel:${business.phone.replace(/\s/g, "")}`}
            className="tabular mt-3 block border-t border-ink/10 pt-4 text-[0.9rem] text-slate"
          >
            {business.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
