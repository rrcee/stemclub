import React from 'react';

export default function ProjectVisual({ projectId, title, category, color = '#2596be', isHero = false, style = {} }) {
  const renderVisual = () => {
    switch (projectId) {
      case 'line-following-robot':
        return (
          <svg viewBox="0 0 600 360" width="100%" height="100%" style={{ display: 'block', background: '#000000' }}>
            <defs>
              <pattern id="robo-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.15)" />
              </pattern>
            </defs>

            <rect width="600" height="360" fill="url(#robo-grid)" />

            {/* Track Line */}
            <path d="M 50 180 C 150 100 250 260 350 180 C 450 100 520 220 580 180" fill="none" stroke="#1e293b" strokeWidth="32" strokeLinecap="round" />
            <path d="M 50 180 C 150 100 250 260 350 180 C 450 100 520 220 580 180" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />

            {/* Robot Blueprint */}
            <g transform="translate(290, 130) rotate(-18)">
              <rect x="-60" y="-80" width="120" height="160" rx="16" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <rect x="-78" y="-30" width="16" height="60" rx="4" fill="#2596be" stroke="#ffffff" strokeWidth="1.5" />
              <rect x="62" y="-30" width="16" height="60" rx="4" fill="#2596be" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="0" cy="-60" r="12" fill="#ffffff" />
              <rect x="-35" y="-15" width="70" height="55" rx="4" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
              <text x="0" y="20" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ATMEGA328P</text>
              <rect x="-25" y="48" width="50" height="24" rx="3" fill="#2596be" stroke="#ffffff" />
              <text x="0" y="63" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">H-BRIDGE</text>

              {/* IR Array */}
              <g transform="translate(0, -92)">
                <rect x="-55" y="0" width="110" height="14" rx="3" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                {[-40, -20, 0, 20, 40].map((xPos, idx) => (
                  <circle key={idx} cx={xPos} cy="7" r="3.5" fill={idx === 2 ? '#2596be' : '#000000'} />
                ))}
              </g>
            </g>

            {/* HUD */}
            <g transform="translate(60, 50)">
              <rect x="0" y="0" width="160" height="60" rx="6" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <text x="12" y="20" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">PID AUTONOMOUS TRACK</text>
              <text x="12" y="38" fill="#ffffff" fontSize="8" fontFamily="monospace">IR STATE: [ 0 0 1 0 0 ]</text>
              <text x="12" y="52" fill="#2596be" fontSize="8" fontFamily="monospace" fontWeight="bold">SPEED: 180 PWM | CENTER</text>
            </g>
          </svg>
        );

      case 'smart-home-automation':
        return (
          <svg viewBox="0 0 600 360" width="100%" height="100%" style={{ display: 'block', background: '#000000' }}>
            {/* Floor Plan Geometry */}
            <g stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" fill="none">
              <polygon points="300,50 520,160 300,270 80,160" />
              <polygon points="300,90 460,170 300,250 140,170" />
              <line x1="300" y1="90" x2="300" y2="250" />
              <line x1="220" y1="130" x2="380" y2="210" />
            </g>

            {/* Central Node */}
            <g transform="translate(300, 160)">
              <circle cx="0" cy="0" r="32" fill="#2596be" stroke="#ffffff" strokeWidth="2" />
              <circle cx="0" cy="0" r="48" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
              <text x="0" y="-5" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ESP32</text>
              <text x="0" y="10" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">WI-FI HUB</text>
            </g>

            {/* Peripheral Nodes */}
            <g transform="translate(160, 100)">
              <circle cx="0" cy="0" r="22" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="36" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">LIGHTS: ON</text>
              <line x1="22" y1="12" x2="110" y2="50" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>

            <g transform="translate(440, 100)">
              <circle cx="0" cy="0" r="22" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="36" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">HVAC: 23°C</text>
              <line x1="-20" y1="15" x2="-110" y2="50" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>

            <g transform="translate(180, 260)">
              <circle cx="0" cy="0" r="22" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="36" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">PIR MOTION</text>
              <line x1="18" y1="-15" x2="95" y2="-75" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>

            <g transform="translate(420, 260)">
              <circle cx="0" cy="0" r="22" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="36" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">RELAY: 142W</text>
              <line x1="-18" y1="-15" x2="-95" y2="-75" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          </svg>
        );

      case 'renewable-energy-model':
        return (
          <svg viewBox="0 0 600 360" width="100%" height="100%" style={{ display: 'block', background: '#000000' }}>
            {/* Sun Rays */}
            <g transform="translate(90, 80)">
              <circle cx="0" cy="0" r="24" fill="#ffffff" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <line key={i} x1="0" y1="0" x2="38" y2="0" stroke="#ffffff" strokeWidth="2" transform={`rotate(${angle})`} />
              ))}
            </g>

            {/* Solar Panel */}
            <g transform="translate(100, 170) rotate(-15)">
              <polygon points="0,0 120,-30 140,50 20,80" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
              <line x1="30" y1="-8" x2="50" y2="72" stroke="#ffffff" strokeWidth="1" />
              <line x1="60" y1="-15" x2="80" y2="65" stroke="#ffffff" strokeWidth="1" />
              <line x1="90" y1="-22" x2="110" y2="58" stroke="#ffffff" strokeWidth="1" />
              <line x1="60" y1="70" x2="60" y2="120" stroke="#ffffff" strokeWidth="4" />
            </g>

            {/* Wind Turbine */}
            <g transform="translate(480, 150)">
              <polygon points="-8,140 8,140 4,0 -4,0" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="10" fill="#ffffff" />
              <g transform="rotate(35)">
                <ellipse cx="0" cy="-55" rx="5" ry="50" fill="#2596be" stroke="#ffffff" strokeWidth="1.5" />
                <ellipse cx="48" cy="28" rx="5" ry="50" transform="rotate(120, 48, 28)" fill="#2596be" stroke="#ffffff" strokeWidth="1.5" />
                <ellipse cx="-48" cy="28" rx="5" ry="50" transform="rotate(240, -48, 28)" fill="#2596be" stroke="#ffffff" strokeWidth="1.5" />
              </g>
            </g>

            {/* Central MPPT Controller */}
            <g transform="translate(250, 130)">
              <rect x="0" y="0" width="120" height="85" rx="6" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <text x="60" y="24" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CHARGE CONTROLLER</text>
              <rect x="15" y="35" width="90" height="22" rx="3" fill="#2596be" />
              <text x="60" y="50" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">GEN: 18.4 W</text>
              <text x="60" y="74" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">12V BATTERY</text>
            </g>

            <path d="M 190 220 L 250 180" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 3" />
            <path d="M 480 200 L 370 180" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 3" />
            <path d="M 310 215 L 310 270" stroke="#2596be" strokeWidth="2" strokeDasharray="4 3" />

            {/* Battery Bank */}
            <g transform="translate(260, 270)">
              <rect x="0" y="0" width="100" height="50" rx="6" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <rect x="10" y="10" width="80" height="30" rx="3" fill="#1e293b" />
              <rect x="10" y="10" width="65" height="30" rx="3" fill="#2596be" />
              <text x="50" y="30" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">82 %</text>
            </g>
          </svg>
        );

      case 'rain-simulation-model':
        return (
          <svg viewBox="0 0 600 360" width="100%" height="100%" style={{ display: 'block', background: '#000000' }}>
            {/* Storm Cloud */}
            <g transform="translate(200, 80)">
              <path d="M 100 0 Q 0 50 100 100 Q 200 50 300 0 Q 500 50 500 100 Q 600 50 500 0 Q 400 50 300 100 Q 200 50 100 100 Z" fill="#1e3a82" />
              <path d="M 150 20 Q 100 50 200 80 Q 300 20 300 80" fill="#1e3a82" opacity="0.7" />
            </g>

            {/* Rain Drops - Row 1 */}
            <g transform="translate(50, 150)">
              <line x1={0} y1={0} x2={-10} y2={20} stroke="#1d4ed8" strokeWidth={2} opacity={0.8} />
              <line x1={20} y1={0} x2={10} y2={35} stroke="#1d4ed8" strokeWidth={2} opacity={0.7} />
              <line x1={40} y1={0} x2={30} y2={25} stroke="#1d4ed8" strokeWidth={1.5} opacity={0.6} />
              <line x1={60} y1={0} x2={50} y2={30} stroke="#1d4ed8" strokeWidth={1.5} opacity={0.5} />
              <line x1={80} y1={0} x2={70} y2={22} stroke="#1d4ed8" strokeWidth={1} opacity={0.4} />
            </g>

            {/* Rain Drops - Row 2 */}
            <g transform="translate(50, 200)">
              <line x1={0} y1={0} x2={-8} y2={15} stroke="#1d4ed8" strokeWidth={1.5} opacity={0.6} />
              <line x1={18} y1={0} x2={10} y2={25} stroke="#1d4ed8" strokeWidth={1.5} opacity={0.5} />
              <line x1={36} y1={0} x2={28} y2={22} stroke="#1d4ed8" strokeWidth={1} opacity={0.4} />
              <line x1={54} y1={0} x2={45} y2={20} stroke="#1d4ed8" strokeWidth={1} opacity={0.3} />
              <line x1={72} y1={0} x2={63} y2={18} stroke="#1d4ed8" strokeWidth={1} opacity={0.3} />
            </g>

            {/* Rain Drops - Row 3 */}
            <g transform="translate(50, 250)">
              <line x1={0} y1={0} x2={-5} y2={12} stroke="#1d4ed8" strokeWidth={1} opacity={0.4} />
              <line x1={15} y1={0} x2={10} y2={18} stroke="#1d4ed8" strokeWidth={1} opacity={0.3} />
              <line x1={30} y1={0} x2={25} y2={15} stroke="#1d4ed8" strokeWidth={0.5} opacity={0.25} />
              <line x1={45} y1={0} x2={40} y2={12} stroke="#1d4ed8" strokeWidth={0.5} opacity={0.2} />
            </g>

            {/* Ground Reflection */}
            <rect width="600" height="40" fill="#0f172a" opacity="0.3" />

            {/* Rain Intensity Label */}
            <text x="300" y="340" textAnchor="middle" fill="#93c5fd" fontSize="14" fontFamily="monospace">Rain Simulation</text>
          </svg>
        );

      case 'school-radio':
        return (
          <svg viewBox="0 0 600 360" width="100%" height="100%" style={{ display: 'block', background: '#000000' }}>
            {/* Radio Body */}
            <rect x="50" y="80" width="500" height="200" rx="8" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />

            {/* Tuning Dial */}
            <circle cx="300" cy="160" r="40" fill="#000000" stroke="#ffffff" strokeWidth="2" />
            <circle cx="300" cy="160" r="30" fill="none" stroke="#10b981" strokeWidth="2" />
            <line x1="300" y1="40" x2="300" y2="280" stroke="#10b981" strokeWidth="1" />
            <circle cx="300" cy="40" r="8" fill="#10b981" />
            <circle cx="300" cy="280" r="8" fill="#10b981" />

            {/* Antenna */}
            <line x1="300" y1="80" x2="300" y2="30" stroke="#10b981" strokeWidth="2" />
            <line x1="295" y1="25" x2="305" y2="25" stroke="#10b981" strokeWidth="1" />
            <line x1="290" y1="20" x2="310" y2="20" stroke="#10b981" strokeWidth="1" />

            {/* Speaker */}
            <rect x="200" y="200" width="200" height="80" rx="6" fill="#000000" stroke="#10b981" strokeWidth="1.5" />
            <text x="300" y="240" textAnchor="middle" fill="#10b981" fontSize="14" fontFamily="monospace">LIVE</text>

            {/* Microphone */}
            <g transform="translate(100, 260)">
              <path d="M 0 0 Q 20 0 30 20 Q 20 40 0 40 Z" fill="#10b981" />
              <ellipse cx="15" cy="5" rx="5" ry="2" fill="#10b981" />
            </g>

            {/* Call Sign */}
            <text x="300" y="320" textAnchor="middle" fill="#93c5fd" fontSize="12" fontFamily="monospace">GPS RADIO</text>

            {/* Signal Strength */}
            <g transform="translate(500, 160)">
              <circle cx="0" cy="0" r="12" fill="#000000" stroke="#10b981" strokeWidth="2" />
              <circle cx="0" cy="0" r="6" fill="#10b981" />
              <line x1="-12" y1="0" x2="-20" y2="0" stroke="#10b981" strokeWidth="1" />
              <text x="-25" y="0" fill="#93c5fd" fontSize="9" fontFamily="monospace">STRONG</text>
            </g>
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 600 360" width="100%" height="100%" style={{ display: 'block', background: '#000000' }}>
            <rect width="600" height="360" fill="#000000" />
            <circle cx="300" cy="180" r="60" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 4" />
            <text x="300" y="185" fill="#ffffff" fontSize="14" fontFamily="monospace" textAnchor="middle">{title}</text>
          </svg>
        );
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: isHero ? '21/9' : '16/10',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '2px solid #000000',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        ...style
      }}
    >
      {renderVisual()}
    </div>
  );
}
