import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import GameTabs from './components/GameTabs';
import Contact from './components/Contact';
import LiveAirDropDetails from './components/LiveAirDropDetails';
import WeatherWidget from './components/WeatherWidget';
import { trackSectionView, trackThemeToggle } from './utils/analytics';
import './components/GameTabs.css';
import './components/LiveAirDropDetails.css';
import './App.css';
import WidgetHub from './components/WidgetHub';

// ScrollToTop component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// HomePage component containing all your main sections
function HomePage({ theme, toggleTheme, menuOpen, toggleMenu, activeSection, scrollToSection, closeMenu }) {
  return (
    <>
      <Navigation
        theme={theme}
        toggleTheme={toggleTheme}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <main>
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <section id="games" className="games-section">
          <div className="container">
            <h2 className="section-title">Interactive Games</h2>
            <GameTabs />
          </div>
        </section>
        <Contact />
      </main>
      <WidgetHub />
    </>
  );
}

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
    trackThemeToggle(newTheme);
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
            if (activeSection !== section) {
              setActiveSection(section);
              trackSectionView(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMenu();
  };

  return (
    <Router basename="/">
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage
                theme={theme}
                toggleTheme={toggleTheme}
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
                closeMenu={closeMenu}
              />
            } 
          />
          <Route 
            path="/project/live-air-drop" 
            element={<LiveAirDropDetails theme={theme} toggleTheme={toggleTheme} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;