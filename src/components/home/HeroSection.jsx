import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hero1 from '../../assets/hero1.jpg';
import hero2 from '../../assets/hero2.jpg';

const slides = [hero1, hero2];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
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
            <Link to="/join-the-force?form=booking" className="btn-primary">HIRE SECURITY</Link>
            <Link to="/join-the-force?form=application" className="btn-outline-white">APPLY NOW</Link>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="hero-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-indicator ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
