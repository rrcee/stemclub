import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import { 
  Users, Wrench, Cpu, Sparkles, ShieldCheck, Award, UserCheck, ArrowRight, Compass
} from 'lucide-react';

const JoinUs = () => {
  useDocumentTitle('Student Selection | STEM Club', 'Learn how students are handpicked and selected by faculty teachers for the Greets Public School STEM Club.');

  const selectionCriteria = [
    {
      icon: <UserCheck size={26} strokeWidth={2} color="#000000" />,
      title: 'Teacher Observation',
      desc: 'Subject teachers in Science, Mathematics, and Computer Science continuously evaluate classroom curiosity, analytical thinking, and practical workshop interest.'
    },
    {
      icon: <Sparkles size={26} strokeWidth={2} color="#000000" />,
      title: 'Keen Interest & Drive',
      desc: 'Students are handpicked not merely by test scores, but by genuine passion: students who ask probing questions, tinker with mechanics, or explore code independently.'
    },
    {
      icon: <ShieldCheck size={26} strokeWidth={2} color="#000000" />,
      title: 'Faculty Recommendation',
      desc: 'Nominations are reviewed by the STEM Club teacher coordinators. Selected students receive official invitations to induct into active laboratory project teams.'
    }
  ];

  const clubPrivileges = [
    { icon: <Wrench size={22} strokeWidth={2} color="#000000" />, title: 'Dedicated Lab Bays' },
    { icon: <Cpu size={22} strokeWidth={2} color="#000000" />, title: 'Hardware & Sensor Access' },
    { icon: <Users size={22} strokeWidth={2} color="#000000" />, title: 'Peer Collaboration' },
    { icon: <Award size={22} strokeWidth={2} color="#000000" />, title: 'Competition Teams' },
  ];

  return (
    <main style={{ minHeight: '100dvh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="page-header" style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', paddingBottom: '3rem', textAlign: 'center' }}>
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center' }}>ADMISSIONS & SELECTION</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', margin: '1rem 0' }}>
            STUDENT SELECTION PROCESS
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
            Membership in the Greets Public School STEM Club is selective. Students are carefully observed and handpicked by faculty teachers based on keen curiosity, problem-solving mindset, and dedication.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        <div className="container">
          
          {/* Important Notice Box */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '12px',
            padding: '1.75rem',
            marginBottom: '3rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1.25rem'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#000000',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', color: '#000000', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.35rem 0' }}>
                How Students Are Selected: Teacher-Nominated Cohorts
              </h3>
              <p style={{ color: '#334155', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>
                We do not enroll members through open application forms. Greets Public School teachers continuously observe and handpick students who show a genuine, persistent spark for experimentation, technology, and engineering during science and computing sessions.
              </p>
            </div>
          </div>

          {/* 3 Criteria Cards */}
          <div
            className="mobile-carousel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem'
            }}
          >
            {selectionCriteria.map((c, i) => (
              <div key={i} className="card card-body" style={{
                background: '#ffffff',
                border: '2px solid #000000',
                borderRadius: '22px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {c.icon}
                </div>
                <h3 style={{ color: '#000000', fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{c.title}</h3>
                <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick Privileges Row */}
          <div
            className="mobile-carousel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '4rem'
            }}
          >
            {clubPrivileges.map((p, i) => (
              <div key={i} className="card card-body" style={{
                background: '#ffffff',
                padding: '1.25rem',
                borderRadius: '18px',
                border: '1.5px solid #000000',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {p.icon}
                </div>
                <span style={{ color: '#000000', fontWeight: 700, fontSize: '0.9rem' }}>{p.title}</span>
              </div>
            ))}
          </div>

          {/* How Students Are Selected Guide */}
          <div className="card" style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: '#ffffff', color: '#000000', boxShadow: '0 20px 50px rgba(0,0,0,0.22)', borderRadius: '26px', border: '3px solid #000000' }}>
            <div className="card-body" style={{ padding: 'clamp(2rem, 5vw, 3rem)', color: '#000000', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#000000',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Sparkles size={28} />
              </div>
              <h2 style={{ color: '#000000', fontFamily: 'var(--font-heading)', fontSize: '2rem', margin: '0 0 1rem', fontWeight: 900 }}>
                How to Join a STEM Cohort
              </h2>
              <p style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto 1.75rem' }}>
                There is no sign-up or registration form required. Students are nominated directly by their Science, Mathematics, and Computer Science teachers based on active classroom participation, inquisitive questions, and enthusiasm for hands-on problem solving.
              </p>
              <div style={{
                backgroundColor: '#f8fafc',
                border: '2px solid #000000',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'left',
                marginBottom: '2rem'
              }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#000000', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  Tips for Aspiring Members:
                </h4>
                <ul style={{ color: '#334155', fontSize: '0.9375rem', lineHeight: 1.7, paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Engage passionately during physics, chemistry, biology, and math lab periods.</li>
                  <li>Work on small independent coding or electronics experiments at home or school.</li>
                  <li>Talk to your science and CS faculty about concepts or prototypes you want to build.</li>
                  <li>Participate in school science expos and exhibitions to showcase your curiosity.</li>
                </ul>
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/projects" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Explore Student Projects <ArrowRight size={16} />
                </Link>
                <Link to="/stem-lab" className="btn btn-secondary" style={{ padding: '0.85rem 2rem', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Tour Laboratory Facilities <Compass size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default JoinUs;
