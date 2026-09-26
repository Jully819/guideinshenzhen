import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import { business } from "@/lib/content";
import {
  formatPublished,
  getPost,
  posts,
  type PostImage,
  type Post,
} from "@/lib/posts";

/**
 * /blog/[slug] — one article.
 *
 * Mirrors /tours/[slug]: `generateStaticParams` so every post is a static page,
 * `generateMetadata` so the title and description come from the post, and
 * `notFound()` for a slug that does not exist — an unknown slug must 404, not
 * render an empty article shell.
 *
 * WHAT THIS PAGE OWES A LONG-FORM POST, per the on-page rules in CLAUDE.md:
 * breadcrumbs with BreadcrumbList schema, an author byline with Person schema,
 * a table of contents anchored to the headings, an FAQ with FAQPage schema, and
 * Open Graph plus Twitter card meta. All of it is driven off the post data, so
 * a post that carries no `sections` or `faqs` simply renders without those
 * parts rather than emitting empty schema — an FAQPage block with no questions
 * in it is a structured-data error, not a neutral omission.
 *
 * ⚠️ THE PLACEHOLDER POSTS ARE STILL PLACEHOLDERS. See lib/posts.ts. The banner
 * keys off the title, so a post stops disclaiming itself the moment it stops
 * calling itself one.
 */


