import { useState, useEffect } from 'react';

const slides = [
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="scan-line" />

      {/* Carousel */}
      {slides.map((src, i) => (
        <div
          key={i}
          className={`carousel-slide ${i === current ? 'active' : ''}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      <div className="hero-overlay" />
      <div className="hero-bottom-bar" />

      {/* Content */}
      <div className="hero-content">
        <div className="status-badge">
          <span className="mono">SYSTEM STATUS:</span>{' '}
          <span className="online">● ONLINE</span>
        </div>

        <div className="hero-text">
          <h1>
            ELITE STANDARDS.<br />
            <span className="gold">UNCOMPROMISING PROTECTION.</span>
          </h1>
          <p className="hero-desc">
            // DEPLOYING ELITE MANPOWER<br />
            // INTEGRATING PRISM-GUARD REAL-TIME TRACKING<br />
            // SECURING ASSETS 24/7
          </p>
          <div className="hero-buttons">
            <a href="#access" className="btn-primary">HIRE SECURITY</a>
            <a href="#access" className="btn-outline-white">APPLY NOW</a>
          </div>
        </div>
      </div>
    </section>
  );
}
