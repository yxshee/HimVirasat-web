import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      {/* Smoothed scrolling wraps the public pages only. The admin
          dashboard keeps native scrolling — taking over the wheel above a
          review queue and data tables makes them harder to use. */}
      <SmoothScroll>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="content" className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </TooltipProvider>
  );
}
