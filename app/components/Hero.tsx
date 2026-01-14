import NeonGlassButton from './NeonGlassButton';
import '../styles/hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">VQSSLots</h1>
        <p className="hero-subtitle">Next-Generation Gaming Experience</p>
        <div className="hero-cta">
          <NeonGlassButton variant="primary">Start Gaming</NeonGlassButton>
        </div>
      </div>
    </section>
  );
}
