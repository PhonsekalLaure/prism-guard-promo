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

export default function ActiveClients() {
  const [page, setPage] = useState(0);
  const totalPages = clientPages.length;
  const currentClients = clientPages[page];

  const leftCol = currentClients.slice(0, 8);
  const rightCol = currentClients.slice(8, 16);

  return (
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
  );
}
