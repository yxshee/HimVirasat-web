import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Chunky lozenge-chain ornament strip — Pahari woodcarving flattened into
 * a bold rule. Colors via `currentColor`; set with a text-* class.
 */
export function PahariBand({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn("block h-4 w-full text-foreground", className)}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={id} width="56" height="16" patternUnits="userSpaceOnUse">
          <path d="M28 2 L34 8 L28 14 L22 8 Z" fill="currentColor" />
          <path
            d="M8 4 L12 8 L8 12 L4 8 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M48 4 L52 8 L48 12 L44 8 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M14 8 h6 M36 8 h6" stroke="currentColor" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
