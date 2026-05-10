export default function ServicesHero() {
  return (
    <section className="services-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      {/* Realistic tactical scope graphic */}
      <div className="scope-graphic">
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer housing ring */}
          <circle cx="150" cy="150" r="138" stroke="var(--gold)" strokeWidth="3" opacity="0.25" />
          <circle cx="150" cy="150" r="134" stroke="var(--gold)" strokeWidth="0.5" opacity="0.15" />

          {/* Main reticle ring */}
          <circle cx="150" cy="150" r="110" stroke="var(--gold)" strokeWidth="2" opacity="0.55" />

          {/* Inner mil-dot ring */}
          <circle cx="150" cy="150" r="72" stroke="var(--gold)" strokeWidth="1" opacity="0.35" />

          {/* Innermost precision ring */}
          <circle cx="150" cy="150" r="36" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />

          {/* Center dot */}
          <circle cx="150" cy="150" r="3" fill="var(--gold)" opacity="1" />
          <circle cx="150" cy="150" r="6" stroke="var(--gold)" strokeWidth="1" opacity="0.6" fill="none" />

          {/* Primary crosshairs — full length with gap at center */}
          <line x1="150" y1="12"  x2="150" y2="114" stroke="var(--gold)" strokeWidth="1.5" opacity="0.7" />
          <line x1="150" y1="186" x2="150" y2="288" stroke="var(--gold)" strokeWidth="1.5" opacity="0.7" />
          <line x1="12"  y1="150" x2="114" y2="150" stroke="var(--gold)" strokeWidth="1.5" opacity="0.7" />
          <line x1="186" y1="150" x2="288" y2="150" stroke="var(--gold)" strokeWidth="1.5" opacity="0.7" />

          {/* Horizontal ranging ladder (below center) */}
          {[-60,-48,-36,-24,-12,12,24,36,48,60].map((offset, i) => {
            const len = i % 5 === 4 ? 12 : (Math.abs(offset) === 12 || Math.abs(offset) === 24 ? 8 : 5);
            return (
              <line
                key={`h${i}`}
                x1={150 + offset} y1={150 + 40}
                x2={150 + offset} y2={150 + 40 + len}
                stroke="var(--gold)" strokeWidth="1" opacity="0.4"
              />
            );
          })}

          {/* Vertical ranging ladder (right of center) */}
          {[-60,-48,-36,-24,-12,12,24,36,48,60].map((offset, i) => {
            const len = i % 5 === 4 ? 12 : (Math.abs(offset) === 12 || Math.abs(offset) === 24 ? 8 : 5);
            return (
              <line
                key={`v${i}`}
                x1={150 + 40} y1={150 + offset}
                x2={150 + 40 + len} y2={150 + offset}
                stroke="var(--gold)" strokeWidth="1" opacity="0.4"
              />
            );
          })}

          {/* Mil-dot positions on main ring — 12 positions */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x = 150 + 72 * Math.cos(rad);
            const y = 150 + 72 * Math.sin(rad);
            return (
              <circle key={`md${i}`} cx={x} cy={y} r="2.5" fill="var(--gold)" opacity="0.5" />
            );
          })}

          {/* Clock-position tick marks on main reticle ring */}
          {Array.from({ length: 72 }).map((_, i) => {
            const deg = i * 5;
            const rad = (deg * Math.PI) / 180;
            const isMajor = i % 6 === 0;
            const isMed = i % 3 === 0;
            const inner = isMajor ? 95 : isMed ? 98 : 101;
            const outer = 110;
            return (
              <line
                key={`tick${i}`}
                x1={150 + inner * Math.cos(rad)} y1={150 + inner * Math.sin(rad)}
                x2={150 + outer * Math.cos(rad)} y2={150 + outer * Math.sin(rad)}
                stroke="var(--gold)"
                strokeWidth={isMajor ? 1.5 : isMed ? 1 : 0.5}
                opacity={isMajor ? 0.65 : isMed ? 0.4 : 0.2}
              />
            );
          })}

          {/* Cardinal direction markers */}
          <text x="150" y="30" textAnchor="middle" fill="var(--gold)" fontSize="10"
            fontFamily="monospace" opacity="0.5" letterSpacing="2">N</text>
          <text x="150" y="280" textAnchor="middle" fill="var(--gold)" fontSize="10"
            fontFamily="monospace" opacity="0.5" letterSpacing="2">S</text>
          <text x="280" y="155" textAnchor="middle" fill="var(--gold)" fontSize="10"
            fontFamily="monospace" opacity="0.5" letterSpacing="2">E</text>
          <text x="20" y="155" textAnchor="middle" fill="var(--gold)" fontSize="10"
            fontFamily="monospace" opacity="0.5" letterSpacing="2">W</text>

          {/* Corner bracket accents */}
          <path d="M 35 35 L 35 55 M 35 35 L 55 35" stroke="var(--gold)" strokeWidth="2" opacity="0.4" />
          <path d="M 265 35 L 265 55 M 265 35 L 245 35" stroke="var(--gold)" strokeWidth="2" opacity="0.4" />
          <path d="M 35 265 L 35 245 M 35 265 L 55 265" stroke="var(--gold)" strokeWidth="2" opacity="0.4" />
          <path d="M 265 265 L 265 245 M 265 265 L 245 265" stroke="var(--gold)" strokeWidth="2" opacity="0.4" />
        </svg>
      </div>

      <div className="services-hero-content">
        <div className="status-badge">
          <span className="mono">SYSTEM STATUS:</span>{' '}
          <span className="online">● ONLINE</span>
        </div>
        <h1>
          TACTICAL <span className="gold">DEPLOYMENT</span><br />
          SOLUTIONS
        </h1>
        <p className="hero-desc">
          // MAXIMUM SECURITY FOR LIVES AND ASSETS<br />
          // 24/7 COMMAND CENTER OPERATIONS<br />
          // ELITE PERSONNEL. PROVEN PROTOCOLS.
        </p>
      </div>
    </section>
  );
}
