import { motion, useReducedMotion } from 'motion/react';
import { PROCESS_STEPS } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

export function ProcessSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="process" className="scroll-mt-24 py-20 border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#177094] mb-2">How we build</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Predictable delivery from architecture to production SLA
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Weekly demos, fixed milestone scopes, and direct access to the engineers shipping your software.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.index}
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="pt-5 border-t border-slate-200"
            >
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <span className="text-xs font-semibold text-[#177094] tabular-nums">
                  {step.index}.
                </span>
                <span className="text-xs font-mono text-slate-500">{step.timeframe}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
