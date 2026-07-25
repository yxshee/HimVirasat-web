"use client";

import { useEffect, type RefObject } from "react";

import { PixelIcon, type PixelIconName } from "@/components/mistral/pixel-icon";
import { useReveal } from "@/hooks/use-reveal";
import { makeRng } from "@/lib/seeded-rng";
import { cn } from "@/lib/utils";

/**
 * Marks the node `data-in-view` so the drift loop can be paused while it is
 * off-screen — see the rule in globals.css for why that matters.
 *
 * Writes the attribute directly instead of going through state: this fires
 * on every scroll past every mosaic, and a re-render per crossing is the
 * opposite of the point. `useReveal` is deliberately left alone; its latch
 * is correct for content reveals, which must not un-reveal.
 */
function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) =>
        node.setAttribute("data-in-view", String(entry.isIntersecting)),
      // A margin either side, so a mosaic is already running by the time it
      // is scrolled into view rather than starting mid-phase.
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
}

/**
 * The signature graphic: a grid of flat square tiles in the Deodar palette,
 * carrying single Takri letters and Himachali motifs, with occasional
 * rotated diamonds. Everything is drawn on the same square unit as
 * `PixelIcon`, so the mark, the icons and the mosaic share one alphabet.
 *
 * Two invariants hold by construction rather than by checking afterwards:
 *
 *   1. No colour appears more than twice in any frame. Tones are dealt
 *      from a bag containing exactly two copies of each, so a third use
 *      is not representable.
 *   2. A tile carrying a letter or motif never changes ink polarity. The
 *      palette spans light and dark fills, so a tile drifting across that
 *      boundary would render its glyph unreadable partway through the
 *      loop — and a contrast check sampling the rendered frame would
 *      still pass it.
 *
 * The pattern is generated from a fixed seed through a pure PRNG, so the
 * server and the client produce byte-identical markup. Never introduce
 * `Math.random()` here — it would desynchronise hydration.
 */

type Tone = { fill: string; ink: string };

const INK_DARK = "#07070b";
const INK_CREAM = "#fbfbf8";

/**
 * Every fill below was checked against both inks. AA at 4.5:1 needs
 * relative luminance >= 0.185 for near-black ink or <= 0.175 for cream;
 * a tone between those is unusable with either. None are. Worst pairing
 * is clay-500 at 4.90:1. Adding a tone means redoing that arithmetic.
 */
const DARK_INK: Tone[] = [
  { fill: "#a9cfbc", ink: INK_DARK }, // pine 50
  { fill: "#7fb69b", ink: INK_DARK }, // pine 100 — sage
  { fill: "#64a687", ink: INK_DARK }, // pine 200
  { fill: "#4e9578", ink: INK_DARK }, // pine 300 — meadow
  { fill: "#b9dedc", ink: INK_DARK }, // glacier 100 — pale ice
  { fill: "#7ec6c6", ink: INK_DARK }, // glacier 300
  { fill: "#5cb0b4", ink: INK_DARK }, // glacier 400
  { fill: "#3e9ca3", ink: INK_DARK }, // glacier 500
  { fill: "#d3b79b", ink: INK_DARK }, // clay 200 — sand
  { fill: "#a98363", ink: INK_DARK }, // clay 400
  { fill: "#b7bdb6", ink: INK_DARK }, // stone 300 — slate
];

const CREAM_INK: Tone[] = [
  { fill: "#2e7358", ink: INK_CREAM }, // pine 500 — forest
  { fill: "#1c5341", ink: INK_CREAM }, // pine 700
  { fill: "#0f3a2e", ink: INK_CREAM }, // pine 900 — deep pine
  { fill: "#2a7480", ink: INK_CREAM }, // glacier 700
  { fill: "#8b6749", ink: INK_CREAM }, // clay 500
  { fill: "#6e4e36", ink: INK_CREAM }, // clay 600 — timber
  { fill: "#4a3324", ink: INK_CREAM }, // clay 800
  { fill: "#5d6660", ink: INK_CREAM }, // stone 600
];

/**
 * Snow. Read from tokens rather than literals so they invert with the
 * theme — near-white on the dark canvas, warm paper on the light one.
 * Seven steps because the band variant carries thirteen neutral tiles and
 * the cap of two per colour means three tones could only cover six.
 */
const SNOW: Tone[] = Array.from({ length: 7 }, (_, i) => ({
  fill: `var(--mosaic-${i + 1})`,
  ink: INK_DARK,
}));

const TINTED = [...DARK_INK, ...CREAM_INK];
const ALL_TONES = [...TINTED, ...SNOW];

/** Takri, U+11680–U+116A9. Forty-two letters, drawn without replacement. */
const GLYPHS = Array.from({ length: 0x116a9 - 0x11680 + 1 }, (_, i) =>
  String.fromCodePoint(0x11680 + i),
);

/** Himachali motifs, in the same pixel grammar as the icons. */
const MOTIFS: PixelIconName[] = ["deodar", "pagoda", "kathkuni", "peak"];

const VARIANTS = {
  hero: {
    tiles: 30,
    cols: "grid-cols-6 sm:grid-cols-10",
    waveCols: 10,
    tinted: 0.62,
    glyphs: 12,
    motifs: 4,
    diamonds: 2,
  },
  band: {
    tiles: 24,
    cols: "grid-cols-6 sm:grid-cols-12",
    waveCols: 12,
    tinted: 0.5,
    glyphs: 8,
    motifs: 3,
    diamonds: 1,
  },
  panel: {
    tiles: 16,
    cols: "grid-cols-4",
    waveCols: 4,
    tinted: 0.7,
    glyphs: 6,
    motifs: 2,
    diamonds: 1,
  },
} as const;

