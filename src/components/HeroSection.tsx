import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE, KPI_METRICS } from '../data/companyData';
import { FloatingTechBackground } from './FloatingTechBackground';

interface HeroSectionProps {
  onStartProject: () => void;
  entered?: boolean;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection({ onStartProject, entered = true }: HeroSectionProps) {
  const prefersReduced = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  const reveal = prefersReduced || entered;

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-8 sm:pt-12 pb-16 sm:pb-20"
    >
      {/* Monochrome floating technology & software icons bloom cleanly when home enters */}
      <motion.div
        aria-hidden="true"
        initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
        animate={reveal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.85, delay: 0.05, ease: EASE_OUT_EXPO }}
        className="absolute inset-0 pointer-events-none"
      >
        <FloatingTechBackground />
      </motion.div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center lg:items-end">
          {/* Left proposition column with staggered editorial cascade */}
          <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:pb-12">
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT_EXPO }}
              className="text-xs font-medium text-[#177094] tracking-wide mb-4"
            >
              Enterprise ERP · Android &amp; iOS · Web Platforms · Custom Software
            </motion.p>

            <motion.h1
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.65, delay: 0.17, ease: EASE_OUT_EXPO }}
              className="text-[clamp(2.25rem,4vw,3.55rem)] font-bold tracking-tight text-slate-900 leading-[1.08] text-balance"
            >
              Software built to connect operations and scale cleanly.
            </motion.h1>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE_OUT_EXPO }}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              Nexloop engineers custom ERP systems, native Android and iOS mobile apps, fast corporate websites, and tailored internal software for growing organizations.
            </motion.p>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, delay: 0.31, ease: EASE_OUT_EXPO }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center gap-2 min-h-[44px] px-6 py-3 text-sm font-semibold text-white bg-[#0D5683] hover:bg-[#0A456A] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] focus-visible:ring-offset-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href="#work"
                className="inline-flex items-center min-h-[44px] px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#0D5683] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded-lg"
              >
                Explore selected work
              </a>
            </motion.div>
          </div>

          {/* Right transparent PNG animated Ethiopian host cutout */}
          <div className="lg:col-span-6 flex items-end justify-center relative">
            {/* Soft ocean radial aura swelling cleanly behind portrait */}
            <motion.div
              aria-hidden="true"
              initial={prefersReduced ? false : { opacity: 0, scale: 0.82 }}
              animate={reveal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
              transition={{ duration: 0.9, delay: 0.14, ease: EASE_OUT_EXPO }}
              className="pointer-events-none absolute bottom-6 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#58C4D8]/16 via-[#A9D5EC]/18 to-transparent blur-2xl"
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 28, scale: 0.94 }}
              animate={
                reveal
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 28, scale: 0.94 }
              }
              transition={{ duration: 0.72, delay: 0.16, ease: EASE_OUT_EXPO }}
              className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px] mx-auto"
            >
              <motion.div
                animate={
                  prefersReduced
                    ? undefined
                    : {
                        y: [0, -8, 0],
                      }
                }
                transition={
                  prefersReduced
                    ? undefined
                    : {
                        duration: 5.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
              >
                {!imgFailed ? (
                  <img
                    src={HERO_IMAGE.src}
                    alt={HERO_IMAGE.alt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="w-full h-auto block select-none drop-shadow-[0_22px_36px_rgba(13,86,131,0.18)]"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] flex flex-col items-center justify-center p-8 text-center">
                    <span className="text-lg font-bold text-[#0D5683]">Nexloop Engineering</span>
                    <span className="mt-1 text-sm text-slate-600">
                      ERP · Android &amp; iOS · Web Platforms
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Full-width proof KPI strip rippling cleanly in below hero */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white/70 backdrop-blur-[2px]">
          {KPI_METRICS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{
                duration: 0.5,
                delay: 0.34 + idx * 0.055,
                ease: EASE_OUT_EXPO,
              }}
            >
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
                {item.value}
              </div>
              <p className="mt-1 text-sm text-slate-600 leading-snug">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
