import '../styles/features-grid.css';

const features = [
  { icon: '🎰', title: 'Play Now', description: 'Jump into the action' },
  { icon: '📊', title: 'Leaderboard', description: 'Check rankings' },
  { icon: '🏆', title: 'Tournaments', description: 'Compete and win' },
  { icon: '👥', title: 'Community', description: 'Join the vibes' },
  { icon: '🎁', title: 'Bonus Hunts', description: 'Daily rewards' },
  { icon: '🛍️', title: 'Store', description: 'Shop items' },
  { icon: '💰', title: 'Affiliates', description: 'Earn commissions' },
  { icon: '🔴', title: 'Live Events', description: 'Watch streams' },
];

export default function FeaturesGrid() {
  return (
    <section className="features-section">
      <div className="features-grid">
        {features.map((feature) => (
          <button key={feature.title} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-title">{feature.title}</div>
            <div className="feature-description">{feature.description}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
