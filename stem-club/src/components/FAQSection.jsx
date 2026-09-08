import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Who is eligible to join the Greets Public School STEM Club?",
    answer: "All enrolled students from Classes 6 through 12 who have a keen curiosity for science, coding, robotics, electronics, or mathematics are eligible to join. We encourage both absolute beginners and experienced builders."
  },
  {
    question: "Do I need prior programming or electronics experience to join?",
    answer: "No prior experience is required. The club conducts foundational bootcamps in Python, Arduino, and basic circuit design to bring every new member up to speed before assigning team project roles."
  },
  {
    question: "What hardware and lab equipment do members have access to?",
    answer: "Members work directly with ESP32 and Arduino microcontrollers, Raspberry Pi single-board computers, sensor modules (DHT22, ultrasonic, soil moisture, IR arrays), motor drivers, breadboards, digital multimeters, and soldering stations in our dedicated STEM Lab."
  },
  {
    question: "How are student projects selected and developed?",
    answer: "Students propose real-world problem statements or collaborate on club flagship initiatives (such as automated irrigation, computer vision attendance, and environmental stations). Faculty mentors review proposals and guide student teams through the prototyping, testing, and documentation phases."
  },
  {
    question: "Do club members represent the school in external STEM competitions?",
    answer: "Yes. Teams are selected and mentored to participate in regional science exhibitions, inter-school robotics meets, hackathons, and state-level innovation challenges."
  },
  {
    question: "When and where do club sessions take place?",
    answer: "Regular workshops and prototyping sessions take place weekly in the STEM Lab and Computer Lab after school hours and during designated activity periods. Project teams also schedule lab access for build testing."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="section" style={{ position: 'relative' }} aria-labelledby="faq-title">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 1rem',
            borderRadius: '999px',
            background: '#000000',
            border: '1px solid #ffffff',
            color: '#ffffff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}>
            <HelpCircle size={14} color="#ffffff" /> Frequently Asked Questions
          </div>
          <h2 id="faq-title" className="section-title">Common Questions</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', color: '#ffffff' }}>
            Everything you need to know about membership, laboratory access, projects, and club activities.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  background: '#ffffff',
                  border: '2px solid #000000',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    color: '#000000',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '1rem'
                  }}
                >
                  <span style={{ color: '#000000' }}>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      color: '#000000'
                    }}
                  />
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.25rem',
                    color: '#334155',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    paddingTop: '1rem'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
