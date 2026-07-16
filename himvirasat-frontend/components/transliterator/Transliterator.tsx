"use client";

import { useState } from "react";
import { ArrowLeftRight, Copy, Eraser } from "lucide-react";
import { toast } from "sonner";

import { devToTankri } from "@/lib/transliteration/devToTankri";
import { tankriToDev } from "@/lib/transliteration/tankriToDev";
import { Button } from "@/components/ui/button";
import { KathKuniBand } from "@/components/decor/kath-kuni-band";
import { cn } from "@/lib/utils";

const EXAMPLES = ["नमस्ते", "हिमाचल", "पहाड़", "मंडी"];

const textareaBase =
  "w-full flex-1 resize-y rounded-md border border-input bg-background px-3 py-2.5 placeholder:text-muted-foreground outline-none transition-[box-shadow,border-color] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 min-h-40 md:min-h-52";

export default function Transliterator() {
  const [devText, setDevText] = useState("");
  const [tankriText, setTankriText] = useState("");
  const [swapped, setSwapped] = useState(false);

  const handleDevChange = (value: string) => {
    setDevText(value);
    setTankriText(devToTankri(value));
  };

  const handleTankriChange = (value: string) => {
    setTankriText(value);
    setDevText(tankriToDev(value));
  };

  const copyText = async (text: string, script: "Devanagari" | "Takri") => {
    try {
      await navigator.clipboard.writeText(text);
      toast(`Copied ${script} text`);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const clearAll = () => {
    setDevText("");
    setTankriText("");
  };

  const bothEmpty = devText === "" && tankriText === "";

  return (
    <div className="accent-teal">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-card shadow-brut">
        <KathKuniBand className="h-5 border-b border-border text-section-accent" />

        <div className="p-6 md:p-8">
          <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            {/* Devanagari pane */}
            <div
              className={cn(
                "flex flex-col gap-2",
                swapped ? "order-3" : "order-1"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs tracking-wider text-section-accent-deep uppercase">
                  <span aria-hidden className="font-deva">
                    देवनागरी
                  </span>{" "}
                  Devanagari
                </span>
                <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                  {devText.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Copy Devanagari text"
                  disabled={devText === ""}
                  onClick={() => copyText(devText, "Devanagari")}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
              <textarea
                value={devText}
                onChange={(e) => handleDevChange(e.target.value)}
                placeholder="यहाँ लिखें…"
                aria-label="Devanagari text"
                className={cn(textareaBase, "font-deva text-lg")}
              />
            </div>

            {/* Controls */}
            <div className="order-2 flex items-center justify-center gap-3 md:flex-col">
              <Button
                variant="outline"
                size="icon"
                className="rounded-md"
                aria-label="Swap pane order"
                onClick={() => setSwapped((s) => !s)}
              >
                <ArrowLeftRight
                  className={cn(
                    "size-4 transition-transform",
                    swapped && "rotate-180"
                  )}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Clear both panes"
                disabled={bothEmpty}
                onClick={clearAll}
              >
                <Eraser className="size-4" />
              </Button>
            </div>

            {/* Takri pane */}
            <div
              className={cn(
                "flex flex-col gap-2",
                swapped ? "order-1" : "order-3"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs tracking-wider text-section-accent-deep uppercase">
                  <span aria-hidden className="font-takri">
                    𑚔𑚭𑚊𑚤𑚯
                  </span>{" "}
                  Takri
                </span>
                <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                  {tankriText.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Copy Takri text"
                  disabled={tankriText === ""}
                  onClick={() => copyText(tankriText, "Takri")}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
              <textarea
                value={tankriText}
                onChange={(e) => handleTankriChange(e.target.value)}
                placeholder="Takri output…"
                aria-label="Takri text"
                className={cn(textareaBase, "font-takri text-xl leading-relaxed")}
              />
            </div>
          </div>

          {/* Example chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Try:</span>
            {EXAMPLES.map((word) => (
              <button
                key={word}
                type="button"
                lang="hi"
                onClick={() => handleDevChange(word)}
                className="rounded-full border border-border bg-background px-3 py-1 font-deva text-sm transition-colors hover:bg-pink hover:text-black"
              >
                {word}
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            This is a basic transliteration tool. Please verify outputs before
            using.
          </p>
        </div>
      </div>
    </div>
  );
}
