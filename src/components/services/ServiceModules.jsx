import { useEffect, useRef, useState } from 'react';
import {
  Shield, Radio, MonitorPlay, Briefcase, Users
} from 'lucide-react';

const services = [
  {
    Icon: Shield,
    title: 'ASSET PROTECTION',
    tag: 'CORE SERVICE',
    desc: 'Maximum security coverage for lives, assets, and properties that your business relies on. Our guards are trained to prevent pilferage, arson, and sabotage — backed by a Comprehensive Security Plan tailored to your operations.',
    features: ['>> Perimeter Guard Deployment', '>> Anti-Pilferage Protocols', '>> Crisis Management'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop',
  },
  {
    Icon: Users,
    title: 'EXECUTIVE PROTECTION',
    tag: 'ELITE UNIT',
    desc: 'Close protection services for executives and high-value individuals. Our elite personnel are trained in civil disturbance control, threat assessment, and rapid evacuation — designed for the nature of your business.',
    features: ['>> Personal Detail Assignments', '>> Civil Disturbance Control', '>> Threat & Risk Assessment'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop',
  },
  {
    Icon: Radio,
    title: 'COMMAND CENTER OPS',
    tag: '24/7 OPERATIONS',
    desc: 'Our headquarters never sleeps. A dedicated Night Inspector conducts daily guard inspections to ensure quality and accountability. Real-time radio communication keeps all deployed units connected at all times.',
    features: ['>> 24/7 HQ Response', '>> Base & Handheld Radio Network', '>> Night Inspection Rounds'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900&auto=format&fit=crop',
  },
  {
    Icon: MonitorPlay,
    title: 'TECH SURVEILLANCE',
    tag: 'ACTIVE MODULE',
    desc: 'Integrated technology solutions that enhance situational awareness across your premises. From computer-monitored patrol reporting to radio-networked guard communication — visibility without gaps.',
    features: ['>> Real-Time Monitoring System', '>> 25-Unit Radio Network', '>> Incident Reporting & Logging'],
  },
  {
    Icon: Briefcase,
    title: 'SECURITY CONSULTING',
    tag: 'ADVISORY',
    desc: 'Strategic security advisory tailored to your industry. We deliver a Comprehensive Security Plan before any deployment — mapping responsibilities, entry controls, and emergency protocols to align with your business objectives.',
    features: ['>> Pre-Deployment Security Plan', '>> Guard-Employee Integration', '>> Monthly Performance Evaluation'],
  },
];

export default function ServiceModules() {
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
    <section className="services-modules" ref={ref}>
      <div className="container">
        <div
          className="section-title"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <h2>OUR SERVICES</h2>
          <div className="section-title-underline" />
          <p className="section-subtitle">
            From physical guard deployment to strategic planning — every layer of protection, covered.
          </p>
        </div>

        {/* Top row: 3 cards with background images */}
        <div className="modules-row modules-row--top">
          {services.slice(0, 3).map((svc, index) => (
            <ServiceCard key={svc.title} svc={svc} index={index} visible={visible} />
          ))}
        </div>

        {/* Bottom row: 2 larger cards */}
        <div className="modules-row modules-row--bottom">
          {services.slice(3).map((svc, index) => (
            <ServiceCard key={svc.title} svc={svc} index={index + 3} visible={visible} wide />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc, index, visible, wide }) {
  const { Icon, title, tag, desc, features, image } = svc;
  return (
    <div
      className={`module-card${wide ? ' module-card--wide' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `all 0.6s ease ${0.1 + index * 0.1}s`,
      }}
    >
      {/* Background image with fade overlay — only for top 3 cards */}
      {image && (
        <div
          className="module-bg-image"
          style={{ backgroundImage: `url('${image}')` }}
        />
      )}
      <div className="module-bg-overlay" />

      <div className="module-icon-wrap">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <div className="module-body">
        <span className="module-tag">{tag}</span>
        <h3 className="module-title">{title}</h3>
        <p className="module-desc">{desc}</p>
        <ul className="module-features">
          {features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </div>
  );
}
