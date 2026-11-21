import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface LiquidGlassTabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: ReactNode;
}

interface LiquidGlassTabsProps<T extends string = string> {
  tabs: LiquidGlassTabItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  layoutId: string;
  ariaLabel: string;
  variant?: 'light' | 'dark';
  hideIconsOnXs?: boolean;
  fullWidthOnMobile?: boolean;
}

/**
 * Oval frosted clear-glass segmented control inspired by iOS Liquid Glass.
 * Slides a translucent refractive glass lens smoothly across tabs using spring physics.
 */
export function LiquidGlassTabs<T extends string = string>({
  tabs,
  activeId,
  onChange,
  layoutId,
  ariaLabel,
  variant = 'light',
  hideIconsOnXs = false,
  fullWidthOnMobile = false,
}: LiquidGlassTabsProps<T>) {
  const prefersReduced = useReducedMotion();
  const isDark = variant === 'dark';

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`relative inline-flex items-center p-1 rounded-full backdrop-blur-md transition-colors ${
        fullWidthOnMobile ? 'w-full sm:w-auto justify-between sm:justify-start gap-0.5 sm:gap-1' : 'gap-0.5 sm:gap-1'
      } ${
        isDark
          ? 'bg-[#041423]/65 border border-white/15 shadow-[inset_0_1px_2px_rgba(0,0,0,0.45),0_4px_16px_-6px_rgba(0,0,0,0.45)]'
          : 'bg-slate-200/60 border border-white/85 shadow-[inset_0_1px_2px_rgba(15,23,42,0.08),0_4px_16px_-6px_rgba(13,86,131,0.14)]'
      }`}
    >
      {tabs.map((tab) => {
        const isSelected = activeId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(tab.id)}
            className={`relative inline-flex items-center justify-center gap-1.5 min-h-[38px] px-2 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold rounded-full transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 ${
              isDark
                ? isSelected
                  ? 'text-white focus-visible:ring-[#58C4D8]'
                  : 'text-[#A9D5EC] hover:text-white focus-visible:ring-[#58C4D8]'
                : isSelected
                  ? 'text-slate-900 focus-visible:ring-[#0D5683]'
                  : 'text-slate-600 hover:text-slate-900 focus-visible:ring-[#0D5683]'
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId={layoutId}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 420, damping: 28, mass: 0.8 }
                }
                aria-hidden="true"
                className={`absolute inset-0 rounded-full overflow-hidden pointer-events-none ${
                  isDark
                    ? 'bg-white/18 backdrop-blur-xl border border-white/45 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.4),inset_0_1.5px_1px_rgba(255,255,255,0.55),inset_0_-1.5px_3px_rgba(88,196,216,0.2)]'
                    : 'bg-white/70 backdrop-blur-xl border border-white/95 shadow-[0_3px_12px_-2px_rgba(13,86,131,0.16),0_1px_3px_rgba(15,23,42,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.98),inset_0_-1.5px_3px_rgba(13,86,131,0.06)]'
                }`}
              >
                {/* Top specular refraction highlight mimicking iOS clear glass */}
                <span
                  className={`absolute inset-x-1.5 top-[1px] h-1/2 rounded-t-full ${
                    isDark
                      ? 'bg-gradient-to-b from-white/30 to-transparent'
                      : 'bg-gradient-to-b from-white/90 via-white/35 to-transparent'
                  }`}
                />
                {/* Soft edge sheen */}
                <span
                  className={`absolute inset-0 rounded-full ${
                    isDark
                      ? 'bg-gradient-to-tr from-transparent via-[#58C4D8]/12 to-white/15'
                      : 'bg-gradient-to-tr from-transparent via-white/35 to-[#E0F4FB]/45'
                  }`}
                />
              </motion.span>
            )}

            {tab.icon && (
              <span
                aria-hidden="true"
                className={`relative z-10 shrink-0 transition-transform duration-200 ${
                  hideIconsOnXs ? 'hidden min-[420px]:inline-flex' : 'inline-flex'
                } ${isSelected ? 'scale-105' : 'opacity-80'}`}
              >
                {tab.icon}
              </span>
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
