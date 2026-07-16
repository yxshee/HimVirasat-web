import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "HimVirasat — Open language preservation for Himachal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PINE_BG = "#14231f";
const RIDGE_FAR = "#1a2e28";
const RIDGE_MID = "#1d332c";
const RIDGE_NEAR = "#24413a";
const PAPER = "#ece9df";
const SAFFRON = "#e8a33d";
const SAGE = "#9fb3a4";

async function loadEczar(): Promise<ArrayBuffer> {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Eczar:wght@600&subset=devanagari",
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
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        padding: "0 96px",
        backgroundColor: PINE_BG,
        fontFamily: withDevanagari ? "Eczar" : "serif",
      }}
    >
      <svg
        width="1200"
        height="240"
        viewBox="0 0 1200 240"
        style={{ position: "absolute", bottom: 0, left: 0 }}
      >
        <path
          d="M0 120 L160 60 L330 130 L500 40 L680 140 L860 70 L1030 130 L1200 80 L1200 240 L0 240 Z"
          fill={RIDGE_FAR}
        />
        <path
          d="M0 170 L210 100 L380 165 L540 90 L720 180 L900 115 L1060 175 L1200 130 L1200 240 L0 240 Z"
          fill={RIDGE_MID}
        />
        <path
          d="M0 215 L180 155 L350 210 L560 140 L770 220 L950 165 L1200 210 L1200 240 L0 240 Z"
          fill={RIDGE_NEAR}
        />
      </svg>

      <div
        style={{
          display: "flex",
          width: 112,
          height: 8,
          borderRadius: 4,
          backgroundColor: SAFFRON,
          marginBottom: 44,
        }}
      />

      {withDevanagari ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              lineHeight: 1.15,
              color: PAPER,
            }}
          >
            {site.nativeName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              marginTop: 8,
              color: SAFFRON,
            }}
          >
            {site.name}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            fontSize: 108,
            lineHeight: 1.1,
            color: PAPER,
          }}
        >
          {site.name}
        </div>
      )}

      <div
        style={{
          display: "flex",
          fontSize: 30,
          marginTop: 28,
          color: SAGE,
        }}
      >
        Open language preservation for Himachal
      </div>
    </div>
  );
}

export default async function OpengraphImage() {
  try {
    const eczar = await loadEczar();
    return new ImageResponse(composition(true), {
      ...size,
      fonts: [{ name: "Eczar", data: eczar, style: "normal", weight: 600 }],
    });
  } catch {
    // Font fetch failed — satori cannot shape Devanagari without a loaded
    // font, so fall back to a Latin-only composition with system serif.
    return new ImageResponse(composition(false), size);
  }
}
