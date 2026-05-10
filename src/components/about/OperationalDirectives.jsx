import { useEffect, useRef, useState } from 'react';
import { Target, Eye } from 'lucide-react';

const directives = [
  {
    tag: '>> DIRECTIVE_001: MISSION',
    icon: Target,
    title: 'UNCOMPROMISING SAFETY',
    desc: 'Praise Security and Investigation Agency Inc. shall provide, teach, and train security personnel to fear God above all, to deliver consistent quality service, and to become well-disciplined, honest, and career-oriented security professionals — thereby ensuring continuous client satisfaction.',
  },
  {
    tag: '>> DIRECTIVE_002: VISION',
    icon: Eye,
    title: 'THE STANDARD OF DEFENSE',
    desc: 'Praise Security and Investigation Agency Inc. shall be recognized as a competent and responsive organization in the security service industry — committed to the Glory of God and dedicated to serving His people and the nation.',
  },
];

export default function OperationalDirectives() {
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
    <section className="directives-section" ref={ref}>
      <div className="directives-bg-orb" />
      <div className="container">
        <div
          className="section-title"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <h2>OPERATIONAL DIRECTIVES</h2>
          <div className="section-title-underline" />
          <p className="section-subtitle">The principles that define every decision we make.</p>
        </div>

        <div className="directives-grid">
          {directives.map(({ tag, icon: Icon, title, desc }, i) => (
            <div
              key={tag}
              className="directive-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(36px)',
                transition: `all 0.6s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="directive-icon-wrap">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <div className="directive-tag">{tag}</div>
              <h3>{title}</h3>
              <p className="directive-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
