import { NexloopMark } from './NexloopMark';
import { ScrollReveal } from './ScrollReveal';

interface SiteFooterProps {
  onReplaySplash: () => void;
}

export function SiteFooter({ onReplaySplash }: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-[#F8FAFC] pt-14 pb-10">
      <ScrollReveal className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#0D5683]"
            >
              <NexloopMark className="w-10 h-5 shrink-0" />
              <span>Nexloop</span>
            </a>
            <p className="mt-1.5 text-xs text-slate-500 tracking-wide">
              innovate · connect · move
            </p>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-sm">
              Custom software engineering partner for enterprise ERP systems, native Android and iOS apps, websites, and cloud integrations.
            </p>
          </div>

          {/* Services links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold text-slate-900 mb-3.5">Services</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#services" className="hover:text-[#0D5683] transition-colors">
                  Enterprise ERP Systems
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0D5683] transition-colors">
                  Mobile Apps (Android &amp; iOS)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0D5683] transition-colors">
                  Websites &amp; Customer Portals
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0D5683] transition-colors">
                  Custom Software &amp; APIs
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-slate-900 mb-3.5">Company</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="#work" className="hover:text-[#0D5683] transition-colors">
                  Selected Work
                </a>
              </li>
              <li>
                <a href="#clients" className="hover:text-[#0D5683] transition-colors">
                  Clients
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#0D5683] transition-colors">
                  How We Build
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#0D5683] transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#0D5683] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-slate-900 mb-3.5">Connect</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a
                  href="mailto:hello@nexloop.io"
                  className="hover:text-[#0D5683] transition-colors"
                >
                  hello@nexloop.io
                </a>
              </li>
              <li className="tabular-nums">+1 (415) 890-4210</li>
              <li>
                <a href="/llms.txt" className="hover:text-[#0D5683] transition-colors">
                  llms.txt Reference
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onReplaySplash}
                  className="text-left text-[#0D5683] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] rounded"
                >
                  Replay intro screen
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Nexloop Software. All rights reserved.</span>
          <span>Enterprise ERP · Android &amp; iOS · Web Engineering</span>
        </div>
      </ScrollReveal>
    </footer>
  );
}
