import Image from "next/image";

import { Ridgeline } from "@/components/decor/ridgeline";

export function AdminSplash() {
  return (
    <div className="relative grid min-h-svh place-items-center overflow-hidden bg-background">
      <div className="flex flex-col items-center">
        <Image
          src="/virasat.png"
          alt=""
          width={48}
          height={48}
          className="rounded-lg"
          priority
        />
        <p className="mt-3 font-display text-xl">HimVirasat</p>
        <p aria-hidden className="font-deva text-xs text-saffron-deep">
          हिमविरासत
        </p>
        <p className="mt-5 text-sm text-muted-foreground motion-safe:animate-pulse">
          Verifying session…
        </p>
      </div>
      <Ridgeline className="absolute inset-x-0 bottom-0 text-primary/25" />
    </div>
  );
}
