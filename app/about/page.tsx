import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "Who runs this, what we are licensed to do, and how to reach a person.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[46rem] px-5 py-16 sm:px-8 sm:py-24">
      <p className="eyebrow text-slate">About</p>
      <h1 className="font-display mt-6 text-[2.4rem] sm:text-[3rem]">
        One guide, on purpose.
      </h1>

      <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-ink/78">
        <p>
          PLACEHOLDER — this page needs your real story, and it is the page
          that decides whether a stranger sends you the full price of a day
          before meeting you. Write it yourself rather than letting it be
          generated: who you are, how long you have worked in Shenzhen, why you
          started, and what you refuse to do.
        </p>
        <p>
          The specifics that matter most to an overseas visitor are: which
          languages you genuinely work in and to what level, whether the driver
          is you or someone you employ, whether you carry liability insurance,
          and who answers the phone at nine on a Sunday evening when a flight
          has gone wrong.
        </p>
      </div>

      <div className="mt-12 border-l-2 border-moss bg-paper-card px-5 py-4">
        <p className="eyebrow text-slate">Not yet filled in</p>
        <ul className="mt-3 space-y-1.5 text-[0.9rem] text-ink/75">
          {[
            "Registered business name and licence number",
            "Guide certifications, with issuing body",
            "Insurance cover and limits",
            "A physical address, or an honest statement that there isn't one",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-12 border-t border-ink/15 pt-8">
        <p className="eyebrow text-slate">Reach a person</p>
        <dl className="mt-4 space-y-2 text-[0.95rem]">
          <div className="flex gap-3">
            <dt className="w-24 text-ink/65">WeChat</dt>
            <dd className="tabular">{business.wechatId}</dd>
          </div>
        </dl>
      </div>

      <Link href="/book" className="btn btn-primary mt-10">
        Book a day
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
