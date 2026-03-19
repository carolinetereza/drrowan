import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const navHrefs = ['#invisalign', '#treatments', '#testimonials', '#contact'];

export default function Navigation() {
  const { lang } = useLang();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navLinks = [
    { label: t.nav.inicio[lang],      href: navHrefs[0] },
    { label: t.nav.tratamentos[lang], href: navHrefs[1] },
    { label: t.nav.depoimentos[lang], href: navHrefs[2] },
    { label: t.nav.contato[lang],     href: navHrefs[3] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isScrolled ? 0 : -100,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [isScrolled]);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[1000] -translate-y-full"
      >
        <div className="backdrop-blur-xl bg-luxury-cream/80 border-b border-luxury-warm/30">
          <div className="flex items-center justify-between px-6 lg:px-12 py-4">
            {/* Logo */}
            <a
              href="#invisalign"
              onClick={(e) => { e.preventDefault(); scrollToSection('#invisalign'); }}
              className="font-serif text-xl tracking-[0.1em] text-luxury-charcoal hover:text-luxury-gold transition-colors"
            >
              Dr. Rowan Vilar
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="font-sans text-xs font-medium tracking-[0.15em] uppercase text-luxury-charcoal link-underline hover:text-luxury-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Language Switcher + CTA */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <button
                onClick={() => (window as any).openAgendamento?.()}
                className="btn-luxury btn-luxury-gold btn-luxury-pill text-xs py-3 px-6"
              >
                {t.nav.agendar[lang]}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-luxury-charcoal"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Static Logo (visible when not scrolled) */}
      <div
        className={`fixed top-6 left-6 lg:left-12 z-[999] transition-opacity duration-300 ${
          isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <a
          href="#invisalign"
          onClick={(e) => { e.preventDefault(); scrollToSection('#invisalign'); }}
          className="font-serif text-xl tracking-[0.1em] text-luxury-charcoal hover:text-luxury-gold transition-colors"
        >
          Dr. Rowan Vilar
        </a>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[998] bg-luxury-cream transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              className="font-serif text-3xl text-luxury-charcoal hover:text-luxury-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { setIsMobileMenuOpen(false); (window as any).openAgendamento?.(); }}
            className="btn-luxury btn-luxury-gold btn-luxury-pill mt-8"
          >
            {t.nav.agendar[lang]}
          </button>
        </div>
      </div>
    </>
  );
}
