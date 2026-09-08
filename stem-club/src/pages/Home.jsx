import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot, Brain, Code2, Wifi, Cpu, Zap, ArrowRight,
  ChevronRight, Atom, Award, Wrench, Sparkles, Binary
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
    const particleCount = prefersReduced ? 0 : 50;

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
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
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
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
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
      // 1. Initial entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(badgeRef.current, { y: -30, opacity: 0, duration: 0.6, delay: 0.1 })
        .from(titleRef.current, { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
        .from(descRef.current, { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(buttonsRef.current, { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from([floatLayer1Ref.current, floatLayer2Ref.current, floatLayer3Ref.current], {
          scale: 0.7,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.4)'
        }, '-=0.5');

      // 2. Parallax ScrollTrigger for foreground content
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0.15,
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
        y: -180,
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
        y: 120,
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
        y: -90,
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
          <Atom size={16} strokeWidth={2.5} /> Quantum & Robotics Lab
        </div>
      </div>

      <div
        ref={floatLayer2Ref}
        className="gsap-parallax-layer"
        style={{
          position: 'absolute',
          bottom: '22%',
          right: '15%',
          display: 'none',
          mdDisplay: 'block'
        }}
      >
        <div className="floating-stem-badge" style={{ animation: 'floatStem 5s ease-in-out infinite 0.5s' }}>
          <Zap size={16} strokeWidth={2.5} /> IoT Telemetry & Embedded
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
          {/* Official Crest Badge */}
          <div
            ref={badgeRef}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.375rem 1rem',
              borderRadius: '100px',
              background: '#ffffff',
              border: '2px solid #000000',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#000000',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <img
              src="/assets/stem-club-logo.png"
              alt="STEM Club Official Logo"
              style={{ width: '26px', height: '26px', objectFit: 'contain' }}
            />
            Greets Public School STEM Club
          </div>

          <h1
            ref={titleRef}
            style={{
              color: '#ffffff',
              marginBottom: '0',
              lineHeight: 1.1
            }}
          >
            IMAGINE.<br />
            BUILD.<br />
            <span style={{ color: '#000000', background: '#ffffff', padding: '0 0.5rem', display: 'inline-block', marginTop: '0.25rem' }}>
              INNOVATE.
            </span>
          </h1>

          <p
            ref={descRef}
            className="hero-description"
            style={{ color: '#ffffff', fontSize: '1.125rem', lineHeight: 1.7, marginTop: '1.5rem' }}
          >
            An innovation ecosystem where students build with science, technology, engineering, and mathematics. Membership is selective and teacher-nominated for passionate students with a keen interest in discovery.
          </p>

          <div ref={buttonsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.75rem' }}>
            <Link to="/projects" className="btn btn-primary">
              Explore Projects <ArrowRight size={16} />
            </Link>
            <Link to="/join" className="btn btn-secondary">
              Selection Process
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const sectionRef = useRef(null);
  const count1Ref = useRef(null);
  const count2Ref = useRef(null);
  const count3Ref = useRef(null);
  const count4Ref = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Odometer number counter animation
      const animateCount = (ref, target) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = Math.floor(obj.val);
            }
          }
        });
      };

      animateCount(count1Ref, 6);
      animateCount(count2Ref, 12);
      animateCount(count3Ref, 100);
      animateCount(count4Ref, 5);

      // Parallax card drift
      gsap.from('.stat-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
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
    <section ref={sectionRef} style={{ padding: '3.5rem 0', backgroundColor: '#1e7b9b', borderTop: '2px solid #000000', borderBottom: '2px solid #000000' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem'
        }}>
          <div className="stat-card" style={{ background: '#ffffff', color: '#000000', padding: '1.5rem', borderRadius: '12px', border: '2px solid #000000', boxShadow: '0 4px 14px rgba(0,0,0,0.15)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              <span ref={count1Ref}>6</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
              Core STEM Tracks
            </div>
          </div>

          <div className="stat-card" style={{ background: '#ffffff', color: '#000000', padding: '1.5rem', borderRadius: '12px', border: '2px solid #000000', boxShadow: '0 4px 14px rgba(0,0,0,0.15)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              <span ref={count2Ref}>12</span>+
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
              Student Prototypes
            </div>
          </div>

          <div className="stat-card" style={{ background: '#ffffff', color: '#000000', padding: '1.5rem', borderRadius: '12px', border: '2px solid #000000', boxShadow: '0 4px 14px rgba(0,0,0,0.15)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              <span ref={count3Ref}>100</span>%
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
              Teacher Selected
            </div>
          </div>

          <div className="stat-card" style={{ background: '#ffffff', color: '#000000', padding: '1.5rem', borderRadius: '12px', border: '2px solid #000000', boxShadow: '0 4px 14px rgba(0,0,0,0.15)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              <span ref={count4Ref}>5</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginTop: '0.5rem', letterSpacing: '0.05em' }}>
              Workstation Bays
            </div>
          </div>
        </div>
      </div>
    </section>
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
      // Header entrance
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

      // Staggered cards entrance with differential scroll parallax
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

      // Parallax scrub on cards (alternating speed)
      cards.forEach((card, i) => {
        const yOffset = i % 2 === 0 ? -25 : 25;
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
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Explore. Build. Solve.</h2>
          <p className="section-subtitle">
            Our club spans six core areas of STEM, giving students the tools, knowledge and workspace to turn ideas into working technology.
          </p>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1.25rem'
          }}
        >
          {stemAreas.map((area, idx) => {
            const Icon = iconMap[area.icon] || Cpu;
            return (
              <div
                key={area.id}
                className="area-card-item gsap-card card"
                style={{ background: '#ffffff', color: '#000000' }}
              >
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.75rem' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#000000', color: '#ffffff'
                  }}>
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700,
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
          <span className="section-label">Featured Projects</span>
          <h2 className="section-title">What We Have Built</h2>
          <p className="section-subtitle">
            Real projects built by students: from IoT systems and autonomous robots to AI-powered applications and renewable energy models.
          </p>
        </div>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '1.5rem'
          }}
        >
          {featured.map((project, idx) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="project-card-item gsap-card card"
              style={{ display: 'block', textDecoration: 'none', background: '#ffffff', color: '#000000' }}
            >
              <ProjectVisual
                projectId={project.id}
                title={project.title}
                category={project.category}
                color="#2596be"
                style={{ borderRadius: '12px 12px 0 0', borderBottom: '2px solid #000000' }}
              />
              <div className="card-body" style={{ padding: '1.5rem', color: '#000000' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span className="tag" style={{ background: '#000000', color: '#ffffff' }}>
                    {project.category}
                  </span>
                  <span className="tag" style={{ background: '#2596be', color: '#ffffff', border: '1px solid #2596be' }}>
                    {project.status}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700,
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
                      fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 600,
                      padding: '0.2rem 0.5rem', borderRadius: '4px',
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

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/projects" className="btn btn-primary" style={{ background: '#ffffff', color: '#000000', border: '2px solid #ffffff' }}>
            View All Projects <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scale: 0.94,
        y: 40,
        opacity: 0,
        duration: 0.7,
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
    <section ref={sectionRef} className="section" style={{ position: 'relative' }}>
      <div className="grid-pattern" />
      <div className="container" style={{ position: 'relative' }}>
        <div ref={contentRef} style={{
          textAlign: 'center', maxWidth: '640px', margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <span className="section-label">Teacher Selection & Admissions</span>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Passionate about building?</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2rem', color: '#ffffff' }}>
            STEM Club cohorts are handpicked by Greets Public School teachers. If you have a keen interest in hardware, coding, or experimentation, submit your expression of interest for teacher review and nomination.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/join" className="btn btn-primary" style={{ background: '#ffffff', color: '#000000', border: '2px solid #ffffff' }}>
              Express Interest for Selection <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn btn-secondary">
              About the Club
            </Link>
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
      <StatsSection />
      <WhatWeDoSection />
      <FeaturedProjectsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
