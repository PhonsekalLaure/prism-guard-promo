import { useEffect, useRef, useState } from 'react';

const teamMembers = [
  {
    name: 'LT. COL. WILLY H. STA. ROMANA',
    role: 'President & General Manager',
    desc: 'AFP (CHS), founder of Praise Security. Over two decades of military and security leadership experience.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    tag: 'FOUNDER',
  },
  {
    name: 'OPERATIONS DIRECTOR',
    role: 'Chief of Operations',
    desc: 'Oversees all field deployments and ensures tactical readiness across all client sites nationwide.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    tag: 'OPERATIONS',
  },
  {
    name: 'ADMIN DIRECTOR',
    role: 'Head of Administration',
    desc: 'Manages personnel training, compliance, and the day-to-day administrative operations of the agency.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    tag: 'ADMINISTRATION',
  },
];

export default function PraiseFamily() {
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
    <section className="family-section" ref={ref}>
      <div className="family-orb family-orb--left" />
      <div className="family-orb family-orb--right" />
      <div className="container">
        <div
          className="section-title"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <h2>PRAISE FAMILY</h2>
          <div className="section-title-underline" />
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.45)' }}>
            The leadership behind every deployment.
          </p>
        </div>

        <div className="family-grid">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="family-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(36px)',
                transition: `all 0.6s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="family-image-wrap">
                <div className="family-image">
                  <img src={member.image} alt={member.name} />
                  <div className="family-image-overlay" />
                </div>
                <span className="family-tag">{member.tag}</span>
              </div>
              <div className="family-info">
                <div className="family-name">{member.name}</div>
                <div className="family-role">{member.role}</div>
                <p className="family-desc">{member.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
