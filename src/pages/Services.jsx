export default function Services() {
  return (
    <>
      {/* ===== SERVICES HERO ===== */}
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

      {/* ===== ACTIVE SERVICE MODULES ===== */}
      <section className="services-modules">
        <div className="container">
          <div className="section-title">
            <h2>ACTIVE SERVICE MODULES</h2>
            <div className="section-title-underline" />
          </div>

          <div className="modules-grid">
            {/* Event Security */}
            <div className="module-card">
              <div className="module-image">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
                  alt="Event Security"
                />
                <div className="module-image-badge" />
              </div>
              <div className="module-body">
                <h3 className="module-title">EVENT SECURITY</h3>
                <p className="module-desc">
                  Scalable manpower for concerts, conferences, and public gatherings. 
                  Focus on crowd management and entry screening.
                </p>
                <ul className="module-features">
                  <li>&gt; Crowd Density Management</li>
                  <li>&gt; VIP Access Control</li>
                  <li>&gt; Conflict De-escalation</li>
                </ul>
              </div>
            </div>

            {/* VIP Security */}
            <div className="module-card">
              <div className="module-image">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop"
                  alt="VIP Security"
                />
                <div className="module-image-badge" />
              </div>
              <div className="module-body">
                <h3 className="module-title">VIP SECURITY</h3>
                <p className="module-desc">
                  Scalable manpower for concerts, conferences, and public gatherings. 
                  Focus on crowd management and entry screening.
                </p>
                <ul className="module-features">
                  <li>&gt; Crowd Density Management</li>
                  <li>&gt; VIP Access Control</li>
                  <li>&gt; Conflict De-escalation</li>
                </ul>
              </div>
            </div>

            {/* Surveillance Security */}
            <div className="module-card">
              <div className="module-image">
                <img
                  src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800&auto=format&fit=crop"
                  alt="Surveillance Security"
                />
                <div className="module-image-badge" />
              </div>
              <div className="module-body">
                <h3 className="module-title">SURVEILLANCE SECURITY</h3>
                <p className="module-desc">
                  Scalable manpower for concerts, conferences, and public gatherings. 
                  Focus on crowd management and entry screening.
                </p>
                <ul className="module-features">
                  <li>&gt; Crowd Density Management</li>
                  <li>&gt; VIP Access Control</li>
                  <li>&gt; Conflict De-escalation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRISM-GUARD ADVANTAGE ===== */}
      <section className="advantage-section">
        <div className="container">
          <div className="advantage-grid">
            <div className="advantage-text">
              <h2>
                THE PRISM-GUARD<br />
                <span className="gold advantage-italic">ADVANTAGE</span>
              </h2>
              <p className="advantage-desc">
                Our deployed units are not isolated. They are connected to the 
                PRISM-GUARD Neural Network. Using our proprietary mobile 
                application, we provide clients with:
              </p>
              <ul className="advantage-features">
                <li>&gt; Crowd Density Management</li>
                <li>&gt; VIP Access Control</li>
                <li>&gt; Conflict De-escalation</li>
              </ul>
              <div className="advantage-buttons">
                <a href="#" className="btn-primary">BOOK NOW</a>
                <a href="#" className="btn-outline-gold">APPLY NOW</a>
              </div>
            </div>
            <div className="advantage-image">
              <img
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=800&auto=format&fit=crop"
                alt="Security Personnel"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
