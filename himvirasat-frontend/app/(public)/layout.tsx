import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      {/* Fixed grain wash over the whole page. */}
      <div
        aria-hidden
        className="texture-grain pointer-events-none fixed inset-0 -z-10 opacity-[0.05] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-overlay"
      />

      <Navbar />
      <main id="content" className="min-h-screen pt-16">
        {children}
      </main>
      <Footer />
    </TooltipProvider>
  );
}
