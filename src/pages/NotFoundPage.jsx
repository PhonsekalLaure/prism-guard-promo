import { Link } from 'react-router-dom';
import { ArrowRight, Home, ShieldAlert } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="promo-error-page" aria-labelledby="promo-error-title">
      <div className="promo-error-scan-line" aria-hidden="true" />
      <div className="promo-error-overlay" aria-hidden="true" />

      <div className="promo-error-content">
        <div className="status-badge">
          ROUTE STATUS: NOT FOUND
        </div>

        <div className="promo-error-card">
          <div className="promo-error-icon" aria-hidden="true">
            <ShieldAlert size={34} strokeWidth={1.8} />
          </div>
          <p className="promo-error-code mono">404</p>
          <h1 id="promo-error-title">
            Page <span className="gold">Not Found</span>
          </h1>
          <p className="promo-error-desc">
            The page you requested is not part of the active Praise Security public website.
            Return to the homepage or review our services to continue.
          </p>

          <div className="promo-error-actions">
            <Link to="/" className="btn-primary">
              <Home size={17} aria-hidden="true" />
              Back Home
            </Link>
            <Link to="/services" className="btn-outline-white">
              View Services
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
