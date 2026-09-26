import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { business, policy } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/inquiry" },
  title: "Plan your trip",
  description:
    "Tell us what you want from your days in Shenzhen and we will send back a plan and a fixed price. No payment, and nothing is booked until you agree.",
};

/**
 * /inquiry — where "Book Now" goes.
 *
 * THIS IS NOT /book. That route is the transactional flow: pick a slot from
 * real Cal.com availability, pay Stripe, done. This one is the opposite end of
 * the same business — somebody who does not yet know what their trip is, and
 * cannot be sold a slot until a person has talked to them. Both exist on
 * purpose; do not merge them.
 *
 * The page frames the exchange before the form starts, because a visitor who
 * thinks they are about to be charged answers three questions and leaves.
 */
export default function InquiryPage() {
  return (
    <>
      <section className="on-ink bg-ink text-paper">
        <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8 sm:py-20">
          <p className="eyebrow text-citron">Plan your trip</p>
          <h1 className="font-display mt-6 max-w-[18ch] text-[2.1rem] text-balance sm:text-[3rem]">
            Tell us what the days are for
          </h1>
          <p className="mt-6 max-w-[38rem] text-[1rem] leading-relaxed text-paper/75">
            Five short steps. We read it, build a day around what you have
            asked for, and write back with the plan and a fixed price — usually
            the same day. Nothing is booked and nothing is charged here.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[76rem] px-5 pb-20 sm:px-8 sm:pb-28">
          {/* Suspense is required, not optional: InquiryForm reads
              useSearchParams() to pick up the hero bar's selections, and in
              the app router that opts the whole route into client-side
              rendering unless it sits behind a boundary. Without it the build
              fails outright. The fallback is the form's own first heading, so
              the page does not visibly jump when it hydrates. */}
          <Suspense
            fallback={
              <p className="mt-12 text-[0.9rem] text-ink/65">
                Loading the form…
              </p>
            }
          >
            <InquiryForm />
          </Suspense>

          <p className="mt-14 max-w-[38rem] border-t border-ink/12 pt-6 text-[0.85rem] leading-relaxed text-ink/65">
            We use what you send here to answer your inquiry and nothing else.
            Cancellation and payment terms — {policy.cancellationHours} hours
            for a free cancellation — apply once a day is confirmed and paid
            for, not to an inquiry. Questions before then:{" "}
            <a
              href={`mailto:${business.email}`}
              className="text-moss underline underline-offset-4"
            >
              {business.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
