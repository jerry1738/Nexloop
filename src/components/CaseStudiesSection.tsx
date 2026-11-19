import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import {
  CASE_STUDIES,
  filterCaseStudies,
  type CaseStudy,
  type CaseStudyCategory,
} from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

const FILTER_TABS: { id: CaseStudyCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'erp', label: 'ERP Systems' },
  { id: 'mobile', label: 'Android & iOS' },
  { id: 'web', label: 'Web & Custom' },
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

  return (
    <section id="work" className="scroll-mt-24 py-20 border-t border-slate-200 bg-[#F8FAFC]">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-[#177094] mb-2">Selected work</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Measurable delivery across ERP, mobile, and web systems
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter case studies"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start md:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] ${
                    isActive
                      ? 'bg-white text-[#0D5683] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleStudies.map((study, idx) => (
            <motion.article
              key={study.id}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.42, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between transition-colors hover:border-[#0D5683]/45"
            >
              <div>
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-200">
                  {!failedImages[study.id] ? (
                    <img
                      src={study.image}
                      alt={study.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [study.id]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F4F8FB] to-[#E2EFF7] p-6 text-center">
                      <span className="text-sm font-semibold text-[#0D5683]">
                        {study.client}
                      </span>
                      <span className="mt-1 text-xs text-slate-600">
                        {study.categoryLabel}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Unboxed typographic metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">{study.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{study.timeline}</span>
                  </div>

                  <p className="mt-3 text-lg font-bold tracking-tight text-[#0D5683] tabular-nums">
                    {study.metric}
                  </p>
                  <h3 className="mt-1.5 text-base font-bold text-slate-900 leading-snug">
                    {study.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {study.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedStudy(study)}
                  className="inline-flex items-center gap-1.5 min-h-[40px] text-sm font-semibold text-[#0D5683] hover:text-[#0A456A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded"
                >
                  <span>Read case study</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Case study detail modal */}
      {selectedStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-dialog-title"
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedStudy(null)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{selectedStudy.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedStudy.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{selectedStudy.timeline}</span>
                </div>
                <h3
                  id="case-study-dialog-title"
                  className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-slate-900"
                >
                  {selectedStudy.title}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close case study details"
                onClick={() => setSelectedStudy(null)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-4 text-lg font-bold text-[#0D5683] tabular-nums">
              {selectedStudy.metric}
            </p>

            <div className="mt-6 space-y-5 text-sm sm:text-base text-slate-600 leading-relaxed">
              <div>
                <h4 className="text-xs font-semibold text-slate-900 mb-1">The challenge</h4>
                <p>{selectedStudy.challenge}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900 mb-1">
                  What Nexloop built
                </h4>
                <p>{selectedStudy.solution}</p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-semibold text-slate-900 mb-1.5">
                  Architecture &amp; stack
                </h4>
                <p className="text-xs font-mono text-slate-600">
                  {selectedStudy.stack.join(' · ')}
                </p>
              </div>
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
        </div>
      )}
    </section>
  );
}
