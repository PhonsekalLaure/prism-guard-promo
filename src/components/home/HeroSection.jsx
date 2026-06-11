import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hero1 from '../../assets/hero1.jpg';
import hero2 from '../../assets/hero2.jpg';
import { getPromoCarouselSlides } from '../../services/promoClients';
import {
  normalizePromoCarouselSlides,
  removeFailedPromoSlide,
} from '../../utils/promoCarouselSlides';

const FALLBACK_HEADING = 'ELITE STANDARDS.\nUNCOMPROMISING PROTECTION.';
const FALLBACK_TEXT = '// DEPLOYING ELITE MANPOWER\n// INTEGRATING PRISM-GUARD REAL-TIME TRACKING\n// SECURING ASSETS 24/7';
const fallbackSlides = [
  { id: 'fallback-1', image_url: hero1, heading: FALLBACK_HEADING, text: FALLBACK_TEXT, isFallback: true },
  { id: 'fallback-2', image_url: hero2, heading: FALLBACK_HEADING, text: FALLBACK_TEXT, isFallback: true },
];

function preloadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = url;
  });
}

function renderHeading(heading) {
  const lines = String(heading || '').split(/\r?\n/);
  return lines.map((line, index) => (
    <span className={index > 0 ? 'gold' : undefined} key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

export default function HeroSection() {
  const [slides, setSlides] = useState(fallbackSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let cancelled = false;

    getPromoCarouselSlides()
      .then(async (items) => {
        const candidates = normalizePromoCarouselSlides(items);
        const checks = await Promise.all(candidates.map((slide) => preloadImage(slide.image_url)));
        const validSlides = candidates.filter((_, index) => checks[index]);
        if (!cancelled && validSlides.length > 0) {
          setSlides(validSlides);
          setCurrent(0);
        }
      })
      .catch(() => null);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[current] || fallbackSlides[0];
  const handleImageError = (failedSlide) => {
    if (failedSlide.isFallback) return;
    setSlides((currentSlides) => (
      removeFailedPromoSlide(currentSlides, failedSlide.id, fallbackSlides)
    ));
    setCurrent(0);
  };

  return (
    <section className="hero">
      <div className="scan-line" />

      {/* Carousel */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`carousel-slide ${i === current ? 'active' : ''}`}
          aria-hidden="true"
        >
          <img
            className="carousel-slide-image"
            src={slide.image_url}
            alt=""
            onError={() => handleImageError(slide)}
          />
        </div>
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
            {renderHeading(activeSlide.heading)}
          </h1>
          <p className="hero-desc">{activeSlide.text}</p>
          <div className="hero-buttons">
            <Link to="/join-the-force?form=booking" className="btn-primary">HIRE SECURITY</Link>
            <Link to="/join-the-force?form=application" className="btn-outline-white">APPLY NOW</Link>
          </div>
        </div>

        {/* Carousel indicators */}
        {slides.length > 1 && (
          <div className="hero-indicators">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                className={`hero-indicator ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
