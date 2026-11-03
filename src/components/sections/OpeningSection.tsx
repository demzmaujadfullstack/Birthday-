"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { birthday } from "@/data/birthday";
import { FloatingParticles } from "@/components/animations/FloatingParticles";
import { TwinklingStars } from "@/components/animations/TwinklingStars";
import { FallingPetals } from "@/components/animations/FallingPetals";
import { GlowOrb } from "@/components/animations/GlowOrb";
import { Button } from "@/components/ui/Button";

export function OpeningSection({ onOpen }: { onOpen: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="vignette fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center overflow-hidden bg-midnight"
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.035, filter: "blur(8px)" }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      aria-labelledby="opening-title"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(64,21,31,0.68),transparent_65%)]" />

      {/* Animated glow orbs */}
      <GlowOrb
        className="-left-32 -top-32"
        color="rgba(197,164,109,0.10)"
        size={520}
        blur={110}
        duration={9}
      />
      <GlowOrb
        className="-bottom-40 -right-40"
        color="rgba(197,143,150,0.09)"
        size={480}
        blur={120}
        duration={11}
      />

      {/* Twinkling stars */}
      <TwinklingStars count={70} />

      {/* Falling petals */}
      <FallingPetals count={16} />

      <FloatingParticles count={30} />

      {/* Rotating ring */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square w-[82vw] max-w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-[12%] top-[12%] h-1.5 w-1.5 rounded-full bg-gold/60 shadow-[0_0_16px_#C5A46D]" />
        <span className="absolute bottom-[20%] right-[8%] h-1 w-1 rounded-full bg-cream/60" />
      </motion.div>

      {/* Counter-rotating ring */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 aspect-square w-[55vw] max-w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose/[0.07]"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute right-[10%] top-[20%] h-1 w-1 rounded-full bg-rose/50 shadow-[0_0_12px_#C58F96]" />
      </motion.div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[62vw] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.055]" />

      {/* Pulsing center glow */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(197,164,109,0.07), transparent 70%)" }}
        animate={reduceMotion ? undefined : { scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <header className="absolute inset-x-6 top-7 flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-cream/45 sm:inset-x-10 sm:top-9 sm:text-[10px]">
        <span>For {birthday.recipientName}</span>
        <span className="hidden sm:inline">A keepsake in little moments</span>
        <span>With love</span>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center sm:px-10">
        {/* Gold star badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="mb-8 flex items-center gap-2 text-gold sm:mb-10 sm:gap-3"
        >
          <motion.span
            className="h-px w-5 bg-gold/50 sm:w-8"
            animate={reduceMotion ? undefined : { scaleX: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden="true"
            animate={reduceMotion ? undefined : { rotate: [0, 20, -20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <path d="M12 2c.5 6.5 3.5 9.5 10 10-6.5.5-9.5 3.5-10 10-.5-6.5-3.5-9.5-10-10 6.5-.5 9.5-3.5 10-10Z" />
          </motion.svg>
          <span className="text-[8px] uppercase tracking-[0.24em] sm:text-[10px] sm:tracking-[0.34em]">
            {birthday.eyebrow}
          </span>
          <motion.span
            className="h-px w-5 bg-gold/50 sm:w-8"
            animate={reduceMotion ? undefined : { scaleX: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.div>

        <h1
          id="opening-title"
          className="text-balance font-serif text-[clamp(2.55rem,6.2vw,5.7rem)] font-normal leading-[0.98] tracking-[-0.035em]"
        >
          <motion.span
            className="block"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {birthday.openingLines[0]}
          </motion.span>
          <motion.em
            className="mt-2 block font-normal text-rose"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {birthday.openingLines[1]}
          </motion.em>
        </h1>

        {/* Shimmer underline */}
        <motion.div
          className="mt-6 h-px w-32 sm:w-48"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(197,164,109,0.6), transparent)",
          }}
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.75 }}
          aria-hidden="true"
        />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-10 sm:mt-12"
        >
          <Button
            onClick={onOpen}
            className="group pl-7 pr-2.5"
            aria-label="Open your birthday surprise"
          >
            {birthday.openingButton}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-midnight text-cream transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} strokeWidth={1.5} />
            </span>
          </Button>
        </motion.div>

        {/* Subtle pulse below button */}
        <motion.div
          className="mt-10 text-[9px] uppercase tracking-[0.3em] text-cream/25"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <motion.span
            animate={reduceMotion ? undefined : { opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦ &nbsp; crafted with love &nbsp; ✦
          </motion.span>
        </motion.div>
      </div>

      <div className="absolute inset-x-6 bottom-7 flex items-center justify-between text-[8px] uppercase tracking-[0.25em] text-cream/30 sm:inset-x-10 sm:bottom-9 sm:text-[9px]">
        <span>Made only for you</span>
        <motion.span
          className="h-px bg-cream/15 sm:w-28"
          style={{ width: 64 }}
          animate={reduceMotion ? undefined : { scaleX: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span>One little world</span>
      </div>
    </motion.section>
  );
}
