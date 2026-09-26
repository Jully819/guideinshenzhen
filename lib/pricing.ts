/**
 * THE ONLY PLACE A PRICE IS CALCULATED.
 *
 * Payment is taken in full up front, so the number here is the number charged.
 * That makes one rule non-negotiable: the browser sends *what was chosen*
 * (tour, hours, guests) and never *what it costs*. `/api/checkout` recomputes
 * from scratch with this module and charges that. A client that posts a price
 * is a client that can post a price of zero.
 *
 * Every figure below is a PLACEHOLDER. See REPLACE_BEFORE_LAUNCH.
 */

import {
  MAX_DAYS,
  MAX_GUESTS,
  durations,
  policy,
  type Tour,
  type TourSlug,
} from "@/lib/content";

/** Guests covered by the base price. Above this, each one is charged. */
export const GUESTS_INCLUDED = 4;

/**
 * Amounts are in the SMALLEST unit of each currency — cents for USD, fen for
 * CNY — because that is what Stripe wants and rounding a major-unit float is
 * how you end up charging $219.99999.
 *
 * Keyed by tour, then by duration in hours.
 */
const BASE: Record<TourSlug, Record<number, { usd: number; cny: number }>> = {
  private: {
    4: { usd: 22_000, cny: 156_000 }, // PLACEHOLDER — $220 / ¥1,560
    8: { usd: 38_000, cny: 270_000 }, // PLACEHOLDER — $380 / ¥2,700
  },
  // Dearer than a private trip because it needs an interpreter rather than a
  // guide, plus preparation before the day and a written record after it.
  business: {
    4: { usd: 34_000, cny: 242_000 }, // PLACEHOLDER — $340 / ¥2,420
    8: { usd: 56_000, cny: 398_000 }, // PLACEHOLDER — $560 / ¥3,980
  },
};

/** Charged per guest beyond GUESTS_INCLUDED. Scales with the length of day. */
const EXTRA_GUEST: Record<number, { usd: number; cny: number }> = {
  4: { usd: 2_500, cny: 18_000 }, // PLACEHOLDER — $25 / ¥180
  8: { usd: 4_000, cny: 28_000 }, // PLACEHOLDER — $40 / ¥280
};

export interface QuoteLine {
  label: string;
  /** Optional second line, e.g. how the figure was arrived at. */
  detail?: string;
  amount: number;
}

export interface Quote {
  lines: QuoteLine[];
  total: number;
  currency: "usd" | "cny";
}

export class PricingError extends Error {}

/**
 * Validates and normalises a booking selection.
 *
 * Throws rather than clamping. Silently correcting a party of 40 down to 8
 * would charge for 8 and put 40 people in front of one guide, and the caller
 * needs to know the request was wrong — see /api/checkout, which turns this
 * into a 400.
 */
export function validateSelection(
  hours: number,
  guests: number,
  days: number = 1,
): void {
  if (!durations.some((d) => d.hours === hours)) {
    throw new PricingError(`We do not offer a ${hours}-hour day`);
  }
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    throw new PricingError(
      `Party size must be between 1 and ${MAX_GUESTS}. For larger groups, get in touch.`,
    );
  }
  if (!Number.isInteger(days) || days < 1 || days > MAX_DAYS) {
    throw new PricingError(
      `A booking can run from 1 to ${MAX_DAYS} consecutive days. For longer trips, get in touch.`,
    );
  }
}

/** The full, itemised price. Same function feeds the UI and the charge. */
export function quote(
  tour: Tour,
  hours: number,
  guests: number,
  days: number = 1,
): Quote {
  validateSelection(hours, guests, days);

  const currency = policy.currency;
  const duration = durations.find((d) => d.hours === hours)!;

  const base = BASE[tour.slug][hours][currency];
  const lines: QuoteLine[] = [
    {
      label: `${duration.label} — ${tour.name.toLowerCase()}`,
      detail:
        days > 1
          ? `${hours} hours a day, up to ${GUESTS_INCLUDED} guests`
          : `${hours} hours, up to ${GUESTS_INCLUDED} guests`,
      amount: base,
    },
  ];

  const extra = Math.max(0, guests - GUESTS_INCLUDED);
  if (extra > 0) {
    const each = EXTRA_GUEST[hours][currency];
    lines.push({
      label: `Additional guests`,
      detail: `${extra} × ${formatMoney(each, currency)} a day`,
      amount: each * extra,
    });
  }

  const perDay = lines.reduce((sum, l) => sum + l.amount, 0);

  // NO MULTI-DAY DISCOUNT. Days multiply the whole per-day figure, guests
  // included. That is a PLACEHOLDER pricing decision, not a considered one —
  // most operators tier this. Change it here and nowhere else.
  if (days > 1) {
    lines.push({
      label: `${days} consecutive days`,
      detail: `${days} × ${formatMoney(perDay, currency)}`,
      amount: perDay * (days - 1),
    });
  }

  return {
    lines,
    total: perDay * days,
    currency,
  };
}

/** "$220" — whole units, because no price here has fractional currency. */
export function formatMoney(amount: number, currency: "usd" | "cny"): string {
  const symbol = currency === "cny" ? "¥" : "$";
  return `${symbol}${Math.round(amount / 100).toLocaleString("en-GB")}`;
}

/** The cheapest way to buy this tour. What the cards and tabs advertise. */
export function fromPrice(tour: Tour): { amount: number; label: string } {
  const cheapest = Math.min(
    ...durations.map((d) => BASE[tour.slug][d.hours][policy.currency]),
  );
  return {
    amount: cheapest,
    label: formatMoney(cheapest, policy.currency),
  };
}

/** Total for a selection, formatted. Convenience for the bar and the widget. */
export function totalLabel(
  tour: Tour,
  hours: number,
  guests: number,
  days: number = 1,
): string {
  const q = quote(tour, hours, guests, days);
  return formatMoney(q.total, q.currency);
}
