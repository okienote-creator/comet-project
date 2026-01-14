import '../styles/social-links.css';

const socialLinks = [
  { label: 'X', icon: '𝕏', url: '#' },
  { label: 'Instagram', icon: '📷', url: '#' },
  { label: 'Kick', icon: '🎮', url: '#' },
  { label: 'YouTube', icon: '▶️', url: '#' },
  { label: 'Discord', icon: '💬', url: '#' },
];

export default function SocialLinks() {
  return (
    <section className="social-section">
      <div className="social-links">
        {socialLinks.map((social) => (
          <a key={social.label} href={social.url} className="social-link" title={social.label}>
            {social.icon}
          </a>
        ))}
      </div>
    </section>
  );
}
