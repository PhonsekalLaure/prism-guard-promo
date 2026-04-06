import { useState } from 'react';

const clientPages = [
  [
    'SM Mall of Asia', 'BDO Corporate', 'Toyota Manufacturing',
    'Ayala Land Inc.', 'Globe Telecom', 'PLDT Enterprise',
    'Megaworld Corp.', 'San Miguel Corp.',
    'Jollibee Foods', 'Manila Water Co.', 'Cebu Pacific Air',
    'Metro Pacific Inv.', 'Robinsons Land', 'Universal Robina',
    'DMCI Holdings', 'Filinvest Land',
  ],
  [
    'Monde Nissin', 'Century Pacific', 'DoubleDragon Corp.',
    'Alliance Global', 'LT Group Inc.', 'ICTSI',
    'First Gen Corp.', 'Aboitiz Power',
    'Security Bank', 'East West Banking', 'China Banking',
    'PhilWeb Corp.', 'Emperador Inc.', 'Puregold Price',
    'Vista Land', 'Shakeys Pizza',
  ],
];

export default function OurClients() {
  const [page, setPage] = useState(0);
  const totalPages = clientPages.length;
  const currentClients = clientPages[page];

  const leftCol = currentClients.slice(0, 8);
  const rightCol = currentClients.slice(8, 16);

  return (
    <>
      {/* ===== CLIENTS HERO ===== */}
      <section className="services-hero">
        <div className="services-hero-bg" />
        <div className="services-hero-overlay" />
        <div className="services-hero-bottom-bar" />

        <div className="services-hero-content">
          <div className="status-badge">
            <span className="mono">SYSTEM STATUS:</span>{' '}
            <span className="online">● ONLINE</span>
          </div>
          <h1>
            OUR <span className="gold">PRAISE SECURITY</span><br />
            PARTNERS
          </h1>
          <p className="hero-desc">
            // DEPLOYING ELITE MANPOWER<br />
            // INTEGRATING PRISM-GUARD REAL-TIME TRACKING<br />
            // SECURING ASSETS 24/7
          </p>
        </div>
      </section>

      {/* ===== ACTIVE CLIENTS ===== */}
      <section className="clients-section">
        <div className="container">
          <div className="section-title">
            <h2>ACTIVE CLIENTS</h2>
            <div className="section-title-underline" />
          </div>

          <div className="clients-panel">
            <div className="clients-grid">
              <div className="clients-col">
                {leftCol.map((client, i) => (
                  <div key={i} className="client-entry">
                    // {client}
                    <span className="client-dots">{'.'?.repeat(30 - client.length > 0 ? 30 - client.length : 5)}</span>
                  </div>
                ))}
              </div>
              <div className="clients-col">
                {rightCol.map((client, i) => (
                  <div key={i} className="client-entry">
                    // {client}
                    <span className="client-dots">{'.'?.repeat(30 - client.length > 0 ? 30 - client.length : 5)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="clients-pagination">
              <button
                className="pagination-arrow"
                onClick={() => setPage((p) => (p > 0 ? p - 1 : totalPages - 1))}
                aria-label="Previous page"
              >
                &lt;
              </button>
              <div className="pagination-dots">
                {clientPages.map((_, i) => (
                  <span
                    key={i}
                    className={`pagination-dot ${i === page ? 'active' : ''}`}
                    onClick={() => setPage(i)}
                  />
                ))}
              </div>
              <button
                className="pagination-arrow"
                onClick={() => setPage((p) => (p < totalPages - 1 ? p + 1 : 0))}
                aria-label="Next page"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== READY TO SECURE ===== */}
      <section className="secure-section">
        <div className="container">
          <div className="section-title secure-title">
            <h2>READY TO SECURE YOUR <span className="gold secure-italic">ASSETS</span>?</h2>
            <div className="section-title-underline" />
          </div>

          <div className="secure-card">
            <h3>I WANT TO HIRE SECURITY</h3>
            <div className="secure-steps">
              <span>&gt;&gt; Schedule Site Analysis</span>
              <span>&gt;&gt; Request Quotation</span>
              <span>&gt;&gt; Deploy Units</span>
            </div>
            <a href="#" className="btn-primary">BOOK NOW</a>
          </div>
        </div>
      </section>
    </>
  );
}
