import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const footerRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const cta     = ctaRef.current;
    const footer  = footerRef.current;
    if (!section || !content || !cta || !footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(content, { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: content, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(cta, { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: cta, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(footer, { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none reverse' } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const c = t.contact;

  return (
    <section ref={sectionRef} id="contact" className="relative bg-luxury-ink py-24 lg:py-32">
      <div className="px-6 lg:px-12">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="heading-section text-luxury-gold block mb-6">{c.tag[lang]}</span>
          <h2 className="font-serif text-4xl lg:text-6xl text-luxury-cream mb-6">{c.headline[lang]}</h2>
          <p className="body-text text-luxury-gray/80">{c.sub[lang]}</p>
        </div>

        <div ref={ctaRef} className="flex justify-center mb-20">
          <button
            onClick={() => (window as any).openAgendamento?.()}
            className="btn-luxury bg-luxury-gold text-white hover:shadow-glow px-12 py-5 text-base group inline-flex items-center"
          >
            {c.btnBook[lang]}
            <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
          <a href="mailto:contato@rowanvilar.com.br" className="flex flex-col items-center gap-3 group">
            <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
              <Mail className="w-5 h-5 text-luxury-gold" />
            </div>
            <span className="font-sans text-sm text-luxury-cream/80 group-hover:text-luxury-gold transition-colors">contato@rowanvilar.com.br</span>
          </a>
          <a href="tel:+5521988816084" className="flex flex-col items-center gap-3 group">
            <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
              <Phone className="w-5 h-5 text-luxury-gold" />
            </div>
            <span className="font-sans text-sm text-luxury-cream/80 group-hover:text-luxury-gold transition-colors">(21) 98881-6084</span>
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=5521988816084&text=Hello! I found you through your website and I'd like to schedule an appointment"
            target="_blank" rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center group-hover:bg-luxury-gold/20 transition-colors">
              <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span className="font-sans text-sm text-luxury-cream/80 group-hover:text-luxury-gold transition-colors">WhatsApp</span>
          </a>
        </div>

        <footer ref={footerRef} className="border-t border-white/10 pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="font-serif text-2xl text-luxury-cream tracking-[0.1em]">Dr. Rowan Vilar</div>
            <div className="flex items-center gap-6">
              <a href="https://www.instagram.com/dr.rowan.dentist" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-luxury-gold/20 hover:border-luxury-gold transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-luxury-cream" />
              </a>
              <a href="https://www.youtube.com/user/RowanHOT" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-luxury-gold/20 hover:border-luxury-gold transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4 text-luxury-cream" />
              </a>
            </div>
            <div className="flex items-center gap-6 text-xs text-luxury-gray/60">
              <a href="#" className="hover:text-luxury-gold transition-colors">{c.privacy[lang]}</a>
              <span>|</span>
              <a href="#" className="hover:text-luxury-gold transition-colors">{c.terms[lang]}</a>
            </div>
          </div>
          <div className="text-center mt-10">
            <p className="font-sans text-xs text-luxury-gray/40">© {new Date().getFullYear()} Dr. Rowan Vilar. Todos os direitos reservados.</p>
            <p className="font-sans text-xs text-luxury-gray/40 mt-1">CRO RJ-36828 | Invisalign Top Doctor | Visiting Professor UERJ</p>
            <p className="font-sans text-xs text-luxury-gray/40 mt-1">Harvard University | NYU | UFRJ | WFO Member</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
