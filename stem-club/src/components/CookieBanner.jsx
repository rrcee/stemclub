import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('gps_stem_cookie_consent');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('gps_stem_cookie_consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy notice"
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '1.25rem',
        maxWidth: '420px',
        zIndex: 140,
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: '12px',
        padding: '1.25rem',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        <ShieldCheck size={20} color="var(--accent-cyan)" />
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9375rem', margin: 0, color: 'var(--text-primary)' }}>
          Student Privacy & Cookie Notice
        </h4>
      </div>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
        This site stores local preferences (theme, filters) and does not deploy invasive third-party tracking scripts.
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
        <button
          onClick={handleDismiss}
          className="btn btn-primary"
          style={{ padding: '0.375rem 1rem', fontSize: '0.75rem', borderRadius: '6px' }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
