import { UserCog } from "lucide-react";

import { EmptyState } from "@/components/admin/empty-state";
import { PageHeader } from "@/components/admin/page-header";

export default function LanguageHeads() {
  return (
    <div className="space-y-8 p-6">
      <PageHeader title="Language Heads" />

      <EmptyState
        icon={UserCog}
        title="Language Head management is coming soon"
        description="Language Heads are currently provisioned directly by super admins. Creation, dialect assignment, and activity tracking will land here."
      />
    </div>
  );
}
