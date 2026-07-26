"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point for GSAP and its plugins.
 *
 * Registering more than once is harmless but the import graph is easier to
 * follow with one owner, and `useGSAP` must be registered as a plugin for
 * its context cleanup to work under React StrictMode's double-invoke.
 *
 * Guarded on `window` because ScrollTrigger touches document during
 * registration and this module is imported from components that Next
 * renders on the server first.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
