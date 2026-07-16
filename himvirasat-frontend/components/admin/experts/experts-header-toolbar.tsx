"use client";

import { Plus, RefreshCw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { CreateExpertDialog } from "./create-expert-dialog";
import { useState } from "react";

interface ExpertsToolbarProps {
  refreshing: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
}
export function ExpertsToolbar({
  refreshing,
  search,
  onSearchChange,
  onRefresh,
}: ExpertsToolbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <div className="relative max-w-sm flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search experts..."
          aria-label="Search experts"
          className="pl-9"
        />
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={onRefresh}
        disabled={refreshing}
        aria-label="Refresh experts"
      >
        <RefreshCw
          aria-hidden
          className={cn("size-4", refreshing && "animate-spin")}
        />
      </Button>

      <Button onClick={() => setOpen(true)}>
        <Plus aria-hidden className="size-4" />
        Create expert
      </Button>

      <CreateExpertDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
