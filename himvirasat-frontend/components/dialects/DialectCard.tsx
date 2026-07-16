import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PahariBand } from "@/components/decor/pahari-band";

type DialectCardProps = {
  name: string;
  formUrl: string;
};

/** Dialect → district, only where the mapping is unambiguous. */
const DISTRICT_MAP: Array<[pattern: string, district: string]> = [
  ["kangri", "Kangra"],
  ["mandeali", "Mandi"],
  ["mandyali", "Mandi"],
  ["kullvi", "Kullu"],
  ["kulluvi", "Kullu"],
  ["kinnauri", "Kinnaur"],
  ["sirmauri", "Sirmaur"],
  ["chambeali", "Chamba"],
  ["chameali", "Chamba"],
  ["mahasuvi", "Shimla hills"],
];

export default function DialectCard({ name, formUrl }: DialectCardProps) {
  const lowerName = name.toLowerCase();
  const district = DISTRICT_MAP.find(([pattern]) =>
    lowerName.includes(pattern),
  )?.[1];
  const hasVocabulary = lowerName.includes("mandeali");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-saffron/40 hover:shadow-lift">
      <PahariBand className="text-saffron/60" />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl">{name}</h3>
        {district && (
          <p className="mt-1 text-xs tracking-wider text-saffron-deep uppercase">
            {district}
          </p>
        )}

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Contribute everyday sentences and Hindi translations in the {name}{" "}
          dialect.
        </p>

        {hasVocabulary && (
          <p className="mt-3">
            <Link
              href="/vocabulary/mandeali"
              className="inline-block rounded-full border border-success/25 bg-success/10 px-2.5 py-0.5 text-xs text-success"
            >
              Vocabulary live →
            </Link>
          </p>
        )}

        <div className="mt-auto pt-6">
          <Button asChild className="w-full">
            <Link href={formUrl} target="_blank" rel="noopener noreferrer">
              Open the {name} form
              <ExternalLink aria-hidden className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
