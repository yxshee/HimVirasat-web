"use client";

import React from "react";
import {
  Inbox,
  Search,
  MessageSquare,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Contribution,
  ContributionStatus,
  getOpenReviewCommentCount,
} from "@/types/admin/contribution-types";

export type QueueFilter =
  "my_submissions" | "under_review" | "approved" | "flagged" | "rejected";

interface QueueSidebarProps {
  activeUserId: string;
  queueFilter: QueueFilter;
  setQueueFilter: (filter: QueueFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  queueFilteredItems: Contribution[];
  selectedId: string;
  handleSelectItem: (id: string) => void;
  isLoading?: boolean;
}

const filterStages = [
  { id: "my_submissions", label: "My Submissions", icon: User },
  { id: "under_review", label: "Under Review", icon: Clock },
  { id: "approved", label: "Approved", icon: CheckCircle },
  { id: "flagged", label: "Flagged", icon: AlertTriangle },
  { id: "rejected", label: "Rejected", icon: XCircle },
] as const;

export default function QueueSidebar({
  activeUserId,
  queueFilter,
  setQueueFilter,
  searchQuery,
  setSearchQuery,
  queueFilteredItems,
  selectedId,
  handleSelectItem,
  isLoading = false,
}: QueueSidebarProps) {
  const activeStageIndex = filterStages.findIndex(
    (stage) => stage.id === queueFilter
  );

  return (
    <aside className="w-85 shrink-0 border-r flex flex-col min-h-0 bg-linear-to-b from-background to-muted/20">
      {/* Pipeline Filter */}
      <div className="border-b bg-card/30 backdrop-blur-sm px-3 pt-4 pb-3">
        <div className="relative flex justify-between items-center w-full">
          {filterStages.map((stage, idx) => (
            <React.Fragment key={stage.id}>
              {idx > 0 && (
                <div
                  className={cn(
                    "absolute h-0.5 transition-colors duration-500",
                    idx === 1 && "left-[12%] right-[72%]",
                    idx === 2 && "left-[32%] right-[52%]",
                    idx === 3 && "left-[52%] right-[32%]",
                    idx === 4 && "left-[72%] right-[12%]",
                    idx <= activeStageIndex
                      ? getConnectorActiveColor(queueFilter)
                      : "bg-muted-foreground/20"
                  )}
                />
              )}
              <button
                onClick={() => setQueueFilter(stage.id)}
                className="flex flex-col items-center gap-1.5 relative group cursor-pointer z-10"
              >
                <div
                  className={cn(
                    "size-9 rounded-full flex items-center justify-center transition-all duration-300",
                    "border-2 shadow-sm",
                    queueFilter === stage.id
                      ? getNodeActiveClasses(stage.id)
                      : "bg-background border-muted-foreground/30 group-hover:border-primary/50 group-hover:shadow-md"
                  )}
                >
                  <stage.icon
                    className={cn(
                      "size-4 transition-colors",
                      queueFilter === stage.id
                        ? "text-white"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium leading-none transition-colors",
                    queueFilter === stage.id
                      ? getTextActiveClasses(stage.id)
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {stage.label}
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Search Bar - icon on the right */}
      <div className="p-3 border-b bg-card/20">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search queue..."
            className="h-9 pl-3 pr-8 text-sm bg-background/60 backdrop-blur-sm border-muted-foreground/20 focus-visible:ring-2 focus-visible:ring-primary/50 transition-shadow"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <XCircle className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Queue List */}
      <ScrollArea className="flex-1 min-h-0 bg-transparent px-1.5 py-2">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-lg bg-card/50 p-4 space-y-3 border"
              >
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : queueFilteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Inbox className="size-12 stroke-[1.5] mb-3 text-muted-foreground/30" />
            <p className="text-sm font-medium">No items found</p>
            <p className="text-xs max-w-48 text-center mt-1 opacity-70">
              Try adjusting your filter or search terms.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {queueFilteredItems.map((item) => {
              const isSelected = item.id === selectedId;
              const openComments = getOpenReviewCommentCount(item);
              const totalComments = item.review_comments?.length || 0;
              const isMine = item.contributor_id === activeUserId;
              const badgeConfig = statusBadgeConfig[item.status];
              const shortId = item.id.slice(-6).toUpperCase();

              // Contributor name (fallback)
              const contributorName =
                item.contributor_name ||
                (item.contributor_id
                  ? `User ${item.contributor_id.slice(-4)}`
                  : "Unknown");

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={cn(
                    "w-full text-left rounded-xl p-3.5 transition-all duration-200",
                    "border border-transparent hover:border-muted-foreground/20",
                    "group relative flex flex-col gap-1.5",
                    isSelected
                      ? "bg-accent/60 border-primary/30 shadow-md shadow-primary/5 after:absolute after:inset-y-2 after:left-0 after:w-1 after:rounded-r-full after:bg-primary"
                      : "hover:bg-muted/30 hover:shadow-sm"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-semibold text-base tracking-tight truncate">
                        {item.word_devanagari}
                      </span>

                      {/* Contributor badge – always with icon, different styles */}
                      <Badge
                        variant="secondary"
                        className={cn(
                          "h-5 text-[9px] px-1.5 font-mono flex items-center gap-1",
                          isMine
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-muted/50 text-muted-foreground border-muted-foreground/20"
                        )}
                      >
                        <User className="size-3" />
                        {isMine ? "Mine" : contributorName}
                      </Badge>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/50 shrink-0">
                      #{shortId}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground/90 truncate max-w-72">
                    {item.meaning}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 min-w-0 flex-wrap">
                      <span className="text-[10px] font-medium bg-muted/60 px-2 py-0.5 rounded-full truncate">
                        {item.dialects?.name || "Standard"}
                      </span>
                      {queueFilter === "my_submissions" && (
                        <span className="text-[10px] text-muted-foreground/70 truncate">
                          {openComments} unresolved
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {totalComments > 0 && (
                        <Badge
                          variant="outline"
                          className="h-5 gap-1 px-1.5 text-[9px] font-medium border-muted-foreground/20"
                        >
                          <MessageSquare className="size-3" />
                          {totalComments} ({openComments} open)
                        </Badge>
                      )}
                      <Badge
                        className={cn(
                          "text-[9px] px-2 py-0 h-5 font-semibold border-0",
                          badgeConfig.className
                        )}
                      >
                        {badgeConfig.label}
                      </Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}

// ------------------------------------------------------------------
// Helpers & Configurations (unchanged)
// ------------------------------------------------------------------

/**
 * One fill for every chip, with the state carried by the ink. The tinted
 * fills these used to have (blue-100, red-100 and friends) are outside the
 * Deodar palette and read as a second accent system next to the badges in
 * `status-badge.tsx`, which this now matches.
 */
const statusBadgeConfig: Record<
  ContributionStatus,
  { label: string; className: string }
> = {
  under_review: {
    label: "Under Review",
    className: "bg-secondary text-verdant",
  },
  approved: {
    label: "Approved",
    className: "bg-secondary text-verdant",
  },
  flagged: {
    label: "Flagged",
    className: "bg-secondary text-clay-600",
  },
  rejected: {
    label: "Rejected",
    className: "bg-secondary text-destructive",
  },
};

/**
 * The pipeline nodes step through the palette rather than through five
 * unrelated Tailwind hues. Order matters visually: the stages read cool to
 * warm as work moves from "mine" to "needs attention", with rejection
 * keeping destructive red because that one is semantic.
 *
 * Written out in full rather than composed from a tone name. Tailwind scans
 * source for complete class strings, so a template literal like
 * `bg-${tone}` compiles to nothing at all.
 */
const STAGE_CLASSES: Record<
  QueueFilter,
  { node: string; connector: string; text: string }
> = {
  my_submissions: {
    node: "bg-glacier-300 border-glacier-300 ring-2 ring-glacier-300/20",
    connector: "bg-glacier-300",
    text: "text-verdant",
  },
  under_review: {
    node: "bg-glacier-500 border-glacier-500 ring-2 ring-glacier-500/20",
    connector: "bg-glacier-500",
    text: "text-verdant",
  },
  approved: {
    node: "bg-pine-500 border-pine-500 ring-2 ring-pine-500/20",
    connector: "bg-pine-500",
    text: "text-verdant",
  },
  flagged: {
    node: "bg-clay-600 border-clay-600 ring-2 ring-clay-600/20",
    connector: "bg-clay-600",
    text: "text-clay-600",
  },
  rejected: {
    node: "bg-destructive border-destructive ring-2 ring-destructive/20",
    connector: "bg-destructive",
    text: "text-destructive",
  },
};

function getNodeActiveClasses(filter: QueueFilter) {
  return STAGE_CLASSES[filter].node;
}

function getTextActiveClasses(filter: QueueFilter) {
  return STAGE_CLASSES[filter].text;
}

function getConnectorActiveColor(filter: QueueFilter) {
  return STAGE_CLASSES[filter].connector;
}
