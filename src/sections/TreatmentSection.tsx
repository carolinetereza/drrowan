import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TreatmentSectionProps {
  id: string;
  label: string;
  headline: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  image: string;
  imagePosition: 'left' | 'right';
  zIndex: number;
  isFirst?: boolean;
}

// ─── Mobile Card (no GSAP pinning) ────────────────────────────────────────
function MobileCard({ id, label, headline, description, ctaPrimary, ctaSecondary, image, imagePosition }: TreatmentSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const isImageLeft = imagePosition === 'left';

  return (
    <section id={id} ref={cardRef} className="bg-luxury-cream py-14 px-4">
      <div className="max-w-sm mx-auto">
        {/* Image */}
        <div className="w-full h-64 overflow-hidden mb-8 image-card-shadow">
          <img
            src={image}
            alt={headline}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Text */}
        <div>
          <span className="heading-section text-luxury-gray block mb-2">{label}</span>
          <div className="h-px w-16 bg-luxury-gold mb-5" />
          <h2 className="font-serif text-4xl text-luxury-charcoal uppercase leading-none mb-5">
            {headline}
          </h2>
          <p className="font-sans text-sm text-luxury-gray leading-relaxed mb-8">
            {description}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => (window as any).openAgendamento?.()}
              className="btn-luxury btn-luxury-gold btn-luxury-pill flex items-center justify-center gap-2"
            >
              {ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </button>
              {ctaSecondary && (
                <button className="btn-luxury btn-luxury-outline btn-luxury-pill text-center justify-center">
                  {ctaSecondary}
                </button>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Desktop Section (pinned + parallax) ──────────────────────────────────
function DesktopSection({
  id, label, headline, description, ctaPrimary, ctaSecondary,
  image, imagePosition, zIndex, isFirst = false,
}: TreatmentSectionProps) {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const imgElRef    = useRef<HTMLImageElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const ruleRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section   = sectionRef.current;
    const imageCard = imageRef.current;
    const imgEl     = imgElRef.current;
    const textBlock = textRef.current;
    const labelEl   = labelRef.current;
    const headlineEl= headlineRef.current;
    const descEl    = descRef.current;
    const ctaEl     = ctaRef.current;
    const ruleEl    = ruleRef.current;

    if (!section || !imageCard || !textBlock) return;

    const ctx = gsap.context(() => {
      const isImageLeft = imagePosition === 'left';

      // ── Parallax on inner image ──────────────────────────────────
      if (imgEl) {
        gsap.fromTo(imgEl,
          { y: '-8%' },
          {
            y: '8%', ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=70%',
              scrub: true,
            },
          }
        );
      }

      // ── First section entrance (auto-plays on load) ──────────────
      if (isFirst) {
        const loadTl = gsap.timeline({ delay: 0.3 });
        loadTl.fromTo(imageCard,
          { x: '-12vw', opacity: 0, scale: 1.06 },
          { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 0
        );
        loadTl.fromTo(textBlock,
          { x: '6vw', opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.2
        );
        loadTl.fromTo(labelEl,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.4
        );
        loadTl.fromTo(ruleEl,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power2.out' }, 0.5
        );
        if (headlineEl) {
          const words = headlineEl.querySelectorAll('.word');
          loadTl.fromTo(words,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out' }, 0.5
          );
        }
        loadTl.fromTo(descEl,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.7
        );
        loadTl.fromTo(ctaEl,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.8
        );
      }

      // ── Scroll-driven pin (reduced to 70% for snappier pacing) ───
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=70%',       // ← was 130%, now much snappier
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            if (isFirst) {
              gsap.set([imageCard, textBlock], { opacity: 1, x: 0, scale: 1 });
            }
          },
        },
      });

      // Non-first: entrance 0–30%
      if (!isFirst) {
        const imageStartX = isImageLeft ? '-60vw' : '60vw';
        const textStartX  = isImageLeft ? '-40vw' : '40vw';
        scrollTl.fromTo(imageCard,
          { x: imageStartX, opacity: 0, scale: 1.04 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0
        );
        scrollTl.fromTo(textBlock,
          { x: textStartX, opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' }, 0
        );
        scrollTl.fromTo(labelEl,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05
        );
        scrollTl.fromTo(ruleEl,
          { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.08
        );
        if (headlineEl) {
          const words = headlineEl.querySelectorAll('.word');
          scrollTl.fromTo(words,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.01, ease: 'none' }, 0.1
          );
        }
        scrollTl.fromTo(descEl,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.15
        );
        scrollTl.fromTo(ctaEl,
          { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.2
        );
      }

      // Exit 70–100%
      const imageExitX = isImageLeft ? '-18vw' : '18vw';
      const textExitX  = isImageLeft ? '-10vw' : '10vw';
      scrollTl.fromTo(imageCard,
        { x: 0, opacity: 1 },
        { x: imageExitX, opacity: 0, ease: 'power2.in' }, 0.7
      );
      scrollTl.fromTo(textBlock,
        { x: 0, opacity: 1 },
        { x: textExitX, opacity: 0, ease: 'power2.in' }, 0.7
      );

    }, section);

    return () => ctx.revert();
  }, [imagePosition, isFirst]);

  const headlineWords = headline.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
  ));

  const isImageLeft = imagePosition === 'left';

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned bg-luxury-cream"
      style={{ zIndex }}
    >
      <div className="relative w-full h-full flex items-center">
        {/* Image Card */}
        <div
          ref={imageRef}
          className={`absolute ${isImageLeft ? 'left-[6vw]' : 'right-[6vw]'} top-[14vh] w-[52vw] h-[72vh] overflow-hidden image-card-shadow gpu`}
          style={{ opacity: isFirst ? 0 : undefined }}
        >
          <img
            ref={imgElRef}
            src={image}
            alt={headline}
            className="w-full object-cover will-change-transform"
            style={{ height: '116%', objectPosition: 'center top' }}
            loading={isFirst ? 'eager' : 'lazy'}
          />
        </div>

        {/* Text Block */}
        <div
          ref={textRef}
          className={`absolute ${isImageLeft ? 'left-[62vw]' : 'left-[6vw]'} top-[18vh] w-[30vw] min-w-[300px]`}
          style={{ opacity: isFirst ? 0 : undefined }}
        >
          <div ref={labelRef} className="mb-6">
            <span className="heading-section text-luxury-gray block mb-3">{label}</span>
            <div ref={ruleRef} className="gold-rule origin-left" />
          </div>

          <h1 ref={headlineRef} className="heading-display text-luxury-charcoal mb-8">
            {headlineWords}
          </h1>

          <p ref={descRef} className="body-text text-luxury-gray mb-10 max-w-[360px]">
            {description}
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={() => (window as any).openAgendamento?.()}
              className="btn-luxury btn-luxury-gold btn-luxury-pill group"
            >
              {ctaPrimary}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            {ctaSecondary && (
              <button className="btn-luxury btn-luxury-outline btn-luxury-pill">
                {ctaSecondary}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Smart wrapper — picks Mobile or Desktop based on screen width ─────────
export default function TreatmentSection(props: TreatmentSectionProps) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return isMobile
    ? <MobileCard {...props} />
    : <DesktopSection {...props} />;
}
