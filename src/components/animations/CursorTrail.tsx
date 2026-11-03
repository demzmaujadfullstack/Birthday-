"use client";

import { useEffect, useRef } from "react";

type Sparkle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  vx: number;
  vy: number;
  color: string;
};

const COLORS = ["#C5A46D", "#C58F96", "#F5EBDD", "#D4A574", "#E8C4C4"];

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      if (now - lastSpawnRef.current < 30) return;
      lastSpawnRef.current = now;

      for (let i = 0; i < 3; i++) {
        sparklesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 4 + 1.5,
          opacity: 1,
          life: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      // Keep max 120 sparkles
      if (sparklesRef.current.length > 120) {
        sparklesRef.current = sparklesRef.current.slice(-120);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparklesRef.current = sparklesRef.current.filter((s) => s.life > 0.01);

      for (const s of sparklesRef.current) {
        ctx.save();
        ctx.globalAlpha = s.life * 0.85;

        // Draw sparkle star shape
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;

        ctx.translate(s.x, s.y);
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          ctx.lineTo(Math.cos(angle) * s.size, Math.sin(angle) * s.size);
          ctx.lineTo(
            Math.cos(angle + Math.PI / 4) * (s.size * 0.38),
            Math.sin(angle + Math.PI / 4) * (s.size * 0.38)
          );
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06;
        s.life -= 0.032;
        s.size *= 0.97;
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90]"
      aria-hidden="true"
    />
  );
}
