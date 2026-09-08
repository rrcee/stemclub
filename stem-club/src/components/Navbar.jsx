import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/activities', label: 'Activities' },
  { path: '/stem-lab', label: 'STEM Lab' },
  { path: '/events', label: 'Events' },
  { path: '/achievements', label: 'Achievements' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
          <Link to="/" className="nav-logo" aria-label="STEM Club Home">
            <span className="nav-logo-icon" style={{ width: '42px', height: '42px', padding: '3px', background: '#ffffff', borderRadius: '10px', border: '2px solid #000000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/stem-club-logo.png" alt="STEM Club Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </span>
            <span>STEM CLUB</span>
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
            <Link to="/join" className="btn btn-primary nav-cta" style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem' }}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '2px solid rgba(255, 255, 255, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span style={{ width: '36px', height: '36px', padding: '2px', background: '#ffffff', borderRadius: '8px', border: '1.5px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/stem-club-logo.png" alt="STEM Club Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#ffffff', fontSize: '1.1rem' }}>STEM CLUB</span>
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
