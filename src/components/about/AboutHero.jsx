import Scene3D from '../3d/Scene3D';

export default function AboutHero() {
  return (
    <section className="services-hero about-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      <div className="hero-3d-graphic">
        <Scene3D objectType="prism" />
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

