import { Link } from 'react-router-dom';
import { Atom, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo" style={{ marginBottom: '0.75rem' }} aria-label="STEM Club Home">
              <span className="nav-logo-icon" style={{ width: '44px', height: '44px', background: '#ffffff', borderRadius: '50%', border: '2px solid #000000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '2px' }}>
                <img src="/assets/stem-club-logo.png" alt="STEM Club Logo" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
              </span>
              <span>STEM CLUB</span>
            </Link>
            <p>
              An innovation organization at Greets Public School exploring science, technology, engineering and mathematics through hands-on projects, experimentation and collaboration. Membership is selective and based on faculty teacher nomination.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={15} color="#ffffff" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Ashoka Road, Kaloor, Kochi - 682 017, Kerala, India</span>
              </span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/projects">Projects</Link>
            <Link to="/activities">Activities</Link>
            <Link to="/stem-lab">STEM Lab</Link>
            <Link to="/events">Events</Link>
          </div>

          <div className="footer-col">
            <h4>Organization</h4>
            <Link to="/achievements">Milestones</Link>
            <Link to="/about">About Us</Link>
            <Link to="/join">Selection Process</Link>
          </div>

          <div className="footer-col">
            <h4>Contact School</h4>
            <a
              href="tel:04844440000"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.9)' }}
              aria-label="Call school reception at 0484-4440000"
            >
              <Phone size={13} color="#ffffff" /> 0484-4440000
            </a>
            <a
              href="tel:+919995883000"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.9)' }}
              aria-label="Call school mobile at +91-9995883000"
            >
              <Phone size={13} color="#ffffff" /> +91-9995883000
            </a>
            <a
              href="mailto:office@gps.ac.in"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.9)' }}
              aria-label="Email school office at office@gps.ac.in"
            >
              <Mail size={13} color="#ffffff" /> office@gps.ac.in
            </a>
            <a
              href="mailto:greetsschool@gmail.com"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.9)' }}
              aria-label="Email school administration at greetsschool@gmail.com"
            >
              <Mail size={13} color="#ffffff" /> greetsschool@gmail.com
            </a>
            <a
              href="https://gps.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '0.5rem', color: '#ffffff', fontWeight: 600 }}
            >
              Official School Portal <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Greets Public School STEM Club. Affiliated to CBSE.</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Imagine. Build. Innovate.
          </p>
        </div>
      </div>
    </footer>
  );
}
