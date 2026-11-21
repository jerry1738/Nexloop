import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

export function FaqSection() {
  const prefersReduced = useReducedMotion();
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0]?.id ?? '');

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 py-20 border-t border-slate-200 bg-[#F8FAFC]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <ScrollReveal className="lg:col-span-5">
            <p className="text-xs font-medium text-[#177094] mb-2">Engineering FAQ</p>
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance"
            >
              Direct answers on architecture, timelines, and ownership
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Clear specifications on how Nexloop scopes ERP builds, mobile suites, API
              integrations, and long-term SLAs.
            </p>
          </ScrollReveal>

          <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              return (
                <article key={item.id} className="py-5">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? '' : item.id)}
                      className="w-full flex items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded-md py-0.5"
                    >
                      <span>
                        <span className="block text-xs font-medium text-[#177094] mb-1">
                          {item.category}
                        </span>
                        <span className="block text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#0D5683] transition-colors">
                          {item.question}
                        </span>
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#0D5683]' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={prefersReduced ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-3 pr-8 text-sm sm:text-[15px] text-slate-600 leading-relaxed"
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
