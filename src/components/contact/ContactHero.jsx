import { MapPin } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="services-hero contact-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      <div className="contact-hero-rings" aria-hidden="true">
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />
        <div className="ring-pin">
          <MapPin size={32} strokeWidth={1.8} fill="var(--gold)" />
        </div>
      </div>

      <div className="services-hero-content">
        <div className="status-badge">
          <span className="mono">SYSTEM STATUS:</span>{' '}
          <span className="online">ONLINE</span>
        </div>
        <h1>
          CONTACT<br />
          <span className="gold">PRAISE SECURITY</span>
        </h1>
        <p className="hero-desc">
          // PARANAQUE CITY, METRO MANILA<br />
          // AVAILABLE MONDAY - SATURDAY<br />
          // REACH US AT (02) 8299-344
        </p>
      </div>
    </section>
  );
}
