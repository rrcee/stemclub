import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Mail, UserPlus, X } from 'lucide-react';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 150 }}>
      {/* Popover Menu */}
      {open && (
        <div
          role="dialog"
          aria-label="Quick Contact Menu"
          style={{
            position: 'absolute',
            bottom: '4rem',
            right: 0,
            width: '260px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: '12px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.625rem',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-cyan)',
            paddingBottom: '0.375rem',
            borderBottom: '1px solid var(--border-subtle)',
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Club Contact & Join</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close contact options"
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
            >
              <X size={14} />
            </button>
          </div>

          <a
            href="tel:04844440000"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.5rem',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Phone size={15} color="var(--accent-cyan)" />
            <span>Call School: 0484-4440000</span>
          </a>

          <a
            href="mailto:office@gps.ac.in"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.5rem',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Mail size={15} color="var(--accent-sky)" />
            <span>Email: office@gps.ac.in</span>
          </a>

          <Link
            to="/join"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.5rem',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              color: '#060913',
              backgroundColor: 'var(--accent-cyan)',
              fontWeight: 600,
              textDecoration: 'none',
              marginTop: '0.25rem',
              justifyContent: 'center'
            }}
          >
            <UserPlus size={15} />
            <span>Apply to Join Club</span>
          </Link>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close contact menu' : 'Open quick contact menu'}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)',
          border: 'none',
          color: '#060913',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 229, 255, 0.4)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? <X size={22} strokeWidth={2.2} /> : <MessageSquare size={22} strokeWidth={2.2} />}
      </button>
    </div>
  );
}
