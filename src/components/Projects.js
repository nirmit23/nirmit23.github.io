import React from 'react';
import { ExternalLink, Eye, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackProjectClick } from '../utils/analytics';
import { Link } from 'react-router-dom';
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
    figmaUrl: 'https://www.figma.com/embed?embed_host=share&mode=present&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FWTq4Oyw9lMZxyvBSyn4SJd%2FLive-Airdrop-Feature-Flowchart%3Fnode-id%3D0-1'
  }
];

export default function Projects() {
  const navigate = useNavigate();

  const handleProjectClick = (projectTitle) => {
    trackProjectClick(projectTitle);
  };

  const handleViewMore = (projectId) => {
    navigate(`/project/${projectId}`);
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
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-icon">
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
                  <Link to={`/project/${project.title.toLowerCase().replace(/\s+/g, '-')}`} className="view-more-btn">
                     
                      View More  <ArrowRight size={16} />
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
          ))}
        </div>
      </div>
    </section>
  );
}

export { projectsData };