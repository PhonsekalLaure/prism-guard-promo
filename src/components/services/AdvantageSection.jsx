import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    label: 'OUR PEOPLE',
    body: 'Professionally managed personnel with aggressive yet enlightened leadership. Guards undergo rigorous psychological screening, law enforcement clearance, and full re-training before every deployment — all at no charge to the client.',
  },
  {
    label: 'OUR OPERATIONS',
    body: 'A 24/7 headquarters backed by a Night Inspector assigned to daily guard rounds. Monthly client evaluations ensure every guard meets your expectations — and we realign our training programs accordingly.',
  },
];

export default function AdvantageSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="advantage-section" ref={ref}>
      <div className="container">

        {/* ── Top: Advantage Split ── */}
        <div
          className="advantage-grid"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          {/* Text side */}
          <div className="advantage-text">
            <span className="advantage-eyebrow">// THE PRISM-GUARD APPROACH</span>
            <h2>
              PROTECTION WITH<br />
              <span className="gold">PRECISION.</span>
            </h2>
            <p className="advantage-desc">
              We don't just deploy guards — we deliver a Comprehensive Security Plan that maps every phase of operations before a single unit is stationed. Our goal is a seamless, harmonious collaboration between your staff and our personnel.
            </p>

            <div className="advantage-buttons">
              <Link to="/join-the-force?form=booking" className="btn-primary">BOOK SECURITY</Link>
              <Link to="/join-the-force?form=application" className="btn-outline-gold">ENLIST AS GUARD</Link>
            </div>
          </div>

          {/* Image side */}
          <div className="advantage-image">
            <div className="advantage-image-frame">
              <img
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=900&auto=format&fit=crop"
                alt="Security Personnel"
              />
              <div className="advantage-image-overlay" />
            </div>
            {/* Floating stat chip */}
            <div className="advantage-stat-chip">
              <span className="chip-num">24/7</span>
              <span className="chip-label">Command Center</span>
            </div>
          </div>
        </div>

        {/* ── Bottom: Our People & Operations pillars ── */}
        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className="pillar-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${0.3 + i * 0.15}s`,
              }}
            >
              <div className="pillar-label">{p.label}</div>
              <p className="pillar-body">{p.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
