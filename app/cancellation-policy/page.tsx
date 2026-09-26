import type { Metadata } from "next";
import Link from "next/link";
import { business, cancellationPolicy } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/cancellation-policy" },
  title: "Cancellation policy",
  description:
    "Cancellation, rescheduling and refund terms for private city tours, business interpretation, trade show support and sourcing trips in Shenzhen.",
};

/**
 * /cancellation-policy — the terms, in full, on their own page.
 *
 * A PAGE, NOT A MODAL OR AN ACCORDION. Someone reads this when they are
 * deciding whether to risk a deposit, or when something has already gone wrong.
 * Both of those people need to be able to link to it, search it, print it and
 * cite a line back at us — none of which a collapsed panel supports.
 *
 * The tiers are set as tables of plain rows rather than prose: "within 7 days:
 * 50% charge" is a number a customer will check under stress, and it should be
 * findable at a glance rather than buried mid-paragraph.
 */
export default function CancellationPolicyPage() {
  return (
    <>
      <section className="on-ink bg-ink text-paper">
        <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8 sm:py-20">
          <p className="eyebrow text-citron">Terms</p>
          <h1 className="font-display mt-6 max-w-[16ch] text-[2.1rem] text-balance sm:text-[3rem]">
            Cancellation policy
          </h1>
          <p className="mt-6 max-w-[42rem] text-[1rem] leading-relaxed text-paper/75">
            {cancellationPolicy.intro}
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
          <div className="max-w-[46rem] space-y-14">
            {cancellationPolicy.sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-[1.5rem] sm:text-[1.8rem]">
                  {section.title}
                </h2>
                {section.lead && (
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                    {section.lead}
                  </p>
                )}
                <ul className="mt-5 border-t border-ink/12">
                  {section.terms.map((term) => (
                    <li
                      key={term}
                      className="flex gap-4 border-b border-ink/12 py-3.5 text-[0.95rem] leading-relaxed"
                    >
                      <span
                        className="mt-[0.55rem] inline-block size-1.5 shrink-0 rotate-45 bg-moss"
                        aria-hidden="true"
                      />
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {cancellationPolicy.notes.map((note) => (
              <div key={note.title}>
                <h2 className="font-display text-[1.5rem] sm:text-[1.8rem]">
                  {note.title}
                </h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                  {note.body}
                </p>
              </div>
            ))}

            {/* "How to cancel" is built here rather than stored as copy: the
                supplied text carried a "[email / WhatsApp / WeChat]"
                placeholder, and real contact details belong in `business` where
                they are written once. */}
            <div>
              <h2 className="font-display text-[1.5rem] sm:text-[1.8rem]">
                How to cancel
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">
                Contact us as early as possible, with your booking reference and
                whether you would prefer a refund or a new date. We confirm every
                request in writing.
              </p>
              <ul className="mt-5 space-y-2 text-[0.95rem]">
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-moss underline underline-offset-4 hover:text-ink"
                  >
                    {business.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${business.whatsapp.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-moss underline underline-offset-4 hover:text-ink"
                  >
                    WhatsApp
                  </a>
                </li>
                <li className="text-ink/70">
                  WeChat:{" "}
                  <span className="tabular">{business.wechatId}</span>
                </li>
              </ul>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-ink/70">
                Already booked?{" "}
                <Link
                  href="/manage"
                  className="text-moss underline underline-offset-4 hover:text-ink"
                >
                  Look up your booking
                </Link>{" "}
                to find your reference.
              </p>
            </div>

            <p className="border-t border-ink/12 pt-6 text-[0.95rem] leading-relaxed text-ink/60">
              {cancellationPolicy.closing}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
