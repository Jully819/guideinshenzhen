import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  GALLERY_PLACEHOLDER_COUNT,
  GalleryPlaceholder,
} from "@/components/gallery-placeholder";

const GALLERY_DIR = "gallery";
const IMAGE_RE = /\.(webp|jpe?g|png)$/i;

/**
 * Photo gallery, populated from the filesystem rather than a hand-kept list.
 *
 * TO ADD PHOTOS: drop image files into `public/gallery/`. They appear on the
 * next build, sorted by filename. There is no array to update and no way for
 * the list to drift out of step with what is actually on disk.
 *
 * NAME THE FILES DESCRIPTIVELY. The filename becomes the alt text —
 * `dusk-over-shenzhen-bay.jpg` reads as "Dusk over shenzhen bay" to a screen
 * reader and to Google. `IMG_4821.jpg` reads as "IMG 4821", which is useless to
 * both. Prefix with a number to control order: `01-...`, `02-...`.
 *
 * EMPTY BEHAVIOUR. With no photos the grid fills with drawn placeholders —
 * components/gallery-placeholder.tsx — rather than hiding the section or
 * showing grey boxes. Each is a different scene from a day out, so the grid
 * reads as an illustrated section that is waiting for its photography, not as
 * a broken one. A grey box says the site is half-built; a drawing says
 * somebody chose it. In development a short note underneath says where the
 * real files go, so the placeholders are not mistaken for the finished state.
 */
export function GallerySection() {
  const photos = readPhotos();

  return (
    <section
      id="gallery"
      className="border-t border-ink/10 bg-paper-dim py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <header className="max-w-[46rem]">
          <p className="eyebrow text-slate">The city, as you will see it</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[3rem]">
            Days we have already had.
          </h2>
        </header>

        {photos.length === 0 ? (
          <>
            <ul
              className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
              aria-hidden="true"
            >
              {Array.from({ length: GALLERY_PLACEHOLDER_COUNT }, (_, i) => (
                <li
                  key={i}
                  /* Same irregularity as the photo grid below: tile 0 spans
                     two columns and two rows. Every tile carries the same 4:3
                     ratio, which is what makes the big one line up exactly
                     with two rows of small ones plus the gap between them. */
                  className={i === 0 ? "col-span-2 row-span-2" : ""}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-paper-card text-ink/60">
                    <GalleryPlaceholder index={i} className="size-full" />
                  </div>
                </li>
              ))}
            </ul>
            {process.env.NODE_ENV !== "production" && <EmptyNotice />}
          </>
        ) : (
          <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo, i) => (
              <li
                key={photo.src}
                /* The first tile spans two columns and two rows. One deliberate
                   irregularity stops the grid reading as a contact sheet, and
                   keying it to index 0 means it survives photos being added or
                   removed without anybody maintaining a layout map. */
                className={
                  i === 0 ? "col-span-2 row-span-2" : ""
                }
              >
                <div className="h-full overflow-hidden rounded-xl bg-paper-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="size-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function EmptyNotice() {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-ink/25 px-6 py-8 text-center">
      <p className="font-display text-[1.1rem]">
        Those tiles are drawings, not photographs
      </p>
      <p className="mx-auto mt-2 max-w-[34rem] text-[0.9rem] leading-relaxed text-ink/65">
        Drop images into{" "}
        <code className="tabular rounded bg-ink/8 px-1.5 py-0.5">
          public/gallery/
        </code>{" "}
        and they replace the placeholders automatically, sorted by filename.
        Name them descriptively — the filename becomes the alt text. This notice
        is shown in development only; in production the placeholders stand on
        their own.
      </p>
    </div>
  );
}

interface Photo {
  src: string;
  alt: string;
}

function readPhotos(): Photo[] {
  const dir = join(process.cwd(), "public", GALLERY_DIR);
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((f) => IMAGE_RE.test(f))
    .sort()
    .map((file) => ({
      src: `/${GALLERY_DIR}/${file}`,
      alt: altFromFilename(file),
    }));
}

/** `02-dusk-over-shenzhen-bay.jpg` → "Dusk over shenzhen bay". */
function altFromFilename(file: string): string {
  const base = file
    .replace(IMAGE_RE, "")
    .replace(/^\d+[-_]?/, "") // strip any ordering prefix
    .replace(/[-_]+/g, " ")
    .trim();
  return base.charAt(0).toUpperCase() + base.slice(1);
}
