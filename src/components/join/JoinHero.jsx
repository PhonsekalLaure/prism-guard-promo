import Scene3D from '../3d/Scene3D';

export default function JoinHero() {
  return (
    <section className="services-hero join-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      <div className="hero-3d-graphic">
        <Scene3D objectType="badge" />
      </div>

      <div className="services-hero-content">
        <div className="status-badge">
          <span className="mono">RECRUITMENT STATUS:</span>{' '}
          <span className="online">&bull; OPEN</span>
        </div>
        <h1>
          BE PART OF<br />
          <span className="gold">PRAISE SECURITY</span>
        </h1>
        <p className="hero-desc">
          // BEGIN YOUR APPLICATION TODAY<br />
          // SCHEDULE A SITE SECURITY BOOKING<br />
          // SERVE WITH DISCIPLINE AND PURPOSE
        </p>
      </div>
    </section>
  );
}

