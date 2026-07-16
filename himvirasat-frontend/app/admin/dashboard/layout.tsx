"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DashboardShell } from "@/components/admin/dashboard-shell";
import { AdminAuthService } from "@/lib/services/admin/admin-auth-service";

import type { UserDto } from "@/types/admin/user";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSplash } from "@/components/admin/admin-splash";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await AdminAuthService.me();

        setUser(response.user);
      } catch {
        router.replace("/admin");
      }
    }

    loadUser();
  }, [router]);

  if (!user) {
    return <AdminSplash />;
  }

  return (
    <DashboardShell user={user}>
      <TooltipProvider>{children}</TooltipProvider>
    </DashboardShell>
  );
}
