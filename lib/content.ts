/**
 * SINGLE SOURCE OF ALL PLACEHOLDER CONTENT.
 *
 * Nothing invented about the business lives anywhere else in the codebase.
 * Before launch, replace everything listed in REPLACE_BEFORE_LAUNCH below.
 *
 * THE PRODUCT IS ONE THING: a private guide, for a day, in Shenzhen. The two
 * entries in `tours` are not two products — they are the two reasons people
 * come, and they change what the day contains, not who you are buying from.
 * Interpreting and a car with a driver are included in every day rather than
 * sold separately; splitting them was how the previous version of this site
 * made a visitor assemble their own trip.
 *
 * Deliberate omissions — these are NOT here and must not be invented:
 *   - Testimonials / reviews. Fabricated social proof is a lie to customers
 *     and, in several jurisdictions, unlawful. The home page reserves a slot
 *     that stays hidden until `testimonials` has real entries.
 *   - Guide certifications, tour-operator licence numbers, insurance policy
 *     numbers. Dummy values below are obviously fake on purpose so they
 *     cannot ship unnoticed.
 */

export const REPLACE_BEFORE_LAUNCH = [
  "business.name / legalName / tagline",
    "business.licence (currently an obvious dummy)",
  "pricing in lib/pricing.ts — every figure is a guess",
  "guide bio, languages and photograph on /about",
  "policy.* — cancellation window and refund terms, which must match Stripe",
  "faqs marked PLACEHOLDER — visa and language answers especially",
  "testimonials — currently empty; add real ones or leave empty",
] as const;

/**
 * TWO TRIPS, NOT THREE.
 *
 * This was sightseeing / sourcing / business. Sourcing *is* business — someone
 * flying in to walk Huaqiangbei and someone flying in for a factory meeting
 * want the same thing from a guide: an interpreter who knows what a real
 * price sounds like and writes down what was agreed. Splitting them made the
 * visitor classify their own trip before they could see a price, and the two
 * halves shared most of their copy anyway.
 */
export type TourSlug = "private" | "business";

/** The two lengths a day can be booked at. Drives Cal.com and pricing alike. */
export interface Duration {
  hours: number;
  label: string;
  /** Cal.com wants minutes, and so does the slots API. */
  minutes: number;
}

export const durations: Duration[] = [
  { hours: 4, label: "Half day", minutes: 240 },
  { hours: 8, label: "Full day", minutes: 480 },
];

export function getDuration(hours: number): Duration | undefined {
  return durations.find((d) => d.hours === hours);
}

/** Party sizes one guide can genuinely look after. Above this, get in touch. */
export const MAX_GUESTS = 8;

/**
 * Consecutive days one booking may span.
 *
 * A multi-day trip is N SEPARATE Cal.com bookings, one per day at the same
 * start time — not one long block. A single booking spanning nights would mark
 * the guide busy through the small hours and make the calendar lie. The cap
 * exists because each extra day is another slot that has to be free, and the
 * chance of the whole run being available falls away quickly.
 */
export const MAX_DAYS = 5;

export interface Tour {
  slug: TourSlug;
  /** Short label for the hero tabs. Keep to one word. */
  tab: string;
  name: string;
  /** One line, said from the visitor's side of the screen. */
  promise: string;
  description: string;
  /** What the visitor stops having to deal with. The real product. */
  removes: string[];
  /** What the day contains. Interpreting and the car live here now. */
  includes: string[];
  /** Honest limits. A premium buyer trusts the seller who states them. */
  excludes: string[];
  /** An illustrative day, shown on the tour page. Not a fixed itinerary. */
  sampleDay: { time: string; place: string; detail: string }[];
}

export const business = {
  name: "Guide in Shenzhen",
  legalName: "PLACEHOLDER — register legal entity name here",
  tagline: "A private guide in Shenzhen, for the day.",
  wechatId: "guideinshenzhen",
  licence: "LICENCE-NUMBER-PENDING", // PLACEHOLDER — do not ship
  city: "Shenzhen",
  timeZone: "Asia/Shanghai",
  /** Hours the business actually takes bookings, local time. */
  hours: { open: "07:00", close: "22:00" },
} as const;

/**
 * The four claims in the trust strip. Every one is checkable — a promise the
 * business either keeps or visibly does not. No adjectives, no review scores.
 */
export const assurances = [
  {
    title: "One guide, all day",
    detail:
      "The same person from pickup to drop-off. Not a handover between a driver, a guide and an interpreter.",
  },
  {
    title: "Pay by card",
    detail:
      "No WeChat Pay or Alipay account needed. The single most common thing that strands a visitor here.",
  },
  {
    title: "Fixed price, quoted first",
    detail:
      "You see the full amount before you pay. Entry tickets and lunch are the only extras, and they are yours to choose.",
  },
  {
    title: "Free cancellation",
    detail:
      "Cancel up to 48 hours before the day starts and you are refunded in full, back to the card you paid with.",
  },
];

