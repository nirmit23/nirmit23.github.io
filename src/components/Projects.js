import React from 'react';

const projectsData = [
  {
    title: 'Boston-Town-Platform',
    desc: 'A comprehensive urban management platform designed to streamline city services and improve citizen engagement through modern web technologies.',
    tags: ['react', 'nodejs', 'mongodb'],
    lang: 'JavaScript',
    color: '#f1e05a',
    link: 'https://github.com/nirmit231999/webapp'
  },
  {
    title: 'Health-Check-API',
    desc: 'Robust health monitoring API system with real-time status updates, comprehensive logging, and automated alert mechanisms for microservices.',
    tags: ['python', 'fastapi', 'docker'],
    lang: 'Python',
    color: '#3572A5',
    link: 'https://github.com/nirmit231999/HealthCheckApi'
  },
  {
    title: 'E-Commerce-Platform',
    desc: 'Full-stack e-commerce solution with advanced features including real-time inventory management, secure payment processing, and personalized recommendations.',
    tags: ['react', 'express', 'stripe'],
    lang: 'TypeScript',
    color: '#2b7489',
    link: 'https://github.com/nirmit231999/ecommerce'
  },
  {
    title: 'Credit-Card-Fraud-Detection',
    desc: 'A machine learning-powered Flask web app that predicts fraudulent transactions in real time using logistic regression and scikit-learn. Integrated with email notifications for user alerts.',
    tags: ['flask', 'python', 'machine-learning', 'scikit-learn'],
    lang: 'Python',
    color: '#3572A5',
    link: 'https://github.com/nirmit231999/fraud-detection'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-container">
        <h2>My Projects</h2>

        <div className="projects-grid">
          {projectsData.map((project, i) => (
            <div key={i} className="project-card">
              <div className="project-header">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-title">
                  {project.title}
                </a>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  🔗
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
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                  <span>👁️</span> View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}