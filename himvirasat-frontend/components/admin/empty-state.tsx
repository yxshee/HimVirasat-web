import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-dashed border-border p-10 text-center",
        className
      )}
    >
      {Icon ? (
        <div
          aria-hidden
          className="mx-auto grid size-12 place-items-center rounded-md border border-border bg-secondary text-muted-foreground"
        >
          <Icon className="size-5" />
        </div>
      ) : null}
      <h3 className={cn("font-display text-lg", Icon && "mt-4")}>{title}</h3>
      {description ? (
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
