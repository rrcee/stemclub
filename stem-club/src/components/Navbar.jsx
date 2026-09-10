import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/magazine', label: 'Magazine' },
  { path: '/activities', label: 'Activities' },
  { path: '/stem-lab', label: 'STEM Lab' },
  { path: '/events', label: 'Events' },
  { path: '/achievements', label: 'Achievements' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);
  const location = useLocation();

  const handleLogoClick = (e) => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3 || e.detail >= 3) {
      e.preventDefault();
      setEasterEggActive(prev => !prev);
      clickCountRef.current = 0;
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link
            to="/"
            className="nav-logo"
            onClick={handleLogoClick}
            aria-label="STEM Club Home"
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
          >
            <span className="nav-logo-icon" style={{
              width: '54px',
              height: '54px',
              background: '#ffffff',
              borderRadius: '50%',
              border: '3px solid #000000',
              padding: '2px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
              flexShrink: 0
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/stem-club-logo.png" alt="STEM Club Logo" style={{ width: '92%', height: '92%', objectFit: 'contain' }} />
              </div>
            </span>
            <span
              onClick={(e) => {
                if (easterEggActive) {
                  e.preventDefault();
                  e.stopPropagation();
                  window.dispatchEvent(new CustomEvent('open-stem-game'));
                }
              }}
              style={{
                fontSize: easterEggActive ? '1rem' : '1.25rem',
                fontWeight: 900,
                letterSpacing: easterEggActive ? '0.02em' : '0.04em',
                backgroundColor: easterEggActive ? '#000000' : 'transparent',
                color: '#ffffff',
                padding: easterEggActive ? '4px 14px' : '0',
                borderRadius: easterEggActive ? '999px' : '0',
                border: easterEggActive ? '2px solid #ffffff' : 'none',
                boxShadow: easterEggActive ? '0 4px 14px rgba(0,0,0,0.3)' : 'none',
                transition: 'all 0.25s ease',
                cursor: easterEggActive ? 'pointer' : 'pointer',
                userSelect: 'none'
              }}
              title={easterEggActive ? 'Click to play secret mini-game!' : undefined}
            >
              {easterEggActive ? 'built by rishi and joshua' : 'STEM CLUB'}
            </span>
          </Link>

          <ul className="nav-links" role="menubar">
            {navItems.map((item) => (
              <li key={item.path} role="none">
                <Link
                  to={item.path}
                  role="menuitem"
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/join" className="btn btn-primary nav-cta" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem', borderRadius: '999px' }}>
              Selection
            </Link>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid rgba(255, 255, 255, 0.25)' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
            onClick={handleLogoClick}
          >
            <span style={{ width: '50px', height: '50px', background: '#ffffff', borderRadius: '50%', border: '2.5px solid #000000', padding: '2px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/assets/stem-club-logo.png" alt="STEM Club Logo" style={{ width: '92%', height: '92%', objectFit: 'contain' }} />
              </div>
            </span>
            <span
              onClick={(e) => {
                if (easterEggActive) {
                  e.preventDefault();
                  e.stopPropagation();
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent('open-stem-game'));
                }
              }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                color: '#ffffff',
                fontSize: easterEggActive ? '0.9rem' : '1.25rem',
                letterSpacing: easterEggActive ? '0.02em' : '0.04em',
                backgroundColor: easterEggActive ? '#000000' : 'transparent',
                padding: easterEggActive ? '4px 12px' : '0',
                borderRadius: easterEggActive ? '999px' : '0',
                border: easterEggActive ? '2px solid #ffffff' : 'none',
                transition: 'all 0.25s ease'
              }}
              title={easterEggActive ? 'Tap to play secret mini-game!' : undefined}
            >
              {easterEggActive ? 'built by rishi and joshua' : 'STEM CLUB'}
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: '#ffffff', border: '2px solid #000000', borderRadius: '8px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000000', cursor: 'pointer' }}
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link to="/join" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
          Selection Process
        </Link>
      </div>
    </>
  );
}
