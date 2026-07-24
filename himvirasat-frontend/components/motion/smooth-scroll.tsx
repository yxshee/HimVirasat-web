"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";

import { ScrollTrigger, gsap } from "@/lib/gsap";

/**
 * Smoothed scrolling, and the reason the scrubbed hero feels continuous
 * rather than stepped.
 *
 * Lenis is driven from GSAP's ticker rather than its own rAF loop, and
 * ScrollTrigger is updated from Lenis's scroll event. Without that
 * handshake the two run on separate clocks and scrub-linked animation
 * visibly lags the page by a frame.
 *
 * Deliberately mounted on the public pages only. The admin dashboard has
 * data tables and a review queue where taking over the wheel makes the
 * page harder to use, not nicer.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [reduced, setReduced] = useState(true);

  // Starts `true` so the first paint never smooth-scrolls; the effect
  // relaxes it only when the user has expressed no preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;

    // Captured once: the cleanup must detach from the same instance it
    // attached to, and by teardown the ref may already point elsewhere.
    // Child refs are assigned before parent effects run, so this is set.
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => {
      // GSAP's ticker reports seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    // Lag smoothing lets GSAP skip ahead after a stall, which desynchronises
    // a scrubbed timeline from the actual scroll position.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
      {children}
    </ReactLenis>
  );
}
