import { cn } from "@/lib/utils";

/**
 * Icons drawn as 4×4 squares on a 6×6 lattice inside a 30×30 viewBox.
 *
 * Every icon in the system is built from the same square unit as the
 * mosaic tiles, so arrows, chevrons and decorative blocks all read as one
 * alphabet. Cells are grid indices; `cell()` maps an index to its
 * user-space coordinate (5, 9, 13, 17, 21, 25).
 */

const CELL = 4;
const cell = (i: number) => 5 + CELL * i;

/** [column, row] pairs on the 6×6 lattice, origin top-left. */
const ICONS = {
  "chevron-right": [
    [1, 0],
    [2, 1],
    [3, 2],
    [2, 3],
    [1, 4],
  ],
  "chevron-left": [
    [3, 0],
    [2, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ],
  "chevron-down": [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 2],
    [4, 1],
  ],
  "arrow-up-right": [
    [0, 5],
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
    [2, 1],
    [3, 1],
    [4, 2],
    [4, 3],
  ],
  plus: [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [0, 2],
    [1, 2],
    [3, 2],
    [4, 2],
  ],
  minus: [
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
  ],
  close: [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [4, 0],
    [3, 1],
    [1, 3],
    [0, 4],
  ],
  grid: [
    [0, 0],
    [2, 0],
    [4, 0],
    [0, 2],
    [2, 2],
    [4, 2],
    [0, 4],
    [2, 4],
    [4, 4],
  ],
  /* Section markers for the six-up grid — each a distinct block figure. */
  book: [
    [0, 1],
    [1, 1],
    [2, 1],
    [0, 2],
    [2, 2],
    [0, 3],
    [1, 3],
    [2, 3],
    [4, 1],
    [4, 2],
    [4, 3],
  ],
  stack: [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 2],
  ],
  swap: [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 0],
    [3, 1],
    [1, 3],
    [2, 3],
    [3, 3],
    [1, 4],
  ],
  map: [
    [0, 0],
    [1, 1],
    [2, 0],
    [3, 1],
    [4, 0],
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
  ],
  quill: [
    [4, 0],
    [3, 1],
    [2, 2],
    [1, 3],
    [0, 4],
    [1, 4],
    [0, 3],
  ],
  people: [
    [1, 0],
    [1, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [4, 0],
    [4, 1],
    [3, 2],
    [4, 2],
    [1, 4],
    [3, 4],
  ],
} as const;

export type PixelIconName = keyof typeof ICONS;

export function PixelIcon({
  name,
  className,
}: {
  name: PixelIconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-5 shrink-0", className)}
    >
      {ICONS[name].map(([col, row]) => (
        <rect
          key={`${col}-${row}`}
          x={cell(col)}
          y={cell(row)}
          width={CELL}
          height={CELL}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
