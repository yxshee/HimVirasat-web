import type { Metadata } from "next";

import { SectionHeading } from "@/components/decor/section-heading";
import { ToolCard } from "@/components/tools/tool-card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Language Tools",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        as="h1"
        eyebrow="Tools"
        nativeEcho="उपकरण"
        title="Language tools"
        description="Utility tools to assist contributors in working with scripts, datasets, and language preservation tasks."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <ToolCard
          href="/tools/transliterator"
          title="Transliterator"
          description="Convert between Devanagari and Takri — the script once used across Himachal."
          glyphA="अ"
          glyphB="𑚀"
        />

        {/* Propose a tool */}
        <div className="flex flex-col justify-center rounded-2xl border border-dashed border-border p-8">
          <h2 className="font-display text-xl">Propose a tool</h2>
          <p className="mt-2 text-muted-foreground">
            Open an issue on GitHub with your idea.
          </p>
          <a
            href={`${site.links.repo}/issues`}
            target="_blank"
            rel="noreferrer"
            className="link-ink mt-6 self-start text-sm font-medium text-saffron-deep"
          >
            Open an issue &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
