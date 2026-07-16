import { cn } from "@/lib/utils";

const LOOPS: Array<{ d: string; opacity: number }> = [
  {
    d: "M280 200 C340 205 375 240 370 275 C365 315 320 330 275 325 C230 320 195 290 200 255 C205 222 235 198 280 200 Z",
    opacity: 0.1,
  },
  {
    d: "M280 160 C370 168 420 225 412 285 C404 350 330 372 262 364 C195 356 148 305 158 245 C167 190 215 154 280 160 Z",
    opacity: 0.09,
  },
  {
    d: "M285 118 C405 130 470 210 458 295 C446 388 340 418 245 405 C150 392 95 320 110 235 C124 158 190 108 285 118 Z",
    opacity: 0.07,
  },
  {
    d: "M560 300 C605 305 630 330 626 355 C622 384 585 396 550 392 C515 388 490 365 494 340 C498 316 522 296 560 300 Z",
    opacity: 0.1,
  },
  {
    d: "M560 262 C630 270 668 315 662 358 C655 408 595 428 540 420 C485 412 448 372 456 325 C463 285 505 256 560 262 Z",
    opacity: 0.08,
  },
  {
    d: "M300 70 C480 60 660 150 680 300 C700 450 560 530 380 520 C200 510 80 420 90 280 C100 150 180 78 300 70 Z",
    opacity: 0.06,
  },
  {
    d: "M310 30 C520 18 720 130 745 305 C770 490 590 585 375 572 C160 560 25 440 40 270 C53 120 155 40 310 30 Z",
    opacity: 0.05,
  },
];

/** Topographic contour lines — decorative backdrop, colored via currentColor. */
export function ContourField({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute h-full w-full", className)}
    >
      {LOOPS.map((loop, i) => (
        <path
          key={i}
          d={loop.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity={loop.opacity}
        />
      ))}
    </svg>
  );
}
