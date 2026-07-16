import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatCard({
  title,
  value,
  icon: Icon,
  hint,
  loading,
}: {
  title: string;
  value: number | string | undefined;
  icon: LucideIcon;
  hint?: string;
  loading?: boolean;
}) {
  return (
    <Card className="shadow-card">
      <CardContent className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{title}</p>
          {loading ? (
            <Skeleton className="mt-2 h-9 w-16" />
          ) : (
            <p className="font-display text-4xl tabular-nums">{value ?? "—"}</p>
          )}
          {hint ? (
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
        <div
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"
        >
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}
