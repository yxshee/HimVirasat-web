import { cn } from "@/lib/utils";

import type {
  ContributionStatus,
  ReviewCommentStatus,
} from "@/types/admin/FSM/contribution-rules";

type BadgeStatus =
  | ContributionStatus
  | ReviewCommentStatus
  | "active"
  | "inactive";

/**
 * Colour rides in the dot, never in the fill. Settled states get a solid
 * foreground dot; states needing attention get an earth tone, which reads
 * as "look at this" without a warm accent surviving elsewhere in the
 * palette. Rejection keeps destructive red — that one is semantic.
 */
const STATUS_CONFIG: Record<BadgeStatus, { label: string; dot: string }> = {
  under_review: { label: "Under Review", dot: "bg-glacier-500" },
  approved: { label: "Approved", dot: "bg-foreground" },
  flagged: { label: "Flagged", dot: "bg-clay-600" },
  rejected: { label: "Rejected", dot: "bg-destructive" },
  open: { label: "Open", dot: "bg-clay-400" },
  resolved: { label: "Resolved", dot: "bg-foreground" },
  active: { label: "Active", dot: "bg-foreground" },
  inactive: { label: "Inactive", dot: "bg-muted-foreground" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: BadgeStatus;
  className?: string;
}) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "animate-pop-in border-border bg-secondary text-foreground font-mono text-eyebrow inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 uppercase",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
