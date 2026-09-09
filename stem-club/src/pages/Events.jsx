import React, { useEffect, useRef } from 'react';
import { events } from '../data/events';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Events() {
  useDocumentTitle('Events', 'Upcoming STEM workshops, robotics bootcamps, and science exhibitions at Greets Public School.');
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('.event-card-item');
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '5rem', minHeight: '100dvh', backgroundColor: '#2596be' }}>
      <div className="container">
        <div className="page-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <span className="section-label" style={{ color: '#ffffff' }}>Calendar</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
            Events and Workshops
          </h1>
          <p style={{ color: '#ffffff', fontSize: '1.125rem', maxWidth: '650px', margin: '0 auto' }}>
            Upcoming hardware sprints, competitions, hackathons, and learning opportunities at Greets Public School.
          </p>
        </div>

        {events && events.length > 0 ? (
          <div
            ref={gridRef}
            className="mobile-carousel"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', 
              gap: '1.75rem' 
            }}
          >
            {events.map((event) => (
              <div key={event.id} className="event-card-item gsap-card card" style={{ background: '#ffffff', color: '#000000', border: '2px solid #000000', borderRadius: '22px', display: 'flex', flexDirection: 'column' }}>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.75rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#000000', margin: 0 }}>
                      {event.title}
                    </h3>
                    {event.category && (
                      <span className="tag" style={{ background: '#000000', color: '#ffffff', flexShrink: 0 }}>
                        {event.category}
                      </span>
                    )}
                  </div>
                  
                  <p style={{ color: '#334155', fontSize: '0.9375rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.6 }}>
                    {event.description}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.5rem', borderTop: '2px solid #f1f5f9', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000000', fontSize: '0.875rem', fontWeight: 600 }}>
                      <Calendar size={16} color="#000000" />
                      <span>{event.date || 'Date to be announced'}</span>
                    </div>
                    {event.time && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontSize: '0.875rem' }}>
                        <Clock size={16} color="#000000" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontSize: '0.875rem' }}>
                        <MapPin size={16} color="#000000" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>

                  <Link 
                    to="/join" 
                    className="btn btn-dark" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem', 
                      width: '100%', 
                      padding: '0.75rem', 
                      fontSize: '0.8125rem' 
                    }}
                  >
                    Teacher Selection & Inquiries <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h3 style={{ color: '#ffffff' }}>No events scheduled currently</h3>
            <p style={{ color: '#ffffff' }}>Check back soon for new workshops and competitions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
