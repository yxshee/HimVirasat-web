"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  UserCog,
  Check,
  Send,
  Settings,
} from "lucide-react";

import { RoleBadge } from "@/components/admin/role-badge";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { UserDto } from "@/types/admin/user";

interface AdminSidebarProps {
  user: UserDto;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const SUPER_ADMIN_ITEMS = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Language Experts",
    url: "/admin/dashboard/experts",
    icon: Users,
  },
  {
    title: "Language Heads",
    url: "/admin/dashboard/heads",
    icon: UserCog,
  },
  {
    title: "Review Queue",
    url: "/admin/dashboard/review-queue",
    icon: Check,
  },
  {
    title: "Submissions",
    url: "/admin/dashboard/submissions",
    icon: Send,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: Settings,
  },
];

const LANGUAGE_HEAD_ITEMS = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Language Experts",
    url: "/admin/dashboard/experts",
    icon: Users,
  },
  {
    title: "Review Queue",
    url: "/admin/dashboard/review-queue",
    icon: Check,
  },
  {
    title: "Submissions",
    url: "/admin/dashboard/submissions",
    icon: Send,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: Settings,
  },
];

const LANGUAGE_EXPERT_ITEMS = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Review Queue",
    url: "/admin/dashboard/review-queue",
    icon: Check,
  },
  {
    title: "Submissions",
    url: "/admin/dashboard/submissions",
    icon: Send,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: Settings,
  },
];
const SIDEBAR_ITEMS = {
  super_admin: SUPER_ADMIN_ITEMS,
  language_head: LANGUAGE_HEAD_ITEMS,
  language_expert: LANGUAGE_EXPERT_ITEMS,
} as const;

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const items = SIDEBAR_ITEMS[user.role];
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-1 py-1.5">
          <div className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-primary">
            <Image
              src="/virasat.png"
              alt="HimVirasat"
              width={28}
              height={28}
            />
          </div>

          <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-display text-sm font-semibold">
              HimVirasat
            </span>

            <span className="truncate text-[11px] text-muted-foreground">
              Admin Console
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Moderation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.url ||
                  (item.url !== "/admin/dashboard" &&
                    pathname.startsWith(item.url + "/"));

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip={user.full_name}>
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {getInitials(user.full_name)}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.full_name}</span>

                <span className="truncate text-xs text-muted-foreground">
                  @{user.username}
                </span>
              </div>

              <RoleBadge role={user.role} className="shrink-0" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
