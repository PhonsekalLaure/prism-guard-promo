import Scene3D from '../3d/Scene3D';

export default function ContactHero() {
  return (
    <section className="services-hero contact-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      <div className="hero-3d-graphic">
        <Scene3D objectType="walkie" />
      </div>

      <div className="services-hero-content">
        <div className="status-badge">
          <span className="mono">SYSTEM STATUS:</span>{' '}
          <span className="online">ONLINE</span>
        </div>
        <h1>
          CONTACT<br />
          <span className="gold">PRAISE SECURITY</span>
        </h1>
        <p className="hero-desc">
          // PARANAQUE CITY, METRO MANILA<br />
          // AVAILABLE MONDAY - SATURDAY<br />
          // REACH US AT (02) 8299-344
        </p>
      </div>
    </section>
  );
}

