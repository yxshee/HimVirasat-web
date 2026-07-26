"use client";

import { useEffect, useRef, useState } from "react";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Survives the template re-mounting between routes and resets on a hard
 * load, which is exactly the distinction we need — but it is only ever
 * read or written inside an effect. Module scope on a component that
 * server-renders is per *server process*, not per request: reading it
 * during render made the server emit the entrance class for every visitor
 * after the first one, which is precisely the bug this is meant to avoid.
 */
let navigated = false;

/**
 * A template re-mounts on every navigation, which is what makes the
 * entrance replay per route. A layout would mount once and never repeat.
 *
 * Wraps only the page body — the navbar lives in the layout above, so its
 * `position: fixed` is not captured by this element's transform.
 *
 * The transform is why this is a client component, and why it is skipped on
 * the first load. While `page-in` runs, this element is translated and
 * scaled, and every descendant measures its position inside that
 * transformed box — ScrollTrigger builds its start/end offsets on mount,
 * mid-animation, and maps the hero's scrub to the wrong scroll range. A
 * refresh afterwards repairs it, but on a reload that restores scroll deep
 * into the page you see the wrong frame first and then a jump. A page
 * *transition* means nothing on a hard load anyway: there is no previous
 * page to come from.
 */
export default function PublicTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  // Always false for the server render and the hydrating one, so the
  // markup matches. The first template to mount in a browser session is
  // the initial load; every one after it is a client-side navigation, and
  // only those turn the entrance on.
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (navigated) setAnimate(true);
    navigated = true;
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !animate) return;

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
    { scope: root, dependencies: [animate] },
  );

  return (
    <div ref={root} className={animate ? "animate-page-in" : undefined}>
      {children}
    </div>
  );
}
