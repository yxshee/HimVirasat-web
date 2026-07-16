import { cn } from "@/lib/utils";

const VARIANTS = {
  // Steep, jagged peaks — the high Dhauladhar range.
  dhauladhar: [
    "M0,90 L80,70 L160,84 L240,58 L340,78 L430,50 L520,72 L610,44 L700,66 L800,38 L900,64 L1000,48 L1100,70 L1200,52 L1300,74 L1380,60 L1440,72 L1440,140 L0,140 Z",
    "M0,104 L90,86 L180,98 L280,72 L380,92 L470,64 L570,88 L670,58 L770,84 L880,54 L980,80 L1080,62 L1180,86 L1280,68 L1370,88 L1440,76 L1440,140 L0,140 Z",
    "M0,120 L100,102 L200,114 L300,90 L400,108 L500,84 L600,104 L720,78 L840,102 L950,74 L1060,98 L1170,82 L1280,104 L1380,92 L1440,100 L1440,140 L0,140 Z",
  ],
  // Rolling foothills — the Shivalik range.
  shivalik: [
    "M0,86 Q120,58 260,76 Q400,94 520,66 Q640,40 780,72 Q920,102 1040,62 Q1160,26 1300,70 Q1370,90 1440,68 L1440,140 L0,140 Z",
    "M0,100 Q140,76 280,92 Q420,108 560,82 Q700,58 840,88 Q980,116 1120,80 Q1260,48 1440,88 L1440,140 L0,140 Z",
    "M0,116 Q160,96 320,108 Q480,120 640,98 Q800,78 960,104 Q1120,128 1280,100 Q1370,86 1440,104 L1440,140 L0,140 Z",
  ],
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
      className={cn("block h-16 w-full sm:h-24", className)}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path d={VARIANTS[variant][0]} fill="currentColor" opacity={0.08} />
      <path d={VARIANTS[variant][1]} fill="currentColor" opacity={0.16} />
      <path d={VARIANTS[variant][2]} fill="currentColor" />
    </svg>
  );
}
