import { whyBookWithUs } from "@/lib/content";

/**
 * "Why book with us" — the reference's card row, in this site's palette.
 *
 * THE ACCENT CHIP. This is the one place citron is used as a FILL on a light
 * surface, which the note in globals.css otherwise rules out. It is allowed
 * here for two reasons: the chips are small non-text markers, and this section
 * contains no button, so there is no call to action for them to compete with.
 * Do not copy the pattern into a section that has one — the whole point of
 * holding the accent back is that the booking button is the only thing on a
 * screen wearing it.
 *
 * Icons are drawn rather than emoji. The reference uses emoji, but they render
 * differently on every platform, cannot inherit a stroke weight, and would be
 * the only thing on this site not drawn in the same hairline language as the
 * skyline and the attraction placeholders.
 *
 * PALE HAIRLINES, NOT BORDERS. The cards are divided by a 1px grid gap that
 * lets the bone section show through between them; nothing here sets a border.
 * The section's own top edge stays transparent, so the band still meets the
 * section above it without a seam.
 *
 * NO EMPTY-CELL FILLER ANY MORE. There used to be one, because five cards left
 * a hole at two and three columns and an unfilled cell shows the page
 * background — a hole punched in the band rather than empty space. Six cards
 * divide evenly into both, so the filler went with them. Go back to five, or on
 * to seven, and it has to come back.
 */
export function WhyBookWithUs() {
  // border-transparent, not the border dropped altogether: the 1px stays in the
  // box model, so nothing below it shifts up by a pixel, and the rule is one
  // token away from being visible again.
  //
  // THE SEAM ABOVE IS DRAWN TWICE. components/attractions-section.tsx ends with
  // a matching `border-b`, so clearing only this one changes nothing on screen —
  // both are transparent now. Restore either and the line comes back.
  return (
    <section
      id="why"
      className="border-t border-transparent bg-paper-dim py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <header className="max-w-[46rem]">
          <p className="eyebrow text-slate">Why us</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[3rem]">
            You choose the day.
            <br />
            We remove everything that makes it hard.
          </h2>
        </header>

        {/* No xl:grid-cols-5 and no filler cell any more. Five cards needed
            both: they left one hole at two and three columns, and filled a
            five-wide row exactly. Six divide evenly into 2 and 3 and leave
            FOUR holes in a five-wide row, so the widest layout is now the
            three-column one. */}
        {/* bg-paper on the grid, not just gap-px. This section sits on
            paper-dim now, and a bare gap would show that DARKER colour between
            the cream cards — the opposite of the pale hairline the reference
            uses. Naming the lighter colour here keeps the separators pale.
            Same construction as the services grid. */}
        <ul className="mt-14 grid gap-px bg-paper md:grid-cols-2 lg:grid-cols-3">
          {whyBookWithUs.map((item) => (
            /* `group` + `group-hover` rather than styling the card alone: the
               heading and body each need their own colour on the dark surface,
               and a child cannot react to its parent's :hover in CSS without
               it. Tailwind compiles `hover:` behind `@media (hover: hover)`, so
               a touch device never gets a state stuck on after a tap.

               The citron chip is left alone on purpose. It is the one element
               that reads correctly on both surfaces, and letting it stay put
               while everything around it inverts is what makes the flip feel
               deliberate rather than like a theme glitch. */
            <li
              key={item.title}
              className="group flex flex-col bg-paper-card p-6 transition-colors duration-200 hover:bg-ink sm:p-7"
            >
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-citron text-ink"
                aria-hidden="true"
              >
                <Icon name={item.icon} />
              </span>

              <h3 className="font-display mt-6 text-[1.15rem] leading-tight transition-colors duration-200 group-hover:text-paper">
                {item.title}
              </h3>
              {/* paper/70 on ink measures about 8.5:1 — the body copy must not
                  quietly drop below AA just because the card went dark. */}
              <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink/65 transition-colors duration-200 group-hover:text-paper/70">
                {item.detail}
              </p>
            </li>
          ))}

        </ul>
      </div>
    </section>
  );
}

function Icon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    // A route between two pins — an itinerary, not a fixed loop.
    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="18" cy="18" r="2.2" />
          <path d="M8.2 6H14a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h5.8" />
        </svg>
      );
    // A car, seen side on.
    case "car":
      return (
        <svg {...common}>
          <path d="M3 14v-2.2l2-4.3A2 2 0 0 1 6.8 6h10.4a2 2 0 0 1 1.8 1.5l2 4.3V14" />
          <path d="M3 14h18v3H3z" />
          <circle cx="7" cy="18.4" r="1.4" />
          <circle cx="17" cy="18.4" r="1.4" />
          <path d="M5.5 11h13" />
        </svg>
      );
    // A person with a location mark — a guide who is from here.
    case "guide":
      return (
        <svg {...common}>
          <circle cx="9.5" cy="7" r="2.8" />
          <path d="M4 20v-1.4A4.6 4.6 0 0 1 8.6 14h1.8" />
          <path d="M17.5 21c1.8-2.4 3-4 3-5.6a3 3 0 0 0-6 0c0 1.6 1.2 3.2 3 5.6Z" />
          <circle cx="17.5" cy="15.2" r="1" />
        </svg>
      );
    // A clock, because the choice being offered is length of day.
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.2V12l3.2 2" />
        </svg>
      );
    // Two figures and no third — the party is only ever yours.
    case "group":
      return (
        <svg {...common}>
          <circle cx="8.5" cy="8" r="2.6" />
          <circle cx="16" cy="9.5" r="2.1" />
          <path d="M3.5 19v-1.2A4.3 4.3 0 0 1 7.8 13.5h1.4a4.3 4.3 0 0 1 4.3 4.3V19" />
          <path d="M15.4 13.6h.9a4 4 0 0 1 4 4V19" />
        </svg>
      );
    // Two arrows turning back on each other — one guide, two kinds of day.
    case "swap":
      return (
        <svg {...common}>
          <path d="M4 8.5h13l-3-3M20 15.5H7l3 3" />
          <circle cx="12" cy="12" r="9.2" opacity="0.35" />
        </svg>
      );
    // A briefcase, for the business half of the offer.
    case "briefcase":
      return (
        <svg {...common}>
          <path d="M3.5 8.5h17v10.5h-17z" />
          <path d="M9 8.5V6.2a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6.2v2.3" />
          <path d="M3.5 13h17" opacity="0.55" />
          <path d="M10.5 13v2h3v-2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" />
        </svg>
      );
  }
}
