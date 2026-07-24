"use client";

import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

/**
 * The signature graphic: a grid of flat square tiles in the Deodar ramp,
 * a subset carrying single Takri syllables, with occasional rotated
 * diamonds. Same square unit as `PixelIcon`, so the illustration and the
 * iconography share one alphabet.
 *
 * Motion (see globals.css): tiles fall in with a squash-settle staggered
 * by diagonal wave, then hold a slow four-phase colour loop. Because the
 * phases are aligned across every tile, neighbours that land on the same
 * colour momentarily read as one merged block and split again when they
 * diverge — merge/split with nothing but `background-color`, so no
 * geometry animates and nothing reflows.
 *
 * The pattern is generated from a fixed seed through a pure PRNG, so the
 * server and the client produce byte-identical markup. Never introduce
 * `Math.random()` here — it would desynchronise hydration.
 */

/** mulberry32 — small, fast, fully deterministic. */
function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Tone = { fill: string; ink: string };

/**
 * The ramp is split by ink polarity, and that split is load-bearing.
 *
 * A tile cycles through four fills over the ambient loop. If those fills
 * straddle the polarity boundary, a glyph sitting on the tile becomes
 * unreadable partway through the loop — and a contrast audit sampling the
 * rendered frame would still pass it. Glyph tiles therefore draw every
 * phase from one group only.
 *
 * Measured: near-black clears 5.5:1 or better on every DARK_INK fill,
 * cream clears 5.7:1 or better on every LIGHT_INK fill.
 */
const DARK_INK: Tone[] = [
  { fill: "#7fb69b", ink: "#07070b" }, // sage
  { fill: "#4e9578", ink: "#07070b" }, // meadow
  { fill: "#7ec6c6", ink: "#07070b" }, // glacial melt
  { fill: "#3e9ca3", ink: "#07070b" }, // glacier
  { fill: "#a98363", ink: "#07070b" }, // clay
];

const LIGHT_INK: Tone[] = [
  { fill: "#2e7358", ink: "#fbfbf8" }, // forest
  { fill: "#1c5341", ink: "#fbfbf8" }, // pine
  { fill: "#0f3a2e", ink: "#fbfbf8" }, // deep pine
  { fill: "#6e4e36", ink: "#fbfbf8" }, // timber
];

const DEODAR: Tone[] = [...DARK_INK, ...LIGHT_INK];

// These read from dedicated --mosaic-* tokens rather than the surface
// palette, so the tiles stay light when the theme goes dark instead of
// following the canvas down and reading as holes in the block.
const NEUTRAL: Tone[] = [
  { fill: "var(--mosaic-1)", ink: "#07070b" },
  { fill: "var(--mosaic-2)", ink: "#07070b" },
  { fill: "var(--mosaic-3)", ink: "#07070b" },
];

/** Takri syllables, matching the script used across the site's content. */
const GLYPHS = [
  "𑚩",
  "𑚢",
  "𑚦",
  "𑚤",
  "𑚨",
  "𑚙",
  "𑚊",
  "𑚝",
  "𑚧",
  "𑚟",
  "𑚛",
  "𑚀",
];

/** `tinted` is the share of tiles taking a Deodar step; the rest are neutral. */
const VARIANTS = {
  hero: {
    tiles: 30,
    cols: "grid-cols-6 sm:grid-cols-10",
    waveCols: 10,
    tinted: 0.62,
  },
  band: {
    tiles: 24,
    cols: "grid-cols-6 sm:grid-cols-12",
    waveCols: 12,
    tinted: 0.45,
  },
  panel: { tiles: 16, cols: "grid-cols-4", waveCols: 4, tinted: 0.7 },
} as const;

/** How often a tile borrows its left neighbour's colour for a phase. */
const MERGE_CHANCE = 0.42;

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
  const { tiles, cols, waveCols, tinted } = VARIANTS[variant];
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const rng = makeRng(seed);

  const cells: Array<{
    tone: Tone;
    kind: "glyph" | "diamond" | "plain";
    glyph: string;
    diamondTone: Tone;
    phases: string[];
    wave: number;
  }> = [];

  for (let i = 0; i < tiles; i++) {
    const isTinted = rng() < tinted;
    const roll = rng();
    const kind =
      isTinted && roll < 0.3
        ? "glyph"
        : isTinted && roll < 0.4
          ? "diamond"
          : "plain";

    // Glyph tiles are locked to one ink polarity for the whole loop.
    const group: Tone[] = !isTinted
      ? NEUTRAL
      : kind === "glyph"
        ? rng() < 0.5
          ? DARK_INK
          : LIGHT_INK
        : DEODAR;

    const tone = group[Math.floor(rng() * group.length)];

    // Four phase colours. A tile may borrow the left neighbour's colour
    // for a given phase — that is what makes adjacent tiles momentarily
    // read as one block and then separate again.
    //
    // A glyph tile may only borrow a colour that is still legible against
    // its ink. Without this guard the borrow silently drags a glyph tile
    // across the polarity boundary and its syllable disappears partway
    // through the loop — invisible to any audit sampling a single frame.
    const allowed = new Set(group.map((t) => t.fill));
    const prev = cells[i - 1];
    const atRowStart = i % waveCols === 0;
    const phases = Array.from({ length: 4 }, (_, p) => {
      const candidate = prev && !atRowStart ? prev.phases[p] : null;
      const wantsMerge = candidate !== null && rng() < MERGE_CHANCE;
      if (wantsMerge && (kind !== "glyph" || allowed.has(candidate))) {
        return candidate;
      }
      return group[Math.floor(rng() * group.length)].fill;
    });

    const glyph = GLYPHS[Math.floor(rng() * GLYPHS.length)];
    const diamondTone = DEODAR[Math.floor(rng() * DEODAR.length)];
    // Diagonal wave, so the block lands as one gesture rather than
    // trickling across in DOM order.
    const wave = Math.floor(i / waveCols) + (i % waveCols);

    cells.push({ tone, kind, glyph, diamondTone, phases, wave });
  }

  return (
    <div
      ref={ref}
      aria-hidden
      data-mosaic
      data-revealed={revealed}
      className={cn("grid w-full", cols, className)}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          data-kind={c.kind}
          className="mosaic-tile grid aspect-square place-items-center"
          style={
            {
              backgroundColor: c.tone.fill,
              "--i": c.wave,
              "--t0": c.phases[0],
              "--t1": c.phases[1],
              "--t2": c.phases[2],
              "--t3": c.phases[3],
            } as React.CSSProperties
          }
        >
          {c.kind === "glyph" && (
            <span
              className="font-takri text-[clamp(1rem,3.2vw,2.75rem)] leading-none select-none"
              style={{ color: c.tone.ink }}
            >
              {c.glyph}
            </span>
          )}
          {c.kind === "diamond" && (
            <span
              className="mosaic-diamond block size-[52%] rotate-45"
              style={{ backgroundColor: c.diamondTone.fill }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
