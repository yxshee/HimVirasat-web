import type { Metadata } from "next";
import Link from "next/link";

import { PahariBand } from "@/components/decor/pahari-band";
import { SectionHeading } from "@/components/decor/section-heading";
import { dialectsConfig } from "@/lib/dialects/dialect-config";

export const metadata: Metadata = {
  title: "Himachali Vocabulary",
  description: "Search living dictionaries of Himachali dialects.",
};

export default function VocabularyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
      <SectionHeading
        as="h1"
        eyebrow="Vocabulary"
        nativeEcho="शब्दकोश"
        title="Living dictionaries"
        description="Explore Himachali dialects, their vocabulary, expressions, and cultural meanings preserved from the hills."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[2fr_1fr]">
        {dialectsConfig.map((dialect) => (
          <Link
            key={dialect.id}
            href={`/vocabulary/${dialect.id}`}
            className="block rounded-2xl"
          >
            <article className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
              <PahariBand className="absolute inset-x-0 top-0 text-saffron/60" />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h2 className="font-display text-2xl tracking-tight">
                  {dialect.title}
                </h2>
                {dialect.nativeName && (
                  <span
                    aria-hidden
                    className="font-deva text-lg text-saffron-deep"
                  >
                    {dialect.nativeName}
                  </span>
                )}
              </div>
              <p className="mt-2 text-muted-foreground">{dialect.subtitle}</p>
              <span className="link-ink mt-8 inline-block text-sm font-medium text-saffron-deep">
                Search {dialect.title} <span aria-hidden>→</span>
              </span>
            </article>
          </Link>
        ))}

        <div className="rounded-2xl border border-dashed border-border p-8">
          <h2 className="font-display text-2xl tracking-tight">
            Your dialect next
          </h2>
          <p className="mt-2 text-muted-foreground">
            Contribute sentences to bring your dialect online.
          </p>
          <Link
            href="/contribute"
            className="link-ink mt-8 inline-block text-sm font-medium text-saffron-deep"
          >
            Contribute <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