const PHASES = 4;

/** Fisher–Yates against the seeded PRNG. */
function shuffle<T>(items: T[], rng: () => number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Kind = "glyph" | "motif" | "diamond" | "plain";

export function TakriMosaic({
  variant = "hero",
  seed = 7,
  className,
}: {
  variant?: keyof typeof VARIANTS;
  /** Change to reshuffle the pattern; must be stable across renders. */
  seed?: number;
  className?: string;
}) {
  const v = VARIANTS[variant];
  const { ref, revealed } = useReveal<HTMLDivElement>();
  usePauseOffscreen(ref);
  const rng = makeRng(seed);

  // 1. Which tiles are tinted, and what each one carries.
  const order = shuffle(
    Array.from({ length: v.tiles }, (_, i) => i),
    rng,
  );
  const tintedCount = Math.round(v.tiles * v.tinted);
  const tintedSet = new Set(order.slice(0, tintedCount));

  const tintedOrder = order.slice(0, tintedCount);
  const kinds = new Map<number, Kind>();
  let cursor = 0;
  for (let n = 0; n < v.glyphs && cursor < tintedOrder.length; n++)
    kinds.set(tintedOrder[cursor++], "glyph");
  for (let n = 0; n < v.motifs && cursor < tintedOrder.length; n++)
    kinds.set(tintedOrder[cursor++], "motif");
  for (let n = 0; n < v.diamonds && cursor < tintedOrder.length; n++)
    kinds.set(tintedOrder[cursor++], "diamond");

  // 2. Letters, drawn without replacement so none repeats in a mosaic.
  const letters = shuffle(GLYPHS, rng).slice(0, v.glyphs);
  const motifPicks = shuffle(MOTIFS, rng);

  // 3. Ink polarity is fixed per tile and holds for every phase. Every
  //    tile that carries a mark needs this — diamonds included. Without
  //    it a diamond falls through to the full tinted pool, resolves to
  //    near-black, and can land on deep pine where it disappears.
  const polarity = new Map<number, Tone[]>();
  for (const i of tintedOrder) {
    const k = kinds.get(i);
    if (k === "glyph" || k === "motif" || k === "diamond") {
      polarity.set(i, rng() < 0.5 ? DARK_INK : CREAM_INK);
    }
  }

  // 4. Deal each phase from a bag holding two copies of every tone. A
  //    tile takes the first tone in the bag its constraint allows, so a
  //    third use of any colour is simply not available.
  const phaseFills: string[][] = [];
  for (let p = 0; p < PHASES; p++) {
    const bag = shuffle(
      ALL_TONES.flatMap((t) => [t, t]),
      rng,
    );
    const fills: string[] = [];
    for (let i = 0; i < v.tiles; i++) {
      const allowed = !tintedSet.has(i) ? SNOW : (polarity.get(i) ?? TINTED);
      const at = bag.findIndex((t) => allowed.includes(t));
      // Pools are sized so this cannot run dry: snow is 14 slots against
      // at most 13 neutral tiles, the smaller ink group 16 against at
      // most 12 marked tiles.
      const tone = at >= 0 ? bag.splice(at, 1)[0] : allowed[0];
      fills.push(tone.fill);
    }
    phaseFills.push(fills);
  }

  let letterAt = 0;
  let motifAt = 0;

  const cells = Array.from({ length: v.tiles }, (_, i) => {
    const kind: Kind = kinds.get(i) ?? "plain";
    const pool = !tintedSet.has(i) ? SNOW : (polarity.get(i) ?? TINTED);
    const ink = pool === CREAM_INK ? INK_CREAM : INK_DARK;
    return {
      kind,
      ink,
      fill: phaseFills[0][i],
      phases: phaseFills.map((f) => f[i]),
      glyph: kind === "glyph" ? letters[letterAt++] : null,
      motif: kind === "motif" ? motifPicks[motifAt++ % motifPicks.length] : null,
      // Diagonal wave, so variants that animate an entrance land as one
      // gesture rather than trickling across in DOM order.
      wave: Math.floor(i / v.waveCols) + (i % v.waveCols),
    };
  });

  return (
    <div
      ref={ref}
      aria-hidden
      data-mosaic={variant}
      data-revealed={revealed}
      className={cn("grid w-full", v.cols, className)}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          data-kind={c.kind}
          className="mosaic-tile grid aspect-square place-items-center"
          style={
            {
              backgroundColor: c.fill,
              "--i": c.wave,
              "--t0": c.phases[0],
              "--t1": c.phases[1],
              "--t2": c.phases[2],
              "--t3": c.phases[3],
            } as React.CSSProperties
          }
        >
          {c.glyph && (
            <span
              className="font-takri text-[clamp(1rem,3.2vw,2.75rem)] leading-none select-none"
              style={{ color: c.ink }}
            >
              {c.glyph}
            </span>
          )}
          {c.motif && (
            <PixelIcon
              name={c.motif}
              className="size-[58%]"
              style={{ color: c.ink }}
            />
          )}
          {c.kind === "diamond" && (
            <span
              className="mosaic-diamond block size-[52%] rotate-45"
              style={{ backgroundColor: c.ink }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
