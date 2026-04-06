export default function ServicesHero() {
  return (
    <section className="services-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-overlay" />
      <div className="services-hero-bottom-bar" />

      {/* Crosshair scope graphic */}
      <div className="scope-graphic">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" stroke="var(--gold)" strokeWidth="2" opacity="0.6" />
          <circle cx="100" cy="100" r="55" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="100" r="4" fill="var(--gold)" opacity="0.8" />
          <line x1="100" y1="10" x2="100" y2="60" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
          <line x1="100" y1="140" x2="100" y2="190" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
          <line x1="10" y1="100" x2="60" y2="100" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
          <line x1="140" y1="100" x2="190" y2="100" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
          {/* Diagonal ticks */}
          <line x1="35" y1="35" x2="55" y2="55" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
          <line x1="145" y1="35" x2="165" y2="55" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
          <line x1="35" y1="165" x2="55" y2="145" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
          <line x1="145" y1="165" x2="165" y2="145" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
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
          // DEPLOYING ELITE MANPOWER<br />
          // INTEGRATING PRISM-GUARD REAL-TIME TRACKING<br />
          // SECURING ASSETS 24/7
        </p>
      </div>
    </section>
  );
}
