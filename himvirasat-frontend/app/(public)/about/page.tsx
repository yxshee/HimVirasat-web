import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TeamSection } from "@/components/about/team-section";
import { SectionHeading } from "@/components/decor/section-heading";
import { GlyphWatermark } from "@/components/decor/glyph-watermark";

export const metadata = {
  title: "About & Team",
  description:
    "From maintaining a digital archive to developing open-source Pahadi learning tools, HimVirasat is building the infrastructure for Himachal's digital future.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24 sm:pt-32">
      <header className="mx-auto max-w-5xl px-6">
        <SectionHeading
          as="h1"
          eyebrow="Our Vision"
          nativeEcho="दृष्टि"
          title="Bridging the gap between Heritage and Innovation."
        />
      </header>

      <section className="relative mt-16 overflow-hidden border-y border-border bg-card">
        <GlyphWatermark glyph="वि" className="-left-10 -top-20" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <h2 className="font-display text-2xl tracking-tight">
            Beyond Just Words
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            {`HimVirasat isn't just a dictionary; it's a technical ecosystem.`}{" "}
            From maintaining this digital archive to developing
            <strong className="font-semibold text-foreground">
              {" "}
              open-source Pahadi learning tools
            </strong>
            , we are building the infrastructure for Himachal’s digital future.
            Our vision scales from{" "}
            <strong className="font-semibold text-foreground">
              specialized LLMs (Large Language Models)
            </strong>{" "}
            to real-time{" "}
            <strong className="font-semibold text-foreground">
              dialect translators
            </strong>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-10 px-6 md:grid-cols-2 md:gap-12">
        <div className="border-t-2 border-saffron pt-6">
          <h3 className="font-display text-xl tracking-tight">
            Collaborative Engineering
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Currently, we use structured community forms to gather data. Soon,
            we will launch a
            <strong className="font-semibold text-foreground">
              {" "}
              dedicated contribution platform
            </strong>{" "}
            developed by our community, for our community.
          </p>
        </div>
        <div className="border-t-2 border-saffron pt-6">
          <h3 className="font-display text-xl tracking-tight">Open Learning</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We are committed to creating free tools that help the next
            generation learn their mother tongue, blending traditional
            knowledge with modern AI.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl px-6">
        <div className="rounded-2xl border border-primary/15 bg-primary/5 p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl tracking-tight">
            Become Part of the Movement
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Whether you are a native speaker, a linguist, or a developer—your
            contribution matters.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="outline">
              <Link href="/contribute">Contribute Data</Link>
            </Button>
            <Button asChild>
              <Link
                href="https://discord.gg/PgJWcFXRTB"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discord
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div id="team" className="mx-auto max-w-5xl scroll-mt-24 px-6">
        <TeamSection />
      </div>
    </div>
  );
}
