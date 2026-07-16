import { cn } from "@/lib/utils";

/**
 * Oversized native-script glyph as background typography.
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
        "pointer-events-none absolute leading-none select-none",
        "text-[18rem] text-foreground opacity-[0.04] sm:text-[24rem] dark:opacity-[0.06]",
        script === "deva" ? "font-deva" : "font-takri",
        className,
      )}
    >
      {glyph}
    </span>
  );
}
