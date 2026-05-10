import { useEffect, useMemo, useState } from 'react';
import { getPromoClients } from '../../services/promoClients';
import { Building2 } from 'lucide-react';

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
        if (isMounted) setStatus('error');
      });
    return () => { isMounted = false; };
  }, []);

  const leftCol  = currentClients.slice(0, 8);
  const rightCol = currentClients.slice(8, 16);
  const hasClients = clients.length > 0;

  return (
    <section className="clients-section">
      <div className="container">
        <div className="section-title">
          <h2>ACTIVE CLIENTS</h2>
          <div className="section-title-underline" />
          <p className="section-subtitle" style={{ color: 'rgba(9,50,105,0.55)' }}>
            Companies currently under Prism-Guard protection.
          </p>
        </div>

        <div className="clients-panel">
          {/* Panel header bar */}
          <div className="clients-panel-header">
            <span className="panel-header-label">// CLIENT ROSTER</span>
            {hasClients && (
              <span className="panel-header-count">{clients.length} PROTECTED ENTITIES</span>
            )}
          </div>

          {status === 'loading' && (
            <div className="clients-message">
              <span className="clients-message-dot" />
              Loading active clients…
            </div>
          )}
          {status === 'error' && (
            <div className="clients-message clients-message--error">
              Unable to load clients from the database.
            </div>
          )}
          {status === 'success' && !hasClients && (
            <div className="clients-message">No active clients found.</div>
          )}

          {hasClients && (
            <div className="clients-grid">
              {[leftCol, rightCol].map((col, colIdx) => (
                <div key={colIdx} className="clients-col">
                  {col.map((client, i) => (
                    <div key={client.id} className="client-entry">
                      <span className="client-index">{String(page * 16 + colIdx * 8 + i + 1).padStart(2, '0')}</span>
                      <Building2 size={13} className="client-icon" strokeWidth={1.5} />
                      <span className="client-name">{client.company}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="clients-pagination">
              <button
                className="pagination-arrow"
                onClick={() => setPage((p) => (p > 0 ? p - 1 : totalPages - 1))}
                aria-label="Previous page"
              >
                ‹
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
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
