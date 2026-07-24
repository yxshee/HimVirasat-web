import {
  Inter,
  Noto_Sans_Takri,
  Noto_Serif_Devanagari,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";

/** Body copy. */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Display sizes only — headings, wordmark, section titles. */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

/** Uppercase eyebrows and field labels. */
export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
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
  inter.variable,
  spaceGrotesk.variable,
  spaceMono.variable,
  notoSerifDevanagari.variable,
  notoSansTakri.variable,
].join(" ");
