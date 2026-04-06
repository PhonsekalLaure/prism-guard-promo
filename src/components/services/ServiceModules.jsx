export default function ServiceModules() {
  return (
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
  );
}
