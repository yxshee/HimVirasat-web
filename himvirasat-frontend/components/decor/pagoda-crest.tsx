import { cn } from "@/lib/utils";

/**
 * Hidimba-style tiered pagoda temple as a flat crest ornament: three slate
 * roof planes with strong eave bars and upturned corner kicks, exposed
 * timber walls with doorways between tiers, chhatra finial on a mast.
 * Drawn entirely in `currentColor`; solid roofs, stroked walls.
 */
export function PagodaCrest({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 150"
      className={cn("mx-auto block h-16 w-auto text-foreground", className)}
    >
      {/* mast + chhatra finial */}
      <rect x="98" y="0" width="4" height="9" fill="currentColor" />
      <ellipse cx="100" cy="11" rx="9" ry="2.8" fill="currentColor" />
      <rect x="98.5" y="13" width="3" height="6" fill="currentColor" />

      {/* tier 1 — roof, slate line, eave bar, corner kicks */}
      <path d="M100 19 L138 46 H62 Z" fill="currentColor" />
      <path
        d="M84 37 H116"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <rect x="58" y="46" width="84" height="3.5" fill="currentColor" />
      <path d="M58 49.5 L49 41.5 L58 45.5 Z" fill="currentColor" />
      <path d="M142 49.5 L151 41.5 L142 45.5 Z" fill="currentColor" />

      {/* wall 1 with doorway */}
      <rect
        x="84"
        y="49.5"
        width="32"
        height="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <rect x="97" y="52.5" width="6" height="7" fill="currentColor" />

      {/* tier 2 */}
      <path d="M100 59 L162 88 H38 Z" fill="currentColor" />
      <path
        d="M74 76 H126"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <rect x="34" y="88" width="132" height="4" fill="currentColor" />
      <path d="M34 92 L24 83 L34 87.5 Z" fill="currentColor" />
      <path d="M166 92 L176 83 L166 87.5 Z" fill="currentColor" />

      {/* wall 2 with doorway */}
      <rect
        x="74"
        y="92"
        width="52"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <rect x="96" y="95" width="8" height="9" fill="currentColor" />

      {/* tier 3 */}
      <path d="M100 104 L184 138 H16 Z" fill="currentColor" />
      <path
        d="M56 126 H144"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <rect x="10" y="138" width="180" height="4.5" fill="currentColor" />
      <path d="M10 142.5 L0 132.5 L10 137.5 Z" fill="currentColor" />
      <path d="M190 142.5 L200 132.5 L190 137.5 Z" fill="currentColor" />
    </svg>
  );
}
