"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const FRAMES: Array<{ text: string; className: string; lang?: string }> = [
  { text: "हिमविरासत", className: "font-deva", lang: "hi" },
  { text: "HimVirasat", className: "font-display tracking-tight" },
  { text: "𑚩𑚮𑚢𑚦𑚮𑚤𑚭𑚨𑚙", className: "font-takri" },
];

/**
 * Continuously cycles the wordmark through Devanagari, Latin, and Takri.
 * Frames are stacked in one grid cell so the tallest defines layout — no
 * shift between scripts. Static under prefers-reduced-motion. The parent
 * heading should carry aria-label="HimVirasat"; frames are decorative.
 */
export function ScriptCycle({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setActive((v) => (v + 1) % FRAMES.length),
      2600,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <span aria-hidden className={cn("grid place-items-center", className)}>
      {FRAMES.map((frame, i) => (
        <span
          key={frame.text}
          lang={frame.lang}
          className={cn(
            "col-start-1 row-start-1 leading-tight transition-opacity duration-700",
            frame.className,
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          {frame.text}
        </span>
      ))}
    </span>
  );
}
