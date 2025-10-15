import React from 'react';

const experienceData = [
  {
    title: 'Software Development Engineer',
    company: 'Enlabel Global Services Inc.',
    location: 'Boston, Massachusetts',
    date: 'June 2024 - January 2025',
    logo: '/enlabel-logo.png',
    highlights: [
      'Engineered SaaS publishing workflow in React integrating Java-based SOAP APIs, automating publisher submissions and owner approvals across microservices',
      'Developed reusable npm libraries to standardize UI components, reducing repetitive frontend effort by 20%',
      'Converted Figma prototypes into a responsive Next.js web app using Strapi CMS and IIS deployment, increasing user acquisition by 25%',
      'Implemented OAuth 2.0 + JWT authentication in Node.js, improving session persistence & data security',
      'Enhanced test coverage by 20% through 12+ new automation scripts and optimized 163+ feature validation tests via Jenkins'
    ],
    tags: ['React', 'Next.js', 'Node.js', 'OAuth 2.0', 'Jenkins', 'Selenium', 'ASP.Net']
  },
  {
    title: 'Software Development Engineer',
    company: 'Finalyca Technologies Pvt. Ltd',
    location: 'Mumbai, India',
    date: 'June 2022 - June 2023',
    logo: '/finalyca_logo.png',
    highlights: [
      'Architected a pre-login Next.js portal using Ant Design UI, improving interface responsiveness and user experience by 30%',
      'Integrated CSV-based data pipelines for server-side static generation, enabling faster data loading and improving content accuracy by 25%',
      'Migrated legacy portal from .NET to React.js (ES6) using Hooks, improving efficiency and maintainability by 33%',
      'Implemented GitLab CI/CD pipelines to automate React builds and accelerated deployment cycles by 25%',
      'Implemented 34+ Highcharts visualizations using Java endpoints, achieving 99% cross-browser responsiveness'
    ],
    tags: ['Next.js', 'React.js', 'Java', 'GitLab CI/CD', 'Highcharts']
  },
  {
    title: 'Software Engineer Intern',
    company: 'Shaalastic',
    location: 'Mumbai, India',
    date: 'May 2020 - August 2021',
    logo: '/shaalastic.png',
    highlights: [
      'Developed instructional website with Laravel and PHP, implementing user authentication and secure login features',
      'Engineered backend with Laravel\'s MVC architecture, integrated RESTful APIs, and managed dynamic MySQL databases',
      'Optimized database performance via indexing and integrated Git for efficient version control and collaboration'
    ],
    tags: ['Laravel', 'PHP', 'MySQL', 'Git']
  }
];

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="section-container">
        <h2>Work Experience</h2>
        <p className="experience-subtitle">
          Professional journey building scalable software solutions and leading development initiatives.
        </p>

        <div className="experience-timeline">
          {experienceData.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="experience-content-wrapper">
                <div className="experience-image">
                  <img src={exp.logo} alt={exp.company} />
                </div>
                <div className="experience-details">
                  <div className="experience-header">
                    <div className="experience-left">
                      <h3 className="experience-title">{exp.title}</h3>
                      <div className="company-info">
                        <span className="company-name">{exp.company}</span>
                        <span className="separator">•</span>
                        <span className="company-location">{exp.location}</span>
                      </div>
                    </div>
                    <span className="experience-date">{exp.date}</span>
                  </div>
                  <ul className="experience-highlights">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="experience-tags">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="exp-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}