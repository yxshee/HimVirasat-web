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
    classes: "bg-lavender text-black border-border",
  },
  approved: {
    label: "Approved",
    classes: "bg-teal text-black border-border",
  },
  flagged: {
    label: "Flagged",
    classes: "bg-marigold text-black border-border",
  },
  rejected: {
    label: "Rejected",
    classes: "bg-madder text-white border-border",
  },
  open: {
    label: "Open",
    dot: true,
    classes: "bg-marigold text-black border-border",
  },
  resolved: {
    label: "Resolved",
    classes: "bg-teal text-black border-border",
  },
  active: {
    label: "Active",
    dot: true,
    classes: "bg-teal text-black border-border",
  },
  inactive: {
    label: "Inactive",
    classes: "bg-muted text-foreground border-border",
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
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            status === "rejected" ? "bg-white/60" : "bg-black/40"
          )}
        />
      ) : null}
      {config.label}
    </span>
  );
}
