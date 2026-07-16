import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { AdminSidebar } from "./sidebar";
import { AdminHeader } from "./admin-header";

import type { UserDto } from "@/types/admin/user";

export function DashboardShell({
  user,
  children,
}: {
  user: UserDto;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar user={user} />

        <SidebarInset>
          <AdminHeader />

          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
