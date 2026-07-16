import { cn } from "@/lib/utils";

/**
 * Tiered pagoda temple roof (Hidimba Devi style) as a flat crest ornament.
 * Three stacked chevron roofs with upturned eaves and a finial, drawn in
 * `currentColor`. Use centered above section headings or as a divider.
 */
export function PagodaCrest({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 160 56"
      className={cn("mx-auto block h-12 w-auto text-foreground", className)}
    >
      {/* finial */}
      <rect x="78" y="0" width="4" height="7" fill="currentColor" />
      {/* tier 1 */}
      <path d="M80 5 L100 19 L96 19 L80 8.5 L64 19 L60 19 Z" fill="currentColor" />
      <path d="M80 8 L97 20 H63 Z" fill="currentColor" />
      {/* tier 2 */}
      <path d="M80 22 L114 38 L109 38 L80 25.5 L51 38 L46 38 Z" fill="currentColor" />
      <path d="M80 25 L110 39 H50 Z" fill="currentColor" />
      {/* tier 3 with upturned eaves */}
      <path d="M80 41 L132 54 L126 54 L80 44 L34 54 L28 54 Z" fill="currentColor" />
      <path d="M80 44 L127 55 H33 Z" fill="currentColor" />
      <path d="M28 54 L24 48 L30 51 Z" fill="currentColor" />
      <path d="M132 54 L136 48 L130 51 Z" fill="currentColor" />
    </svg>
  );
}
