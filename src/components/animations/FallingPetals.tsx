"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Petal = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
};

export function FallingPetals({ count = 18 }: { count?: number }) {
  const reduceMotion = useReducedMotion();
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 43.7 + 3) % 100,
        duration: 9 + (i % 8) * 1.5,
        delay: (i % 12) * 0.85,
        size: 5 + (i % 4) * 2.5,
        drift: ((i % 5) - 2) * 50,
        rotation: (i % 3) * 120,
        rotationSpeed: 180 + (i % 5) * 60,
      })),
    [count]
  );

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: "-30px",
            width: petal.size,
            height: petal.size,
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, petal.drift, petal.drift * 0.4],
            rotate: [petal.rotation, petal.rotation + petal.rotationSpeed],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Heart petal shape */}
          <svg viewBox="0 0 24 24" width={petal.size} height={petal.size} fill="none">
            <path
              d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
              fill="#C58F96"
              fillOpacity="0.55"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
