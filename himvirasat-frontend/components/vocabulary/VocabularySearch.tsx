"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, useDeferredValue } from "react";
import { Search, X } from "lucide-react";
import searchVocabulary from "@/lib/vocabulary/search-vocabulary";
import { VocabularyEntry } from "@/types/vocabulary/vocabulary-types";
import { datasetFilesMap } from "@/lib/dialects/dialect-config";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const VocabularyCard = dynamic(
  () => import("@/components/vocabulary/VocabularyCard"),
  {
    loading: () => <Skeleton className="h-28 w-full rounded-md" />,
    ssr: false,
  }
);

export default function VocabularySearch({ dialect }: { dialect: string }) {
  const [data, setData] = useState<VocabularyEntry[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const path = datasetFilesMap[dialect];
    if (!path) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(path)
      .then((r) => r.json())
      .then((json: VocabularyEntry[]) => {
        setData(Array.isArray(json) ? json : []);
      })
      .finally(() => setLoading(false));
  }, [dialect]);

  const results = useMemo(() => {
    return searchVocabulary(data, deferredQuery, { dialect });
  }, [data, deferredQuery, dialect]);

  return (
    <section className="w-full">
      <div className="relative max-w-2xl">
        <Search
          aria-hidden
          className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${dialect} vocabulary…`}
          className="h-14 rounded-md border-input bg-card pl-12 pr-14 text-base focus-visible:border-ring focus-visible:ring-ring/50"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            <X aria-hidden className="size-4" />
          </Button>
        )}
      </div>

      <p className="mt-3 text-sm text-muted-foreground tabular-nums">
        {loading
          ? `Loading ${dialect} heritage...`
          : `${results.length} of ${data.length} entries`}
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {results.length > 0 ? (
          results.map((entry, idx) => (
            <VocabularyCard
              key={`${entry.word_native}-${idx}`}
              entry={entry}
              query={deferredQuery}
              onSearch={setQuery}
            />
          ))
        ) : !loading ? (
          <div className="rounded-lg border-2 border-dashed border-border px-6 py-16 text-center">
            <p>No matches — try a shorter fragment.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Search is fuzzy: partial words and approximate spellings still
              match.
            </p>
          </div>
        ) : (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-md bg-muted" />
          ))
        )}
      </div>
    </section>
  );
}
