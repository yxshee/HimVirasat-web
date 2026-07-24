"use client";

import { useRef } from "react";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * A template re-mounts on every navigation, which is what makes the
 * entrance replay per route. A layout would mount once and never repeat.
 *
 * Wraps only the page body — the navbar lives in the layout above, so its
 * `position: fixed` is not captured by this element's transform.
 *
 * The transform is also why this is a client component. While `page-in`
 * is running, this element is translated and scaled, and every descendant
 * measures its position inside that transformed box. ScrollTrigger builds
 * its start/end offsets on mount — which is mid-animation — so without a
 * refresh afterwards the hero's scrub is mapped to the wrong scroll
 * range. Measured before the fix: the timeline was still at progress 0 a
 * quarter of the way through the hero, then ran out early.
 */
export default function PublicTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      // `animationend` rather than a timeout: it fires only if the
      // animation actually ran, so under reduced motion (where the
      // keyframes are disabled) nothing is scheduled and the initial
      // untransformed measurement was already correct.
      const onEnd = (event: AnimationEvent) => {
        if (event.target !== el || event.animationName !== "page-in") return;
        ScrollTrigger.refresh();
      };

      el.addEventListener("animationend", onEnd);
      return () => el.removeEventListener("animationend", onEnd);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="animate-page-in">
      {children}
    </div>
  );
}
