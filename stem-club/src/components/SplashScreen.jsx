import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Layers, ShieldCheck, Sparkles } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [removed, setRemoved] = useState(false);
  const containerRef = useRef(null);

  // Frame 1: School Logo Refs
  const frame1Ref = useRef(null);
  const card1Ref = useRef(null);
  const sheen1Ref = useRef(null);
  const text1SchoolRef = useRef(null);
  const badge1Ref = useRef(null);

  // Frame 2: STEM Club Logo Refs
  const frame2Ref = useRef(null);
  const card2Ref = useRef(null);
  const ring2Ref = useRef(null);
  const sheen2Ref = useRef(null);
  const text2StemRef = useRef(null);
  const badge2Ref = useRef(null);

  const finishSplash = () => {
    if (!containerRef.current) return;
    gsap.killTweensOf(containerRef.current);
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.06,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        setRemoved(true);
        if (onFinish) onFinish();
      }
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial GSAP state setup
      gsap.set(frame1Ref.current, { display: 'flex', opacity: 1 });
      gsap.set(card1Ref.current, { scale: 0.85, opacity: 1 });
      gsap.set([text1SchoolRef.current, badge1Ref.current], { opacity: 1, y: 0 });

      gsap.set(frame2Ref.current, { display: 'none', opacity: 1 });
      gsap.set(card2Ref.current, { scale: 0.85, opacity: 1 });
      gsap.set(ring2Ref.current, { scale: 0.7, opacity: 0.8, rotation: 0 });
      gsap.set([text2StemRef.current, badge2Ref.current], { opacity: 1, y: 0 });

      // 2. Master Sequence Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.45,
            ease: 'power2.inOut',
            onComplete: () => {
              setRemoved(true);
              if (onFinish) onFinish();
            }
          });
        }
      });

      // --- STAGE 01: School Logo Entrance ---
      tl
        .to(frame1Ref.current, { opacity: 1, duration: 0.1 }, 0.1)
        // School Logo Card pops in
        .to(card1Ref.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.65,
          ease: 'back.out(1.7)'
        }, 0.15)
        // Specular sheen sweep across school logo
        .fromTo(sheen1Ref.current,
          { left: '-130%' },
          { left: '170%', duration: 0.65, ease: 'power2.inOut' },
          0.45
        )
        // School text reveals
        .to(text1SchoolRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 0.55)
        .to(badge1Ref.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.7)
        .to({}, { duration: 0.6 })

        // --- TRANSITION (Stage 1 -> Stage 2) ---
        .to(frame1Ref.current, {
          opacity: 0,
          scale: 0.88,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(frame1Ref.current, { display: 'none' });
            gsap.set(frame2Ref.current, { display: 'flex' });
          }
        })

        // --- STAGE 02: STEM Mascot Logo Entrance ---
        .to(frame2Ref.current, { opacity: 1, duration: 0.1 })
        // Mascot Card springs in
        .to(card2Ref.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'back.out(1.8)'
        })
        // Orbit tech ring expands
        .to(ring2Ref.current, {
          opacity: 0.75,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        }, '-=0.45')
        // Specular sheen sweep across bird mascot card
        .fromTo(sheen2Ref.current,
          { left: '-130%' },
          { left: '170%', duration: 0.65, ease: 'power2.inOut' },
          '-=0.25'
        )
        // Kinetic STEM Club title reveals
        .to(text2StemRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.15')
        .to(badge2Ref.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.1')
        .to({}, { duration: 1.1 });

      // Continuous slow rotation for orbit ring
      gsap.to(ring2Ref.current, {
        rotation: 360,
        duration: 14,
        repeat: -1,
        ease: 'none'
      });
    }, containerRef);

    const handleKey = () => finishSplash();
    window.addEventListener('keydown', handleKey);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      ref={containerRef}
      onClick={finishSplash}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'radial-gradient(circle at center, #2baad7 0%, #2596be 65%, #1b7a9e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden'
      }}
      role="status"
      aria-label="Greets STEM Club Loading Screen"
    >
      {/* Background Kinetic Circuit Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          maxWidth: '520px',
          width: '100%'
        }}
      >
        {/* STAGE 01: Official School Logo (Identical 1:1 Aspect Ratio as STEM Logo) */}
        <div
          ref={frame1Ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <div className="splash-stage" style={{ position: 'relative', width: '230px', height: '230px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              className="splash-blur"
              style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                borderRadius: '36px',
                background: 'rgba(255, 255, 255, 0.25)',
                filter: 'blur(20px)',
                pointerEvents: 'none'
              }}
            />

            <div
              ref={card1Ref}
              className="splash-card-1"
              style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                backgroundColor: '#ffffff',
                borderRadius: '34px',
                border: '3px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.28), 0 0 0 6px rgba(255, 255, 255, 0.4)',
                overflow: 'hidden',
                zIndex: 2
              }}
            >
              <img
                src="/assets/school-logo.png"
                alt="Greets Public School Official Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: 'scale(1.4)',
                  transformOrigin: 'center',
                  display: 'block'
                }}
              />

              <div
                ref={sheen1Ref}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-130%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85), transparent)',
                  transform: 'skewX(-25deg)',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>

          <div ref={text1SchoolRef} style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
                fontWeight: 900,
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 0.25rem 0',
                letterSpacing: '0.04em',
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'
              }}
            >
              GREETS PUBLIC SCHOOL
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78125rem',
                color: 'rgba(255, 255, 255, 0.88)',
                margin: 0,
                letterSpacing: '0.06em'
              }}
            >
              A Project of Bethel Foundation • CBSE Affiliated
            </p>
          </div>

          <div
            ref={badge1Ref}
            style={{
              marginTop: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 1rem',
              borderRadius: '999px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: '2px solid #000000',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}
          >
            <ShieldCheck size={14} /> Foundation of Innovation
          </div>
        </div>

        {/* HYPERFRAME 02: STEM Club Mascot Logo (Pure White Background) */}
        <div
          ref={frame2Ref}
          style={{
            display: 'none',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <div className="splash-stage" style={{ position: 'relative', width: '230px', height: '230px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              ref={ring2Ref}
              className="splash-ring"
              style={{
                position: 'absolute',
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                border: '2px dashed rgba(255, 255, 255, 0.65)',
                pointerEvents: 'none'
              }}
            />

            <div
              className="splash-blur"
              style={{
                position: 'absolute',
                width: '180px',
                height: '180px',
                borderRadius: '36px',
                background: 'rgba(255, 255, 255, 0.25)',
                filter: 'blur(20px)',
                pointerEvents: 'none'
              }}
            />

            <div
              ref={card2Ref}
              className="splash-card-2"
              style={{
                position: 'relative',
                width: '175px',
                height: '175px',
                backgroundColor: '#ffffff',
                borderRadius: '34px',
                border: '3px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.28), 0 0 0 6px rgba(255, 255, 255, 0.4)',
                overflow: 'hidden',
                zIndex: 2
              }}
            >
              <img
                src="/assets/stem-club-logo.png"
                alt="GPS STEM Club Mascot Bird"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />

              <div
                ref={sheen2Ref}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-130%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85), transparent)',
                  transform: 'skewX(-25deg)',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>

          <div ref={text2StemRef} style={{ textAlign: 'center', marginTop: '1rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 800,
                color: 'rgba(255, 255, 255, 0.92)',
                textTransform: 'uppercase',
                marginBottom: '0.35rem'
              }}
            >
              GREETS PUBLIC SCHOOL
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.25rem, 7vw, 3rem)',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'
              }}
            >
              STEM CLUB
            </h1>
          </div>

          <div
            ref={badge2Ref}
            style={{
              marginTop: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 1.15rem',
              borderRadius: '999px',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: '2px solid #000000',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Sparkles size={14} /> Innovation Labs • Kochi
          </div>
        </div>
      </div>
    </div>
  );
}
