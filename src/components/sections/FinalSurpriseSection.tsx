"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Heart, X } from "lucide-react";
import { birthday } from "@/data/birthday";
import { FloatingParticles } from "@/components/animations/FloatingParticles";
import { FallingPetals } from "@/components/animations/FallingPetals";
import { GlowOrb } from "@/components/animations/GlowOrb";
import { Button } from "@/components/ui/Button";

export function FinalSurpriseSection() {
  const [showSurprise, setShowSurprise] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const words = birthday.finalQuote.split(" ");

  useEffect(() => {
    if (!showSurprise) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowSurprise(false);
      if (event.key === "Tab") {
        const dialog = document.getElementById("final-surprise-dialog");
        const focusable = dialog?.querySelectorAll<HTMLElement>("button, [href]");
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
      previousFocus.focus();
    };
  }, [showSurprise]);

  return (
    <section
      id="finale"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-burgundy"
      aria-labelledby="final-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(197,143,150,0.14),transparent_50%),linear-gradient(to_bottom,rgba(21,18,22,0.3),rgba(21,18,22,0.65))]" />

      {/* Animated glow orbs */}
      <GlowOrb
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        color="rgba(197,143,150,0.12)"
        size={700}
        blur={150}
        duration={12}
      />

      <FloatingParticles count={28} tone="cream" className="opacity-60" />
      <FallingPetals count={12} />

      <div className="section-shell relative z-10 flex flex-1 flex-col items-center justify-center py-28 text-center">
        {/* Pulsing heart icon */}
        <motion.div
          className="relative mb-12 flex h-28 w-28 items-center justify-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Multiple pulse rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-rose/20"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [0.9, 1.5], opacity: [0.6, 0] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.9,
              }}
            />
          ))}
          <div className="absolute inset-4 rounded-full bg-rose/10 blur-xl" />
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart
              size={38}
              strokeWidth={0.8}
              className="fill-rose/20 text-rose drop-shadow-[0_0_16px_rgba(197,143,150,0.4)]"
            />
          </motion.div>
        </motion.div>

        <p className="section-kicker justify-center">05 · Always, in every world</p>
        <h2
          id="final-title"
          className="mx-auto mt-9 max-w-5xl text-balance font-serif text-[clamp(2.8rem,6.8vw,6.5rem)] font-normal leading-[1.02] tracking-[-0.035em]"
          aria-label={birthday.finalQuote}
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="inline-block"
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}{index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </h2>

        {/* Animated gold line */}
        <motion.div
          className="my-10 h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(245,235,221,0.45), transparent)",
          }}
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          aria-hidden="true"
        />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-1"
        >
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Button onClick={() => setShowSurprise(true)} className="group pl-7 pr-2.5">
              {birthday.finalButton}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-burgundy text-cream transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <footer className="relative z-10 flex flex-col items-center justify-between gap-3 border-t border-cream/10 px-6 pb-24 pt-7 text-[8px] uppercase tracking-[0.25em] text-cream/35 sm:flex-row sm:px-10 lg:px-16">
        <span>A little world made for {birthday.recipientName}</span>
        <span>Made with intention &amp; love</span>
      </footer>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showSurprise && (
              <motion.div
                id="final-surprise-dialog"
                className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-midnight/90 p-4 backdrop-blur-xl sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="surprise-title"
                onClick={() => setShowSurprise(false)}
              >
                <motion.div
                  className="paper-letter relative my-auto w-full max-w-2xl px-7 py-12 text-center sm:px-16 sm:py-16"
                  initial={
                    reduceMotion ? { opacity: 0 } : { opacity: 0, y: 35, scale: 0.96 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setShowSurprise(false)}
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-burgundy/15 text-burgundy transition-colors hover:bg-burgundy hover:text-cream"
                    aria-label="Close final surprise"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>

                  {/* Animated hearts in dialog */}
                  {!reduceMotion &&
                    [0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: "10%",
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.7,
                        }}
                        aria-hidden="true"
                      >
                        <Heart
                          size={10 + i * 4}
                          className="fill-burgundy/10 text-burgundy/30"
                          strokeWidth={1}
                        />
                      </motion.div>
                    ))}

                  <motion.div
                    animate={reduceMotion ? undefined : { scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart
                      className="mx-auto fill-burgundy/10 text-burgundy"
                      size={30}
                      strokeWidth={1}
                    />
                  </motion.div>
                  <p className="mt-6 text-[9px] uppercase tracking-[0.3em] text-burgundy/50">
                    One last thing
                  </p>
                  <h3
                    id="surprise-title"
                    className="mt-5 text-balance font-serif text-4xl italic leading-tight text-burgundy sm:text-5xl"
                  >
                    {birthday.finalMessageTitle}
                  </h3>
                  <div className="mx-auto mt-7 h-px w-16 bg-burgundy/25" />
                  <p className="mx-auto mt-7 max-w-lg font-serif text-lg leading-8 text-midnight/70 sm:text-xl sm:leading-9">
                    {birthday.finalMessage}
                  </p>
                  <p className="mt-8 font-serif text-2xl italic text-burgundy">
                    {birthday.signature}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
