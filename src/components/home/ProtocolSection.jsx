import { Building2, ShieldCheck } from 'lucide-react';

const protocols = [
  {
    title: 'I WANT TO HIRE SECURITY',
    steps: ['>> Schedule Site Analysis', '>> Request Quotation', '>> Deploy Units'],
    buttonLabel: 'BOOK NOW',
    Icon: Building2,
  },
  {
    title: 'JOIN THE FORCE',
    steps: ['>> Submit Credentials', '>> Background Check', '>> Begin Deployment'],
    buttonLabel: 'APPLY NOW',
    Icon: ShieldCheck,
  },
];

export default function ProtocolSection() {
  return (
    <section className="protocol-section" id="access">
      <div className="container">
        <div className="protocol-header">
          <h2>GET STARTED WITH PRAISE SECURITY.</h2>
          <p className="subtitle">Select your portal below to proceed.</p>
        </div>

        <div className="protocol-grid">
          {protocols.map((protocol) => (
            <div key={protocol.title} className="protocol-card">
              <div className="protocol-info">
                <h3>{protocol.title}</h3>
                <div className="protocol-steps">
                  {protocol.steps.map((step, i) => (
                    <span key={i} style={{ display: 'block' }}>{step}</span>
                  ))}
                </div>
                <button className="btn-primary">{protocol.buttonLabel}</button>
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
