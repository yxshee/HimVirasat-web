import { cn } from "@/lib/utils";

/**
 * Shared page/section heading: saffron eyebrow, optional native-script echo,
 * editorial display title. The cohesion primitive used across every page.
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
            "flex items-baseline gap-3 text-xs font-semibold tracking-[0.2em] text-saffron-deep uppercase",
            centered && "justify-center",
          )}
        >
          {eyebrow}
          {nativeEcho && (
            <span
              aria-hidden
              className="font-deva text-sm font-normal tracking-normal normal-case opacity-80"
            >
              {nativeEcho}
            </span>
          )}
        </p>
      )}
      <Tag className="mt-3 font-display text-3xl tracking-tight text-balance md:text-4xl">
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
