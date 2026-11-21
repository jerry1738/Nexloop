import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { NexloopMark } from './NexloopMark';

const NAV_LINKS = [
  { href: '#clients', id: 'clients', label: 'Clients' },
  { href: '#services', id: 'services', label: 'Services' },
  { href: '#work', id: 'work', label: 'Work' },
  { href: '#process', id: 'process', label: 'Process' },
  { href: '#testimonials', id: 'testimonials', label: 'Testimonials' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

interface SiteHeaderProps {
  entered?: boolean;
}

export function SiteHeader({ entered = true }: SiteHeaderProps) {
  const prefersReduced = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('services');
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      // Determine current active section cleanly from scroll offset
      const probeY = y + 140;
      let current = NAV_LINKS[0].id;
      for (const item of NAV_LINKS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= probeY) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const handleLinkClick = (id?: string) => {
    if (id) setActiveId(id);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={prefersReduced ? false : { opacity: 0, y: -20 }}
      animate={
        prefersReduced
          ? { opacity: 1, y: 0 }
          : entered
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -20 }
      }
      transition={{ duration: 0.62, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-30 pt-2.5 sm:pt-3 px-4 sm:px-6 pointer-events-none"
    >
      <div
        className={`pointer-events-auto relative max-w-[1200px] mx-auto rounded-2xl border transition-all duration-300 overflow-hidden ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-slate-200/90 shadow-[0_10px_30px_-14px_rgba(13,86,131,0.18)]'
            : 'bg-white/80 backdrop-blur-md border-slate-200/75 shadow-[0_4px_18px_-12px_rgba(15,23,42,0.12)]'
        }`}
      >
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
          {/* Zone 1: Nexloop infinity emblem + wordmark */}
          <a
            href="#top"
            onClick={() => handleLinkClick('clients')}
            className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded-lg py-1"
          >
            <NexloopMark className="w-9 h-[18px] sm:w-10 sm:h-5 shrink-0" />
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#0D5683]">
              Nexloop
            </span>
          </a>

          {/* Zone 2: Modern single-line navigation links with active sliding indicator */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] ${
                    isActive
                      ? 'text-[#0D5683] font-semibold'
                      : 'text-slate-600 hover:text-[#0D5683]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nl-nav-active"
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                      className="absolute inset-0 rounded-xl bg-[#0D5683]/[0.08] -z-10"
                      aria-hidden="true"
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Mobile menu trigger (Start a Project button removed) */}
          <div className="flex items-center md:hidden shrink-0">
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center w-11 h-11 text-slate-700 hover:text-[#0D5683] rounded-xl hover:bg-slate-100/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Scroll progress hairline along bottom edge */}
        {!prefersReduced && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#58C4D8] via-[#177094] to-[#0D5683]"
          />
        )}
      </div>

      {/* Responsive mobile drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="pointer-events-auto md:hidden mt-2 max-w-[1200px] mx-auto rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-lg px-4 py-3 flex flex-col gap-1"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.id)}
                className={`min-h-[44px] px-3 rounded-xl flex items-center justify-between text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0D5683]/[0.08] text-[#0D5683] font-semibold'
                    : 'text-slate-700 hover:text-[#0D5683] hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>
      )}
    </motion.header>
  );
}
