import { useEffect, useRef, useCallback } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.1, rootMargin = '0px 0px -60px 0px' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

export function useScrollRevealMultiple(count, options = {}) {
  const refs = useRef([]);
  const { threshold = 0.1, rootMargin = '0px 0px -60px 0px', stagger = 80 } = options;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReduced) {
              entry.target.classList.add('visible');
            } else {
              const index = parseInt(entry.target.dataset.revealIndex || '0', 10);
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, index * stagger);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [count, threshold, rootMargin, stagger]);

  const setRef = useCallback((index) => (el) => {
    refs.current[index] = el;
  }, []);

  return setRef;
}

export function useDocumentTitle(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | STEM Club GPS` : 'STEM Club | Greets Public School';

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }

    return () => { 
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [title, description]);
}
