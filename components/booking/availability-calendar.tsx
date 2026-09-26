"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SHENZHEN_TZ,
  formatDual,
  isoDay,
  monthRangeUtc,
} from "@/lib/tz";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  /** Length of the day being booked. A full day has far fewer valid starts. */
  hours: number;
  guestTimeZone?: string;
  selected: string | null;
  onSelect: (startIso: string) => void;
}

export function AvailabilityCalendar({
  hours,
  guestTimeZone,
  selected,
  onSelect,
}: Props) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }));
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string | null>(null);
  /** True when the server answered with synthesised sample availability. */
  const [mock, setMock] = useState(false);

  // Roving tabindex: exactly one cell is tabbable, arrows move between them.
  const [focusDay, setFocusDay] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const { start, end } = monthRangeUtc(cursor.year, cursor.month);
    const params = new URLSearchParams({ hours: String(hours), start, end });

    fetch(`/api/availability?${params}`)
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body?.error ?? "Failed");
        return body as { slots: string[]; mock?: boolean };
      })
      .then((body) => {
        if (cancelled) return;
        setSlots(body.slots);
        setMock(Boolean(body.mock));
      })
      .catch(() => {
        if (!cancelled) {
          setError("Couldn't load availability. Try again, or call us.");
          setSlots([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // Duration is a dependency: changing between a half and a full day changes
    // which start times are still valid, so the month must be refetched.
  }, [hours, cursor.year, cursor.month]);

  /** Slots grouped by Shenzhen-local day — the day the guest turns up. */
  const byDay = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const iso of slots) {
      const key = isoDay(new Date(iso), SHENZHEN_TZ);
      const list = map.get(key);
      if (list) list.push(iso);
      else map.set(key, [iso]);
    }
    return map;
  }, [slots]);

  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
  // Monday-first offset.
  const firstWeekday = (new Date(cursor.year, cursor.month, 1).getDay() + 6) % 7;
  const todayKey = isoDay(today, SHENZHEN_TZ);

  const keyFor = useCallback(
    (day: number) =>
      `${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    [cursor.year, cursor.month],
  );

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-day="${focusDay}"]`)
      ?.focus();
  }, [focusDay]);

  function moveFocus(delta: number) {
    const next = focusDay + delta;
    if (next < 1) {
      shiftMonth(-1);
      return;
    }
    if (next > daysInMonth) {
      shiftMonth(1);
      return;
    }
    shouldFocus.current = true;
    setFocusDay(next);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (e.key in moves) {
      e.preventDefault();
      moveFocus(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      // Explicit activation: role="gridcell" overrides the button's implicit
      // role, so don't rely on the native Enter-to-click behaviour.
      const key = keyFor(focusDay);
      const hasSlots = (byDay.get(key)?.length ?? 0) > 0;
      if (hasSlots && key >= todayKey) {
        e.preventDefault();
        setActiveDay(key);
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      shouldFocus.current = true;
      setFocusDay(1);
    } else if (e.key === "End") {
      e.preventDefault();
      shouldFocus.current = true;
      setFocusDay(daysInMonth);
    }
  }

  function shiftMonth(delta: number) {
    setActiveDay(null);
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
    setFocusDay(1);
  }

  const monthLabel = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(cursor.year, cursor.month, 1));

  const canGoBack =
    cursor.year > today.getFullYear() ||
    (cursor.year === today.getFullYear() && cursor.month > today.getMonth());

  const dayTimes = activeDay ? (byDay.get(activeDay) ?? []) : [];

  return (
    /* Capped: in the 46rem flow column an uncapped 7-column grid gives 95px
       cells, which pushes the time slots off the fold for no benefit. */
    <div className="max-w-[27rem]">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[1.3rem]">{monthLabel}</h3>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={!canGoBack}
            className="rounded-full border border-ink/20 px-3 py-1.5 text-[0.85rem] disabled:opacity-30"
          >
            <span aria-hidden="true">←</span>
            <span className="sr-only">Previous month</span>
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="rounded-full border border-ink/20 px-3 py-1.5 text-[0.85rem]"
          >
            <span aria-hidden="true">→</span>
            <span className="sr-only">Next month</span>
          </button>
        </div>
      </div>

      {mock && (
        <p className="mt-4 border-l-2 border-alert bg-paper-dim px-4 py-3 text-[0.85rem] leading-relaxed">
          <strong>Sample availability.</strong> Cal.com is not connected, so
          these times are generated for development and none of them is a real
          opening.
        </p>
      )}

      <p className="eyebrow mt-4 text-slate">Dates shown in Shenzhen time</p>

      <div className="mt-2 grid grid-cols-7 gap-px" aria-hidden="true">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2 text-center text-[0.7rem] text-ink/60">
            {d}
          </div>
        ))}
      </div>

      <div
        ref={gridRef}
        role="grid"
        aria-label="Available dates"
        onKeyDown={onKeyDown}
        className="grid grid-cols-7 gap-px bg-ink/10"
      >
        {Array.from({ length: firstWeekday }).map((_, i) => (
          <div key={`pad-${i}`} className="bg-paper" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const key = keyFor(day);
          const available = (byDay.get(key)?.length ?? 0) > 0;
          const past = key < todayKey;
          const isActive = key === activeDay;

          return (
            <button
              key={key}
              type="button"
              role="gridcell"
              data-day={day}
              tabIndex={day === focusDay ? 0 : -1}
              /* aria-disabled, NOT disabled: a disabled button leaves the
                 focus order, so arrow keys could not traverse past unavailable
                 days to reach available ones, and a month with no availability
                 stranded the roving tabindex on an unfocusable cell. */
              aria-disabled={!available || past}
              aria-selected={isActive}
              aria-label={`${day} ${monthLabel}${available ? `, ${byDay.get(key)!.length} times available` : ", no availability"}`}
              /* Keep the roving index in step with wherever focus actually
                 landed. Without this, focusing a cell by click or Tab left
                 focusDay stale and the next arrow key jumped to the wrong
                 day — e.g. focus on the 18th, ArrowRight went to the 2nd. */
              onFocus={() => setFocusDay(day)}
              onClick={() => {
                if (!available || past) return;
                setActiveDay(key);
              }}
              /* Background is set in exactly one branch. Putting bg-paper in
                 the base and bg-moss in the conditional makes the winner
                 depend on Tailwind's stylesheet order, not this string —
                 which silently dropped the selected-day highlight. */
              className={`relative aspect-square text-[0.9rem] transition-colors ${
                isActive
                  ? "bg-moss text-paper"
                  : available
                    ? "bg-paper hover:bg-paper-dim"
                    : "bg-paper text-ink/25 cursor-default"
              } ${past ? "line-through" : ""}`}
            >
              <span className="tabular">{day}</span>
              {available && !isActive && (
                <span
                  className="absolute inset-x-0 bottom-1.5 mx-auto block size-1 rotate-45 bg-moss"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}

        {/* Trailing pad. Without these the grid's own background shows through
            the unfilled remainder of the last row as a grey block. */}
        {Array.from({
          length: (7 - ((firstWeekday + daysInMonth) % 7)) % 7,
        }).map((_, i) => (
          <div key={`tail-${i}`} className="bg-paper" />
        ))}
      </div>

      {loading && (
        <p className="mt-4 text-[0.85rem] text-ink/65">Loading availability…</p>
      )}
      {error && <p className="mt-4 text-[0.85rem] text-alert">{error}</p>}
      {!loading && !error && byDay.size === 0 && (
        <p className="mt-4 text-[0.85rem] text-ink/65">
          Nothing free this month. Try the next one.
        </p>
      )}

      {activeDay && (
        <div className="mt-8 border-t border-ink/15 pt-6">
          <p className="eyebrow text-slate">Start time</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {dayTimes.map((iso) => {
              const isSelected = iso === selected;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => onSelect(iso)}
                  aria-pressed={isSelected}
                  className={`tabular rounded-full border px-4 py-2.5 text-[0.9rem] transition-colors ${
                    isSelected
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/20 hover:border-ink/45"
                  }`}
                >
                  {new Intl.DateTimeFormat("en-GB", {
                    timeZone: SHENZHEN_TZ,
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }).format(new Date(iso))}
                </button>
              );
            })}
          </div>

          {selected && (
            <p className="mt-4 text-[0.88rem] text-ink/70">
              {formatDual(new Date(selected), guestTimeZone)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
