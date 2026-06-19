"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-xlight"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function PulseRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-brand-xlight/20"
          initial={{ width: 160, height: 160, opacity: 0 }}
          animate={{
            width: [160, 500],
            height: [160, 500],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "spin" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("spin"), 300);
    const t2 = setTimeout(() => setPhase("exit"), 3200);
    const t3 = setTimeout(() => onComplete(), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{
            background: "#E9F4FA",
          }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
          }}
        >
          {/* Background effects */}
          <Particles />
          <PulseRings />

          {/* Ambient glow behind logo */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(16,128,176,0.3) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 3D Logo Container */}
          <div className="relative" style={{ perspective: "1000px" }}>
            <motion.div
              initial={{ rotateY: -90, scale: 0.3, opacity: 0 }}
              animate={
                phase === "spin"
                  ? {
                      rotateY: [0, 360],
                      scale: 1,
                      opacity: 1,
                    }
                  : {
                      rotateY: 0,
                      scale: 1,
                      opacity: 1,
                    }
              }
              transition={
                phase === "spin"
                  ? {
                      rotateY: {
                        duration: 2.5,
                        ease: "easeInOut",
                      },
                      scale: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
                      opacity: { duration: 0.5 },
                    }
                  : {
                      duration: 0.8,
                      ease: [0.22, 0.61, 0.36, 1],
                    }
              }
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Glow effect under logo */}
              <motion.div
                className="absolute -inset-8 rounded-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(16,128,176,0.4) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Logo image */}
              <motion.div
                className="relative"
                animate={{
                  filter: [
                    "drop-shadow(0 0 20px rgba(16,128,176,0.5))",
                    "drop-shadow(0 0 40px rgba(16,128,176,0.8))",
                    "drop-shadow(0 0 20px rgba(16,128,176,0.5))",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/medcare3d.webp"
                  alt="MEDCARE"
                  width={220}
                  height={220}
                  className="relative z-10 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            className="absolute bottom-[22%] text-black text-sm sm:text-base font-['Plus_Jakarta_Sans'] font-medium tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Assistance médicale 24/7
          </motion.p>

          {/* Loading bar */}
          <div className="absolute bottom-[15%] w-48 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand via-brand-light to-brand-xlight rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, delay: 0.3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
