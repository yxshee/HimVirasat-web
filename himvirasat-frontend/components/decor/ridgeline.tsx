import { cn } from "@/lib/utils";

const VARIANTS = {
  // Hard sawtooth zigzag — the high Dhauladhar range, flattened.
  dhauladhar:
    "M0,140 L0,90 L60,20 L120,90 L180,20 L240,90 L300,20 L360,90 L420,20 L480,90 L540,20 L600,90 L660,20 L720,90 L780,20 L840,90 L900,20 L960,90 L1020,20 L1080,90 L1140,20 L1200,90 L1260,20 L1320,90 L1380,20 L1440,90 L1440,140 Z",
  // Chunky scallops — rolling Shivalik foothills.
  shivalik:
    "M0,140 L0,80 A60,60 0 0 1 120,80 A60,60 0 0 1 240,80 A60,60 0 0 1 360,80 A60,60 0 0 1 480,80 A60,60 0 0 1 600,80 A60,60 0 0 1 720,80 A60,60 0 0 1 840,80 A60,60 0 0 1 960,80 A60,60 0 0 1 1080,80 A60,60 0 0 1 1200,80 A60,60 0 0 1 1320,80 A60,60 0 0 1 1440,80 L1440,140 Z",
} as const;

export function Ridgeline({
  variant = "dhauladhar",
  flip = false,
  className,
}: {
  variant?: keyof typeof VARIANTS;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      className={cn("block h-10 w-full sm:h-14", className)}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path d={VARIANTS[variant]} fill="currentColor" />
    </svg>
  );
}
