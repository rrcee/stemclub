import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Mail, UserCheck, X } from 'lucide-react';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 950 }}>
      {/* Popover Menu */}
      {open && (
        <div
          role="dialog"
          aria-label="Quick Contact Menu"
          style={{
            position: 'absolute',
            bottom: '4rem',
            right: 0,
            width: '270px',
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '18px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            animation: 'fadeIn 0.2s ease',
            color: '#000000'
          }}
        >
          <div style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: '#000000',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid #000000',
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Teacher Inquiries</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close contact options"
              style={{ background: 'none', border: 'none', color: '#000000', cursor: 'pointer', padding: '2px' }}
            >
              <X size={16} />
            </button>
          </div>

          <a
            href="tel:04844440000"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.5rem',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#000000',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Phone size={15} color="#000000" />
            <span>Call: 0484-4440000</span>
          </a>

          <a
            href="mailto:office@gps.ac.in"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.5rem',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#000000',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Mail size={15} color="#000000" />
            <span>Email: office@gps.ac.in</span>
          </a>

          <Link
            to="/join"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              borderRadius: '999px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              color: '#ffffff',
              backgroundColor: '#000000',
              border: '2px solid #000000',
              textDecoration: 'none',
              marginTop: '0.25rem',
              justifyContent: 'center',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)'
            }}
          >
            <UserCheck size={15} />
            <span>Selection Details</span>
          </Link>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close contact menu' : 'Open quick contact menu'}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#000000',
          border: '2px solid #ffffff',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? <X size={22} strokeWidth={2.5} /> : <MessageSquare size={22} strokeWidth={2.2} />}
      </button>
    </div>
  );
}
