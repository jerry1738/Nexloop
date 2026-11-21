import { useEffect, useState } from 'react';
import { computeTimelineMetrics } from '../utils/ribbonGeometry';
import { getSurfacePalette } from '../utils/nexloopExport';
import { NexloopLogoSvg } from './NexloopLogoSvg';

interface LoadingScreenOverlayProps {
  visible: boolean;
  speed: number;
  surface: 'light' | 'slate' | 'dark';
  onComplete: () => void;
}

export function LoadingScreenOverlay({
  visible,
  speed,
  surface,
  onComplete,
}: LoadingScreenOverlayProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!visible) {
      setExiting(false);
      return;
    }

    setExiting(false);
    const metrics = computeTimelineMetrics(speed);
    const holdMs = Math.round((metrics.totalDuration + 0.55) * 1000);

    const fadeTimer = window.setTimeout(() => {
      setExiting(true);
    }, holdMs);

    const doneTimer = window.setTimeout(() => {
      onComplete();
    }, holdMs + 450);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [visible, speed, onComplete]);

  if (!visible) return null;

  const palette = getSurfacePalette(surface);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Nexloop loading screen"
      data-testid="loading-screen-overlay"
      style={{ backgroundColor: palette.bg }}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        exiting ? 'opacity-0 scale-[1.015] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="w-[min(86vw,460px)] px-4">
        <NexloopLogoSvg speed={speed} loop={false} surface={surface} />
      </div>
    </div>
  );
}
