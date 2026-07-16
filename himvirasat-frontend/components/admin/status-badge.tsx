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

const STATUS_CONFIG: Record<
  BadgeStatus,
  { label: string; dot?: boolean; classes: string }
> = {
  under_review: {
    label: "Under Review",
    dot: true,
    classes: "bg-info/10 text-info border-info/25",
  },
  approved: {
    label: "Approved",
    classes: "bg-success/10 text-success border-success/25",
  },
  flagged: {
    label: "Flagged",
    classes: "bg-warning/10 text-warning border-warning/25",
  },
  rejected: {
    label: "Rejected",
    classes: "bg-destructive/10 text-destructive border-destructive/25",
  },
  open: {
    label: "Open",
    dot: true,
    classes: "bg-warning/10 text-warning border-warning/25",
  },
  resolved: {
    label: "Resolved",
    classes: "bg-success/10 text-success border-success/25",
  },
  active: {
    label: "Active",
    dot: true,
    classes: "bg-success/10 text-success border-success/25",
  },
  inactive: {
    label: "Inactive",
    classes: "bg-muted text-muted-foreground border-border",
  },
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        config.classes,
        className
      )}
    >
      {config.dot ? (
        <span aria-hidden className="size-1.5 rounded-full bg-current" />
      ) : null}
      {config.label}
    </span>
  );
}
