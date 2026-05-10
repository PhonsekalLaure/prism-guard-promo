import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '120+', label: 'Guards Deployed' },
  { value: '98%', label: 'Client Retention' },
  { value: '24/7', label: 'Command Center' },
  { value: 'NCR/IV-A', label: 'Key Areas Served' },
];

export default function StatsBar() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-bar" ref={ref}>
      <div className="container stats-grid">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="stat-box"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease ${index * 0.1}s`,
            }}
          >
            <div className="stat-num">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
