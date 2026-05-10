export default function ContactHero() {
  return (
    <section className="services-hero contact-hero">
      <div className="services-hero-bg" />
      <div className="services-hero-bottom-bar" />

      {/* Signal pulse rings */}
      <div className="contact-hero-rings" aria-hidden="true">
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />
        <div className="ring-pin">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="var(--gold)" opacity="0.9"/>
            <circle cx="12" cy="9" r="2.5" fill="var(--navy-dark)" />
          </svg>
        </div>
      </div>

      <div className="services-hero-content">
        <div className="status-badge">
          <span className="mono">SYSTEM STATUS:</span>{' '}
          <span className="online">● ONLINE</span>
        </div>
        <h1>
          CONTACT<br />
          <span className="gold">PRAISE SECURITY</span>
        </h1>
        <p className="hero-desc">
          // PARAÑAQUE CITY, METRO MANILA<br />
          // AVAILABLE MONDAY – SATURDAY<br />
          // REACH US AT (02) 8299-344
        </p>
      </div>
    </section>
  );
}
