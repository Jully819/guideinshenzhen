import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { business } from "@/lib/content";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/site";
import { ChatWidget } from "@/components/chat-widget";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Display and body are the reference's own pairing, taken from its stylesheet
// rather than guessed: Syne for headlines, DM Sans for everything else.
const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Utility — timestamps, prices, durations, flight numbers.
//
// NOT PRELOADED, DELIBERATELY. next/font preloads every family by default, so
// this was putting two more woff2 files at high priority on the critical path,
// competing with the stylesheet and with the hero copy that is the LCP element.
// Nothing above the fold is set in mono; it is prices and timestamps further
// down. `display: "swap"` still applies, so those render in the fallback and
// swap when the file arrives.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: `${business.name} — a private guide in Shenzhen, for the day`,
    template: `%s — ${business.name}`,
  },
  // Leads with the tailoring for the same reason the hero does: this string is
  // the search result, and "private guide in Shenzhen" describes fifty
  // listings. "Built around what you came for" describes one.
  description:
    "A private English-speaking guide in Shenzhen, for a day built around what you came for — no fixed route, no group. Sightseeing, sourcing or meetings. Pick a date, pay by card, and arrive to someone who is already expecting you.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: business.name,
    /* Site-wide default card, inherited by every page that does not set its
       own. JPEG rather than WebP: social crawlers are the least forgiving
       image consumers on the internet and JPEG is the one they all handle. */
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${business.name} — private guides and interpreters in ${business.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.jpg"],
  },
  metadataBase: new URL(SITE_URL),
  robots: {
    /* Driven by one flag so this tag and app/robots.ts can never disagree.
       Set NEXT_PUBLIC_SITE_INDEXABLE=true once the placeholders in
       lib/content.ts and lib/posts.ts are gone. See lib/site.ts. */
    index: SITE_INDEXABLE,
    follow: SITE_INDEXABLE,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

/**
 * Site-wide Organization schema. One node, emitted on every page, so a crawler
 * can tie the per-page Article, Service and FAQ blocks to a publisher.
 *
 * No `telephone` or `email`: the business is reached on WeChat only.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: business.name,
  description: `Private English-speaking guides and interpreters in ${business.city}.`,
  areaServed: { "@type": "City", name: business.city },
  knowsLanguage: ["en", "zh-Hans", "yue"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        {/* Last in the DOM, not floated into the middle of the page. It is
            fixed-position either way, but placing it here puts it last in the
            tab order too — a keyboard user reaches the page's own content
            before the widget, rather than tabbing into a message form on the
            way to the navigation. */}
        <ChatWidget />
      </body>
    </html>
  );
}
