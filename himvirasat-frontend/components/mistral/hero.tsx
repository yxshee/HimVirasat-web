import Link from "next/link";

import { ArrowRow } from "@/components/mistral/arrow-row";
import { Eyebrow } from "@/components/mistral/eyebrow";
import { ScrollCue } from "@/components/mistral/scroll-cue";
import { TakriMosaic } from "@/components/mistral/takri-mosaic";
import { Button } from "@/components/ui/button";
import { makeRng, seedFromString } from "@/lib/seeded-rng";
import { devToTankri } from "@/lib/transliteration/devToTankri";

/**
 * Two full screens. The first pins under the header while the second
 * scrolls up over it.
 *
 * Layout is a 70/30 split across two rows — 60dvh of headline and mission
 * copy, then 40dvh of mosaic, scroll cue and one featured item. Below
 * `lg` the split collapses to a single column and the pin is dropped,
 * because a pinned screen on a phone costs more height than it buys.
 */

const HEADLINE = "Himachal speaks in many tongues. We are writing them down.";

/** One paragraph per line, so each can be timed independently later. */
const MISSION = [
  "An initiative driven by the community to preserve",
  "Himachal Pradesh's languages, dialects, traditions",
  "and cultural memory, and bring them into the digital age.",
];

const FEATURED = {
  label: "Mandeali vocabulary is live",
  description: "The first dialect archive is open to search.",
  href: "/vocabulary/mandeali",
};

/**
 * Words fade and grow into place on staggered delays. Seeded rather than
 * random so the server and client emit identical inline styles — a
 * `Math.random()` here would desynchronise hydration on every load.
 */
function buildWordDelays(text: string) {
  const rng = makeRng(seedFromString(text));
  return text.split(" ").map((word) => ({
    word,
    delay: Math.round(rng() * 220),
  }));
}

export function Hero() {
  const words = buildWordDelays(HEADLINE);

  return (
    <section className="border-border border-b lg:min-h-[200dvh]">
      {/* ── Screen one — pinned ─────────────────────────────────────── */}
      <div className="hero-pin">
        {/* Row 1 — headline and mission */}
        <div className="border-border flex flex-col border-b lg:h-[60dvh] lg:flex-row">
          <div className="flex flex-col justify-end px-6 pt-16 pb-10 lg:w-[70%] lg:px-10 lg:pt-0">
            <Eyebrow
              size="lg"
              nativeEcho={devToTankri("हिमाचल की विरासत")}
              className="mb-8"
            >
              Open language preservation
            </Eyebrow>

            {/* The real heading, for assistive tech and for search. The
                animated copy below is decorative: read word-by-word it
                would be announced as disconnected fragments. */}
            <h1 className="sr-only">{HEADLINE}</h1>
            <p
              aria-hidden
              className="font-display text-display-md md:text-display-xl max-w-4xl text-balance"
            >
              {words.map(({ word, delay }, i) => (
                <span
                  key={`${word}-${i}`}
                  className="hero-word"
                  style={{ "--word-delay": `${delay}ms` } as React.CSSProperties}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </div>

          <div className="border-border bg-secondary flex flex-col justify-end border-t px-6 py-10 lg:w-[30%] lg:border-t-0 lg:border-l lg:px-10">
            {MISSION.map((line) => (
              <p key={line} className="text-body-lg text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Row 2 — mosaic, cue and one featured item */}
        <div className="flex flex-col lg:h-[40dvh] lg:flex-row">
          <div className="hero-fade-in relative overflow-hidden lg:w-[70%]">
            <TakriMosaic variant="hero" seed={7} />

            {/* On the reference these labels are painted inside the Lottie
                artwork. Ours are real text, so they stay selectable and
                translate with the page.

                They sit on a solid chip rather than directly on the tiles.
                `mix-blend-difference` was tried first and only works over
                extremes — over a mid-tone tile like sage it inverts to a
                muddy purple. The chip costs a little of the flush look and
                buys guaranteed legibility over any tile the loop lands on. */}
            <Eyebrow className="bg-background pointer-events-none absolute bottom-3 left-3 px-2 py-0.5">
              Open language preservation
            </Eyebrow>
            <Eyebrow className="bg-background pointer-events-none absolute right-3 bottom-3 px-2 py-0.5">
              Himachal
            </Eyebrow>
          </div>

          <div className="border-border flex flex-col justify-between border-t lg:w-[30%] lg:border-t-0 lg:border-l">
            <ScrollCue className="items-start p-10" />
            <div className="border-border border-t">
              <Eyebrow className="px-4 pt-5">Featured</Eyebrow>
              <ArrowRow
                href={FEATURED.href}
                label={FEATURED.label}
                description={FEATURED.description}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Screen two — scrolls up over the pinned screen ──────────── */}
      <div className="bg-background border-border relative z-10 border-t">
        <div className="mx-auto flex w-full max-w-content flex-col items-start px-6 py-24 md:py-32 lg:px-10">
          <Eyebrow className="mb-6">Why it matters</Eyebrow>
          <p className="text-display-md md:text-display-lg max-w-4xl text-balance">
            Himachali dialects sit outside every major language dataset. If
            they are not written down here, they are not written down anywhere.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/contribute">Start contributing</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/vocabulary">Explore the vocabulary</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
