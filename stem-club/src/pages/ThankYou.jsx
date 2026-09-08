import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home, Cpu, Mail, Phone } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useScrollReveal';

export default function ThankYou() {
  useDocumentTitle('Application Received', 'Your STEM Club application has been successfully submitted to the faculty review team.');

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', paddingBottom: '6rem', minHeight: '100dvh' }}>
      <div className="container" style={{ maxWidth: '750px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: '#ffffff',
          border: '2px solid #000000',
          color: '#000000',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
        }}>
          <CheckCircle2 size={36} strokeWidth={2.5} />
        </div>

        <span className="section-label" style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)' }}>Submission Verified</span>
        <h1 className="section-title" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', marginBottom: '1rem', color: '#ffffff' }}>
          Application Received
        </h1>
        <p className="section-subtitle" style={{ margin: '0 auto 2.5rem', maxWidth: '580px', color: 'rgba(255, 255, 255, 0.95)' }}>
          Thank you for applying to the Greets Public School STEM Club. Your submission has been securely logged for review by our faculty mentors and student leads.
        </p>

        {/* What Happens Next Card */}
        <div className="card" style={{
          padding: '2rem',
          textAlign: 'left',
          marginBottom: '2.5rem',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#000000',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Cpu size={20} color="#000000" /> Next Steps
          </h3>

          <ol style={{
            paddingLeft: '1.25rem',
            color: '#334155',
            fontSize: '0.9375rem',
            lineHeight: 1.8,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <li>
              <strong style={{ color: '#000000' }}>Application Review:</strong> Faculty coordinators and lab mentors review your interests and skill levels.
            </li>
            <li>
              <strong style={{ color: '#000000' }}>Orientation Invitation:</strong> You will receive details regarding the upcoming lab orientation and project team formation session.
            </li>
            <li>
              <strong style={{ color: '#000000' }}>Direct Verification:</strong> You may also reach the club advisor in person at the school STEM Lab during activity periods.
            </li>
          </ol>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Return to Home
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            Explore Projects <ArrowRight size={16} />
          </Link>
          <Link to="/stem-lab" className="btn btn-secondary">
            View STEM Lab Equipment
          </Link>
        </div>

        {/* Direct Contact Links */}
        <div style={{
          marginTop: '3.5rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          fontSize: '0.875rem',
          color: '#ffffff'
        }}>
          <a
            href="tel:04844440000"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}
          >
            <Phone size={16} color="#ffffff" /> 0484-4440000
          </a>
          <a
            href="mailto:office@gps.ac.in"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}
          >
            <Mail size={16} color="#ffffff" /> office@gps.ac.in
          </a>
        </div>
      </div>
    </div>
  );
}
