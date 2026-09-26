"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ExpandingCards, as supplied.
 *
 * Two changes from the paste, both forced by this codebase rather than taste:
 *
 *   1. The block imported six lucide icons at the top of this file and never
 *      used them — the icons arrive per item, in `icon`. Unused imports fail
 *      the build's lint, so they are gone. Callers import their own.
 *   2. The grid memo depends on `items`, not `items.length` as supplied. It
 *      maps over the array, so the array is what it reads; keying on the length
 *      alone goes stale the moment a caller swaps the contents without changing
 *      how many there are. The cost is that a caller passing an array literal
 *      built inline recomputes the memo every render — cheap at six items, and
 *      the callers here hoist their arrays to module scope anyway.
 *
 * BEHAVIOUR WORTH KNOWING BEFORE YOU REUSE IT: a card expands on hover, focus
 * AND click, and one card is always open — `activeIndex` never returns to null,
 * so the panel a visitor last touched stays open when the pointer leaves. On a
 * phone the grid flips from columns to rows, driven by a resize listener rather
 * than a media query, so the first paint is always the mobile arrangement until
 * the effect runs.
 */
export interface CardItem {
  id: string | number;
  title: string;
  /** Optional. Omit for a title-only card; the paragraph is not rendered. */
  description?: string;
  imgSrc: string;
  /** Width-descriptor set, when the image has more than one rendition. */
  imgSrcSet?: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-6xl gap-2",
        "grid",
        "h-[600px] md:h-[500px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm",
            "md:min-w-[80px]",
            "min-h-0 min-w-0",
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imgSrc}
            srcSet={item.imgSrcSet}
            /* A collapsed card is ~80px, an expanded one takes 5fr of the row.
               Without this the browser assumes 100vw and fetches the largest
               file for all six. */
            sizes="(min-width: 768px) 640px, 100vw"
            alt={item.title}
            width={1000}
            height={667}
            /* Always below the fold wherever this block is used. */
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 scale-110 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <article className="absolute inset-0 flex flex-col justify-end gap-2 p-4">
            <h3 className="hidden origin-left rotate-90 text-sm font-light uppercase tracking-wider text-white/80 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0">
              {item.title}
            </h3>

            <div className="text-white/90 opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100">
              {item.title}
            </h3>

            {item.description ? (
              <p className="w-full max-w-xs text-sm text-white/80 opacity-0 transition-all duration-300 delay-225 ease-out group-data-[active=true]:opacity-100">
                {item.description}
              </p>
            ) : null}
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
