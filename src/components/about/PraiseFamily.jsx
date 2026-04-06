const teamMembers = [
  {
    name: 'LT. COL. WILLY H. STA. ROMANA',
    role: 'President & General Manager',
    desc: 'AFP (CHS), founder of Praise Security. Over two decades of military and security leadership experience.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'OPERATIONS DIRECTOR',
    role: 'Chief of Operations',
    desc: 'Oversees all field deployments and ensures tactical readiness across all client sites nationwide.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'ADMIN DIRECTOR',
    role: 'Head of Administration',
    desc: 'Manages personnel training, compliance, and the day-to-day administrative operations of the agency.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
  },
];

export default function PraiseFamily() {
  return (
    <section className="family-section">
      <div className="container">
        <div className="section-title">
          <h2>PRAISE FAMILY</h2>
          <div className="section-title-underline" />
        </div>

        <div className="family-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className="family-card">
              <div className="family-image">
                <img src={member.image} alt={member.name} />
                <div className="family-image-badge" />
              </div>
              <div className="family-name">{member.name}</div>
              <div className="family-role">{member.role}</div>
              <p className="family-desc">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
