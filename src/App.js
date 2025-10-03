import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import GameTabs from './components/GameTabs';
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
      const sections = ['home', 'projects', 'skills', 'games', 'contact'];
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const isCollab = e.target.collab.checked;

    const subject = isCollab ? 'Brand Collaboration Inquiry' : 'Contact from Portfolio';
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

    window.location.href = `mailto:nirmitshah@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="App">
      <nav>
        <div className="nav-container">
          <div className="logo">Nirmit</div>

          <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={() => scrollToSection('projects')}>Projects</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={() => scrollToSection('skills')}>Skills</a></li>
            <li><a href="#games" className={activeSection === 'games' ? 'active' : ''} onClick={() => scrollToSection('games')}>Games</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</a></li>
            <li>
              <div className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {menuOpen && <div className="menu-overlay active" onClick={closeMenu}></div>}

      <section id="home" className="hero">
        <div className="floating-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
        </div>

        <h1 className="gradient-name">Nirmit Shah</h1>
        <p className="subtitle">Software Engineer @ Northeastern University | Full-Stack Developer | Creator</p>
        <div className="tags-container">
          <div className="tag"><span className="tag-icon">💻</span><span>Engineering</span></div>
          <div className="tag"><span className="tag-icon">🚀</span><span>Development</span></div>
          <div className="tag"><span className="tag-icon">✨</span><span>Creating</span></div>
        </div>
        <div>
          <a href="#projects" className="cta-button" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
            Explore My Work →
          </a>
        </div>
      </section>

      <section className="about">
        <div className="section-container">
          <div className="about-content">
            <div className="about-left">
              <h2>Hey there! 👋</h2>
              <p>I'm a passionate software engineer pursuing my Master's in Computer Software Engineering at Northeastern University. With experience at companies like <strong>Enlabel Global Services Inc.</strong>, <strong>Finalyca Technologies</strong>, and <strong>Shaalastic</strong>, I've progressed from intern to senior engineer roles.</p>
              <p>I love building products that impact millions of users. When I'm not coding, you'll find me exploring new technologies, working on side projects, and sharing knowledge with the developer community.</p>
              <a href="#contact" className="connect-btn" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Let's Connect →</a>
            </div>
            <div className="about-right">
              <div className="circle-card">
                <div className="circle-icon">👨‍💻</div>
                <h3>Always Building</h3>
                <p>Creating solutions that matter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="section-container">
          <h2>My Projects</h2>
          <p className="projects-subtitle">A collection of projects I've been working on. From web applications to open source contributions, here's what keeps me busy.</p>

          <div className="filter-bar">
            <span className="filter-info">Showing 6 repositories</span>
            <select className="sort-dropdown">
              <option>Sort by: Most Stars</option>
              <option>Sort by: Recently Updated</option>
              <option>Sort by: Name</option>
            </select>
          </div>

          <div className="projects-grid">
            {[
              { title: 'Boston-Town-Platform', desc: 'A comprehensive urban management platform designed to streamline city services and improve citizen engagement through modern web technologies.', tags: ['react', 'nodejs', 'mongodb'], lang: 'JavaScript', color: '#f1e05a', stars: 15, forks: 3 },
              { title: 'Health-Check-API', desc: 'Robust health monitoring API system with real-time status updates, comprehensive logging, and automated alert mechanisms for microservices.', tags: ['python', 'fastapi', 'docker'], lang: 'Python', color: '#3572A5', stars: 8, forks: 2 },
              { title: 'E-Commerce-Platform', desc: 'Full-stack e-commerce solution with advanced features including real-time inventory management, secure payment processing, and personalized recommendations.', tags: ['react', 'express', 'stripe'], lang: 'TypeScript', color: '#2b7489', stars: 12, forks: 5 },
              { title: 'ML-Recommendation-Engine', desc: 'Machine learning-based recommendation system using collaborative filtering and deep learning to provide personalized content suggestions.', tags: ['tensorflow', 'scikit-learn', 'pandas'], lang: 'Python', color: '#3572A5', stars: 22, forks: 7 },
              { title: 'Real-Time-Chat-App', desc: 'Created a chat room on a single computer where multiple clients can chat with each other using Socket.io and WebRTC for real-time communication.', tags: ['socket.io', 'webrtc', 'nodejs'], lang: 'JavaScript', color: '#f1e05a', stars: 10, forks: 4 },
              { title: 'DevOps-Automation-Tools', desc: 'Collection of automation scripts and tools for CI/CD pipelines, infrastructure as code, and deployment automation using modern DevOps practices.', tags: ['terraform', 'kubernetes', 'github-actions'], lang: 'Shell', color: '#89e051', stars: 18, forks: 6 }
            ].map((project, i) => (
              <div key={i} className="project-card">
                <div className="project-header">
                  <a href="#" className="project-title">{project.title}</a>
                  <a href="#" className="project-link">🔗</a>
                </div>
                <p className="project-description">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, j) => <span key={j} className="project-tag">{tag}</span>)}
                </div>
                <div className="project-footer">
                  <div className="project-language">
                    <span className="language-dot" style={{ background: project.color }}></span>
                    <span>{project.lang}</span>
                  </div>
                  <div className="project-stats">
                    <span className="stat">⭐ {project.stars}</span>
                    <span className="stat">🍴 {project.forks}</span>
                  </div>
                </div>
                <a href="#" className="github-link"><span>👁️</span> View on GitHub</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="skills">
        <div className="section-container">
          <h2>Skills & Technologies</h2>
          <p className="skills-subtitle">A comprehensive overview of the technologies, languages, and tools I work with to build amazing software experiences.</p>

          <div className="skills-grid">
            {[
              { icon: '🌐', title: 'Frontend Development', skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js', 'Vue.js', 'Angular'] },
              { icon: '⚙️', title: 'Backend Development', skills: ['Node.js', 'Python', 'Java', 'Express.js', 'Django', 'Spring Boot', 'REST APIs', 'GraphQL'] },
              { icon: '📱', title: 'Mobile Development', skills: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Kotlin', 'Swift'] },
              { icon: '☁️', title: 'Cloud & DevOps', skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Git', 'GitHub Actions'] },
              { icon: '💻', title: 'Programming Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'SQL'] },
              { icon: '🔧', title: 'Tools & Technologies', skills: ['VS Code', 'IntelliJ IDEA', 'Postman', 'Figma', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase'] }
            ].map((category, i) => (
              <div key={i} className="skill-category">
                <div className="skill-header">
                  <span className="skill-icon">{category.icon}</span>
                  <h3 className="skill-title">{category.title}</h3>
                </div>
                <div className="skill-items">
                  {category.skills.map((skill, j) => <span key={j} className="skill-item">{skill}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="learning-section">
            <h3>Always Learning</h3>
            <p>Technology evolves rapidly, and I'm committed to continuous learning. I regularly explore new frameworks, tools, and best practices to stay current with industry trends and deliver cutting-edge solutions.</p>
          </div>
        </div>
      </section>

      <section id="games" className="games">
        <div className="section-container">
          <h2>Interactive Games</h2>
          <p className="games-subtitle">
            Take a break and challenge yourself with these interactive games I've built.
            Test your problem-solving skills!
          </p>
          <GameTabs />
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="section-container">
          <h2>Let's Connect</h2>
          <p className="contact-subtitle">Have a project idea? Want to chat about tech? Interested in brand collaborations? Or just say hi? I'd love to hear from you!</p>

          <div className="contact-container">
            <div className="contact-left">
              <h3><span style={{ color: 'var(--primary-blue)' }}>💬</span> Get in Touch</h3>
              <p>I'm always excited to connect with fellow creators, developers, brands, and curious minds. Choose your preferred way to reach out!</p>
              <div className="contact-methods">
                <div className="contact-method">
                  <span className="method-icon">📧</span>
                  <div className="method-content">
                    <h4>Email</h4>
                    <p>Drop me a line anytime</p>
                    <a href="mailto:nirmitshah@gmail.com">nirmitshah@gmail.com</a>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="method-icon">☕</span>
                  <div className="method-content">
                    <h4>Coffee Chat</h4>
                    <p>Let's grab virtual coffee</p>
                    <a href="#">Schedule a call</a>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="method-icon">🤝</span>
                  <div className="method-content">
                    <h4>Brand Collaborations</h4>
                    <p>Partnership opportunities</p>
                    <a href="#">Let's collaborate</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3 className="form-title"><span style={{ color: 'var(--primary-blue)' }}>✉️</span> Send a Message</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="your.email@example.com" required />
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" id="collab" name="collab" />
                  <label htmlFor="collab">This is regarding a brand collaboration</label>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Tell me about your project, question, collaboration idea, or just say hello!" required></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message ✈️</button>
              </form>
              <p className="form-footer">This will open your email client with the message pre-filled.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;