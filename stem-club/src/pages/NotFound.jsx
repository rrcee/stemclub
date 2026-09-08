import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Atom } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useScrollReveal';

export default function NotFound() {
  useDocumentTitle('Page Not Found');

  return (
    <div className="not-found" style={{ position: 'relative' }}>
      <div className="grid-pattern" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex', justifyContent: 'center', marginBottom: '2rem'
        }}>
          <Atom size={48} strokeWidth={1} style={{ color: 'var(--accent-cyan)', opacity: 0.4 }} />
        </div>
        <h1>404</h1>
        <h2>Signal Lost</h2>
        <p style={{ margin: '0 auto 2rem' }}>
          The page you are looking for does not exist or has been moved to a new location.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Go Home
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            <ArrowLeft size={16} /> View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
