import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smile, CircleDot, Crown, Sparkles, Waves, Gem, ArrowUpRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const icons = [Gem, Smile, CircleDot, Sparkles, Waves, Crown];
const hrefs = ['#smile-design', '#invisalign', '#implantes', '#clareamento', '#gengivoplastia', '#reabilitacao'];

export default function TreatmentsIndex() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid    = gridRef.current;
    if (!section || !heading || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      const items = grid.querySelectorAll('.treatment-tile');
      gsap.fromTo(items,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: grid, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const cards = t.treatmentsIndex.cards;

  return (
    <section ref={sectionRef} id="treatments" className="relative bg-luxury-cream py-24 lg:py-32">
      <div className="px-6 lg:px-12">
        <div ref={headingRef} className="mb-16">
          <span className="heading-section text-luxury-gold block mb-4">{t.treatmentsIndex.tag[lang]}</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-luxury-charcoal">{t.treatmentsIndex.headline[lang]}</h2>
          <p className="body-text text-luxury-gray mt-4 max-w-2xl">{t.treatmentsIndex.sub[lang]}</p>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <a
                key={index}
                href={hrefs[index]}
                className="treatment-tile group relative bg-white p-8 border border-luxury-warm/50 hover:border-luxury-gold/50 transition-all duration-500 hover:-translate-y-1.5"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-luxury-warm/30 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-luxury-gold" />
                  </div>
                </div>
                <h3 className="font-serif text-xl text-luxury-charcoal mb-2 group-hover:text-luxury-gold transition-colors">
                  {card[lang].title}
                </h3>
                <p className="font-sans text-sm text-luxury-gray mb-4">{card[lang].desc}</p>
                <div className="flex items-center text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-sans text-xs uppercase tracking-wider mr-2">{t.treatmentsIndex.learnMore[lang]}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-luxury-gold group-hover:w-full transition-all duration-500" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
