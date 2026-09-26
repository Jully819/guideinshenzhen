/**
 * Stands in for a gallery photograph until real ones exist.
 *
 * Same reasoning as components/attraction-placeholder.tsx, and deliberately
 * the same drawing language — hairline strokes, no fill, currentColor, layered
 * opacity for depth — so the two sets read as one hand rather than as two
 * unrelated assets. A grey box reads as broken; a drawing reads as a choice.
 *
 * EIGHT DISTINCT MOTIFS, NOT ONE REPEATED. The gallery is a grid, and a grid of
 * the same mark eight times looks like a rendering fault. Each scene is a
 * different moment of a day out — arriving, eating, walking, the view from the
 * top — which is the argument the real photographs will make once they land.
 *
 * NO SUBJECT IS INVENTED. These are scenes, not claims: no faces, no named
 * venue, no signage that says anything. The gallery header promises "days we
 * have already had", so a placeholder that depicted a specific identifiable
 * day would be a picture of something that has not happened yet.
 *
 * These disappear the moment photographs are dropped into public/gallery/;
 * see components/gallery-section.tsx.
 */
export function GalleryPlaceholder({
  index,
  className = "",
}: {
  /** Position in the grid. Picks the motif, so the set never repeats. */
  index: number;
  className?: string;
}) {
  const Motif = MOTIFS[index % MOTIFS.length];

  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <Motif />
    </svg>
  );
}

/**
 * How many distinct scenes exist. The section reads this to size its grid.
 *
 * NINE IS NOT ARBITRARY. Tile 0 spans two columns and two rows, so it eats
 * four cells: 9 tiles occupy 12 cells, which divides exactly by 4, 3 and 2 —
 * the column counts at lg, md and base. Any other total leaves a hole in the
 * bottom row at one breakpoint or another. Add a tenth scene and the grid goes
 * ragged; add a fourth to make thirteen and it stays ragged.
 */
export const GALLERY_PLACEHOLDER_COUNT = 9;

/* ------------------------------------------------------------------ scenes */

/** The skyline across the water at dusk — the establishing shot. */
function BayAtDusk() {
  return (
    <g>
      <g opacity="0.2">
        <circle cx="238" cy="72" r="26" />
      </g>
      <g opacity="0.75">
        <path d="M18 156V96h22v60M40 156V112h18v44" />
        <path d="M74 156l4-70 5-20 5 20 4 70" />
        <path d="M100 156V104h20v52M124 156V118h16v38" />
        <path d="M156 156V88h24v68M186 156V116h18v40" />
        <path d="M212 156l3-58 4-16 4 16 3 58" />
        <path d="M238 156V110h22v46M264 156V124h18v32M288 156V102h16v54" />
      </g>
      {/* Facade lines, light enough to read as windows rather than stripes */}
      <g opacity="0.28">
        <path d="M18 116h22M18 134h22M100 124h20M100 140h20M238 128h22M288 122h16M288 138h16" />
      </g>
      <path d="M0 158h320" opacity="0.5" />
      {/* Reflections — shorter, broken strokes below the waterline */}
      <g opacity="0.22">
        <path d="M20 168h18M78 170h10M104 166h14M160 172h18M214 168h10M240 166h18M290 170h12" />
        <path d="M22 184h14M80 186h8M106 182h10M162 188h14M216 184h8M242 182h14M292 186h10" />
      </g>
      <g opacity="0.3">
        <path d="M10 206q28-8 56 0t56 0 56 0 56 0 56 0" />
        <path d="M10 224q28-8 56 0t56 0 56 0 56 0 56 0" />
      </g>
    </g>
  );
}

/** A metro car at the platform, in profile — how the day actually moves. */
function MetroCar() {
  return (
    <g>
      <g opacity="0.82">
        {/* Car body, rounded at the nose, running off the right edge */}
        <path d="M320 190H62q-20 0-30-16l-14-22q-6-10 0-20l14-22q10-16 30-16h258" />
        {/* Cab window */}
        <path d="M46 122h34v30H46q-8 0-8-8v-14q0-8 8-8z" opacity="0.55" />
        {/* Doors, and the windows between them */}
        <path d="M104 190v-76M148 190v-76M104 152h44" opacity="0.5" />
        <path d="M164 124h44v26h-44zM222 124h44v26h-44zM280 124h40v26h-40z" opacity="0.45" />
        {/* Skirt and bogies */}
        <path d="M62 190h258" opacity="0.4" />
        <circle cx="126" cy="202" r="11" opacity="0.5" />
        <circle cx="176" cy="202" r="11" opacity="0.5" />
        <circle cx="272" cy="202" r="11" opacity="0.5" />
      </g>
      {/* Platform edge, and the tactile strip along it */}
      <g opacity="0.34">
        <path d="M0 216h320M0 230h320" />
        <path d="M14 220v6M42 220v6M70 220v6M98 220v6M126 220v6M154 220v6M182 220v6M210 220v6M238 220v6M266 220v6M294 220v6" />
      </g>
      {/* Overhead line and platform edge doors behind */}
      <g opacity="0.2">
        <path d="M0 40h320M0 56h320" />
        <path d="M96 56v42M200 56v42M296 56v42" />
      </g>
    </g>
  );
}

