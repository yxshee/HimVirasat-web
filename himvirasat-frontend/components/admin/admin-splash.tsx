import { LogoMark } from "@/components/mistral/logo-mark";
import { site } from "@/lib/site";

export function AdminSplash() {
  return (
    <div className="bg-background grid min-h-svh place-items-center">
      <div className="flex flex-col items-center">
        <LogoMark size={48} />
        <p className="font-display text-title mt-4">HimVirasat</p>
        <p
          aria-hidden
          className="font-takri text-muted-foreground mt-1 text-xs leading-none"
        >
          {site.takriName}
        </p>
        <p className="text-body-sm text-muted-foreground mt-5 motion-safe:animate-pulse">
          Verifying session…
        </p>
      </div>
    </div>
  );
}
