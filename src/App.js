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
            <li><a href="#education" className={activeSection === 'education' ? 'active' : ''} onClick={() => scrollToSection('education')}>Education</a></li>
            <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''} onClick={() => scrollToSection('experience')}>Experience</a></li>
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


        <h1 className="gradient-name">
          <span className="bracket">&#123;</span>
          <span className="name-text">Nirmit Shah</span>
          <span className="bracket">&#125;</span>
        </h1>
        <p className="subtitle">Software Engineer</p>
        <div className="tags-container">
          <div className="tag"><span className="tag-icon">💻</span><span>Developed</span></div>
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
              <p>I’m a <strong>software engineer</strong> driven by <strong>curiosity</strong>, <strong>innovation</strong>, and the <strong>art of problem-solving</strong>. I love transforming <strong>complex challenges</strong> into <strong>elegant, high-performance code</strong> and crafting <strong>products that make a real impact</strong>.
                <br /><br />
                My passion lies at the intersection of <strong>creativity</strong> and <strong>engineering</strong> — from <strong>architecting scalable systems</strong> to <strong>designing seamless user experiences</strong>. I thrive on <strong>exploring new technologies</strong>, <strong>experimenting with ideas</strong>, and <strong>pushing boundaries</strong> in how software can shape the world.
              </p>
              <a href="#contact" className="connect-btn" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Let's Connect →</a>
            </div>
            <div className="about-right">
              <div className="circle-card">
                <div className="circle-icon">🧑🏻‍💻</div>
                <h3>Always Building</h3>
                <p>Creating solutions that matter</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="education" className="education">
        <div className="section-container">
          <h2>Education</h2>
          <p className="education-subtitle">
            Academic background and qualifications that shaped my technical foundation.
          </p>

          <div className="education-timeline">
            <div className="education-card">
              <div className="education-header">
                <div className="education-title">
                  <h3>Master of Science in Computer Software Engineering</h3>
                  <span className="education-date">Expected May 2026</span>
                </div>
                <div className="education-school">
                  <span className="school-name">Northeastern University</span>
                  <span className="school-location">Boston, Massachusetts</span>
                </div>
              </div>
              <div className="education-details">
                <p><strong>Coursework:</strong> Cloud Computing, Object-Oriented Design, Program Structure & Algorithms, User Experience Design, Web Design</p>
              </div>
            </div>

            <div className="education-card">
              <div className="education-header">
                <div className="education-title">
                  <h3>Bachelor of Engineering in Information Technology</h3>
                  <span className="education-date">May 2022</span>
                </div>
                <div className="education-school">
                  <span className="school-name">University of Mumbai</span>
                  <span className="school-location">Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Work Experience Section */}
      // Remove this import line (line 7):
// import enlabelLogo from './enlabel-logo.jpg';

// Then update your experience section to use the public folder images:

