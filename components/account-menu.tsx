"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { policy } from "@/lib/content";

/**
 * The account menu in the header — the control that replaced "Book a day".
 *
 * Built to the supplied reference: two labelled groups (Travellers, Partners),
 * each heading in the accent, a rule between the groups, then Help and the
 * current currency below a second rule.
 *
 * WRITTEN BY HAND, NOT PULLED IN. The whole panel is one <ul> and a click-away
 * listener; a headless-menu dependency would be several kilobytes to render
 * seven links, and this is the only dropdown on the site.
 *
 * DISCLOSURE, NOT role="menu". `role="menu"` is for application commands and
 * commits you to full arrow-key roving focus, type-ahead and the rest —
 * announce it without implementing it and a screen-reader user is told to press
 * arrows that do nothing. These are seven ordinary links, so they stay a
 * labelled list behind a button with aria-expanded: Tab moves through them,
 * Escape closes and puts focus back where it started.
 *
 * WHY THE BOOKING CTA COULD GO. It was never the only route to the calendar —
 * the hero's booking bar sticks to the top of the viewport from the moment the
 * hero scrolls past (components/booking/booking-bar.tsx), and the page closes
 * on a second "Book a day". The header slot was the third copy.
 */
export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    // `pointerdown`, not `click`: a click on a link inside the panel would
    // otherwise race the navigation, and closing on pointerdown outside also
    // means the panel is gone before the click lands on whatever is beneath.
    function onPointerDown(e: PointerEvent) {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Focus has to come back, or a keyboard user is dropped at the top of
      // the document with no idea what they just closed.
      trigger.current?.focus();
    }

    // Focus leaving the panel by Tab is a close too — otherwise the panel
    // stays open behind you for the rest of the page.
    function onFocusIn(e: FocusEvent) {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="btn btn-primary shrink-0 py-2.5 text-[0.85rem]"
      >
        Log in
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          aria-hidden="true"
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 1.5 5.5 5.5 10 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          /* Right-aligned: the trigger sits at the end of the header row, and
             a left-aligned panel would hang off the edge of the viewport. */
          className="absolute top-[calc(100%+0.6rem)] right-0 z-50 w-[17rem] overflow-hidden rounded-2xl border border-ink/12 bg-paper shadow-[0_24px_50px_-20px_rgb(0_0_0/0.35)]"
        >
          <ul className="py-2">
            {GROUPS.map((group, i) => (
              <li key={group.heading}>
                {/* A rule between groups, never above the first one. */}
                {i > 0 && <hr className="my-2 border-ink/12" />}
                <p className="font-display px-5 pt-2 pb-1 text-[0.9rem] text-moss">
                  {group.heading}
                </p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block px-5 py-2.5 text-[0.95rem] text-ink/80 transition-colors hover:bg-paper-card hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            <li>
              <hr className="my-2 border-ink/12" />
              <Link
                href="/faq"
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 text-[0.95rem] text-ink/80 transition-colors hover:bg-paper-card hover:text-ink"
              >
                Help
              </Link>
            </li>

            {/* Currency is a STATEMENT, not a control. Everything is charged in
                one currency — see policy.currency, which Stripe is configured
                against — so a switcher here would offer a choice that checkout
                cannot honour. It is shown because a visitor about to see a
                price needs to know which money it is in. */}
            <li className="flex items-baseline justify-between px-5 py-2.5 text-[0.95rem] text-ink/80">
              <span>Currency</span>
              <span className="tabular text-[0.85rem] text-slate">
                {policy.currency.toUpperCase()}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * The two audiences, and what each can do.
 *
 * NONE OF THESE ROUTES EXIST YET. There is no auth on this site — these are
 * the entry points the menu is designed around, and each one 404s until the
 * page behind it is built. Keeping the paths here, in one list, is what makes
 * that a single edit later rather than a hunt through the markup.
 */
export const GROUPS = [
  {
    heading: "Travellers",
    items: [
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/signup" },
    ],
  },
  {
    heading: "Partners",
    items: [
      { label: "Log in", href: "/partners/login" },
      { label: "Sign up as a guide", href: "/partners/signup?as=guide" },
      { label: "Sign up as an agency", href: "/partners/signup?as=agency" },
    ],
  },
] as const;
