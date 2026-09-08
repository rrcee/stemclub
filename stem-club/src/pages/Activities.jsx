import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import { activities } from '../data/activities';
import { Tag, CheckCircle2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Activities = () => {
  useDocumentTitle('Activities', 'Explore weekly workshops, hackathons, and laboratory sessions at Greets Public School STEM Club.');
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      const items = timelineRef.current.querySelectorAll('.activity-timeline-item');
      gsap.from(items, {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 85%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ padding: 'calc(var(--nav-height) + 2rem) 20px 80px', color: '#ffffff', maxWidth: '1000px', margin: '0 auto', backgroundColor: '#2596be', minHeight: '100dvh' }}>
      <header className="page-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="section-label" style={{ color: '#ffffff' }}>Club Schedule</span>
        <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#ffffff', marginBottom: '16px' }}>
          Club Activities
        </h1>
        <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto', color: '#ffffff' }}>
          Explore our hands-on workshops, engineering build sprints, and student collaborative sessions.
        </p>
      </header>

      <div style={{ position: 'relative', paddingLeft: '20px' }}>
        {/* Timeline Line */}
        <div style={{ position: 'absolute', left: '7px', top: '20px', bottom: '20px', width: '3px', backgroundColor: '#ffffff' }}></div>

        <div ref={timelineRef} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {activities.map((activity, index) => (
            <div key={activity.id || index} className="activity-timeline-item" style={{ position: 'relative', paddingLeft: '30px' }}>
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute',
                left: '-20px',
                top: '24px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '3px solid #000000',
                zIndex: 1
              }}></div>

              <div className="gsap-card card" style={{ 
                backgroundColor: '#ffffff', 
                color: '#000000',
                padding: '24px', 
                borderRadius: '12px', 
                border: '2px solid #000000',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.375rem', color: '#000000', margin: 0, fontWeight: 800 }}>
                    {activity.title}
                  </h2>
                  {activity.category && (
                    <span className="tag" style={{ background: '#000000', color: '#ffffff' }}>
                      <Tag size={12} style={{ marginRight: '4px' }} /> {activity.category}
                    </span>
                  )}
                </div>

                <p style={{ color: '#1e293b', lineHeight: '1.7', marginBottom: '20px', fontSize: '0.9375rem' }}>
                  {activity.description}
                </p>

                {activity.highlights && activity.highlights.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '0.9375rem', color: '#000000', marginBottom: '10px', fontWeight: 700 }}>Highlights:</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {activity.highlights.map((highlight, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#334155', fontSize: '0.875rem' }}>
                          <CheckCircle2 size={16} strokeWidth={2} color="#000000" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ lineHeight: '1.5' }}>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activity.skills && activity.skills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '2px solid #f1f5f9', paddingTop: '16px' }}>
                    {activity.skills.map((skill, i) => (
                      <span key={i} style={{ 
                        fontSize: '0.75rem', color: '#000000', fontWeight: 600,
                        padding: '4px 10px', backgroundColor: '#f1f5f9', 
                        borderRadius: '4px', border: '1px solid #cbd5e1'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
