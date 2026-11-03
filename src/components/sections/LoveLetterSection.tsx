"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, RotateCcw, Sparkles } from "lucide-react";
import { letter } from "@/data/letter";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/animations/GlowOrb";

export function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="letter"
      className="relative overflow-hidden bg-[#24151C] py-28 sm:py-36 lg:py-44"
      aria-labelledby="letter-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(100,43,57,0.34),transparent_62%)]" />

      {/* Animated ambient glow */}
      <GlowOrb
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        color="rgba(100,43,57,0.18)"
        size={650}
        blur={140}
        duration={11}
      />

      <div className="section-shell relative">
        <ScrollReveal>
          <div id="letter-title">
            <SectionHeading
              align="center"
              kicker="04 · A letter for you"
              title="Some things are"
              italic="better said slowly."
              description="There are feelings that deserve more than a passing message. So I put a few of them here, for you to keep."
            />
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-20 max-w-3xl sm:mt-24">
          {/* Envelope widget */}
          <motion.div
            className="relative z-10 mx-auto aspect-[1.58] w-[min(86vw,380px)] [perspective:1000px]"
            animate={reduceMotion ? undefined : { y: isOpen ? -16 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-x-2 bottom-[-24px] h-12 rounded-[50%] bg-black/35 blur-xl" aria-hidden="true" />
            <div className="absolute inset-0 rounded-sm bg-[#9C7377] shadow-[0_24px_70px_rgba(0,0,0,0.35)]" />
            <div className="absolute inset-0 rounded-sm border border-cream/20" />

            <motion.div
              className="absolute inset-x-5 bottom-5 top-4 z-10 flex flex-col items-center bg-[#EEE2D1] px-6 pt-5 text-center text-midnight shadow-md"
              animate={
                reduceMotion
                  ? { opacity: isOpen ? 1 : 0.9 }
                  : isOpen
                  ? { y: -108, rotate: -2, scale: 1.025 }
                  : { y: 18, rotate: 0, scale: 0.96 }
              }
              transition={{ duration: 0.9, delay: isOpen ? 0.28 : 0, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            >
              <span className="font-serif text-xl italic text-burgundy">For you</span>
              <span className="mt-3 h-px w-16 bg-burgundy/20" />
              <span className="mt-3 h-px w-3/4 bg-burgundy/10" />
              <span className="mt-2 h-px w-2/3 bg-burgundy/10" />
            </motion.div>

            <div className="absolute inset-0 z-20 overflow-hidden rounded-sm" aria-hidden="true">
              <div className="absolute inset-0 bg-[#B68C8D] [clip-path:polygon(0_0,50%_56%,100%_0,100%_100%,0_100%)]" />
              <div className="absolute inset-0 bg-[#A77C81] [clip-path:polygon(0_100%,0_0,50%_56%)]" />
              <div className="absolute inset-0 bg-[#B58B8C] [clip-path:polygon(100%_100%,100%_0,50%_56%)]" />
              <div className="absolute inset-0 bg-[#C09997] [clip-path:polygon(0_100%,50%_48%,100%_100%)]" />
            </div>

            <motion.div
              className="absolute inset-x-0 top-0 z-30 h-[58%] origin-top bg-[#C29A98] [clip-path:polygon(0_0,100%_0,50%_100%)]"
              animate={reduceMotion ? { opacity: isOpen ? 0 : 1 } : { rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
              style={{ backfaceVisibility: "visible" }}
              aria-hidden="true"
            />

            {!isOpen && (
              <motion.div
                className="absolute left-1/2 top-[53%] z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-burgundy text-gold shadow-lg"
                animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <Mail size={18} strokeWidth={1.2} />
              </motion.div>
            )}

            {!isOpen && (
              <button
                type="button"
                className="absolute inset-0 z-50 rounded-sm"
                onClick={() => setIsOpen(true)}
                aria-expanded={isOpen}
                aria-controls="love-letter-paper"
              >
                <span className="sr-only">Open your letter</span>
              </button>
            )}
          </motion.div>

          <div className="mt-10 text-center">
            <AnimatePresence mode="wait">
              {!isOpen && (
                <motion.button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="min-h-11 text-[10px] uppercase tracking-[0.3em] text-gold/80 transition-colors hover:text-gold"
                  exit={{ opacity: 0, y: -6 }}
                >
                  <motion.span
                    animate={reduceMotion ? undefined : { opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Touch to open the letter
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Letter paper */}
          <AnimatePresence>
            {isOpen && (
              <motion.article
                id="love-letter-paper"
                className="paper-letter relative z-20 mx-auto -mt-3 px-7 py-10 sm:px-14 sm:py-16"
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, y: 65, rotate: -1.5, scale: 0.97 }
                }
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }
                }
                transition={{
                  duration: 0.9,
                  delay: reduceMotion ? 0 : 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-live="polite"
              >
                <div className="absolute inset-3 border border-burgundy/10" aria-hidden="true" />

                {/* Decorative corner sparkle */}
                {!reduceMotion && (
                  <motion.div
                    className="absolute right-6 top-6 text-gold/30"
                    animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  >
                    <Sparkles size={16} strokeWidth={1} />
                  </motion.div>
                )}

                <div className="relative">
                  <div className="flex items-center justify-between border-b border-burgundy/15 pb-5 text-[8px] uppercase tracking-[0.25em] text-burgundy/50">
                    <span>{letter.eyebrow}</span>
                    <span>Just between us</span>
                  </div>
                  <motion.h3
                    className="mt-9 font-serif text-3xl italic text-burgundy sm:text-4xl"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 1.05, duration: 0.7 }}
                  >
                    {letter.salutation}
                    {/* Blinking cursor after salutation */}
                    {!reduceMotion && (
                      <motion.span
                        className="ml-1 inline-block h-8 w-[2px] align-middle bg-burgundy/60"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.9, repeat: 5, ease: "linear", delay: 1.1 }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.h3>
                  <div className="mt-7 space-y-6">
                    {letter.paragraphs.map((paragraph, index) => (
                      <motion.p
                        key={paragraph}
                        className="font-serif text-[1.14rem] leading-8 text-[#413336] sm:text-[1.3rem] sm:leading-9"
                        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: reduceMotion ? 0 : 1.2 + index * 0.18,
                          duration: 0.75,
                        }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                  <motion.div
                    className="mt-10 border-t border-burgundy/15 pt-7"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reduceMotion ? 0 : 1.85, duration: 0.8 }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em] text-burgundy/50">
                      {letter.closing}
                    </p>
                    <p className="mt-3 font-serif text-3xl italic text-burgundy">
                      {letter.signature}
                    </p>
                  </motion.div>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="mt-9 border-burgundy/20 text-burgundy hover:bg-burgundy/5"
                  >
                    <RotateCcw size={13} /> Fold the letter
                  </Button>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
