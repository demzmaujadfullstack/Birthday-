"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Memory } from "@/data/memories";

type LightboxProps = {
  memories: Memory[];
  activeIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function Lightbox({ memories, activeIndex, onClose, onChange }: LightboxProps) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const memory = activeIndex === null ? null : memories[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((activeIndex + 1) % memories.length);
      if (event.key === "ArrowLeft") onChange((activeIndex - 1 + memories.length) % memories.length);
      if (event.key === "Tab") {
        const dialog = document.getElementById("memory-lightbox");
        const focusable = dialog?.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [activeIndex, memories.length, onChange, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {memory && activeIndex !== null && (
        <motion.div
          id="memory-lightbox"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight/95 p-4 backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-caption"
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 bg-midnight/30 text-cream transition-colors hover:bg-cream hover:text-midnight sm:right-8 sm:top-8"
            aria-label="Close memory viewer"
          >
            <X size={19} strokeWidth={1.5} />
          </button>
          <span className="absolute left-5 top-8 text-[10px] tracking-[0.25em] text-cream/50 sm:left-8">
            {String(activeIndex + 1).padStart(2, "0")} / {String(memories.length).padStart(2, "0")}
          </span>

          <motion.div
            key={memory.id}
            className="flex max-h-full w-full max-w-5xl flex-col items-center"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative max-h-[70svh] w-full max-w-3xl flex-1">
              <Image
                src={memory.src}
                alt={memory.alt}
                width={1600}
                height={1200}
                className="mx-auto max-h-[70svh] w-auto max-w-full object-contain"
                sizes="(max-width: 768px) 100vw, 900px"
                priority
              />
            </div>
            <div id="lightbox-caption" className="mt-5 max-w-xl text-center">
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold">{memory.date}</p>
              <h3 className="mt-2 font-serif text-2xl italic sm:text-3xl">{memory.title}</h3>
              <p className="mt-2 text-xs leading-6 text-cream/55 sm:text-sm">{memory.caption}</p>
            </div>
          </motion.div>

          {memories.length > 1 && (
            <>
              <button
                type="button"
                className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-midnight sm:bottom-auto sm:left-8 sm:top-1/2 sm:-translate-y-1/2"
                onClick={(event) => { event.stopPropagation(); onChange((activeIndex - 1 + memories.length) % memories.length); }}
                aria-label="Previous memory"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream hover:text-midnight sm:bottom-auto sm:right-8 sm:top-1/2 sm:-translate-y-1/2"
                onClick={(event) => { event.stopPropagation(); onChange((activeIndex + 1) % memories.length); }}
                aria-label="Next memory"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
