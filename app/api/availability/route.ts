import { NextResponse } from "next/server";
import { getSlots, calConfigured, CalError } from "@/lib/cal";
import { mockSlots } from "@/lib/mock-availability";
import { SHENZHEN_TZ } from "@/lib/tz";
import { getDuration } from "@/lib/content";

export const dynamic = "force-dynamic";

/**
 * GET /api/availability?hours=4&start=<iso>&end=<iso>
 *
 * Returns bookable start times as ISO strings. Always fetched in Shenzhen time
 * — the client converts for display, so the two views can never drift.
 *
 * With no Cal.com credentials configured, and only outside production, this
 * answers with synthesised sample availability so the booking flow can be
 * reviewed before an account exists. The `mock` flag is part of the contract:
 * the calendar renders a visible notice when it is true.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const hours = Number(searchParams.get("hours"));

  const duration = getDuration(hours);
  if (!duration) {
    return NextResponse.json(
      { error: "hours must be one of the durations offered" },
      { status: 400 },
    );
  }
  if (!start || !end || Number.isNaN(Date.parse(start)) || Number.isNaN(Date.parse(end))) {
    return NextResponse.json(
      { error: "start and end must be ISO dates" },
      { status: 400 },
    );
  }
  if (Date.parse(end) <= Date.parse(start)) {
    return NextResponse.json({ error: "end must be after start" }, { status: 400 });
  }

  if (!calConfigured()) {
    if (process.env.NODE_ENV === "production") {
      // Never serve invented availability to a real customer.
      console.error("[availability] Cal.com is not configured");
      return NextResponse.json(
        { error: "Availability is unavailable right now" },
        { status: 503 },
      );
    }
    return NextResponse.json({
      slots: mockSlots({ start, end, duration: duration.minutes }),
      mock: true,
    });
  }

  try {
    const slots = await getSlots({
      start,
      end,
      duration: duration.minutes,
      timeZone: SHENZHEN_TZ,
    });
    return NextResponse.json({ slots, mock: false });
  } catch (error) {
    const status = error instanceof CalError ? 502 : 500;
    console.error("[availability]", error);
    return NextResponse.json(
      { error: "Availability is unavailable right now" },
      { status },
    );
  }
}
