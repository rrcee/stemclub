import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, ChevronRight, Cpu, Lightbulb, Wrench,
  Target, Zap, BarChart3, Image, ArrowRight, CheckCircle2
} from 'lucide-react';
import { getProjectById, projects } from '../data/projects';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import ProjectVisual from '../components/ProjectVisual';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);

  useDocumentTitle(project ? project.title : 'Project Details', project ? project.summary : 'STEM Club project specification');

  if (!project) {
    return (
      <div className="container section" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', textAlign: 'center', backgroundColor: '#2596be', minHeight: '100dvh' }}>
        <h1 className="section-title" style={{ color: '#ffffff' }}>Project Not Found</h1>
        <p className="section-subtitle" style={{ margin: '0 auto 2rem', color: '#ffffff' }}>
          The project you are looking for does not exist or has been relocated.
        </p>
        <Link to="/projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '100dvh', backgroundColor: '#2596be' }}>
      {/* Header Banner */}
      <header className="page-header" style={{ padding: '2rem 0 3.5rem' }}>
        <div className="container">
          <button
            onClick={() => navigate('/projects')}
            className="btn btn-primary"
            style={{ marginBottom: '1.5rem', padding: '0.4rem 1rem', fontSize: '0.8125rem' }}
          >
            <ArrowLeft size={16} /> All Projects
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="tag" style={{ background: '#000000', color: '#ffffff', border: '1px solid #ffffff' }}>
              {project.category}
            </span>
            <span className="tag" style={{ background: '#ffffff', color: '#000000', border: '1px solid #ffffff' }}>
              {project.status}
            </span>
          </div>

          <h1 className="section-title" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', color: '#ffffff', marginBottom: '0.75rem' }}>
            {project.title}
          </h1>
          <p className="section-subtitle" style={{ color: '#ffffff', fontSize: '1.125rem' }}>{project.summary}</p>
        </div>
      </header>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        {/* Project Graphic */}
        <ProjectVisual
          projectId={project.id}
          title={project.title}
          category={project.category}
          color="#2596be"
          isHero={true}
          style={{ marginBottom: '3.5rem', border: '2px solid #000000' }}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem'
        }}>
          {/* Overview */}
          <DetailSection icon={Lightbulb} title="Overview">
            <p style={{ color: '#1e293b', lineHeight: 1.8, fontSize: '1rem' }}>
              {project.description}
            </p>
          </DetailSection>

          {/* Problem */}
          <DetailSection icon={Target} title="The Problem">
            <p style={{ color: '#1e293b', lineHeight: 1.8, fontSize: '1rem' }}>
              {project.problem}
            </p>
          </DetailSection>

          {/* Solution */}
          <DetailSection icon={Zap} title="Our Solution">
            <p style={{ color: '#1e293b', lineHeight: 1.8, fontSize: '1rem' }}>
              {project.solution}
            </p>
          </DetailSection>

          {/* Technologies */}
          <DetailSection icon={Cpu} title="Technologies Used">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {project.technologies.map((tech) => (
                <span key={tech} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 600,
                  padding: '0.4rem 0.875rem', borderRadius: '6px',
                  background: '#000000', color: '#ffffff'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </DetailSection>

          {/* How It Works */}
          <DetailSection icon={Wrench} title="How It Works">
            <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {project.howItWorks.map((step, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  padding: '1rem', background: '#f8fafc',
                  borderRadius: '8px', border: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.8125rem',
                    fontWeight: 700, color: '#ffffff',
                    minWidth: '32px', height: '32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#000000', borderRadius: '6px',
                    flexShrink: 0
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ color: '#1e293b', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </DetailSection>

          {/* Results */}
          <DetailSection icon={BarChart3} title="Key Results">
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {project.results.map((result, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={18} style={{ color: '#000000', flexShrink: 0, marginTop: '3px' }} />
                  <p style={{ color: '#1e293b', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    {result}
                  </p>
                </li>
              ))}
            </ul>
          </DetailSection>

          {/* Development & Testing Documentation */}
          <DetailSection icon={Image} title="Development and Testing Stages">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: '1.25rem'
            }}>
              <div style={{ background: '#f8fafc', border: '2px solid #000000', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '150px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                  <svg viewBox="0 0 200 120" width="100%" height="100%">
                    <rect x="10" y="10" width="180" height="100" rx="4" fill="#000000" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="20" y1="30" x2="80" y2="30" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="80" cy="30" r="4" fill="#ffffff" />
                    <line x1="80" y1="30" x2="120" y2="60" stroke="#2596be" strokeWidth="2" />
                    <rect x="120" y="45" width="50" height="30" rx="3" fill="#2596be" stroke="#ffffff" strokeWidth="1" />
                    <text x="145" y="63" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">MCU</text>
                    <text x="20" y="100" fill="#ffffff" fontSize="8" fontFamily="monospace">STAGE 1: BREADBOARD SCHEMATIC</text>
                  </svg>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span className="tag" style={{ background: '#000000', color: '#ffffff' }}>STAGE 01</span>
                  <h4 style={{ fontSize: '1rem', color: '#000000', marginTop: '0.5rem', marginBottom: '0.25rem' }}>Breadboard Prototyping</h4>
                  <p style={{ fontSize: '0.8125rem', color: '#334155', margin: 0 }}>Initial circuit wiring, sensor calibration and pin assignment validation.</p>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '2px solid #000000', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '150px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                  <svg viewBox="0 0 200 120" width="100%" height="100%">
                    <rect x="10" y="10" width="180" height="100" rx="4" fill="#000000" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M 20 60 L 50 60 L 55 30 L 65 90 L 75 60 L 110 60 L 115 25 L 125 95 L 135 60 L 180 60" fill="none" stroke="#2596be" strokeWidth="2" />
                    <text x="20" y="100" fill="#ffffff" fontSize="8" fontFamily="monospace">STAGE 2: LOGIC & OSCILLOSCOPE</text>
                  </svg>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span className="tag" style={{ background: '#000000', color: '#ffffff' }}>STAGE 02</span>
                  <h4 style={{ fontSize: '1rem', color: '#000000', marginTop: '0.5rem', marginBottom: '0.25rem' }}>Signal and Bench Testing</h4>
                  <p style={{ fontSize: '0.8125rem', color: '#334155', margin: 0 }}>Oscilloscope frequency analysis and ADC stability validation under load.</p>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '2px solid #000000', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '150px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                  <svg viewBox="0 0 200 120" width="100%" height="100%">
                    <rect x="10" y="10" width="180" height="100" rx="4" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
                    <rect x="40" y="30" width="120" height="60" rx="6" fill="#2596be" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="65" cy="60" r="12" fill="#000000" stroke="#ffffff" strokeWidth="1" />
                    <line x1="95" y1="50" x2="140" y2="50" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                    <line x1="95" y1="65" x2="125" y2="65" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                    <text x="20" y="105" fill="#ffffff" fontSize="8" fontFamily="monospace">STAGE 3: OPERATIONAL BUILD</text>
                  </svg>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <span className="tag" style={{ background: '#000000', color: '#ffffff' }}>STAGE 03</span>
                  <h4 style={{ fontSize: '1rem', color: '#000000', marginTop: '0.5rem', marginBottom: '0.25rem' }}>Enclosure and Assembly</h4>
                  <p style={{ fontSize: '0.8125rem', color: '#334155', margin: 0 }}>Hardware enclosure assembly and operational environment stress-testing.</p>
                </div>
              </div>
            </div>
          </DetailSection>

          {/* Future Improvements */}
          <DetailSection icon={ArrowRight} title="Future Improvements">
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {project.futureImprovements.map((item, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                  padding: '0.875rem 1rem', background: '#f8fafc',
                  borderRadius: '8px', borderLeft: '4px solid #000000'
                }}>
                  <p style={{ color: '#1e293b', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </DetailSection>
        </div>

        {/* Project Navigation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginTop: '5rem',
          paddingTop: '3rem',
          borderTop: '2px solid rgba(255, 255, 255, 0.3)'
        }}>
          <Link to={`/projects/${prevProject.id}`} className="card" style={{
            textDecoration: 'none', display: 'block', background: '#ffffff', border: '2px solid #000000', padding: '1.25rem'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 700 }}>
              Previous Project
            </span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', color: '#000000', marginTop: '0.25rem' }}>
              {prevProject.title}
            </h4>
          </Link>

          <Link to={`/projects/${nextProject.id}`} className="card" style={{
            textDecoration: 'none', display: 'block', textAlign: 'right', background: '#ffffff', border: '2px solid #000000', padding: '1.25rem'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontWeight: 700 }}>
              Next Project
            </span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', color: '#000000', marginTop: '0.25rem' }}>
              {nextProject.title}
            </h4>
          </Link>
        </div>
      </div>
    </article>
  );
}

function DetailSection({ icon: Icon, title, children }) {
  return (
    <section className="card" style={{ background: '#ffffff', border: '2px solid #000000', borderRadius: '12px', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#000000', color: '#ffffff'
        }}>
          <Icon size={18} strokeWidth={2} />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.25rem',
          fontWeight: 800, color: '#000000', margin: 0
        }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
