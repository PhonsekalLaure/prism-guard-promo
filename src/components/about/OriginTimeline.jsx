const timelineEvents = [
  {
    year: 'JAN 2004',
    desc: 'Lt. Commander Willy H. Sta. Romana, driven by a passion for the security industry and a desire to protect his fellow countrymen, officially establishes Praise Security & Investigation Agency Inc. The agency begins its early operations with a small roster of initial clients.',
  },
  {
    year: '2004',
    desc: 'To overcome expansion challenges, the founder leverages the semi-military nature of the industry by hiring retired and ex-military officers with proven security management expertise. This strategic shift leads to rapid growth, the acquisition of more prestigious clients, and the formation of a solid core of well-trained administrative and operational staff.',
  },
  {
    year: '2013',
    desc: 'In recognition of his service and leadership, the agency\'s founder is recommended to the rank of Lieutenant Colonel under Special Order No. 480 by the General Headquarters, Armed Forces of the Philippines (GHQ, AFP), serving under the Chaplain Service (CHS).',
  },
  {
    year: 'PRESENT',
    desc: 'Lt. Col. Willy H. Sta. Romana, AFP (CHS) continues to lead the agency as President and General Manager. Praise Security focuses on expanding its services to a broader clientele while actively combating national unemployment by providing meaningful job opportunities to qualified security officers and guards.',
  },
];

export default function OriginTimeline() {
  return (
    <section className="timeline-section">
      <div className="container">
        <div className="section-title">
          <h2>ORIGIN TIMELINE</h2>
          <div className="section-title-underline" />
        </div>

        <div className="timeline">
          {timelineEvents.map((event, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-year">{event.year}</div>
              <p className="timeline-desc">{event.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
