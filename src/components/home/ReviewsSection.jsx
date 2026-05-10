import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    quote:
      '"Praise Security has drastically improved our gate protocols. Their guards are disciplined, properly uniformed, and their daily reports are always on time."',
    client: 'SM Mall of Asia',
    id: 'Operations Manager',
  },
  {
    quote:
      '"The level of professionalism from Praise Security is unmatched. Their command center responsiveness and guard discipline set them apart from other agencies."',
    client: 'Ayala Land',
    id: 'Facilities Director',
  },
  {
    quote:
      '"We have been partnering with Praise Security for over two years. Their guards are well-trained, reliable, and their reporting system is seamless."',
    client: 'Robinsons Malls',
    id: 'Security Coordinator',
  },
  {
    quote:
      '"Exceptional service from deployment to daily operations. Praise Security truly understands enterprise-level security requirements."',
    client: 'ICTSI Port Operations',
    id: 'Site Supervisor',
  },
  {
    quote:
      '"Their real-time tracking system gave us full visibility of guard positions at all times. Highly recommended for large industrial sites."',
    client: 'San Miguel Corporation',
    id: 'Head of Security',
  },
];

const CARDS_VISIBLE = 3;

export default function ReviewsSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'

  const totalSlides = reviews.length;
  const maxIndex = totalSlides - CARDS_VISIBLE;

  // Section entrance reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index, dir = 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    const next = activeIndex >= maxIndex ? 0 : activeIndex + 1;
    goTo(next, 'next');
  }, [activeIndex, maxIndex, goTo]);

  const goPrev = useCallback(() => {
    const prev = activeIndex <= 0 ? maxIndex : activeIndex - 1;
    goTo(prev, 'prev');
  }, [activeIndex, maxIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || !visible) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, visible, goNext]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const visibleReviews = reviews.slice(activeIndex, activeIndex + CARDS_VISIBLE);

  return (
    <section
      className="reviews-section"
      id="reviews"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Header */}
        <div
          className="section-title"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          <h2>CLIENT FEEDBACK</h2>
          <div className="section-title-underline" />
        </div>

        {/* Carousel wrapper */}
        <div
          className="reviews-carousel-wrapper"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}
        >
          {/* Prev Arrow */}
          <button
            className="carousel-arrow carousel-arrow--prev"
            onClick={goPrev}
            aria-label="Previous reviews"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards track */}
          <div className={`reviews-track reviews-track--${direction} ${isAnimating ? 'animating' : ''}`}>
            {visibleReviews.map((review, index) => (
              <div
                key={`${activeIndex}-${index}`}
                className="review-card"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div className="review-tag">&gt;&gt; VERIFIED ENTRY</div>
                <span className="review-quote-icon">&ldquo;</span>
                <p className="review-quote">{review.quote}</p>
                <div className="review-footer">
                  <div className="review-client">{review.client}</div>
                  <span className="review-id">— {review.id}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            className="carousel-arrow carousel-arrow--next"
            onClick={goNext}
            aria-label="Next reviews"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dot indicators */}
        <div
          className="reviews-dots"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.5s',
          }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`reviews-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(i, i > activeIndex ? 'next' : 'prev')}
              aria-label={`Go to review set ${i + 1}`}
            />
          ))}
        </div>

        {/* Auto-play progress bar */}
        <div className="reviews-progress">
          <div
            className={`reviews-progress-bar ${isPaused ? 'paused' : ''}`}
            key={activeIndex}
          />
        </div>
      </div>
    </section>
  );
}
