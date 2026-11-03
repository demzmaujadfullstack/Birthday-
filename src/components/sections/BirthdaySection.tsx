"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { birthday } from "@/data/birthday";
import { Button } from "@/components/ui/Button";
import { FloatingParticles } from "@/components/animations/FloatingParticles";
import { GlowOrb } from "@/components/animations/GlowOrb";

const confettiColors = ["#C5A46D", "#C58F96", "#F5EBDD", "#6E3542", "#E8C4C4", "#D4A574"];

// Extended confetti burst: 48 pieces
function ConfettiBurst() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {Array.from({ length: 48 }, (_, index) => {
        const angle = (index / 48) * Math.PI * 2;
        const distance = 80 + (index % 7) * 22;
        const isRibbon = index % 5 === 0;
        return (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/2 block rounded-[1px]"
            style={{
              backgroundColor: confettiColors[index % confettiColors.length],
              width: isRibbon ? 3 : 6,
              height: isRibbon ? 14 : 6,
              borderRadius: isRibbon ? "2px" : "50%",
            }}
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance + 55,
              rotate: 360 + index * 15,
              scale: [0, 1.2, 1, 0],
            }}
            transition={{
              duration: 2.8,
              delay: (index % 8) * 0.035,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
    </div>
  );
}

export function BirthdaySection() {
  const [wishMade, setWishMade] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="birthday"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-midnight pb-36 pt-28 sm:pb-32 sm:pt-32"
      aria-labelledby="birthday-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(64,21,31,0.72),transparent_58%)]" />

      {/* Animated background glow orbs */}
      <GlowOrb
        className="left-1/2 top-1/4 -translate-x-1/2"
        color="rgba(64,21,31,0.4)"
        size={600}
        blur={130}
        duration={10}
      />

      <FloatingParticles count={18} className="opacity-60" />

      <div className="section-shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-kicker">01 · The celebration</p>
            <h1
              id="birthday-title"
              className="display-title mt-8 text-[clamp(4.5rem,10vw,9.6rem)]"
            >
              Happy
              <br />
              <em className="font-normal text-rose">Birthday</em>
            </h1>
            <motion.div
              className="mt-7 flex items-center gap-5"
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              <motion.span
                className="h-px w-10 bg-gold/60"
                animate={reduceMotion ? undefined : { scaleX: [1, 1.5, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="font-serif text-3xl italic text-cream/90 sm:text-4xl">
                {birthday.fullName}
              </p>
            </motion.div>
            <motion.p
              className="mt-7 max-w-md text-sm leading-7 text-cream/50 sm:text-base"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Today, the candles are lit for you. Close your eyes, keep the wish in your heart,
              and let this little moment be yours.
            </motion.p>
            <div className="mt-8">
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant={wishMade ? "outline" : "primary"}
                  onClick={() => setWishMade(true)}
                  disabled={wishMade}
                  aria-describedby="wish-status"
                >
                  {wishMade ? <Check size={15} /> : <Sparkles size={15} strokeWidth={1.5} />}
                  {wishMade ? birthday.wishMadeButton : birthday.wishButton}
                </Button>
              </motion.div>
            </div>
            <div className="mt-5 min-h-12 max-w-sm" aria-live="polite">
              <AnimatePresence>
                {wishMade && (
                  <motion.p
                    id="wish-status"
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-lg italic leading-6 text-gold/90"
                  >
                    {birthday.wishMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Cake visual */}
          <motion.div
            className="relative mx-auto w-full max-w-[420px]"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Rotating orbit rings */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/[0.04]"
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <div className="candle-glow absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2" aria-hidden="true" />

            <div className="relative aspect-[360/350] w-full">
              <svg
                viewBox="0 0 360 330"
                className="absolute inset-0 h-full w-full overflow-visible"
                role="img"
                aria-label="An elegant two-tier burgundy birthday cake with one candle"
              >
                <defs>
                  <linearGradient id="cakeBody" x1="0" x2="1">
                    <stop offset="0" stopColor="#2C1119" />
                    <stop offset="0.48" stopColor="#612838" />
                    <stop offset="1" stopColor="#35121D" />
                  </linearGradient>
                  <linearGradient id="icing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#FFF7E9" />
                    <stop offset="1" stopColor="#D8C4AC" />
                  </linearGradient>
                  <linearGradient id="plate" x1="0" x2="1">
                    <stop offset="0" stopColor="#6F583E" />
                    <stop offset="0.5" stopColor="#D5B77F" />
                    <stop offset="1" stopColor="#6F583E" />
                  </linearGradient>
                  <pattern id="candleStripe" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                    <rect width="10" height="10" fill="#F5EBDD" />
                    <rect width="4" height="10" fill="#C58F96" />
                  </pattern>
                  <filter id="cakeShadow" x="-30%" y="-30%" width="160%" height="180%">
                    <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000" floodOpacity=".35" />
                  </filter>
                </defs>
                <ellipse cx="180" cy="299" rx="137" ry="14" fill="#080608" opacity=".45" />
                <path d="M42 289h276c-8 18-54 27-138 27S50 307 42 289Z" fill="url(#plate)" opacity=".8" />
                <ellipse cx="180" cy="288" rx="142" ry="16" fill="#A88A5B" />
                <ellipse cx="180" cy="285" rx="137" ry="13" fill="#D2BA91" />
                <g filter="url(#cakeShadow)">
                  <path d="M67 199v82c0 18 50 31 113 31s113-13 113-31v-82Z" fill="url(#cakeBody)" />
                  <ellipse cx="180" cy="199" rx="113" ry="29" fill="#713144" />
                  <path d="M67 196v26c13 3 13 16 24 13 12-3 5-20 19-17 13 3 12 27 25 25 14-2 8-29 23-29 17 0 12 23 26 22 13-1 10-26 24-25 12 1 10 16 22 15 14-2 8-21 22-21 13 0 11 12 21 12 11 0 11-11 20-14v-7c0 16-50 29-113 29s-113-13-113-29Z" fill="url(#icing)" />
                  <ellipse cx="180" cy="195" rx="113" ry="27" fill="url(#icing)" />
                  <ellipse cx="180" cy="192" rx="95" ry="19" fill="#F6EBD9" opacity=".68" />
                  <path d="M104 124v61c0 14 34 25 76 25s76-11 76-25v-61Z" fill="url(#cakeBody)" />
                  <ellipse cx="180" cy="124" rx="76" ry="21" fill="#713144" />
                  <path d="M104 122v18c10 2 7 14 17 14 12 0 6-19 19-17 12 2 9 22 21 22 13 0 10-25 23-24 12 1 9 20 20 19 12-1 8-18 18-18 12 0 10 11 18 10 9-1 7-11 16-13v-11c0 12-34 22-76 22s-76-10-76-22Z" fill="url(#icing)" />
                  <ellipse cx="180" cy="121" rx="76" ry="20" fill="url(#icing)" />
                  <ellipse cx="180" cy="119" rx="61" ry="13" fill="#FAF0E1" opacity=".72" />
                </g>
                <path d="M180 47V37" stroke="#342326" strokeWidth="2" strokeLinecap="round" />
                <rect x="172" y="45" width="16" height="70" rx="7" fill="url(#candleStripe)" />
                <ellipse cx="180" cy="45" rx="8" ry="3" fill="#FFF5E4" />
                <g fill="#C5A46D">
                  <circle cx="124" cy="184" r="2" /><circle cx="236" cy="184" r="2" />
                  <circle cx="91" cy="255" r="2" /><circle cx="268" cy="251" r="2" />
                  <circle cx="144" cy="273" r="1.5" /><circle cx="215" cy="274" r="1.5" />
                </g>
              </svg>

              <AnimatePresence>
                {!wishMade && (
                  <motion.div
                    key="flame"
                    className="flame absolute left-[calc(50%-10px)] top-[4.5%] h-9 w-5 rounded-[50%_50%_45%_45%]"
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scaleY: 0.1, y: 12, transition: { duration: 0.28 } }
                    }
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {wishMade && !reduceMotion && (
                  <motion.span
                    className="absolute left-1/2 top-[5%] h-10 w-3 rounded-full bg-cream/10 blur-sm"
                    initial={{ opacity: 0.5, y: 10, scale: 0.6 }}
                    animate={{ opacity: 0, y: -45, x: 12, scale: 1.8 }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>

              {wishMade && !reduceMotion && <ConfettiBurst />}
            </div>
            <p className="mt-1 text-center text-[8px] uppercase tracking-[0.32em] text-cream/30">
              A wish, just for you
            </p>
          </motion.div>
        </div>
      </div>
      <div className="hairline absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}
