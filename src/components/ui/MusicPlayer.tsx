"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Music2, Pause, Play, Volume2 } from "lucide-react";
import { birthday } from "@/data/birthday";

export function MusicPlayer({ autoStart = false }: { autoStart?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.42);
  const [available, setAvailable] = useState(true);
  const [showVolume, setShowVolume] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!autoStart || !audio) return;
    audio.volume = volume;
    audio.play().catch(() => setIsPlaying(false));
  }, [autoStart]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={birthday.music.src}
        preload="metadata"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => { setAvailable(false); setIsPlaying(false); }}
        aria-hidden="true"
      />
      <motion.aside
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-cream/15 bg-midnight/75 p-1.5 text-cream shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:bottom-6 sm:right-6 sm:gap-3 sm:pl-4"
        initial={reduceMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Background music player"
      >
        {available ? (
          <>
            <div className="hidden items-center gap-2 pl-1 sm:flex" aria-hidden="true">
              <span className="flex h-4 items-end gap-[2px]">
                {[0, 1, 2].map((bar) => (
                  <motion.span
                    key={bar}
                    className="w-[2px] origin-bottom rounded-full bg-gold"
                    style={{ height: 7 + bar * 3 }}
                    animate={isPlaying && !reduceMotion ? { scaleY: [0.35, 1, 0.55, 0.85, 0.35] } : { scaleY: 0.35 }}
                    transition={{ duration: 1.1 + bar * 0.2, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
                  />
                ))}
              </span>
              <span className="max-w-28 truncate text-[8px] uppercase tracking-[0.16em] text-cream/55">{birthday.music.title}</span>
            </div>
            <button
              type="button"
              onClick={togglePlayback}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-midnight transition-colors hover:bg-gold"
              aria-label={isPlaying ? "Pause background music" : "Play background music"}
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="translate-x-px" />}
            </button>
            <label className="hidden items-center gap-2 pr-2 text-cream/50 sm:flex">
              <Volume2 size={13} strokeWidth={1.5} aria-hidden="true" />
              <span className="sr-only">Music volume</span>
              <input
                className="music-range"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                aria-label="Music volume"
              />
            </label>
            <button
              type="button"
              className="flex h-10 w-8 items-center justify-center text-cream/55 sm:hidden"
              onClick={() => setShowVolume((visible) => !visible)}
              aria-label="Show music volume"
              aria-expanded={showVolume}
            >
              <Volume2 size={15} strokeWidth={1.5} />
            </button>
            <AnimatePresence>
              {showVolume && (
                <motion.div
                  className="absolute bottom-full right-0 mb-3 rounded-2xl border border-cream/15 bg-midnight/90 px-5 py-4 shadow-xl backdrop-blur-xl sm:hidden"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="flex items-center gap-3">
                    <span className="text-[8px] uppercase tracking-[0.16em] text-cream/45">Volume</span>
                    <input
                      className="music-range"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(event) => setVolume(Number(event.target.value))}
                      aria-label="Music volume"
                    />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex min-h-10 items-center gap-2 px-3 text-[9px] uppercase tracking-[0.15em] text-cream/50">
            <Music2 size={14} /> Add background.mp3
          </div>
        )}
      </motion.aside>
    </>
  );
}
