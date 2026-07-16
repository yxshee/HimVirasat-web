import Link from "next/link";

import { LogoMark } from "@/components/decor/logo-mark";
import { KathKuniBand } from "@/components/decor/kath-kuni-band";
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
      {/* Kath-kuni timber-and-stone course opens the ink band. */}
      <KathKuniBand className="h-5 border-y border-border bg-transparent text-marigold" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border py-10">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark size={32} />
            <span className="flex flex-col">
              <span className="font-display leading-none font-medium tracking-tight">
                HimVirasat
              </span>
              <span
                aria-hidden
                className="font-takri mt-1 text-[10px] leading-none tracking-wide text-section-accent-deep"
              >
                {site.takriName}
              </span>
            </span>
          </Link>
          <div className="flex max-w-md flex-col gap-2 sm:text-right">
            <p className="text-sm leading-6 text-muted-foreground">
              An open source initiative dedicated to the digital preservation
              of Himachal&apos;s linguistic heritage and cultural memory.
            </p>
            <p
              aria-hidden
              className="font-takri text-sm text-muted-foreground/60"
            >
              {site.takriName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
          {columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="flex flex-col gap-4 sm:px-8"
            >
              <h3 className="text-xs leading-none uppercase tracking-[0.2em] text-section-accent-deep">
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
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-5 lg:px-8">
          <p className="text-xs leading-none text-muted-foreground">
            &copy; {new Date().getFullYear()} HimVirasat
          </p>
          <p lang="hi" className="font-deva text-xs leading-none text-muted-foreground">
            जय हिमाचल! जय देवभूमि!
          </p>
        </div>
      </div>
    </footer>
  );
}
