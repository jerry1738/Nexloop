import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-24 py-20 border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#177094] mb-2">Core capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Full-lifecycle software engineering tailored to your stack
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Every engagement covers architecture, UI/UX design, engineering, automated QA, and ongoing cloud support under one roof.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`${
                service.span === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5'
              } rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between transition-colors hover:border-[#0D5683]/45`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <span className="text-xs font-semibold text-[#177094] tabular-nums">
                    {service.index}.
                  </span>
                  <span className="text-xs text-slate-500">{service.outcome}</span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {service.summary}
                </p>

                <ul className="mt-6 pt-5 border-t border-slate-100 space-y-2.5 text-sm text-slate-700">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-baseline gap-2.5">
                      <span className="text-[#177094] font-semibold" aria-hidden="true">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 min-h-[40px] text-sm font-semibold text-[#0D5683] hover:text-[#0A456A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded"
                >
                  <span>Scope this capability</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
