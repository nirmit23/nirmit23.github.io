import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import GameTabs from './components/GameTabs';
import Contact from './components/Contact';
import './components/GameTabs.css';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('menu-open');
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'education', 'experience', 'projects', 'skills', 'games', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.clientHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMenu();
  };

  return (
    <div className="App">
      <Navigation
        theme={theme}
        toggleTheme={toggleTheme}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <Hero scrollToSection={scrollToSection} />
      <About scrollToSection={scrollToSection} />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      
      <section id="games" className="games">
        <div className="section-container">
          <h2>Interactive Games</h2>
          <GameTabs />
        </div>
      </section>

      <Contact />
    </div>
  );
}

export default App;