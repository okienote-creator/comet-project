'use client';

import { useState } from 'react';
import '../styles/sidebar.css';

const navItems = [
  { label: 'Home', icon: '🏠' },
  { label: 'Leaderboard', icon: '📊' },
  { label: 'Tournaments', icon: '🏆' },
  { label: 'Community', icon: '👥' },
  { label: 'Bonus Hunts', icon: '🎁' },
  { label: 'Store', icon: '🛍️' },
  { label: 'Contact', icon: '💬' },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">VQSSLots</div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`sidebar-nav-item ${activeItem === item.label ? 'active' : ''}`}
            onClick={() => setActiveItem(item.label)}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
