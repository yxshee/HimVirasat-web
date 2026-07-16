import { cn } from "@/lib/utils";

import type { SystemRole } from "@/types/admin/FSM/contribution-rules";

const ROLE_CONFIG: Record<SystemRole, { label: string; classes: string }> = {
  super_admin: {
    label: "Super Admin",
    classes: "bg-saffron/15 text-saffron-deep border-saffron/30",
  },
  language_head: {
    label: "Language Head",
    classes: "bg-primary/10 text-primary border-primary/25",
  },
  language_expert: {
    label: "Language Expert",
    classes: "bg-info/10 text-info border-info/25",
  },
};

export function RoleBadge({
  role,
  className,
}: {
  role: SystemRole;
  className?: string;
}) {
  const config = ROLE_CONFIG[role];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
}
