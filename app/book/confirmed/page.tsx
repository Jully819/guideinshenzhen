import type { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { calConfigured, findBookingByStripeSession } from "@/lib/cal";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  // Neutral: this route renders both the confirmed and the not-confirmed
  // state, and the title is static. "Booking confirmed" would contradict the
  // page whenever payment could not be verified.
  title: "Booking status",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * The guest lands here after Stripe. This page only *reports* — the webhook is
 * what actually creates the booking. A guest who closes the tab still gets
 * their booking; someone who forges a session_id gets nothing.
 */
export default async function ConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let paid = false;
  let email: string | null = null;
  let reference: string | null = null;

  if (sessionId) {
    try {
      const session = await stripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      email = session.customer_email ?? session.customer_details?.email ?? null;
    } catch {
      paid = false;
    }
  }

  /**
   * The booking reference, if the webhook has already run.
   *
   * RACE, AND IT IS EXPECTED. The webhook creates the Cal.com booking, and the
   * guest's browser often gets back here first — so a missing reference is
   * normal, not an error. The copy below therefore points at the confirmation
   * email whenever it is absent, rather than showing a blank field or, worse,
   * implying something failed.
   *
   * This is the only place the guest is given the reference by us. /manage asks
   * for it, so leaving it solely in Cal.com's email would mean a customer who
   * lost that email could never use the lookup at all.
   */
  if (paid && sessionId && calConfigured()) {
    const booking = await findBookingByStripeSession(sessionId);
    reference = booking?.uid ?? null;
  }

  return (
    <div className="mx-auto max-w-[42rem] px-5 py-20 sm:px-8 sm:py-28">
      {paid ? (
        <>
          <p className="eyebrow text-slate">Paid</p>
          <h1 className="font-display mt-6 text-[2.4rem] sm:text-[3rem]">
            That&rsquo;s your day booked.
          </h1>
          <p className="mt-5 text-[1rem] leading-relaxed text-ink/75">
            A confirmation is on its way{email ? ` to ${email}` : ""}. We&rsquo;ll
            be in touch within one working day to settle the details — pickup
            point, timings, and anything you want built into the day.
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/70">
            Nothing further is owed. Entry tickets and meals on the day are the
            only things you pay for, and they are yours to choose.
          </p>

          {reference ? (
            <div className="mt-8 rounded-2xl border border-ink/15 bg-paper-card p-5 sm:p-6">
              <p className="eyebrow text-slate">Your booking reference</p>
              <p className="tabular mt-2 text-[1.3rem] break-all">{reference}</p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/70">
                Keep this. With the email address you booked with, it lets you
                check your booking any time on{" "}
                <Link
                  href="/manage"
                  className="text-moss underline underline-offset-2"
                >
                  Manage booking
                </Link>
                .
              </p>
            </div>
          ) : (
            <p className="mt-8 text-[0.9rem] leading-relaxed text-ink/60">
              Your booking reference is in the confirmation email. With the
              email address you booked with, it lets you check your booking any
              time on{" "}
              <Link
                href="/manage"
                className="text-moss underline underline-offset-2"
              >
                Manage booking
              </Link>
              .
            </p>
          )}
        </>
      ) : (
        <>
          <p className="eyebrow text-alert">Not confirmed</p>
          <h1 className="font-display mt-6 text-[2.4rem] sm:text-[3rem]">
            We couldn&rsquo;t confirm that payment.
          </h1>
          <p className="mt-5 text-[1rem] leading-relaxed text-ink/75">
            If you were charged, you will be refunded automatically. Message
            us on WeChat at{" "}
            <span className="tabular text-ink">{business.wechatId}</span> and
            we&rsquo;ll sort it out directly.
          </p>
        </>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-secondary">
          Back to the site
        </Link>
        {!paid && (
          <Link href="/book" className="btn btn-primary">
            Try again
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
