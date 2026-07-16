import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Temple-carving border strip: a repeating lozenge chain inspired by
 * Pahari woodcarving. Colors via `currentColor` — set with a text-* class.
 */
export function PahariBand({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn("block h-2.5 w-full text-saffron/70", className)}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={id}
          width="48"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M24 1 L29 5 L24 9 L19 5 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="6" cy="5" r="1.4" fill="currentColor" />
          <circle cx="42" cy="5" r="1.4" fill="currentColor" />
          <path d="M10 5 h6 M32 5 h6" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
