import React, { useState } from 'react';
import { achievements, achievementCategories } from '../data/achievements';
import { useDocumentTitle } from '../hooks/useScrollReveal';
import { Rocket, Bot, Presentation, Code2, Users, Wifi, Brain, Zap } from 'lucide-react';

const iconMap = {
  Rocket,
  Bot,
  Presentation,
  Code2,
  Users,
  Wifi,
  Brain,
  Zap
};

export default function Achievements() {
  useDocumentTitle('Achievements');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredAchievements = achievements?.filter(
    (achievement) => activeCategory === 'All' || achievement.category.toLowerCase() === activeCategory.toLowerCase()
  ) || [];

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '5rem', minHeight: '100dvh' }}>
      <header className="page-header grid-pattern" style={{ textAlign: 'center', padding: '3rem 1rem 4rem' }}>
        <div className="container reveal">
          <span className="section-label">Milestone Archive</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
            Club Achievements
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
            Documenting our journey, hands-on milestones, exhibitions, and technical accomplishments.
          </p>
        </div>
      </header>

      <section className="container" style={{ padding: '0 1.5rem' }}>
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', justifyContent: 'center', marginBottom: '3.5rem' }}>
          {achievementCategories?.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                className="btn"
                onClick={() => setActiveCategory(category)}
                style={{
                  background: isActive ? '#000000' : '#ffffff',
                  color: isActive ? '#ffffff' : '#000000',
                  border: `1px solid ${isActive ? '#000000' : 'rgba(0, 0, 0, 0.15)'}`,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '999px',
                  fontSize: '0.8125rem',
                  fontWeight: isActive ? '700' : '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredAchievements.length > 0 ? (
          <div className="timeline">
            {filteredAchievements.map((achievement) => {
              const IconComponent = iconMap[achievement.icon] || Zap;
              return (
                <div key={achievement.id} className="timeline-item" style={{ 
                  display: 'flex', 
                  position: 'relative', 
                  marginBottom: '2rem',
                  gap: '1.5rem'
                }}>
                  <div className="timeline-dot" style={{ 
                    flexShrink: 0,
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '2px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000000',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    <IconComponent size={22} strokeWidth={2} />
                  </div>
                  
                  <div className="card" style={{ flexGrow: 1, backgroundColor: '#ffffff' }}>
                    <div className="card-body">
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '1rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#000000', margin: 0 }}>
                          {achievement.title}
                        </h3>
                        <span className="tag" style={{ backgroundColor: '#000000', color: '#ffffff', border: '1px solid #000000' }}>
                          Verified Milestone
                        </span>
                      </div>
                      
                      <p style={{ color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        {achievement.description}
                      </p>
                      
                      <span className="tag" style={{ fontSize: '0.75rem', backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1' }}>
                        {achievement.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state" style={{ padding: '4rem 0', textAlign: 'center', color: '#ffffff' }}>
            <Zap size={48} strokeWidth={1.5} style={{ color: '#ffffff', marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>No Achievements Found</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>We could not find any achievements for this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
