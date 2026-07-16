import Image from "next/image";
import Link from "next/link";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { Coin } from "@/components/decor/coin";
import { PahariBand } from "@/components/decor/pahari-band";
import { Ridgeline } from "@/components/decor/ridgeline";
import { site } from "@/lib/site";

export default function AdminPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[45%_1fr]">
      {/* Brand panel (desktop) */}
      <div className="surface-ink accent-marigold relative hidden overflow-hidden lg:flex flex-col justify-between p-10 border-r border-border">
        <Link
          href="/"
          className="relative z-10 text-sm opacity-80 transition-opacity hover:opacity-100"
        >
          &larr; Back to HimVirasat
        </Link>

        <div className="relative z-10">
          <Image
            src="/virasat.png"
            alt=""
            width={56}
            height={56}
            className="rounded-lg"
            priority
          />
          <p className="mt-4 font-display text-4xl">HimVirasat</p>
          <p aria-hidden className="mt-1 font-deva text-lg text-marigold-deep">
            हिमविरासत
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        </div>

        {/* Spacer keeps the stack clear of the ridgeline. */}
        <div aria-hidden className="h-16 sm:h-24" />
        <Coin
          glyph="हि"
          fill="var(--marigold)"
          tilt={-8}
          size={120}
          className="absolute right-8 bottom-24 opacity-90"
        />
        <Ridgeline
          variant="shivalik"
          className="absolute bottom-0 inset-x-0 text-foreground opacity-20"
        />
      </div>

      {/* Sign-in panel */}
      <main className="grid place-items-center bg-background p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="inline-flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2 shadow-brut-sm">
              <Image
                src="/virasat.png"
                alt=""
                width={36}
                height={36}
                className="rounded-md"
                priority
              />
              <div>
                <p className="font-display text-lg leading-tight">
                  HimVirasat
                </p>
                <p aria-hidden className="font-deva text-xs text-marigold-deep">
                  हिमविरासत
                </p>
              </div>
            </div>
            <PahariBand className="mt-4" />
          </div>
          <AdminLoginForm />
        </div>
      </main>
    </div>
  );
}
