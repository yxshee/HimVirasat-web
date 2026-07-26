"use client";

import { EmptyState } from "@/components/admin/empty-state";
import { ExpertTable } from "@/components/admin/experts/expert-table";
import { ExpertsToolbar } from "@/components/admin/experts/experts-header-toolbar";
import { PageHeader } from "@/components/admin/page-header";
import { UserService } from "@/lib/services/admin/user-service";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ExpertsPage() {
  const {
    data: experts = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["experts"],
    queryFn: UserService.getLanguageExperts,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  async function handleRemove(expertId: string) {
    try {
      setDeletingId(expertId);

      const resp = await UserService.deleteLanguageExpert(expertId);
      if (resp.success) {
        toast.success("Language Expert Deleted");
      }
      await refetch();
    } catch (error) {
      toast.error(`Language Expert Deletion Failed: ${error}`);
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Language Experts"
        description="Manage expert accounts and dialect assignments."
      />

      <ExpertsToolbar
        refreshing={isFetching}
        onRefresh={refetch}
        search={search}
        onSearchChange={setSearch}
      />

      <ExpertTable
        experts={experts}
        deletingId={deletingId}
        onRemove={handleRemove}
        globalFilter={search}
        isLoading={isLoading}
        emptyState={
          <EmptyState
            icon={Users}
            title="No language experts yet"
            description="Create the first expert account to start building the moderation team."
          />
        }
      />
    </div>
  );
}
