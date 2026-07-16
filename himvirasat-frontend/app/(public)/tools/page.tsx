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
        <div className="accent-pink">
          <ToolCard
            href="/tools/transliterator"
            title="Transliterator"
            description="Convert between Devanagari and Takri — the script once used across Himachal."
            glyphA="अ"
            glyphB="𑚀"
          />
        </div>

        {/* Propose a tool */}
        <div className="accent-teal">
          <div className="flex h-full flex-col justify-center rounded-lg border-2 border-dashed border-border p-8">
            <h2 className="font-display text-xl">Propose a tool</h2>
            <p className="mt-2 text-muted-foreground">
              Open an issue on GitHub with your idea.
            </p>
            <a
              href={`${site.links.repo}/issues`}
              target="_blank"
              rel="noreferrer"
              className="link-ink text-section-accent-deep mt-6 self-start text-sm font-medium"
            >
              Open an issue &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
