import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ContourField } from "@/components/decor/contour-field";
import { GlyphWatermark } from "@/components/decor/glyph-watermark";
import { PahariBand } from "@/components/decor/pahari-band";
import { Ridgeline } from "@/components/decor/ridgeline";
import { SectionHeading } from "@/components/decor/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

const FACTS = [
  { value: "6", label: "dialects collecting" },
  { value: "1", label: "open dataset published" },
  { value: "2", label: "scripts — Devanagari ⇄ Takri" },
  { value: "100%", label: "open source" },
];

const COMMUNITY_LINKS = [
  {
    label: "HimVirasat Discord",
    href: site.links.discordHimvirasat,
    icon: "/virasat.png",
    rounded: true,
  },
  {
    label: "HP Community Discord",
    href: site.links.discordHpCommunity,
    icon: "/hpdiscord.png",
    rounded: true,
  },
  {
    label: "GitHub",
    href: site.links.github,
    icon: "/hp-github.png",
    rounded: false,
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden py-28">
        <ContourField className="inset-0 text-primary" />
        <GlyphWatermark glyph="𑚩" script="takri" className="-top-16 -right-8" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <Reveal delay={0}>
            <p className="text-xs tracking-[0.25em] text-saffron-deep uppercase">
              <span aria-hidden className="font-deva tracking-normal normal-case">
                हिमाचल की विरासत
              </span>{" "}
              · Open Language Preservation
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              lang="hi"
              className="text-brand mt-6 font-deva text-7xl leading-tight md:text-9xl"
            >
              हिमविरासत
            </h1>
            <p className="mt-4 font-display text-2xl tracking-[0.15em] text-muted-foreground uppercase">
              HimVirasat
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              A community-driven initiative to preserve Himachal Pradesh’s
              languages, dialects, traditions, and cultural memory — and bring
              them into the digital age.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild>
                <Link href="/contribute">Start contributing</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/vocabulary">Explore the vocabulary</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Ridgeline className="absolute right-0 bottom-0 left-0 text-card" />
      </section>

      {/* ── Fact strip ───────────────────────────────────────────────── */}
      <section className="bg-card">
        <PahariBand />
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-10 px-6 py-14 sm:grid-cols-4">
          {FACTS.map((fact, i) => (
            <div
              key={fact.label}
              className={
                i > 0
                  ? "sm:border-l sm:border-border sm:pl-8"
                  : undefined
              }
            >
              <p className="font-display text-4xl text-saffron-deep md:text-5xl">
                {fact.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <SectionHeading
            eyebrow="The Mission"
            title="Open translation datasets for Himachali dialects"
            nativeEcho="ध्येय"
          />
          <div className="space-y-5 border-l-2 border-saffron pl-6">
            <p className="leading-7 text-foreground">
              We are building open, structured Hindi ↔ Himachali dialect
              translation datasets by collecting parallel sentences written by
              native speakers. Contributors simply write everyday sentences in
              their dialect along with Hindi translations. No technical
              knowledge required.
            </p>
            <p className="leading-7 text-muted-foreground">
              These datasets will be freely available for research and used to
              fine-tune multilingual AI models, ensuring Himachali languages
              are not left behind in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three doors ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="Explore" title="Three ways in" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Reveal delay={0}>
            <Link href="/vocabulary" className="block h-full">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-saffron/40 hover:shadow-lift">
                <span aria-hidden className="font-deva text-lg text-saffron-deep">
                  शब्द
                </span>
                <h3 className="mt-3 font-display text-xl">Vocabulary</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  Search living dictionaries of Himachali dialects.
                </p>
                <span className="link-ink mt-6 self-start text-sm text-saffron-deep">
                  Enter →
                </span>
              </article>
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <Link href="/datasets" className="block h-full">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-saffron/40 hover:shadow-lift">
                <h3 className="font-display text-xl">Datasets</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  Download open, versioned translation datasets.
                </p>
                <span className="link-ink mt-6 self-start text-sm text-saffron-deep">
                  Enter →
                </span>
              </article>
            </Link>
          </Reveal>

          <Reveal delay={160}>
            <Link href="/tools" className="block h-full">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-saffron/40 hover:shadow-lift">
                <span aria-hidden className="font-takri text-lg text-saffron-deep">
                  𑚀
                </span>
                <h3 className="mt-3 font-display text-xl">Tools</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  Script tools, starting with a Devanagari ⇄ Takri
                  transliterator.
                </p>
                <span className="link-ink mt-6 self-start text-sm text-saffron-deep">
                  Enter →
                </span>
              </article>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Community ────────────────────────────────────────────────── */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Community"
            title="Built in the open"
            align="center"
          />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {COMMUNITY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-border bg-card px-5 text-sm font-medium transition hover:border-saffron/40"
              >
                <Image
                  src={link.icon}
                  alt=""
                  width={24}
                  height={24}
                  className={link.rounded ? "rounded-full" : undefined}
                />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ──────────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <PahariBand className="mx-auto w-24 text-saffron/60" />
        <p className="mx-auto mt-8 max-w-3xl text-center font-display text-2xl text-balance md:text-3xl">
          HimVirasat is an open, community-driven effort to preserve Himachal’s
          heritage for future generations.
        </p>
      </section>
    </>
  );
}
