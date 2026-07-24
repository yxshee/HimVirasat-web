"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { AdminAuthService } from "@/lib/services/admin/admin-auth-service";

export function AdminLoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await AdminAuthService.login(username, password);

      if (!response.success) {
        toast.error(response.message ?? "Authentication failed");
        return;
      }

      if (response.user?.role === "super_admin") {
        toast.success("Logged in as Super Admin", { duration: 5000 });
      }
      if (response.user?.role === "language_head") {
        toast.success("Logged in as Language Head", { duration: 5000 });
      }
      if (response.user?.role === "language_expert") {
        toast.success("Logged in as Language Expert", { duration: 5000 });
      }

      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-8">
      <h1 className="font-display text-2xl">Sign in</h1>
      <p className="mt-1 text-sm text-muted-foreground">Admin console access</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="admin-username">Username</Label>
          <Input
            id="admin-username"
            autoComplete="username"
            required
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="mt-4 text-xs text-muted-foreground">
        Access is provisioned by HimVirasat administrators.
      </p>
    </div>
  );
}
