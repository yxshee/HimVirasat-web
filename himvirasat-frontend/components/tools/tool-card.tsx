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
      className="group block rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <article className="h-full rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lift">
        {(glyphA || glyphB) && (
          <div className="mb-6 flex items-center gap-4">
            <span aria-hidden className="font-deva text-5xl">
              {glyphA}
            </span>
            <span aria-hidden className="text-saffron">
              ⇄
            </span>
            <span aria-hidden className="font-takri text-5xl">
              {glyphB}
            </span>
          </div>
        )}
        <h2 className="font-display text-xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <span className="link-ink mt-4 inline-block text-sm font-medium text-saffron-deep">
          Open &rarr;
        </span>
      </article>
    </Link>
  );
}
