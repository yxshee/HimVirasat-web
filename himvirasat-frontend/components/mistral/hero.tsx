"use client";

import { useRef } from "react";

import { ArrowRow } from "@/components/mistral/arrow-row";
import { Eyebrow } from "@/components/mistral/eyebrow";
import { ScrollCue } from "@/components/mistral/scroll-cue";
import { TakriMosaic } from "@/components/mistral/takri-mosaic";
import { gsap, useGSAP } from "@/lib/gsap";
import { makeRng, seedFromString } from "@/lib/seeded-rng";
import { devToTankri } from "@/lib/transliteration/devToTankri";

/**
 * Two viewports tall, with the first one pinned and every property
 * scrubbed by scroll position rather than by time.
 *
 * Scrolling collapses the left column carrying the headline and the
 * mosaic, while the right sidebar expands to fill the viewport and its
 * copy settles into the centre. Nothing here plays on a timer: the
 * timeline's playhead *is* the scroll position, which is why earlier
 * CSS-keyframe versions could never match it however they were tuned.
 *
 * Below `lg`, and whenever reduced motion is requested, no timeline is
 * built at all and the hero is simply two stacked blocks.
 */

const HEADLINE = "Himachal speaks in many tongues. We are writing them down.";

const HEADLINE_LINES = [
  "Himachal speaks in many",
  "tongues. We are writing",
  "them down.",
];

const MISSION = [
  "An initiative driven by the community to preserve",
  "Himachal Pradesh's languages, dialects, traditions",
  "and cultural memory, and bring them into the digital age.",
];

const FEATURED = {
  label: "Mandeali vocabulary is live",
  description: "The first dialect archive is open to search.",
  href: "/vocabulary/mandeali",
};

/** Characters rise from behind a per-line mask on load; delays are seeded. */
function buildLines(text: string, lines: string[]) {
  const rng = makeRng(seedFromString(text));
  return lines.map((line, li) => ({
    line,
    lineDelay: li * 90,
    chars: Array.from(line).map((ch, ci) => ({
      ch,
      delay: li * 90 + Math.round(ci * (1 + rng() * 4) * 5),
    })),
  }));
}

