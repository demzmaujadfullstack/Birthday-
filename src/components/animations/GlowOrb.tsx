"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type GlowOrbProps = {
  className?: string;
  color?: string;
  size?: number;
  blur?: number;
  duration?: number;
};

export function GlowOrb({
  className = "",
  color = "rgba(197, 164, 109, 0.15)",
  size = 500,
  blur = 100,
  duration = 8,
}: GlowOrbProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.18, 0.95, 1.1, 1],
              opacity: [0.6, 1, 0.7, 0.9, 0.6],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}
