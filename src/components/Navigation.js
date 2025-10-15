import React from 'react';
import { Sun, Moon } from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'games', label: 'Games' },
  { id: 'contact', label: 'Contact' }
];

export default function Navigation({ theme, toggleTheme, menuOpen, toggleMenu, activeSection, scrollToSection }) {
  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="logo">Nirmit</div>

          <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            {navLinks.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? 'active' : ''}
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <div className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {menuOpen && <div className="menu-overlay active" onClick={toggleMenu}></div>}
    </>
  );
}