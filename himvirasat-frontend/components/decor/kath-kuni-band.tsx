import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Kath-kuni wall course: the alternating timber-and-stone construction of
 * Himachali architecture flattened into a strip. Twin timber beams laced
 * with cross-lap joints, dry-stone infill blocks between. Colors via
 * `currentColor`; set with a text-* class.
 */
export function KathKuniBand({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn("block h-5 w-full text-foreground", className)}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={id} width="72" height="20" patternUnits="userSpaceOnUse">
          {/* twin timber beams */}
          <rect x="0" y="1" width="72" height="3" fill="currentColor" />
          <rect x="0" y="16" width="72" height="3" fill="currentColor" />
          {/* cross-lap timber joint */}
          <path
            d="M6 5 L22 15 M22 5 L6 15"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          {/* dry-stone infill blocks */}
          <rect
            x="30"
            y="7"
            width="16"
            height="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="50"
            y="7"
            width="14"
            height="6"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
