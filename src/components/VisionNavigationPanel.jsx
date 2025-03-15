import React, { useState } from 'react';
import '../styles/VisionNavigationPanel.css';

const navItems = [
  { id: 'account', label: 'Compte', icon: '👤' },
  { id: 'home', label: 'Accueil', icon: '🏠' },
  { id: 'stats', label: 'Statistiques', icon: '📊' },
];

const VisionNavigationPanel = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  return (
    <div
      className={`vision-nav-panel ${expanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`vision-nav-item ${activeItem === item.id ? 'active' : ''}`}
          onClick={() => setActiveItem(item.id)}
        >
          <span className="icon">{item.icon}</span>
          {expanded && <span className="label">{item.label}</span>}
        </div>
      ))}
    </div>
  );
};

export default VisionNavigationPanel;