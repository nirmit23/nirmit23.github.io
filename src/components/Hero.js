import React, { useEffect, useState } from "react";

export default function Hero({ scrollToSection }) {
  const roles = [
    "Software Engineer",
    "Frontend Engineer",
    "UI Engineer",
  ];

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && charIndex < currentRole.length) {
      // typing
      timeout = setTimeout(() => {
        setText(currentRole.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 90);
    } else if (!isDeleting && charIndex === currentRole.length) {
      // pause 3 seconds
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1000);
    } else if (isDeleting && charIndex > 0) {
      // deleting
      timeout = setTimeout(() => {
        setText(currentRole.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

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

      {/* 👇 Typing Effect Subtitle */}
      <p className="subtitle">
        {text}
        <span className="cursor">|</span>
      </p>

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
            scrollToSection("projects");
          }}
        >
          Explore My Work →
        </a>
      </div>
    </section>
  );
}