export function Hero() {
  const lines = buildLines(HEADLINE, HEADLINE_LINES);

  const root = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLParagraphElement>(null);
  const leftTop = useRef<HTMLDivElement>(null);
  const leftTopInner = useRef<HTMLDivElement>(null);
  const leftMiddle = useRef<HTMLDivElement>(null);
  const leftMiddleInner = useRef<HTMLDivElement>(null);
  const rightTop = useRef<HTMLDivElement>(null);
  const rightInner = useRef<HTMLDivElement>(null);
  const rightContent = useRef<HTMLDivElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Both conditions in one query: the scrub is desktop-only, and it is
      // never built when reduced motion is requested — so there is nothing
      // to tear down or reset in that case.
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const stickyEl = sticky.current;
          const contentEl = rightContent.current;
          if (!stickyEl || !contentEl || !root.current) return;

          const sentences = gsap.utils.toArray<HTMLElement>(
            ".js-hero-sentence",
            contentEl,
          );
          // Corner labels on the mosaic. They are positioned from the two
          // edges of a column that collapses, so they converge and clip
          // mid-word; fading them out early is cheaper than repositioning
          // them and matches how the reference's artwork labels leave.
          const labels = gsap.utils.toArray<HTMLElement>(
            ".js-hero-label",
            root.current,
          );

          /**
           * Measured, not hard-coded. The reference recomputes the same
           * values in `calcScrollEndPosition` and rebinds on resize;
           * deriving them from live rects rather than copying its
           * arithmetic keeps them correct for our own box model.
           *
           * The end targets are sampled with the panel *already at its end
           * size*, then reverted. Measuring them against the rest layout is
           * the mistake that put the mission copy at x = -1695 — off-screen
           * left — because the panel grows leftward from its right anchor
           * and downward, so the content's layout position at progress 1 is
           * nowhere near where it starts.
           *
           * The copy is `w-max whitespace-nowrap`, so its own box is the
           * same size in both samples and only its position moves.
           */
          const measure = () => {
            const panel = rightInner.current!;
            const style = getComputedStyle(panel);
            const padX = parseFloat(style.paddingLeft);
            const padB = parseFloat(style.paddingBottom);

            const s = stickyEl.getBoundingClientRect();
            const rest = panel.getBoundingClientRect();
            const c0 = contentEl.getBoundingClientRect();

            // The two collapsing columns, measured at rest. Their inner
            // wrappers are frozen at these widths for the whole scrub so
            // that animating the outer width to 0 clips rather than
            // re-wraps. Read the content box, since the padding stays on
            // the outer element.
            const innerWidths = [leftTopInner.current, leftMiddleInner.current].map(
              (el) => el?.getBoundingClientRect().width ?? 0,
            );

            // Sample the end state, then put it back.
            gsap.set(panel, {
              width: s.width,
              height: s.height,
              borderLeftWidth: 0,
              borderBottomWidth: 0,
            });
            const c1 = contentEl.getBoundingClientRect();
            const sentenceX = sentences.map((n) => {
              const r = n.getBoundingClientRect();
              return (c1.width - r.width) / 2 - (r.left - c1.left);
            });
            gsap.set(panel, {
              clearProps: "width,height,borderLeftWidth,borderBottomWidth",
            });

            // Copy is authored at display size and shrunk to fit the rail,
            // so scrolling grows it into a full-screen statement rather than
            // sliding body text around. Capped at 1 so a narrow desktop
            // fits the line instead of overflowing it.
            const startScale = (rest.width - padX * 2) / c0.width;
            const endScale = Math.min(1, (s.width - padX * 2) / c1.width);

            // Transform origin is the centre, so the visual centre is the
            // layout centre plus (x, y) whatever the scale — which is what
            // makes these two deltas independent of each other.
            return {
              width: s.width,
              height: s.height,
              startScale,
              endScale,
              // Rest: bottom-left of the rail, where the copy already sits.
              startX:
                rest.left +
                padX +
                (c0.width * startScale) / 2 -
                (c0.left + c0.width / 2),
              startY:
                rest.bottom -
                padB -
                (c0.height * startScale) / 2 -
                (c0.top + c0.height / 2),
              // End: dead centre of the pinned area.
              endX: s.left + s.width / 2 - (c1.left + c1.width / 2),
              endY: s.top + s.height / 2 - (c1.top + c1.height / 2),
              sentenceX,
              innerWidths,
            };
          };

          const inners = [leftTopInner.current, leftMiddleInner.current];

          let m = measure();

          // Freeze the collapsing columns' contents at their rest width.
          // Not part of the timeline: it is a constant for the whole scrub,
          // re-applied whenever the layout is remeasured.
          const pinInners = () =>
            inners.forEach((el, i) => gsap.set(el, { width: m.innerWidths[i] }));

          pinInners();

          const animated = [
            title.current,
            leftTop.current,
            leftMiddle.current,
            rightInner.current,
            rightTop.current,
            contentEl,
            background.current,
            arrow.current,
            cards.current,
            ...inners,
            ...sentences,
            ...labels,
          ];

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
              onRefreshInit: () => {
                // Measure from untransformed layout, otherwise a second
                // refresh measures the first refresh's own output. That
                // clear also releases the pinned inner widths, so they have
                // to be re-applied against the new measurement.
                gsap.set(animated, { clearProps: "all" });
                m = measure();
                pinInners();
              },
            },
          });

          tl.to(title.current, { y: () => -m.height * 0.5, duration: 1 }, 0)
            .to(
              [leftTop.current, leftMiddle.current],
              { width: 0, y: () => -m.height * 0.5, duration: 1 },
              0,
            )
            .to(
              rightInner.current,
              {
                borderLeftWidth: 0,
                borderBottomWidth: 0,
                width: () => m.width,
                height: () => m.height,
                duration: 1,
              },
              0,
            )
            .to(rightTop.current, { borderBottomWidth: 0, duration: 1 }, 0)
            .fromTo(
              contentEl,
              {
                x: () => m.startX,
                y: () => m.startY,
                scale: () => m.startScale,
                transformOrigin: "center center",
              },
              {
                x: () => m.endX,
                y: () => m.endY,
                scale: () => m.endScale,
                duration: 1,
              },
              0,
            )
            .fromTo(
              background.current,
              { opacity: 1 },
              { opacity: 0, duration: 1 },
              0,
            )
            .to(
              sentences,
              { x: (i: number) => m.sentenceX[i] ?? 0, duration: 1 },
              0,
            )
            .fromTo(
              arrow.current,
              { yPercent: 0 },
              { yPercent: -100, duration: 1 },
              0,
            )
            .fromTo(
              cards.current,
              { yPercent: 0 },
              { yPercent: 100, duration: 1 },
              0,
            )
            // Gone by the time the column is narrow enough to clip them.
            .fromTo(labels, { opacity: 1 }, { opacity: 0, duration: 0.2 }, 0);

          return () => tl.kill();
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-hero="root"
      className="border-border relative border-b lg:h-[200dvh]"
    >
      <div
        ref={sticky}
        className="lg:sticky lg:top-0 lg:h-dvh lg:overflow-hidden"
      >
        {/* Row 1 — headline and mission */}
        <div className="border-border flex flex-col border-b lg:relative lg:h-[60dvh] lg:flex-row">
          <div
            ref={leftTop}
            data-hero="left-top"
            className="flex shrink-0 flex-col justify-end overflow-hidden px-6 pt-16 pb-10 lg:w-[70%] lg:px-10 lg:pt-0"
          >
            {/* Everything that collapses lives inside a wrapper whose width
                is pinned in pixels while the timeline runs. The column
                animates to `width: 0` and clips; the wrapper never changes
                size, so the headline cannot re-wrap. Without this the
                paragraph reflowed to one character per line and grew from
                176px to 3293px tall, re-laid-out on every scroll frame. */}
            <div ref={leftTopInner} className="flex flex-col justify-end">
              <Eyebrow
                size="lg"
                nativeEcho={devToTankri("हिमाचल की विरासत")}
                className="mb-8"
              >
                Open language preservation
              </Eyebrow>

              {/* The real heading, for assistive tech and for search. The
                  animated copy is decorative: split to characters it would
                  be announced letter by letter. */}
              <h1 className="sr-only">{HEADLINE}</h1>
              <p
                ref={title}
                data-hero="title"
                aria-hidden
                className="font-display text-display-md md:text-display-xl max-w-4xl"
              >
                {lines.map(({ line, lineDelay, chars }, li) => (
                  <span
                    key={line}
                    className="hero-line hero-line-grow"
                    style={
                      { "--line-delay": `${lineDelay}ms` } as React.CSSProperties
                    }
                  >
                    {chars.map(({ ch, delay }, ci) => (
                      <span
                        key={`${li}-${ci}`}
                        className="hero-char"
                        style={
                          { "--char-delay": `${delay}ms` } as React.CSSProperties
                        }
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Taken out of the flex flow on desktop. As a flex sibling its
              right edge tracked the collapsing left column, so the panel's
              `right-0` anchor slid leftward with it and the expanded panel
              ended up at x = -1130 instead of covering the viewport. */}
          <div
            ref={rightTop}
            className="relative lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-[30%]"
          >
            {/* Anchored right, so growing its width expands leftward across
                the space the collapsing left column vacates. */}
            <div
              ref={rightInner}
              data-hero="right-inner"
              className="border-border flex h-full flex-col justify-end overflow-hidden border-t px-6 py-10 lg:absolute lg:top-0 lg:right-0 lg:w-full lg:border-t-0 lg:border-b lg:border-l lg:px-10"
            >
              <div ref={rightContent} className="hero-mission">
                {MISSION.map((line) => (
                  <p
                    key={line}
                    className="js-hero-sentence hero-mission-line text-body-lg text-muted-foreground will-change-transform"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {/* Tint that burns off as the panel takes over the viewport. */}
            <div
              ref={background}
              data-hero="background"
              aria-hidden
              className="bg-secondary pointer-events-none absolute inset-0 -z-10"
            />
          </div>
        </div>

        {/* Row 2 — mosaic, cue and one featured item */}
        <div className="flex flex-col lg:h-[40dvh] lg:flex-row">
          <div
            ref={leftMiddle}
            data-hero="left-middle"
            className="hero-fade-in relative shrink-0 overflow-hidden lg:w-[70%]"
          >
            {/* Pinned for the same reason as the headline: collapsing this
                column would otherwise re-lay the mosaic's 30-cell grid on
                every frame. `relative` so the corner labels still position
                against the mosaic rather than the column. */}
            <div ref={leftMiddleInner} className="relative">
              <TakriMosaic variant="hero" seed={7} />

              {/* On the reference these labels are painted inside the Lottie
                  artwork. Ours are real text on a solid chip, the only way to
                  stay legible over a mosaic containing both near-white and
                  deep pine. */}
              <Eyebrow className="js-hero-label bg-background pointer-events-none absolute bottom-3 left-3 px-2 py-0.5">
                Open language preservation
              </Eyebrow>
              <Eyebrow className="js-hero-label bg-background pointer-events-none absolute right-3 bottom-3 px-2 py-0.5">
                Himachal
              </Eyebrow>
            </div>
          </div>

          <div className="border-border flex flex-col justify-between overflow-hidden border-t lg:w-[30%] lg:border-t-0 lg:border-l">
            <div ref={arrow}>
              <ScrollCue className="items-start p-10" />
            </div>
            <div ref={cards} className="border-border border-t">
              <Eyebrow className="px-4 pt-5">Featured</Eyebrow>
              <ArrowRow
                href={FEATURED.href}
                label={FEATURED.label}
                description={FEATURED.description}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
