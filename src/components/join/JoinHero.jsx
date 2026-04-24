import React from 'react';

export default function JoinHero() {
  return (
    <section className="join-hero">
      <div className="join-hero-container">
        <div className="system-status">
          <span className="label">SYSTEM STATUS:</span>
          <span className="status">ONLINE</span>
        </div>

        <div className="join-hero-text">
          <h1>
            BE PART OF
            <span className="gold-glow">PRAISE SECURITY</span>
          </h1>
        </div>

        <div className="join-hero-desc-container">
          <div className="join-hero-desc-line" />
          <div className="join-hero-desc">
            // DEPLOYING ELITE MANPOWER<br />
            // INTEGRATING PRISM-GUARD REAL-TIME TRACKING<br />
            // SECURING ASSETS 24/7
          </div>
        </div>
      </div>
    </section>
  );
}
