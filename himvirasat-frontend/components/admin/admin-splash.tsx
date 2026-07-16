import { LogoMark } from "@/components/decor/logo-mark";
import { Ridgeline } from "@/components/decor/ridgeline";
import { site } from "@/lib/site";

export function AdminSplash() {
  return (
    <div className="relative grid min-h-svh place-items-center overflow-hidden bg-background">
      <div className="flex flex-col items-center">
        <LogoMark size={48} />
        <p className="mt-3 font-display text-xl">HimVirasat</p>
        <p
          aria-hidden
          className="mt-0.5 font-takri text-xs leading-none text-marigold-deep"
        >
          {site.takriName}
        </p>
        <p className="mt-5 text-sm text-muted-foreground motion-safe:animate-pulse">
          Verifying session…
        </p>
      </div>
      <Ridgeline className="absolute bottom-0 inset-x-0 text-foreground opacity-15" />
    </div>
  );
}
