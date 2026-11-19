import { CLIENT_LOGOS, type ClientLogo } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

function EthiopianBrandLogo({ client }: { client: ClientLogo }) {
  switch (client.mark) {
    case 'ethiopian-airlines':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 38 28" className="w-8 h-6 shrink-0" aria-hidden="true">
            <path d="M4 22 L19 5 L25 5 L12 22 Z" fill="#078930" />
            <path d="M12 22 L25 5 L30 5 L18 22 Z" fill="#FCDD09" />
            <path d="M18 22 L30 5 L35 5 L24 22 Z" fill="#DA121A" />
          </svg>
          <div className="leading-none text-left">
            <span className="block text-[15px] font-bold tracking-tight text-[#076839]">
              Ethiopian
            </span>
            <span className="block text-[9.5px] font-medium tracking-wide text-slate-500 uppercase mt-0.5">
              Airlines
            </span>
          </div>
        </div>
      );

    case 'ethio-telecom':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <circle cx="16" cy="16" r="12" fill="none" stroke="#8DC63F" strokeWidth="2.6" />
            <path d="M7 16 A9 9 0 0 1 25 16" fill="none" stroke="#0072BC" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="16" cy="16" r="3.4" fill="#8DC63F" />
          </svg>
          <span className="text-[15px] font-bold tracking-tight text-[#0072BC]">
            ethio <span className="text-[#69A827]">telecom</span>
          </span>
        </div>
      );

    case 'cbe':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <rect x="3" y="4" width="26" height="24" rx="5" fill="#6F2C91" />
            <circle cx="16" cy="16" r="6.5" fill="none" stroke="#F4B41A" strokeWidth="2.3" />
            <circle cx="16" cy="16" r="2.2" fill="#F4B41A" />
          </svg>
          <div className="leading-none text-left">
            <span className="block text-[15px] font-extrabold tracking-tight text-[#5B2178]">
              CBE
            </span>
            <span className="block text-[9px] font-medium text-slate-500 mt-0.5">
              Commercial Bank
            </span>
          </div>
        </div>
      );

    case 'dashen-bank':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 34 30" className="w-7 h-6 shrink-0" aria-hidden="true">
            <path d="M3 24 L13 6 L20 17 L24 11 L31 24 Z" fill="#1A2E6E" />
            <path d="M13 6 L16.5 12 L10 13 Z" fill="#E3B341" />
          </svg>
          <span className="text-[15px] font-bold tracking-tight text-[#1A2E6E]">
            Dashen <span className="font-semibold text-slate-600">Bank</span>
          </span>
        </div>
      );

    case 'awash-bank':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <path d="M6 25 L16 6 L26 25" fill="none" stroke="#0B4F9C" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 19 C13 15.5, 19 22, 23 18.5" fill="none" stroke="#F37021" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
          <span className="text-[15px] font-bold tracking-tight text-[#0B4F9C]">
            Awash <span className="text-[#F37021]">Bank</span>
          </span>
        </div>
      );

    case 'chapa':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <rect x="4" y="4" width="24" height="24" rx="7" fill="#7DC400" />
            <path d="M21 12.5 A6.2 6.2 0 1 0 21 19.5" fill="none" stroke="#0D1F12" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-[16px] font-bold tracking-tight text-slate-900">
            Chapa
          </span>
        </div>
      );

    case 'telebirr':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <circle cx="13" cy="16" r="7.5" fill="none" stroke="#00A651" strokeWidth="2.6" />
            <circle cx="19" cy="16" r="7.5" fill="none" stroke="#0072BC" strokeWidth="2.6" />
          </svg>
          <span className="text-[16px] font-bold tracking-tight text-[#0072BC]">
            tele<span className="text-[#00A651]">birr</span>
          </span>
        </div>
      );

    case 'abyssinia':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <circle cx="16" cy="16" r="12" fill="#F2A900" />
            <path d="M11 21 L16 9 L21 21 M13 17 H19" fill="none" stroke="#2D1E08" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="leading-none text-left">
            <span className="block text-[11px] font-semibold text-slate-500">
              Bank of
            </span>
            <span className="block text-[14px] font-bold tracking-tight text-[#8A5A00]">
              Abyssinia
            </span>
          </div>
        </div>
      );

    case 'ride':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <circle cx="16" cy="16" r="12" fill="#1E293B" />
            <circle cx="16" cy="16" r="5" fill="#22C55E" />
          </svg>
          <span className="text-[16px] font-extrabold tracking-wider text-slate-900">
            RIDE
          </span>
        </div>
      );

    case 'zemen-bank':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <rect x="4" y="4" width="24" height="24" rx="4" fill="#C8102E" />
            <path d="M10 11 H22 L10 21 H22" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[15px] font-bold tracking-tight text-slate-900">
            Zemen <span className="text-[#C8102E]">Bank</span>
          </span>
        </div>
      );

    case 'gebeya':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <path d="M22 10 A8.5 8.5 0 1 0 24 17 H16" fill="none" stroke="#4F46E5" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="22" cy="10" r="2.2" fill="#06B6D4" />
          </svg>
          <span className="text-[16px] font-bold tracking-tight text-slate-900">
            Gebeya
          </span>
        </div>
      );

    case 'hibret-bank':
      return (
        <div className="inline-flex items-center gap-2.5" aria-label={client.name}>
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <circle cx="16" cy="16" r="11" fill="none" stroke="#5B2C86" strokeWidth="2.6" />
            <path d="M11 10 V22 M21 10 V22 M11 16 H21" stroke="#00A99D" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <span className="text-[15px] font-bold tracking-tight text-[#5B2C86]">
            Hibret <span className="font-semibold text-slate-700">Bank</span>
          </span>
        </div>
      );
  }
}

