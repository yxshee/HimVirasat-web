"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { LogoMark } from "@/components/decor/logo-mark";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Vocabulary", href: "/vocabulary" },
  { name: "Tools", href: "/tools" },
  { name: "Contribute", href: "/contribute" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex h-full items-center gap-2.5 border-r border-border pl-0 pr-4"
        >
          <LogoMark size={32} />
          <span className="flex flex-col">
            <span className="font-display font-medium leading-tight tracking-tight">
              HimVirasat
            </span>
            <span
              aria-hidden
              className="font-takri mt-0.5 text-[10px] leading-none tracking-wide text-marigold-deep"
            >
              {site.takriName}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium",
                    isActive
                      ? "rounded-full border border-border bg-foreground px-4 py-1.5 text-background"
                      : "rounded-full px-4 py-1.5 text-foreground transition-colors hover:bg-secondary",
                  )}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex h-full items-center gap-1 border-l border-border pl-4">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="rounded-md p-2 transition-colors hover:bg-foreground/5 md:hidden"
          >
            {isOpen ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-border bg-background md:hidden"
        >
          <ul className="flex flex-col divide-y divide-border">
            {navLinks.map((link, index) => {
              const isActive = isActiveLink(link.href);
              return (
                <li
                  key={link.href}
                  className="animate-fade-slide opacity-0"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block px-6 py-4 text-lg font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
