import type { Metadata } from "next";
import { ManageForm } from "@/app/manage/manage-form";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  title: "Manage your booking",
  description:
    "Look up a booking with your reference and the email you booked with.",
  // Never indexed. Nothing here is useful to a search engine and the page is
  // a lookup form for personal data.
  robots: { index: false, follow: false },
};

/**
 * "Manage booking" — a guest lookup, not an account.
 *
 * There is no user table, no password and no session anywhere in this app, and
 * that is deliberate: bookings live in Cal.com, one guide sells one product,
 * and storing customer credentials would be a real security obligation bought
 * for very little. A reference plus the booking email is the pattern every
 * airline uses for exactly this situation.
 *
 * Read-only. See app/manage/actions.ts for why, and for the rule about never
 * revealing whether a reference exists.
 */
export default function ManagePage() {
  return (
    <div className="mx-auto max-w-[76rem] px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-[42rem]">
        <p className="eyebrow text-slate">Your booking</p>

        <h1 className="font-display mt-6 text-[2.2rem] text-balance sm:text-[3rem]">
          Check a booking you have already made.
        </h1>

        <p className="mt-5 text-[1rem] leading-relaxed text-ink/75">
          Your reference is in the confirmation email, and on the page you saw
          straight after paying. Enter it with the email address you booked
          with and we will show you the day as it stands.
        </p>

        <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/60">
          Lost the reference? Message us on WeChat at{" "}
          <span className="tabular text-ink">{business.wechatId}</span> and we
          will find it for you.
        </p>
      </div>

      <ManageForm />
    </div>
  );
}