/**
 * The cancellation policy, as supplied by the business.
 *
 * ⚠️ IT CONTRADICTS `policy.cancellationHours` (48), WHICH IS STILL USED
 * ELSEWHERE. The tiers below are 3 days for leisure and 7 days for business,
 * neither of which is 48 hours. Until that is reconciled, /book, /manage and
 * the FAQ keep quoting a window this page does not grant. Pick one source —
 * ideally these tiers — and make the checkout copy and the Stripe refund rules
 * agree with it, because the number a customer was shown at the moment they
 * paid is the one that binds.
 *
 * Deposits are named here but nothing in the codebase takes one: lib/stripe.ts
 * charges the full amount up front. Either build the deposit flow or drop the
 * deposit language before this goes live.
 */
export const cancellationPolicy = {
  intro:
    "We understand that travel plans — especially business trips — can change. Our cancellation policy is designed to be fair to both our clients and our guides, with different terms for leisure tours and business services given their different planning requirements.",
  sections: [
    {
      title: "Private City Tours",
      lead: "",
      terms: [
        "3+ days before the tour: free cancellation, full refund",
        "Within 3 days of the tour: 50% charge",
        "Same-day cancellation or no-show: no refund",
      ],
    },
    {
      title: "Business Interpretation & Trade Show Support",
      lead: "Because exhibition-season dates require advance planning and often can’t be rebooked on short notice:",
      terms: [
        "7+ days before the service date: free cancellation, full refund (minus deposit processing, if applicable)",
        "Within 7 days of the service date: 50% charge",
        "Within 48 hours or no-show: full charge",
        "A deposit is required to confirm bookings during major trade fair periods (e.g. CHTF, CIOE, NEPCON Asia, Canton Fair season)",
      ],
    },
    {
      title: "Sourcing & Factory Visit Trips",
      lead: "These involve advance coordination with factories and suppliers, so:",
      terms: [
        "A deposit is required at the time of booking to confirm the trip",
        "7+ days before the trip: remaining balance refundable if cancelled",
        "Within 7 days: deposit is non-refundable; additional charges may apply if factory visits were already confirmed on your behalf",
        "Within 48 hours or no-show: full charge",
      ],
    },
  ],
  notes: [
    {
      title: "Rescheduling",
      body: "Need to change your dates rather than cancel? Just let us know as early as possible — we’ll do our best to accommodate a new date at no extra charge, subject to availability.",
    },
    {
      title: "Force majeure / unforeseeable events",
      body: "If your trip is affected by circumstances outside your control — such as visa denial, government travel restrictions, flight cancellations due to extreme weather, natural disasters, or other unforeseeable events — we will offer a full refund or the option to reschedule at no penalty. Documentation may be requested.",
    },
  ],
  closing:
    "This policy is designed to protect the time and planning commitments made on both sides — while keeping things as flexible as possible for genuine changes in your plans.",
} as const;

