import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { computeTimelineMetrics } from '../utils/ribbonGeometry';
import { getSurfacePalette } from '../utils/nexloopExport';
import { NexloopLogoSvg } from './NexloopLogoSvg';

interface LoadingScreenOverlayProps {
  visible: boolean;
  speed: number;
  surface: 'light' | 'slate' | 'dark';
  onRevealStart?: () => void;
  onComplete: () => void;
}

export function LoadingScreenOverlay({
  visible,
  speed,
  surface,
  onRevealStart,
  onComplete,
}: LoadingScreenOverlayProps) {
  const prefersReduced = useReducedMotion();
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) {
      setExiting(false);
      return;
    }

    setExiting(false);
    const metrics = computeTimelineMetrics(speed);
    const holdMs = Math.round((metrics.totalDuration + 0.52) * 1000);
    const exitDurationMs = prefersReduced ? 220 : 720;

    const fadeTimer = window.setTimeout(() => {
      setExiting(true);
      onRevealStart?.();
    }, holdMs);

    const doneTimer = window.setTimeout(() => {
      onComplete();
    }, holdMs + exitDurationMs);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [visible, speed, prefersReduced, onRevealStart, onComplete]);

  if (!visible) return null;

  const palette = getSurfacePalette(surface);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Nexloop loading screen"
      data-testid="loading-screen-overlay"
      initial={false}
      animate={
        exiting
          ? prefersReduced
            ? { opacity: 0 }
            : { y: '-104%', opacity: 0 }
          : { y: '0%', opacity: 1 }
      }
      transition={
        prefersReduced
          ? { duration: 0.2 }
          : {
              y: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.56, delay: 0.14, ease: [0.16, 1, 0.3, 1] },
            }
      }
      style={{ backgroundColor: palette.bg }}
      className={`fixed inset-0 z-50 flex items-center justify-center will-change-transform ${
        exiting ? 'pointer-events-none' : ''
      }`}
    >
      {/* Subtle ocean-cyan leading edge sheen as the curtain rises */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#58C4D8]/12 via-[#A9D5EC]/5 to-transparent"
      />

      <motion.div
        initial={false}
        animate={
          exiting
            ? prefersReduced
              ? { opacity: 0 }
              : { y: -28, scale: 0.92, opacity: 0 }
            : { y: 0, scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[min(86vw,460px)] px-4"
      >
        <NexloopLogoSvg speed={speed} loop={false} surface={surface} />
      </motion.div>
    </motion.div>
  );
}
