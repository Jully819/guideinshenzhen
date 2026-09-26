import type { Metadata } from "next";
import Link from "next/link";
import { FaqTabs } from "@/components/faq-tabs";
import { faqCategories, policy } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ",
  description:
    "Paying without WeChat Pay, what the price includes, cross-border pickup, cancellation terms, and what happens if your flight is late.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[46rem] px-5 py-16 sm:px-8 sm:py-24">
      <p className="eyebrow text-slate">Before you book</p>
      <h1 className="font-display mt-6 text-[2.4rem] sm:text-[3rem]">
        Questions people actually ask.
      </h1>

      <div className="mt-12">
        <FaqTabs categories={faqCategories} />
      </div>

      {/* Moved here from the home page, where it sat as a full-bleed band.
          It belongs on the page a visitor reaches when they have a question,
          not on the one whose job is to get them to a date.

          The cancellation sentence that used to live in the second paragraph
          is deliberately NOT repeated here — the callout below is the
          authoritative statement of those terms, and two copies of a refund
          policy is exactly the kind of thing that drifts apart and then
          contradicts what Stripe told the customer. */}
      <section className="mt-16 border-t border-ink/12 pt-10">
        <p className="eyebrow text-slate">Paying</p>
        <h2 className="font-display mt-6 text-[1.9rem]">
          In full, up front, refundable.
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <p className="text-[0.92rem] leading-relaxed text-ink/75">
            You pay the whole amount by card when you book, so there is nothing
            to settle on the day and you never need a Chinese payment app. Entry
            tickets and meals stay yours to choose.
          </p>
          <p className="text-[0.92rem] leading-relaxed text-ink/75">
            Card details are entered on a page hosted by Stripe and never touch
            this site. Days must be booked at least {policy.leadTimeHours} hours
            ahead.
          </p>
        </div>
      </section>

      <div className="mt-8 border-l-2 border-moss bg-paper-card px-5 py-4">
        <p className="eyebrow text-slate">Cancellation</p>
        <p className="mt-2 text-[0.92rem] leading-relaxed">
          Free cancellation up to {policy.cancellationHours} hours before the
          day starts, refunded in full to the card you paid with. Inside that
          window the payment is retained. PLACEHOLDER — replace with your real
          terms before launch; this text must match the confirmation email and
          what Stripe shows at checkout, word for word.
        </p>
      </div>

      <Link href="/book" className="btn btn-primary mt-10">
        Book a day
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
