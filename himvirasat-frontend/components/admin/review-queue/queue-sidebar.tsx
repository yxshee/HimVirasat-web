"use client";

import React from "react";
import { Inbox, Search, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import { cn } from "@/lib/utils";
import {
  Contribution,
  getOpenReviewCommentCount,
} from "@/types/admin/FSM/contribution-rules";

export type QueueFilter =
  | "my_submissions"
  | "under_review"
  | "approved"
  | "flagged"
  | "rejected";

interface QueueSidebarProps {
  activeUserId: string;
  queueFilter: QueueFilter;
  setQueueFilter: (filter: QueueFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  queueFilteredItems: Contribution[];
  selectedId: string;
  handleSelectItem: (id: string) => void;
}

const filterPipelineStages = [
  { id: "my_submissions", label: "My Submissions" },
  { id: "under_review", label: "Under Review" },
  { id: "approved", label: "Approved" },
  { id: "flagged", label: "Flagged" },
  { id: "rejected", label: "Rejected" },
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
}: QueueSidebarProps) {
  const activeStageIndex = filterPipelineStages.findIndex(
    (stage) => stage.id === queueFilter
  );

  return (
    <aside className="w-85 shrink-0 border-r flex flex-col min-h-0 bg-background">
      <div className="border-b space-y-4 pt-5 pb-3">
        <div className="relative flex justify-between w-full px-4 z-0">
          {filterPipelineStages.map((stage, idx) => (
            <React.Fragment key={stage.id}>
              {idx > 0 &&
                renderPipelineConnector(idx, activeStageIndex, queueFilter)}
              {renderPipelineNode(stage, idx, queueFilter, setQueueFilter)}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search queue"
            className="h-8 pl-8 text-xs bg-muted/20 border-border"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0 bg-transparent">
        {queueFilteredItems.length === 0
          ? renderEmptyState()
          : renderQueueList(
              queueFilteredItems,
              selectedId,
              queueFilter,
              activeUserId,
              handleSelectItem
            )}
      </ScrollArea>
    </aside>
  );
}

function renderPipelineConnector(
  idx: number,
  activeStageIndex: number,
  queueFilter: QueueFilter
) {
  const isSegmentActive = idx <= activeStageIndex && activeStageIndex !== 0;
  const activeTone = getPipelineTone(queueFilter);

  return (
    <div
      className={cn(
        "absolute top-2.25 h-0.5 transition-colors duration-300 -z-10",
        idx === 1
          ? "left-[10%] right-[70%]"
          : idx === 2
            ? "left-[30%] right-[50%]"
            : idx === 3
              ? "left-[50%] right-[30%]"
              : "left-[70%] right-[10%]",
        isSegmentActive
          ? getActiveLineClasses(activeTone)
          : "bg-border"
      )}
    />
  );
}

function renderPipelineNode(
  stage: (typeof filterPipelineStages)[number],
  idx: number,
  queueFilter: QueueFilter,
  setQueueFilter: (filter: QueueFilter) => void
) {
  const isActive = queueFilter === stage.id;
  const activeTone = getPipelineTone(queueFilter);

  return (
    <button
      onClick={() => setQueueFilter(stage.id)}
      className="flex flex-col items-center gap-2 flex-1 relative group cursor-pointer"
    >
      <div
        className={cn(
          "size-4.5 rounded-full flex items-center justify-center transition-all duration-300 border-[3px] shadow-sm z-10",
          isActive
            ? getActiveNodeClasses(activeTone)
            : "bg-background border-border group-hover:border-muted-foreground/50"
        )}
      >
        {isActive && <div className="size-1.5 rounded-full bg-background" />}
      </div>

      <span
        className={cn(
          "text-[10px] font-semibold transition-colors",
          isActive
            ? getActiveTextClasses(activeTone)
            : "text-muted-foreground group-hover:text-foreground"
        )}
      >
        {stage.label}
      </span>
    </button>
  );
}

function renderEmptyState() {
  return (
    <EmptyState
      icon={Inbox}
      title="Queue is clear"
      description="No vocabulary entries match this filter and search."
      className="m-3 p-8"
    />
  );
}

function renderQueueList(
  items: Contribution[],
  selectedId: string,
  queueFilter: QueueFilter,
  activeUserId: string,
  handleSelectItem: (id: string) => void
) {
  return (
    <div className="divide-y border-b border-border/40">
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        const openComments = getOpenReviewCommentCount(item);
        const totalComments = item.review_comments.length;
        const isMine = item.contributor_id === activeUserId;

        return (
          <button
            key={item.id}
            onClick={() => handleSelectItem(item.id)}
            className={cn(
              "w-full p-3.5 cursor-pointer text-left transition-all relative flex flex-col gap-1.5 group",
              isSelected
                ? "bg-accent/40 backdrop-blur-xs after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-saffron"
                : "hover:bg-muted/20"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-deva font-bold text-sm tracking-tight text-foreground">
                {item.word_devanagari}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground opacity-80">
                {item.id}
              </span>
            </div>

            <p className="text-xs text-muted-foreground/90 font-medium truncate max-w-72">
              {item.meaning}
            </p>

            {queueFilter === "my_submissions" &&
              renderSubmissionsSubline(item, openComments)}

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[11px] font-semibold text-foreground/70 bg-muted/40 px-1.5 py-0.5 rounded">
                  {item.dialect}
                </span>
                {isMine && (
                  <span className="text-[10px] text-muted-foreground">
                    My Submission
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {totalComments > 0 && renderReviewCommentsBadge(openComments)}
                <StatusBadge
                  status={item.status}
                  className="text-[9px] px-1.5 py-0"
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function renderSubmissionsSubline(item: Contribution, openComments: number) {
  const latestActivity =
    item.history[0]?.message ?? "No reviewer activity yet.";
  return (
    <p className="text-[11px] text-muted-foreground truncate">
      {openComments} unresolved comments · {latestActivity}
    </p>
  );
}

function renderReviewCommentsBadge(openComments: number) {
  return (
    <Badge
      variant="secondary"
      className="h-5 gap-1 px-1.5 text-[10px] font-medium"
    >
      <MessageSquare className="size-3" />
      {openComments === 0 ? "Resolved" : `${openComments} Open`}
    </Badge>
  );
}

const getPipelineTone = (filter: QueueFilter) => {
  if (filter === "flagged") return "warning";
  if (filter === "rejected") return "destructive";
  if (filter === "approved") return "success";
  if (filter === "my_submissions") return "saffron";
  return "info";
};

const getActiveNodeClasses = (tone: ReturnType<typeof getPipelineTone>) => {
  switch (tone) {
    case "warning":
      return "bg-warning border-warning ring-4 ring-warning/20";
    case "destructive":
      return "bg-destructive border-destructive ring-4 ring-destructive/20";
    case "success":
      return "bg-success border-success ring-4 ring-success/20";
    case "saffron":
      return "bg-saffron border-saffron ring-4 ring-saffron/20";
    default:
      return "bg-info border-info ring-4 ring-info/20";
  }
};

const getActiveTextClasses = (tone: ReturnType<typeof getPipelineTone>) => {
  switch (tone) {
    case "warning":
      return "text-warning";
    case "destructive":
      return "text-destructive";
    case "success":
      return "text-success";
    case "saffron":
      return "text-saffron-deep";
    default:
      return "text-info";
  }
};

const getActiveLineClasses = (tone: ReturnType<typeof getPipelineTone>) => {
  switch (tone) {
    case "warning":
      return "bg-warning";
    case "destructive":
      return "bg-destructive";
    case "success":
      return "bg-success";
    case "saffron":
      return "bg-saffron";
    default:
      return "bg-info";
  }
};