export const tours: Tour[] = [
  {
    slug: "private",
    tab: "Private Trip",
    name: "Private Trip",
    promise: "Shenzhen at your pace, with the friction taken out.",
    description:
      "A day built around what you actually want to see. The skyline from 116 floors up, the old market streets, the art districts in the converted factories, or the coast an hour east \u2014 decided with you the evening before, and rearranged on the day if the weather turns.",
    removes: [
      "Maps that will not resolve a Chinese address",
      "Tickets that needed booking days ago",
      "Menus with no English and no pictures",
      "Guessing which of ten identical entrances is the right one",
    ],
    includes: [
      "A private guide for the whole day, English and Mandarin",
      "A car and driver, with all fuel, tolls and parking",
    ],
    excludes: [
      "Entry tickets and meals, which you pay for on the day",
      "Hotel and flights",
    ],
    sampleDay: [
      {
        time: "09:00",
        place: "Your hotel",
        detail: "Met in the lobby. The plan for the day, and what to carry.",
      },
      {
        time: "09:40",
        place: "Lianhuashan Park",
        detail: "The CBD panorama, before the haze sets in. Free, and quiet early.",
      },
      {
        time: "11:30",
        place: "Dongmen",
        detail: "The old market on foot. Every price handled for you.",
      },
      {
        time: "13:00",
        place: "Shekou",
        detail: "Lunch booked, ordered, dietary notes already passed on.",
      },
      {
        time: "15:00",
        place: "OCT-LOFT",
        detail: "Galleries in the old factory blocks. Slow hour, deliberately.",
      },
      {
        time: "17:30",
        place: "Ping An Finance Centre",
        detail: "Free Sky deck tickets already in hand. No queue, and the light is right.",
      },
    ],
  },
  {
    slug: "business",
    tab: "Business Trip",
    name: "Business Trip",
    promise: "Hear the real price, and be understood in the room.",
    description:
      "Sourcing and meetings in one day. Huaqiangbei and the wholesale markets that never appear in English, supplier visits, factory floors, and appointments that need consecutive interpreting. Your terminology is prepared from documents you send ahead, and everything quoted or agreed is written down while it is still checkable.",
    removes: [
      "Prices that move depending on who is asking",
      "Sellers who are traders presenting as manufacturers",
      "Meetings where the nuance quietly goes missing",
      "Arriving at a factory with no idea whether it is the factory",
    ],
    includes: [
      "A private guide for the whole day, English and Mandarin",
      "A car and driver, with all fuel, tolls and parking",
    ],
    excludes: [
      "The goods, samples and shipping costs themselves",
      "Certified or sworn translation, and any legal, tax or investment advice",
      "Any commission from suppliers \u2014 none is taken, and none is accepted",
    ],
    sampleDay: [
      {
        time: "08:30",
        place: "Your hotel",
        detail: "Your list, your target price, your quantities. Terminology confirmed.",
      },
      {
        time: "09:45",
        place: "Huaqiangbei",
        detail: "The component floors first, while the sellers are fresh.",
      },
      {
        time: "12:30",
        place: "Lunch",
        detail: "Somewhere you can talk. A first pass over the quotes.",
      },
      {
        time: "14:00",
        place: "Factory visit",
        detail: "The floor, not the showroom. Questions prepared in advance.",
      },
      {
        time: "16:30",
        place: "Samples and debrief",
        detail: "Paid for, labelled, and the shipping arranged.",
      },
      {
        time: "18:00",
        place: "Your hotel",
        detail: "The written record sent before the day is over.",
      },
    ],
  },
];

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

/**
 * "Why book with us" — what you get, as distinct from `assurances`, which is
 * how the transaction behaves (card payment, fixed price, cancellation).
 *
 * `icon` keys a line drawing in components/why-book.tsx. Add an entry here and
 * you must add a matching motif there, or it falls back to a neutral mark.
 *
 * NOTE ON "multi-day": the booking flow currently sells a half day and a full
 * day only — see `durations` above. A multi-day trip cannot be booked on this
 * site today, so that claim is qualified as "by arrangement" rather than
 * promising something the calendar will refuse.
 */
/**
 * WHAT IS ON IN SHENZHEN — the source for /calendar.
 *
 * TWO KINDS OF ENTRY LIVE HERE, and the difference is load-bearing:
 *
 *   confirmed: true   The 2026 dates supplied by the business. `start`/`end`
 *                     are ISO days, `dates` is what the page prints.
 *   confirmed: false  A long-running fair whose 2026 dates nobody has checked.
 *                     `start`/`end` are empty and the page prints `window`
 *                     ("Typically late March") plus a line telling the visitor
 *                     to confirm with the organiser.
 *
 * A wrong date on a trade-show page is not a typo — it is somebody booking a
 * flight for the wrong week. Never promote an entry to `confirmed: true`
 * without a date from the organiser's own site; a listing site is where stale
 * dates come from.
 *
 * `start`/`end` exist so the page can tell a fair that has already happened
 * from one still to come. Keep them in step with `dates` and with `month`,
 * which drives the ordering.
 *
 * `url` is still empty on every entry. Fill it with the organiser's own page
 * as those are collected — the name becomes a link automatically.
 *
 * Canton Fair is in Guangzhou rather than Shenzhen; it earns its place because
 * sourcing visitors routinely do both in one trip, and the entry says where it
 * is.
 */
