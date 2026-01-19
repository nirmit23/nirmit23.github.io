import React from 'react';
import ScrollFade from './ScrollFade';

export default function About({ scrollToSection }) {
  return (
    <section className="about">
      <div className="section-container">
        <div className="about-content">
          <ScrollFade direction="right" duration={0.6} delay={50}>
            <div className="about-left">
              <h2>Hey there! 👋</h2>
              <p>
                I'm a <strong>software engineer</strong> driven by <strong>curiosity</strong>, 
                <strong> innovation</strong>, and the <strong>art of problem-solving</strong>. 
                I love transforming <strong>complex challenges</strong> into <strong>elegant, 
                high-performance code</strong> and crafting <strong>products that make a real impact</strong>.
              </p>
              <p>
                My passion lies at the intersection of <strong>creativity</strong> and 
                <strong> engineering</strong> — from <strong>architecting scalable systems</strong> to 
                <strong> designing seamless user experiences</strong>. I thrive on <strong>exploring 
                new technologies</strong>, <strong>experimenting with ideas</strong>, and 
                <strong> pushing boundaries</strong> in how software can shape the world.
              </p>
              <a 
                href="#contact" 
                className="connect-btn" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('contact'); 
                }}
              >
                Let's Connect →
              </a>
            </div>
          </ScrollFade>
          
          <ScrollFade direction="left" duration={0.6} delay={150}>
            <div className="about-right">
              <div className="circle-card">
                <img 
                  src="/me.png"
                  className='me-img'
                  alt="Nirmit Shah"
                />
              </div>
            </div>
          </ScrollFade>
        </div>
      </div>
    </section>
  );
}