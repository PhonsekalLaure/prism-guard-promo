import { useEffect, useRef, useState } from 'react';
import { Building2, ShieldHalf } from 'lucide-react';

const portals = [
  {
    tag: '>> PORTAL_001: CLIENT',
    icon: Building2,
    title: 'I WANT TO HIRE SECURITY',
    desc: 'Book a consultation and let us design a security deployment plan tailored to your site, operations, and risk profile.',
    steps: [
      { num: '01', label: 'Schedule Site Analysis' },
      { num: '02', label: 'Request Quotation' },
      { num: '03', label: 'Deploy Units' },
    ],
    btnLabel: 'BOOK NOW',
    btnAction: 'onBookNow',
  },
  {
    tag: '>> PORTAL_002: RECRUIT',
    icon: ShieldHalf,
    title: 'JOIN THE FORCE',
    desc: 'Apply to become a certified Praise Security guard. We train, equip, and deploy qualified individuals who are ready to serve.',
    steps: [
      { num: '01', label: 'Submit Credentials' },
      { num: '02', label: 'Background Check' },
      { num: '03', label: 'Begin Deployment' },
    ],
    btnLabel: 'APPLY NOW',
    btnAction: 'onApplyNow',
  },
];

export default function ApplicationProcess({ onBookNow, onApplyNow }) {
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

  const handlers = { onBookNow, onApplyNow };

  return (
    <section className="portal-section" ref={ref}>
      {/* Ambient orbs */}
      <div className="portal-orb portal-orb--left" />
      <div className="portal-orb portal-orb--right" />

      <div className="container">
        <div
          className="section-title"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <h2>GET STARTED WITH PRAISE SECURITY</h2>
          <div className="section-title-underline" />
          <p className="section-subtitle portal-subtitle">
            Select the portal that matches your purpose.
          </p>
        </div>

        <div className="portal-grid">
          {portals.map(({ tag, icon: Icon, title, desc, steps, btnLabel, btnAction }, i) => (
            <div
              key={tag}
              className="portal-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(36px)',
                transition: `all 0.6s ease ${0.2 + i * 0.15}s`,
              }}
            >
              {/* Card top accent stripe */}
              <div className="portal-card-stripe" />

              {/* Header: icon + tag */}
              <div className="portal-card-top">
                <div className="portal-icon-wrap">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <span className="portal-tag">{tag}</span>
              </div>

              {/* Title + desc */}
              <h3 className="portal-title">{title}</h3>
              <p className="portal-desc">{desc}</p>

              {/* Numbered steps */}
              <div className="portal-steps">
                {steps.map((step) => (
                  <div key={step.num} className="portal-step">
                    <span className="portal-step-num">{step.num}</span>
                    <span className="portal-step-label">{step.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className="portal-btn"
                onClick={handlers[btnAction]}
              >
                {btnLabel} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
