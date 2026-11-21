import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  ClipboardCheck,
  Database,
  Globe,
  Layers,
  Smartphone,
} from 'lucide-react';
import {
  ERP_MODULE_PREVIEWS,
  SERVICES,
  type CaseStudyCategory,
  type ErpModulePreview,
  type ServiceOffering,
} from '../data/companyData';
import {
  CloudMeshVisual,
  ErpArchitectureVisual,
  MobileSyncVisual,
  WebEdgeVisual,
} from './CapabilityVisuals';
import { LiquidGlassTabs, type LiquidGlassTabItem } from './LiquidGlassTabs';
import { ScrollReveal } from './ScrollReveal';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

const CAPABILITY_FILTERS: LiquidGlassTabItem<CaseStudyCategory>[] = [
  { id: 'all', label: 'All', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'erp', label: 'ERP', icon: <Database className="w-3.5 h-3.5" /> },
  { id: 'mobile', label: 'Mobile', icon: <Smartphone className="w-3.5 h-3.5" /> },
  { id: 'web', label: 'Web & Cloud', icon: <Globe className="w-3.5 h-3.5" /> },
];

const ERP_MODULE_ICONS: Record<ErpModulePreview['id'], ReactNode> = {
  ledger: <BookOpen className="w-3.5 h-3.5" />,
  inventory: <Boxes className="w-3.5 h-3.5" />,
  procurement: <ClipboardCheck className="w-3.5 h-3.5" />,
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const prefersReduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<CaseStudyCategory>('all');
  const [activeErpModule, setActiveErpModule] =
    useState<ErpModulePreview['id']>('ledger');

  const visibleServices =
    activeFilter === 'all'
      ? SERVICES
      : SERVICES.filter((service) => service.category === activeFilter);

  const selectedModuleInfo =
    ERP_MODULE_PREVIEWS.find((m) => m.id === activeErpModule) ?? ERP_MODULE_PREVIEWS[0];

  const getColumnClass = (service: ServiceOffering) => {
    if (visibleServices.length === 1) return 'lg:col-span-12';
    return service.span === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5';
  };

  return (
    <section
      id="services"
      className="relative scroll-mt-24 py-20 sm:py-24 border-t border-slate-200 bg-white overflow-hidden"
    >
      {/* Subtle radial-masked architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(13,86,131,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,86,131,0.045) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 80% 65% at 50% 40%, #000 35%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 65% at 50% 40%, #000 35%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#177094] mb-2">Core capabilities</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Full-lifecycle software engineering tailored to your stack
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every engagement combines systems architecture, product design, full-stack
              engineering, automated QA, and managed cloud operations.
            </p>
          </div>

          {/* Interactive iOS Liquid Glass discipline selector */}
          <div className="self-start lg:self-auto w-full sm:w-auto">
            <LiquidGlassTabs
              tabs={CAPABILITY_FILTERS}
              activeId={activeFilter}
              onChange={setActiveFilter}
              layoutId="nl-capability-glass-tabs"
              ariaLabel="Filter core capabilities"
              variant="light"
              fullWidthOnMobile
            />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeFilter}
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6, transition: { duration: 0.12 } }}
              className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {visibleServices.map((service, idx) => {
                const isSolo = visibleServices.length === 1;

                /* 01. Flagship Deep Ocean-Navy ERP Bento Card */
                if (service.id === 'erp') {
                  return (
                    <motion.article
                      key={service.id}
                      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                      className={`${getColumnClass(
                        service
                      )} group relative rounded-2xl border border-[#177094]/40 bg-gradient-to-br from-[#071D31] via-[#0B3052] to-[#0D5683] text-white p-6 sm:p-8 overflow-hidden shadow-[0_20px_48px_-24px_rgba(13,86,131,0.45)]`}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#58C4D8]/80 to-transparent"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center h-full">
                        <div className="md:col-span-7 flex flex-col justify-between h-full">
                          <div>
                            <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs mb-3.5">
                              <span className="font-semibold text-[#7AD7E8] tabular-nums">
                                {service.index}.
                              </span>
                              <span className="text-[#CBE6F5]/90">{service.outcome}</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                              {service.title}
                            </h3>
                            <p className="mt-2.5 text-sm sm:text-base text-[#D6ECF8] leading-relaxed">
                              {service.summary}
                            </p>

                            {/* Interactive ERP Subsystem Switcher */}
                            <div className="mt-5 pt-4 border-t border-white/15">
                              <LiquidGlassTabs
                                tabs={ERP_MODULE_PREVIEWS.map((mod) => ({
                                  id: mod.id,
                                  label: mod.label,
                                  icon: ERP_MODULE_ICONS[mod.id],
                                }))}
                                activeId={activeErpModule}
                                onChange={setActiveErpModule}
                                layoutId="nl-erp-glass-tabs"
                                ariaLabel="Inspect ERP core modules"
                                variant="dark"
                              />

                              <p className="mt-2.5 text-xs text-[#BCE3F7] leading-relaxed">
                                {selectedModuleInfo.caption}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                            <span className="text-xs font-mono text-[#9BD8EB]">
                              {service.stack.join(' · ')}
                            </span>
                            <button
                              type="button"
                              onClick={() => onSelectService(service.title)}
                              className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-lg bg-white text-[#0D5683] hover:bg-[#EAF6FC] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58C4D8]"
                            >
                              <span>Scope this capability</span>
                              <ArrowUpRight
                                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="md:col-span-5">
                          <ErpArchitectureVisual activeModule={activeErpModule} />
                        </div>
                      </div>
                    </motion.article>
                  );
                }

                /* 02 & 03. Mobile Apps & Web Platforms Precision Bento Cards */
                if (service.id === 'mobile' || service.id === 'web') {
                  return (
                    <motion.article
                      key={service.id}
                      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.12 }}
                      transition={{
                        duration: 0.42,
                        delay: idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`${getColumnClass(
                        service
                      )} group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-[#0D5683]/45 hover:shadow-[0_14px_34px_-18px_rgba(13,86,131,0.22)]`}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#58C4D8] via-[#177094] to-[#0D5683] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                      />

                      <div
                        className={
                          isSolo
                            ? 'grid grid-cols-1 md:grid-cols-12 gap-7 items-center'
                            : 'space-y-5'
                        }
                      >
                        <div className={isSolo ? 'md:col-span-5 md:order-2' : ''}>
                          {service.id === 'mobile' ? (
                            <MobileSyncVisual />
                          ) : (
                            <WebEdgeVisual />
                          )}
                        </div>

                        <div className={isSolo ? 'md:col-span-7 md:order-1' : ''}>
                          <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs mb-3">
                            <span className="font-semibold text-[#177094] tabular-nums">
                              {service.index}.
                            </span>
                            <span className="text-slate-500">{service.outcome}</span>
                          </div>

                          <h3 className="text-xl font-bold tracking-tight text-slate-900">
                            {service.title}
                          </h3>
                          <p className="mt-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                            {service.summary}
                          </p>

                          <ul className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-700">
                            {service.deliverables.map((item) => (
                              <li key={item} className="flex items-start gap-2.5">
                                <Check
                                  className="w-4 h-4 text-[#177094] shrink-0 mt-0.5"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                        <div className="text-xs font-mono text-slate-500">
                          {service.stack.join(' · ')}
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectService(service.title)}
                          className="inline-flex items-center gap-1.5 min-h-[40px] text-sm font-semibold text-[#0D5683] hover:text-[#0A456A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded"
                        >
                          <span>Scope this capability</span>
                          <ArrowUpRight
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </motion.article>
                  );
                }

                /* 04. Wide Split Custom Software, APIs & Cloud Mesh Bento Card */
                return (
                  <motion.article
                    key={service.id}
                    initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: 0.42,
                      delay: idx * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`${getColumnClass(
                      service
                    )} group relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-[#F8FBFE] to-[#EFF6FB] p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:border-[#0D5683]/45 hover:shadow-[0_14px_34px_-18px_rgba(13,86,131,0.22)]`}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#58C4D8] via-[#177094] to-[#0D5683] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center h-full">
                      <div className="md:col-span-6 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs mb-3">
                            <span className="font-semibold text-[#177094] tabular-nums">
                              {service.index}.
                            </span>
                            <span className="text-slate-500">{service.outcome}</span>
                          </div>

                          <h3 className="text-xl font-bold tracking-tight text-slate-900">
                            {service.title}
                          </h3>
                          <p className="mt-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                            {service.summary}
                          </p>

                          <ul className="mt-5 pt-4 border-t border-slate-200/70 space-y-2 text-sm text-slate-700">
                            {service.deliverables.map((item) => (
                              <li key={item} className="flex items-start gap-2.5">
                                <Check
                                  className="w-4 h-4 text-[#177094] shrink-0 mt-0.5"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-200/70 space-y-3">
                          <div className="text-xs font-mono text-slate-500">
                            {service.stack.join(' · ')}
                          </div>
                          <button
                            type="button"
                            onClick={() => onSelectService(service.title)}
                            className="inline-flex items-center gap-1.5 min-h-[40px] text-sm font-semibold text-[#0D5683] hover:text-[#0A456A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded"
                          >
                            <span>Scope this capability</span>
                            <ArrowUpRight
                              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-6">
                        <CloudMeshVisual />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
