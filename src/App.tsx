import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import Navigation from './sections/Navigation';
import CustomCursor from './sections/CustomCursor';
import TreatmentSection from './sections/TreatmentSection';
import MethodSection from './sections/MethodSection';
import TreatmentsIndex from './sections/TreatmentsIndex';
import TestimonialsSection from './sections/TestimonialsSection';
import LocationsSection from './sections/LocationsSection';
import ContactSection from './sections/ContactSection';
import GrainOverlay from './sections/GrainOverlay';
import AgendamentoPage from './sections/AgendamentoPage';
import { useLang } from './context/LanguageContext';
import { t } from './translations';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { lang } = useLang();
  const [showAgendamento, setShowAgendamento] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Build treatments data reactively based on language
  const treatments = [
    {
      id: 'smile-design',
      label:       t.treatments.smileDesign.label[lang],
      headline:    t.treatments.smileDesign.headline[lang],
      description: t.treatments.smileDesign.description[lang],
      ctaPrimary:  t.treatments.smileDesign.ctaPrimary[lang],
      ctaSecondary: '',
      image: '/images/doctor-hero.png',
      imagePosition: 'left' as const,
      zIndex: 10,
    },
    {
      id: 'implantes',
      label:       t.treatments.implantes.label[lang],
      headline:    t.treatments.implantes.headline[lang],
      description: t.treatments.implantes.description[lang],
      ctaPrimary:  t.treatments.implantes.ctaPrimary[lang],
      ctaSecondary: '',
      image: '/images/clinic-ipanema.jpg',
      imagePosition: 'right' as const,
      zIndex: 20,
    },
    {
      id: 'invisalign',
      label:       t.treatments.invisalign.label[lang],
      headline:    t.treatments.invisalign.headline[lang],
      description: t.treatments.invisalign.description[lang],
      ctaPrimary:  t.treatments.invisalign.ctaPrimary[lang],
      ctaSecondary: '',
      image: '/images/invisalign-hero.jpg',
      imagePosition: 'left' as const,
      zIndex: 30,
    },
    {
      id: 'gengivoplastia',
      label:       t.treatments.gengivoplastia.label[lang],
      headline:    t.treatments.gengivoplastia.headline[lang],
      description: t.treatments.gengivoplastia.description[lang],
      ctaPrimary:  t.treatments.gengivoplastia.ctaPrimary[lang],
      ctaSecondary: '',
      image: '/images/before-after-1.jpg',
      imagePosition: 'right' as const,
      zIndex: 40,
    },
  ];

  // ── ALL hooks unconditionally ────────────────────────────────────────────
  useEffect(() => {
    (window as any).openAgendamento = () => setShowAgendamento(true);
    return () => { delete (window as any).openAgendamento; };
  }, []);

  useEffect(() => {
    if (showAgendamento) return;
    if (window.innerWidth < 768) return;

    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      const globalSnap = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            return pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
      triggersRef.current.push(globalSnap);
    }, 500);

    return () => {
      clearTimeout(timer);
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
    };
  }, [showAgendamento]);

  useLayoutEffect(() => {
    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  // ── Conditional render AFTER all hooks ───────────────────────────────────
  if (showAgendamento) {
    return <AgendamentoPage onBack={() => setShowAgendamento(false)} />;
  }

  return (
    <div ref={mainRef} className="relative bg-luxury-cream">
      <CustomCursor />
      <GrainOverlay />
      <Navigation />
      {treatments.map((treatment, index) => (
        <TreatmentSection
          key={treatment.id}
          {...treatment}
          isFirst={index === 0}
        />
      ))}
      <MethodSection />
      <TreatmentsIndex />
      <TestimonialsSection />
      <LocationsSection />
      <ContactSection />
    </div>
  );
}

export default App;
