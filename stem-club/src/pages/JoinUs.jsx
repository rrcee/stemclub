import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import { 
  Rocket, Lightbulb, Users, Wrench, Cpu, Code, Send, 
  CheckCircle, AlertCircle, Sparkles, BrainCircuit, ShieldCheck, Award, UserCheck
} from 'lucide-react';

const JoinUs = () => {
  useDocumentTitle('Student Selection | STEM Club', 'Learn how students are handpicked and selected by faculty teachers for the Greets Public School STEM Club.');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    teacherName: '',
    interests: [],
    skills: '',
    whyJoin: '',
    projectIdea: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    'Robotics', 'Web Development', 'AI / Machine Learning', 'Electronics & IoT', 
    '3D Prototyping', 'Sensors & Automation', 'Renewable Energy', 'Embedded Systems'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.grade) newErrors.grade = 'Class/Grade is required';
    if (!formData.teacherName.trim()) newErrors.teacherName = 'Subject teacher name is required';
    if (!formData.whyJoin.trim()) newErrors.whyJoin = 'Please describe what sparks your keen interest in STEM';
    if (formData.interests.length === 0) newErrors.interests = 'Select at least one area of interest';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/thank-you');
      }, 800);
    }
  };

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
                We do not enroll random members. Greets Public School teachers identify and select students who show a genuine, persistent spark for experimentation, technology, and engineering. The form below allows students with high enthusiasm to formally register their expression of interest for teacher review.
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

          {/* Expression of Interest Form */}
          <div className="card" style={{ maxWidth: '820px', margin: '0 auto', backgroundColor: '#ffffff', color: '#000000', boxShadow: '0 20px 50px rgba(0,0,0,0.22)', borderRadius: '26px', border: '3px solid #000000' }}>
            <div className="card-body" style={{ padding: 'clamp(1.5rem, 5vw, 2.75rem)', color: '#000000' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
                <span className="tag" style={{ background: '#000000', color: '#ffffff', marginBottom: '0.75rem', borderRadius: '999px' }}>
                  FACULTY REVIEW FORM
                </span>
                <h2 style={{ color: '#000000', fontFamily: 'var(--font-heading)', fontSize: '2.25rem', margin: '0.5rem 0 0.5rem', fontWeight: 900 }}>
                  Expression of Interest
                </h2>
                <p style={{ color: '#334155', fontSize: '0.9375rem', maxWidth: '600px', margin: '0 auto' }}>
                  Fill out this profile to bring your keen STEM interest to the attention of your teachers and the STEM Club advisory panel.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name" style={{ color: '#000000' }}>Student Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className={`form-input ${errors.name ? 'form-error' : ''}`}
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Nair"
                    />
                    {errors.name && <span style={{ color: '#dc2626', fontSize: '0.8125rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><AlertCircle size={14} /> {errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="grade" style={{ color: '#000000' }}>Class / Grade *</label>
                    <select 
                      id="grade" 
                      name="grade" 
                      className={`form-select ${errors.grade ? 'form-error' : ''}`}
                      value={formData.grade}
                      onChange={handleInputChange}
                    >
                      <option value="">Select current grade</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                    {errors.grade && <span style={{ color: '#dc2626', fontSize: '0.8125rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><AlertCircle size={14} /> {errors.grade}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="teacherName" style={{ color: '#000000' }}>
                    Current Science / Math / CS Teacher *
                  </label>
                  <input 
                    type="text" 
                    id="teacherName" 
                    name="teacherName" 
                    className={`form-input ${errors.teacherName ? 'form-error' : ''}`}
                    value={formData.teacherName}
                    onChange={handleInputChange}
                    placeholder="e.g. Mrs. Lakshmi (Physics) / Mr. Thomas (Computer Science)"
                  />
                  <p className="form-helper" style={{ color: '#475569', fontSize: '0.8125rem', marginTop: '0.35rem' }}>
                    Your subject teacher will be consulted regarding your classroom curiosity and lab participation.
                  </p>
                  {errors.teacherName && <span style={{ color: '#dc2626', fontSize: '0.8125rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><AlertCircle size={14} /> {errors.teacherName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ color: '#000000' }}>Areas of Keen Interest *</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {interestOptions.map(interest => {
                      const isSelected = formData.interests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          style={{
                            padding: '0.5rem 1.15rem',
                            borderRadius: '999px',
                            border: `2px solid ${isSelected ? '#000000' : '#cbd5e1'}`,
                            backgroundColor: isSelected ? '#000000' : '#ffffff',
                            color: isSelected ? '#ffffff' : '#000000',
                            fontWeight: isSelected ? '800' : '600',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                  {errors.interests && <span style={{ color: '#dc2626', fontSize: '0.8125rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><AlertCircle size={14} /> {errors.interests}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="skills" style={{ color: '#000000' }}>Personal Projects or Hobby Experiments (Optional)</label>
                  <input 
                    type="text" 
                    id="skills" 
                    name="skills" 
                    className="form-input"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g. Built an Arduino LED chaser, solved Python puzzles, made science exhibition model"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="whyJoin" style={{ color: '#000000' }}>Why are you keenly interested in STEM? *</label>
                  <textarea 
                    id="whyJoin" 
                    name="whyJoin" 
                    className={`form-textarea ${errors.whyJoin ? 'form-error' : ''}`}
                    rows={4}
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    placeholder="Explain what topics or real-world challenges fascinate you, and why you want to build solutions in the STEM Lab..."
                  />
                  {errors.whyJoin && <span style={{ color: '#dc2626', fontSize: '0.8125rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}><AlertCircle size={14} /> {errors.whyJoin}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="projectIdea" style={{ color: '#000000' }}>What is a project idea you would love to build? (Optional)</label>
                  <textarea 
                    id="projectIdea" 
                    name="projectIdea" 
                    className="form-textarea"
                    rows={3}
                    value={formData.projectIdea}
                    onChange={handleInputChange}
                    placeholder="Describe a mechanism, robot, app, or experiment you dream of constructing..."
                  />
                </div>

                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '2px solid #000000',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  fontSize: '0.875rem',
                  color: '#334155',
                  lineHeight: 1.6
                }}>
                  <strong style={{ color: '#000000' }}>Faculty Review Note:</strong> Submission of this form registers your candidacy. Final selection is decided by teacher recommendation and lab space availability.
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.75rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '1rem 2rem', borderRadius: '999px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering Interest...' : (
                    <>
                      Submit for Faculty Teacher Review <Send size={18} strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default JoinUs;
