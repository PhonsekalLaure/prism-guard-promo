import { useEffect, useRef, useState } from 'react';
import { Shield, Crosshair, Briefcase } from 'lucide-react';

const executiveCore = [
  {
    name: 'EXECUTIVE COMMAND',
    role: 'Strategic Direction & General Management',
    desc: 'Founded on over two decades of military and security leadership experience. The executive command drives the overarching vision and uncompromising standards of Praise Security.',
    icon: Shield,
    tag: 'LEADERSHIP',
  },
  {
    name: 'OPERATIONS COMMAND',
    role: 'Tactical Oversight & Field Deployment',
    desc: 'Ensures absolute tactical readiness across all client sites nationwide. This division oversees rapid response execution, personnel deployment, and site security architecture.',
    icon: Crosshair,
    tag: 'OPERATIONS',
  },
  {
    name: 'ADMINISTRATIVE HUB',
    role: 'Compliance & Personnel Development',
    desc: 'The backbone of our agency, managing rigorous operational auditing, continuous personnel training, and strict adherence to regulatory compliance.',
    icon: Briefcase,
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
          <h2>THE EXECUTIVE CORE</h2>
          <div className="section-title-underline" />
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.45)' }}>
            The leadership structure behind every deployment.
          </p>
        </div>

        <div className="family-grid">
          {executiveCore.map((member, i) => {
            const Icon = member.icon;
            return (
              <div
                key={member.name}
                className="family-card"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(36px)',
                  transition: `all 0.6s ease ${0.2 + i * 0.15}s`,
                  padding: '40px 36px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    background: 'rgba(230,178,21,0.1)',
                    border: '1px solid rgba(230,178,21,0.2)',
                    borderRadius: '4px',
                    color: 'var(--gold)',
                    boxShadow: '0 0 16px rgba(230,178,21,0.1)'
                  }}>
                    <Icon size={28} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-tech)',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    color: 'var(--navy-dark)',
                    background: 'var(--gold)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    fontWeight: 700,
                  }}>
                    {member.tag}
                  </span>
                </div>
                
                <div className="family-name" style={{ fontSize: '18px', marginBottom: '8px' }}>
                  {member.name}
                </div>
                <div className="family-role" style={{ fontSize: '11px', marginBottom: '20px', color: 'rgba(230,178,21,0.8)' }}>
                  {member.role}
                </div>
                <p className="family-desc" style={{ margin: 0 }}>
                  {member.desc}
                </p>
                
                {/* Decorative accent */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--gold), rgba(230,178,21,0.3))',
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
