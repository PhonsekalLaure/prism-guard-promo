export default function AboutHero() {
  return (
    <section className="services-hero about-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      {/* Decorative layered hex rings — right side */}
      <div className="about-hero-deco" aria-hidden="true">
        <svg viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Outer hex */}
          <polygon
            points="130,10 240,67 240,193 130,250 20,193 20,67"
            stroke="var(--gold)" strokeWidth="1.5" opacity="0.2" fill="none"
          />
          {/* Mid hex */}
          <polygon
            points="130,38 212,83 212,177 130,222 48,177 48,83"
            stroke="var(--gold)" strokeWidth="1" opacity="0.3" fill="none"
          />
          {/* Inner hex */}
          <polygon
            points="130,72 192,107 192,177 130,212 68,177 68,107"
            stroke="var(--gold)" strokeWidth="1.5" opacity="0.2" fill="none"
          />
          {/* Center hex filled */}
          <polygon
            points="130,108 162,126 162,162 130,180 98,162 98,126"
            stroke="var(--gold)" strokeWidth="2" opacity="0.4" fill="rgba(230,178,21,0.05)"
          />
          {/* Center dot */}
          <circle cx="130" cy="144" r="4" fill="var(--gold)" opacity="0.7" />
          {/* Corner ticks on outer hex */}
          {[
            [130,10],[240,67],[240,193],[130,250],[20,193],[20,67]
          ].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="var(--gold)" opacity="0.4" />
          ))}
        </svg>
      </div>

      <div className="services-hero-content">
        <div className="status-badge">
          <span className="mono">SYSTEM STATUS:</span>{' '}
          <span className="online">● ONLINE</span>
        </div>
        <h1>
          THE <span className="gold">PRAISE SECURITY</span><br />
          PROFILE
        </h1>
        <p className="hero-desc">
          // FOUNDED IN SERVICE. BUILT ON DISCIPLINE.<br />
          // OVER TWO DECADES OF PROTECTION<br />
          // SECURING WHAT MATTERS MOST
        </p>
      </div>
    </section>
  );
}
