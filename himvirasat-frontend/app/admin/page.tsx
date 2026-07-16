import Image from "next/image";
import Link from "next/link";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { PahariBand } from "@/components/decor/pahari-band";
import { Ridgeline } from "@/components/decor/ridgeline";
import { site } from "@/lib/site";

export default function AdminPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[45%_1fr]">
      {/* Brand panel (desktop) */}
      <div className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
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
            className="rounded-xl"
            priority
          />
          <p className="mt-4 font-display text-4xl">HimVirasat</p>
          <p aria-hidden className="mt-1 font-deva text-lg opacity-80">
            हिमविरासत
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
            {site.description}
          </p>
        </div>

        {/* Spacer keeps the stack clear of the ridgeline. */}
        <div aria-hidden className="h-16 sm:h-24" />
        <Ridgeline
          variant="shivalik"
          className="absolute inset-x-0 bottom-0 text-primary-foreground/15"
        />
      </div>

      {/* Sign-in panel */}
      <main className="relative grid place-items-center bg-background p-6">
        <div
          aria-hidden
          className="texture-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-overlay"
        />
        <div className="relative w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <Image
                src="/virasat.png"
                alt=""
                width={36}
                height={36}
                className="rounded-lg"
                priority
              />
              <div>
                <p className="font-display text-lg leading-tight">
                  HimVirasat
                </p>
                <p aria-hidden className="font-deva text-xs text-saffron-deep">
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
