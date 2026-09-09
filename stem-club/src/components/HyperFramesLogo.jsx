import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Layers, ShieldCheck } from 'lucide-react';

export default function HyperFramesLogo({ autoPlay = true, interval = 3500, className = '' }) {
  const [activeFrame, setActiveFrame] = useState(1);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  const switchFrame = (frameNum) => {
    if (frameNum === activeFrame) return;
    setActiveFrame(frameNum);

    if (frameNum === 1) {
      gsap.to(card2Ref.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          gsap.fromTo(card1Ref.current,
            { opacity: 0, scale: 0.92, y: 8 },
            { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }
          );
        }
      });
    } else {
      gsap.to(card1Ref.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          gsap.fromTo(card2Ref.current,
            { opacity: 0, scale: 0.92, y: 8 },
            { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }
          );
        }
      });
    }
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveFrame((prev) => {
        const next = prev === 1 ? 2 : 1;
        switchFrame(next);
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, activeFrame]);

  return (
    <div
      className={'hyperframes-container ' + className}
      onClick={() => switchFrame(activeFrame === 1 ? 2 : 1)}
      title="Click to toggle insignia"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* Visual Logo Stage - Both cards identical 1:1 Aspect Ratio */}
      <div
        style={{
          position: 'relative',
          width: '160px',
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* FRAME 1: Official Greets Public School Logo (Square 1:1 Aspect Ratio) */}
        <div
          ref={card1Ref}
          style={{
            position: activeFrame === 1 ? 'relative' : 'absolute',
            width: '160px',
            height: '160px',
            backgroundColor: '#ffffff',
            borderRadius: '34px',
            border: '3px solid #000000',
            padding: '14px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
            display: activeFrame === 1 ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <img
            src="/assets/school-logo.png"
            alt="Greets Public School Logo"
            style={{
              width: '95%',
              height: '95%',
              objectFit: 'contain',
              transform: 'scale(1.4)',
              transformOrigin: 'center',
              display: 'block'
            }}
          />
        </div>

        {/* FRAME 2: Official GPS STEM Club Mascot Logo (Square 1:1 Aspect Ratio) */}
        <div
          ref={card2Ref}
          style={{
            position: activeFrame === 2 ? 'relative' : 'absolute',
            width: '160px',
            height: '160px',
            backgroundColor: '#ffffff',
            borderRadius: '34px',
            border: '3px solid #000000',
            padding: '14px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
            display: activeFrame === 2 ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <img
            src="/assets/stem-club-logo.png"
            alt="GPS STEM Club Mascot"
            style={{
              width: '95%',
              height: '95%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>
      </div>

      {/* Frame Insignia Label Text */}
      <div style={{ textAlign: 'center', marginTop: '12px', minHeight: '44px' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: '#ffffff', letterSpacing: '0.04em' }}>
          {activeFrame === 1 ? 'GREETS PUBLIC SCHOOL' : 'GPS STEM CLUB'}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.88)', letterSpacing: '0.05em' }}>
          {activeFrame === 1 ? 'Bethel Foundation • CBSE Affiliated' : 'Official Innovation Community Mascot'}
        </div>
      </div>

      {/* Frame Switcher Indicator Dots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.85rem' }}>
        <span
          onClick={(e) => { e.stopPropagation(); switchFrame(1); }}
          style={{
            width: activeFrame === 1 ? '22px' : '8px',
            height: '8px',
            borderRadius: '999px',
            backgroundColor: activeFrame === 1 ? '#000000' : 'rgba(0, 0, 0, 0.25)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          aria-label="School Logo"
        />
        <span
          onClick={(e) => { e.stopPropagation(); switchFrame(2); }}
          style={{
            width: activeFrame === 2 ? '22px' : '8px',
            height: '8px',
            borderRadius: '999px',
            backgroundColor: activeFrame === 2 ? '#000000' : 'rgba(0, 0, 0, 0.25)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          aria-label="STEM Club Logo"
        />
      </div>
    </div>
  );
}
