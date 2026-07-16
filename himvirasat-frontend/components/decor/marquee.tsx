import { Fragment } from "react";

import { cn } from "@/lib/utils";

/**
 * Auto-scrolling ornament strip. Pauses on hover; static row under
 * prefers-reduced-motion (CSS in globals). Callers style the band
 * (e.g. "bg-marigold text-black border-y border-border py-3").
 */
export function Marquee({
  items,
  separator = "◆",
  speed = 30,
  className,
}: {
  items: React.ReactNode[];
  separator?: string;
  speed?: number;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="px-5 whitespace-nowrap">{item}</span>
          <span aria-hidden className="px-1 text-sm">
            {separator}
          </span>
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className={cn("marquee", className)}>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
