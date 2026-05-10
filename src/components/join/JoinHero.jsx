export default function JoinHero() {
  return (
    <section className="services-hero join-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      {/* Decorative shield silhouette */}
      <div className="join-hero-deco" aria-hidden="true">
        <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          {/* Outer shield */}
          <path
            d="M100 10 L185 45 L185 120 C185 170 100 225 100 225 C100 225 15 170 15 120 L15 45 Z"
            stroke="var(--gold)" strokeWidth="1.5" opacity="0.18" fill="none"
          />
          {/* Mid shield */}
          <path
            d="M100 30 L165 60 L165 118 C165 158 100 200 100 200 C100 200 35 158 35 118 L35 60 Z"
            stroke="var(--gold)" strokeWidth="1" opacity="0.28" fill="rgba(230,178,21,0.03)"
          />
          {/* Inner shield */}
          <path
            d="M100 55 L145 78 L145 116 C145 146 100 172 100 172 C100 172 55 146 55 116 L55 78 Z"
            stroke="var(--gold)" strokeWidth="1.5" opacity="0.22" fill="none"
          />
          {/* Center star */}
          <polygon
            points="100,88 105,103 121,103 108,112 113,128 100,119 87,128 92,112 79,103 95,103"
            fill="var(--gold)" opacity="0.35"
          />
          {/* Corner dots */}
          {[[100,10],[185,45],[185,120],[100,225],[15,120],[15,45]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="var(--gold)" opacity="0.3" />
          ))}
        </svg>
      </div>

      <div className="services-hero-content">
        <div className="status-badge">
          <span className="mono">RECRUITMENT STATUS:</span>{' '}
          <span className="online">● OPEN</span>
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
