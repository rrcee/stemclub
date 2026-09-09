import React from 'react';

export default function ProjectVisual({ projectId, title, category, color = '#2596be', isHero = false, style = {} }) {
  const renderVisual = () => {
    switch (projectId) {
      case 'smart-irrigation-system':
        return (
          <svg viewBox="0 0 600 360" width="100%" height="100%" style={{ display: 'block', background: '#000000' }}>
            <defs>
              <pattern id="grid-patt" width="24" height="24" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="24" y2="0" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="24" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="600" height="360" fill="url(#grid-patt)" />

            {/* Soil Bed */}
            <rect x="40" y="210" width="520" height="110" rx="8" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />

            {/* Plant Stem & Leaves */}
            <path d="M 160 210 Q 155 140 170 110 Q 185 140 180 210 Z" fill="#2596be" stroke="#ffffff" strokeWidth="2" />
            <path d="M 165 150 C 130 140 120 120 125 110 C 145 115 160 135 165 150 Z" fill="#2596be" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M 168 135 C 200 125 215 105 210 95 C 190 100 175 120 168 135 Z" fill="#2596be" stroke="#ffffff" strokeWidth="1.5" />

            {/* Moisture Sensor Probe In Soil */}
            <g transform="translate(240, 160)">
              <rect x="0" y="0" width="36" height="50" rx="4" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <text x="18" y="24" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CAP</text>
              <text x="18" y="38" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">v1.2</text>
              <rect x="6" y="50" width="8" height="75" rx="3" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <rect x="22" y="50" width="8" height="75" rx="3" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <path d="M 18 0 C 18 -40 290 -20 340 30" fill="none" stroke="#2596be" strokeWidth="2" strokeDasharray="4 4" />
            </g>

            {/* ESP32 Controller Box */}
            <g transform="translate(340, 45)">
              <rect x="0" y="0" width="140" height="90" rx="8" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <rect x="10" y="10" width="120" height="30" rx="4" fill="#2596be" />
              <text x="70" y="28" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ESP32 CONTROLLER</text>
              <circle cx="25" cy="55" r="5" fill="#ffffff" />
              <text x="40" y="58" fill="#ffffff" fontSize="9" fontFamily="monospace">MCU: ACTIVE</text>
              <circle cx="25" cy="72" r="5" fill="#2596be" />
              <text x="40" y="75" fill="#ffffff" fontSize="9" fontFamily="monospace">VALVE: READY</text>
            </g>

            {/* Drip Irrigation Pipe */}
            <path d="M 50 175 L 550 175" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="160" cy="183" r="4" fill="#2596be" />
            <circle cx="260" cy="183" r="4" fill="#2596be" />

            {/* Telemetry Overlay Box */}
            <g transform="translate(50, 45)">
              <rect x="0" y="0" width="160" height="60" rx="6" fill="#000000" stroke="#ffffff" strokeWidth="2" />
              <text x="12" y="22" fill="#ffffff" fontSize="9" fontFamily="monospace">SOIL MOISTURE</text>
              <text x="12" y="46" fill="#ffffff" fontSize="20" fontFamily="monospace" fontWeight="bold">42.8 %</text>
              <text x="100" y="46" fill="#2596be" fontSize="10" fontFamily="monospace" fontWeight="bold">OPTIMAL</text>
            </g>
          </svg>
        );

      case 'weather-monitoring-station':
        return (
          <svg viewBox="0 0 600 360" width="100%" height="100%" style={{ display: 'block', background: '#000000' }}>
            <rect x="30" y="30" width="540" height="300" rx="10" fill="#000000" stroke="#ffffff" strokeWidth="2" />

            {/* Gauge 1: Temperature */}
            <g transform="translate(70, 70)">
              <rect x="0" y="0" width="130" height="110" rx="6" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
              <text x="15" y="25" fill="#ffffff" fontSize="9" fontFamily="monospace">TEMPERATURE</text>
              <text x="15" y="65" fill="#ffffff" fontSize="24" fontFamily="monospace" fontWeight="bold">27.4°C</text>
              <path d="M 15 85 L 115 85" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
              <path d="M 15 85 L 75 85" stroke="#2596be" strokeWidth="5" strokeLinecap="round" />
              <text x="15" y="100" fill="#ffffff" fontSize="8" fontFamily="monospace">DHT22 SENSOR</text>
            </g>

            {/* Gauge 2: Humidity */}
            <g transform="translate(235, 70)">
              <rect x="0" y="0" width="130" height="110" rx="6" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
              <text x="15" y="25" fill="#ffffff" fontSize="9" fontFamily="monospace">HUMIDITY</text>
              <text x="15" y="65" fill="#ffffff" fontSize="24" fontFamily="monospace" fontWeight="bold">68.2 %</text>
              <path d="M 15 85 L 115 85" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
              <path d="M 15 85 L 85 85" stroke="#2596be" strokeWidth="5" strokeLinecap="round" />
              <text x="15" y="100" fill="#ffffff" fontSize="8" fontFamily="monospace">STATUS: NORMAL</text>
            </g>

            {/* Gauge 3: Atmospheric Pressure */}
            <g transform="translate(400, 70)">
              <rect x="0" y="0" width="130" height="110" rx="6" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
              <text x="15" y="25" fill="#ffffff" fontSize="9" fontFamily="monospace">BAROMETER</text>
              <text x="15" y="65" fill="#ffffff" fontSize="18" fontFamily="monospace" fontWeight="bold">1013.8 hPa</text>
              <path d="M 15 85 L 115 85" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
              <path d="M 15 85 L 95 85" stroke="#2596be" strokeWidth="5" strokeLinecap="round" />
              <text x="15" y="100" fill="#ffffff" fontSize="8" fontFamily="monospace">BMP280 SENSOR</text>
            </g>

            {/* Oscillograph Waveform */}
            <g transform="translate(70, 205)">
              <rect x="0" y="0" width="460" height="100" rx="6" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
              <text x="15" y="22" fill="#ffffff" fontSize="9" fontFamily="monospace">TELEMETRY STREAM // 24-HOUR WAVEFORM</text>
              <line x1="15" y1="50" x2="445" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="15" y1="75" x2="445" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <path d="M 15 70 Q 60 50 120 60 T 220 45 T 320 55 T 445 48" fill="none" stroke="#2596be" strokeWidth="2.5" />
              <path d="M 15 50 Q 80 80 180 75 T 280 60 T 380 70 T 445 65" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          </svg>
        );

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
