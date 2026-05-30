import Scene3D from '../3d/Scene3D';

export default function ClientsHero() {
  return (
    <section className="services-hero clients-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      <div className="hero-3d-graphic">
        <Scene3D objectType="globe" />
      </div>

      <div className="services-hero-content">
        <div className="status-badge">
          <span className="mono">SYSTEM STATUS:</span>{' '}
          <span className="online">● ONLINE</span>
        </div>
        <h1>
          OUR <span className="gold">TRUSTED</span><br />
          PARTNERS
        </h1>
        <p className="hero-desc">
          // COMPANIES UNDER ACTIVE PRISM-GUARD PROTECTION<br />
          // ASSET SECURITY. PEACE OF MIND. 24/7.<br />
          // EACH CLIENT — A COMMITMENT FULFILLED
        </p>
      </div>
    </section>
  );
}

