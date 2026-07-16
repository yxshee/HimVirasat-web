import Link from "next/link";

/** Editorial card linking to a language tool, with an optional Takri glyph tile. */
export function ToolCard({
  href,
  title,
  description,
  glyph,
}: {
  href: string;
  title: string;
  description: string;
  glyph?: string;
}) {
  return (
    <Link
      href={href}
      className="block h-full rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <article className="hover-brut relative h-full rounded-lg border border-border bg-card p-8">
        {glyph && (
          <span
            aria-hidden
            className="mb-6 grid size-16 place-items-center border border-border bg-marigold font-takri text-4xl text-black"
          >
            {glyph}
          </span>
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
