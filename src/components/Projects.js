import React from 'react';
import { trackProjectClick } from '../utils/analytics';
const projectsData = [
  {
    title: 'Supply-Chain-Management-System',
    desc: 'End-to-end supply chain management platform built with Java Swing and Hibernate that automates order tracking, stock updates, and supplier coordination across warehouses.',
    tags: ['java', 'swing', 'hibernate', 'mvc'],
    lang: 'Java',
    color: '#b07219',
    link: 'https://github.com/nirmit231999/Supply-Chain-Management-System'
  },

  {
    title: 'Order-Management-System',
    desc: 'Java-based desktop system implementing MVC architecture for managing orders, retailers, and product stock efficiently with real-time updates and layered controllers.',
    tags: ['java', 'swing', 'mvc', 'oop'],
    lang: 'Java',
    color: '#b07219',
    link: 'https://github.com/nirmit231999/Order-Management-System'
  },
  {
    title: 'Boston-Town-Platform',
    desc: 'A comprehensive urban management platform designed to streamline city services and improve citizen engagement through modern web technologies.',
    tags: ['react', 'nodejs', 'mongodb'],
    lang: 'JavaScript',
    color: '#f1e05a',
    link: 'https://github.com/nirmit231999/Boston-Town'
  },
  {
    title: 'Health-Check-API',
    desc: 'Robust health monitoring API system with real-time status updates, comprehensive logging, and automated alert mechanisms for microservices.',
    tags: ['python', 'fastapi', 'docker'],
    lang: 'AWS',
    color: '#3572A5',
    link: 'https://github.com/nirmit231999/webapp'
  },
  {
    title: 'Credit-Card-Fraud-Detection',
    desc: 'A machine learning-powered Flask web app that predicts fraudulent transactions in real time using logistic regression and scikit-learn. Integrated with email notifications for user alerts.',
    tags: ['flask', 'python', 'machine-learning', 'scikit-learn'],
    lang: 'Python',
    color: '#3572A5',
    link: 'https://github.com/nirmit23/ccfd'
  },
  {
    title: 'Live Air Drop',
    desc: 'A machine learning-powered Flask web app that predicts fraudulent transactions in real time using logistic regression and scikit-learn. Integrated with email notifications for user alerts.',
    tags: ['Xcode', 'SwiftUI', 'Figma'],
    lang: 'SwiftUI',
    color: '#3572A5',
    link: 'https://github.com/nirmit231999/Live-Air-Drop/tree/main'
  }
];

export default function Projects() {
    const handleProjectClick = (projectTitle) => {
        trackProjectClick(projectTitle);
      };
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
                <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="github-link"
                onClick={() => handleProjectClick(project.title)}
              >
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


