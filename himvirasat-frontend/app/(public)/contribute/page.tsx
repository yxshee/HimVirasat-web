import type { Metadata } from "next";

import DialectCard from "@/components/dialects/DialectCard";
import { Coin } from "@/components/decor/coin";
import { SectionHeading } from "@/components/decor/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { devToTankri } from "@/lib/transliteration/devToTankri";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Contribute translation sentences in your Himachali dialect through simple forms.",
};

const dialects = [
  {
    id: "kangri",
    name: "Kangri",
    formUrl: "https://forms.gle/fgENxd2t5a62vuBSA",
  },
  {
    id: "mandeali",
    name: "Mandeali",
    formUrl: "https://forms.gle/ApxgyyQGswns7uwM8",
  },
  {
    id: "kullvi",
    name: "Kullvi",
    formUrl: "https://forms.gle/Gnecc3PWtYFz4v7w6",
  },
  {
    id: "mahasuvi_western",
    name: "Mahasuvi (Western)",
    formUrl: "https://forms.gle/dgPsVoDyhW8hGG1n9",
  },
  {
    id: "mahasuvi_eastern",
    name: "Mahasuvi (Eastern)",
    formUrl: "https://forms.gle/2aec4T8BYCGdv5vy9",
  },
  {
    id: "kinnauri",
    name: "Kinnauri",
    formUrl: "https://forms.gle/ptALNWptVu7PFcN4A",
  },
];

const steps = [
  {
    numeral: "𑛁",
    title: "Pick your dialect",
    line: "Choose your dialect from the plaques below.",
    tilt: -6,
    fill: "var(--marigold)",
  },
  {
    numeral: "𑛂",
    title: "Write everyday sentences",
    line: "Write the words you use every day, with their Hindi translations, in the Google Form.",
    tilt: 0,
    fill: "var(--pink)",
  },
  {
    numeral: "𑛃",
    title: "Reviewed & credited",
    line: "Every contribution is tracked and verified, and contributors are recognized and credited.",
    tilt: 6,
    fill: "var(--teal)",
  },
];

const cardAccents = [
  "accent-pink",
  "accent-marigold",
  "accent-teal",
  "accent-madder",
  "accent-lavender",
  "accent-pink",
];

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 md:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Contribute"
        nativeEcho={devToTankri("योगदान")}
        title="Language & Translation Contributions"
      />

      <div className="mt-8 max-w-2xl space-y-4 leading-7 text-muted-foreground">
        <p>
          Choose your dialect below and contribute parallel sentences to help
          build open Hindi ↔ Himachali translation datasets for research,
          education, and language tools.
        </p>

        <h2 className="pt-6 font-display text-2xl text-foreground">
          Your Words Matter
        </h2>

        <p>
          Every word you contribute helps keep Himachal’s languages alive in
          the digital world. Even a single word or sentence from your dialect
          is valuable. It captures how people actually speak, something no book
          or machine can recreate.
        </p>

        <p>
          All contributions to HimVirasat are carefully tracked and verified,
          ensuring that your effort is never lost or overlooked. As the project
          grows, contributors will be recognized and credited across our
          official platforms, including the HimVirasat website, our official
          Discord server, and community posts on Reddit.
        </p>

        <p>
          You don’t need to be an expert. Just write the words you use every
          day that’s how a language truly lives on.
        </p>

        <blockquote className="border-l-4 border-foreground bg-secondary p-6 font-display text-xl text-foreground">
          One word today can preserve a language tomorrow.
        </blockquote>
      </div>

      <section aria-label="How contributing works" className="mt-16 md:mt-20">
        <ol className="relative grid gap-8 sm:grid-cols-3 sm:before:absolute sm:before:top-8 sm:before:right-0 sm:before:left-0 sm:before:h-px sm:before:bg-border">
          {steps.map((step) => (
            <li key={step.title}>
              <Coin
                glyph={step.numeral}
                script="takri"
                size={64}
                tilt={step.tilt}
                fill={step.fill}
                className="relative bg-background"
              />
              <h3 className="mt-3 font-display text-lg">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {step.line}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Dialect forms" className="mt-16 md:mt-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dialects.map((dialect, index) => (
            <Reveal
              as="li"
              key={dialect.id}
              delay={index * 80}
              className={`h-full ${cardAccents[index % cardAccents.length]}`}
            >
              <DialectCard name={dialect.name} formUrl={dialect.formUrl} />
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
