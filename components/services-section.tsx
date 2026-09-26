import { services } from "@/lib/content";

/**
 * Services — the card grid from the supplied reference, in this site's palette.
 *
 * PALE HAIRLINES BETWEEN THE CARDS, made by the grid gap rather than by
 * borders. Each rule is exactly one pixel, they meet cleanly at the corners,
 * and no cell needs to know which of its neighbours exist — border each card
 * instead and every internal rule doubles to 2px while the outer edge is drawn
 * on some sides and not others.
 *
 * NO FILLER CELL EITHER. Five cards left a hole at two and three columns and
 * needed one; six divide evenly into both. Go back to five and the hole — and
 * the filler — come back with it.
 *
 * NO "LEARN MORE". Each card used to close with a link to the matching section
 * of /business-trip. `href` survives on every entry in `services`
 * (lib/content.ts) so restoring them is markup only.
 */
export function ServicesSection() {
  // Half the usual padding on top, full underneath: the attractions carousel
  // above pays the other half of this seam. See the note in
  // components/attractions-section.tsx — change one and the other stops making
  // sense.
  //
  // paper-dim, one step deeper than the section above it. The cards stay
  // paper-card, which is LIGHTER than this surface, so they read as raised out
  // of the band rather than cut into it.
  return (
    <section
      id="services"
      className="bg-paper-dim pt-10 pb-20 sm:pt-14 sm:pb-28"
    >
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <header className="max-w-[46rem]">
          <p className="eyebrow text-slate">Services</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[3rem]">
            Services shaped around your priorities.
          </h2>
        </header>

        {/* gap-px over bg-paper, with paper-card cells on top: the 1px the grid
            leaves between cells shows the LIGHTER page colour, so the cards are
            divided by a pale hairline rather than a dark rule. The background
            has to be stated here — this section is paper-dim, and letting the
            section colour show through would draw the separators darker than
            the cards instead of lighter. */}
        <ul className="mt-14 grid gap-px bg-paper md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            /* `group` so the body copy can respond to the card being hovered;
               a child cannot react to its parent's :hover in CSS on its own.
               Tailwind compiles `hover:` behind @media (hover: hover), so a
               touch device never gets a state stuck on after a tap. */
            <li
              key={service.title}
              className="group flex flex-col bg-paper-card p-6 transition-colors duration-200 hover:bg-citron sm:p-8"
            >
              <h3 className="font-display text-[1.2rem] leading-tight">
                {service.title}
              </h3>
              {/* Lifted from ink/65 to ink/80 on the accent. Citron is a light
                  surface, so the text stays ink either way — but 65% on a
                  saturated field reads washed out where it looked settled on
                  cream. */}
              <p className="mt-3.5 text-[0.92rem] leading-relaxed text-ink/65 transition-colors duration-200 group-hover:text-ink/80">
                {service.detail}
              </p>

              {/* The "Learn more" link that used to close each card is gone.
                  `href` is still on every entry in `services` (lib/content.ts)
                  and is now unused — put the <Link> back and it works again. */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
