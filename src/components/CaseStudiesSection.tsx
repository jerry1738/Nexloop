import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Database, Globe, Layers, Smartphone, X } from 'lucide-react';
import {
  CASE_STUDIES,
  filterCaseStudies,
  type CaseStudy,
  type CaseStudyCategory,
} from '../data/companyData';
import { LiquidGlassTabs, type LiquidGlassTabItem } from './LiquidGlassTabs';
import { ScrollReveal } from './ScrollReveal';

const FILTER_TABS: LiquidGlassTabItem<CaseStudyCategory>[] = [
  { id: 'all', label: 'All Work', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'erp', label: 'ERP Systems', icon: <Database className="w-3.5 h-3.5" /> },
  { id: 'mobile', label: 'Android & iOS', icon: <Smartphone className="w-3.5 h-3.5" /> },
  { id: 'web', label: 'Web & Custom', icon: <Globe className="w-3.5 h-3.5" /> },
];

export function CaseStudiesSection({
  onRequestSimilar,
}: {
  onRequestSimilar: (serviceName: string) => void;
}) {
  const prefersReduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<CaseStudyCategory>('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleStudies = filterCaseStudies(CASE_STUDIES, activeCategory);
  const spotlightStudy = visibleStudies[0];
  const secondaryStudies = visibleStudies.slice(1);

  useEffect(() => {
    if (!selectedStudy) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedStudy(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedStudy]);

  const markImageFailed = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative scroll-mt-24 py-20 sm:py-24 border-t border-slate-200 bg-[#F8FAFC] overflow-hidden"
    >
      {/* Subtle ocean atmosphere glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{
          background:
            'radial-gradient(ellipse 68% 75% at 72% 0%, rgba(88, 196, 216, 0.09), transparent 72%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#177094] mb-2">Selected work</p>
            <h2
              id="work-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance"
            >
              Measurable delivery across ERP, mobile, and web systems
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Production systems engineered for multi-site operations, offline-ready mobile teams,
              and high-conversion B2B web pipelines.
            </p>
          </div>

          <LiquidGlassTabs
            tabs={FILTER_TABS}
            activeId={activeCategory}
            onChange={setActiveCategory}
            layoutId="nl-work-glass-tabs"
            ariaLabel="Filter case studies"
            variant="light"
            hideIconsOnXs
            fullWidthOnMobile
          />
        </ScrollReveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory}
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: -6, transition: { duration: 0.14 } }
            }
            className="grid grid-cols-1 lg:grid-cols-12 gap-7"
          >
            {/* Lead Spotlight Case Study */}
            {spotlightStudy && (
              <motion.article
                initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-12 group relative rounded-2xl border border-[#177094]/40 bg-gradient-to-br from-[#071D31] via-[#0B3052] to-[#0D5683] text-white overflow-hidden shadow-[0_24px_54px_-26px_rgba(13,86,131,0.45)]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#58C4D8]/85 to-transparent z-10"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* Animated Backgroundless Cutout Photo Stage */}
                  <div className="lg:col-span-6 relative flex items-center justify-center p-7 sm:p-10 min-h-[270px] sm:min-h-[340px] lg:min-h-[410px]">
                    {/* Ambient radial light aura without any frame box */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 52%, rgba(88, 196, 216, 0.22) 0%, rgba(13, 86, 131, 0.06) 48%, transparent 72%)',
                      }}
                    />

                    <motion.div
                      animate={
                        prefersReduced
                          ? undefined
                          : {
                              y: [0, -9, 0],
                              rotate: [-0.45, 0.45, -0.45],
                            }
                      }
                      transition={
                        prefersReduced
                          ? undefined
                          : {
                              duration: 5.4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                      }
                      className="relative z-10 w-full max-w-[440px] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:-translate-y-1.5"
                    >
                      {!failedImages[spotlightStudy.id] ? (
                        <img
                          src={spotlightStudy.image}
                          alt={spotlightStudy.imageAlt}
                          referrerPolicy="no-referrer"
                          onError={() => markImageFailed(spotlightStudy.id)}
                          className="w-full h-auto max-h-[300px] sm:max-h-[330px] object-contain select-none drop-shadow-[0_26px_38px_rgba(2,12,24,0.62)]"
                        />
                      ) : (
                        <div className="py-12 px-8 text-center">
                          <span className="text-base font-semibold text-white">
                            {spotlightStudy.client}
                          </span>
                          <span className="mt-1 block text-xs text-[#9BD8EB]">
                            {spotlightStudy.categoryLabel}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Spotlight Narrative & Highlights */}
                  <div className="lg:col-span-6 p-6 sm:p-8 lg:p-9 lg:pl-2 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#9BD8EB]">
                        <span className="font-semibold text-[#7AD7E8] tabular-nums">
                          {spotlightStudy.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-white whitespace-nowrap">
                          {spotlightStudy.client}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="whitespace-nowrap">{spotlightStudy.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums whitespace-nowrap">
                          {spotlightStudy.timeline}
                        </span>
                      </div>

                      <p className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-[#7AD7E8] tabular-nums">
                        {spotlightStudy.metric}
                      </p>

                      <h3 className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug text-balance">
                        {spotlightStudy.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-[#D6ECF8] leading-relaxed">
                        {spotlightStudy.summary}
                      </p>

                      {/* Architectural Outcome Breakdown */}
                      <dl className="mt-6 border-y border-white/15 divide-y divide-white/12">
                        {spotlightStudy.highlights.map((item) => (
                          <div
                            key={item.label}
                            className="py-2.5 flex items-baseline justify-between gap-4"
                          >
                            <dt className="text-xs text-[#9BD8EB]">{item.label}</dt>
                            <dd className="text-xs sm:text-sm font-semibold text-white tabular-nums text-right">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="mt-6 pt-1 space-y-4">
                      <p className="text-xs font-mono text-[#9BD8EB]">
                        {spotlightStudy.stack.join(' · ')}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedStudy(spotlightStudy)}
                          className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-lg bg-white text-[#0D5683] hover:bg-[#EAF6FC] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58C4D8]"
                        >
                          <span>Inspect case study</span>
                          <ArrowUpRight
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRequestSimilar(spotlightStudy.categoryLabel)}
                          className="inline-flex items-center min-h-[42px] px-2 py-2 text-sm font-medium text-[#BCE3F7] hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58C4D8] rounded"
                        >
                          Plan similar build
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Secondary Showcase Pair with Free-Floating Backgroundless Photos */}
            {secondaryStudies.map((study, idx) => (
              <motion.article
                key={study.id}
                initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.42,
                  delay: (idx + 1) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:col-span-6 group relative rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#0D5683]/45 hover:shadow-[0_18px_40px_-22px_rgba(13,86,131,0.24)]"
              >
                {/* Ocean-blue top-edge sweep */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#58C4D8] via-[#177094] to-[#0D5683] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-10"
                />

                <div>
                  {/* Animated Transparent PNG Cutout Stage (No Photo Background) */}
                  <div className="relative px-6 pt-8 pb-3 h-[230px] sm:h-[260px] flex items-center justify-center">
                    <motion.div
                      animate={
                        prefersReduced
                          ? undefined
                          : {
                              y: [0, -7, 0],
                              rotate: idx % 2 === 0 ? [-0.4, 0.4, -0.4] : [0.4, -0.4, 0.4],
                            }
                      }
                      transition={
                        prefersReduced
                          ? undefined
                          : {
                              duration: 5 + idx * 0.6,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                      }
                      className="w-full max-w-[330px] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:-translate-y-1.5"
                    >
                      {!failedImages[study.id] ? (
                        <img
                          src={study.image}
                          alt={study.imageAlt}
                          referrerPolicy="no-referrer"
                          onError={() => markImageFailed(study.id)}
                          className="w-full h-auto max-h-[210px] sm:max-h-[230px] object-contain select-none drop-shadow-[0_20px_28px_rgba(13,86,131,0.2)]"
                        />
                      ) : (
                        <div className="py-10 text-center">
                          <span className="text-sm font-semibold text-[#0D5683]">
                            {study.client}
                          </span>
                          <span className="mt-1 block text-xs text-slate-600">
                            {study.categoryLabel}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Narrative & Key Outcomes */}
                  <div className="px-6 sm:px-7 pb-6 pt-2">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                      <span className="font-semibold text-[#177094] tabular-nums">
                        {study.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-800 whitespace-nowrap">
                        {study.client}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="whitespace-nowrap">{study.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums whitespace-nowrap">{study.timeline}</span>
                    </div>

                    <p className="mt-2.5 text-lg font-bold tracking-tight text-[#0D5683] tabular-nums">
                      {study.metric}
                    </p>

                    <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-900 leading-snug text-balance">
                      {study.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {study.summary}
                    </p>

                    <dl className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                      {study.highlights.slice(0, 2).map((item) => (
                        <div key={item.label}>
                          <dt className="text-[11px] text-slate-500">{item.label}</dt>
                          <dd className="mt-0.5 text-xs sm:text-sm font-semibold text-slate-900 tabular-nums">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* Stack & Actions */}
                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-slate-100 space-y-3">
                  <p className="text-xs font-mono text-slate-500">
                    {study.stack.slice(0, 4).join(' · ')}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedStudy(study)}
                      className="inline-flex items-center gap-1.5 min-h-[40px] text-sm font-semibold text-[#0D5683] hover:text-[#0A456A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded"
                    >
                      <span>Inspect case study</span>
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRequestSimilar(study.categoryLabel)}
                      className="inline-flex items-center min-h-[40px] text-xs font-medium text-slate-500 hover:text-[#0D5683] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded"
                    >
                      Plan similar build
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated Case Study Detail Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            key="case-study-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-dialog-title"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedStudy(null)}
          >
            <motion.div
              key={selectedStudy.id}
              initial={prefersReduced ? false : { opacity: 0, scale: 0.97, y: 12 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
              }}
              exit={
                prefersReduced
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97, y: 8, transition: { duration: 0.15 } }
              }
              className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Cutout Showcase Stage */}
              <div className="relative bg-gradient-to-br from-[#071D31] via-[#0B3052] to-[#0D5683] px-6 sm:px-8 pt-7 pb-6 overflow-hidden">
                <button
                  type="button"
                  aria-label="Close case study details"
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/25 backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58C4D8]"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  <div className="sm:col-span-5 flex items-center justify-center">
                    {!failedImages[selectedStudy.id] && (
                      <motion.img
                        src={selectedStudy.image}
                        alt={selectedStudy.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() => markImageFailed(selectedStudy.id)}
                        animate={prefersReduced ? undefined : { y: [0, -5, 0] }}
                        transition={
                          prefersReduced
                            ? undefined
                            : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                        }
                        className="w-full max-w-[210px] h-auto max-h-[150px] object-contain drop-shadow-[0_18px_28px_rgba(2,12,24,0.6)]"
                      />
                    )}
                  </div>

                  <div className="sm:col-span-7 pr-8 sm:pr-6">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#BCE3F7]">
                      <span className="font-semibold text-white">{selectedStudy.client}</span>
                      <span aria-hidden="true">·</span>
                      <span>{selectedStudy.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{selectedStudy.timeline}</span>
                    </div>
                    <h3
                      id="case-study-dialog-title"
                      className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug text-balance"
                    >
                      {selectedStudy.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-lg font-bold text-[#0D5683] tabular-nums">
                  {selectedStudy.metric}
                </p>

                {/* Outcome Highlights Strip */}
                <dl className="mt-4 py-4 border-y border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedStudy.highlights.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs text-slate-500">{item.label}</dt>
                      <dd className="mt-0.5 text-sm font-semibold text-slate-900 tabular-nums">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 mb-1.5">
                      The challenge
                    </h4>
                    <p>{selectedStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 mb-1.5">
                      What Nexloop built
                    </h4>
                    <p>{selectedStudy.solution}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-900 mb-1.5">
                    Architecture &amp; stack
                  </h4>
                  <p className="text-xs font-mono text-slate-600">
                    {selectedStudy.stack.join(' · ')}
                  </p>
                </div>

                <div className="mt-7 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedStudy(null)}
                    className="min-h-[40px] px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const label = selectedStudy.categoryLabel;
                      setSelectedStudy(null);
                      onRequestSimilar(label);
                    }}
                    className="min-h-[40px] px-5 py-2 text-sm font-semibold text-white bg-[#0D5683] hover:bg-[#0A456A] rounded-lg transition-colors"
                  >
                    Plan a similar build
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
