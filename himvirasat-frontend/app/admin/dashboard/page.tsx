"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CloudOff,
  RefreshCw,
  Shield,
  UserCog,
  Users,
} from "lucide-react";

import { EmptyState } from "@/components/admin/empty-state";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stats-card";
import { Button } from "@/components/ui/button";
import { DashboardService } from "@/lib/services/admin/dashboard-service";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "Review queue", href: "/admin/dashboard/review-queue" },
  { label: "Language experts", href: "/admin/dashboard/experts" },
  { label: "New submission", href: "/admin/dashboard/submissions" },
];

export default function DashboardPage() {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: DashboardService.getStats,
  });

  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="Dashboard"
        description="Overview of the HimVirasat moderation platform."
      >
        <Button
          variant="outline"
          size="icon"
          aria-label="Refresh stats"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            aria-hidden
            className={cn("size-4", isFetching && "animate-spin")}
          />
        </Button>
      </PageHeader>

      {isError ? (
        <EmptyState
          icon={CloudOff}
          title="Couldn't reach the HimVirasat API"
          description="Stats are unavailable. Check that the backend is running, then retry."
          action={
            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Language Experts"
            value={data?.languageExpertsCount}
            icon={Users}
            hint="Active reviewers on the platform"
            loading={isLoading}
          />
          <StatCard
            title="Language Heads"
            value={data?.languageHeadsCount}
            icon={UserCog}
            hint="Managing language experts"
            loading={isLoading}
          />
          <StatCard
            title="Super Admins"
            value={data?.superAdminsCount}
            icon={Shield}
            hint="Platform administrators"
            loading={isLoading}
          />
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          Quick actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center justify-between rounded-xl border border-border p-4 text-sm font-medium transition hover:border-saffron/40 hover:bg-muted/40"
            >
              {action.label}
              <ArrowRight aria-hidden className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