export const shenzhenEvents = [
  {
    month: 3,
    start: "",
    end: "",
    name: "SIMM — Shenzhen International Machinery Manufacturing",
    sector: "Machinery / Automation",
    venue: "Shenzhen World Exhibition & Convention Centre, Bao'an",
    window: "Typically late March",
    dates: "",
    confirmed: false,
    url: "",
    detail: "Machine tools, automation and industrial components.",
  },
  {
    month: 4,
    start: "2026-04-17",
    end: "2026-04-19",
    name: "Global Medical & Healthcare Exhibition",
    sector: "Healthcare / MedTech",
    venue: "Shenzhen Convention & Exhibition Centre, Futian",
    window: "Mid-April",
    dates: "17–19 April 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 4,
    start: "",
    end: "",
    name: "Canton Fair, spring phases",
    sector: "General sourcing",
    venue: "Canton Fair Complex, Guangzhou — about an hour from Shenzhen",
    window: "Typically mid-April to early May",
    dates: "",
    confirmed: false,
    url: "",
    detail:
      "Three phases, each a few days. Sourcing visitors often pair it with a Shenzhen factory week.",
  },
  {
    month: 5,
    start: "2026-05-14",
    end: "2026-05-16",
    name: "Global AI Terminal Expo / Shenzhen International AI Exhibition",
    sector: "AI / Robotics / Smart devices",
    venue: "Futian",
    window: "Mid-May",
    dates: "14–16 May 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 5,
    start: "2026-05-14",
    end: "2026-05-16",
    name: "CCEE Cross-Border E-commerce Expo",
    sector: "E-commerce / Consumer",
    venue: "Futian",
    window: "Mid-May",
    dates: "14–16 May 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 5,
    start: "2026-05-14",
    end: "2026-05-16",
    name: "Wine to Asia",
    sector: "Food & drink / Consumer",
    venue: "Futian",
    window: "Mid-May",
    dates: "14–16 May 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 5,
    start: "2026-05-21",
    end: "2026-05-23",
    name: "Shenzhen International UAV Expo / Low-Altitude Economy Expo",
    sector: "Drones / Aerospace",
    venue: "Futian",
    window: "Late May",
    dates: "21–23 May 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 5,
    start: "2026-05-27",
    end: "2026-05-29",
    name: "Shenzhen International Finance Expo",
    sector: "Finance / Investment",
    venue: "Futian",
    window: "Late May",
    dates: "27–29 May 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 6,
    start: "2026-06-09",
    end: "2026-06-11",
    name: "Greater Bay Area Textile & Apparel Expo",
    sector: "Textile / Fashion",
    venue: "Futian",
    window: "Early June",
    dates: "9–11 June 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 6,
    start: "2026-06-16",
    end: "2026-06-18",
    name: "Shenzhen Import & Export Fair",
    sector: "International trade",
    venue: "Futian",
    window: "Mid-June",
    dates: "16–18 June 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 6,
    start: "2026-06-16",
    end: "2026-06-18",
    name: "Global Cross-Border E-commerce Festival",
    sector: "E-commerce / Trade",
    venue: "Futian",
    window: "Mid-June",
    dates: "16–18 June 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 6,
    start: "2026-06-24",
    end: "2026-06-26",
    name: "Global IoT Conference & Consumer Electronics Expo",
    sector: "IoT / Electronics",
    venue: "Futian",
    window: "Late June",
    dates: "24–26 June 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 6,
    start: "2026-06-24",
    end: "2026-06-26",
    name: "Shenzhen Smart Home & Smart Security Expo",
    sector: "Smart home / Security",
    venue: "Futian",
    window: "Late June",
    dates: "24–26 June 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 6,
    start: "2026-06-24",
    end: "2026-06-26",
    name: "Asian Smart Sensor Expo",
    sector: "Sensors / Electronics",
    venue: "Futian",
    window: "Late June",
    dates: "24–26 June 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 6,
    start: "2026-06-26",
    end: "2026-06-28",
    name: "Shenzhen Watch Week & Wearable Innovation Expo",
    sector: "Wearables / Consumer",
    venue: "Futian",
    window: "Late June",
    dates: "26–28 June 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 8,
    start: "2026-08-04",
    end: "2026-08-05",
    name: "Global AI Going-Global Expo",
    sector: "AI / International expansion",
    venue: "Futian",
    window: "Early August",
    dates: "4–5 August 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 9,
    start: "2026-09-03",
    end: "2026-09-06",
    name: "Shenzhen Consumer Electronics & Home Appliances Expo",
    sector: "Consumer electronics",
    venue: "Futian",
    window: "Early September",
    dates: "3–6 September 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 9,
    start: "2026-09-03",
    end: "2026-09-06",
    name: "CHWE Global Cross-Border E-commerce Expo",
    sector: "E-commerce / Consumer",
    venue: "Futian",
    window: "Early September",
    dates: "3–6 September 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 9,
    start: "2026-09-09",
    end: "2026-09-12",
    name: "Shenzhen International Jewelry Fair",
    sector: "Jewellery / Luxury",
    venue: "Futian",
    window: "Mid-September",
    dates: "9–12 September 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 9,
    start: "2026-09-16",
    end: "2026-09-18",
    name: "CPHI & PMEC Shenzhen",
    sector: "Pharma / Manufacturing",
    venue: "Futian",
    window: "Mid-September",
    dates: "16–18 September 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 9,
    start: "",
    end: "",
    name: "CIOE — China International Optoelectronic Exposition",
    sector: "Optoelectronics",
    venue: "Shenzhen World Exhibition & Convention Centre, Bao'an",
    window: "Typically early September",
    dates: "",
    confirmed: false,
    url: "",
    detail: "Optics, lasers, infrared and optical communications.",
  },
  {
    month: 10,
    start: "2026-10-14",
    end: "2026-10-16",
    name: "SEMIBAY Greater Bay Area Semiconductor Expo",
    sector: "Semiconductors / Electronics",
    venue: "Futian",
    window: "Mid-October",
    dates: "14–16 October 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 10,
    start: "",
    end: "",
    name: "NEPCON Asia",
    sector: "Electronics manufacturing",
    venue: "Shenzhen World Exhibition & Convention Centre, Bao'an",
    window: "Typically late October",
    dates: "",
    confirmed: false,
    url: "",
    detail: "Electronics manufacturing, SMT and assembly equipment.",
  },
  {
    month: 11,
    start: "2026-11-26",
    end: "2026-11-28",
    name: "28th China Hi-Tech Fair (CHTF)",
    sector: "AI / Tech / Advanced manufacturing",
    venue: "Shenzhen World Exhibition & Convention Centre, Bao'an",
    window: "Late November",
    dates: "26–28 November 2026",
    confirmed: true,
    url: "",
    detail: "The city's largest general technology fair.",
  },
  {
    month: 11,
    start: "2026-11-26",
    end: "2026-11-28",
    name: "Asia AI & Robotics Industry Chain Exhibition",
    sector: "AI / Robotics",
    venue: "Shenzhen World Exhibition & Convention Centre, Bao'an",
    window: "Late November",
    dates: "26–28 November 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 11,
    start: "2026-11-26",
    end: "2026-11-28",
    name: "Asia Semiconductor & Integrated Circuits Exhibition",
    sector: "Semiconductors",
    venue: "Shenzhen World Exhibition & Convention Centre, Bao'an",
    window: "Late November",
    dates: "26–28 November 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 11,
    start: "2026-11-26",
    end: "2026-11-28",
    name: "Asia Energy Storage & Battery Exhibition",
    sector: "Energy / Batteries",
    venue: "Shenzhen World Exhibition & Convention Centre, Bao'an",
    window: "Late November",
    dates: "26–28 November 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 11,
    start: "2026-11-26",
    end: "2026-11-28",
    name: "3E Asia Consumer Electronics Expo",
    sector: "Consumer electronics",
    venue: "Shenzhen World Exhibition & Convention Centre, Bao'an",
    window: "Late November",
    dates: "26–28 November 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 11,
    start: "2026-11-26",
    end: "2026-11-28",
    name: "Low-Altitude Economy & General Aviation Exhibition",
    sector: "Aerospace / Drones",
    venue: "Shenzhen World Exhibition & Convention Centre, Bao'an",
    window: "Late November",
    dates: "26–28 November 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 12,
    start: "2026-12-02",
    end: "2026-12-04",
    name: "China (Shenzhen) International Logistics & Supply Chain Fair",
    sector: "Logistics / Supply chain",
    venue: "Futian",
    window: "Early December",
    dates: "2–4 December 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 12,
    start: "2026-12-10",
    end: "2026-12-14",
    name: "Shenzhen International Tea Industry Expo",
    sector: "Food & drink / Consumer",
    venue: "Futian",
    window: "Mid-December",
    dates: "10–14 December 2026",
    confirmed: true,
    url: "",
    detail: "",
  },
  {
    month: 12,
    start: "",
    end: "",
    name: "ELEXCON",
    sector: "Embedded / Semiconductors",
    venue: "Shenzhen Convention & Exhibition Centre, Futian",
    window: "Typically December",
    dates: "",
    confirmed: false,
    url: "",
    detail: "Embedded systems, semiconductors and electronic components.",
  },
] as const;

