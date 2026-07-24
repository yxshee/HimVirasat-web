import { cn } from "@/lib/utils";

/**
 * Brand mark: a ridgeline built from mosaic tiles, stepping down the
 * flame ramp from the summit. Same square unit as `PixelIcon` and
 * `TakriMosaic`. Decorative — adjacent text always names the brand.
 */

/** [column, row, flame step] on a 4×4 lattice, origin top-left. */
const TILES: Array<[number, number, number]> = [
  [2, 0, 0],
  [1, 1, 0],
  [2, 1, 1],
  [0, 2, 1],
  [1, 2, 2],
  [2, 2, 2],
  [3, 2, 3],
  [0, 3, 2],
  [1, 3, 3],
  [2, 3, 3],
  [3, 3, 4],
];

const FLAME = ["#ffaf01", "#ff8204", "#ff5229", "#e51300", "#b31000"];

export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn("shrink-0 select-none", className)}
    >
      {TILES.map(([col, row, step]) => (
        <rect
          key={`${col}-${row}`}
          x={col * 8}
          y={row * 8}
          width={8}
          height={8}
          fill={FLAME[step]}
        />
      ))}
    </svg>
  );
}
