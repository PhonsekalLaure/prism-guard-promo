export default function AdvantageSection() {
  return (
    <section className="advantage-section">
      <div className="container">
        <div className="advantage-grid">
          <div className="advantage-text">
            <h2>
              THE PRISM-GUARD<br />
              <span className="gold advantage-italic">ADVANTAGE</span>
            </h2>
            <p className="advantage-desc">
              Our deployed units are not isolated. They are connected to the 
              PRISM-GUARD Neural Network. Using our proprietary mobile 
              application, we provide clients with:
            </p>
            <ul className="advantage-features">
              <li>&gt; Crowd Density Management</li>
              <li>&gt; VIP Access Control</li>
              <li>&gt; Conflict De-escalation</li>
            </ul>
            <div className="advantage-buttons">
              <a href="#" className="btn-primary">BOOK NOW</a>
              <a href="#" className="btn-outline-gold">APPLY NOW</a>
            </div>
          </div>
          <div className="advantage-image">
            <img
              src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=800&auto=format&fit=crop"
              alt="Security Personnel"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
