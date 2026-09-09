import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Trophy, Play, RotateCcw, Zap, Shield, Sparkles } from 'lucide-react';

export default function MiniGameModal({ isOpen, onClose }) {
  const [gameState, setGameState] = useState('START'); // 'START', 'PLAYING', 'GAMEOVER'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('gps_stem_rover_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [lives, setLives] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isNewHigh, setIsNewHigh] = useState(false);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const audioCtxRef = useRef(null);
  const keysRef = useRef({ left: false, right: false });

  // Game internal mutable state
  const gameRef = useRef({
    roverX: 200,
    roverY: 440,
    roverSpeed: 6.5,
    items: [],
    particles: [],
    stars: [],
    score: 0,
    lives: 3,
    spawnTimer: 0,
    difficultyTimer: 0,
    speedMultiplier: 1,
    lastTime: 0
  });

  // Sound generator via native Web Audio API (Zero external assets)
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'collect') {
        // High 8-bit arpeggio chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'battery') {
        // Power-up chord
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.04);
          gain.gain.setValueAtTime(0.15, now + i * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.04);
          osc.stop(now + i * 0.04 + 0.2);
        });
      } else if (type === 'hit') {
        // Hazard buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'gameover') {
        // Retro descending loss fanfare
        [440, 392, 349, 293].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.2, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.14);
        });
      }
    } catch {
      // AudioContext policy catch
    }
  };

  // Initialize stars and game state
  const resetGame = () => {
    setIsNewHigh(false);
    setScore(0);
    setLives(3);

    const stars = [];
    for (let i = 0; i < 45; i++) {
      stars.push({
        x: Math.random() * 400,
        y: Math.random() * 520,
        speed: 0.5 + Math.random() * 2,
        size: 1 + Math.random() * 2,
        color: Math.random() > 0.4 ? '#38bdf8' : '#ffffff'
      });
    }

    gameRef.current = {
      roverX: 200,
      roverY: 440,
      roverSpeed: 6.5,
      items: [],
      particles: [],
      stars,
      score: 0,
      lives: 3,
      spawnTimer: 0,
      difficultyTimer: 0,
      speedMultiplier: 1,
      lastTime: performance.now()
    };

    setGameState('PLAYING');
  };

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        if (gameState === 'START' || gameState === 'GAMEOVER') {
          e.preventDefault();
          resetGame();
        }
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, gameState, onClose]);

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    if (!isOpen || gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let isRunning = true;

    const spawnItem = (multiplier) => {
      const types = [
        { type: 'chip', points: 100, color: '#38bdf8', weight: 45 },
        { type: 'battery', points: 250, color: '#22c55e', weight: 15 },
        { type: 'spark', damage: 1, color: '#ef4444', weight: 30 },
        { type: 'glitch', damage: 1, color: '#f59e0b', weight: 10 }
      ];

      const totalWeight = types.reduce((acc, t) => acc + t.weight, 0);
      let rand = Math.random() * totalWeight;
      let selected = types[0];
      for (const t of types) {
        if (rand < t.weight) {
          selected = t;
          break;
        }
        rand -= t.weight;
      }

      return {
        ...selected,
        x: 30 + Math.random() * (400 - 60),
        y: -30,
        speedY: (2.4 + Math.random() * 2) * multiplier,
        size: selected.type === 'battery' ? 18 : 16,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.08
      };
    };

    const addExplosion = (x, y, color, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
        const speed = 1.5 + Math.random() * 3.5;
        gameRef.current.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.03 + Math.random() * 0.03,
          color,
          size: 2 + Math.random() * 3
        });
      }
    };

    const loop = (timestamp) => {
      if (!isRunning) return;

      const g = gameRef.current;
      const dt = Math.min((timestamp - g.lastTime) / 1000, 0.1);
      g.lastTime = timestamp;

      // Difficulty scaling over time
      g.difficultyTimer += dt;
      g.speedMultiplier = 1 + Math.min(g.difficultyTimer * 0.015, 1.8);

      // Rover Movement
      if (keysRef.current.left) {
        g.roverX -= g.roverSpeed;
      }
      if (keysRef.current.right) {
        g.roverX += g.roverSpeed;
      }
      // Clamp within canvas boundaries
      g.roverX = Math.max(30, Math.min(400 - 30, g.roverX));

      // Spawn items
      g.spawnTimer += dt;
      const spawnInterval = Math.max(0.45, 0.95 - g.speedMultiplier * 0.15);
      if (g.spawnTimer >= spawnInterval) {
        g.spawnTimer = 0;
        g.items.push(spawnItem(g.speedMultiplier));
      }

      // Clear Canvas with cyber gradient
      ctx.fillStyle = '#060f1e';
      ctx.fillRect(0, 0, 400, 520);

      // Draw Grid / Circuit Background Lines
      ctx.strokeStyle = 'rgba(37, 150, 190, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 400; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 520);
        ctx.stroke();
      }
      for (let y = (timestamp * 0.05) % 40; y < 520; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(400, y);
        ctx.stroke();
      }

      // Draw Starfield
      g.stars.forEach((star) => {
        star.y += star.speed * g.speedMultiplier;
        if (star.y > 520) {
          star.y = 0;
          star.x = Math.random() * 400;
        }
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Items
      for (let i = g.items.length - 1; i >= 0; i--) {
        const item = g.items[i];
        item.y += item.speedY;
        item.rotation += item.rotSpeed;

        // Collision Check with Rover (Rover bounding box approx 44x34)
        const dx = Math.abs(g.roverX - item.x);
        const dy = Math.abs(g.roverY - item.y);

        if (dx < 28 && dy < 24) {
          // Collision occurred!
          if (item.type === 'chip') {
            g.score += item.points;
            setScore(g.score);
            playSound('collect');
            addExplosion(item.x, item.y, '#38bdf8', 10);
          } else if (item.type === 'battery') {
            g.score += item.points;
            if (g.lives < 3) {
              g.lives += 1;
              setLives(g.lives);
            }
            setScore(g.score);
            playSound('battery');
            addExplosion(item.x, item.y, '#22c55e', 16);
          } else {
            // Hazard hit
            g.lives -= 1;
            setLives(g.lives);
            playSound('hit');
            addExplosion(g.roverX, g.roverY, '#ef4444', 18);

            if (g.lives <= 0) {
              // Game Over
              playSound('gameover');
              const finalScore = g.score;
              setScore(finalScore);
              const prevHigh = parseInt(localStorage.getItem('gps_stem_rover_highscore') || '0', 10);
              if (finalScore > prevHigh) {
                try {
                  localStorage.setItem('gps_stem_rover_highscore', finalScore.toString());
                } catch {
                  // localStorage catch
                }
                setHighScore(finalScore);
                setIsNewHigh(true);
              }
              setGameState('GAMEOVER');
              return;
            }
          }
          g.items.splice(i, 1);
          continue;
        }

        // Off-screen removal
        if (item.y > 540) {
          g.items.splice(i, 1);
          continue;
        }

        // Render Item
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);

        if (item.type === 'chip') {
          // Microchip
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.fillRect(-10, -10, 20, 20);
          ctx.strokeRect(-10, -10, 20, 20);
          // Pins
          ctx.fillStyle = '#38bdf8';
          [-6, 0, 6].forEach((p) => {
            ctx.fillRect(p - 1.5, -14, 3, 4);
            ctx.fillRect(p - 1.5, 10, 3, 4);
          });
          // Chip core dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (item.type === 'battery') {
          // Battery / Quantum Cell
          ctx.fillStyle = '#052e16';
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 2;
          ctx.fillRect(-9, -12, 18, 24);
          ctx.strokeRect(-9, -12, 18, 24);
          // Terminal cap
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(-4, -15, 8, 3);
          // Lightning bolt mark
          ctx.fillStyle = '#4ade80';
          ctx.beginPath();
          ctx.moveTo(1, -7);
          ctx.lineTo(-4, 1);
          ctx.lineTo(0, 1);
          ctx.lineTo(-2, 7);
          ctx.lineTo(4, -1);
          ctx.lineTo(0, -1);
          ctx.closePath();
          ctx.fill();
        } else if (item.type === 'spark') {
          // Voltage Hazard / Resistor
          ctx.fillStyle = '#450a0a';
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // Hazard cross
          ctx.strokeStyle = '#fca5a5';
          ctx.beginPath();
          ctx.moveTo(-6, -6);
          ctx.lineTo(6, 6);
          ctx.moveTo(6, -6);
          ctx.lineTo(-6, 6);
          ctx.stroke();
        } else if (item.type === 'glitch') {
          // Glitch Mine / Spiked Orb
          ctx.fillStyle = '#78350f';
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let s = 0; s < 8; s++) {
            const r = s % 2 === 0 ? 13 : 7;
            const a = (s * Math.PI) / 4;
            const px = Math.cos(a) * r;
            const py = Math.sin(a) * r;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

        ctx.restore();
      }

      // Update & Draw Particles
      for (let p = g.particles.length - 1; p >= 0; p--) {
        const pt = g.particles[p];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= pt.decay;

        if (pt.life <= 0) {
          g.particles.splice(p, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = pt.life;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw STEM Rover
      drawRover(ctx, g.roverX, g.roverY, timestamp);

      // Jet Thruster Particles
      if (Math.random() > 0.3) {
        g.particles.push({
          x: g.roverX + (Math.random() - 0.5) * 14,
          y: g.roverY + 18,
          vx: (Math.random() - 0.5) * 1,
          vy: 2 + Math.random() * 2,
          life: 0.6,
          decay: 0.05,
          color: Math.random() > 0.5 ? '#2596be' : '#38bdf8',
          size: 2.5
        });
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, gameState]);

  // Vector STEM Rover Drawing
  const drawRover = (ctx, x, y, time) => {
    ctx.save();
    ctx.translate(x, y);

    // Rover Tread/Wheels
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    // Left treads
    ctx.fillRect(-22, -10, 8, 26);
    ctx.strokeRect(-22, -10, 8, 26);
    // Right treads
    ctx.fillRect(14, -10, 8, 26);
    ctx.strokeRect(14, -10, 8, 26);

    // Tread lines
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    [-6, 0, 6].forEach((ty) => {
      ctx.beginPath();
      ctx.moveTo(-22, ty);
      ctx.lineTo(-14, ty);
      ctx.moveTo(14, ty);
      ctx.lineTo(22, ty);
      ctx.stroke();
    });

    // Main Chassis
    ctx.fillStyle = '#2596be';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-14, -12, 28, 26, 4);
    ctx.fill();
    ctx.stroke();

    // Solar Panel / Circuit Core
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.fillRect(-10, -8, 20, 10);
    ctx.strokeRect(-10, -8, 20, 10);

    // Cockpit Scanner / Sensor Dome
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -2, 5, 0, Math.PI * 2);
    ctx.fill();

    // Pulsing Scanner LED
    const pulse = (Math.sin(time * 0.008) + 1) * 0.5;
    ctx.fillStyle = `rgba(56, 189, 248, ${0.4 + pulse * 0.6})`;
    ctx.beginPath();
    ctx.arc(0, -2, 8, 0, Math.PI * 2);
    ctx.fill();

    // Antenna Mast & Blinking Signal
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(6, -12);
    ctx.lineTo(9, -20);
    ctx.stroke();

    ctx.fillStyle = Math.floor(time / 200) % 2 === 0 ? '#ef4444' : '#22c55e';
    ctx.beginPath();
    ctx.arc(9, -21, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Secret STEM Rover Mini Game"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          backgroundColor: '#0a0f1d',
          border: '3px solid #000000',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(37, 150, 190, 0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.1rem',
            backgroundColor: '#030712',
            borderBottom: '2px solid #1e293b'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 8px #22c55e'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#38bdf8',
                letterSpacing: '0.05em'
              }}
            >
              STEM ROVER v1.0
            </span>
          </div>

          <div
            style={{
              padding: '3px 10px',
              borderRadius: '999px',
              backgroundColor: '#000000',
              border: '1.5px solid #ffffff',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            Built by Rishi &amp; Joshua
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer'
              }}
              title={soundEnabled ? 'Mute audio' : 'Enable audio'}
              aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} color="#ef4444" />}
            </button>
            <button
              onClick={onClose}
              style={{
                background: '#ffffff',
                border: '1px solid #000000',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000',
                cursor: 'pointer',
                fontWeight: 900
              }}
              aria-label="Close Easter Egg"
            >
              <X size={18} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* In-Game HUD Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.6rem 1.25rem',
            backgroundColor: '#0f172a',
            borderBottom: '1px solid #1e293b',
            color: '#ffffff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem'
          }}
        >
          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>SCORE: </span>
            <span style={{ fontWeight: 900, color: '#38bdf8', fontSize: '1rem' }}>{score}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem', marginRight: '3px' }}>SHIELDS:</span>
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.85rem',
                  filter: i < lives ? 'none' : 'grayscale(100%) opacity(25%)',
                  transition: 'all 0.2s ease'
                }}
              >
                ❤️
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Trophy size={13} color="#f59e0b" />
            <span style={{ fontWeight: 800, color: '#f59e0b' }}>{highScore}</span>
          </div>
        </div>

        {/* Canvas Game Stage */}
        <div style={{ position: 'relative', width: '100%', height: '420px', overflow: 'hidden' }}>
          <canvas
            ref={canvasRef}
            width={400}
            height={520}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              imageRendering: 'pixelated'
            }}
          />

          {/* START SCREEN OVERLAY */}
          {gameState === 'START' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(6, 15, 30, 0.92)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  backgroundColor: '#2596be',
                  border: '2px solid #ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  boxShadow: '0 8px 24px rgba(37, 150, 190, 0.5)'
                }}
              >
                <Zap size={32} color="#ffffff" />
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#ffffff',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  margin: '0 0 4px',
                  letterSpacing: '0.02em'
                }}
              >
                CIRCUIT DODGER
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#38bdf8',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  marginBottom: '1.25rem'
                }}
              >
                SECRET EASTER EGG • BUILT BY RISHI &amp; JOSHUA
              </p>

              <div
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.75rem',
                  color: '#cbd5e1',
                  textAlign: 'left',
                  lineHeight: 1.6,
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#38bdf8' }}>🔷 Chips:</span> +100 Points
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#22c55e' }}>🔋 Battery:</span> +250 Points + 1 Shield
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ef4444' }}>⚡ Sparks:</span> Avoid damage!
                </div>
              </div>

              <button
                onClick={resetGame}
                className="btn btn-primary"
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '999px',
                  fontWeight: 900
                }}
              >
                <Play size={18} fill="#ffffff" /> Launch Rover
              </button>

              <span
                style={{
                  marginTop: '0.85rem',
                  color: '#64748b',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                Press [Space] or [Arrow Keys]
              </span>
            </div>
          )}

          {/* GAME OVER SCREEN OVERLAY */}
          {gameState === 'GAMEOVER' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(6, 15, 30, 0.94)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                  border: '2px solid #ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.75rem',
                  boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)'
                }}
              >
                <Shield size={28} color="#ffffff" />
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  margin: '0 0 2px'
                }}
              >
                ROVER COMPROMISED
              </h2>

              {isNewHigh && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#f59e0b',
                    color: '#000000',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    margin: '6px 0',
                    boxShadow: '0 0 12px #f59e0b'
                  }}
                >
                  <Sparkles size={12} /> NEW HIGH SCORE!
                </div>
              )}

              <div
                style={{
                  backgroundColor: '#0f172a',
                  border: '1.5px solid #1e293b',
                  borderRadius: '14px',
                  padding: '0.85rem 1.5rem',
                  margin: '0.85rem 0 1.25rem',
                  minWidth: '220px'
                }}
              >
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  FINAL CIRCUIT SCORE
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: '#38bdf8'
                  }}
                >
                  {score}
                </div>
                <div style={{ color: '#f59e0b', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  BEST: {Math.max(score, highScore)}
                </div>
              </div>

              <button
                onClick={resetGame}
                className="btn btn-primary"
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '999px',
                  fontWeight: 900
                }}
              >
                <RotateCcw size={18} /> Reboot &amp; Retry
              </button>

              <span
                style={{
                  marginTop: '0.75rem',
                  color: '#64748b',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                Press [Space] to quick-restart
              </span>
            </div>
          )}
        </div>

        {/* Mobile / Touch Controls Bar */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            padding: '0.85rem 1.25rem',
            backgroundColor: '#030712',
            borderTop: '2px solid #1e293b'
          }}
        >
          <button
            onPointerDown={() => { keysRef.current.left = true; }}
            onPointerUp={() => { keysRef.current.left = false; }}
            onPointerLeave={() => { keysRef.current.left = false; }}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: '2px solid #334155',
              borderRadius: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              userSelect: 'none',
              touchAction: 'none'
            }}
          >
            ◀ LEFT
          </button>
          <button
            onPointerDown={() => { keysRef.current.right = true; }}
            onPointerUp={() => { keysRef.current.right = false; }}
            onPointerLeave={() => { keysRef.current.right = false; }}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              border: '2px solid #334155',
              borderRadius: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              userSelect: 'none',
              touchAction: 'none'
            }}
          >
            RIGHT ▶
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
