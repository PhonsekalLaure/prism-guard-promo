import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { getPromoServiceReviews } from '../../services/promoClients';

const CARDS_VISIBLE = 3;

function normalizeRating(value) {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return 0;
  return Math.min(Math.max(rating, 0), 5);
}

function StarRating({ rating }) {
  const normalized = normalizeRating(rating);
  const rounded = Math.round(normalized);

  return (
    <div className="review-rating" aria-label={`${normalized.toFixed(1)} out of 5 stars`}>
      <span className="review-stars" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            className={index < rounded ? 'review-star filled' : 'review-star'}
          />
        ))}
      </span>
      <span className="review-rating-value">{normalized.toFixed(1)}</span>
    </div>
  );
}

export default function ReviewsSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('loading');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const totalSlides = reviews.length;
  const visibleCount = Math.min(CARDS_VISIBLE, totalSlides);
  const maxIndex = Math.max(totalSlides - visibleCount, 0);
  const hasReviews = totalSlides > 0;

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

  useEffect(() => {
    let isMounted = true;

    getPromoServiceReviews()
      .then((data) => {
        if (!isMounted) return;
        setReviews(data);
        setActiveIndex(0);
        setStatus('success');
      })
      .catch((err) => {
        console.error('[getPromoServiceReviews Error]:', err);
        if (isMounted) setStatus('error');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const goTo = useCallback((index, dir = 'next') => {
    if (isAnimating || !hasReviews) return;
    setIsAnimating(true);
    setDirection(dir);
    setActiveIndex(Math.min(Math.max(index, 0), maxIndex));
    setTimeout(() => setIsAnimating(false), 500);
  }, [hasReviews, isAnimating, maxIndex]);

  const goNext = useCallback(() => {
    if (!hasReviews) return;
    const next = activeIndex >= maxIndex ? 0 : activeIndex + 1;
    goTo(next, 'next');
  }, [activeIndex, hasReviews, maxIndex, goTo]);

  const goPrev = useCallback(() => {
    if (!hasReviews) return;
    const prev = activeIndex <= 0 ? maxIndex : activeIndex - 1;
    goTo(prev, 'prev');
  }, [activeIndex, hasReviews, maxIndex, goTo]);

  useEffect(() => {
    if (isPaused || !visible || !hasReviews || maxIndex === 0) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [hasReviews, isPaused, maxIndex, visible, goNext]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const visibleReviews = reviews.slice(activeIndex, activeIndex + visibleCount);

  return (
    <section
      className="reviews-section"
      id="reviews"
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
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

        <div
          className="reviews-carousel-wrapper"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}
        >
          {hasReviews && maxIndex > 0 && (
            <button
              className="carousel-arrow carousel-arrow--prev"
              onClick={goPrev}
              aria-label="Previous reviews"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {status === 'loading' && (
            <div className="reviews-message">
              <span className="reviews-message-dot" />
              Loading published client feedback...
            </div>
          )}

          {status === 'error' && (
            <div className="reviews-message reviews-message--error">
              Unable to load published client feedback.
            </div>
          )}

          {status === 'success' && !hasReviews && (
            <div className="reviews-message">No published client feedback yet.</div>
          )}

          {hasReviews && (
            <div className={`reviews-track reviews-track--${direction} reviews-track--count-${visibleReviews.length} ${isAnimating ? 'animating' : ''}`}>
              {visibleReviews.map((review, index) => (
                <div
                  key={`${review.id}-${activeIndex}-${index}`}
                  className="review-card"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <div className="review-tag">&gt;&gt; VERIFIED ENTRY</div>
                  <StarRating rating={review.rating} />
                  <span className="review-quote-icon">&ldquo;</span>
                  <p className="review-quote">{review.quote}</p>
                  <div className="review-footer">
                    <div className="review-client">{review.client}</div>
                    <span className="review-id">- {review.context}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasReviews && maxIndex > 0 && (
            <button
              className="carousel-arrow carousel-arrow--next"
              onClick={goNext}
              aria-label="Next reviews"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>

        {hasReviews && maxIndex > 0 && (
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
        )}

        {hasReviews && maxIndex > 0 && (
          <div className="reviews-progress">
            <div
              className={`reviews-progress-bar ${isPaused ? 'paused' : ''}`}
              key={activeIndex}
            />
          </div>
        )}
      </div>
    </section>
  );
}
