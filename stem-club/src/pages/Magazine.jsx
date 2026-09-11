import { useState } from 'react';
import { useDocumentTitle } from '../hooks/useScrollReveal';

const PDF_SRC = '/assets/school-magazine.pdf';
// File on disk is "upscaled-video (1).mp4" — URL-encoded for safe serving.
const VIDEO_SRC = '/assets/upscaled-video%20(1).mp4';

export default function Magazine() {
  useDocumentTitle('Magazine — GPS STEM Club');
  const [activeView, setActiveView] = useState('pdf');

  const tabStyle = (active) => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '999px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8125rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    border: '2px solid #000000',
    background: active ? '#ffffff' : 'transparent',
    color: active ? '#000000' : '#ffffff',
    transition: 'all 0.2s ease',
  });

  return (
    <div className="container" style={{ padding: '2rem 1rem 3rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#ffffff' }}>
          School Magazine
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          Choose how you want to explore — read the PDF or watch the video, right here on this page.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <button
            type="button"
            style={tabStyle(activeView === 'pdf')}
            onClick={() => setActiveView('pdf')}
            aria-pressed={activeView === 'pdf'}
          >
            Read PDF
          </button>
          <button
            type="button"
            style={tabStyle(activeView === 'video')}
            onClick={() => setActiveView('video')}
            aria-pressed={activeView === 'video'}
          >
            Watch Video
          </button>
        </div>

        {activeView === 'pdf' ? (
          <div>
            <iframe
              src={PDF_SRC}
              title="School Magazine PDF"
              style={{
                width: '100%',
                height: 'min(75vh, 800px)',
                minHeight: '480px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                background: '#ffffff',
              }}
            />
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              <a href={PDF_SRC} target="_blank" rel="noreferrer" style={{ color: '#fff', fontSize: '0.875rem' }}>
                Open in new tab
              </a>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>·</span>
              <a href={PDF_SRC} download style={{ color: '#fff', fontSize: '0.875rem' }}>
                Download PDF
              </a>
            </div>
          </div>
        ) : (
          <div>
            <video
              controls
              playsInline
              preload="metadata"
              src={VIDEO_SRC}
              style={{
                width: '100%',
                maxHeight: 'min(75vh, 720px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: '#000000',
              }}
            >
              Your browser does not support the video tag.
            </video>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              <a href={VIDEO_SRC} target="_blank" rel="noreferrer" style={{ color: '#fff', fontSize: '0.875rem' }}>
                Open video in new tab
              </a>
            </div>
          </div>
        )}

        <p style={{ marginTop: '2rem', marginBottom: '0', textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.8125rem' }}>
          Published by Greets Public School · CBSE Affiliated
        </p>
      </div>
    </div>
  );
}
