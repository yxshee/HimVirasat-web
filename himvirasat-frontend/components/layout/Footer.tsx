import Link from "next/link";

import { LogoMark } from "@/components/decor/logo-mark";
import { PahariBand } from "@/components/decor/pahari-band";
import { site } from "@/lib/site";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Vocabulary", href: "/vocabulary" },
      { label: "Datasets", href: "/datasets" },
      { label: "Tools", href: "/tools" },
      { label: "Transliterator", href: "/tools/transliterator" },
    ],
  },
  {
    heading: "Participate",
    links: [
      { label: "Contribute", href: "/contribute" },
      { label: "HimVirasat Discord", href: site.links.discordHimvirasat },
      { label: "HP Community Discord", href: site.links.discordHpCommunity },
      { label: "GitHub", href: site.links.github },
    ],
  },
  {
    heading: "Project",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/about#team" },
      { label: "Source code", href: site.links.repo },
    ],
  },
];

const linkClasses =
  "link-ink text-sm text-muted-foreground transition-colors hover:text-foreground";

export default function Footer() {
  return (
    <footer className="surface-ink accent-marigold relative overflow-hidden">
      {/* Chunky carving ornament opens the ink band. */}
      <PahariBand className="h-4 border-y border-border bg-transparent text-marigold" />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start gap-4 border-border lg:border-l-0 lg:pl-0">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark size={32} />
              <span className="flex flex-col">
                <span className="font-display font-medium leading-tight tracking-tight">
                  HimVirasat
                </span>
                <span
                  aria-hidden
                  className="font-takri mt-0.5 text-[10px] leading-none tracking-wide text-section-accent-deep"
                >
                  {site.takriName}
                </span>
              </span>
            </Link>
            <p className="text-sm leading-6 text-muted-foreground">
              An open-source initiative dedicated to the digital preservation
              of Himachal&apos;s linguistic heritage and cultural memory.
            </p>
            <p aria-hidden className="font-takri text-sm text-muted-foreground/60">
              {site.takriName}
            </p>
          </div>

          {columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="flex flex-col gap-4 border-border lg:border-l lg:pl-8"
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-section-accent-deep">
                {column.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClasses}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClasses}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-6 lg:px-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} HimVirasat
          </p>
          <p className="text-xs text-muted-foreground">
            Open source, community-built.
          </p>
        </div>
      </div>
    </footer>
  );
}
