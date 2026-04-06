const BuildingIcon = () => (
  <svg viewBox="0 0 64 64" fill="currentColor">
    <rect x="8" y="12" width="48" height="48" rx="2" opacity="0.15" />
    <rect x="14" y="18" width="36" height="42" rx="1" fill="currentColor" opacity="0.3" />
    <rect x="20" y="24" width="8" height="6" rx="1" fill="currentColor" />
    <rect x="36" y="24" width="8" height="6" rx="1" fill="currentColor" />
    <rect x="20" y="36" width="8" height="6" rx="1" fill="currentColor" />
    <rect x="36" y="36" width="8" height="6" rx="1" fill="currentColor" />
    <rect x="26" y="48" width="12" height="12" rx="1" fill="currentColor" />
    <rect x="24" y="6" width="16" height="8" rx="1" fill="currentColor" opacity="0.5" />
  </svg>
);

const GuardIcon = () => (
  <svg viewBox="0 0 64 64" fill="currentColor">
    <circle cx="32" cy="18" r="10" fill="currentColor" opacity="0.9" />
    <path d="M32 6 L36 12 H34 V16 H30 V12 H28 Z" fill="currentColor" />
    <path d="M16 52 C16 40 24 34 32 34 C40 34 48 40 48 52 L48 58 L16 58 Z" fill="currentColor" opacity="0.7" />
    <rect x="28" y="40" width="8" height="4" rx="1" fill="currentColor" opacity="0.3" />
    <circle cx="24" cy="46" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="40" cy="46" r="2" fill="currentColor" opacity="0.4" />
  </svg>
);

const protocols = [
  {
    title: 'I WANT TO HIRE SECURITY',
    steps: ['>> Schedule Site Analysis', '>> Request Quotation', '>> Deploy Units'],
    buttonLabel: 'BOOK NOW',
    Icon: BuildingIcon,
  },
  {
    title: 'JOIN THE FORCE',
    steps: ['>> Submit Credentials', '>> Background Check', '>> Begin Deployment'],
    buttonLabel: 'APPLY NOW',
    Icon: GuardIcon,
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
