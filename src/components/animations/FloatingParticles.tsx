"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type FloatingParticlesProps = {
  count?: number;
  className?: string;
  tone?: "gold" | "cream" | "rose";
};

const toneClasses = {
  gold: "bg-gold",
  cream: "bg-cream",
  rose: "bg-rose",
};

export function FloatingParticles({ count = 22, className, tone = "gold" }: FloatingParticlesProps) {
  const reduceMotion = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: (index * 37.7 + 11) % 96,
        top: (index * 53.3 + 7) % 92,
        size: index % 7 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
        duration: 7 + (index % 6) * 1.7,
        delay: (index % 8) * 0.65,
        drift: ((index % 5) - 2) * 4,
      })),
    [count],
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className={cn("absolute rounded-full opacity-40 shadow-[0_0_8px_currentColor]", toneClasses[tone])}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={reduceMotion ? undefined : {
            y: [0, -18, 0],
            x: [0, particle.drift, 0],
            opacity: [0.12, 0.62, 0.12],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
