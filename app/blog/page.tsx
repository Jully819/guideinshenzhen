import type { Metadata } from "next";
import Link from "next/link";
import { formatPublished, getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog",
  description:
    "Notes from working in Shenzhen every day — fairs, factories, getting around, and what has changed since the last time you came.",
};

/**
 * /blog — the index.
 *
 * ⚠️ EVERY POST IS A PLACEHOLDER AND LABELS ITSELF ON THE PAGE. See the header
 * of lib/posts.ts. The banner below is not decoration: an article page carries
 * more authority than a marketing page, and a visitor who finds three
 * confident-looking posts about visas and metro lines will plan around them.
 *
 * The empty state is real and worth keeping. Deleting the placeholders leaves
 * a page that says nothing is published yet, which is honest and reads fine —
 * unlike a heading floating over a blank column.
 */
export default function BlogPage() {
  const posts = getPosts();
  const anyPlaceholders = posts.some((post) =>
    post.title.startsWith("PLACEHOLDER"),
  );

  return (
    <div className="mx-auto max-w-[52rem] px-5 py-16 sm:px-8 sm:py-24">
      <header>
        <p className="eyebrow text-slate">Blog</p>
        <h1 className="font-display mt-6 text-[2.4rem] text-balance sm:text-[3rem]">
          Notes from the city.
        </h1>
        <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/70">
          What we learn working here every day — fair weeks, factory floors,
          getting across the border, and the things that changed since the last
          time you came.
        </p>
      </header>

      {anyPlaceholders && (
        <p className="mt-8 border-l-2 border-moss bg-paper-card px-5 py-4 text-[0.88rem] leading-relaxed">
          PLACEHOLDER — nothing below is published writing. Every post is
          scaffolding for the layout and must be replaced with real articles
          before launch. See lib/posts.ts.
        </p>
      )}

      {posts.length === 0 ? (
        <p className="mt-14 border-t border-ink/15 pt-10 text-[0.95rem] text-ink/65">
          Nothing published yet. The first posts will be the questions we get
          asked most on the way in from the airport.
        </p>
      ) : (
        <ol className="mt-14 border-t border-ink/15">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-ink/15 py-7">
              {/* The date sits above the title, not below it: on an index the
                  first thing a reader checks is whether this is current. */}
              <p className="tabular text-[0.78rem] text-ink/65">
                <time dateTime={post.published}>
                  {formatPublished(post.published)}
                </time>
              </p>

              <h2 className="font-display mt-2 text-[1.35rem] leading-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink/70">
                {post.excerpt}
              </p>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-16 border-t border-ink/12 pt-10">
        <h2 className="font-display text-[1.9rem] text-balance">
          Got a question we have not answered?
        </h2>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
          Ask it directly — the answer is usually faster than an article, and it
          often becomes one.
        </p>
        <Link href="/inquiry" className="btn btn-primary mt-8">
          Ask a question
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
