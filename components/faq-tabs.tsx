"use client";

import { useId, useState } from "react";
import type { FaqCategory } from "@/lib/content";

/**
 * Tabbed FAQ with an accordion, adapted from the supplied component.
 *
 * NOT INSTALLED FROM IT — REBUILT. The original is written on shadcn tokens
 * (bg-background, text-muted-foreground, bg-card, border-border, from-primary),
 * none of which exist in this theme, plus `cn` from a `@/lib/utils` this project
 * does not have. It would have rendered grey-on-grey against everything around
 * it. Every effect it demonstrates is reproduced here:
 *
 *   - tab fill that wipes up from the bottom
 *   - the answer list animating in when the category changes
 *   - accordion rows whose "+" rotates 45° into a "×"
 *   - height animating open and closed
 *
 * FRAMER-MOTION IS NOT USED, and that is the substantive call. All four effects
 * are transforms and a height, which CSS does natively; adding ~50kB of runtime
 * to a page of eight questions is a poor trade on a site whose audience is
 * largely on mobile data abroad. The one thing lost is `AnimatePresence` exit
 * animation on the category swap — and the tab fill actually comes out BETTER
 * for it, because a permanently-mounted overlay animates out as well as in,
 * which `AnimatePresence` with `mode="wait"` does not.
 *
 * THE HEIGHT TRICK. `height: auto` is not animatable, so the panel is a grid
 * whose single row goes `0fr → 1fr`. That interpolates, needs no measurement,
 * and cannot desync from the content the way a JS-measured pixel height does
 * when the text reflows at a different width.
 */
export function FaqTabs({ categories }: { categories: FaqCategory[] }) {
  const [selected, setSelected] = useState(categories[0]?.slug ?? "");
  const active = categories.find((c) => c.slug === selected) ?? categories[0];

  return (
    <div>
      {/* Tabs. Real buttons with aria-selected rather than a styled radio
          group: this switches a visible panel, which is the tab pattern, and
          arrow-key semantics would be wrong for something that is not a
          single form control. */}
      <div role="tablist" aria-label="Question categories" className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const isOn = c.slug === selected;
          return (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={isOn}
              aria-controls={`faq-panel-${c.slug}`}
              onClick={() => setSelected(c.slug)}
              className={`relative overflow-hidden rounded-full border px-4 py-2 text-[0.85rem] transition-colors duration-300 ${
                isOn
                  ? "border-ink text-paper"
                  : "border-ink/20 text-ink/70 hover:border-ink/50 hover:text-ink"
              }`}
            >
              {/* The fill. Always mounted, so it slides out as well as in. */}
              <span
                aria-hidden="true"
                className={`absolute inset-0 bg-ink transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] ${
                  isOn ? "translate-y-0" : "translate-y-full"
                }`}
              />
              <span className="relative z-10">{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* key on the slug: React tears down and remounts the list, which is what
          re-triggers the entrance animation. Without it the panel swaps its
          contents in place and nothing moves. */}
      {active && (
        <div
          key={active.slug}
          id={`faq-panel-${active.slug}`}
          role="tabpanel"
          className="animate-spine-rise mt-8 space-y-3"
        >
          {active.items.map((item) => (
            <FaqRow key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      )}
    </div>
  );
}

function FaqRow({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={`rounded-xl border transition-colors duration-200 ${
        open ? "border-ink/25 bg-paper-card" : "border-ink/12 bg-transparent hover:border-ink/25"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span
          className={`font-display text-[1.05rem] leading-snug transition-colors duration-200 ${
            open ? "text-ink" : "text-ink/75"
          }`}
        >
          {question}
        </span>

        {/* One "+" that becomes a "×" at 45°. Drawn rather than pulled from
            lucide-react — two paths do not justify an icon dependency, and this
            one inherits the stroke language the rest of the site is drawn in. */}
        <span
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)] ${
            open ? "rotate-45 text-ink" : "text-ink/65"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M9 3v12M3 9h12" />
          </svg>
        </span>
      </button>

      {/* 0fr → 1fr is the height animation. The inner div must own the
          overflow, or the text is visible outside the collapsed row. */}
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.7,0.3,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-ink/72">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
