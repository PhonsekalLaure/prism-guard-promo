import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const steps = [
  { num: '01', label: 'Schedule Site Analysis' },
  { num: '02', label: 'Request Quotation' },
  { num: '03', label: 'Deploy Units' },
];

const metrics = [
  { value: 'PNP', label: 'Licensed &\nAccredited' },
  { value: '100%', label: 'Pre-Deployment\nPlanning' },
  { value: 'ZERO', label: 'Tolerance for\nSecurity Gaps' },
];

export default function ReadyToSecure() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="secure-section" ref={ref}>
      <div className="secure-orb secure-orb--left" />
      <div className="secure-orb secure-orb--right" />

      <div className="container">
        <div
          className="secure-inner"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          {/* Left: text + steps */}
          <div className="secure-text">
            <span className="secure-eyebrow">// TAKE THE NEXT STEP</span>
            <h2>
              READY TO SECURE<br />
              YOUR <span className="gold">ASSETS?</span>
            </h2>
            <p className="secure-desc">
              Join the growing list of companies that trust Prism-Guard with their
              most critical assets. Our deployment process is fast, thorough, and
              built around your operations.
            </p>

            <div className="secure-steps">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className="secure-step"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease ${0.3 + i * 0.1}s`,
                  }}
                >
                  <span className="step-num">{step.num}</span>
                  <span className="step-label">{step.label}</span>
                </div>
              ))}
            </div>

            <div className="secure-actions">
              <Link to="/join-the-force?form=booking" className="btn-primary">
                BOOK SECURITY NOW
              </Link>
              <Link to="/contact" className="btn-outline-gold">
                CONTACT US FIRST
              </Link>
            </div>
          </div>

          {/* Right: highlight card */}
          <div className="secure-highlight">
            <div className="secure-highlight-inner">
              <div className="secure-stripe" />

              {/* Commitment headline */}
              <div className="secure-commitment">
                <span className="secure-commitment-tag">// THE PRISM-GUARD STANDARD</span>
                <p className="secure-commitment-text">
                  EVERY ASSET.<br />EVERY HOUR.
                </p>
              </div>

              <div className="secure-divider" />

              {/* 3-metric grid */}
              <div className="secure-metrics">
                {metrics.map((m, i) => (
                  <div
                    key={m.value}
                    className="secure-metric"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(16px)',
                      transition: `all 0.5s ease ${0.5 + i * 0.12}s`,
                    }}
                  >
                    <span className="metric-value">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="secure-divider" />

              <div className="secure-badge-row">
                <div className="secure-badge">LICENSED</div>
                <div className="secure-badge">INSURED</div>
                <div className="secure-badge">TRAINED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
