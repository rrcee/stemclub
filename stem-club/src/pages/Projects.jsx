import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, getProjectCategories } from '../data/projects';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import ProjectVisual from '../components/ProjectVisual';
import { Filter, ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  useDocumentTitle('Projects', 'Explore student-engineered hardware and software projects at Greets Public School STEM Club.');
  
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...getProjectCategories()];
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Stagger reveal on mount or filter change
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.project-card-wrapper');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { y: 35, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out'
      }
    );
  }, [activeCategory]);

  return (
    <div ref={containerRef} style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '100dvh', backgroundColor: '#2596be' }}>
      <header className="page-header" style={{ textAlign: 'center', padding: '3rem 1rem 4rem' }}>
        <div className="container">
          <span className="section-label" style={{ color: '#ffffff' }}>Innovation Portfolio</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#ffffff', marginBottom: '1rem' }}>
            Featured Projects
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto', color: '#ffffff' }}>
            Working systems and prototypes designed, programmed, and built by STEM Club students at Greets Public School.
          </p>
        </div>
      </header>

      <section className="section container" style={{ padding: '0 1.5rem 5rem' }}>
        {/* Category Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.75rem', color: '#ffffff', fontSize: '0.875rem' }}>
            <Filter size={16} color="#ffffff" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>Filter:</span>
          </div>
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="btn"
                style={{
                  background: isActive ? '#000000' : '#ffffff',
                  color: isActive ? '#ffffff' : '#000000',
                  border: '2px solid #000000',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '999px',
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  fontWeight: '700',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.1)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="mobile-carousel"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))', gap: '2rem' }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card-wrapper gsap-card card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#ffffff',
                borderRadius: '24px',
                border: '2px solid #000000',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'relative' }}>
                <ProjectVisual
                  projectId={project.id}
                  title={project.title}
                  category={project.category}
                  color="#2596be"
                  style={{ borderRadius: '22px 22px 0 0', borderBottom: '2px solid #000000' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <span className="tag" style={{ background: '#000000', color: '#ffffff', border: '1px solid #000000', borderRadius: '999px' }}>
                    {project.category}
                  </span>
                  <span className="tag" style={{ background: '#2596be', color: '#ffffff', border: '1px solid #2596be', borderRadius: '999px' }}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '1.75rem', color: '#000000' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  color: '#000000',
                  marginBottom: '0.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800
                }}>
                  {project.title}
                </h3>
                <p style={{
                  color: '#334155',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  marginBottom: '1.25rem',
                  flexGrow: 1
                }}>
                  {project.summary || project.description}
                </p>

                {/* Tech chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.5rem' }}>
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '999px',
                      background: '#f1f5f9',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${project.id}`}
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.85rem 1.25rem',
                    textDecoration: 'none',
                    fontSize: '0.8125rem',
                    borderRadius: '999px'
                  }}
                >
                  View Full Project <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="empty-state" style={{ padding: '4rem 2rem' }}>
            <h3 style={{ color: '#ffffff' }}>No projects found</h3>
            <p style={{ color: '#ffffff' }}>There are currently no projects listed under the selected category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
