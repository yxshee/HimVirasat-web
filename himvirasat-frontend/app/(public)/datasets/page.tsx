import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContourField } from "@/components/decor/contour-field";
import { SectionHeading } from "@/components/decor/section-heading";
import { datasets } from "@/lib/datasets/dataset-utils";

export const metadata: Metadata = {
  title: "Datasets",
  description: "Download open, versioned Himachali translation datasets.",
};

export default function DatasetsPage() {
  return (
    <div>
      {/* Header — cartography backdrop */}
      <section className="relative overflow-hidden">
        <ContourField className="text-primary" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-12 sm:pt-32">
          <SectionHeading
            as="h1"
            eyebrow="Datasets"
            nativeEcho="आंकड़े"
            title="Open Himachali language datasets"
            description="Download curated linguistic datasets preserving Himachali dialects for research, NLP, and cultural documentation."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-32">
        <div className="grid gap-6 lg:grid-cols-2">
          {datasets.map((dataset) => (
            <article
              key={dataset.id}
              className="rounded-2xl border border-border bg-card p-8 shadow-card"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl">{dataset.name}</h2>
                <span className="rounded-full border border-saffron/40 px-2.5 py-0.5 text-xs whitespace-nowrap text-saffron-deep">
                  {dataset.version}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {dataset.language}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Open-source structured vocabulary dataset suitable for
                linguistic research, NLP training, and documentation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
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
                  <a href={dataset.kaggleLink} target="_blank" rel="noreferrer">
                    Kaggle
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={dataset.githubLink} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </Button>
              </div>
            </article>
          ))}

          {/* More coming */}
          <div className="flex flex-col justify-center rounded-2xl border border-dashed border-border p-8">
            <h2 className="font-display text-xl">More datasets in progress</h2>
            <p className="mt-2 text-muted-foreground">
              Contribute sentences in your dialect to help publish the next
              one.
            </p>
            <Link
              href="/contribute"
              className="link-ink mt-6 self-start text-sm font-medium text-saffron-deep"
            >
              Contribute &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
