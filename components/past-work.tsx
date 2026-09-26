import {
  Package,
  Wine,
  Handshake,
  Users,
  Laptop,
  Landmark,
  Presentation,
} from "lucide-react";
import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";

/**
 * The photographs are self-hosted WebP under public/past-work, not hotlinked
 * from Unsplash. Six remote JPEGs on the home page was the last third-party
 * origin in the critical path and a large slice of the "improve image delivery"
 * finding in the Lighthouse report. Same pictures, a fraction of the bytes.
 *
 * ALL SEVEN are now the owner's own photographs, from site/Photos, encoded to
 * the 3:2 the cards crop to. No stock remains in this section.
 *
 * WHY THE CARDS WERE RETITLED. They used to read Trade show support, Factory
 * visits, Sourcing days, Meetings and interpreting, Arrivals and logistics and
 * City days, which were the SERVICES SOLD rather than work anybody could show.
 * The supplied photographs are all one genre: boardrooms, delegations, official
 * meetings, a supplier session, a company visit and an evening reception. Not
 * one shows a trade show floor, a factory, a market or a city day. Keeping the
 * old titles would have put a boardroom under "Factory visits". The titles now
 * describe what is in the frame, so the section is a portfolio rather than a
 * second copy of the services list. Those six services are still sold and still
 * advertised in ServicesSection and on each /tours/[slug] page.
 *
 * Two caveats that outlived the change:
 *
 *   1. These are still KINDS of engagement, not named jobs. No client is
 *      identified and no date is claimed, because none was supplied. The intro
 *      line on the page says so.
 *
 *      The cards are TITLE-ONLY by request: each one carried a sentence of
 *      supporting copy and all of them were removed. `description` is therefore
 *      optional on CardItem and the paragraph does not render when it is
 *      absent, so restoring one is a matter of adding the field back rather
 *      than touching the block. That is also where the fair, the month and
 *      what the visitor needed would go, if this is ever taken as far as a
 *      real portfolio with the client's agreement to be named.
 *
 *   2. These are photographs of IDENTIFIABLE PEOPLE, including what appear to
 *      be government officials. Everybody in frame needs to have agreed to
 *      appear on a public marketing page. That is the owner's to confirm and
 *      this file cannot assert it.
 *
 * `hosting` and `delegations` came from 800x600 originals and are upscaled at
 * the 1000w rendition. They are softer than the other six. Re-export from the
 * originals if larger copies exist.
 *
 * `linkHref` goes nowhere on purpose. The cards are not links — the block
 * renders them as list items, not anchors — so the field is carried only to
 * satisfy the supplied CardItem shape. If these ever become case-study pages,
 * this is the field that holds their URLs.
 */
const pastWork: CardItem[] = [
  {
    id: "official-meetings",
    title: "Official meetings",
    imgSrc: "/past-work/official-meetings-1000.webp",
    imgSrcSet:
      "/past-work/official-meetings-500.webp 500w, /past-work/official-meetings-1000.webp 1000w",
    icon: <Landmark size={24} />,
    linkHref: "#",
  },
  {
    id: "boardroom",
    title: "Boardroom negotiations",
    imgSrc: "/past-work/boardroom-1000.webp",
    imgSrcSet:
      "/past-work/boardroom-500.webp 500w, /past-work/boardroom-1000.webp 1000w",
    icon: <Handshake size={24} />,
    linkHref: "#",
  },
  {
    id: "product-reviews",
    title: "Product and packaging reviews",
    imgSrc: "/past-work/product-reviews-1000.webp",
    imgSrcSet:
      "/past-work/product-reviews-500.webp 500w, /past-work/product-reviews-1000.webp 1000w",
    icon: <Package size={24} />,
    linkHref: "#",
  },
  {
    id: "delegations",
    title: "Delegation visits",
    imgSrc: "/past-work/delegations-1000.webp",
    imgSrcSet:
      "/past-work/delegations-500.webp 500w, /past-work/delegations-1000.webp 1000w",
    icon: <Users size={24} />,
    linkHref: "#",
  },
  {
    id: "briefings",
    title: "Corporate briefings",
    imgSrc: "/past-work/briefings-1000.webp",
    imgSrcSet:
      "/past-work/briefings-500.webp 500w, /past-work/briefings-1000.webp 1000w",
    icon: <Presentation size={24} />,
    linkHref: "#",
  },
  {
    id: "working-sessions",
    title: "Working sessions",
    imgSrc: "/past-work/working-sessions-1000.webp",
    imgSrcSet:
      "/past-work/working-sessions-500.webp 500w, /past-work/working-sessions-1000.webp 1000w",
    icon: <Laptop size={24} />,
    linkHref: "#",
  },
  {
    id: "hosting",
    title: "Dinners and receptions",
    imgSrc: "/past-work/hosting-1000.webp",
    imgSrcSet:
      "/past-work/hosting-500.webp 500w, /past-work/hosting-1000.webp 1000w",
    icon: <Wine size={24} />,
    linkHref: "#",
  },
];

export function PastWork() {
  return (
    <section id="past-work" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
        <header className="max-w-[46rem]">
          <p className="eyebrow text-slate">Past work</p>
          <h2 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[3rem]">
            What We&apos;ve Done
          </h2>
          {/* Supplied copy, used as written with two characters changed. The
              original set the middle clause off with em dashes, and
              references/voice.md measures zero em dashes across the sample, so
              they are commas here. Nothing else moved.

              ⚠️ "HUNDREDS OF CLIENTS" IS AN UNSUBSTANTIATED BUSINESS FIGURE.
              references/stats.md still does not exist, so no number in
              customer-facing copy has a source in this repo. It is the same
              category of claim as the "Top 1% of 2,000+" line that was
              deliberately taken out of the hero. Record the real figure in
              stats.md or drop the quantity.

              ⚠️ THE HONESTY LINE THAT USED TO BE HERE IS GONE. It read "Eight
              kinds of day, photographed on the job. We have left the clients
              unnamed", which was the only thing on the page telling a visitor
              these cards are KINDS of engagement rather than named jobs. See
              the caveats at the top of this file. */}
          <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/70">
            With years of experience guiding international visitors through
            Shenzhen, we&apos;ve supported hundreds of clients, from factory
            sourcing trips and trade fairs to full-day city tours, with fluent
            English-Mandarin interpretation and local expertise you can rely on.
          </p>
        </header>

        {/* max-w-6xl on the block itself would stop short of this page's
            76rem column and read as indented. Cleared here rather than in the
            block, which other pages may yet use at its own width. */}
        <ExpandingCards items={pastWork} className="mt-12 max-w-none" />
      </div>
    </section>
  );
}
