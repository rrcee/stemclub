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
    <aside
      role="region"
      aria-label="Privacy notice"
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 900,
        backgroundColor: '#000000',
        color: '#ffffff',
        border: '2px solid #ffffff',
        borderRadius: '999px',
        padding: '0.45rem 0.85rem 0.45rem 1rem',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: 'calc(100vw - 2rem)',
        width: 'max-content'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <ShieldCheck size={16} color="#ffffff" />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap' }}>
          No tracking cookies used
        </span>
      </div>

      <button
        onClick={handleDismiss}
        style={{
          padding: '0.3rem 0.75rem',
          fontSize: '0.75rem',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          textTransform: 'uppercase',
          borderRadius: '999px',
          backgroundColor: '#ffffff',
          color: '#000000',
          border: '1px solid #ffffff',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        OK
      </button>
    </aside>
  );
}
