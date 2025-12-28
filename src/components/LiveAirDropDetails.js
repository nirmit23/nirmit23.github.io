import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Sun, Moon } from 'lucide-react';
import './LiveAirDropDetails.css';
import { useParams } from 'react-router-dom';
export default function LiveAirDropDetails({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const { projectSlug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="airdrop-details-page">
      {/* Navigation */}
      <nav className="project-nav">
        <div className="nav-container">
          <button onClick={() => navigate('/')} className="back-btn">
            <ArrowLeft size={20} />
            Back to Portfolio
          </button>
          <div className="logo">Nirmit</div>
          <div className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="airdrop-hero">
        <div className="airdrop-hero-content">
          <div className="project-breadcrumb">
            <Link to="/#projects">Projects</Link>
            <span>/</span>
            <span>Live Air Drop</span>
          </div>
          
          <h1 className="airdrop-title">Live Air Drop</h1>
          <p className="airdrop-subtitle">
            iOS application with real-time file sharing capabilities built with SwiftUI and designed in Figma.
          </p>

          <div className="airdrop-meta">
            <div className="meta-item">
              <span className="language-dot" style={{ background: '#ffac45' }}></span>
              <span>Swift</span>
            </div>
            <div className="project-tags-hero">
              <span className="tag-badge">Xcode</span>
              <span className="tag-badge">SwiftUI</span>
              <span className="tag-badge">Figma</span>
            </div>
          </div>

          <div className="airdrop-actions">
            <a 
              href="https://github.com/nirmit231999/Live-Air-Drop/tree/main" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn"
            >
              <Github size={20} />
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Figma Prototype Section */}
      <div className="airdrop-content">
        <div className="content-container-wide">
          <div className="figma-section">
            <div className="figma-header">
              <h2>📱 Feature Flowchart & Design</h2>
              <p>Interactive Figma prototype showing the complete feature flow and UI design</p>
            </div>

            <div className="figma-embed-card">
              <iframe
                style={{ border: 'none' }}
                width="100%"
                height="100%"
                src="https://www.figma.com/embed?embed_host=share&mode=present&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FWTq4Oyw9lMZxyvBSyn4SJd%2FLive-Airdrop-Feature-Flowchart%3Fnode-id%3D0-1"
                allowFullScreen
                title="Live Air Drop Figma Design"
              />
            </div>

            <div className="figma-actions">
              <a 
                href="https://www.figma.com/board/WTq4Oyw9lMZxyvBSyn4SJd/Live-Airdrop-Feature-Flowchart"
                target="_blank"
                rel="noopener noreferrer"
                className="figma-open-btn"
              >
                <ExternalLink size={18} />
                Open in Figma
              </a>
            </div>
          </div>

          {/* Project Info */}
          <div className="project-info-section">
            <div className="info-card">
              <h3>🎯 About the Project</h3>
              <p>
                Live Air Drop is an iOS application that enables real-time file sharing between devices. 
                Built with SwiftUI for a native iOS experience, this project showcases modern mobile 
                development practices and intuitive UI/UX design.
              </p>
            </div>

            <div className="info-card">
              <h3>🛠️ Technology Stack</h3>
              <div className="tech-pills-grid">
                <span className="tech-pill">SwiftUI</span>
                <span className="tech-pill">Xcode</span>
                <span className="tech-pill">iOS SDK</span>
                <span className="tech-pill">Figma</span>
                <span className="tech-pill">UIKit</span>
              </div>
            </div>

            <div className="info-card">
              <h3>✨ Key Features</h3>
              <ul className="features-list-simple">
                <li>Real-time file transfer between iOS devices</li>
                <li>Intuitive SwiftUI interface</li>
                <li>Secure data transmission</li>
                <li>Progress tracking and notifications</li>
                <li>Support for multiple file types</li>
              </ul>
            </div>
          </div>

          {/* Back Button */}
          <div className="back-section">
            <button onClick={() => navigate('/')} className="back-bottom-btn">
              <ArrowLeft size={20} />
              Back to All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}