/** A round table mid-meal — the part of the day nobody photographs badly. */
function TableForFour() {
  return (
    <g>
      <g opacity="0.8">
        <ellipse cx="160" cy="140" rx="126" ry="70" />
        {/* Steamer baskets, stacked */}
        <ellipse cx="160" cy="118" rx="30" ry="15" />
        <path d="M130 118v14a30 15 0 0 0 60 0v-14" />
        <ellipse cx="160" cy="104" rx="30" ry="15" opacity="0.6" />
        {/* Four settings */}
        <ellipse cx="70" cy="150" rx="22" ry="11" />
        <ellipse cx="250" cy="150" rx="22" ry="11" />
        <ellipse cx="112" cy="188" rx="20" ry="10" />
        <ellipse cx="208" cy="188" rx="20" ry="10" />
      </g>
      {/* Chopsticks and a pot */}
      <g opacity="0.42">
        <path d="M42 138l30-10M46 142l30-10" />
        <path d="M248 136l30 10M244 140l30 10" />
        <path d="M226 104h34v22h-34zM260 110h10v8h-10" />
        <path d="M232 104v-8" />
      </g>
      <g opacity="0.2">
        <path d="M20 46h280M20 66h280" />
      </g>
    </g>
  );
}

/** A shopfront street under strung lights and awnings — the evening walk. */
function StreetAtNight() {
  return (
    <g>
      {/* Strung lights across the top */}
      <g opacity="0.4">
        <path d="M0 34q80 26 160 0t160 0" />
        <circle cx="46" cy="42" r="3" />
        <circle cx="92" cy="46" r="3" />
        <circle cx="138" cy="44" r="3" />
        <circle cx="184" cy="42" r="3" />
        <circle cx="230" cy="44" r="3" />
        <circle cx="276" cy="40" r="3" />
      </g>
      <g opacity="0.8">
        {/* Left frontage, in perspective */}
        <path d="M14 210V86l70 22v96" />
        <path d="M14 120l70 20" opacity="0.5" />
        <path d="M30 210v-40h26v40" />
        {/* Right frontage */}
        <path d="M306 210V86l-70 22v96" />
        <path d="M306 120l-70 20" opacity="0.5" />
        <path d="M264 210v-40h26v40" />
        {/* The street closing away */}
        <path d="M84 210h152" />
        <path d="M112 210v-32h96v32" />
      </g>
      {/* Vertical signs — blank boards, no lettering */}
      <g opacity="0.45">
        <path d="M92 96h16v54H92zM212 96h16v54h-16z" />
      </g>
      <g opacity="0.25">
        <path d="M0 212h320M0 228h320" />
      </g>
    </g>
  );
}

/** The viewer on an observation deck, aimed at the towers beyond the glass. */
function ObservationDeck() {
  return (
    <g>
      {/* The glass: two mullions and a rail, held back so the view reads
          through it rather than the frame reading as the subject. */}
      <g opacity="0.3">
        <path d="M56 8v186M264 8v186" />
        <path d="M0 158h320" />
      </g>
      {/* Towers below the horizon, small — this is a view DOWN at a city */}
      <g opacity="0.34">
        <path d="M74 158V96h20v62M100 158v-44h16v44" />
        <path d="M136 158l3-52 4-14 4 14 3 52" />
        <path d="M160 158v-38h18v38M186 158V88h20v70M212 158v-30h16v30" />
        <path d="M236 158V104h22v54M282 158V118h18v40M18 158V112h22v46" />
      </g>
      <g opacity="0.18">
        <path d="M0 172h320M0 186h320" />
      </g>
      {/* The coin-op viewer, foreground and much heavier than anything behind
          it — one solid object is what stops this reading as a diagram. It is
          aimed LEFT, out at the towers, which is what makes it a scene rather
          than an object drawn on a background. */}
      <g opacity="0.9">
        {/* Tapered body: narrow objective end at the left, wide at the back */}
        <path d="M108 116v20l12 8 76 10V80l-76 10-12 8z" />
        <path d="M120 98v46" opacity="0.45" />
        {/* Eyepieces */}
        <path d="M196 88h16v58h-16z" />
        <path d="M212 100h10v34h-10" opacity="0.6" />
        {/* Handles, one either side */}
        <path d="M136 148v22M180 154v22" opacity="0.5" />
        {/* Column and base */}
        <path d="M146 152v70M176 156v66" />
        <path d="M130 222h62l10 18h-82z" />
      </g>
    </g>
  );
}

