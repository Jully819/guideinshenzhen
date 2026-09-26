import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/booking-flow";
import {
  MAX_DAYS,
  MAX_GUESTS,
  durations,
  getDuration,
  getTour,
  type TourSlug,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a day",
  description:
    "Choose what the day is for, pick a date with real availability in your own timezone, and pay by card.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const one = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  // Everything arriving from the hero bar is untrusted query string, so each
  // value is validated against the content model rather than cast.
  const tour = getTour(one(params.tour) ?? "");
  const duration = getDuration(Number(one(params.hours)));

  const requestedGuests = Number(one(params.guests));
  const guests =
    Number.isInteger(requestedGuests) &&
    requestedGuests >= 1 &&
    requestedGuests <= MAX_GUESTS
      ? requestedGuests
      : 2;

  const requestedDays = Number(one(params.days));
  const days =
    Number.isInteger(requestedDays) &&
    requestedDays >= 1 &&
    requestedDays <= MAX_DAYS
      ? requestedDays
      : 1;

  return (
    <BookingFlow
      initialTour={(tour?.slug ?? "private") as TourSlug}
      initialHours={duration?.hours ?? durations[0].hours}
      initialGuests={guests}
      initialDays={days}
      skipFirstStep={Boolean(tour)}
      cancelled={one(params.cancelled) === "1"}
    />
  );
}
