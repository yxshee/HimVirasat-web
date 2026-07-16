import { cn } from "@/lib/utils";

/**
 * Shared page/section heading: bordered accent chip eyebrow (with optional
 * native-script echo inside), giant grotesque title. Chip color follows the
 * nearest .accent-* wrapper; black text on the chip is always safe.
 */
export function SectionHeading({
  eyebrow,
  title,
  nativeEcho,
  description,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  nativeEcho?: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn(centered && "text-center", className)}>
      {(eyebrow || nativeEcho) && (
        <p
          className={cn(
            "bg-section-accent inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium tracking-[0.15em] text-black uppercase",
          )}
        >
          {eyebrow}
          {nativeEcho && (
            <span
              aria-hidden
              className="font-deva text-sm font-normal tracking-normal normal-case"
            >
              {nativeEcho}
            </span>
          )}
        </p>
      )}
      <Tag className="mt-5 font-display text-4xl font-medium tracking-tight text-balance md:text-6xl">
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-muted-foreground",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
