import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Build output directory, overridable per invocation.
   *
   * WHY THIS IS NOT JUST ".next". `next dev` and `next build` both write here,
   * so running a production build while the dev server is up replaces the
   * chunks the dev server has already loaded, and every page starts throwing
   * "Cannot find module './712.js'" until .next is deleted. That is exactly how
   * this site broke earlier. `npm run build:prod` sets NEXT_DIST_DIR to a
   * separate directory so the two can never collide again.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  /* Lighthouse flags large first-party JS with no source map under Best
     Practices. This costs build time and ships .map files; it does not ship
     more JavaScript to the browser. */
  productionBrowserSourceMaps: true,

  /**
   * Security headers, for the "Trust and Safety" block of the Best Practices
   * audit: CSP, HSTS, COOP and clickjacking were all failing.
   *
   * ⚠️ THESE ONLY EXIST IF SOMETHING IS SERVING THE APP. `headers()` is a
   * server feature. CLAUDE.md says the site ships with `output: 'export'`,
   * which it currently does NOT — there is no `output` key in this file. If
   * static export is ever switched on, this block silently stops applying and
   * the same headers have to be configured on the CDN instead. Check both.
   *
   * CSP NOTE: 'unsafe-inline' is present for styles and, in development, for
   * scripts. Next injects inline styles, and the JSON-LD blocks are inline
   * script tags. Tightening this to a nonce-based policy is worth doing, but it
   * needs the nonce plumbed through the layout, so it is deliberately left as a
   * known gap rather than half-done.
   */
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.unsplash.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.stripe.com",
      "frame-src https://js.stripe.com https://hooks.stripe.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        /* The self-hosted stock and blog photography is immutable: a change of
           picture is a change of filename. */
        source: "/:dir(attractions-stock|blog)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Real photography drops in later. images.unsplash.com is here ONLY for the
  // placeholder portraits in components/ui/testimonial.tsx, which next/image
  // refuses to load from an unlisted host. Drop this entry the moment those
  // are replaced with local files — leaving it open lets any Unsplash URL,
  // from anywhere in the codebase, hotlink through the optimiser.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
