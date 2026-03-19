import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const isActive = useRef(true);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Initial position off-screen
    gsap.set([dot, ring], { x: -100, y: -100 });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (isActive.current) {
        isActive.current = false;
        requestAnimationFrame(() => {
          gsap.to(dot, {
            x: mousePos.current.x,
            y: mousePos.current.y,
            duration: 0.08,
            ease: 'power2.out',
          });
          gsap.to(ring, {
            x: mousePos.current.x,
            y: mousePos.current.y,
            duration: 0.15,
            ease: 'power2.out',
          });
          isActive.current = true;
        });
      }
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    // Magnetic effect for interactive elements
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      target.classList.add('cursor-magnetic');
      
      gsap.to(ring, {
        scale: 1.5,
        borderColor: '#C9A46B',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1.5,
        duration: 0.3,
      });
    };

    const handleElementLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(201, 164, 107, 0.5)',
        duration: 0.3,
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
      });
    };

    // Add listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add magnetic effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="magnetic"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [isTouch]);

  // Update magnetic elements when DOM changes
  useEffect(() => {
    if (isTouch) return;

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor="magnetic"]');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(ringRef.current, {
            scale: 1.5,
            borderColor: '#C9A46B',
            duration: 0.3,
          });
          gsap.to(dotRef.current, {
            scale: 1.5,
            duration: 0.3,
          });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(ringRef.current, {
            scale: 1,
            borderColor: 'rgba(201, 164, 107, 0.5)',
            duration: 0.3,
          });
          gsap.to(dotRef.current, {
            scale: 1,
            duration: 0.3,
          });
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" />
      <div ref={ringRef} className="cursor-ring hidden lg:block" />
    </>
  );
}
