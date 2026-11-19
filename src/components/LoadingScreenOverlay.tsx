import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { computeTimelineMetrics } from '../utils/ribbonGeometry';
import { getSurfacePalette } from '../utils/nexloopExport';
import { soundEngine } from '../utils/soundEngine';
import { NexloopLogoSvg } from './NexloopLogoSvg';

interface LoadingScreenOverlayProps {
  visible: boolean;
  speed: number;
  surface: 'light' | 'slate' | 'dark';
  soundEnabled: boolean;
  onToggleSound: () => void;
  onComplete: () => void;
}

export function LoadingScreenOverlay({
  visible,
  speed,
  surface,
  soundEnabled,
  onToggleSound,
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
  const isDark = surface === 'dark';

  const handleSkip = () => {
    soundEngine.stopWind(0.06);
    setExiting(true);
    window.setTimeout(() => {
      onComplete();
    }, 220);
  };

  const btnClasses = isDark
    ? 'text-slate-300 hover:text-white hover:bg-white/10'
    : 'text-slate-500 hover:text-[#0D5683] hover:bg-slate-100';

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
        <NexloopLogoSvg
          speed={speed}
          loop={false}
          surface={surface}
          soundEnabled={soundEnabled}
        />
      </div>

      <div className="fixed bottom-7 right-7 flex items-center gap-2">
        <button
          type="button"
          aria-pressed={soundEnabled}
          onClick={() => {
            void soundEngine.unlock();
            onToggleSound();
          }}
          className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 text-xs font-medium tracking-wide rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] whitespace-nowrap shrink-0 ${btnClasses}`}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          <span>{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className={`min-h-[44px] px-4 py-2 text-xs font-medium tracking-wide rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] whitespace-nowrap shrink-0 ${btnClasses}`}
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}
