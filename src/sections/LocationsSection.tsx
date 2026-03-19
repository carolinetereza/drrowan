import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

export default function LocationsSection() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const mapRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const card    = cardRef.current;
    const map     = mapRef.current;
    if (!section || !heading || !card || !map) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(heading, { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(card, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(map, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: map, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const loc = t.locations;

  return (
    <section ref={sectionRef} className="relative bg-luxury-cream py-24 lg:py-32">
      <div className="px-6 lg:px-12">
        <div ref={headingRef} className="mb-14">
          <span className="heading-section text-luxury-gold block mb-4">{loc.tag[lang]}</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-luxury-charcoal">{loc.headline[lang]}</h2>
          <p className="body-text text-luxury-gray mt-4 max-w-md">{loc.sub[lang]}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Info Card */}
          <div ref={cardRef} className="bg-white image-card-shadow overflow-hidden">
            <div className="relative h-56 overflow-hidden">
              <img src="/images/clinic-ipanema.jpg" alt="Clínica Dr. Rowan Vilar — Ipanema" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-ink/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-serif text-2xl text-white">{loc.unit[lang]}</span>
              </div>
            </div>
            <div className="p-8 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-sans text-sm font-medium text-luxury-charcoal block">R. Visc. de Pirajá, 303 — sala 709</span>
                  <span className="font-sans text-sm text-luxury-gray">Ipanema, Rio de Janeiro — RJ, 22410-001</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-luxury-gray">{loc.hours[lang]}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-luxury-charcoal">(21) 98881-6084</span>
              </div>
              <a
                href="https://wa.me/5521988816084"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 btn-luxury btn-luxury-gold btn-luxury-pill"
              >
                {loc.bookBtn[lang]}
              </a>
            </div>
          </div>

          {/* Map */}
          <div ref={mapRef} className="overflow-hidden image-card-shadow" style={{ height: '420px' }}>
            <iframe
              title="Localização Clínica Dr. Rowan Vilar — Ipanema"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.5!2d-43.1988!3d-22.9839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9981!2sR.+Visc.+de+Piraj%C3%A1%2C+303+-+Ipanema%2C+Rio+de+Janeiro+-+RJ%2C+22410-001!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr&q=R.+Visconde+de+Piraj%C3%A1%2C+303%2C+Ipanema%2C+Rio+de+Janeiro%2C+RJ%2C+Brazil"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
