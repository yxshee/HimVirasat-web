import { cn } from "@/lib/utils";

/**
 * Scattered field of distinct Takri syllables — hand-placed, non-repeating
 * background typography for hero surfaces. Mix of outlined and faint-filled
 * glyphs at varied sizes and tilts. Purely decorative.
 */
const GLYPHS: Array<{
  glyph: string;
  left: string;
  top: string;
  size: string;
  rotate: number;
  outlined?: boolean;
  opacity: string;
  hideOnMobile?: boolean;
}> = [
  { glyph: "𑚩𑚮", left: "76%", top: "-4%", size: "text-[15rem]", rotate: 6, outlined: true, opacity: "opacity-20" },
  { glyph: "𑚊𑚭", left: "3%", top: "8%", size: "text-7xl", rotate: -10, opacity: "opacity-15", hideOnMobile: true },
  { glyph: "𑚝𑚯", left: "88%", top: "58%", size: "text-6xl", rotate: 8, opacity: "opacity-15", hideOnMobile: true },
  { glyph: "𑚤𑚱", left: "12%", top: "68%", size: "text-8xl", rotate: -6, outlined: true, opacity: "opacity-25", hideOnMobile: true },
  { glyph: "𑚧", left: "64%", top: "78%", size: "text-5xl", rotate: 12, opacity: "opacity-15" },
  { glyph: "𑚙𑚭", left: "38%", top: "2%", size: "text-4xl", rotate: -14, opacity: "opacity-15" },
  { glyph: "𑚢𑚲", left: "55%", top: "12%", size: "text-6xl", rotate: 4, outlined: true, opacity: "opacity-20", hideOnMobile: true },
  { glyph: "𑚦𑚴", left: "-2%", top: "38%", size: "text-9xl", rotate: 10, outlined: true, opacity: "opacity-20", hideOnMobile: true },
  { glyph: "𑚟𑚵", left: "30%", top: "84%", size: "text-5xl", rotate: -8, opacity: "opacity-15", hideOnMobile: true },
  { glyph: "𑚛𑚮", left: "93%", top: "26%", size: "text-4xl", rotate: -4, opacity: "opacity-15" },
];

export function TakriField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className,
      )}
    >
      {GLYPHS.map((g) => (
        <span
          key={g.glyph}
          className={cn(
            "font-takri absolute leading-none text-foreground",
            g.size,
            g.opacity,
            g.outlined && "text-stroke-2",
            g.hideOnMobile && "hidden md:block",
          )}
          style={{
            left: g.left,
            top: g.top,
            transform: `rotate(${g.rotate}deg)`,
          }}
        >
          {g.glyph}
        </span>
      ))}
    </div>
  );
}
