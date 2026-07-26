"use client";

import { useRef } from "react";

import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/**
 * Blocks fall in and settle as the section reaches the viewport — land,
 * squash to 95%, overshoot to 102%, rest. Matching the reference's
 * `bento-fall`, which it applies to card grids on a `ScrollTrigger.batch`.
 *
 * It renders one plain div and selects into it, so it can either *be* the
 * grid (pass the grid classes as `className`) or wrap one. Never put a
 * bare div between a ruled grid and its cells: the hairlines are a 1px
 * gap showing the container colour, so the cells must stay direct
 * children of the element carrying `grid`.
 */
export function StaggerIn({
  children,
  selector = ".ruled-cell",
  className,
}: {
  children: React.ReactNode;
  /** Descendants to stagger. Must not be the grid element itself. */
  selector?: string;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(selector, root.current);
        if (!items.length) return;

        gsap.set(items, { opacity: 0, y: -60 });

        const triggers = ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              stagger: 0.06,
              ease: "power2.in",
              keyframes: [
                { opacity: 1, y: 0, scaleY: 1, duration: 0.25 },
                { scaleY: 0.95, duration: 0.08 },
                { scaleY: 1.02, duration: 0.08 },
                { scaleY: 1, duration: 0.09 },
              ],
            }),
        });

        return () => triggers.forEach((t) => t.kill());
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [selector] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
