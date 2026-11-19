import { useCallback, useEffect, useMemo, useState } from 'react';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ClientsSection } from './components/ClientsSection';
import { ContactSection } from './components/ContactSection';
import { HeroSection } from './components/HeroSection';
import { LoadingScreenOverlay } from './components/LoadingScreenOverlay';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { TestimonialsSection } from './components/TestimonialsSection';
import { soundEngine } from './utils/soundEngine';

export default function App() {
  const autostart = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('autostart') === '1';
  }, []);

  const [showSplash, setShowSplash] = useState(!autostart);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [preselectedService, setPreselectedService] = useState<string>('');

  useEffect(() => {
    document.body.dataset.state = showSplash ? 'loading' : 'ready';
  }, [showSplash]);

  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (!soundEnabled) return;
    const handleUnlock = () => {
      void soundEngine.unlock();
    };
    window.addEventListener('pointerdown', handleUnlock, { once: true });
    window.addEventListener('keydown', handleUnlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handleUnlock);
      window.removeEventListener('keydown', handleUnlock);
    };
  }, [soundEnabled]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEngine.setEnabled(next);
      if (next) {
        void soundEngine.unlock();
      }
      return next;
    });
  };

  const scrollToContact = useCallback((serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleReplaySplash = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (soundEnabled) {
      void soundEngine.unlock().then(() => {
        setShowSplash(true);
      });
      return;
    }
    setShowSplash(true);
  }, [soundEnabled]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <LoadingScreenOverlay
        visible={showSplash}
        speed={1}
        surface="light"
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onComplete={handleSplashComplete}
      />

      <SiteHeader />

      <main className="flex-1">
        <HeroSection onStartProject={() => scrollToContact()} />
        <ClientsSection />
        <ServicesSection onSelectService={(service) => scrollToContact(service)} />
        <CaseStudiesSection onRequestSimilar={(service) => scrollToContact(service)} />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection preselectedService={preselectedService} />
      </main>

      <SiteFooter onReplaySplash={handleReplaySplash} />
    </div>
  );
}
