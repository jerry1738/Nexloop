import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Pause,
  PenTool,
  Play,
  Rocket,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';
import { ProcessPhaseVisual } from './ProcessPhaseVisual';

const PHASE_ICONS = [Compass, PenTool, Code2, Rocket];

export function ProcessSection() {
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHoveringStage, setIsHoveringStage] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });

  useEffect(() => {
    if (prefersReduced || !isAutoPlaying || isHoveringStage || !isInView) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [prefersReduced, isAutoPlaying, isHoveringStage, isInView]);

  const activeStep = PROCESS_STEPS[activeIndex];
  const progressFraction = (activeIndex + 1) / PROCESS_STEPS.length;

  const selectPhase = (idx: number, pauseAuto = true) => {
    setActiveIndex(idx);
    if (pauseAuto) setIsAutoPlaying(false);
  };

  const handleStepKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectPhase((idx + 1) % PROCESS_STEPS.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectPhase((idx - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length);
    }
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="scroll-mt-24 py-20 border-t border-slate-200 bg-gradient-to-b from-white via-[#F6FBFE]/75 to-white"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#177094] mb-2">How we build</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Predictable delivery from architecture to production SLA
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Click any milestone below or let the tour play through weekly demos, fixed scopes, and direct engineering ownership.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0 text-xs font-mono text-slate-500">
            <span className="text-[#0D5683] font-semibold tabular-nums">
              {activeStep.index}
            </span>
            <span>/</span>
            <span className="tabular-nums">0{PROCESS_STEPS.length}</span>
            <span className="text-slate-300">•</span>
            <span className="whitespace-nowrap">{activeStep.timeframe}</span>
          </div>
        </ScrollReveal>

        {/* Interactive 4-stage timeline + animated connector track */}
        <div className="relative mb-6">
          {/* Desktop horizontal connector track behind cards */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-slate-200/80 rounded-full overflow-hidden pointer-events-none"
          >
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-[#58C4D8] via-[#177094] to-[#0D5683]"
              initial={false}
              animate={{ scaleX: progressFraction }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 260, damping: 28 }
              }
            />
          </div>

          <div
            role="tablist"
            aria-label="Engineering delivery phases"
            className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = PHASE_ICONS[idx % PHASE_ICONS.length];
              const isSelected = activeIndex === idx;
              const isCompletedOrCurrent = idx <= activeIndex;

              return (
                <motion.button
                  key={step.index}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => selectPhase(idx)}
                  onKeyDown={(e) => handleStepKeyDown(e, idx)}
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col justify-start h-full text-left rounded-xl p-4 sm:p-5 border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] ${
                    isSelected
                      ? 'bg-white border-[#177094]/45 shadow-[0_14px_32px_-16px_rgba(13,86,131,0.28)]'
                      : 'bg-white/85 border-slate-200/90 hover:bg-white hover:border-[#177094]/30 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Animated active top accent line */}
                  {isSelected && (
                    <motion.span
                      layoutId="process-active-top-bar"
                      aria-hidden="true"
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 32 }
                      }
                      className="absolute inset-x-3 top-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#58C4D8] to-[#0D5683]"
                    />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-[#0D5683] text-white'
                          : isCompletedOrCurrent
                            ? 'bg-[#E0F4FB] text-[#0D5683]'
                            : 'bg-slate-100 text-slate-500 group-hover:text-[#0D5683] group-hover:bg-[#E0F4FB]/70'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>

                    <span
                      className={`text-[11px] font-mono tabular-nums whitespace-nowrap ${
                        isSelected ? 'text-[#0D5683] font-semibold' : 'text-slate-400'
                      }`}
                    >
                      <span className="sm:hidden">{step.index}</span>
                      <span className="hidden sm:inline">{step.timeframe}</span>
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`hidden sm:inline text-xs font-bold tabular-nums ${
                        isSelected ? 'text-[#177094]' : 'text-slate-400'
                      }`}
                    >
                      {step.index}.
                    </span>
                    <h3
                      className={`text-sm sm:text-base font-bold leading-snug ${
                        isSelected ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                      }`}
                    >
                      <span className="sm:hidden">{step.shortTitle}</span>
                      <span className="hidden sm:inline">{step.title}</span>
                    </h3>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    <span className="sm:hidden">{step.timeframe}</span>
                    <span className="hidden sm:inline">{step.milestoneOutput}</span>
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Ocean-navy interactive phase spotlight & live vector animation */}
        <motion.div
          onMouseEnter={() => setIsHoveringStage(true)}
          onMouseLeave={() => setIsHoveringStage(false)}
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl bg-gradient-to-br from-[#071D31] via-[#0B3052] to-[#0D5683] text-white border border-[#177094]/40 shadow-[0_24px_54px_-26px_rgba(13,86,131,0.48)] overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          {/* Ambient radial ocean sheen */}
          <div
            aria-hidden="true"
            className="absolute -left-20 -bottom-24 w-80 h-80 rounded-full bg-[#58C4D8]/12 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left column: active phase details & deliverables */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <motion.div
                key={activeStep.index}
                initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs font-medium text-[#A9D5EC] mb-2">
                  Phase {activeStep.index} · {activeStep.timeframe} · {activeStep.milestoneOutput}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white text-balance">
                  {activeStep.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#E0F4FB]/85 leading-relaxed">
                  {activeStep.detail}
                </p>

                <ul className="mt-6 pt-5 border-t border-white/15 space-y-2.5">
                  {activeStep.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[#E0F4FB]"
                    >
                      <Check className="w-4 h-4 text-[#58C4D8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Liquid-glass interactive stepper + tour toggle */}
              <div className="mt-7 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center p-1 rounded-full bg-[#041423]/65 border border-white/15 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.45)]">
                  <button
                    type="button"
                    aria-label="Previous build phase"
                    onClick={() =>
                      selectPhase(
                        (activeIndex - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length
                      )
                    }
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full text-[#A9D5EC] hover:text-white hover:bg-white/12 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58C4D8]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="px-3 text-xs font-mono text-white/90 tabular-nums whitespace-nowrap">
                    {activeStep.index} / 0{PROCESS_STEPS.length}
                  </span>

                  <button
                    type="button"
                    aria-label="Next build phase"
                    onClick={() => selectPhase((activeIndex + 1) % PROCESS_STEPS.length)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full text-[#A9D5EC] hover:text-white hover:bg-white/12 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58C4D8]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {!prefersReduced && (
                    <button
                      type="button"
                      aria-label={isAutoPlaying ? 'Pause phase auto-tour' : 'Play phase auto-tour'}
                      onClick={() => setIsAutoPlaying((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 ml-1 px-3 h-9 rounded-full bg-white/16 border border-white/30 text-xs font-semibold text-white hover:bg-white/24 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58C4D8]"
                    >
                      {isAutoPlaying ? (
                        <>
                          <Pause className="w-3 h-3" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3" />
                          <span>Tour</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#58C4D8] hover:text-white transition-colors whitespace-nowrap"
                >
                  <span>Start Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right column: animated engineering illustration stage */}
            <div className="lg:col-span-6">
              <ProcessPhaseVisual activeIndex={activeIndex} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
