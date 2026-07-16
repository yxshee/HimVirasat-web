import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/decor/marquee";
import { SectionHeading } from "@/components/decor/section-heading";
import { datasets } from "@/lib/datasets/dataset-utils";
import { devToTankri } from "@/lib/transliteration/devToTankri";

export const metadata: Metadata = {
  title: "Datasets",
  description: "Download open, versioned Himachali translation datasets.",
};

export default function DatasetsPage() {
  return (
    <div>
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-12 sm:pt-32">
        <SectionHeading
          as="h1"
          eyebrow="Datasets"
          nativeEcho={devToTankri("आंकड़े")}
          title="Open Himachali language datasets"
          description="Download curated linguistic datasets preserving Himachali dialects for research, NLP, and cultural documentation."
        />
      </section>

      {/* Ornament strip */}
      <Marquee
        className="border-y border-border py-2 text-sm text-foreground"
        speed={40}
        items={[
          <span key="native" aria-hidden className="font-takri">
            {devToTankri("आंकड़े")}
          </span>,
          "Open datasets",
          "Mandeali Vocabulary Dataset v1.0",
        ]}
        separator="◆"
      />

      <section className="mx-auto max-w-6xl px-6 pt-12 pb-24 sm:pb-32">
        <div className="grid gap-6 lg:grid-cols-2">
          {datasets.map((dataset) => (
            <div key={dataset.id} className="accent-marigold">
              <article className="h-full rounded-lg border border-border bg-card p-8 shadow-brut">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl">{dataset.name}</h2>
                  <span className="bg-section-accent rounded-full border border-border px-2.5 py-0.5 text-xs whitespace-nowrap text-black">
                    {dataset.version}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {dataset.language}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Open, structured vocabulary dataset suitable for
                  linguistic research, NLP training, and documentation.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild className="hover-brut">
                    <a
                      href={dataset.datasetLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download aria-hidden />
                      Download ZIP
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={dataset.kaggleLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Kaggle
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="link-ink">
                    <a
                      href={dataset.githubLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </Button>
                </div>
              </article>
            </div>
          ))}

          {/* More coming */}
          <div className="accent-teal">
            <div className="flex h-full flex-col justify-center rounded-lg border-2 border-dashed border-border p-8">
              <h2 className="font-display text-xl">
                More datasets in progress
              </h2>
              <p className="mt-2 text-muted-foreground">
                Contribute sentences in your dialect to help publish the next
                one.
              </p>
              <Link
                href="/contribute"
                className="link-ink text-section-accent-deep mt-6 self-start text-sm font-medium"
              >
                Contribute &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
