"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof motion.button> & {
  variant?: "primary" | "outline";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={reduceMotion || props.disabled ? undefined : { y: -2 }}
      whileTap={reduceMotion || props.disabled ? undefined : { scale: 0.98 }}
      className={cn(variant === "primary" ? "button-primary" : "button-outline", className)}
      {...props}
    />
  );
}
