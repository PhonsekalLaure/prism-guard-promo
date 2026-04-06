const reviews = [
  {
    quote:
      '"Praise Security has drastically improved our gate protocols. Their guards are disciplined, properly uniformed, and their daily reports are always on time."',
    client: 'SM Mall of Asia',
    id: 'Operations Manager',
  },
  {
    quote:
      '"Praise Security has drastically improved our gate protocols. Their guards are disciplined, properly uniformed, and their daily reports are always on time."',
    client: 'SM Mall of Asia',
    id: 'Operations Manager',
  },
  {
    quote:
      '"Praise Security has drastically improved our gate protocols. Their guards are disciplined, properly uniformed, and their daily reports are always on time."',
    client: 'SM Mall of Asia',
    id: 'Operations Manager',
  },
];

export default function ReviewsSection() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-title">
          <h2>CLIENT FEEDBACK</h2>
          <div className="section-title-underline" />
        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-tag">&gt;&gt; VERIFIED ENTRY</div>
              <p className="review-quote">{review.quote}</p>
              <div>
                <div className="review-client">{review.client}</div>
                <span className="review-id">ID: {review.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
