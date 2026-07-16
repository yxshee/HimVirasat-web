import { cn } from "@/lib/utils";

/**
 * Flat glyph coin — the Gumroad G-coin reinterpreted with native script.
 * Offset back-circle fakes the tilted-3D edge with zero gradients.
 * Purely decorative; always aria-hidden.
 */
export function Coin({
  glyph = "हि",
  script = "deva",
  fill = "var(--section-accent)",
  tilt = 0,
  size = 160,
  className,
}: {
  glyph?: string;
  script?: "deva" | "takri";
  fill?: string;
  tilt?: number;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 104 104"
      width={size}
      height={size}
      className={cn("pointer-events-none select-none", className)}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <circle cx="56" cy="56" r="45" fill="#000000" />
      <circle
        cx="48"
        cy="48"
        r="45"
        fill={fill}
        stroke="#000000"
        strokeWidth="3"
      />
      <circle
        cx="48"
        cy="48"
        r="34"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
      />
      <text
        x="48"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="36"
        fill="#000000"
        className={script === "deva" ? "font-deva" : "font-takri"}
      >
        {glyph}
      </text>
    </svg>
  );
}
