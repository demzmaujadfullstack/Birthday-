"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { birthday } from "@/data/birthday";
import { PageTransition } from "@/components/animations/PageTransition";
import { OpeningSection } from "@/components/sections/OpeningSection";
import { BirthdaySection } from "@/components/sections/BirthdaySection";
import { MemoriesSection } from "@/components/sections/MemoriesSection";
import { StorySection } from "@/components/sections/StorySection";
import { LoveLetterSection } from "@/components/sections/LoveLetterSection";
import { FinalSurpriseSection } from "@/components/sections/FinalSurpriseSection";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { CursorTrail } from "@/components/animations/CursorTrail";

export function BirthdayExperience() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="grain min-h-screen bg-midnight">
      {/* Cursor sparkle trail — desktop only */}
      <CursorTrail />

      <AnimatePresence mode="wait">
        {!opened && <OpeningSection key="opening" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && (
        <>
          <PageTransition>
            <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 text-cream sm:px-10 lg:px-16">
              <a
                href="#birthday"
                className="pointer-events-auto flex items-center gap-3"
                aria-label="Back to birthday section"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 font-serif text-xl italic">
                  {birthday.recipientName.charAt(0)}
                </span>
                <span className="hidden text-[9px] uppercase tracking-[0.25em] text-cream/50 sm:inline">
                  For {birthday.recipientName}
                </span>
              </a>
              <a
                href="#story"
                className="pointer-events-auto flex min-h-11 items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-cream/60 transition-colors hover:text-cream"
              >
                Our story <ArrowDownRight size={14} strokeWidth={1.5} />
              </a>
            </header>
            <BirthdaySection />
            <MemoriesSection />
            <StorySection />
            <LoveLetterSection />
            <FinalSurpriseSection />
          </PageTransition>
          <MusicPlayer autoStart />
        </>
      )}
    </div>
  );
}
