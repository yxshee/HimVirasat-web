"use client";

import type { VocabularyEntry } from "@/types/vocabulary/vocabulary-types";
import { memo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy, Search, MapPin, User } from "lucide-react";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, query: string) {
  if (!query) return <>{text}</>;
  const q = query.trim();
  if (!q) return <>{text}</>;

  const regex = new RegExp(`(${escapeRegExp(q)})`, "ig");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="rounded-none bg-marigold px-0.5 text-black">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default memo(function VocabularyCard({
  entry,
  query,
  onSearch,
}: {
  entry: VocabularyEntry;
  query: string;
  onSearch: (word: string) => void;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(entry.word_native);
    toast("Copied");
  };

  return (
    <article className="min-w-0 rounded-md border border-border bg-card p-6 text-card-foreground">
      <h2 className="font-deva text-3xl leading-snug break-words" lang="hi">
        {highlightText(entry.word_native, query)}
      </h2>
      <p className="mt-1 text-xs font-semibold tracking-wider uppercase text-marigold-deep break-words">
        {highlightText(entry.word_meaning_en, query)}
      </p>

      <div className="mt-4 border-l-2 border-border pl-4">
        <p className="font-deva text-base break-words" lang="hi">
          {highlightText(entry.sentence_native, query)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground break-words">
          {highlightText(entry.sentence_meaning_en, query)}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {entry.region && (
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
            <MapPin aria-hidden className="size-3 shrink-0" />
            {entry.region}
          </span>
        )}
        {entry.contributor_username && (
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
            <User aria-hidden className="size-3 shrink-0" />
            {entry.contributor_username}
          </span>
        )}

        <div className="ml-auto flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Copy word"
            onClick={handleCopy}
          >
            <Copy aria-hidden className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search this word"
            onClick={() => onSearch(entry.word_native)}
          >
            <Search aria-hidden className="size-4" />
          </Button>
        </div>
      </div>
    </article>
  );
});
