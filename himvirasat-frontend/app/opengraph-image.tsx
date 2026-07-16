import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "HimVirasat — Open language preservation for Himachal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#f4f4f0";
const INK = "#000000";
const MARIGOLD = "#ffc900";
const MUTED = "#52524e";

/* Sawtooth zigzag: 19 teeth across a 1140-unit viewBox, stretched to fit. */
const ZIGZAG = `M0,40 ${Array.from(
  { length: 19 },
  (_, i) => `L${i * 60 + 30},0 L${i * 60 + 60},40`
).join(" ")} Z`;

async function loadGoogleFont(family: string): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((res) => res.text());
  const match = css.match(/url\((https:[^)]+\.(?:ttf|woff))\)/);
  if (!match) throw new Error("No usable font URL in Google Fonts CSS");
  const font = await fetch(match[1]);
  if (!font.ok) throw new Error("Font download failed");
  return font.arrayBuffer();
}

function composition(withDevanagari: boolean) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        padding: "0 96px",
        backgroundColor: CREAM,
        fontFamily: withDevanagari ? "Space Grotesk" : "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          right: 32,
          bottom: 32,
          border: `2px solid ${INK}`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: MARIGOLD,
            border: `2px solid ${INK}`,
            borderRadius: 999,
            padding: "10px 24px",
            fontSize: 22,
            letterSpacing: 2,
            color: INK,
          }}
        >
          OPEN LANGUAGE PRESERVATION
        </div>

        {withDevanagari ? (
          <div
            style={{
              display: "flex",
              fontFamily: "Noto Serif Devanagari",
              fontSize: 120,
              lineHeight: 1.2,
              marginTop: 20,
              color: INK,
            }}
          >
            {site.nativeName}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            fontSize: 48,
            marginTop: withDevanagari ? 4 : 36,
            color: INK,
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 20,
            color: MUTED,
          }}
        >
          Open language preservation for Himachal
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 220,
          height: 220,
          borderRadius: 220,
          backgroundColor: MARIGOLD,
          border: `8px solid ${INK}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 168,
            height: 168,
            borderRadius: 168,
            border: `2px solid ${INK}`,
            fontFamily: withDevanagari ? "Noto Serif Devanagari" : "sans-serif",
            fontSize: 90,
            color: INK,
          }}
        >
          {withDevanagari ? "हि" : null}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          bottom: 34,
          height: 40,
          display: "flex",
        }}
      >
        <svg
          width="100%"
          height="40"
          viewBox="0 0 1140 40"
          preserveAspectRatio="none"
        >
          <path d={ZIGZAG} fill={INK} />
        </svg>
      </div>
    </div>
  );
}

export default async function OpengraphImage() {
  try {
    const [deva, grotesk] = await Promise.all([
      loadGoogleFont("Noto+Serif+Devanagari:wght@600&subset=devanagari"),
      loadGoogleFont("Space+Grotesk:wght@500"),
    ]);
    return new ImageResponse(composition(true), {
      ...size,
      fonts: [
        {
          name: "Noto Serif Devanagari",
          data: deva,
          style: "normal",
          weight: 600,
        },
        { name: "Space Grotesk", data: grotesk, style: "normal", weight: 500 },
      ],
    });
  } catch {
    // Font fetch failed — satori cannot shape Devanagari without a loaded
    // font, so fall back to a Latin-only composition with system fonts.
    return new ImageResponse(composition(false), size);
  }
}
