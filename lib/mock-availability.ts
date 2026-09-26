import "server-only";
import { business, policy } from "@/lib/content";

/**
 * SAMPLE availability, for development only.
 *
 * Without a Cal.com key /api/availability can only 502, which makes the entire
 * booking flow — the one thing this site exists to do — impossible to review or
 * demonstrate. This synthesises plausible slots from the real business rules so
 * every step downstream can be walked and tested.
 *
 * Two safeguards, because "sample data quietly became production data" is a
 * genuinely expensive mistake:
 *   1. The route refuses to call this when NODE_ENV === "production".
 *   2. Responses carry `mock: true`, and the calendar renders a visible notice.
 *
 * Shenzhen runs UTC+8 all year with no DST, so local→UTC is plain arithmetic.
 * Do NOT copy this into a city that observes DST; you would need `zoneinfo`.
 */

const UTC_OFFSET_HOURS = 8;
const SLOT_STEP_MINUTES = 30;

function minutesFromHHMM(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** YYYY-MM-DD of a UTC instant, in Shenzhen local terms. */
function localDayKey(utcMs: number): string {
  return new Date(utcMs + UTC_OFFSET_HOURS * 3_600_000)
    .toISOString()
    .slice(0, 10);
}

/**
 * A stable per-day pseudo-random value in [0, 1). Deterministic on the date, so
 * the same day looks the same on every reload — a calendar whose greyed-out
 * dates shuffle on refresh looks broken rather than busy.
 */
function dayHash(dayKey: string): number {
  let h = 2166136261;
  for (let i = 0; i < dayKey.length; i++) {
    h ^= dayKey.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

/**
 * Bookable start times between two instants, as ISO strings.
 *
 * Mirrors the constraints the real calendar has, so the UI is exercised
 * properly rather than being handed a uniform grid:
 *   - opening hours, and a last start early enough to finish before close
 *   - the lead time, which eats today and part of tomorrow
 *   - the booking horizon
 *   - one closed day a week, plus a deterministic slice of busy days
 */
export function mockSlots(opts: {
  start: string;
  end: string;
  duration: number;
}): string[] {
  const from = Date.parse(opts.start);
  const to = Date.parse(opts.end);
  if (!Number.isFinite(from) || !Number.isFinite(to)) return [];

  const now = Date.now();
  const earliest = now + policy.leadTimeHours * 3_600_000;
  const latest = now + policy.horizonDays * 24 * 3_600_000;

  const open = minutesFromHHMM(business.hours.open);
  const close = minutesFromHHMM(business.hours.close);
  // A day must finish before closing, so a full day has far fewer valid starts
  // than a half day. This is the constraint most likely to be got wrong.
  const lastStart = close - opts.duration;
  if (lastStart < open) return [];

  const out: string[] = [];

  // Walk local days across the window, one day at a time.
  const firstDay = localDayKey(Math.max(from, earliest));
  const lastDay = localDayKey(Math.min(to, latest));

  const cursor = new Date(`${firstDay}T00:00:00Z`);
  const end = new Date(`${lastDay}T00:00:00Z`);

  while (cursor.getTime() <= end.getTime()) {
    const dayKey = cursor.toISOString().slice(0, 10);
    // Local midnight expressed as a UTC instant.
    const midnightUtc = Date.parse(`${dayKey}T00:00:00Z`) - UTC_OFFSET_HOURS * 3_600_000;

    const weekday = new Date(`${dayKey}T00:00:00Z`).getUTCDay();
    const hash = dayHash(dayKey);

    // Closed one day a week, and fully booked on roughly one day in six.
    const closed = weekday === 0 || hash < 0.17;

    if (!closed) {
      for (let m = open; m <= lastStart; m += SLOT_STEP_MINUTES) {
        const slot = midnightUtc + m * 60_000;
        if (slot < Math.max(from, earliest)) continue;
        if (slot > Math.min(to, latest)) continue;

        // Thin the grid so days look partly taken rather than wide open.
        const slotHash = dayHash(`${dayKey}:${m}`);
        if (slotHash < 0.45) continue;

        out.push(new Date(slot).toISOString());
      }
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return out.sort();
}
