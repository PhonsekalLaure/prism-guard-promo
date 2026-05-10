import { useEffect, useRef, useState } from 'react';

const timelineEvents = [
  {
    year: 'JAN 2004',
    label: 'FOUNDING',
    desc: 'Lt. Commander Willy H. Sta. Romana, driven by a passion for the security industry and a desire to protect his fellow countrymen, officially establishes Praise Security & Investigation Agency Inc. The agency begins its early operations with a small roster of initial clients.',
  },
  {
    year: '2004',
    label: 'RAPID GROWTH',
    desc: 'To overcome expansion challenges, the founder leverages the semi-military nature of the industry by hiring retired and ex-military officers with proven security management expertise. This strategic shift leads to rapid growth, the acquisition of more prestigious clients, and the formation of a solid core of well-trained administrative and operational staff.',
  },
  {
    year: '2013',
    label: 'PROMOTION',
    desc: "In recognition of his service and leadership, the agency's founder is recommended to the rank of Lieutenant Colonel under Special Order No. 480 by the General Headquarters, Armed Forces of the Philippines (GHQ, AFP), serving under the Chaplain Service (CHS).",
  },
  {
    year: 'PRESENT',
    label: 'ONGOING MISSION',
    desc: 'Lt. Col. Willy H. Sta. Romana, AFP (CHS) continues to lead the agency as President and General Manager. Praise Security focuses on expanding its services to a broader clientele while actively combating national unemployment by providing meaningful job opportunities to qualified security officers and guards.',
  },
];

export default function OriginTimeline() {
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
    <section className="timeline-section" ref={ref}>
      <div className="timeline-bg-orb" />
      <div className="container">
        <div
          className="section-title"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <h2>ORIGIN TIMELINE</h2>
          <div className="section-title-underline" />
          <p className="section-subtitle">Two decades of growth, service, and discipline.</p>
        </div>

        <div className="timeline">
          {timelineEvents.map((event, i) => (
            <div
              key={i}
              className="timeline-item"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-24px)',
                transition: `all 0.6s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="timeline-marker">
                <div className="timeline-dot" />
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-year">{event.year}</span>
                  <span className="timeline-label">{event.label}</span>
                </div>
                <p className="timeline-desc">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
