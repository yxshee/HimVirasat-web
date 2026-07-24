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
 * foreground dot; states still needing attention get a flame step.
 */
const STATUS_CONFIG: Record<BadgeStatus, { label: string; dot: string }> = {
  under_review: { label: "Under Review", dot: "bg-azure" },
  approved: { label: "Approved", dot: "bg-foreground" },
  flagged: { label: "Flagged", dot: "bg-flame-orange" },
  rejected: { label: "Rejected", dot: "bg-flame-red" },
  open: { label: "Open", dot: "bg-flame-amber" },
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
        "border-border bg-secondary text-foreground font-mono text-eyebrow inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 uppercase",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
