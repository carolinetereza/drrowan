import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../translations';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Caroline Balbinot',
    text: 'Escolhi o Dr. Rowan para fazer clareamento nos meus dentes e o resultado ficou incrível, super natural e sem nenhum tipo de sensibilidade nem durante e nem depois do tratamento. Excelente profissional, recomendo muito!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson (USA)',
    text: 'As an expat living in Rio, finding an English-speaking dentist was crucial. Dr. Rowan exceeded all expectations! His Invisalign treatment transformed my smile completely. The personal WhatsApp follow-up made all the difference.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Matheus Delgado',
    text: 'Extremely thorough consultation and cleaning! An excellent communicator, clearly passionate about his work: he took the time to explain all the treatments options and to answer questions I had. His English is excellent.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Marcos A.',
    text: 'Dr Rowan é um exemplo de profissionalismo: muito atencioso, detalhista e pontual. Está sempre se atualizando e utiliza as técnicas mais modernas da odontologia. Resolvi fazer facetas de porcelana com ele e foi a melhor decisão que tomei.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Flávia',
    text: 'O Dr Rowan e sua equipe são incríveis. Escolhi fazer gengivoplastia com ele porque vi que era especializado nisso e tinha muitas recomendações, e não errei! O suporte foi 100% desde o primeiro momento.',
    rating: 5,
  },
  {
    id: 6,
    name: 'James Miller (UK)',
    text: 'Best dentist for expats in Rio! I needed a full smile makeover and Dr. Rowan delivered beyond expectations. The Digital Smile Design preview was amazing - I could see my results before starting. Highly recommend!',
    rating: 5,
  },
  {
    id: 7,
    name: 'Paulo Castro',
    text: 'Estou muito satisfeito com o trabalho do Dr Rowan e toda sua equipe. Cheguei com dores e dificuldade de encontrar o foco do problema com outros profissionais até que Dr Rowan não só resolveu meu problema.',
    rating: 5,
  },
  {
    id: 8,
    name: 'Patricia Mendes',
    text: 'Excelente profissional! Eu estava buscando um dentista que pudesse me ajudar com os inúmeros problemas odontológicos que eu tinha e o Dr Rowan foi super paciente para escutar todo o meu caso.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const slider = sliderRef.current;

    if (!section || !heading || !slider) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(heading,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Slider animation
      gsap.fromTo(slider,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slider,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-luxury-cream py-24 lg:py-32 overflow-hidden"
    >
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <span className="heading-section text-luxury-gold block mb-4">{t.testimonials.tag[lang]}</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-luxury-charcoal">{t.testimonials.headline[lang]}</h2>
            <p className="body-text text-luxury-gray mt-4 max-w-xl">{t.testimonials.sub[lang]}</p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-4 mt-6 lg:mt-0">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-luxury-charcoal/20 flex items-center justify-center hover:bg-luxury-charcoal hover:text-luxury-cream transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-luxury-charcoal/20 flex items-center justify-center hover:bg-luxury-charcoal hover:text-luxury-cream transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div ref={sliderRef} className="relative">
          {/* Mobile: 1 card */}
          <div className="grid grid-cols-1 sm:hidden gap-6">
            {[testimonials[currentIndex]].map((t, i) => (
              <div key={`m-${t.id}-${i}`} className="testimonial-card">
                <Quote className="w-8 h-8 text-luxury-gold/30 mb-6" />
                <p className="font-sans text-sm text-luxury-charcoal leading-relaxed mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-warm flex items-center justify-center">
                    <span className="font-serif text-sm text-luxury-charcoal">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-sm text-luxury-charcoal">{t.name}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Tablet+: 2 or 3 cards */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="testimonial-card group hover:bg-white transition-colors duration-300">
                <Quote className="w-8 h-8 text-luxury-gold/30 mb-6" />
                <p className="font-sans text-sm text-luxury-charcoal leading-relaxed mb-8">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-warm flex items-center justify-center">
                    <span className="font-serif text-sm text-luxury-charcoal">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-sm text-luxury-charcoal">{testimonial.name}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-luxury-gold w-6'
                    : 'bg-luxury-charcoal/20 hover:bg-luxury-charcoal/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
