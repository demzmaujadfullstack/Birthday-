"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Star = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

export function TwinklingStars({ count = 60 }: { count?: number }) {
  const reduceMotion = useReducedMotion();
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 41.7 + 13) % 100,
        top: (i * 29.3 + 5) % 100,
        size: i % 9 === 0 ? 2.5 : i % 4 === 0 ? 1.8 : 1,
        duration: 2.5 + (i % 7) * 0.8,
        delay: (i % 11) * 0.3,
        opacity: 0.3 + (i % 5) * 0.1,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-cream"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.15],
                  scale: [0.8, 1.4, 0.8],
                }
          }
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
