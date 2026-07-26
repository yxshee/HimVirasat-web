"use client";

import { DataTable } from "@/components/admin/data-table/data-table";
import { getExpertColumns } from "./expert-columns";
import type { LanguageExpert } from "@/types/admin/user";

interface ExpertTableProps {
  experts: LanguageExpert[];
  deletingId: string | null;
  globalFilter: string;
  onRemove: (expertId: string) => void;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
}

export function ExpertTable({
  experts,
  deletingId,
  globalFilter,
  onRemove,
  isLoading,
  emptyState,
}: ExpertTableProps) {
  const columns = getExpertColumns(onRemove, deletingId);

  return (
    <DataTable
      columns={columns}
      data={experts}
      globalFilter={globalFilter}
      isLoading={isLoading}
      emptyState={emptyState}
    />
  );
}