/**
 * "Latest in the city" — short notes on what has changed for a visitor.
 *
 * ⚠️ EVERY ENTRY BELOW IS A PLACEHOLDER AND SAYS SO ON THE PAGE. Nothing here
 * may be invented: a line like "Metro Line 16 opened in March" is a claim about
 * the world that a visitor will plan around, and this codebase has no way to
 * check it. Replace each `detail` with something the business has seen for
 * itself — a venue that has opened, a line that now runs, a queue that has
 * moved — and delete any entry that has gone stale.
 *
 * The section hides itself entirely when this array is empty, exactly as the
 * testimonials section does. An empty list is honest; a stale one is not.
 */
export const shenzhenDevelopments = [
  {
    title: "PLACEHOLDER — a transport change",
    detail:
      "A new metro line, airport link or border-crossing change that alters how a visitor gets around. Replace with something the guides have actually used.",
  },
  {
    title: "PLACEHOLDER — somewhere new to go",
    detail:
      "A venue, district or observation deck that has opened since the last time a regular visitor came. Replace or delete.",
  },
  {
    title: "PLACEHOLDER — something practical",
    detail:
      "A payment, visa or ticketing change that affects visitors. Replace or delete.",
  },
] as const;

/**
 * The inquiry form's options — /inquiry, components/inquiry/inquiry-form.tsx.
 *
 * THE FORM SELLS NOTHING AND CHARGES NOTHING. It collects what somebody wants
 * so a person can write back with a plan and a price. That is why there is no
 * pricing here and no availability check: a quote is a human answer to a
 * question, and pretending to compute one from five dropdowns would either be
 * wrong or would have to be hedged into uselessness.
 *
 * EVERY LIST IS A PROMPT, NOT A CONSTRAINT. The free-text box at the end of
 * each step exists because the interesting requests are the ones nobody
 * anticipated — "we need a halal restaurant near the convention centre", "my
 * mother uses a wheelchair". Checkboxes alone would silently discard those.
 */
