import {
  Mukta,
  Noto_Sans_Takri,
  Noto_Serif_Devanagari,
  Space_Grotesk,
} from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const mukta = Mukta({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "devanagari"],
  variable: "--font-mukta",
  display: "swap",
});

export const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-serif-deva",
  display: "swap",
  preload: false,
});

export const notoSansTakri = Noto_Sans_Takri({
  weight: "400",
  subsets: ["takri"],
  variable: "--font-noto-takri",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  spaceGrotesk.variable,
  mukta.variable,
  notoSerifDevanagari.variable,
  notoSansTakri.variable,
].join(" ");
