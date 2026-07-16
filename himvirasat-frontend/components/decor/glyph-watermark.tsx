import { cn } from "@/lib/utils";

/**
 * Oversized OUTLINED native-script glyph as background art.
 * Purely decorative — always hidden from assistive tech.
 */
export function GlyphWatermark({
  glyph = "हि",
  script = "deva",
  className,
}: {
  glyph?: string;
  script?: "deva" | "takri";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "glyph-stroke pointer-events-none absolute leading-none select-none",
        "text-[18rem] text-foreground opacity-20 sm:text-[24rem]",
        script === "deva" ? "font-deva" : "font-takri",
        className,
      )}
    >
      {glyph}
    </span>
  );
}