export const inquiryTripTypes = [
  {
    value: "leisure",
    label: "Leisure",
    detail: "Seeing the city — skyline, markets, food, art districts, coast.",
  },
  {
    value: "business",
    label: "Business",
    detail: "Exhibitions, factory visits, sourcing, meetings, interpretation.",
  },
  {
    value: "both",
    label: "Both",
    detail: "Work for part of the trip, and the city for the rest.",
  },
] as const;

export const inquiryInterests = {
  leisure: [
    "Skyline and observation decks",
    "Electronics markets",
    "Local food and street food",
    "Art districts and galleries",
    "Parks, coast and nature",
    "Shopping and tailoring",
    "Nightlife",
    "Day trip outside Shenzhen",
  ],
  business: [
    "Trade show or exhibition",
    "Factory visits",
    "Supplier sourcing and vetting",
    "Meeting interpretation",
    "Contract or negotiation support",
    "Samples, payment and shipping",
  ],
} as const;

/** How hard a day should be pushed. Affects the route far more than the price. */
export const inquiryPaces = [
  { value: "relaxed", label: "Relaxed", detail: "Two or three places, unhurried." },
  { value: "balanced", label: "Balanced", detail: "A full day, with breaks." },
  { value: "packed", label: "Packed", detail: "As much as daylight allows." },
] as const;

/**
 * The scrolling bar under the hero. Short claims, no sentences.
 *
 * EVERY ONE OF THESE MUST BE TRUE AND CHECKABLE, like `assurances`. A moving
 * strip of adjectives is the cheapest thing on a page to write and the easiest
 * to disbelieve; these are things the business either does or does not do.
 *
 * Keep them SHORT. The strip scrolls, so anything long enough to need reading
 * twice has left the screen before it is finished.
 */
export const marqueeClaims = [
  "Top local guides",
  "Private vehicle & driver",
  "Trade show & exhibition support",
  "Factory visits & sourcing",
  "Technical interpretation",
  "In-house support",
  "Flexible cancellation",
  "Tailored private tours",
] as const;

/**
 * The five services, as the home page lists them.
 *
 * COPY SUPPLIED BY THE BUSINESS AND USED VERBATIM — including its American
 * spellings ("customized", "neighborhoods"), which the rest of this file does
 * not follow. Left alone deliberately: this is the owner's wording for what
 * they sell, and silently anglicising it is an edit nobody asked for. Settle
 * the house style once and apply it to the whole file, not to this array.
 *
 * `href` is where "Learn more" goes. Each one lands on the matching item of
 * /business-trip, which carries ids for exactly this purpose — a card that
 * dropped a visitor at the top of a page and left them to find the paragraph
 * again is the reason "Learn more" links get a bad name.
 */
export const services = [
  {
    title: "Private City Tours",
    href: "/tours/private",
    detail:
      "Customized sightseeing built around your interests — Futian’s skyline, OCT-LOFT’s art scene, Huaqiangbei’s electronics markets, local food spots, and neighborhoods most tourists never see. Half-day, full-day, or multi-day options with private vehicle and driver.",
  },
  {
    title: "Business Trip & Exhibition Support",
    href: "/business-trip#exhibitions",
    detail:
      "On-the-ground support for exhibitions like CHTF, CIOE, and NEPCON Asia — booth negotiations, real-time interpretation, and help navigating Shenzhen World Exhibition & Convention Center so you don’t miss a connection or a detail.",
  },
  {
    title: "Sourcing & Factory Visits",
    href: "/business-trip#sourcing",
    detail:
      "Guidance vetting suppliers, visiting factories, and negotiating terms — with someone who understands both the language and how business actually gets done here.",
  },
  {
    title: "Business Meeting Interpretation",
    href: "/business-trip#interpretation",
    detail:
      "Professional interpretation for negotiations, contract discussions, and client meetings — including technical and industry-specific vocabulary.",
  },
  {
    title: "Logistics & Local Navigation",
    href: "/business-trip#logistics",
    detail:
      "Transportation, scheduling, and day-to-day logistics — so you can focus on why you’re actually here.",
  },
  {
    title: "On-Call Support During Your Trip",
    href: "/business-trip#on-call",
    detail:
      "Reachable throughout your stay for questions, last-minute changes, or issues that come up between scheduled meetings and visits.",
  },
] as const;

