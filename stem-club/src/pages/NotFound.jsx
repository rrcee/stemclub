import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Cpu, Calendar, ArrowRight, RotateCcw } from 'lucide-react';
import gsap from 'gsap';
import { useDocumentTitle } from '../hooks/useScrollReveal';

export default function NotFound() {
  useDocumentTitle('404 - Experiment Out of Range | GPS STEM Club');
  const location = useLocation();
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.96, y: 15 },
        { scale: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' }
      );
    }
  }, []);

  return (
    <div
      style={{
        minHeight: 'calc(100dvh - var(--nav-height))',
        backgroundColor: '#2596be',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--nav-height) + 2rem) 1rem 4rem',
        position: 'relative'
      }}
    >
      <div className="grid-pattern" style={{ opacity: 0.3 }} />

      <div
        ref={cardRef}
        className="card"
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: '#ffffff',
          color: '#000000',
          border: '3px solid #000000',
          borderRadius: '28px',
          maxWidth: '680px',
          width: '100%',
          padding: 'clamp(2rem, 5vw, 3.25rem)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.22)',
          textAlign: 'center'
        }}
      >
        {/* Diagnostic Status Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              display: 'inline-block',
              animation: 'beacon 1.4s infinite'
            }}
          />
          Signal Lost • 404
        </div>

        {/* Mascot / Radar Visual Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '22px',
              border: '2px solid #000000',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 8px 18px rgba(0, 0, 0, 0.1)'
            }}
          >
            <img
              src="/assets/stem-club-logo.png"
              alt="GPS STEM Club Mascot"
              style={{
                width: '74px',
                height: '74px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.75rem, 8vw, 4.25rem)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: '#000000',
            margin: '0 0 0.5rem'
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)',
            fontWeight: 800,
            color: '#000000',
            marginBottom: '1rem'
          }}
        >
          Experiment Out of Range
        </h2>

        <p
          style={{
            color: '#334155',
            fontSize: '0.95rem',
            lineHeight: 1.65,
            maxWidth: '520px',
            margin: '0 auto 1.5rem'
          }}
        >
          The lab sensors scanned every circuit and frequency, but this page could not be located. It may have been relocated during workshop maintenance or never initialized.
        </p>

        {/* Mini Retro-Futuristic Terminal Diagnostic */}
        <div
          style={{
            backgroundColor: '#0f172a',
            color: '#38bdf8',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            borderRadius: '16px',
            border: '2px solid #000000',
            padding: '1rem 1.25rem',
            textAlign: 'left',
            marginBottom: '2rem',
            overflowX: 'auto'
          }}
        >
          <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: '4px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>
            &gt; GPS_STEM_TELEMETRY_CONSOLE v2.4
          </div>
          <div>
            <span style={{ color: '#a855f7' }}>&gt; target_route: </span>
            <span style={{ color: '#f8fafc' }}>{location.pathname}</span>
          </div>
          <div>
            <span style={{ color: '#ef4444' }}>&gt; status: </span>
            <span>404_PAGE_NOT_FOUND (100% telemetry loss)</span>
          </div>
          <div>
            <span style={{ color: '#22c55e' }}>&gt; recommended_action: </span>
            <span style={{ color: '#cbd5e1' }}>Reroute to active laboratory sectors below</span>
          </div>
          <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: '#fbbf24' }}>&gt; emergency_override:</span>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-stem-game'))}
              style={{
                background: 'transparent',
                border: '1px solid #38bdf8',
                color: '#38bdf8',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#38bdf8'; e.currentTarget.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#38bdf8'; }}
            >
              [Launch STEM Rover Simulator]
            </button>
          </div>
        </div>

        {/* Primary Actions */}
        <div
          style={{
            display: 'flex',
            gap: '0.85rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}
        >
          <Link
            to="/"
            className="btn btn-primary"
            style={{
              padding: '0.85rem 1.85rem',
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Home size={16} /> Return to Home
          </Link>
          <Link
            to="/projects"
            className="btn btn-secondary"
            style={{
              padding: '0.85rem 1.85rem',
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Compass size={16} /> Explore Projects
          </Link>
        </div>

        {/* Quick Nav Shortcut Badges */}
        <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '1.5rem' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#64748b',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.85rem',
              letterSpacing: '0.05em'
            }}
          >
            Active Lab Sectors
          </span>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap'
            }}
          >
            {[
              { to: '/stem-lab', label: 'The STEM Lab', icon: Cpu },
              { to: '/events', label: 'Events & Sprints', icon: Calendar },
              { to: '/about', label: 'About Club', icon: ArrowRight },
              { to: '/join', label: 'Teacher Selection', icon: RotateCcw }
            ].map((sec) => {
              const Icon = sec.icon;
              return (
                <Link
                  key={sec.to}
                  to={sec.to}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    backgroundColor: '#f8fafc',
                    color: '#000000',
                    border: '1.5px solid #000000',
                    borderRadius: '999px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'transform 0.15s ease, background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.color = '#000000';
                  }}
                >
                  <Icon size={13} />
                  <span>{sec.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes beacon {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
