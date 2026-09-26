/**
 * Shenzhen skyline, drawn as line art.
 *
 * Vector rather than a raster illustration: crisp at any width, ~5kB, no
 * licence to track, and it inherits its colour from the surface it sits on —
 * `currentColor` throughout, so one asset works on bone and on ink.
 *
 * Three things give it the character of a technical drawing rather than a bar
 * chart, and all three are load-bearing:
 *
 *   1. FACADE HATCHING. Towers are filled with a fine vertical pattern, not
 *      flat colour. That is what reads as mullions from a distance and gives
 *      each building a grey tone instead of an empty outline.
 *   2. A GHOST LAYER. Generic blocks at low opacity, drawn behind and
 *      deliberately overlapping the landmarks. Depth comes from the overlap;
 *      without it every building sits on one plane and the city looks like a
 *      fence.
 *   3. NAMED SILHOUETTES. A generic skyline could be any city on earth. These
 *      are the shapes that actually say Shenzhen — Civic Center's wing roof,
 *      KK100's curved sail, Ping An Finance Centre's tapered shaft and needle
 *      spire, China Resources HQ's ribbed "bamboo shoot", Shun Hing Square's
 *      twin masts, and the Bay Sports Centre "Spring Cocoon".
 *
 * The three vehicles — delivery drone, helicopter, robotaxi — are the same
 * point made about the present rather than the buildings: this is a city where
 * food arrives by air and the taxi has nobody in the front seat. They sit at
 * three different depths (drone high left, helicopter high right, robotaxi in
 * the foreground BELOW the ground line) so the drawing reads as a scene rather
 * than a row of icons.
 *
 * The robotaxi crosses a few building bases, and that is deliberate. In a
 * technical line drawing a foreground object crossing what is behind it is how
 * depth is stated; hiding the overlap would flatten it back into an elevation.
 *
 * Decorative — the caller marks it aria-hidden. It states nothing the
 * surrounding copy does not.
 *
 * `id` namespaces the <pattern> definitions. Two instances on one page MUST be
 * given different ids, or the second one's fills resolve to the first one's
 * patterns.
 */
