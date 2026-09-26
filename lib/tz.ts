/**
 * Dual-timezone formatting.
 *
 * The audience is overseas visitors: they browse from their home timezone but
 * the service happens in Asia/Shanghai (UTC+8, no DST). Showing only one of
 * those is how people miss their pickup. Every user-facing time goes through
 * this module — no ad-hoc Intl calls anywhere else.
 */

export const SHENZHEN_TZ = "Asia/Shanghai";

/** The visitor's own timezone. Client-only — see useGuestTimeZone. */
export function detectGuestTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || SHENZHEN_TZ;
  } catch {
    return SHENZHEN_TZ;
  }
}

function parts(date: Date, timeZone: string, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-GB", { timeZone, ...opts }).format(date);
}

/** "09:40" */
export function formatTime(date: Date, timeZone: string): string {
  return parts(date, timeZone, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/** "Tue 14 Apr" */
export function formatDate(date: Date, timeZone: string): string {
  return parts(date, timeZone, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** "Tue 14 April 2026" */
export function formatDateLong(date: Date, timeZone: string): string {
  return parts(date, timeZone, {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** "GMT+8" */
export function formatOffset(date: Date, timeZone: string): string {
  const s = parts(date, timeZone, { timeZoneName: "shortOffset" });
  const match = s.match(/GMT[+-]\d{1,2}(:\d{2})?/);
  return match ? match[0] : "GMT";
}

/**
 * The line that goes under every selected slot.
 *
 * Same zone:  "Tue 14 Apr · 09:40 (GMT+8)"
 * Different:  "Tue 14 Apr · 09:40 Shenzhen (GMT+8) — 01:40 Mon 13 your time"
 *
 * The guest's date is included when it differs, because a 09:40 pickup in
 * Shenzhen is the previous evening in most of the Americas and that is exactly
 * the mistake worth preventing.
 */
export function formatDual(date: Date, guestTimeZone?: string): string {
  const local = `${formatDate(date, SHENZHEN_TZ)} · ${formatTime(date, SHENZHEN_TZ)}`;

  if (!guestTimeZone || guestTimeZone === SHENZHEN_TZ) {
    return `${local} (${formatOffset(date, SHENZHEN_TZ)})`;
  }

  const guestTime = formatTime(date, guestTimeZone);
  const guestDate = formatDate(date, guestTimeZone);
  const sameDay = guestDate === formatDate(date, SHENZHEN_TZ);

  return sameDay
    ? `${local} Shenzhen (${formatOffset(date, SHENZHEN_TZ)}) — ${guestTime} your time`
    : `${local} Shenzhen (${formatOffset(date, SHENZHEN_TZ)}) — ${guestTime} ${guestDate} your time`;
}

/** Whole-hour difference, guest relative to Shenzhen. Negative = behind. */
export function hoursFromShenzhen(date: Date, guestTimeZone: string): number {
  const asUtc = (tz: string) =>
    new Date(date.toLocaleString("en-US", { timeZone: tz })).getTime();
  return Math.round((asUtc(guestTimeZone) - asUtc(SHENZHEN_TZ)) / 3_600_000);
}

/** YYYY-MM-DD in the given zone — the key the calendar groups slots by. */
export function isoDay(date: Date, timeZone: string): string {
  const d = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  return d;
}

/** Midnight-to-midnight UTC bounds covering a Shenzhen-local month. */
export function monthRangeUtc(year: number, monthIndex: number) {
  const start = new Date(Date.UTC(year, monthIndex, 1, -8, 0, 0));
  const end = new Date(Date.UTC(year, monthIndex + 1, 1, -8, 0, 0));
  return { start: start.toISOString(), end: end.toISOString() };
}
