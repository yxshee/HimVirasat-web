"use client";

import { useRef, useState } from "react";

import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/**
 * A hairline that fills as the rail's section scrolls past.
 *
 * It finds its own section by walking up from the element rather than
 * taking a ref prop, so `StickyRailSection` stays a server component and
 * only this bar ships as client JS.
 *
 * The label is driven off the same progress value — reporting the number
 * costs nothing extra and gives the bar meaning when it is the only thing
 * moving on screen.
 */
export function RailProgress() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.current?.closest("section");
        if (!section || !bar.current) return;

        const trigger = ScrollTrigger.create({
          trigger: section,
          // Measured against the viewport centre, not its top and bottom.
          // These sections are 837px tall against a 900px viewport, so
          // "top top" → "bottom bottom" collapsed to a 1px range and the
          // bar sat at 0% the whole way down. Centre-to-centre is always
          // exactly the section's own height.
          start: "top center",
          end: "bottom center",
          onUpdate: (self) => {
            gsap.set(bar.current, { scaleX: self.progress });
            setPercent(Math.round(self.progress * 100));
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="rail-progress mt-6">
      <div className="bg-border h-px w-full overflow-hidden">
        <div
          ref={bar}
          /* `scaleX` animates on the compositor; `width` would lay out
             every frame. Origin-left so it grows rather than centres. */
          className="bg-verdant h-px w-full origin-left scale-x-0"
        />
      </div>
      <p className="text-eyebrow text-muted-foreground mt-2 tabular-nums">
        {percent}%
      </p>
    </div>
  );
}
