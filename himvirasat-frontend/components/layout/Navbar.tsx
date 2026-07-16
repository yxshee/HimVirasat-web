"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { PahariBand } from "@/components/decor/pahari-band";
import { ThemeToggle } from "@/components/layout/theme-toggle";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300",
        isScrolled ? "glass shadow-card" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/virasat.png"
            alt="HimVirasat logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="flex flex-col">
            <span className="font-display font-semibold leading-tight">
              HimVirasat
            </span>
            <span
              aria-hidden
              className="font-deva text-[10px] leading-tight tracking-wide text-saffron-deep"
            >
              हिमविरासत
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "border-b-2 pb-0.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-saffron text-foreground"
                      : "link-ink border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
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

      {/* Carving-border reveal: hairline strip of the Pahari band on scroll. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-[3px] overflow-hidden transition-opacity duration-300",
          isScrolled ? "opacity-100" : "opacity-0",
        )}
      >
        <PahariBand />
      </div>

      {isOpen && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-border bg-background md:hidden"
        >
          <ul className="flex flex-col px-6 py-4">
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
                      "block py-2.5 text-base font-medium transition-colors",
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
          <PahariBand className="text-saffron/60" />
        </div>
      )}
    </header>
  );
}