{/* Work Experience Section */}
<section id="experience" className="experience">
  <div className="section-container">
    <h2>Work Experience</h2>
    <p className="experience-subtitle">
      Professional journey building scalable software solutions and leading development initiatives.
    </p>

    <div className="experience-timeline">
      {/* Enlabel Global Services */}
      <div className="experience-card">
        <div className="experience-content-wrapper">
          <div className="experience-image">
            <img src="/enlabel-logo.png" alt="Enlabel Global Services" />
          </div>
          <div className="experience-details">
            <div className="experience-header">
              <div className="experience-left">
                <h3 className="experience-title">Software Development Engineer</h3>
                <div className="company-info">
                  <span className="company-name">Enlabel Global Services Inc.</span>
                  <span className="separator">•</span>
                  <span className="company-location">Boston, Massachusetts</span>
                </div>
              </div>
              <span className="experience-date">June 2024 - January 2025</span>
            </div>
            <ul className="experience-highlights">
              <li>Engineered SaaS publishing workflow in React integrating Java-based SOAP APIs, automating publisher submissions and owner approvals across microservices</li>
              <li>Developed reusable npm libraries to standardize UI components, reducing repetitive frontend effort by 20%</li>
              <li>Converted Figma prototypes into a responsive Next.js web app using Strapi CMS and IIS deployment, increasing user acquisition by 25%</li>
              <li>Implemented OAuth 2.0 + JWT authentication in Node.js, improving session persistence & data security across users</li>
              <li>Debugged and stabilized 186+ Selenium/NUnit scripts in C#, reducing CI/CD failures by 18% boosting pipeline reliability</li>
              <li>Enhanced test coverage through 12+ new automation scripts and optimized 163+ feature validation tests via Jenkins</li>
              <li>Built iOS registration module in Swift with email validation and UserDefaults credential persistence, ensuring seamless login</li>
              <li>Collaborated with cross-functional QA teams to integrate test automation into deployment pipelines and accelerate release readiness by 30%</li>
            </ul>
            <div className="experience-tags">
              <span className="exp-tag">React</span>
              <span className="exp-tag">Next.js</span>
              <span className="exp-tag">Node.js</span>
              <span className="exp-tag">OAuth 2.0</span>
              <span className="exp-tag">Jenkins</span>
              <span className="exp-tag">Selenium</span>
              <span className="exp-tag">ASP.Net</span>
            </div>
          </div>
        </div>
      </div>

      {/* Finalyca Technologies */}
      <div className="experience-card">
        <div className="experience-content-wrapper">
          <div className="experience-image">
            <img src="/finalyca_logo.png" alt="Finalyca Technologies" />
          </div>
          <div className="experience-details">
            <div className="experience-header">
              <div className="experience-left">
                <h3 className="experience-title">Software Development Engineer</h3>
                <div className="company-info">
                  <span className="company-name">Finalyca Technologies Pvt. Ltd</span>
                  <span className="separator">•</span>
                  <span className="company-location">Mumbai, India</span>
                </div>
              </div>
              <span className="experience-date">June 2022 - June 2023</span>
            </div>
            <ul className="experience-highlights">
              <li>Architected a pre-login Next.js portal using Ant Design UI, improving interface responsiveness and user experience by 30%</li>
              <li>Integrated CSV-based data pipelines for server-side static generation, enabling faster data loading and improving content accuracy by 25%</li>
              <li>Migrated legacy portal from .NET to React.js (ES6) using Hooks, improving efficiency and maintainability by 33%</li>
              <li>Implemented GitLab CI/CD pipelines to automate React builds and accelerated deployment cycles by 25%</li>
              <li>Developed & integrated RESTful APIs with React using async/await, improving data retrieval speed & responsiveness</li>
              <li>Engineered Java-based RESTful backend services, reducing data processing latency by 20% </li>
              <li>Implemented 34+ Highcharts visualizations using Java endpoints, achieving 99% cross-browser responsiveness</li>
            </ul>
            <div className="experience-tags">
              <span className="exp-tag">Next.js</span>
              <span className="exp-tag">React.js</span>
              <span className="exp-tag">Java</span>
              <span className="exp-tag">GitLab CI/CD</span>
              <span className="exp-tag">Highcharts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shaalastic */}
      <div className="experience-card">
        <div className="experience-content-wrapper">
          <div className="experience-image">
            <img src="/shaalastic.png" alt="Shaalastic" />
          </div>
          <div className="experience-details">
            <div className="experience-header">
              <div className="experience-left">
                <h3 className="experience-title">Software Engineer Intern</h3>
                <div className="company-info">
                  <span className="company-name">Shaalastic</span>
                  <span className="separator">•</span>
                  <span className="company-location">Mumbai, India</span>
                </div>
              </div>
              <span className="experience-date">May 2020 - August 2021</span>
            </div>
            <ul className="experience-highlights">
              <li>Developed instructional website with Laravel and PHP, implementing user authentication and secure login features</li>
              <li>Engineered backend with Laravel's MVC architecture, integrated RESTful APIs, and managed dynamic MySQL databases</li>
              <li>Optimized database performance via indexing and integrated Git for efficient version control and collaboration</li>
            </ul>
            <div className="experience-tags">
              <span className="exp-tag">Laravel</span>
              <span className="exp-tag">PHP</span>
              <span className="exp-tag">MySQL</span>
              <span className="exp-tag">Git</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      <section id="projects" className="projects">
        <div className="section-container">
          <h2>My Projects</h2>
          {/* <p className="projects-subtitle">A collection of projects I've been working on. From web applications to open source contributions, here's what keeps me busy.</p> */}

          {/* <div className="filter-bar">
            <span className="filter-info">Showing 6 repositories</span>
            <select className="sort-dropdown">
              <option>Sort by: Most Stars</option>
              <option>Sort by: Recently Updated</option>
              <option>Sort by: Name</option>
            </select>
          </div> */}

          <div className="projects-grid">
            {[
              { title: 'Boston-Town-Platform', desc: 'A comprehensive urban management platform designed to streamline city services and improve citizen engagement through modern web technologies.', tags: ['react', 'nodejs', 'mongodb'], lang: 'JavaScript', color: '#f1e05a', link: 'https://github.com/nirmit231999/webapp' },
              { title: 'Health-Check-API', desc: 'Robust health monitoring API system with real-time status updates, comprehensive logging, and automated alert mechanisms for microservices.', tags: ['python', 'fastapi', 'docker'], lang: 'Python', color: '#3572A5', link: 'https://github.com/nirmit231999/webapp' },
              { title: 'E-Commerce-Platform', desc: 'Full-stack e-commerce solution with advanced features including real-time inventory management, secure payment processing, and personalized recommendations.', tags: ['react', 'express', 'stripe'], lang: 'TypeScript', color: '#2b7489', link: 'https://github.com/nirmit231999/webapp' },
              {
                title: 'Credit-Card-Fraud-Detection',
                desc: 'A machine learning-powered Flask web app that predicts fraudulent transactions in real time using logistic regression and scikit-learn. Integrated with email notifications for user alerts.',
                tags: ['flask', 'python', 'machine-learning', 'scikit-learn'],
                lang: 'Python',
                color: '#3572A5',
                link: 'https://github.com/nirmit231999/webapp'
              },

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
                  <a href={project.link} className="github-link"><span>👁️</span> View on GitHub</a>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="skills">
        <div className="section-container">
          <h2>Skills & Technologies</h2>
          {/* <p className="skills-subtitle">A comprehensive overview of the technologies, languages, and tools I work with to build amazing software experiences.</p> */}

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
            {/* <h3>Always Learning</h3>
            <p>Technology evolves rapidly, and I'm committed to continuous learning. I regularly explore new frameworks, tools, and best practices to stay current with industry trends and deliver cutting-edge solutions.</p> */}
          </div>
        </div>
      </section>

      {/* Education Section */}




      <section id="games" className="games">
        <div className="section-container">
          <h2>Interactive Games</h2>
          {/* <p className="games-subtitle">
            Take a break and challenge yourself with these interactive games I've built.
            Test your problem-solving skills!
          </p> */}
          <GameTabs />
        </div>
      </section>
      <section id="contact" className="contact">
        <div className="section-container">
          <h2>Let's Connect</h2>
          {/* <p className="contact-subtitle">
      Have a project idea? Want to chat about tech? I'd love to hear from you!
    </p> */}

          <div className="contact-grid">
            {/* Email */}
            <a href="mailto:shah.nirm@northeastern.edu" className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3>Email</h3>
              <p>shah.nirm@northeastern.edu</p>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com/in/shah-nirmit/" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/shah-nirmit</p>
            </a>

            {/* GitHub */}
            <a href="https://github.com/nirmit231999" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <h3>GitHub</h3>
              <p>github.com/nirmit231999</p>
            </a>
          </div>
        </div>
      </section>
      {/* <section id="contact" className="contact">
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
      </section> */}
    </div>
  );
}

export default App;