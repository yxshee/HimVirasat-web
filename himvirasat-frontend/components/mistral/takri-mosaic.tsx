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

/** Flame steps stay constant across themes; neutrals follow the theme. */
const FLAME = [
  { fill: "#ffaf01", ink: "#07070b" },
  { fill: "#ff8204", ink: "#07070b" },
  { fill: "#ff5229", ink: "#07070b" },
  { fill: "#e51300", ink: "#fbfbf8" },
  { fill: "#b31000", ink: "#fbfbf8" },
];

// Deliberately excludes --background: a tile the same colour as the page
// reads as a hole in the mosaic rather than as a quiet tile.
const NEUTRAL = [
  { fill: "var(--secondary)", ink: "var(--muted-foreground)" },
  { fill: "var(--surface-3)", ink: "var(--muted-foreground)" },
  { fill: "var(--hairline-strong)", ink: "var(--background)" },
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

const VARIANTS = {
  hero: { tiles: 30, cols: "grid-cols-6 sm:grid-cols-10", flame: 0.62 },
  band: { tiles: 24, cols: "grid-cols-6 sm:grid-cols-12", flame: 0.45 },
  panel: { tiles: 16, cols: "grid-cols-4", flame: 0.7 },
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
  const { tiles, cols, flame } = VARIANTS[variant];
  const rng = makeRng(seed);

  const cells = Array.from({ length: tiles }, () => {
    const isFlame = rng() < flame;
    const palette = isFlame ? FLAME : NEUTRAL;
    const tone = palette[Math.floor(rng() * palette.length)];
    // Glyphs and diamonds only ride on flame tiles, so the neutrals stay
    // quiet and the eye reads the warm blocks as the figure.
    const roll = rng();
    const kind = isFlame && roll < 0.3 ? "glyph" : isFlame && roll < 0.4 ? "diamond" : "plain";
    const glyph = GLYPHS[Math.floor(rng() * GLYPHS.length)];
    const diamondTone = FLAME[Math.floor(rng() * FLAME.length)];
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
