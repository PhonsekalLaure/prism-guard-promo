const stats = [
  { value: '120+', label: 'Guards Deployed' },
  { value: '98%', label: 'Client Retention' },
  { value: '24/7', label: 'Command Center' },
  { value: 'NCR/IV-A', label: 'Key Areas Served' },
];

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-box">
            <div className="stat-num">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
