import { useCallback, useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import {
  getCurvedTestimonialSlot,
  TESTIMONIALS,
  type TestimonialItem,
} from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function AvatarPortrait({
  item,
  failed,
  onError,
}: {
  item: TestimonialItem;
  failed: boolean;
  onError: () => void;
}) {
  if (failed) {
    return (
      <span className="w-full h-full flex items-center justify-center bg-[#E7F1F8] text-[#0D5683] font-bold text-base select-none">
        {getInitials(item.name)}
      </span>
    );
  }

  return (
    <img
      src={item.avatar}
      alt={item.name}
      referrerPolicy="no-referrer"
      onError={onError}
      className="w-full h-full object-cover object-top select-none"
    />
  );
}

export function TestimonialsSection() {
  const prefersReduced = useReducedMotion();
  const arcMaskId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [activeIndex, setActiveIndex] = useState(3); // Start with Lucas Moreau centered just like balanced arc
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [failedAvatars, setFailedAvatars] = useState<Record<string, boolean>>({});
  const [viewportMode, setViewportMode] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth < 640) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setViewportMode('mobile');
      else if (w < 1024) setViewportMode('tablet');
      else setViewportMode('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = TESTIMONIALS.length;
  const active = TESTIMONIALS[activeIndex];

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  const handleSelect = (idx: number) => {
    if (idx === activeIndex) return;
    const slot = getCurvedTestimonialSlot(idx, activeIndex, total);
    setDirection(slot.offset >= 0 ? 1 : -1);
    setActiveIndex(idx);
  };

  // Gentle auto-advance paused when hovering, focusing, or preferring reduced motion
  useEffect(() => {
    if (prefersReduced || isPaused) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 6200);
    return () => window.clearInterval(timer);
  }, [prefersReduced, isPaused, total]);

  // Responsive curved-arc geometry constants
  const arcConfig =
    viewportMode === 'mobile'
      ? { radius: 175, stepDeg: 27, avatarSize: 74, topPad: 50, maxOffsetVisible: 2 }
      : viewportMode === 'tablet'
        ? { radius: 300, stepDeg: 21, avatarSize: 84, topPad: 58, maxOffsetVisible: 3 }
        : { radius: 390, stepDeg: 20, avatarSize: 92, topPad: 62, maxOffsetVisible: 3 };

  const arcCenterY = arcConfig.topPad + arcConfig.radius;

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 border-t border-slate-200 bg-[#F8FAFC] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs font-medium text-[#177094] mb-2">Client testimonials</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Outcomes reported by the teams using our software daily
          </h2>
        </ScrollReveal>

        {/* Interactive Curved Arc Testimonial Stage */}
        <ScrollReveal delay={0.08}>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
              }
            }}
            className="relative mx-auto max-w-[920px] min-h-[430px] sm:min-h-[470px] flex flex-col items-center"
          >
            {/* Upper semi-circular hairline orbital track */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 w-full h-[330px] overflow-visible"
              viewBox="-460 0 920 330"
              preserveAspectRatio="xMidYMin meet"
            >
              <defs>
                <linearGradient id={`nl-arc-fade-${arcMaskId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.52" />
                  <stop offset="52%" stopColor="#CBD5E1" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle
                cx="0"
                cy={arcCenterY}
                r={arcConfig.radius}
                fill="none"
                stroke={`url(#nl-arc-fade-${arcMaskId})`}
                strokeWidth="1.35"
              />
            </svg>

            {/* Curved Avatar Ring */}
            <div
              className="relative z-30 w-full h-0"
              aria-label="Select client testimonial"
            >
              {TESTIMONIALS.map((item, idx) => {
                const slot = getCurvedTestimonialSlot(
                  idx,
                  activeIndex,
                  total,
                  arcConfig.stepDeg
                );
                const rad = (slot.angleDeg * Math.PI) / 180;
                const x = Math.sin(rad) * arcConfig.radius;
                const y = arcConfig.topPad + (1 - Math.cos(rad)) * arcConfig.radius;
                const isHiddenOnMobile =
                  Math.abs(slot.offset) > arcConfig.maxOffsetVisible;

                const targetOpacity = isHiddenOnMobile ? 0 : slot.opacity;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    aria-label={`${item.name}, ${item.role} at ${item.company}`}
                    aria-pressed={slot.isCenter}
                    tabIndex={isHiddenOnMobile ? -1 : 0}
                    initial={false}
                    animate={{
                      x: x - arcConfig.avatarSize / 2,
                      y: y - arcConfig.avatarSize / 2,
                      scale: slot.scale,
                      opacity: targetOpacity,
                    }}
                    whileHover={
                      slot.isCenter || prefersReduced || isHiddenOnMobile
                        ? undefined
                        : { scale: slot.scale * 1.09, opacity: Math.min(1, slot.opacity + 0.18) }
                    }
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : {
                            type: 'spring',
                            stiffness: 230,
                            damping: 26,
                            mass: 0.9,
                          }
                    }
                    style={{
                      width: arcConfig.avatarSize,
                      height: arcConfig.avatarSize,
                      left: '50%',
                      top: 0,
                      zIndex: slot.zIndex,
                      pointerEvents: isHiddenOnMobile ? 'none' : 'auto',
                    }}
                    className={`absolute rounded-full overflow-hidden transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] focus-visible:ring-offset-2 ${
                      slot.isCenter
                        ? 'ring-[3px] ring-[#0D5683] ring-offset-4 ring-offset-[#F8FAFC] shadow-[0_14px_30px_-10px_rgba(13,86,131,0.4)] cursor-default'
                        : 'ring-2 ring-white shadow-sm cursor-pointer'
                    }`}
                  >
                    <AvatarPortrait
                      item={item}
                      failed={Boolean(failedAvatars[item.id])}
                      onError={() =>
                        setFailedAvatars((prev) => ({ ...prev, [item.id]: true }))
                      }
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Central Quote Stage nested harmoniously beneath the apex portrait */}
            <div
              className="pointer-events-none relative z-20 w-full flex flex-col items-center text-center"
              style={{
                paddingTop:
                  viewportMode === 'mobile'
                    ? arcConfig.topPad + arcConfig.avatarSize / 2 + 62
                    : arcConfig.topPad + arcConfig.avatarSize / 2 + 24,
              }}
            >
              {/* Outcome metric & 5-star row */}
              <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pb-4 mb-5 border-b border-slate-200/80">
                <span className="text-xs font-semibold text-[#0D5683] tracking-normal tabular-nums">
                  {active.outcomeMetric}
                </span>
                <span className="text-slate-300" aria-hidden="true">
                  ·
                </span>
                <div
                  className="inline-flex items-center gap-0.5 text-[#0D5683]"
                  aria-label={`${active.rating} out of 5 stars`}
                >
                  {Array.from({ length: active.rating }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="w-3.5 h-3.5 fill-[#0D5683] text-[#0D5683]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* Quote + Flanking Prev / Next Arrow Controls */}
              <div className="pointer-events-auto relative w-full max-w-[580px] flex items-center justify-center gap-3 sm:gap-6">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={handlePrev}
                  className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-[#0D5683] hover:border-[#0D5683]/45 shadow-xs transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683]"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>

                <div className="flex-1 min-w-0 px-1 sm:px-2">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active.id}
                      initial={
                        prefersReduced
                          ? false
                          : { opacity: 0, x: direction * 18 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      exit={
                        prefersReduced
                          ? { opacity: 0 }
                          : { opacity: 0, x: direction * -18 }
                      }
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <blockquote className="text-lg sm:text-xl md:text-[22px] font-medium text-slate-800 leading-relaxed text-balance">
                        &ldquo;{active.quote}&rdquo;
                      </blockquote>

                      <div className="mt-6">
                        <div className="text-base font-bold text-slate-900">
                          {active.name}
                        </div>
                        <div className="mt-0.5 text-sm text-slate-600">
                          {active.role} · {active.company}
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          Verified client · {active.projectType}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={handleNext}
                  className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-[#0D5683] hover:border-[#0D5683]/45 shadow-xs transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683]"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Compact Bottom Controls (mobile arrow buttons + indicator bars) */}
              <div className="pointer-events-auto mt-7 flex items-center justify-center gap-4">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={handlePrev}
                  className="sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-[#0D5683] shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683]"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>

                <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonial slides">
                  {TESTIMONIALS.map((item, idx) => {
                    const isCurrent = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isCurrent}
                        aria-label={`Show testimonial from ${item.name}`}
                        onClick={() => handleSelect(idx)}
                        className="p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-300 ${
                            isCurrent
                              ? 'w-6 bg-[#0D5683]'
                              : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={handleNext}
                  className="sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-[#0D5683] shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683]"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
