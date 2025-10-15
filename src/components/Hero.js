import React from 'react';

export default function Hero({ scrollToSection }) {
  return (
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
        <div className="tag">
          <span className="tag-icon">💻</span>
          <span>Engineering</span>
        </div>
        <div className="tag">
          <span className="tag-icon">🚀</span>
          <span>Development</span>
        </div>
        <div className="tag">
          <span className="tag-icon">✨</span>
          <span>Creating</span>
        </div>
      </div>
      
      <div>
        <a 
          href="#projects" 
          className="cta-button" 
          onClick={(e) => { 
            e.preventDefault(); 
            scrollToSection('projects'); 
          }}
        >
          Explore My Work →
        </a>
      </div>
    </section>
  );
}