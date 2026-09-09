import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onFinish }) {
  const [removed, setRemoved] = useState(false);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const ringRef = useRef(null);
  const sheenRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const badgeRef = useRef(null);
  const skipHintRef = useRef(null);

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
    // Triggers on EVERY refresh as requested
    const ctx = gsap.context(() => {
      // 1. Set initial states for animation
      gsap.set([cardRef.current, text1Ref.current, text2Ref.current, badgeRef.current, skipHintRef.current], {
        opacity: 0
      });
      gsap.set(cardRef.current, { scale: 0.15, rotation: -20 });
      gsap.set(ringRef.current, { scale: 0.4, opacity: 0, rotation: 0 });

      // 2. Orchestrated master timeline
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

      tl
        // Card pops in with bouncy spring physics
        .to(cardRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'back.out(1.8)'
        }, 0.1)

        // Dashed orbit ring expands behind card
        .to(ringRef.current, {
          opacity: 0.75,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        }, 0.25)

        // Specular light sheen sweeps across white bird card
        .fromTo(sheenRef.current,
          { left: '-130%' },
          { left: '170%', duration: 0.65, ease: 'power2.inOut' },
          0.5
        )

        // School eyebrow text slides down
        .fromTo(text1Ref.current,
          { opacity: 0, y: -12, letterSpacing: '0.1em' },
          { opacity: 1, y: 0, letterSpacing: '0.28em', duration: 0.4, ease: 'power3.out' },
          0.6
        )

        // STEM CLUB title punches in
        .fromTo(text2Ref.current,
          { opacity: 0, scale: 0.8, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)' },
          0.75
        )

        // Innovation badge pops up
        .fromTo(badgeRef.current,
          { opacity: 0, y: 12, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' },
          0.9
        )

        // Skip hint gently fades in
        .to(skipHintRef.current, {
          opacity: 0.7,
          duration: 0.3
        }, 1.1)

        // Hold display so user sees the animated brand
        .to({}, { duration: 1.1 });

      // Continuous slow rotation for orbit ring
      gsap.to(ringRef.current, {
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
          gap: '1.75rem',
          maxWidth: '520px',
          width: '100%'
        }}
      >
        {/* Animated Mascot Showcase with Orbit Ring */}
        <div style={{ position: 'relative', width: '240px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Dashed Orbital Tech Ring */}
          <div
            ref={ringRef}
            style={{
              position: 'absolute',
              width: '230px',
              height: '230px',
              borderRadius: '50%',
              border: '2px dashed rgba(255, 255, 255, 0.65)',
              pointerEvents: 'none'
            }}
          />

          {/* Glowing Aura Ring */}
          <div
            style={{
              position: 'absolute',
              width: '190px',
              height: '190px',
              borderRadius: '36px',
              background: 'rgba(255, 255, 255, 0.25)',
              filter: 'blur(20px)',
              pointerEvents: 'none'
            }}
          />

          {/* Crisp Pure White Mascot Card (Pure White Background for Bird) */}
          <div
            ref={cardRef}
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
              padding: '14px',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.28), 0 0 0 6px rgba(255, 255, 255, 0.4)',
              overflow: 'hidden',
              zIndex: 2
            }}
          >
            {/* The Bird Mascot Artwork */}
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

            {/* Specular Light Sheen Sweeping Across White Card */}
            <div
              ref={sheenRef}
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

        {/* Minimalist Studio Typography */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div
            ref={text1Ref}
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
            ref={text2Ref}
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

          <div
            ref={badgeRef}
            style={{
              display: 'inline-block',
              marginTop: '0.85rem',
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
            INNOVATION LABS • KOCHI
          </div>
        </div>

        {/* Subtle Skip Hint */}
        <div
          ref={skipHintRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'rgba(255, 255, 255, 0.8)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          Click or press any key to enter
        </div>
      </div>
    </div>
  );
}
