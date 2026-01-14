'use client';

import Link from 'next/link';
import { PlasmaButtonController } from './components/PlasmaButtonController';
import { ElectricSparkController } from './components/ElectricSparkController';
import GlobalPlasmaController from './components/GlobalPlasmaController';
import { PageBurnTransition } from './components/PageBurnTransition';
import { useEffect } from 'react';
import './styles/layout.css';

export default function Home() {
  useEffect(() => {
    const buttons = document.querySelectorAll('.plasma-button') as NodeListOf<HTMLElement>;
    if (!buttons.length) return;

    const move = (e: MouseEvent) => {
      buttons.forEach(btn => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${e.clientX - r.left}px`);
        btn.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };

    document.addEventListener('mousemove', move as EventListener);
    return () => document.removeEventListener('mousemove', move as EventListener);
  }, []);

  // === OUTER PROXIMITY GLOW (DISTANCE-REACTIVE) ===
  useEffect(() => {
    const buttons = document.querySelectorAll('.plasma-button') as NodeListOf<HTMLElement>;
    if (!buttons.length) return;

    const handleMouseMove = (e: MouseEvent) => {
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();

        // Button center
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Distance from cursor to button center
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        // ===== OUTER PURPLE GLOW (220px range) =====
        const distOuter = Math.min(dist, 220);
        const proximityOuter = 1 - distOuter / 220;
        const pullOuter = distOuter * 0.2;
        const stretchOuter = 1 + proximityOuter * 0.7;

        const sxOuter = 1 + Math.abs(Math.cos(angle)) * (stretchOuter - 1);
        const syOuter = 1 + Math.abs(Math.sin(angle)) * (stretchOuter - 1);

        const opacityOuter = 0.15 + proximityOuter * 0.55;
        const brightnessOuter = 1 + proximityOuter * 0.6;

        button.style.setProperty('--gx', `${Math.cos(angle) * pullOuter}px`);
        button.style.setProperty('--gy', `${Math.sin(angle) * pullOuter}px`);
        button.style.setProperty('--sx', sxOuter.toFixed(2));
        button.style.setProperty('--sy', syOuter.toFixed(2));
        button.style.setProperty('--glow-opacity', opacityOuter.toFixed(2));
        button.style.setProperty('--glow-brightness', brightnessOuter.toFixed(2));

        // ===== ULTRA-OUTER AURA (320px range, heavier stretch) =====
        const distUltra = Math.min(dist, 320);
        const proximityUltra = 1 - distUltra / 320;
        const pullUltra = distUltra * 0.35;
        const stretchUltra = 1 + proximityUltra * 1.1;

        const sxUltra = 1 + Math.abs(Math.cos(angle)) * (stretchUltra - 1);
        const syUltra = 1 + Math.abs(Math.sin(angle)) * (stretchUltra - 1);

        const opacityUltra = 0.12 + proximityUltra * 0.35;
        const brightnessUltra = 1 + proximityUltra * 0.8;

        button.style.setProperty('--ugx', `${Math.cos(angle) * pullUltra}px`);
        button.style.setProperty('--ugy', `${Math.sin(angle) * pullUltra}px`);
        button.style.setProperty('--usx', sxUltra.toFixed(2));
        button.style.setProperty('--usy', syUltra.toFixed(2));
        button.style.setProperty('--u-opacity', opacityUltra.toFixed(2));
        button.style.setProperty('--u-bright', brightnessUltra.toFixed(2));

        button.classList.add('glow-active');
      });
    };

    const handleMouseLeave = () => {
      buttons.forEach(button => {
        button.classList.remove('glow-active');

        // Reset outer glow
        button.style.setProperty('--gx', '0px');
        button.style.setProperty('--gy', '0px');
        button.style.setProperty('--sx', '1');
        button.style.setProperty('--sy', '1');
        button.style.setProperty('--glow-opacity', '0');
        button.style.setProperty('--glow-brightness', '1');

        // Reset ultra-outer glow
        button.style.setProperty('--ugx', '0px');
        button.style.setProperty('--ugy', '0px');
        button.style.setProperty('--usx', '1');
        button.style.setProperty('--usy', '1');
        button.style.setProperty('--u-opacity', '0');
        button.style.setProperty('--u-bright', '1');
      });
    };

    document.addEventListener('mousemove', handleMouseMove as EventListener);
    document.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as EventListener);
      document.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, []);

  return (
    <>
      <PageBurnTransition />
      <PlasmaButtonController />
      <ElectricSparkController />
      <GlobalPlasmaController />
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">Vibe Queen Slots</div>
          </div>
          <nav className="sidebar-nav">
            <div className="sidebar-group">
              <div className="sidebar-group-label">MAIN</div>
              <Link href="/" className="sidebar-nav-item plasma-glow-btn active">
                <span>🏠 Home</span>
              </Link>
              <Link href="/leaderboard" className="sidebar-nav-item plasma-glow-btn">
                <span>📊 Leaderboard</span>
              </Link>
              <Link href="/slot-battles" className="sidebar-nav-item plasma-glow-btn">
                <span>⚔️ Slot Battles</span>
              </Link>
              <Link href="/live-events" className="sidebar-nav-item plasma-glow-btn">
                <span>🔴 Live Events</span>
              </Link>
            </div>

            <div className="sidebar-group">
              <div className="sidebar-group-label">COMMUNITY</div>
              <a href="https://vqsslots.com/giveaways" target="_self" className="sidebar-nav-item plasma-glow-btn">
                <span>🎁 Giveaways</span>
              </a>
              <a href="https://vqsslots.com/bonus-hunts" target="_self" className="sidebar-nav-item plasma-glow-btn">
                <span>🎁 Bonus Hunts</span>
              </a>
              <a href="https://vqsslots.com/stream-schedule" target="_self" className="sidebar-nav-item plasma-glow-btn">
                <span>📺 Stream Schedule</span>
              </a>
            </div>

            <div className="sidebar-group">
              <div className="sidebar-group-label">SUPPORT</div>
              <a href="https://vqsslots.com/support-the-channel" target="_self" className="sidebar-nav-item plasma-glow-btn">
                <span>❤️ Support the Channel</span>
              </a>
              <a href="https://vqsslots.com/affiliate-sign-up" target="_self" className="sidebar-nav-item plasma-glow-btn">
                <span>💰 Affiliate Sign Up</span>
              </a>
              <a href="https://vqsslots.com/contact-us" target="_self" className="sidebar-nav-item plasma-glow-btn">
                <span>📧 Contact Us</span>
              </a>
            </div>
          </nav>
        </aside>

      <main className="main-content">
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          color: '#e0f0ff',
          marginBottom: '2rem',
          position: 'relative'
        }}>
          <h1 style={{ 
            fontSize: '5rem', 
            fontWeight: 'bold',
            textShadow: '0 0 20px rgba(124, 199, 255, 0.6), 0 0 40px rgba(124, 199, 255, 0.3), 0 0 60px rgba(168, 85, 247, 0.4)',
            letterSpacing: '0.05em',
            margin: '0 0 1rem 0'
          }}>
            Vibe Queen Slots
          </h1>
        </div>

        <div style={{ padding: '2rem', textAlign: 'center', color: '#e0f0ff' }}>
          <h2 style={{ fontSize: '3rem' }}>Explore</h2>
          <div
            style={{
              marginTop: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1rem',
              padding: '1rem'
            }}
          >
            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Home')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Home
            </button>

            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Dashboard')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Contact Us
            </button>

            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Profile')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Slot Battles
            </button>

            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Messages')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Live Events
            </button>

            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Notifications')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Giveaways
            </button>

            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Projects')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Bonus Hunts
            </button>

            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Analytics')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Stream Schedule
            </button>

            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Settings')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Leaderboard
            </button>

            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Support')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Affiliate Sign Up
            </button>

            <button
              className="plasma-button"
              data-plasma="true"
              onClick={() => console.log('Logout')}
              style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}
            >
              <span className="ultra-glow"></span>
              Support the Channel
            </button>
          </div>
        </div>
      </main>
      </div>
    </>
  );
}