export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  /* Absolute, and the 1200x630 card rather than the article hero. Relative
     paths in og:image are ignored by most crawlers. */
  const card = post.socialImage ?? post.hero?.src;
  const images = card
    ? [{ url: `${SITE_URL}${card}`, width: 1200, height: 630, alt: post.title }]
    : undefined;

  return {
    /* `absolute` bypasses the layout's "%s — Guide in Shenzhen" template. The
       template pushed this title to 63 characters, and the target is 50 to 60.
       `metaTitle` is the tag; `title` stays the human headline for the H1. */
    title: post.metaTitle ? { absolute: post.metaTitle } : post.title,
    description: post.metaDescription ?? post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      /* Deliberately the fuller excerpt rather than the trimmed meta
         description. A social card has room the SERP does not. */
      description: post.excerpt,
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      authors: [post.author],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

/**
 * Renders `[label](href)` inside a paragraph and leaves everything else alone.
 *
 * Deliberately the smallest thing that works rather than a Markdown parser: the
 * only inline formatting these posts need is links, and pulling in a parser to
 * get them would also pull in its escaping rules, its sanitising question and
 * its bundle. Internal hrefs (starting "/") route through next/link; anything
 * else is treated as external and gets the rel that implies.
 */
function renderInline(text: string, keyPrefix: string) {
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));

    // **bold** rather than a link. Used sparingly, for the sentence a skimmer
    // must not miss, never for keywords.
    if (match[3]) {
      out.push(<strong key={`${keyPrefix}-b${i}`}>{match[3]}</strong>);
      last = match.index + match[0].length;
      i += 1;
      continue;
    }

    const [, label, href] = match;
    const className =
      "underline decoration-ink/30 underline-offset-4 hover:decoration-ink";

    out.push(
      href.startsWith("/") ? (
        <Link key={`${keyPrefix}-${i}`} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a
          key={`${keyPrefix}-${i}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {label}
        </a>
      ),
    );

    last = match.index + match[0].length;
    i += 1;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Photograph plus the credit that has to travel with it. */
function Figure({
  image,
  className = "mt-8",
}: {
  image: PostImage;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* Raw <img>, like the rest of this codebase's remote photography:
          next/image would need images.pexels.com added to next.config.ts, and
          that opens the optimiser to every Pexels URL in the project. width and
          height are the intrinsic size, so the box is reserved before the file
          lands and the text below it does not jump. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.sizes}
        alt={image.alt}
        width={image.width}
        height={image.height}
        /* The hero is what the visitor is already looking at, so it loads
           eagerly and at high priority. Everything below the fold is lazy. */
        loading={image.priority ? "eager" : "lazy"}
        fetchPriority={image.priority ? "high" : undefined}
        decoding={image.priority ? undefined : "async"}
        className="w-full rounded-lg"
      />
      <figcaption className="mt-2 text-[0.78rem] text-ink/65">
        Photo by{" "}
        <a
          href={image.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          {image.credit}
        </a>{" "}
        on{" "}
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Pexels
        </a>
      </figcaption>
    </figure>
  );
}

/**
 * BlogPosting + Person, BreadcrumbList, and FAQPage when there are questions.
 *
 * One <script> holding an array rather than three separate tags: it is the same
 * thing to a parser and one less place for a stray block to survive after the
 * data behind it is gone.
 */
function PostSchema({ post }: { post: Post }) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.published,
      dateModified: post.updated ?? post.published,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: {
        "@type": "Person",
        name: post.author,
        url: `${SITE_URL}/about`,
        ...(post.authorBio ? { description: post.authorBio } : {}),
      },
      publisher: { "@type": "Organization", name: business.name, url: SITE_URL },
      /* The social card, not the in-page hero. Absolute, because a crawler
         reading this JSON has no page to resolve a relative path against. */
      ...(post.socialImage
        ? { image: `${SITE_URL}${post.socialImage}` }
        : post.hero
          ? { image: `${SITE_URL}${post.hero.src}` }
          : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${SITE_URL}/blog`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (post.faqs?.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const isPlaceholder = post.title.startsWith("PLACEHOLDER");

  return (
    <article id="top" className="mx-auto max-w-[44rem] px-5 py-16 sm:px-8 sm:py-24">
      <PostSchema post={post} />

      {/* Breadcrumbs. The visible trail and the BreadcrumbList above say the
          same thing; a crawler that trusts one and not the other still gets a
          consistent answer. */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-[0.8rem] text-ink/65">
          <li>
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-ink">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink/75">
            {post.title}
          </li>
        </ol>
      </nav>

      <header className="mt-8">
        <h1 className="font-display text-[2.1rem] text-balance sm:text-[2.6rem]">
          {post.title}
        </h1>

        {/* Byline. The author links to /about, which is where the company
            credentials live. "Last updated" only appears when the post has
            actually been revised, because a refresh date on unchanged content
            is a claim about work nobody did. */}
        <p className="tabular mt-4 text-[0.78rem] text-ink/65">
          <span>
            By{" "}
            <Link
              href="/about"
              rel="author"
              className="underline underline-offset-4 hover:text-ink"
            >
              {post.author}
            </Link>
          </span>
          {" · "}
          <time dateTime={post.published}>
            {formatPublished(post.published)}
          </time>
          {post.updated && post.updated !== post.published && (
            <>
              {" · Updated "}
              <time dateTime={post.updated}>
                {formatPublished(post.updated)}
              </time>
            </>
          )}
          {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ""}
        </p>

        <p className="mt-5 text-[1rem] leading-relaxed text-ink/70">
          {post.excerpt}
        </p>
      </header>

      {isPlaceholder && (
        <p className="mt-8 border-l-2 border-moss bg-paper-card px-5 py-4 text-[0.88rem] leading-relaxed">
          PLACEHOLDER — this is not published writing. Nothing on this page has
          been checked and none of it should be planned around. See lib/posts.ts.
        </p>
      )}

      {post.hero && <Figure image={post.hero} />}

      {post.intro && (
        <div className="mt-10 space-y-5 text-[0.98rem] leading-relaxed text-ink/80">
          {post.intro.map((paragraph, i) => (
            <p key={i}>{renderInline(paragraph, `intro-${i}`)}</p>
          ))}
        </div>
      )}

      {/* Table of contents. Generated from the sections, so it cannot list a
          heading that is not there or miss one that is. */}
      {post.sections && post.sections.length > 1 && (
        /* aside, because a table of contents is related to the article without
           being part of its argument. The nav inside carries the label. */
        <aside
          aria-label="On this page"
          className="mt-10 border-l-2 border-moss bg-paper-card px-5 py-4"
        >
          <p className="eyebrow text-slate">On this page</p>
          <nav aria-label="Table of contents">
            <ol className="mt-3 space-y-1.5">
              {post.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-[0.88rem] underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      )}

      {post.sections?.map((section) => (
        <section key={section.id} id={section.id} className="mt-12 scroll-mt-24">
          {/* Image ABOVE the heading, not under it. It works as the divider
              between one item and the next, which a listicle needs more than it
              needs an illustration halfway down a paragraph. */}
          {section.image && <Figure image={section.image} className="mb-6 mt-0" />}

          <h2 className="font-display text-[1.55rem] leading-tight text-balance">
            {section.heading}
          </h2>

          <div className="mt-4 space-y-5 text-[0.98rem] leading-relaxed text-ink/80">
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{renderInline(paragraph, `${section.id}-${i}`)}</p>
            ))}
          </div>

          {section.list && (
            <div className="mt-5">
              {section.list.intro && (
                <p className="text-[0.98rem] leading-relaxed text-ink/80">
                  {renderInline(section.list.intro, `${section.id}-li`)}
                </p>
              )}
              {section.list.ordered ? (
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed text-ink/80 marker:text-ink/60">
                  {section.list.items.map((item, i) => (
                    <li key={i}>{renderInline(item, `${section.id}-o${i}`)}</li>
                  ))}
                </ol>
              ) : (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-ink/80 marker:text-ink/60">
                  {section.list.items.map((item, i) => (
                    <li key={i}>{renderInline(item, `${section.id}-u${i}`)}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {section.facts && (
            /* The "visitor info" block every competing page for this keyword
               carries. dl rather than a table: it is label-and-value pairs, not
               rows that relate to each other across columns. */
            <dl className="mt-6 border-l-2 border-moss bg-paper-card px-5 py-4 text-[0.88rem]">
              {section.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-0.5 py-1.5 sm:flex-row sm:gap-4"
                >
                  <dt className="eyebrow shrink-0 text-slate sm:w-[9rem]">
                    {fact.label}
                  </dt>
                  <dd className="leading-relaxed text-ink/75">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* Back to top, per section. An anchor rather than a floating button
              that follows the reader down the page: no client JavaScript, it
              works with the keyboard, and it cannot end up sitting on top of
              the text on a small screen. */}
          <p className="mt-6 text-right">
            <a
              href="#top"
              className="text-[0.78rem] text-ink/60 underline underline-offset-4 hover:text-ink"
            >
              Back to top
            </a>
          </p>
        </section>
      ))}

      {/* Posts with no section structure — the placeholders — render flat. */}
      {post.body && (
        <div className="mt-10 space-y-5 border-t border-ink/15 pt-8 text-[0.98rem] leading-relaxed text-ink/80">
          {post.body.map((paragraph, i) => (
            <p key={i}>{renderInline(paragraph, `body-${i}`)}</p>
          ))}
        </div>
      )}

      {post.faqs && post.faqs.length > 0 && (
        <section id="faq" className="mt-16 scroll-mt-24 border-t border-ink/15 pt-10">
          <h2 className="font-display text-[1.7rem] text-balance">
            Questions people ask
          </h2>

          <dl className="mt-8 space-y-7">
            {post.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-display text-[1.05rem] leading-tight">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-[0.94rem] leading-relaxed text-ink/75">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Author bio. E-E-A-T wants credentials attached to the byline, and the
          honest version of that here is what the guides do daily rather than a
          qualification nobody holds. */}
      {post.authorBio && (
        <aside className="mt-16 border-t border-ink/15 pt-8">
          <p className="eyebrow text-slate">About the author</p>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/75">
            {post.authorBio}
          </p>
          <Link
            href="/about"
            className="nav-link mt-4 inline-block text-[0.85rem]"
          >
            More about {business.name}
            <span aria-hidden="true"> →</span>
          </Link>
        </aside>
      )}

      <div className="mt-16 border-t border-ink/12 pt-10">
        <h2 className="font-display text-[1.7rem] text-balance">
          Planning a trip around this?
        </h2>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">
          Send your dates and we will tell you what the week actually looks
          like.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/book" className="btn btn-primary">
            Book a day
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/calendar" className="btn btn-secondary">
            See the fair calendar
          </Link>
        </div>
      </div>

      <Link href="/blog" className="nav-link mt-12 inline-block text-[0.85rem]">
        <span aria-hidden="true">← </span>
        All posts
      </Link>
    </article>
  );
}
