/**
 * The signature element: a hairline carrying mono timestamps.
 *
 * Sequence markers are usually decoration. They're earned here because a day
 * genuinely is an ordered sequence in time, and the order carries information
 * the reader needs. The same device becomes the step indicator in /book.
 *
 * SURFACE: pass `tone`. On ink the timestamps and the diamonds are citron,
 * which measures ~16:1 there and about 1.2:1 on paper, where it is effectively
 * invisible. `tone="paper"` switches both to moss. The timestamps are switched
 * here and the diamonds by `.spine[data-tone="paper"]` in globals.css, because
 * the diamond is drawn by a pseudo-element that no class on this side reaches.
 */

export interface SpineItem {
  time: string;
  place: string;
  detail: string;
  /**
   * The journey on to the NEXT stop, in plain words. Optional, because a day
   * laid out by the clock does not need it and a day laid out by district
   * does. Rendered under the node it belongs to, set apart from the detail,
   * since it describes the gap rather than the place.
   */
  travel?: string;
}

export function TimeSpine({
  items,
  tone = "ink",
  className = "",
}: {
  items: SpineItem[];
  tone?: "ink" | "paper";
  className?: string;
}) {
  const stamp = tone === "paper" ? "text-moss" : "text-citron";

  return (
    <ol className={`spine ${className}`} data-tone={tone}>
      {items.map((item) => (
        <li
          key={`${item.time}-${item.place}`}
          className="spine-node relative py-4 first:pt-0 last:pb-0"
        >
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className={`tabular text-[0.8rem] ${stamp}`}>
              {item.time}
            </span>
            <span className="font-display text-[1.15rem] leading-tight">
              {item.place}
            </span>
          </div>
          <p className="mt-1.5 max-w-[34rem] text-[0.9rem] leading-relaxed opacity-70">
            {item.detail}
          </p>

          {item.travel && (
            <p className="tabular mt-2 text-[0.78rem] uppercase tracking-[0.08em] opacity-55">
              {item.travel}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Horizontal variant used as the booking flow's step indicator. */
export function SpineSteps({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-slate">{steps[current]}</p>
        <p className="eyebrow text-ink/60">
          Step {current + 1} / {steps.length}
        </p>
      </div>
      <ol className="mt-3 flex gap-1">
        {steps.map((label, i) => (
          <li key={label} className="flex-1">
            <span className="sr-only">
              {label}
              {i === current ? " (current step)" : ""}
            </span>
            <span
              aria-hidden="true"
              className={`block h-px ${
                /* Steps render on bone, where citron is invisible. Completed
                   reads as ink, current as moss, upcoming as a faint rule. */
                i < current ? "bg-ink" : i === current ? "bg-moss" : "bg-ink/15"
              }`}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
