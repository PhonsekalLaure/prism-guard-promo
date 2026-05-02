import { useEffect, useMemo, useState } from 'react';
import { getPromoClients } from '../../services/promoClients';

function chunkClients(clients, size = 16) {
  const pages = [];

  for (let i = 0; i < clients.length; i += size) {
    pages.push(clients.slice(i, i + size));
  }

  return pages;
}

export default function ActiveClients() {
  const [page, setPage] = useState(0);
  const [clients, setClients] = useState([]);
  const [status, setStatus] = useState('loading');
  const clientPages = useMemo(() => chunkClients(clients), [clients]);
  const totalPages = clientPages.length;
  const currentClients = clientPages[Math.min(page, totalPages - 1)] || [];

  useEffect(() => {
    let isMounted = true;

    getPromoClients()
      .then((data) => {
        if (!isMounted) return;

        setClients(data.filter((client) => client.company));
        setStatus('success');
        setPage(0);
      })
      .catch((err) => {
        console.error('[getPromoClients Error]:', err);
        if (isMounted) {
          setStatus('error');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const leftCol = currentClients.slice(0, 8);
  const rightCol = currentClients.slice(8, 16);
  const hasClients = clients.length > 0;

  return (
    <section className="clients-section">
      <div className="container">
        <div className="section-title">
          <h2>ACTIVE CLIENTS</h2>
          <div className="section-title-underline" />
        </div>

        <div className="clients-panel">
          {status === 'loading' && (
            <div className="clients-message">Loading active clients...</div>
          )}

          {status === 'error' && (
            <div className="clients-message">Unable to load clients from the database.</div>
          )}

          {status === 'success' && !hasClients && (
            <div className="clients-message">No active clients found.</div>
          )}

          {hasClients && (
            <div className="clients-grid">
              <div className="clients-col">
                {leftCol.map((client) => (
                  <div key={client.id} className="client-entry">
                    // {client.company}
                    <span className="client-dots">
                      {'.'.repeat(30 - client.company.length > 0 ? 30 - client.company.length : 5)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="clients-col">
                {rightCol.map((client) => (
                  <div key={client.id} className="client-entry">
                    // {client.company}
                    <span className="client-dots">
                      {'.'.repeat(30 - client.company.length > 0 ? 30 - client.company.length : 5)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalPages > 1 && (
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
          )}
        </div>
      </div>
    </section>
  );
}