/**
 * UNUSED SINCE THE "BUILT AROUND YOU" SECTION WAS REMOVED. Kept because this
 * repository has no version control, so deleting it is the only irreversible
 * kind of edit available here, and the copy still says something true about
 * the product. Delete it outright if the section is not coming back.
 *
 * WHAT THE CUSTOMER ACTUALLY CHOOSES. The centre of the offer.
 *
 * This is the one thing a marketplace listing cannot sell: not a fixed tour
 * with a fixed route, but a day assembled around one party. Everything else on
 * the site — the attractions, the two trip types, the guides — is a component
 * of a day. This array is the argument that the day is yours.
 *
 * EACH ENTRY IS A DECISION SOMEONE MAKES, NOT A FEATURE WE HAVE. "Where it
 * goes" beats "flexible itineraries" because the first tells a visitor what
 * they will be asked, and the second is an adjective. Keep the pairing:
 * `choice` is the decision, `detail` is what happens once they make it.
 *
 * Nothing here may promise something the business cannot do on any given day.
 * Rearranging a route mid-day is free because pricing is per day, per guest —
 * see lib/pricing.ts. If that ever changes, the last entry has to change too.
 */
export const customisation = [
  {
    choice: "What the day is for",
    detail:
      "Seeing the city, sourcing from its markets, a factory visit, a meeting — or two of those in one day. Say which, and everything else is planned around it.",
  },
  {
    choice: "Where it goes",
    detail:
      "Name the places you came for. Your guide fills the gaps and puts them in the order that misses the queues, rather than the order they appear on a map.",
  },
  {
    choice: "When it starts",
    detail:
      "Early for the markets, late for the skyline at dusk. Picked up from your hotel, the airport, or the Hong Kong border crossing.",
  },
  {
    choice: "How fast it moves",
    detail:
      "Three places or one. A whole day inside a single electronics market is a normal request, and so is covering half the city.",
  },
  {
    choice: "What you eat",
    detail:
      "Street food, Cantonese, Sichuan, halal or vegetarian. Tell us before the day and the stops are chosen around it.",
  },
  {
    choice: "What changes on the day",
    detail:
      "Rain, a closed venue, or simply changing your mind — the route is rebuilt while you are in the car. It costs nothing, because the price is the day, not the itinerary.",
  },
] as const;

export const whyBookWithUs = [
  {
    icon: "route",
    title: "Fully Private, Fully Custom",
    detail:
      "No group tours or fixed routes; every itinerary is built around your interests and schedule.",
  },
  {
    icon: "guide",
    title: "Local Expert Guides",
    detail:
      "Insider access to Shenzhen's neighborhoods, food, and hidden spots you won't find in a guidebook.",
  },
  {
    icon: "swap",
    title: "One Guide for Business & Leisure",
    detail:
      "The same trusted partner handles your factory visit on Monday and your city tour on Saturday.",
  },
  {
    icon: "car",
    title: "Door-to-Door Comfort",
    detail:
      "Private vehicle and driver included, no waiting or navigating public transport.",
  },
  {
    icon: "briefcase",
    title: "Business-Ready Support",
    detail:
      "Trade show interpretation, factory sourcing, and meeting translation for professionals on the go.",
  },
  {
    icon: "clock",
    title: "Flexible Scheduling",
    detail:
      "Half-day, full-day, or multi-day tours for solo travelers, couples, families, or small groups.",
  },
] as const;

/**
 * The two-column comparison. Rows are the questions someone actually weighs
 * when deciding which day to book, and every row is answered for BOTH trips —
 * this compares two things we sell, so there is no losing column to
 * strawman. That is the difference between a comparison and an advert.
 */
export interface ComparisonRow {
  label: string;
  private: string;
  business: string;
}

export const tripComparison: ComparisonRow[] = [
  {
    label: "Best for",
    private: "Seeing the city — skyline, markets, art districts, coast",
    business: "Sourcing, supplier visits, factory floors and meetings",
  },
  {
    label: "Your guide",
    private: "English-speaking guide who knows the city",
    business: "Guide and consecutive interpreter, Mandarin or Cantonese",
  },
  {
    label: "Prepared beforehand",
    private: "A route built around what you want to see",
    business: "Your terminology, from documents you send ahead",
  },
  {
    label: "You go home with",
    private: "The day itself, and photographs of it",
    business: "A written record of every quote, MOQ and what was agreed",
  },
  {
    label: "Tickets and entry",
    private: "Booked ahead where a queue would cost you an hour",
    business: "Not usually needed",
  },
  {
    label: "Samples and shipping",
    private: "Not part of this day",
    business: "Payment and onward shipping arranged for you",
  },
  {
    label: "Car and driver",
    private: "Included, with fuel, tolls and parking",
    business: "Included, with fuel, tolls and parking",
  },
  {
    label: "Length",
    private: "Half day or full day",
    business: "Half day or full day",
  },
];

