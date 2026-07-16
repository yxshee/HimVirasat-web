import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Coin } from "@/components/decor/coin";

export default function NotFound() {
  return (
    <section className="surface-ink accent-pink relative flex min-h-svh items-center justify-center overflow-hidden">
      <Coin
        glyph="हि"
        fill="var(--pink)"
        tilt={12}
        size={90}
        className="absolute right-[12%] top-[15%] hidden md:block"
      />

      <main className="relative z-10 mx-auto max-w-xl px-6 py-16 text-center">
        <p
          aria-hidden
          className="text-brut font-deva text-[8rem] leading-none text-foreground md:text-[12rem]"
        >
          ४०४
        </p>
        <h1 className="mt-6 font-display text-2xl md:text-3xl">
          Error 404 — Lost in the clouds?
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
          The trail you&apos;re looking for doesn&apos;t exist. It might have
          been moved or renamed in our heritage archives.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Return to basecamp</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/vocabulary">Search the vocabulary</Link>
          </Button>
        </div>
      </main>
    </section>
  );
}
