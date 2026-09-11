import { Link } from 'react-router-dom';

export default function Magazine() {
  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#ffffff' }}>
          School Magazine
        </h1>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            Click the button below to view the latest school magazine
          </p>
          
          <Link to="/magazine-download"
            style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#000000',
              padding: '1rem 2rem',
              borderRadius: '999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              border: '2px solid #000000',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onClick={(e) => {
              e.preventDefault();
              window.open('/assets/school-magazine.pdf', '_blank');
            }}
          >
            View Magazine PDF
          </Link>
        </div>
        
        <p style={{ marginTop: '2rem', marginBottom: '0', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8125rem' }}>
          Published by Greets Public School · CBSE Affiliated
        </p>
        
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
          <p style={{ margin: '0', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>
            If the PDF does not open, please ensure you have a PDF viewer installed.
            The magazine contains student articles, project highlights, and club updates.
            <br/>
            To add your own magazine PDF, place the file at:
            <br/>
            <code>public/assets/school-magazine.pdf</code>
          </p>
        </div>
      </div>
    </div>
  );
}