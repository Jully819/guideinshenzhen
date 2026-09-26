import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { guides, type Guide, type Rating } from "@/lib/guides";

const EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];

/**
 * "Meet your guides" — the reference's card row, in this site's language.
 *
 * TO ADD PHOTOGRAPHS: drop files into `public/guides/` named after the slug in
 * lib/guides.ts — `guide-one.jpg` and so on. The drawn placeholder steps aside
 * on the next build.
 *
 * USE PHOTOGRAPHS OF THE ACTUAL GUIDE, AND ONLY WITH THEIR PERMISSION. A stock
 * portrait captioned with a guide's name tells the customer they will be met by
 * that person, which is a straightforward misrepresentation, and it uses a
 * model's likeness to advertise a service they never agreed to appear in. The
 * drawn placeholder is deliberately a figure rather than a face so that it
 * cannot be mistaken for anybody.
 */
export function GuidesSection() {
  const cards = guides.map((g) => ({ ...g, photo: findPhoto(g.slug) }));

  return (
    <section
      id="guides"
      /* Bone, and no top rule. Both follow from the reorder: the services
         band above is paper-dim, so this section has to step back to paper or
         the two touch in the same colour — and with the colour doing the
         separating, a hairline would draw the same join twice. See the surface
         rhythm in app/page.tsx. */
      className="border-t border-transparent bg-paper py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <header className="max-w-[46rem]">
          <p className="eyebrow text-slate">The team</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[3rem]">
            Meet your local private guides.
          </h2>
          <p className="mt-5 max-w-[36rem] text-[0.98rem] leading-relaxed text-ink/70">
            One of them stays with you from pickup to drop-off — not a handover
            between a driver, a guide and an interpreter. Tell us what the day
            is for and we match you to whoever knows it best.
          </p>
        </header>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} photo={g.photo} />
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[0.9rem] text-ink/60">
          Every guide speaks English and works this city daily.{" "}
          <Link
            href="/book"
            className="text-moss underline underline-offset-4 hover:text-ink"
          >
            Pick a date
          </Link>{" "}
          and we will tell you who you are meeting.
        </p>
      </div>
    </section>
  );
}

function GuideCard({ guide, photo }: { guide: Guide; photo: string | null }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-paper-card transition-colors duration-200 hover:border-ink/30">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-dim">
        {photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={photo}
            alt={`${guide.name}, guide in ${guide.based}`}
            className="size-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <GuidePortrait className="size-full text-ink/40" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[1.2rem] leading-tight">
          {guide.name}
        </h3>

        {/* Renders NOTHING when there is no rating — no empty stars, no
            "not yet rated". An absent rating should read as a section that
            has not been filled in, never as a poor one. */}
        {guide.rating && <Stars rating={guide.rating} />}

        <dl className="mt-3 space-y-1.5 text-[0.86rem] text-ink/70">
          <div className="flex gap-2">
            <dt className="sr-only">Based in</dt>
            <PinIcon />
            <dd>{guide.based}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="sr-only">Languages</dt>
            <GlobeIcon />
            <dd>{guide.languages.join(", ")}</dd>
          </div>
        </dl>

        <p className="mt-3 text-[0.86rem] leading-relaxed text-ink/65">
          {guide.focus}
        </p>
      </div>
    </article>
  );
}

function Stars({ rating }: { rating: Rating }) {
  return (
    <p className="tabular mt-2 flex items-center gap-1.5 text-[0.86rem]">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-moss"
        aria-hidden="true"
      >
        <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.6 6.1 20.8l1.2-6.6L2.5 9.5l6.6-.9z" />
      </svg>
      <span>{rating.score.toFixed(1)}</span>
      <span className="text-ink/65">
        ({rating.count.toLocaleString("en-GB")})
      </span>
    </p>
  );
}

function PinIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="mt-0.5 shrink-0 text-ink/60"
      aria-hidden="true"
    >
      <path d="M12 21c4-5.2 6.5-8.3 6.5-11a6.5 6.5 0 1 0-13 0c0 2.7 2.5 5.8 6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="mt-0.5 shrink-0 text-ink/60"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
    </svg>
  );
}

/**
 * A figure, deliberately not a face.
 *
 * Anything resembling a specific person here would be read as the guide the
 * card names. This is drawn in the same hairline language as the skyline and
 * the attraction placeholders, so an unfilled card reads as a considered gap
 * rather than a broken image.
 */
function GuidePortrait({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 300"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g opacity="0.85">
        <circle cx="120" cy="112" r="34" />
        <path d="M58 246v-14c0-27 22-49 49-49h26c27 0 49 22 49 49v14" />
      </g>
      {/* A far skyline behind, tying the card to the rest of the drawings. */}
      <g opacity="0.28">
        <path d="M20 246V196h22v50M50 246V176h16v70" />
        <path d="M186 246V186h20v60M156 246V206h20v40" />
        <path d="M118 246v-34" opacity="0" />
        <path d="M0 246h240" />
      </g>
    </svg>
  );
}

function findPhoto(slug: string): string | null {
  for (const ext of EXTENSIONS) {
    const rel = `/guides/${slug}${ext}`;
    if (existsSync(join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
