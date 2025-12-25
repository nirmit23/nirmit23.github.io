import React from 'react';

export default function About({ scrollToSection }) {
  return (
    <section className="about">
      <div className="section-container">
        <div className="about-content">
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
          <div className="about-right">
            <div className="circle-card">
              {/* <div className="circle-icon">🧑🏻‍💻</div>
              <h3>Always Building</h3>
              <p>Creating solutions that matter</p> */}
             
              <img 
                    src="/me.png"
                    className='me-img'
                  />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}