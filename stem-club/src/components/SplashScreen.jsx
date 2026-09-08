import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const FUN_MESSAGES = [
  "⚡ Charging high-voltage capacitors...",
  "⚛️ Aligning subatomic particle arrays...",
  "🤖 Calibrating Greets Robotics Core...",
  "🚀 Calculating orbital trajectory vectors...",
  "🧠 Training neural models on CBSE syllabus...",
  "🔭 Focusing optical spectrum sensors...",
  "🔬 Synthesizing lab reagent formulas...",
  "🎉 ALL SYSTEMS OPERATIONAL — WELCOME TO THE LAB!"
];

const FLOATING_STEM_ITEMS = [
  { id: 1, text: 'π', x: '12%', y: '18%', size: '1.75rem', delay: 0 },
  { id: 2, text: '∫ f(x)dx', x: '82%', y: '16%', size: '1.25rem', delay: 0.4 },
  { id: 3, text: 'E=mc²', x: '8%', y: '72%', size: '1.25rem', delay: 0.8 },
  { id: 4, text: 'λ=h/p', x: '86%', y: '74%', size: '1.25rem', delay: 1.2 },
  { id: 5, text: '01101001', x: '18%', y: '45%', size: '0.875rem', delay: 0.6 },
  { id: 6, text: '∑ i=1', x: '78%', y: '42%', size: '1.25rem', delay: 1.0 },
  { id: 7, text: 'ΔV=IR', x: '30%', y: '84%', size: '1rem', delay: 0.3 },
  { id: 8, text: 'F=ma', x: '68%', y: '86%', size: '1.125rem', delay: 0.7 },
];

export default function SplashScreen({ onFinish }) {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [poppedItems, setPoppedItems] = useState({});
  const intervalRef = useRef(null);

  const completeSplash = () => {
    setFading(true);
    setTimeout(() => {
      setRemoved(true);
      sessionStorage.setItem('gps_stem_splash_seen', 'true');
      if (onFinish) onFinish();
    }, 450);
  };

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('gps_stem_splash_seen');
    if (hasSeenSplash) {
      setRemoved(true);
      if (onFinish) onFinish();
      return;
    }

    const startTime = Date.now();
    const duration = 2200;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      const msgStep = Math.floor((pct / 100) * (FUN_MESSAGES.length - 1));
      setMessageIndex(msgStep);

      if (pct >= 100) {
        clearInterval(intervalRef.current);
        setTimeout(() => {
          completeSplash();
        }, 350);
      }
    }, 40);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onFinish]);

  const handleScreenClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSpark = { id: Date.now() + Math.random(), x, y };
    setClicks((prev) => [...prev.slice(-6), newSpark]);
    setProgress((prev) => Math.min(99, prev + 6));
  };

  const popItem = (id, e) => {
    e.stopPropagation();
    setPoppedItems((prev) => ({ ...prev, [id]: true }));
    setProgress((prev) => Math.min(99, prev + 10));
  };

  if (removed) return null;

  return (
    <div
      onClick={handleScreenClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#2596be',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s ease',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: fading ? 'none' : 'auto',
        padding: '1.5rem',
        textAlign: 'center',
        cursor: 'crosshair',
        overflow: 'hidden',
        userSelect: 'none'
      }}
      role="status"
      aria-label="Loading Greets Public School STEM Club"
    >
      {/* Background Matrix Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          opacity: 0.6
        }}
      />

      {/* Interactive Click Sparks */}
      {clicks.map((spark) => (
        <div
          key={spark.id}
          className="splash-spark"
          style={{
            position: 'absolute',
            left: spark.x,
            top: spark.y,
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid #ffffff',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Floating STEM Elements */}
      {FLOATING_STEM_ITEMS.map((item) => {
        if (poppedItems[item.id]) return null;
        return (
          <button
            key={item.id}
            onClick={(e) => popItem(item.id, e)}
            title="Tap to boost lab power!"
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              background: '#ffffff',
              color: '#000000',
              border: '2px solid #000000',
              borderRadius: '8px',
              padding: '0.25rem 0.6rem',
              fontFamily: 'var(--font-mono)',
              fontSize: item.size,
              fontWeight: 800,
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              animation: `floatStem 3.5s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
              zIndex: 2,
              transformOrigin: 'center center'
            }}
          >
            {item.text}
          </button>
        );
      })}

      {/* Main Center Console */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          maxWidth: '540px',
          width: '100%'
        }}
      >
        {/* Crest Logo with Orbiting Electron Ring */}
        <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer Orbit Ring 1 */}
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              border: '2px dashed #ffffff',
              animation: 'spinClockwise 12s linear infinite',
              pointerEvents: 'none'
            }}
          />

          {/* Outer Orbit Ring 2 */}
          <div
            style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              animation: 'spinCounter 16s linear infinite',
              pointerEvents: 'none'
            }}
          >
            {/* Small Orbiting Electron Node */}
            <div
              style={{
                position: 'absolute',
                top: '-5px',
                left: '50%',
                width: '10px',
                height: '10px',
                backgroundColor: '#ffffff',
                border: '2px solid #000000',
                borderRadius: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </div>

          {/* Official Logo Card */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '24px',
              backgroundColor: '#ffffff',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.3)',
              border: '3px solid #000000',
              animation: 'logoBounce 2s ease-in-out infinite'
            }}
          >
            <img
              src="/assets/stem-club-logo.png"
              alt="Greets Public School STEM Club Official Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        {/* Brand Headings */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.2rem 0.75rem',
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: '999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              border: '1px solid #ffffff'
            }}
          >
            <Sparkles size={12} /> Greets Public School
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '0.04em',
              margin: '0 0 0.25rem 0',
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'
            }}
          >
            STEM CLUB
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: '#ffffff',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
              fontWeight: 600
            }}
          >
            Science • Technology • Engineering • Math
          </p>
        </div>

        {/* Dynamic Fun Terminal Boot Message */}
        <div
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '2px solid #000000',
            borderRadius: '12px',
            padding: '0.625rem 1.25rem',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              textAlign: 'left',
              flex: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {FUN_MESSAGES[messageIndex]}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: 900,
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
              minWidth: '46px',
              textAlign: 'center'
            }}
          >
            {progress}%
          </span>
        </div>

        {/* High Energy Animated Progress Bar */}
        <div
          style={{
            width: '100%',
            maxWidth: '440px',
            height: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            border: '2px solid #000000',
            borderRadius: '999px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#ffffff',
              transition: 'width 0.08s linear',
              borderRadius: '999px',
              boxShadow: '0 0 12px #ffffff'
            }}
          />
        </div>

        {/* Fun Interactive Hint & Skip Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '440px',
            marginTop: '0.5rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: '#ffffff',
              letterSpacing: '0.04em',
              textAlign: 'left'
            }}
          >
            💡 <em>Click anywhere to generate sparks!</em>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              completeSplash();
            }}
            style={{
              background: '#ffffff',
              color: '#000000',
              border: '2px solid #000000',
              borderRadius: '100px',
              padding: '0.35rem 0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Enter Lab Now ➔
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spinCounter {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes logoBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.03); }
        }
        @keyframes floatStem {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        .splash-spark {
          animation: sparkBurst 0.6s ease-out forwards;
        }
        @keyframes sparkBurst {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
