import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  SERVICES,
  validateInquiryForm,
  type InquiryValidationErrors,
} from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

interface ContactSectionProps {
  preselectedService: string;
}

const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  'API Integration & Legacy Modernization',
  'UI/UX Product Design & Cloud SLA',
];

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [brief, setBrief] = useState('');
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!preselectedService) return;
    const match = SERVICE_OPTIONS.find((opt) =>
      opt.toLowerCase().includes(preselectedService.toLowerCase().split(' ')[0])
    );
    if (match) {
      setService(match);
      setSubmitted(false);
    }
  }, [preselectedService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateInquiryForm({ name, email, company, service, brief });
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setBrief('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left direct info column */}
          <ScrollReveal className="lg:col-span-5">
            <p className="text-xs font-medium text-[#177094] mb-2">Start a project</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Tell us what your team needs built
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Share your timeline and current system constraints. A solutions architect will respond within one business day with a scope outline.
            </p>

            <div className="mt-8 pt-6 border-t border-slate-200 space-y-5 text-sm">
              <div>
                <span className="block text-xs text-slate-500">Direct inquiries</span>
                <a
                  href="mailto:hello@nexloop.io"
                  className="mt-0.5 inline-block font-semibold text-slate-900 hover:text-[#0D5683] transition-colors"
                >
                  hello@nexloop.io
                </a>
              </div>
              <div>
                <span className="block text-xs text-slate-500">Engineering consultations</span>
                <span className="mt-0.5 block font-semibold text-slate-900 tabular-nums">
                  +1 (415) 890-4210
                </span>
              </div>
              <div>
                <span className="block text-xs text-slate-500">Delivery regions</span>
                <span className="mt-0.5 block font-semibold text-slate-900">
                  North America · Europe · Remote Worldwide
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right validated inquiry form */}
          <ScrollReveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              {submitted ? (
                <div className="py-8 text-center sm:text-left" role="status">
                  <div className="inline-flex items-center gap-2 text-[#0D5683] font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    <span>Project inquiry received</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-900">
                    Thank you, {name.trim()}.
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-lg">
                    We logged your brief for <span className="font-medium text-slate-900">{service}</span> and will follow up at{' '}
                    <span className="font-medium text-slate-900">{email.trim()}</span> within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 min-h-[42px] px-5 py-2 text-sm font-semibold text-[#0D5683] bg-[#F4F8FB] hover:bg-[#E7F1F8] rounded-lg transition-colors"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nl-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full name
                      </label>
                      <input
                        id="nl-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Hannah Lindqvist"
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D5683] focus:ring-2 focus:ring-[#0D5683]/15"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="nl-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Work email
                      </label>
                      <input
                        id="nl-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="hannah@company.com"
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D5683] focus:ring-2 focus:ring-[#0D5683]/15"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nl-company" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Company (optional)
                      </label>
                      <input
                        id="nl-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Meridian Logistics"
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D5683] focus:ring-2 focus:ring-[#0D5683]/15"
                      />
                    </div>

                    <div>
                      <label htmlFor="nl-service" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Primary service
                      </label>
                      <select
                        id="nl-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D5683] focus:ring-2 focus:ring-[#0D5683]/15"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="nl-brief" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Project brief
                    </label>
                    <textarea
                      id="nl-brief"
                      rows={4}
                      value={brief}
                      onChange={(e) => {
                        setBrief(e.target.value);
                        if (errors.brief) setErrors((prev) => ({ ...prev, brief: undefined }));
                      }}
                      placeholder="Tell us what you are building, target platforms (ERP, Android/iOS, Web), and expected launch window."
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0D5683] focus:ring-2 focus:ring-[#0D5683]/15"
                    />
                    {errors.brief && (
                      <p className="mt-1.5 text-xs text-red-600">{errors.brief}</p>
                    )}
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Protected under mutual NDA on request.
                    </p>
                    <button
                      type="submit"
                      className="min-h-[44px] px-6 py-2.5 text-sm font-semibold text-white bg-[#0D5683] hover:bg-[#0A456A] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5683] focus-visible:ring-offset-2"
                    >
                      Schedule Discovery Call
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
