import React from 'react';

const skillsData = [
  {
    icon: '🌐',
    title: 'Frontend Development',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js', 'Vue.js', 'Angular']
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    skills: ['Node.js', 'Python', 'Java', 'Express.js', 'Django', 'Spring Boot', 'REST APIs', 'GraphQL']
  },
  {
    icon: '📱',
    title: 'Mobile Development',
    skills: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Kotlin', 'Swift']
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Git', 'GitHub Actions']
  },
  {
    icon: '💻',
    title: 'Programming Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'SQL']
  },
  {
    icon: '🔧',
    title: 'Tools & Technologies',
    skills: ['VS Code', 'IntelliJ IDEA', 'Postman', 'Figma', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="section-container">
        <h2>Skills & Technologies</h2>

        <div className="skills-grid">
          {skillsData.map((category, i) => (
            <div key={i} className="skill-category">
              <div className="skill-header">
                <span className="skill-icon">{category.icon}</span>
                <h3 className="skill-title">{category.title}</h3>
              </div>
              <div className="skill-items">
                {category.skills.map((skill, j) => (
                  <span key={j} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}