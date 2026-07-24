import { cn } from "@/lib/utils";

/**
 * The signature graphic: a grid of flat square tiles in the flame ramp,
 * a subset carrying single Takri syllables, with occasional rotated
 * diamonds. Same square unit as `PixelIcon`, so the illustration and the
 * iconography share one alphabet.
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

/**
 * Deodar steps stay constant across themes; neutrals follow the theme.
 *
 * Unlike the old warm ramp, these span both light and dark values, so ink
 * is chosen per tone rather than fixed. Measured against each fill:
 * near-black clears 5.5:1 or better on sage, meadow, both glaciers and
 * clay; cream clears 5.7:1 or better on forest, pine, deep pine and
 * timber. Changing a fill means re-checking its ink.
 */
const DEODAR = [
  { fill: "#7fb69b", ink: "#07070b" }, // sage
  { fill: "#4e9578", ink: "#07070b" }, // meadow
  { fill: "#2e7358", ink: "#fbfbf8" }, // forest
  { fill: "#1c5341", ink: "#fbfbf8" }, // pine
  { fill: "#0f3a2e", ink: "#fbfbf8" }, // deep pine
  { fill: "#7ec6c6", ink: "#07070b" }, // glacial melt
  { fill: "#3e9ca3", ink: "#07070b" }, // glacier
  { fill: "#a98363", ink: "#07070b" }, // clay
  { fill: "#6e4e36", ink: "#fbfbf8" }, // timber
];

// These read from dedicated --mosaic-* tokens rather than the surface
// palette, so the tiles stay light when the theme goes dark instead of
// following the canvas down and reading as holes in the block.
const NEUTRAL = [
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
  hero: { tiles: 30, cols: "grid-cols-6 sm:grid-cols-10", tinted: 0.62 },
  band: { tiles: 24, cols: "grid-cols-6 sm:grid-cols-12", tinted: 0.45 },
  panel: { tiles: 16, cols: "grid-cols-4", tinted: 0.7 },
} as const;

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
  const { tiles, cols, tinted } = VARIANTS[variant];
  const rng = makeRng(seed);

  const cells = Array.from({ length: tiles }, () => {
    const isTinted = rng() < tinted;
    const palette = isTinted ? DEODAR : NEUTRAL;
    const tone = palette[Math.floor(rng() * palette.length)];
    // Glyphs and diamonds only ride on tinted tiles, so the neutrals stay
    // quiet and the eye reads the coloured blocks as the figure.
    const roll = rng();
    const kind =
      isTinted && roll < 0.3 ? "glyph" : isTinted && roll < 0.4 ? "diamond" : "plain";
    const glyph = GLYPHS[Math.floor(rng() * GLYPHS.length)];
    const diamondTone = DEODAR[Math.floor(rng() * DEODAR.length)];
    return { tone, kind, glyph, diamondTone };
  });

  return (
    <div aria-hidden className={cn("grid w-full", cols, className)}>
      {cells.map((c, i) => (
        <div
          key={i}
          className="grid aspect-square place-items-center"
          style={{ backgroundColor: c.tone.fill }}
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
              className="block size-[52%] rotate-45"
              style={{ backgroundColor: c.diamondTone.fill }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