/** A boardwalk through the mangroves — the slow hour of the day. */
function Boardwalk() {
  return (
    <g>
      <g opacity="0.78">
        {/* Deck narrowing to a vanishing point */}
        <path d="M6 232l122-110M314 232L192 122" />
        <path d="M128 122h64" />
        {/* Planks */}
        <path d="M28 212h264M52 192h216M76 172h164M98 154h124M118 138h84" opacity="0.4" />
        {/* Handrails */}
        <path d="M12 226V196l116-84M308 226V196L192 112" opacity="0.55" />
        <path d="M44 200v-24M78 176v-22M108 152v-18M276 200v-24M242 176v-22M212 152v-18" opacity="0.4" />
      </g>
      {/* Reeds either side */}
      <g opacity="0.35">
        <path d="M22 190q-6-26 2-44M34 196q4-24 14-38M292 190q6-26-2-44M282 196q-4-24-14-38" />
      </g>
      {/* Trees and a bird beyond */}
      <g opacity="0.28">
        <path d="M0 108h130M190 108h130" />
        <path d="M64 108q10-24 26-12M240 108q-10-24-26-12" />
        <path d="M144 74q8-6 16 0" />
      </g>
    </g>
  );
}

/** A stall counter with hands over goods — the market, close in. */
function MarketStall() {
  return (
    <g>
      <g opacity="0.8">
        {/* Awning */}
        <path d="M24 74h272l-20-38H44z" />
        <path d="M24 74q22 18 45 0t45 0 45 0 45 0 45 0 45 0" />
        {/* Counter */}
        <path d="M40 148h240v22H40zM56 170v62M264 170v62" />
        {/* Trays on it */}
        <path d="M64 148v-18h56v18zM136 148v-24h48v24zM200 148v-16h58v16z" opacity="0.55" />
      </g>
      {/* Crates stacked behind */}
      <g opacity="0.32">
        <path d="M48 128h44v-30H48zM100 128h38v-24h-38zM220 128h46v-34h-46z" />
        <path d="M48 112h44M220 110h46" />
      </g>
      {/* A hand reaching in — the only human mark in the set, deliberately
          reduced to a gesture rather than a person */}
      <g opacity="0.5">
        <path d="M176 196v-28q0-8 7-8t7 8v18" />
        <path d="M190 186v-22q0-7 6-7t6 7v22" />
        <path d="M202 190v-16q0-7 6-7t6 7v30q0 18-18 18h-16q-14 0-14-14v-20" />
      </g>
      <path d="M20 232h280" opacity="0.28" />
    </g>
  );
}

/** The car at the kerb, doors shut, day over. */
function KerbsidePickup() {
  return (
    <g>
      <g opacity="0.8">
        {/* Saloon in profile */}
        <path d="M40 178h240" />
        <path d="M44 178v-26q0-10 12-14l38-12 24-24h72l30 24 34 10q14 4 14 16v26" />
        <path d="M104 122l18-18h58l22 18z" opacity="0.5" />
        <path d="M150 104v18" opacity="0.4" />
        <circle cx="96" cy="178" r="20" />
        <circle cx="96" cy="178" r="8" opacity="0.5" />
        <circle cx="230" cy="178" r="20" />
        <circle cx="230" cy="178" r="8" opacity="0.5" />
        <path d="M128 150h64" opacity="0.35" />
      </g>
      {/* Kerb and pavement */}
      <g opacity="0.35">
        <path d="M0 198h320M0 210h320" />
        <path d="M0 226h320" opacity="0.6" />
        <path d="M40 210v16M120 210v16M200 210v16M280 210v16" opacity="0.5" />
      </g>
      {/* Buildings and a tree behind */}
      <g opacity="0.2">
        <path d="M10 96V40h44v56M64 96V54h32v42M240 96V44h40v52" />
        <path d="M290 96q14-30 26 0" />
      </g>
    </g>
  );
}

/** Crossed escalators in a mall atrium — the indoor hour of a hot afternoon. */
function Atrium() {
  return (
    <g>
      {/* The far flight, coming down. Behind and quiet, so the two do not
          fight — a matched pair of diagonals reads as a lattice, not a room. */}
      <g opacity="0.3">
        <path d="M288 216L136 108" />
        <path d="M288 190L136 82" />
        <path d="M264 216v-18M232 194v-18M200 172v-18M168 150v-18" />
      </g>
      {/* The near flight, going up. Drawn as actual treads: a plain diagonal
          band is a ramp, and the step profile is the only thing that says
          escalator without a caption. */}
      <g opacity="0.85">
        <path d="M56 216h17v-13h17v-12h17v-13h17v-12h17v-13h17v-12h17v-13h17v-12" />
        <path d="M44 214l152-104" opacity="0.5" />
        <path d="M36 196l152-104" />
        <path d="M36 180l152-104" opacity="0.55" />
      </g>
      {/* Floor plates above, receding */}
      <g opacity="0.3">
        <path d="M0 84h116M204 84h116" />
        <path d="M0 46h96M224 46h96" />
        <path d="M28 84V46M88 84V46M232 84V46M292 84V46" opacity="0.6" />
      </g>
      {/* Rooflight, and the ground floor below */}
      <g opacity="0.2">
        <path d="M96 20h128l-14 18H110z" />
        <path d="M0 232h320" />
        <path d="M60 232v-14h30v14M230 232v-14h30v14" />
      </g>
    </g>
  );
}

const MOTIFS: (() => React.JSX.Element)[] = [
  BayAtDusk,
  MetroCar,
  TableForFour,
  StreetAtNight,
  ObservationDeck,
  Boardwalk,
  MarketStall,
  Atrium,
  KerbsidePickup,
];
