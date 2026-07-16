import type { Metadata } from "next";

import Transliterator from "@/components/transliterator/Transliterator";
import { SectionHeading } from "@/components/decor/section-heading";

export const metadata: Metadata = {
  title: "Devanagari ⇄ Takri Transliterator",
};

export default function TransliteratorPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        as="h1"
        eyebrow="Tools"
        title="Devanagari ⇄ Takri"
        description="Takri served as a chancery script across the Western Himalayas before Devanagari replaced it."
      />

      <div className="mt-12">
        <Transliterator />
      </div>

      <p className="mt-6 max-w-xl text-sm text-muted-foreground">
        Takri text you copy will need a Takri-capable font in the destination
        app.
      </p>
    </div>
  );
}