export const howItWorks = [
  {
    step: "Pick a day",
    detail:
      "Choose what the day is for, how long you want, and a date. You will see real availability in your own timezone and in Shenzhen's.",
  },
  {
    step: "Tell us the details",
    detail:
      "Party size, pickup point, and what you are hoping to get out of the day. Two minutes, and nothing is charged yet.",
  },
  {
    step: "Pay, and the day is yours",
    detail:
      "The full price, by card, on a page hosted by Stripe. The date is held the moment payment clears, and you get a confirmation with a number to call.",
  },
  {
    step: "Someone meets you",
    detail:
      "Your guide arrives with your name, your plan and your phone number. From there it is their problem, not yours.",
  },
];

/**
 * FAQs, grouped for the tabbed panel on /faq.
 *
 * NOTHING NEW WAS INVENTED HERE. These are the same eight questions the flat
 * list carried, sorted into the three things a visitor is actually deciding
 * between: what it costs, what the day contains, and how they physically get
 * here. Padding a thin category with made-up questions would be inventing
 * business claims, which is the one thing this file exists to prevent.
 */
export interface FaqCategory {
  slug: string;
  label: string;
  items: { q: string; a: string }[];
}

export const faqCategories: FaqCategory[] = [
  {
    slug: "paying",
    label: "Booking & paying",
    items: [
      {
        q: "I don't have WeChat Pay or Alipay. Is that a problem?",
        a: "No. You pay here by card, in full, before the day. Entry tickets and meals on the day are covered by your guide and settled with you afterwards, so you never need a Chinese payment app at all. Not being on those rails is the single most common friction for visitors, and it is the first thing we take off your plate.",
      },
      {
        q: "Why do I pay the whole amount up front?",
        a: "Because it means there is nothing to settle on the day, no cash to find, and no card that might be declined abroad. Cancel more than 48 hours before and you are refunded in full to the same card.",
      },
      {
        q: "Can I cancel?",
        a: "PLACEHOLDER — insert your real cancellation window and refund terms. This must match what Stripe collects and what the confirmation email states, word for word.",
      },
    ],
  },
  {
    slug: "the-day",
    label: "Your day",
    items: [
      {
        q: "What is not included in the price?",
        a: "Entry tickets, meals, and anything you buy. Those stay yours to choose, and your guide will not steer you toward anywhere that pays a commission — none is taken. Transport, fuel, tolls and parking are all included.",
      },
      {
        q: "Which languages do you speak?",
        a: "PLACEHOLDER — list the languages you actually cover, and be specific about the fluency level for each. Do not claim a language you would not want to be tested on in a meeting.",
      },
    ],
  },
  {
    slug: "getting-here",
    label: "Getting here",
    items: [
      {
        q: "Can you meet me at Hong Kong airport rather than Bao'an?",
        a: "Yes. Pickup from HKIA and from the Futian and Luohu crossings is available. Tell us your arrival point when you book — the border route changes the timing of the day, not the price.",
      },
      {
        q: "What if my flight is delayed?",
        a: "Tell us the flight number when you book and we track it. If a delay makes the day unusable we move it to another date or refund you in full.",
      },
      {
        q: "Do I need a visa to visit Shenzhen?",
        a: "PLACEHOLDER — entry rules change and getting this wrong would be harmful. Link to the official consular guidance rather than summarising it, and say plainly that visitors must confirm their own eligibility.",
      },
    ],
  },
];


export const policy = {
  /** Free-cancellation window, hours before the start. */
  cancellationHours: 48, // PLACEHOLDER

  /** How far ahead a day must be booked. A guide needs the notice. */
  leadTimeHours: 24, // PLACEHOLDER

  /** How far into the future the calendar will go. */
  horizonDays: 365,

  /**
   * Currency the tour is CHARGED in. Not cosmetic — get this wrong and
   * checkout fails outright.
   *
   * Defaulted to USD because: (a) Stripe accounts registered outside mainland
   * China generally cannot charge in CNY, and (b) the audience is overseas
   * visitors paying with foreign cards, who would be charged a conversion fee
   * on a CNY transaction anyway.
   *
   * Switch to "cny" only after confirming your Stripe account supports it.
   */
  currency: "usd" as "usd" | "cny",
};

/** Empty until real ones exist. The home page hides the section when empty. */
export const testimonials: { quote: string; name: string; origin: string }[] =
  [];