export function SkylineLineArt({
  className = "",
  id = "skyline",
}: {
  className?: string;
  id?: string;
}) {
  const mullions = `${id}-mullions`;
  const grid = `${id}-grid`;

  return (
    <svg
      viewBox="0 0 640 400"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        {/* Fine verticals — glass towers. */}
        <pattern
          id={mullions}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 0V4" stroke="currentColor" strokeWidth="0.5" opacity="0.55" />
        </pattern>
        {/* Verticals plus floor lines — concrete slabs. */}
        <pattern id={grid} width="6" height="6" patternUnits="userSpaceOnUse">
          <path
            d="M0 0V6M0 0H6"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>
      </defs>

      {/* ══════════════════════════════════════════════ Ghost layer.
          Low opacity is the whole trick. At full strength these read as more
          landmarks and the composition turns into a fence. */}
      <g opacity="0.28">
        <path d="M18 380V232h34v148" />
        <path d="M62 380V196h26v184" />
        <path d="M118 380V250h40v130" />
        <path d="M172 380V208h28v172" />
        <path d="M226 380V262h30v118" />
        <path d="M252 380V178h24v202" />
        <path d="M300 380V244h44v136" />
        <path d="M364 380V204h30v176" />
        <path d="M418 380V264h34v116" />
        <path d="M468 380V220h28v160" />
        <path d="M522 380V254h40v126" />
        <path d="M578 380V212h30v168" />
        {/* Stepped profiles, for a second read of depth */}
        <path d="M94 380V286h20v-28h22v122" />
        <path d="M454 380V292h18v-24h16v112" />
        <path d="M604 380V270h18v-22h16v132" />
      </g>

      {/* ══════════════════════════════════════════════ Foreground */}
      <g opacity="0.95">
        {/* ---- Civic Center wing roof. The low span on slim posts. */}
        <path d="M6 338q33-30 66 0" />
        <path d="M6 338v8M72 338v8" />
        <path d="M18 380v-32M32 380v-36M46 380v-36M60 380v-32" opacity="0.55" />

        {/* ---- Pagoda gate. One older roofline against all the glass. */}
        <path d="M84 346h34" />
        <path d="M88 346l7-11h16l7 11" />
        <path d="M92 380v-34M114 380v-34" />
        <path d="M96 358h14" opacity="0.6" />

        {/* ---- Straight tower with a stepped crown.
             This was KK100's curved sail — one control point off, it read as a
             lopsided blob rather than a landmark, and at this size the curve
             bought nothing the silhouette either side did not already give. A
             plain shaft with a setback at the top is legible at 400px wide. */}
        <path d="M132 380V244h38v136Z" fill={`url(#${mullions})`} />
        <path d="M140 244v-18h22v18" fill={`url(#${mullions})`} />
        <path d="M148 226v-10" />
        <path d="M132 286h38M132 328h38" opacity="0.35" />

        {/* ---- Ping An Finance Centre. The tall one. */}
        <path
          d="M196 380l5-244 11-64 11 64 5 244Z"
          fill={`url(#${mullions})`}
        />
        <path d="M212 72V40" />
        <path d="M201 172h22M200 216h24M199 260h26M198 304h28M197 348h30" opacity="0.35" />
        {/* The chamfer that makes it read as Ping An and not a generic spike */}
        <path d="M205 136h14" opacity="0.5" />

        {/* ---- Slim gridded tower, for rhythm. */}
        <path d="M244 380V204h28v176Z" fill={`url(#${grid})`} />

        {/* ---- China Resources HQ. The ribbed "bamboo shoot". */}
        <path
          d="M288 380V206q21-58 42 0v174Z"
          fill={`url(#${mullions})`}
        />
        <path d="M297 380V196M309 380V184M321 380V196" opacity="0.32" />
        <path d="M290 244h38M289 288h40M288 332h42" opacity="0.3" />

        {/* ---- Shun Hing Square. Stepped slab, twin masts. */}
        <path d="M346 380V236h52v144Z" fill={`url(#${grid})`} />
        <path d="M358 236v-34h28v34" fill={`url(#${grid})`} />
        <path d="M366 202V156M378 202V156" />
        <path d="M346 278h52M346 320h52" opacity="0.35" />

        {/* ---- Mid slab. */}
        <path d="M412 380V224h40v156Z" fill={`url(#${grid})`} />
        <path d="M425 380V224M438 380V224" opacity="0.28" />

        {/* ---- Rounded-top tower. */}
        <path
          d="M466 380V232q17-30 34 0v148Z"
          fill={`url(#${mullions})`}
        />
        <path d="M466 280h34M466 322h34" opacity="0.32" />

        {/* ---- Bay Sports Centre. The low "Spring Cocoon" lattice. */}
        <path d="M512 380v-32q60-46 120 0v32" />
        <path d="M512 348q60-46 120 0" opacity="0.45" />
        <path
          d="M530 380v-40M548 380v-46M566 380v-49M584 380v-49M602 380v-46M620 380v-40"
          opacity="0.4"
        />
        {/* Diagonals — the lattice, not just ribs */}
        <path d="M512 348l120 32M632 348l-120 32" opacity="0.22" />
      </g>

      {/* The one solid horizontal, so the city stands on something. */}
      <path d="M0 380h640" opacity="0.55" />

      {/* ══════════════════════════════════════════════ Delivery drone.
          High and left, small enough to read as distant. The slung box under
          it is the whole point — without it this is a toy quadcopter rather
          than the food delivery the attractions section talks about. */}
      {/* The animation lives on a NESTED group, never on the element carrying
          the `transform` attribute: a CSS transform replaces that attribute
          outright rather than composing with it, and the drone would snap to
          the top-left corner of the viewBox the moment the first keyframe
          applied. Same pattern on the helicopter and the taxi below. */}
      <g opacity="0.85" transform="translate(112 104)">
        <g className="sky-drone">
          <path d="M-10 -5h20v9h-20z" />
          <path d="M-10 -2l-11-6M10 -2l11-6M-10 2l-11 6M10 2l11 6" />
          <ellipse className="sky-rotor" cx="-21" cy="-8" rx="8.5" ry="2.2" />
          <ellipse className="sky-rotor" cx="21" cy="-8" rx="8.5" ry="2.2" />
          <ellipse className="sky-rotor" cx="-21" cy="8" rx="8.5" ry="2.2" />
          <ellipse className="sky-rotor" cx="21" cy="8" rx="8.5" ry="2.2" />
          <path d="M-4 4v4M4 4v4" opacity="0.6" />
          <path d="M-5 8h10v7h-10z" />
        </g>
      </g>

      {/* ══════════════════════════════════════════════ Helicopter.
          Higher and further right than the drone so the two do not read as a
          pair. Nose left, tail right, main rotor drawn as a single line —
          anything thicker at this size turns into a smudge. */}
      <g opacity="0.85" transform="translate(516 70)">
        <g className="sky-heli">
          <path d="M-20 6c0-11 7-17 16-17h5c6 0 10 3 13 8l4 7v2Z" />
          <path d="M18 -1h22v5H18" />
          <path d="M40 -1l6-7v13l-6-2Z" />
          <path d="M46 -7v12" opacity="0.6" />
          <path d="M0 -11v-6" />
          {/* The main rotor is one line, so it cannot be spun — it is squeezed
              on X instead. A blade sweeping towards the viewer foreshortens to
              nothing and back, which is exactly what scaleX does, and it costs
              one composited property rather than a redraw. */}
          <path className="sky-blade" d="M-26 -17h52" />
          <path d="M-11 6v7M7 6v7M-17 13h30" />
        </g>
      </g>

      {/* ══════════════════════════════════════════════ Robotaxi.
          Below the ground line, which is what puts it in front of the city.
          The roof-mounted lidar is the only thing distinguishing this from an
          ordinary car, so it is drawn at full weight while the window mullions
          are dropped back. */}
      {/* scale(1.25) does double duty: it makes the car bigger AND, because
          SVG scales stroke width with the transform, heavier-lined than the
          city behind it. Both are what say "nearer" in a line drawing. At the
          unscaled size the lidar dome came out under 4px and the whole thing
          read as a generic car. */}
      {/* The near kerb, in USER space and running the full width — not the
          short stretch that used to sit inside the car's own group.

          Two reasons it moved out here. A road drawn inside the animated group
          slides along with the car, so the scene reads as the camera panning
          rather than the car driving. And the car now crosses the entire
          drawing, so a 92-unit stretch of kerb would leave it travelling on
          nothing for most of the journey. */}
      <path d="M0 394h640" opacity="0.28" />

      <g opacity="0.9" transform="translate(470 394) scale(1.25)">
        <g className="sky-taxi">
          <path d="M-27 -10l6 -9h20l8 9" />
          <path d="M-29 -10h58v6h-58z" />
          <path d="M-19 -11v-7M3 -11v-7" opacity="0.45" />
          <circle cx="-16" cy="-4.5" r="4.5" />
          <circle cx="16" cy="-4.5" r="4.5" />
          <path d="M-5 -19h10v-5h-10z" />
          <path d="M0 -24v-3" />
          {/* The lidar dome sweeps — the one part of a robotaxi that is
              visibly always working, and the detail that says nobody is
              driving. */}
          <circle className="sky-lidar" cx="0" cy="-28" r="2.4" />
        </g>
      </g>

      {/* ══════════════════════════════════════════════ Hot-air balloon.
          Placed at x≈230 in the clear stretch of sky between the drone and
          the tall spire, and high enough that its banner never crosses a
          rooftop — nothing in this drawing rises above y≈160 there, and text
          over facade hatching is unreadable.

          TWO NESTED ANIMATED GROUPS, not one. The drift and the bob run on
          different periods (29s and 19s), which is what stops the motion
          reading as a single mechanical loop. Two transforms on one element
          cannot have two durations, so they get an element each.

          THE TEXT NEEDS ITS OWN FILL AND STROKE. This <svg> sets fill="none"
          and stroke="currentColor" for the line work; inherited by a <text>
          that is exactly backwards — it would render as invisible letters with
          outlined edges. Hence fill="currentColor" stroke="none" below.

          It is decorative: the whole drawing is aria-hidden, so "Welcome to
          Shenzhen" is seen and not announced. The page already says what it is
          in its <h1>; a screen reader does not need the greeting twice. */}
      <g className="sky-balloon-drift">
        <g className="sky-balloon-bob">
          <g transform="translate(300 98)">
            {/* Envelope. Drawn as two mirrored curves rather than an ellipse
                so it can taper into the throat the way fabric actually
                does. */}
            <g opacity="0.85">
              <path d="M0 -62C-26 -62 -36 -42 -36 -26c0 18 18 32 36 44 18-12 36-26 36-44 0-16-10-36-36-36Z" />
              {/* Gores. The two inner seams are drawn heavier than the outer
                  pair, which is what gives a flat outline its roundness. */}
              <path d="M0 -62C-14 -40-14 -6 0 18" opacity="0.55" />
              <path d="M0 -62C14 -40 14 -6 0 18" opacity="0.55" />
              <path d="M-20 -56C-30 -38-30 -14-14 6" opacity="0.3" />
              <path d="M20 -56C30 -38 30 -14 14 6" opacity="0.3" />
              {/* Horizontal band around the widest point */}
              <path d="M-35 -30C-18 -24 18 -24 35 -30" opacity="0.35" />
            </g>

            {/* Throat, rigging and basket */}
            <g opacity="0.8">
              <path d="M-9 14h18" />
              <path d="M-8 16l-3 12M8 16l3 12" />
              <path d="M-11 28h22v13h-22z" />
              <path d="M-11 34h22" opacity="0.4" />
            </g>

            {/* Banner, on two short lines under the basket. Two lines of type
                rather than one: "WELCOME TO SHENZHEN" set on a single line is
                140 units wide under a 72-unit balloon, which reads as a small
                balloon towing a large sign. */}
            <g opacity="0.75">
              <path d="M-6 41v7M6 41v7" />
              <path d="M-50 48h100v30h-100z" />
              <text
                /* tracking utility, not the letterSpacing attribute: the
                   .font-display class carries -0.03em, and a CSS declaration
                   beats a presentation attribute, so the attribute would be
                   silently ignored and the letters would close up. */
                className="font-display tracking-[0.16em]"
                x="0"
                y="61"
                textAnchor="middle"
                fontSize="10.5"
                fill="currentColor"
                stroke="none"
              >
                WELCOME TO
              </text>
              <text
                /* tracking utility, not the letterSpacing attribute: the
                   .font-display class carries -0.03em, and a CSS declaration
                   beats a presentation attribute, so the attribute would be
                   silently ignored and the letters would close up. */
                className="font-display tracking-[0.16em]"
                x="0"
                y="73"
                textAnchor="middle"
                fontSize="10.5"
                fill="currentColor"
                stroke="none"
              >
                SHENZHEN
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
