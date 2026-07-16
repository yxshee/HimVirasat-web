import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Coin } from "@/components/decor/coin";
import { PagodaCrest } from "@/components/decor/pagoda-crest";
import { TakriField } from "@/components/decor/takri-field";
import { LogoMark } from "@/components/decor/logo-mark";
import { Marquee } from "@/components/decor/marquee";
import { ScriptCycle } from "@/components/decor/script-cycle";
import { SectionHeading } from "@/components/decor/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";
import { devToTankri } from "@/lib/transliteration/devToTankri";

const FACTS = [
  { value: "6", label: "dialects collecting" },
  { value: "1", label: "open dataset published" },
  { value: "2", label: "scripts · Devanagari ⇄ Takri" },
  { value: "100%", label: "open source" },
];

const FACT_ACCENTS = [
  "accent-marigold",
  "accent-pink",
  "accent-teal",
  "accent-lavender",
];

const COMMUNITY_LINKS = [
  {
    label: "HimVirasat Discord",
    href: site.links.discordHimvirasat,
    icon: null,
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
      <section className="surface-ink accent-marigold relative flex min-h-[88svh] items-center justify-center overflow-hidden border-b border-border">
        <TakriField />
        <Coin
          glyph="𑚦"
          script="takri"
          fill="var(--marigold)"
          tilt={-12}
          size={150}
          className="absolute top-[18%] left-[8%] hidden md:block"
        />
        <Coin
          glyph="𑚩"
          script="takri"
          fill="var(--pink)"
          tilt={10}
          size={110}
          className="absolute right-[10%] bottom-[20%] hidden md:block"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
          <Reveal delay={0}>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-marigold px-3 py-1 text-xs tracking-[0.15em] text-black uppercase">
              <span
                aria-hidden
                className="font-takri leading-none tracking-normal normal-case"
              >
                {devToTankri("हिमाचल की विरासत")}
              </span>{" "}
              <span className="leading-none">
                · Open Language Preservation
              </span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              aria-label="HimVirasat"
              className="text-brut mt-6 text-7xl font-medium text-foreground md:text-9xl"
            >
              <ScriptCycle />
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              A community-driven initiative to preserve Himachal Pradesh’s
              languages, dialects, traditions, and cultural memory, and bring
              them into the digital age.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild className="hover-brut">
                <Link href="/contribute">Start contributing</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/vocabulary">Explore the vocabulary</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Marquee seam ─────────────────────────────────────────────── */}
      <Marquee
        className="border-b border-border bg-marigold py-3 font-display text-xl text-black"
        items={[
          <span key="native-name" aria-hidden className="font-takri">
            {devToTankri("हिमविरासत")}
          </span>,
          "HimVirasat",
          <span key="takri-name" aria-hidden className="font-takri">
            𑚩𑚮𑚢𑚦𑚮𑚤𑚭𑚨𑚙
          </span>,
          "Open Language Preservation",
          <span key="hp-heritage" aria-hidden className="font-takri">
            {devToTankri("हिमाचल की विरासत")}
          </span>,
        ]}
      />

      {/* ── Fact strip ───────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
        {FACTS.map((fact, i) => (
          <div
            key={fact.label}
            className={`${FACT_ACCENTS[i]} border-t border-border p-8 sm:border-t-0${
              i > 0 ? " sm:border-l" : ""
            }`}
          >
            <div className="mb-4 h-1.5 w-10 border border-border bg-section-accent" />
            <p className="font-display text-5xl font-medium md:text-6xl">
              {fact.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{fact.label}</p>
          </div>
        ))}
      </section>

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <PagodaCrest className="mb-14 text-foreground/80" />
        <div className="grid gap-12 md:grid-cols-2">
          <SectionHeading
            eyebrow="The Mission"
            title="Open translation datasets for Himachali dialects"
            nativeEcho={devToTankri("ध्येय")}
          />
          <div className="space-y-5 border-l-4 border-marigold pl-6">
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
        <div className="mt-12 grid divide-y divide-border border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Reveal delay={0}>
            <Link href="/vocabulary" className="accent-pink block h-full">
              <article className="hover-brut relative flex h-full flex-col bg-card p-8 hover:z-10">
                <div
                  aria-hidden
                  className="grid size-12 place-items-center border border-border bg-section-accent text-black"
                >
                  <span className="font-takri">𑚧</span>
                </div>
                <h3 className="mt-3 font-display text-xl">Vocabulary</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  Search living dictionaries of Himachali dialects.
                </p>
                <span className="link-ink text-section-accent-deep mt-6 self-start text-sm">
                  Enter →
                </span>
              </article>
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <Link href="/datasets" className="accent-teal block h-full">
              <article className="hover-brut relative flex h-full flex-col bg-card p-8 hover:z-10">
                <div
                  aria-hidden
                  className="grid size-12 place-items-center border border-border bg-section-accent text-black"
                >
                  <span>◆</span>
                </div>
                <h3 className="mt-3 font-display text-xl">Datasets</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  Download open, versioned translation datasets.
                </p>
                <span className="link-ink text-section-accent-deep mt-6 self-start text-sm">
                  Enter →
                </span>
              </article>
            </Link>
          </Reveal>

          <Reveal delay={160}>
            <Link href="/tools" className="accent-lavender block h-full">
              <article className="hover-brut relative flex h-full flex-col bg-card p-8 hover:z-10">
                <div
                  aria-hidden
                  className="grid size-12 place-items-center border border-border bg-section-accent text-black"
                >
                  <span className="font-takri">𑚀</span>
                </div>
                <h3 className="mt-3 font-display text-xl">Tools</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  Script tools, starting with a Devanagari ⇄ Takri
                  transliterator.
                </p>
                <span className="link-ink text-section-accent-deep mt-6 self-start text-sm">
                  Enter →
                </span>
              </article>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Community ────────────────────────────────────────────────── */}
      <section className="surface-ink accent-pink border-y border-border py-20">
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
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-pink hover:text-black"
              >
                {link.icon ? (
                  <Image
                    src={link.icon}
                    alt=""
                    width={24}
                    height={24}
                    className={link.rounded ? "rounded-full" : undefined}
                  />
                ) : (
                  <LogoMark size={24} />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing ──────────────────────────────────────────────────── */}
      <section className="pb-24">
        <Marquee
          className="border-y border-border py-2.5 text-foreground"
          speed={40}
          separator="·"
          items={[
            <span key="native-name" aria-hidden className="font-takri">
              {devToTankri("हिमविरासत")}
            </span>,
            <span key="orn-1" aria-hidden>
              ◇
            </span>,
            "HimVirasat",
            <span key="orn-2" aria-hidden>
              ◇
            </span>,
          ]}
        />
        <p className="mx-auto mt-16 max-w-3xl px-6 text-center font-display text-3xl text-balance md:text-4xl">
          HimVirasat is an open, community-driven effort to preserve Himachal’s
          heritage for future generations.
        </p>
      </section>
    </>
  );
}
