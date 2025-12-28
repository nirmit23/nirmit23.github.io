import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackProjectClick } from '../utils/analytics';

const projectsData = [
  {
    id: 1,
    title: 'Supply-Chain-Management-System',
    desc: 'End-to-end supply chain management platform built with Java Swing and Hibernate that automates order tracking, stock updates, and supplier coordination across warehouses.',
    tags: ['java', 'swing', 'hibernate', 'mvc'],
    lang: 'Java',
    color: '#b07219',
    link: 'https://github.com/nirmit231999/Supply-Chain-Management-System'
  },
  {
    id: 2,
    title: 'Order-Management-System',
    desc: 'Java-based desktop system implementing MVC architecture for managing orders, retailers, and product stock efficiently with real-time updates and layered controllers.',
    tags: ['java', 'swing', 'mvc', 'oop'],
    lang: 'Java',
    color: '#b07219',
    link: 'https://github.com/nirmit231999/Order-Management-System'
  },
  {
    id: 3,
    title: 'Boston-Town-Platform',
    desc: 'A comprehensive urban management platform designed to streamline city services and improve citizen engagement through modern web technologies.',
    tags: ['react', 'nodejs', 'mongodb'],
    lang: 'JavaScript',
    color: '#f1e05a',
    link: 'https://github.com/nirmit231999/Boston-Town'
  },
  {
    id: 4,
    title: 'Health-Check-API',
    desc: 'Robust health monitoring API system with real-time status updates, comprehensive logging, and automated alert mechanisms for microservices.',
    tags: ['python', 'fastapi', 'docker'],
    lang: 'AWS',
    color: '#3572A5',
    link: 'https://github.com/nirmit231999/webapp'
  },
  {
    id: 5,
    title: 'Credit-Card-Fraud-Detection',
    desc: 'A machine learning-powered Flask web app that predicts fraudulent transactions in real time using logistic regression and scikit-learn. Integrated with email notifications for user alerts.',
    tags: ['flask', 'python', 'machine-learning', 'scikit-learn'],
    lang: 'Python',
    color: '#3572A5',
    link: 'https://github.com/nirmit23/ccfd'
  },
  {
    id: 6,
    title: 'Live Air Drop',
    desc: 'iOS application with real-time file sharing capabilities built with SwiftUI and designed in Figma.',
    tags: ['Xcode', 'SwiftUI', 'Figma'],
    lang: 'Swift',
    color: '#ffac45',
    link: 'https://github.com/nirmit231999/Live-Air-Drop/tree/main',
    hasDetails: true,
    slug: 'live-air-drop'
  }
];

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleProjectClick = (projectTitle) => {
    trackProjectClick(projectTitle);
  };

  const nextProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToProject = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnimating]);

  const getCardPosition = (index) => {
    const diff = index - currentIndex;
    const total = projectsData.length;
    
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(total - 1)) return 'right';
    if (diff === -1 || diff === total - 1) return 'left';
    if (diff === 2 || diff === -(total - 2)) return 'far-right';
    if (diff === -2 || diff === total - 2) return 'far-left';
    return 'hidden';
  };

  return (
    <section id="projects" className="projects carousel-section">
      <div className="section-container">
        <h2>My Projects</h2>
        <p className="projects-subtitle">
          Explore my portfolio of innovative solutions and applications
        </p>

        <div className="carousel-container">
          {/* Navigation Arrows */}
          <button 
            className="carousel-nav carousel-nav-left" 
            onClick={prevProject}
            disabled={isAnimating}
            aria-label="Previous project"
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            className="carousel-nav carousel-nav-right" 
            onClick={nextProject}
            disabled={isAnimating}
            aria-label="Next project"
          >
            <ChevronRight size={32} />
          </button>

          {/* Carousel Cards */}
          <div className="carousel-wrapper">
            {projectsData.map((project, index) => {
              const position = getCardPosition(index);
              
              return (
                <div 
                  key={project.id} 
                  className={`carousel-card ${position} ${isAnimating ? 'animating' : ''}`}
                >
                  <div className="project-card-inner">
                    <div className="project-header">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-title"
                      >
                        {project.title}
                      </a>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link-icon"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    
                    <p className="project-description">{project.desc}</p>
                    
                    <div className="project-tags">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    
                    <div className="project-footer">
                      <div className="project-language">
                        <span className="language-dot" style={{ background: project.color }}></span>
                        <span>{project.lang}</span>
                      </div>
                      
                      {project.hasDetails ? (
                        <Link 
                          to={`/project/${project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`} 
                          className="view-more-btn"
                        >
                          View More <ArrowRight size={16} />
                        </Link>
                      ) : (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="github-link"
                          onClick={() => handleProjectClick(project.title)}
                        >
                          <Eye size={16} />
                          <span>View on GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="carousel-pagination">
            {projectsData.map((_, index) => (
              <button
                key={index}
                className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToProject(index)}
                disabled={isAnimating}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Project Counter */}
        <div className="carousel-counter">
          <span className="counter-current">{currentIndex + 1}</span>
          <span className="counter-separator">/</span>
          <span className="counter-total">{projectsData.length}</span>
        </div>
      </div>
    </section>
  );
}

export { projectsData };