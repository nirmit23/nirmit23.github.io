import React from 'react';

const educationData = [
  {
    degree: 'Master of Science in Computer Software Engineering',
    school: 'Northeastern University',
    location: 'Boston, Massachusetts',
    date: 'December 2025',
    coursework: 'Cloud Computing, Object-Oriented Design, Program Structure & Algorithms, User Experience Design, Web Design',
    logoLight: '/northeastern-logo.png',
    logoDark: '/northeastern-logo.png'
  },
  {
    degree: 'Bachelor of Engineering in Information Technology',
    school: 'University of Mumbai',
    location: 'Mumbai, India',
    date: 'May 2022',
    logoLight: '/mumbaiuniversity-logo.png',
    logoDark: '/mumbaiuniversity-logo.png'
  }
];

export default function Education() {
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="education">
      <div className="section-container">
        <h2>Education</h2>
        <p className="education-subtitle">
          Academic background and qualifications that shaped my technical foundation.
        </p>

        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-content-wrapper">
                <div className="education-logo">
                  <img 
                    src={theme === 'dark' ? edu.logoDark : edu.logoLight} 
                    alt={edu.school}
                  />
                </div>
                <div className="education-details-wrapper">
                  <div className="education-header">
                    <div className="education-title">
                      <h3>{edu.degree}</h3>
                      <span className="education-date">{edu.date}</span>
                    </div>
                    <div className="education-school">
                      <span className="school-name">{edu.school}</span>
                      <span className="school-location">{edu.location}</span>
                    </div>
                  </div>
                  {edu.coursework && (
                    <div className="education-details">
                      <p><strong>Coursework:</strong> {edu.coursework}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}