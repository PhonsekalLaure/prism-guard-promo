import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck } from 'lucide-react';

const protocols = [
  {
    title: 'I WANT TO HIRE SECURITY',
    steps: ['>> Schedule Site Analysis', '>> Request Quotation', '>> Deploy Units'],
    buttonLabel: 'BOOK NOW',
    href: '/join-the-force?form=booking',
    Icon: Building2,
  },
  {
    title: 'JOIN THE FORCE',
    steps: ['>> Submit Credentials', '>> Background Check', '>> Begin Deployment'],
    buttonLabel: 'APPLY NOW',
    href: '/join-the-force?form=application',
    Icon: ShieldCheck,
  },
];

export default function ProtocolSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="protocol-section" id="access" ref={ref}>
      <div className="container">
        <div
          className="protocol-header"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <h2>GET STARTED WITH PRAISE SECURITY.</h2>
          <p className="subtitle">Select your portal below to proceed.</p>
        </div>

        <div className="protocol-grid">
          {protocols.map((protocol, index) => (
            <div
              key={protocol.title}
              className="protocol-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${0.2 + index * 0.15}s`,
              }}
            >
              <div className="protocol-info">
                <h3>{protocol.title}</h3>
                <div className="protocol-steps">
                  {protocol.steps.map((step, i) => (
                    <span key={i} style={{ display: 'block' }}>{step}</span>
                  ))}
                </div>
                <Link to={protocol.href} className="btn-primary">{protocol.buttonLabel}</Link>
              </div>
              <div className="protocol-icon">
                <protocol.Icon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
