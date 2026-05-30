import Scene3D from '../3d/Scene3D';

export default function ServicesHero() {
  return (
    <section className="services-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      <div className="hero-3d-graphic">
        <Scene3D objectType="shield" />
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

