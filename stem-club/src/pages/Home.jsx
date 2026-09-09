import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot, Brain, Code2, Wifi, Cpu, Zap, ArrowRight,
  ChevronRight, Atom, CheckCircle, Sparkles, UserCheck, Shield, Award
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stemAreas } from '../data/stemData';
import { projects } from '../data/projects';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import ProjectVisual from '../components/ProjectVisual';
import FAQSection from '../components/FAQSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap = { Bot, Brain, Code2, Wifi, Cpu, Zap };

function HeroCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width, height;
    const particles = [];
    const particleCount = prefersReduced ? 0 : 45;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.35 + 0.1,
        });
      }
    }

    function drawGrid() {
      const spacing = 80;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < width; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.8})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 130) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    const handleResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}

function HeroSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  // Parallax floating background elements
  const floatLayer1Ref = useRef(null);
  const floatLayer2Ref = useRef(null);
  const floatLayer3Ref = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline with kinetic typography reveals
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      
      tl.fromTo(
        [word1Ref.current, word2Ref.current, word3Ref.current],
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out', clearProps: 'all' },
        0.1
      )
        .fromTo(
          descRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, clearProps: 'all' },
          '-=0.3'
        )
        .fromTo(
          buttonsRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, clearProps: 'all' },
          '-=0.2'
        )
        .fromTo(
          [floatLayer1Ref.current, floatLayer2Ref.current, floatLayer3Ref.current],
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'back.out(1.4)' },
          '-=0.4'
        );

      // 2. Parallax ScrollTrigger for foreground content (pure motion, no fading)
      gsap.to(contentRef.current, {
        y: -70,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });

      // 3. Parallax ScrollTrigger for floating background layers
      gsap.to(floatLayer1Ref.current, {
        y: -160,
        rotate: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      });

      gsap.to(floatLayer2Ref.current, {
        y: 110,
        rotate: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(floatLayer3Ref.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero relative min-h-[100dvh] flex items-center overflow-hidden bg-[#2596be]"
      aria-label="STEM Club Hero"
      style={{ position: 'relative' }}
    >
      <div className="hero-bg">
        <HeroCanvas />
      </div>

      {/* Floating Parallax STEM Elements in Background */}
      <div
        ref={floatLayer1Ref}
        className="gsap-parallax-layer"
        style={{
          position: 'absolute',
          top: '18%',
          right: '8%',
          display: 'none',
          mdDisplay: 'block'
        }}
      >
        <div className="floating-stem-badge" style={{ animation: 'floatStem 4s ease-in-out infinite' }}>
          <Atom size={16} strokeWidth={2.5} /> Robotics & Autonomous Lab
        </div>
      </div>

      <div
        ref={floatLayer2Ref}
        className="gsap-parallax-layer"
        style={{
          position: 'absolute',
          bottom: '22%',
          right: '12%',
          display: 'none',
          mdDisplay: 'block'
        }}
      >
        <div className="floating-stem-badge" style={{ animation: 'floatStem 5s ease-in-out infinite 0.5s' }}>
          <Zap size={16} strokeWidth={2.5} /> Embedded Systems & IoT
        </div>
      </div>

      <div
        ref={floatLayer3Ref}
        className="gsap-parallax-layer"
        style={{
          position: 'absolute',
          top: '35%',
          right: '25%',
          display: 'none',
          mdDisplay: 'block'
        }}
      >
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '2px dashed rgba(255, 255, 255, 0.35)',
            pointerEvents: 'none'
          }}
        />
      </div>

      <div className="container hero-content" style={{ position: 'relative', zIndex: 10 }}>
        <div ref={contentRef} style={{ maxWidth: '750px' }}>
          {/* Kinetic Animated Headline */}
          <h1
            style={{
              color: '#ffffff',
              marginBottom: '0',
              lineHeight: 1.08,
              fontSize: 'clamp(2.75rem, 8vw, 4.75rem)',
              fontWeight: 900
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div ref={word1Ref}>IMAGINE.</div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div ref={word2Ref}>BUILD.</div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div ref={word3Ref}>
                <span style={{ color: '#000000', background: '#ffffff', padding: '0.1rem 0.65rem', display: 'inline-block', borderRadius: '8px', marginTop: '0.25rem' }}>
                  INNOVATE.
                </span>
              </div>
            </div>
          </h1>

          <p
            ref={descRef}
            className="hero-description"
            style={{ color: '#ffffff', fontSize: '1.1875rem', lineHeight: 1.7, marginTop: '1.75rem', maxWidth: '640px' }}
          >
            
          </p>
            An innovation organization at Greets Public School exploring science, technology, engineering and mathematics through hands-on projects, experimentation and collaboration. Membership is selective and based on faculty teacher nomination.
          <div ref={buttonsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
            <Link to="/projects" className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
              Explore Projects <ArrowRight size={16} />
            </Link>
            <Link to="/join" className="btn btn-secondary" style={{ padding: '0.9rem 2rem' }}>
              Selection Process
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

{/* Kinetic Marquee Ticker */}
function MarqueeTicker() {
  return (
    <div
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        borderTop: '2px solid #ffffff',
        borderBottom: '2px solid #ffffff',
        padding: '0.85rem 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        userSelect: 'none'
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: 'inline-flex',
          animation: 'marqueeScroll 24s linear infinite',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
      >
        <span style={{ paddingRight: '2rem' }}>⚡ EMBEDDED CIRCUITS • 🤖 ROBOTICS & AUTOMATION • 🧠 MACHINE LEARNING • 🔬 SENSOR PHYSICS • 🛠️ RAPID PROTOTYPING • 🚀 TEACHER-SELECTED COHORTS • </span>
        <span style={{ paddingRight: '2rem' }}>⚡ EMBEDDED CIRCUITS • 🤖 ROBOTICS & AUTOMATION • 🧠 MACHINE LEARNING • 🔬 SENSOR PHYSICS • 🛠️ RAPID PROTOTYPING • 🚀 TEACHER-SELECTED COHORTS • </span>
      </div>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}


function WhatWeDoSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%'
        }
      });

      const cards = gridRef.current.querySelectorAll('.area-card-item');
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%'
        }
      });

      cards.forEach((card, i) => {
        const yOffset = i % 2 === 0 ? -20 : 20;
        gsap.to(card, {
          y: yOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ position: 'relative' }}>
      <div className="grid-pattern" />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div ref={titleRef} style={{ marginBottom: '3.5rem' }}>
          <span className="section-label" style={{ color: '#ffffff' }}>What We Do</span>
          <h2 className="section-title">Explore. Build. Solve.</h2>
          <p className="section-subtitle">
            Our club spans six core areas of STEM, giving students the tools, knowledge and workspace to turn ideas into working technology.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mobile-carousel"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.5rem'
          }}
        >
          {stemAreas.map((area) => {
            const Icon = iconMap[area.icon] || Cpu;
            return (
              <div
                key={area.id}
                className="area-card-item gsap-card card"
                style={{ background: '#ffffff', color: '#000000', borderRadius: '22px', border: '2px solid #000000' }}
              >
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.75rem' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#000000', color: '#ffffff'
                  }}>
                    <Icon size={24} strokeWidth={2} />
                  </div>

                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800,
                      marginBottom: '0.5rem', color: '#000000'
                    }}>
                      {area.title}
                    </h3>
                    <p style={{
                      fontSize: '0.9375rem', color: '#334155', lineHeight: 1.6
                    }}>
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const featured = projects.slice(0, 4);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%'
        }
      });

      const cards = gridRef.current.querySelectorAll('.project-card-item');
      gsap.from(cards, {
        y: 45,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ background: '#1e7b9b' }}>
      <div className="container">
        <div ref={titleRef} style={{ marginBottom: '3.5rem' }}>
          <span className="section-label" style={{ color: '#ffffff' }}>Featured Projects</span>
          <h2 className="section-title">What We Have Built</h2>
          <p className="section-subtitle">
            Real projects built by students: from IoT systems and autonomous robots to AI-powered applications and renewable energy models.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mobile-carousel"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '1.5rem'
          }}
        >
          {featured.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="project-card-item gsap-card card"
              style={{ display: 'block', textDecoration: 'none', background: '#ffffff', color: '#000000', borderRadius: '22px', border: '2px solid #000000' }}
            >
              <ProjectVisual
                projectId={project.id}
                title={project.title}
                category={project.category}
                color="#2596be"
                style={{ borderRadius: '20px 20px 0 0', borderBottom: '2px solid #000000' }}
              />
              <div className="card-body" style={{ padding: '1.75rem', color: '#000000' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span className="tag" style={{ background: '#000000', color: '#ffffff', borderRadius: '999px' }}>
                    {project.category}
                  </span>
                  <span className="tag" style={{ background: '#2596be', color: '#ffffff', border: '1px solid #2596be', borderRadius: '999px' }}>
                    {project.status}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800,
                  marginBottom: '0.5rem', color: '#000000'
                }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {project.summary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 700,
                      padding: '0.25rem 0.6rem', borderRadius: '999px',
                      background: '#f1f5f9', color: '#0f172a',
                      border: '1px solid #cbd5e1'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/projects" className="btn btn-secondary" style={{ padding: '0.85rem 2.25rem' }}>
            View All Projects <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

{/* Overhauled, High-Impact Selection CTA Section */}
function CTASection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scale: 0.94,
        y: 40,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ position: 'relative', padding: '5rem 0 7rem' }}>
      <div className="grid-pattern" />
      <div className="container" style={{ position: 'relative' }}>
        <div
          ref={cardRef}
          className="card"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            border: '3px solid #000000',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.28)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center'
          }}
        >
          {/* Beacon Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1.15rem',
              borderRadius: '999px',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.18)'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
            TEACHER-NOMINATED SELECTION PORTAL
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 900,
              color: '#000000',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              lineHeight: 1.15
            }}
          >
            Ready to Build at the Frontiers of STEM?
          </h2>

          <p
            style={{
              color: '#334155',
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              maxWidth: '680px',
              margin: '0 auto 2.5rem'
            }}
          >
            STEM Club cohorts at Greets Public School are handpicked through faculty observation. If you are passionate about robotics, coding, physics experiments, or engineering, register your interest for teacher review.
          </p>

          {/* 3-Step Pathways */}
          <div
            className="mobile-carousel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2.5rem',
              textAlign: 'left'
            }}
          >
            <div style={{ background: '#f8fafc', border: '2px solid #000000', borderRadius: '18px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <UserCheck size={18} color="#000000" />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9375rem', color: '#000000' }}>
                  1. Teacher Observation
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                Science and CS teachers nominate students showing keen inquisitiveness and hands-on dedication.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '2px solid #000000', borderRadius: '18px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Cpu size={18} color="#000000" />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9375rem', color: '#000000' }}>
                  2. Workstation Access
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                Inducted students receive dedicated access to 5 lab bays, 3D printers, sensors, and robotics rigs.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '2px solid #000000', borderRadius: '18px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Award size={18} color="#000000" />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9375rem', color: '#000000' }}>
                  3. Real Engineering
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                Build functional prototypes and represent Greets in CBSE science expos, hackathons, and state meets.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/join" className="btn btn-primary" style={{ padding: '0.95rem 2.25rem', fontSize: '0.9375rem' }}>
              Submit Expression of Interest <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-secondary" style={{ padding: '0.95rem 2rem', fontSize: '0.9375rem' }}>
              Selection Criteria & Values
            </Link>
          </div>

          <div style={{ marginTop: '1.75rem', fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            CBSE Affiliated // Bethel Foundation // Greets Public School, Kaloor, Kochi
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useDocumentTitle('Home', 'Welcome to the Greets Public School STEM Club. Explore student robotics, AI, IoT, coding, and renewable energy projects.');

  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <WhatWeDoSection />
      <FeaturedProjectsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
