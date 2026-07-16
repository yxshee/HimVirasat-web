"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminAuthService } from "@/lib/services/admin/admin-auth-service";
import { cn } from "@/lib/utils";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const response = await AdminAuthService.logout();

      if (!response.success) {
        toast.error(response.message ?? "Logout failed");

        return;
      }

      toast.success("Successfully logged out");

      router.replace("/admin");
    } catch (error) {
      console.error(error);

      toast.error("Failed to logout");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="Settings"
        description="Manage your account and platform preferences."
      />

      <div className="max-w-2xl space-y-6">
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-medium">Appearance</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose how the dashboard looks on this device.
          </p>

          {mounted ? (
            <div
              role="group"
              aria-label="Theme"
              className="mt-4 inline-flex rounded-lg bg-muted p-1"
            >
              {themeOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-pressed={theme === option.value}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "rounded-md",
                    theme === option.value &&
                      "bg-background border border-border hover:bg-background"
                  )}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          ) : (
            <Skeleton className="mt-4 h-10 w-56 rounded-lg" />
          )}
        </section>

        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-medium">Session</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            You are signed in via a secure session cookie issued by the
            HimVirasat API.
          </p>
        </section>

        <section className="rounded-lg border border-destructive/40 bg-card p-6">
          <h2 className="text-sm font-medium text-destructive">Danger zone</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Actions that affect your current session.
          </p>

          <Button
            variant="destructive"
            className="mt-4 w-full sm:w-auto"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <Loader2 aria-hidden className="size-4 animate-spin" />
            ) : null}
            Logout
          </Button>
        </section>
      </div>
    </div>
  );
}
