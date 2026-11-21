import { useCallback, useEffect, useMemo, useState } from 'react';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ClientsSection } from './components/ClientsSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { HeroSection } from './components/HeroSection';
import { LoadingScreenOverlay } from './components/LoadingScreenOverlay';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { TestimonialsSection } from './components/TestimonialsSection';
import { syncDocumentSeo } from './utils/seoMeta';

export default function App() {
  const autostart = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('autostart') === '1';
  }, []);

  const [showSplash, setShowSplash] = useState(!autostart);
  const [homeRevealed, setHomeRevealed] = useState(autostart);
  const [preselectedService, setPreselectedService] = useState<string>('');

  useEffect(() => {
    document.body.dataset.state = showSplash ? 'loading' : 'ready';
  }, [showSplash]);

  useEffect(() => {
    syncDocumentSeo();
  }, []);

  const handleRevealStart = useCallback(() => {
    setHomeRevealed(true);
  }, []);

  const handleSplashComplete = useCallback(() => {
    setHomeRevealed(true);
    setShowSplash(false);
  }, []);

  const scrollToContact = useCallback((serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleReplaySplash = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHomeRevealed(false);
    setShowSplash(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <LoadingScreenOverlay
        visible={showSplash}
        speed={1}
        surface="light"
        onRevealStart={handleRevealStart}
        onComplete={handleSplashComplete}
      />

      <SiteHeader entered={homeRevealed} />

      <main className="flex-1">
        <HeroSection
          entered={homeRevealed}
          onStartProject={() => scrollToContact()}
        />
        <ClientsSection />
        <ServicesSection onSelectService={(service) => scrollToContact(service)} />
        <CaseStudiesSection onRequestSimilar={(service) => scrollToContact(service)} />
        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection preselectedService={preselectedService} />
      </main>

      <SiteFooter onReplaySplash={handleReplaySplash} />
    </div>
  );
}
