import Link from "next/link";

/** Editorial card linking to a language tool, with an optional script-pair visual. */
export function ToolCard({
  href,
  title,
  description,
  glyphA,
  glyphB,
}: {
  href: string;
  title: string;
  description: string;
  glyphA?: string;
  glyphB?: string;
}) {
  return (
    <Link
      href={href}
      className="block h-full rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <article className="hover-brut relative h-full rounded-lg border border-border bg-card p-8">
        {(glyphA || glyphB) && (
          <div className="mb-6 flex items-center gap-4">
            <span
              aria-hidden
              className="grid size-16 place-items-center border border-border bg-pink font-deva text-4xl text-black"
            >
              {glyphA}
            </span>
            <span aria-hidden>⇄</span>
            <span
              aria-hidden
              className="grid size-16 place-items-center border border-border bg-marigold font-takri text-4xl text-black"
            >
              {glyphB}
            </span>
          </div>
        )}
        <h2 className="font-display text-xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <span className="link-ink text-section-accent-deep mt-4 inline-block text-sm font-medium">
          Open &rarr;
        </span>
      </article>
    </Link>
  );
}
