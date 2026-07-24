import Link from "next/link";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { LogoMark } from "@/components/mistral/logo-mark";
import { PixelIcon } from "@/components/mistral/pixel-icon";
import { TakriMosaic } from "@/components/mistral/takri-mosaic";
import { site } from "@/lib/site";

export default function AdminPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[45%_1fr]">
      {/* Brand panel (desktop) */}
      <div className="surface-ink border-ink-border relative hidden flex-col justify-between border-r lg:flex">
        <div className="flex flex-1 flex-col justify-between p-10">
          <Link
            href="/"
            className="text-nav inline-flex w-fit items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <PixelIcon name="chevron-left" className="size-4" />
            Back to HimVirasat
          </Link>

          <div>
            <LogoMark size={56} />
            <p className="font-display text-display-md mt-5">HimVirasat</p>
            <p
              aria-hidden
              className="font-takri mt-1 text-lg leading-none text-muted-foreground"
            >
              {site.takriName}
            </p>
            <p className="text-body-sm mt-6 max-w-md text-muted-foreground">
              {site.description}
            </p>
          </div>
        </div>

        <TakriMosaic variant="band" seed={53} />
      </div>

      {/* Sign-in panel */}
      <main className="bg-background grid place-items-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="border-border inline-flex items-center gap-3 rounded-md border px-3 py-2">
              <LogoMark size={36} />
              <div>
                <p className="font-display text-label leading-tight">
                  HimVirasat
                </p>
                <p
                  aria-hidden
                  className="font-takri text-muted-foreground mt-0.5 text-xs leading-none"
                >
                  {site.takriName}
                </p>
              </div>
            </div>
          </div>
          <AdminLoginForm />
        </div>
      </main>
    </div>
  );
}
