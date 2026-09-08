import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for adding GSAP ScrollTrigger parallax to an element.
 * @param {number} speed - Positive moves slower than scroll, negative moves faster/opposite.
 * @param {object} options - Optional start/end/ease configs.
 */
export function useParallax(speed = 0.25, options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const yDist = speed * 120;

      gsap.fromTo(
        el,
        { y: -yDist / 2 },
        {
          y: yDist / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top bottom',
            end: options.end || 'bottom top',
            scrub: options.scrub !== undefined ? options.scrub : 0.8,
            ...options
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, options]);

  return elementRef;
}

/**
 * Hook for staggered card entrance animations on scroll.
 * @param {string} childSelector - Target class or selector for cards inside container.
 * @param {number} stagger - Delay between consecutive items.
 */
export function useGsapStagger(childSelector = '.gsap-reveal', stagger = 0.12) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets = container.querySelectorAll(childSelector);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        {
          y: 40,
          opacity: 0,
          scale: 0.96
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: stagger,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, [childSelector, stagger]);

  return containerRef;
}

/**
 * Hook for floating ambient animation with slight parallax reaction
 */
export function useFloatingAnimation(amplitude = 12, duration = 3.5) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: amplitude,
        duration: duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    }, el);

    return () => ctx.revert();
  }, [amplitude, duration]);

  return elementRef;
}

export { gsap, ScrollTrigger };
