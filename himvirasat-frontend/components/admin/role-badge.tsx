import { cn } from "@/lib/utils";

import type { SystemRole } from "@/types/admin/contribution-types";

/**
 * Colour rides in the dot, never in the fill: the label keeps full
 * foreground contrast and the badge stays legible in both themes.
 */
const ROLE_CONFIG: Record<SystemRole, { label: string; dot: string }> = {
  super_admin: { label: "Super Admin", dot: "bg-pine-700" },
  language_head: { label: "Language Head", dot: "bg-glacier-500" },
  language_expert: { label: "Language Expert", dot: "bg-pine-100" },
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
        "animate-pop-in border-border bg-secondary text-foreground font-mono text-eyebrow inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 uppercase",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
