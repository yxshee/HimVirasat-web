"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/admin/status-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import type { LanguageExpert } from "@/types/admin/user";

export function getExpertColumns(
  onRemove: (expertId: string) => void,
  deletingId: string | null
): ColumnDef<LanguageExpert>[] {
  return [
    {
      accessorKey: "full_name",
      header: "Full Name",
    },

    {
      accessorKey: "username",
      header: "Username",
    },

    {
      accessorKey: "email",
      header: "Email",

      cell: ({ row }) =>
        row.original.email ?? <span className="text-muted-foreground">·</span>,
    },

    {
      accessorKey: "dialects",
      header: "Dialects",

      cell: ({ row }) =>
        row.original.dialects.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {row.original.dialects.map((dialect) => (
              <span
                key={dialect}
                className="rounded-full border border-border px-2 py-0.5 text-xs"
              >
                {dialect}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground">·</span>
        ),
    },

    {
      accessorKey: "points",
      header: () => <div className="w-full text-right">Points</div>,

      cell: ({ row }) => (
        <div className="text-right tabular-nums">{row.original.points}</div>
      ),
    },

    {
      accessorKey: "is_active",
      header: "Status",

      cell: ({ row }) => (
        <StatusBadge status={row.original.is_active ? "active" : "inactive"} />
      ),
    },

    {
      accessorKey: "created_at",
      header: "Created",

      cell: ({ row }) => dayjs(row.original.created_at).format("DD MMM YYYY"),
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,

      cell: ({ row }) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive"
              disabled={deletingId === row.original.id}
              aria-label={`Remove ${row.original.username}`}
            >
              <Trash2 aria-hidden className="size-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Remove @{row.original.username}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This permanently removes the expert account. This cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => onRemove(row.original.id)}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
  ];
}
