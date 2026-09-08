import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import { Target, Lightbulb, Users, FlaskConical, Binary, Wrench, Sigma, Handshake, Brain, Heart, Medal, ArrowRight, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  useDocumentTitle('About Us', 'Learn about the student-driven STEM Club at Greets Public School, Kochi, our mission, vision, and core laboratory disciplines.');
  const containerRef = useRef(null);
  const headerRef = useRef(null);

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

      // Grid cards stagger reveal
      const sections = containerRef.current.querySelectorAll('.about-stagger-card');
      gsap.from(sections, {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current.querySelector('.about-cards-grid'),
          start: 'top 80%'
        }
      });

      // Disciplines stagger
      const disciplines = containerRef.current.querySelectorAll('.discipline-card');
      gsap.from(disciplines, {
        scale: 0.94,
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: containerRef.current.querySelector('.disciplines-grid'),
          start: 'top 85%'
        }
      });

      // Values stagger
      const values = containerRef.current.querySelectorAll('.value-card');
      gsap.from(values, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current.querySelector('.values-grid'),
          start: 'top 85%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        padding: 'calc(var(--nav-height) + 2rem) 20px 80px',
        color: '#ffffff',
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: '#2596be',
        minHeight: '100dvh'
      }}
    >
      <header ref={headerRef} className="page-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '96px',
          height: '96px',
          borderRadius: '20px',
          background: '#ffffff',
          padding: '8px',
          border: '2px solid #000000',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          <img
            src="/assets/stem-club-logo.png"
            alt="Official STEM Club Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <br />
        <span className="section-label" style={{ color: '#ffffff' }}>Club Identity</span>
        <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#ffffff', marginBottom: '16px' }}>
          About Our Club
        </h1>
        <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto', color: '#ffffff' }}>
          Discover the mission, laboratory workspace, and student community driving science and technology at Greets Public School.
        </p>
      </header>

      <div
        className="about-cards-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '60px' }}
      >
        <section className="about-stagger-card gsap-card card" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '30px', borderRadius: '12px', border: '2px solid #000000' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#000000', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '1.5rem' }}>
            <Users size={24} strokeWidth={2} color="#000000" /> Who We Are
          </h2>
          <p style={{ color: '#1e293b', lineHeight: '1.7', fontSize: '0.9375rem' }}>
            The STEM Club at Greets Public School (GPS), Kochi is an active, student-driven innovation community. We provide a collaborative lab environment for curious minds to explore the frontiers of Science, Technology, Engineering, and Mathematics through hardware assembly, software development, and real-world experiments.
          </p>
        </section>

        <section className="about-stagger-card gsap-card card" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '30px', borderRadius: '12px', border: '2px solid #000000' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#000000', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '1.5rem' }}>
            <Target size={24} strokeWidth={2} color="#000000" /> Our Mission
          </h2>
          <ul style={{ color: '#1e293b', lineHeight: '1.7', listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9375rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: '#000000', borderRadius: '50%' }}></div>Explore cutting-edge concepts</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: '#000000', borderRadius: '50%' }}></div>Experiment with hands-on hardware</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: '#000000', borderRadius: '50%' }}></div>Build innovative prototypes</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: '#000000', borderRadius: '50%' }}></div>Collaborate across grade levels</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '6px', height: '6px', backgroundColor: '#000000', borderRadius: '50%' }}></div>Solve real community challenges</li>
          </ul>
        </section>

        {/* Teacher Selection Card */}
        <section className="about-stagger-card gsap-card card" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '30px', borderRadius: '12px', border: '2px solid #000000', gridColumn: '1 / -1' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#000000', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontSize: '1.5rem' }}>
            <Medal size={24} strokeWidth={2} color="#000000" /> Teacher-Nominated Cohorts
          </h2>
          <p style={{ color: '#1e293b', lineHeight: '1.7', fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
            To maintain high standards of lab safety, focused mentorship, and quality engineering, membership in the STEM Club is not open to random sign-ups. Candidates are handpicked and recommended by Greets Public School science and computing faculty, specifically selecting students who exhibit genuine curiosity, consistent initiative, and an eagerness to build.
          </p>
          <Link to="/join" className="btn btn-dark" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
            View Selection Criteria <ArrowRight size={16} />
          </Link>
        </section>

        <section className="about-stagger-card gsap-card card" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '30px', borderRadius: '12px', border: '2px solid #000000', gridColumn: '1 / -1' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#000000', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '1.5rem' }}>
            <Lightbulb size={24} strokeWidth={2} color="#000000" /> Our Vision
          </h2>
          <p style={{ color: '#1e293b', lineHeight: '1.7', fontSize: '1rem' }}>
            To create an empowering environment for transforming ideas into real-world solutions, nurturing the next generation of inventors, researchers, and tech leaders at Greets Public School.
          </p>
        </section>
      </div>

      {/* STEM Core Disciplines */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', textAlign: 'center', marginBottom: '30px', color: '#ffffff' }}>Core Disciplines</h2>
        <div className="disciplines-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div className="discipline-card gsap-card card" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '24px', borderRadius: '12px', border: '2px solid #000000', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
            <FlaskConical size={32} strokeWidth={2} color="#000000" />
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#000000' }}>Science</h3>
            <p style={{ color: '#334155', fontSize: '0.875rem' }}>Empirical experimentation, physics modeling, chemistry setups.</p>
          </div>
          <div className="discipline-card gsap-card card" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '24px', borderRadius: '12px', border: '2px solid #000000', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
            <Binary size={32} strokeWidth={2} color="#000000" />
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#000000' }}>Technology</h3>
            <p style={{ color: '#334155', fontSize: '0.875rem' }}>Software programming, cloud databases, web interfaces.</p>
          </div>
          <div className="discipline-card gsap-card card" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '24px', borderRadius: '12px', border: '2px solid #000000', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
            <Wrench size={32} strokeWidth={2} color="#000000" />
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#000000' }}>Engineering</h3>
            <p style={{ color: '#334155', fontSize: '0.875rem' }}>Robotics chassis, mechanical gears, sensor circuitry.</p>
          </div>
          <div className="discipline-card gsap-card card" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '24px', borderRadius: '12px', border: '2px solid #000000', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
            <Sigma size={32} strokeWidth={2} color="#000000" />
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#000000' }}>Mathematics</h3>
            <p style={{ color: '#334155', fontSize: '0.875rem' }}>Algorithm design, sensor calibration curves, PID loop logic.</p>
          </div>
        </div>
      </section>

      {/* Club Values */}
      <section>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', textAlign: 'center', marginBottom: '30px', color: '#ffffff' }}>Club Values</h2>
        <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Curiosity', icon: Brain },
            { label: 'Collaboration', icon: Handshake },
            { label: 'Innovation', icon: Lightbulb },
            { label: 'Persistence', icon: Medal },
            { label: 'Integrity', icon: Heart }
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="value-card gsap-card card" style={{ backgroundColor: '#ffffff', color: '#000000', padding: '24px', borderRadius: '12px', border: '2px solid #000000', textAlign: 'center' }}>
                <Icon size={26} strokeWidth={2} color="#000000" style={{ marginBottom: '12px', display: 'inline-block' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: '#000000' }}>{val.label}</h4>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default About;
