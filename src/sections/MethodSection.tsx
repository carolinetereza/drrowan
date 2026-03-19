import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scan, Cpu, Shield, HeartHandshake, CreditCard, Clock } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const featureIcons = [Scan, Cpu, Shield, HeartHandshake, CreditCard, Clock];

export default function MethodSection() {
  const { lang } = useLang();
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section    = sectionRef.current;
    const heading    = headingRef.current;
    const featuresEl = featuresRef.current;
    const card       = cardRef.current;
    if (!section || !heading || !featuresEl || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const featureItems = featuresEl.querySelectorAll('.feature-item');
      gsap.fromTo(featureItems,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: featuresEl, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(card,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const features = t.method.features;
  const creds    = t.method.credentials;

  return (
    <section ref={sectionRef} id="method" className="relative bg-luxury-cream py-24 lg:py-32">
      <div className="px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <div ref={headingRef} className="mb-16">
              <span className="heading-section text-luxury-gold block mb-4">{t.method.tag[lang]}</span>
              <h2 className="font-serif text-4xl lg:text-5xl text-luxury-charcoal mb-6">{t.method.headline[lang]}</h2>
              <p className="body-text text-luxury-gray max-w-md">{t.method.sub[lang]}</p>
            </div>

            <div ref={featuresRef} className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <div key={index} className="feature-item group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-luxury-warm/50 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                        <Icon className="w-5 h-5 text-luxury-gold" />
                      </div>
                      <div>
                        <h3 className="font-sans font-medium text-sm text-luxury-charcoal mb-1">{feature[lang].title}</h3>
                        <p className="font-sans text-xs text-luxury-gray leading-relaxed">{feature[lang].desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — credentials card */}
          <div ref={cardRef} className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative bg-white p-8 lg:p-10 image-card-shadow">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img src="/images/doctor-portrait.jpg" alt="Dr. Rowan Vilar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-luxury-charcoal">Dr. Rowan Vilar</h3>
                  <p className="font-sans text-xs text-luxury-gray uppercase tracking-wider">Invisalign Top Doctor | CRO RJ-36828</p>
                  <p className="font-sans text-xs text-luxury-gold mt-1">Visiting Professor — UERJ</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {creds.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold flex-shrink-0" />
                    <span className="font-sans text-sm text-luxury-charcoal">{item[lang]}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://rowanvilar.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-luxury btn-luxury-outline text-center justify-center inline-flex"
              >
                {creds.cta[lang]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
