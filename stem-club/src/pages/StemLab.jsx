import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import { labEquipment, labTechnologies } from '../data/stemData';
import { 
  Wrench, Cpu, Code, Beaker, 
  ChevronDown, ChevronUp, Monitor
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const StemLab = () => {
  useDocumentTitle('STEM Lab', 'Inspect the Greets Public School STEM Lab hardware workstations, microcontrollers, and equipment inventory.');
  
  const [expandedCategory, setExpandedCategory] = useState(labEquipment?.[0]?.category || null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const workspacesGridRef = useRef(null);
  const toolsRef = useRef(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const workspaces = [
    { id: 1, title: 'Electronics', icon: <Cpu size={28} strokeWidth={2} color="#ffffff" />, desc: 'Circuit design, soldering stations, multimeters, and embedded sensor systems.' },
    { id: 2, title: 'Robotics', icon: <Wrench size={28} strokeWidth={2} color="#ffffff" />, desc: 'Autonomous chassis, motor drivers, servo steering, and navigation test tracks.' },
    { id: 3, title: 'Programming', icon: <Code size={28} strokeWidth={2} color="#ffffff" />, desc: 'Python, C++ firmware for Arduino/ESP32, AI models, and data telemetry.' },
    { id: 4, title: 'Prototyping', icon: <Monitor size={28} strokeWidth={2} color="#ffffff" />, desc: 'Computer aided design, 3D printing, laser cut chassis, and rapid casing.' },
    { id: 5, title: 'Experimentation', icon: <Beaker size={28} strokeWidth={2} color="#ffffff" />, desc: 'Sensor physics, renewable energy test rigs, and environmental measurement.' }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(headerRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Workspaces cards stagger with slight parallax scroll
      const wsCards = workspacesGridRef.current.querySelectorAll('.workspace-card');
      gsap.from(wsCards, {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: workspacesGridRef.current,
          start: 'top 80%'
        }
      });

      // Alternating parallax
      wsCards.forEach((card, idx) => {
        const offset = idx % 2 === 0 ? -15 : 15;
        gsap.to(card, {
          y: offset,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      });

      // Tool badges stagger
      const badges = toolsRef.current.querySelectorAll('.tool-badge');
      gsap.from(badges, {
        scale: 0.85,
        opacity: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: toolsRef.current,
          start: 'top 85%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} style={{ minHeight: '100dvh', backgroundColor: '#2596be', paddingBottom: '5rem' }}>
      <header ref={headerRef} className="page-header" style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', paddingBottom: '3.5rem', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label" style={{ color: '#ffffff' }}>Laboratory Facilities</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#ffffff', marginBottom: '1rem' }}>
            The STEM Lab
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto', color: '#ffffff' }}>
            Where Ideas Become Real: dedicated hardware bays, testing instruments, and prototyping workstations at Greets Public School.
          </p>
        </div>
      </header>

      {/* Workspaces */}
      <section className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center', color: '#ffffff' }}>
            Workstation Bays
          </h2>
          <div
            ref={workspacesGridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {workspaces.map((ws) => (
              <div
                key={ws.id}
                className="workspace-card gsap-card card"
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  border: '2px solid #000000',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '2rem'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {ws.icon}
                </div>
                <h3 style={{ color: '#000000', fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>{ws.title}</h3>
                <p style={{ color: '#334155', margin: 0, lineHeight: 1.6, fontSize: '0.9375rem' }}>{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#ffffff' }}>
            Tools and Platforms
          </h2>
          <div
            ref={toolsRef}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}
          >
            {labTechnologies.map((tech, idx) => (
              <span
                key={idx}
                className="tool-badge"
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  borderRadius: '999px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  border: '2px solid #000000',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Inventory */}
      <section className="section" style={{ padding: '2rem 0 4rem' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center', color: '#ffffff' }}>
            Hardware and Equipment Inventory
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {labEquipment.map((categoryGroup, index) => {
              const isExpanded = expandedCategory === categoryGroup.category;
              
              return (
                <div key={index} className="gsap-card card" style={{ background: '#ffffff', border: '2px solid #000000', borderRadius: '20px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => toggleCategory(categoryGroup.category)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.5rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <h3 style={{ color: '#000000', fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>
                      {categoryGroup.category}
                    </h3>
                    {isExpanded ? (
                      <ChevronUp size={22} color="#000000" />
                    ) : (
                      <ChevronDown size={22} color="#000000" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div style={{ 
                      padding: '0 1.5rem 1.5rem', 
                      borderTop: '2px solid #f1f5f9',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '0.75rem',
                      paddingTop: '1.25rem'
                    }}>
                      {categoryGroup.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#000000' }} />
                          <span style={{ color: '#1e293b', fontSize: '0.9375rem', fontWeight: 500 }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default StemLab;
