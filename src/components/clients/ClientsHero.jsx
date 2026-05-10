/* Single guard silhouette — rendered as inline SVG, cloned via CSS */
function GuardSilhouette({ style }) {
  return (
    <svg
      viewBox="0 0 40 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className="guard-figure"
    >
      {/* Head */}
      <circle cx="20" cy="10" r="7" fill="var(--gold)" opacity="0.55" />
      {/* Helmet brim */}
      <rect x="11" y="13" width="18" height="3" rx="1" fill="var(--gold)" opacity="0.4" />
      {/* Torso */}
      <rect x="13" y="20" width="14" height="20" rx="2" fill="var(--gold)" opacity="0.35" />
      {/* Belt */}
      <rect x="13" y="36" width="14" height="3" rx="1" fill="var(--gold)" opacity="0.5" />
      {/* Left arm */}
      <rect x="6"  y="21" width="6"  height="16" rx="2" fill="var(--gold)" opacity="0.3" />
      {/* Right arm */}
      <rect x="28" y="21" width="6"  height="16" rx="2" fill="var(--gold)" opacity="0.3" />
      {/* Left leg */}
      <rect x="13" y="42" width="6"  height="22" rx="2" fill="var(--gold)" opacity="0.35" />
      {/* Right leg */}
      <rect x="21" y="42" width="6"  height="22" rx="2" fill="var(--gold)" opacity="0.35" />
      {/* Boot left */}
      <rect x="11" y="60" width="9"  height="5"  rx="1" fill="var(--gold)" opacity="0.45" />
      {/* Boot right */}
      <rect x="20" y="60" width="9"  height="5"  rx="1" fill="var(--gold)" opacity="0.45" />
    </svg>
  );
}

/* A single row that loops endlessly */
function MarchingRow({ duration, offsetY, opacity, delay }) {
  const guards = Array.from({ length: 14 });
  return (
    <div
      className="march-row"
      style={{ bottom: offsetY, opacity, animationDuration: duration, animationDelay: delay }}
    >
      {/* Duplicate guards so the loop is seamless */}
      {[...guards, ...guards].map((_, i) => (
        <GuardSilhouette
          key={i}
          style={{ animationDelay: `${(i % 14) * 0.12}s` }}
        />
      ))}
    </div>
  );
}

export default function ClientsHero() {
  return (
    <section className="services-hero clients-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      {/* Marching guard silhouettes */}
      <div className="march-stage" aria-hidden="true">
        <MarchingRow duration="28s" offsetY="0px"   opacity={0.55} delay="0s" />
        <MarchingRow duration="36s" offsetY="36px"  opacity={0.3}  delay="-8s" />
        <MarchingRow duration="22s" offsetY="68px"  opacity={0.15} delay="-4s" />
      </div>

      {/* Fade gradient at bottom so guards fade into page */}
      <div className="march-fade" />

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