function ClientLogoCard({
  client,
  highlighted = false,
}: {
  client: ClientLogo;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`group relative flex items-center justify-center px-5 w-[188px] h-[90px] sm:w-[232px] sm:h-[108px] rounded-lg bg-white border transition-all duration-300 shrink-0 select-none ${
        highlighted
          ? 'border-slate-200/90 border-t-2 border-t-[#0D5683] shadow-[0_10px_26px_-14px_rgba(13,86,131,0.22)]'
          : 'border-slate-200/80 shadow-[0_2px_12px_-6px_rgba(15,23,42,0.08)] hover:border-t-2 hover:border-t-[#0D5683] hover:shadow-[0_10px_26px_-14px_rgba(13,86,131,0.2)]'
      }`}
    >
      <div className="transition-transform duration-300 group-hover:scale-[1.03]">
        <EthiopianBrandLogo client={client} />
      </div>
    </div>
  );
}

export function ClientsSection() {
  const row1 = CLIENT_LOGOS.filter((c) => c.row === 1);
  const row2 = CLIENT_LOGOS.filter((c) => c.row === 2);

  return (
    <section
      id="clients"
      className="scroll-mt-24 py-16 sm:py-20 border-t border-slate-200 bg-[#F8FAFC] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-medium text-[#177094] mb-2">Our clients</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
            Some of our valuable clients
          </h2>
        </ScrollReveal>
      </div>

      {/* Dual opposing horizontal marquee rows matching reference layout */}
      <ScrollReveal delay={0.08} className="relative max-w-[1440px] mx-auto">
        <div className="relative overflow-hidden motion-reduce:hidden space-y-4 sm:space-y-5 py-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

          {/* Row 1: moves smoothly left */}
          <div className="nl-marquee-track gap-4 sm:gap-5 pr-4 sm:pr-5">
            {[...row1, ...row1].map((client, idx) => (
              <ClientLogoCard
                key={`r1-${client.id}-${idx}`}
                client={client}
                highlighted={client.id === 'dashen-bank'}
              />
            ))}
          </div>

          {/* Row 2: moves smoothly right with staggered horizontal offset */}
          <div className="-translate-x-12 sm:-translate-x-24">
            <div className="nl-marquee-track-reverse gap-4 sm:gap-5 pr-4 sm:pr-5">
              {[...row2, ...row2].map((client, idx) => (
                <ClientLogoCard key={`r2-${client.id}-${idx}`} client={client} />
              ))}
            </div>
          </div>
        </div>

        {/* Accessible reduced-motion responsive grid fallback */}
        <div className="hidden motion-reduce:grid max-w-[1200px] mx-auto px-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CLIENT_LOGOS.map((client) => (
            <ClientLogoCard key={client.id} client={client} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
