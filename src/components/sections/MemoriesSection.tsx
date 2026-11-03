"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Expand, ImagePlus } from "lucide-react";
import { memories, type Memory } from "@/data/memories";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

const positions = [
  "sm:col-start-1 sm:col-span-5",
  "sm:col-start-8 sm:col-span-4 sm:mt-28",
  "sm:col-start-3 sm:col-span-4 sm:-mt-8",
  "sm:col-start-8 sm:col-span-5 sm:mt-16",
  "sm:col-start-1 sm:col-span-5 sm:ml-16 sm:-mt-4",
];

export function MemoriesSection() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const availableMemories = useMemo(() => memories.filter((memory) => memory.src), []);
  const activeIndex = activeId === null ? null : availableMemories.findIndex((memory) => memory.id === activeId);
  const closeLightbox = useCallback(() => setActiveId(null), []);
  const changeLightbox = useCallback((index: number) => setActiveId(availableMemories[index].id), [availableMemories]);

  const openMemory = (memory: Memory) => {
    if (memory.src) setActiveId(memory.id);
  };

  return (
    <section id="memories" className="relative overflow-hidden bg-[#1B151A] py-28 sm:py-36 lg:py-44" aria-labelledby="memories-title">
      <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-burgundy/25 blur-[120px]" aria-hidden="true" />
      <div className="section-shell relative">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div id="memories-title">
              <SectionHeading
                kicker="02 · Our memories"
                title="Little moments,"
                italic="kept forever."
                description="A small collection of the moments that made ordinary days feel like something worth remembering."
              />
            </div>
            <p className="max-w-[180px] border-l border-gold/30 pl-5 font-serif text-lg italic leading-6 text-cream/40 sm:mb-2 sm:text-right">
              Every photograph has a feeling behind it.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-1 gap-x-7 gap-y-16 sm:mt-28 sm:grid-cols-12 sm:gap-y-24">
          {memories.map((memory, index) => (
            <ScrollReveal
              key={memory.id}
              className={cn("w-[92%] sm:w-full", index % 2 ? "ml-auto" : "mr-auto", positions[index % positions.length])}
              delay={(index % 2) * 0.08}
            >
              <motion.article
                className="memory-paper group relative p-3 pb-5 text-midnight sm:p-4 sm:pb-6"
                style={{ rotate: memory.rotation }}
                whileHover={reduceMotion ? undefined : { rotate: 0, y: -7 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="absolute -top-3 left-1/2 z-10 h-7 w-20 -translate-x-1/2 rotate-[-2deg] bg-[#D5C2A3]/55 shadow-sm backdrop-blur-sm" aria-hidden="true" />
                {memory.src ? (
                  <button
                    type="button"
                    className="relative block aspect-[4/5] w-full overflow-hidden bg-midnight text-left"
                    onClick={() => openMemory(memory)}
                    aria-label={`Open memory: ${memory.title}`}
                  >
                    <Image
                      src={memory.src}
                      alt={memory.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      sizes="(max-width: 640px) 92vw, 42vw"
                    />
                    <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-midnight/65 text-cream opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Expand size={15} strokeWidth={1.5} />
                    </span>
                  </button>
                ) : (
                  <div className="empty-photo relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden px-8 text-center text-cream">
                    <div className="absolute inset-5 border border-cream/10" aria-hidden="true" />
                    <svg viewBox="0 0 24 24" className="absolute left-8 top-8 h-4 w-4 text-gold/50" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                      <path d="M12 2c.5 6.5 3.5 9.5 10 10-6.5.5-9.5 3.5-10 10-.5-6.5-3.5-9.5-10-10 6.5-.5 9.5-3.5 10-10Z" />
                    </svg>
                    <ImagePlus size={26} strokeWidth={1} className="text-gold/70" />
                    <p className="mt-5 font-serif text-2xl italic text-cream/85">Your photograph</p>
                    <p className="mt-3 max-w-[190px] text-[8px] uppercase leading-4 tracking-[0.2em] text-cream/35">public/images/memories</p>
                  </div>
                )}
                <div className="relative z-[1] px-1 pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[8px] font-semibold tracking-[0.25em] text-burgundy/55">{memory.date}</p>
                    <span className="h-px w-8 bg-burgundy/20" />
                  </div>
                  <h3 className="mt-3 font-serif text-[1.65rem] italic leading-7">{memory.title}</h3>
                  <p className="mt-2 text-[11px] leading-5 text-midnight/55">{memory.caption}</p>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <Lightbox memories={availableMemories} activeIndex={activeIndex} onClose={closeLightbox} onChange={changeLightbox} />
    </section>
  );
}
