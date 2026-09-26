import type { AttractionTheme } from "@/lib/attractions";

/**
 * Stands in for a photograph until real ones exist.
 *
 * Drawn line art rather than a grey box or a "no image" icon, for one reason:
 * a grey box reads as broken, and a visitor deciding whether to spend money on
 * a day out reads broken as untrustworthy. A drawing reads as a choice.
 *
 * KEYED ON SLUG, NOT THEME. Two cards sharing a theme sit side by side in the
 * carousel — Huaqiangbei next to the robotics card, Lianhuashan next to Ping An
 * — and an identical drawing on both looks like a rendering bug rather than a
 * placeholder. Every place gets its own mark; `theme` is only the fallback for
 * a slug added to lib/attractions.ts without a drawing here.
 *
 * Same language as components/skyline.tsx — hairline strokes, no fill,
 * currentColor — so the two sit together rather than looking like assets from
 * two different sites.
 *
 * These disappear the moment a photograph is dropped in; see
 * components/attractions-section.tsx for the lookup.
 */
export function AttractionPlaceholder({
  slug,
  theme,
  className = "",
}: {
  slug: string;
  theme: AttractionTheme;
  className?: string;
}) {
  const Motif = BY_SLUG[slug] ?? BY_THEME[theme];

  return (
    <svg
      viewBox="0 0 240 300"
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

/* ------------------------------------------------------------------ tech */

/** A quadcopter with a payload — drone delivery and test flights. */
function Drone() {
  return (
    <g>
      <g opacity="0.85">
        <path d="M104 150h32v20h-32z" />
        <path d="M104 156l-26-16M136 156l26-16M104 164l-26 16M136 164l26 16" />
        <ellipse cx="74" cy="138" rx="18" ry="4.5" />
        <ellipse cx="166" cy="138" rx="18" ry="4.5" />
        <ellipse cx="74" cy="182" rx="18" ry="4.5" />
        <ellipse cx="166" cy="182" rx="18" ry="4.5" />
        <path d="M112 170v12h16v-12M114 182h12v14h-12z" />
      </g>
      {/* A robot arm below, for the humanoid-demo half of the card */}
      <g opacity="0.4">
        <path d="M62 268v-30l30-22 26 18" />
        <circle cx="62" cy="268" r="5" />
        <circle cx="92" cy="216" r="4" />
        <path d="M118 264h34v-18h-34z" />
      </g>
      <g opacity="0.24">
        <path d="M30 60h180M30 84h180" />
      </g>
    </g>
  );
}

/** A populated circuit board, seen flat — components and traces. */
function CircuitBoard() {
  return (
    <g>
      <g opacity="0.8">
        <path d="M36 92h168v150H36z" />
        {/* A large IC with legs */}
        <path d="M84 128h50v40H84z" />
        <path d="M84 136H72M84 148H72M84 160H72M134 136h12M134 148h12M134 160h12" />
        <circle cx="92" cy="136" r="2.5" />
        {/* Capacitors */}
        <circle cx="164" cy="126" r="11" />
        <circle cx="164" cy="126" r="4" opacity="0.5" />
        <circle cx="164" cy="166" r="8" />
        {/* Pin header */}
        <path d="M52 196h60v14H52z" />
        <path d="M62 196v14M72 196v14M82 196v14M92 196v14M102 196v14" opacity="0.5" />
      </g>
      {/* Traces */}
      <g opacity="0.38">
        <path d="M36 112h30l10 10h8M146 148h34M36 226h44l14-16h44l12 16h54" />
        <circle cx="80" cy="210" r="2.5" />
        <circle cx="138" cy="210" r="2.5" />
      </g>
      <g opacity="0.22">
        <path d="M36 60h168M36 268h168" />
      </g>
    </g>
  );
}

/* --------------------------------------------------------------- skyline */

/** A tapered supertall with its observation-deck band. */
function Supertall() {
  return (
    <g>
      <g opacity="0.3">
        <path d="M24 300V196h36v104M186 300V184h34v116" />
        <path d="M66 300V226h28v74M156 300V214h24v86" />
      </g>
      <g opacity="0.85">
        <path d="M96 300l6-198 12-42 12 42 6 198Z" />
        <path d="M120 60V28" />
        <path d="M103 140h30M101 180h34M99 220h38M97 260h42" opacity="0.4" />
        {/* The deck at 116 — drawn heavier, since it is the whole point */}
        <path d="M101 118h38M101 130h38" />
      </g>
      <path d="M0 300h240" opacity="0.5" />
    </g>
  );
}

/** A wooded hill with a pavilion, the towers small behind it. */
function ParkHill() {
  return (
    <g>
      {/* CBD in the distance — the view from the top */}
      <g opacity="0.26">
        <path d="M30 196V132h20v64M58 196V150h16v46" />
        <path d="M96 196l4-64 6-22 6 22 4 64" />
        <path d="M124 196V144h18v52M150 196V158h16v38M174 196V138h20v58" />
      </g>
      {/* Pavilion on the summit */}
      <g opacity="0.85">
        <path d="M92 152h56l-28-20z" />
        <path d="M100 152v24M140 152v24M96 176h48" />
      </g>
      {/* The hill */}
      <g opacity="0.8">
        <path d="M8 262q46-70 112-70t112 70" />
      </g>
      <g opacity="0.35">
        <path d="M40 250q10-16 20 0M74 234q10-16 20 0M146 234q10-16 20 0M180 250q10-16 20 0" />
        <path d="M20 284h200" />
      </g>
    </g>
  );
}

/* --------------------------------------------------------------- culture */

/** A canvas on an easel — studios that paint to commission. */
function Easel() {
  return (
    <g>
      <g opacity="0.85">
        <path d="M74 96h92v90H74z" />
        <path d="M84 106h72v70H84z" opacity="0.5" />
        <path d="M84 158l22-24 16 16 14-18 20 24" opacity="0.6" />
        <circle cx="138" cy="122" r="7" opacity="0.6" />
        <path d="M96 186l-14 76M144 186l14 76M92 232h56" />
      </g>
      <g opacity="0.3">
        <path d="M30 60h180" />
        <path d="M40 282h60M140 282h60" />
      </g>
    </g>
  );
}

/** A sawtooth factory roof with a painted wall — the converted arts district. */
function Factory() {
  return (
    <g>
      <g opacity="0.85">
        {/* Sawtooth roofline, the giveaway of an old industrial shed */}
        <path d="M28 140v-28l32-24v28l32-24v28l32-24v28l32-24v28l32-24v44" />
        <path d="M28 140h160v122H28z" />
        {/* Windows */}
        <path d="M48 168h30v34H48zM104 168h30v34h-30zM160 168h20v34h-20z" opacity="0.45" />
        {/* Door */}
        <path d="M48 262v-34h26v34" />
      </g>
      {/* Graffiti — loose marks, deliberately not letterforms */}
      <g opacity="0.4">
        <path d="M104 224q14-14 26 0t26-6" />
        <path d="M110 244h56" />
        <circle cx="176" cy="230" r="6" />
      </g>
      <path d="M12 262h216" opacity="0.45" />
    </g>
  );
}

/* ---------------------------------------------------------------- nature */

/** An egret over a mangrove boardwalk, the far shore beyond. */
function Egret() {
  return (
    <g>
      <g opacity="0.85">
        <path d="M118 132c0-14 10-24 24-24s24 10 24 26c0 18-16 30-32 30h-22" />
        <path d="M142 108V92c0-8 6-13 13-13" />
        <path d="M155 79l12 5-12 5" />
        <path d="M132 164v26M146 164v26" />
      </g>
      <g opacity="0.45">
        <path d="M20 214h200M20 226h200" />
        <path d="M46 214v22M92 214v22M138 214v22M184 214v22" />
      </g>
      <g opacity="0.3">
        <path d="M20 252q22-8 44 0t44 0 44 0 44 0" />
        <path d="M20 270q22-8 44 0t44 0 44 0 44 0" />
        <path d="M20 288q22-8 44 0t44 0 44 0 44 0" />
      </g>
      <path d="M20 186h34l10-10 12 10h30l14-14 12 14h48l12-8 12 8h16" opacity="0.24" />
    </g>
  );
}

/* -------------------------------------------------------------- shopping */

/** Market awnings over a stall front. */
function Awnings() {
  return (
    <g>
      <g opacity="0.85">
        <path d="M40 132h160l-12-34H52z" />
        <path d="M40 132q14 16 28 0t28 0 28 0 28 0 28 0" />
        <path d="M56 148h128v112H56z" />
        <path d="M56 176h128" opacity="0.45" />
        <path d="M78 176v34M100 176v26M122 176v34M144 176v26M166 176v34" opacity="0.4" />
        <path d="M56 232h128" opacity="0.45" />
      </g>
      <g opacity="0.28">
        <path d="M20 260h200M20 278h200" />
        <path d="M92 98V70h56v28" />
      </g>
    </g>
  );
}

/** A five-floor retail block — the border-crossing mall, floor by floor. */
function FloorsOfShops() {
  return (
    <g>
      <g opacity="0.82">
        <path d="M44 74h152v192H44z" />
        {/* Five floors, because the copy says five */}
        <path d="M44 112h152M44 150h152M44 188h152M44 226h152" opacity="0.5" />
        {/* Shopfront windows per floor */}
        <g opacity="0.42">
          <path d="M60 84h28v20H60zM100 84h28v20h-28zM140 84h28v20h-28z" />
          <path d="M60 122h28v20H60zM100 122h28v20h-28zM140 122h28v20h-28z" />
          <path d="M60 160h28v20H60zM100 160h28v20h-28zM140 160h28v20h-28z" />
          <path d="M60 198h28v20H60zM100 198h28v20h-28zM140 198h28v20h-28z" />
        </g>
        {/* Entrance */}
        <path d="M96 266v-32h48v32" />
        <path d="M120 234v32" opacity="0.4" />
      </g>
      {/* A bolt of cloth and a tape measure — the tailoring floor */}
      <g opacity="0.32">
        <path d="M20 288h200" />
        <path d="M28 266v-26h20v26M28 248h20" />
      </g>
    </g>
  );
}

const BY_SLUG: Record<string, () => React.JSX.Element> = {
  "futuristic-tech": Drone,
  huaqiangbei: CircuitBoard,
  "free-sky-116": Supertall,
  lianhuashan: ParkHill,
  "oct-loft": Factory,
  dafen: Easel,
  "shenzhen-bay-park": Egret,
  dongmen: Awnings,
  "luohu-commercial-city": FloorsOfShops,
};

const BY_THEME: Record<AttractionTheme, () => React.JSX.Element> = {
  tech: Drone,
  skyline: Supertall,
  culture: Easel,
  nature: Egret,
  shopping: Awnings,
};
