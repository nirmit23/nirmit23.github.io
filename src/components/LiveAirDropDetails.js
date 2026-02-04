import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LiveAirDropDetails.css';
import { ArrowLeft, ExternalLink, Github, Sun, Moon, Zap, HardDrive, Lock, Users, Camera, Wifi, Cloud, CheckCircle, XCircle, RefreshCw, Clock } from 'lucide-react';
export default function LiveAirDropDetails({ theme, toggleTheme }) {
  const navigate = useNavigate();

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

          {/* About the Project - EXPANDED */}
          <div className="project-info-section">
            <div className="info-card">
              <h3>🍏 Apple Feature Concept – Live Airdrop</h3>
              <p className="project-tagline">
                "Live Airdrop — Capture once, share instantly, save smartly."
              </p>
              <p>
                Live Air Drop is an intelligent photo-sharing feature that detects the people in your photo as you take it 
                and instantly shares it with them—either via a shared album or directly to their device gallery. Built with 
                SwiftUI for a native iOS experience, this project showcases modern mobile development practices and 
                intuitive UI/UX design.
              </p>
            </div>

            {/* Problem Statements */}
            <div className="info-card problems-card">
              <h3>🎯 Problem Statements</h3>
              <div className="problem-list">
                <div className="problem-item">
                  <div className="problem-icon">
                    <HardDrive size={24} />
                  </div>
                  <div className="problem-content">
                    <h4>Optimize Storage</h4>
                    <p>Photos take up large amounts of space on the photographer's device.</p>
                  </div>
                </div>
                <div className="problem-item">
                  <div className="problem-icon">
                    <Zap size={24} />
                  </div>
                  <div className="problem-content">
                    <h4>Instant Sharing</h4>
                    <p>Current sharing methods (AirDrop, Messages) require manual selection and confirmation.</p>
                  </div>
                </div>
                <div className="problem-item">
                  <div className="problem-icon">
                    <Clock size={24} />
                  </div>
                  <div className="problem-content">
                    <h4>Save Time</h4>
                    <p>The workflow of taking, selecting, and sending photos creates friction and delays.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="info-card how-it-works-card">
              <h3>⚙️ How It Works</h3>
              <div className="works-grid">
                <div className="work-step">
                  <div className="step-icon">
                    <Camera size={28} />
                  </div>
                  <p>Uses on-device facial recognition to identify people in the frame</p>
                </div>
                <div className="work-step">
                  <div className="step-icon">
                    <Wifi size={28} />
                  </div>
                  <p>Utilizes UWB and Bluetooth proximity detection to find nearby Apple devices</p>
                </div>
                <div className="work-step">
                  <div className="step-icon">
                    <Lock size={28} />
                  </div>
                  <p>With user consent, automatically sends the photo to recognized users</p>
                </div>
                <div className="work-step">
                  <div className="step-icon">
                    <Cloud size={28} />
                  </div>
                  <p>Offers cloud-optimized storage, saving space on the photographer's device by storing shared photos in iCloud</p>
                </div>
              </div>
            </div>

            {/* Smart Recognition Logic */}
            <div className="info-card recognition-card">
              <h3>🧠 Smart Recognition & Sharing Logic</h3>
              <div className="recognition-steps">
                <div className="step-item">
                  <div className="step-number">1</div>
                  <p>When a photo is captured, the photographer's iPhone checks if detected faces match existing contacts or recognized users from previous photos stored in the Photos app.</p>
                </div>
                <div className="step-item">
                  <div className="step-number">2</div>
                  <p>If the face is recognized, the Live Airdrop prompt appears: <span className="highlight">"Share this photo with [Name] via Live Airdrop?"</span></p>
                </div>
                <div className="step-item">
                  <div className="step-number">3</div>
                  <p>If the face is new, a small 'Nearby AirDrop' icon appears, suggesting instant sharing with nearby Apple devices detected.</p>
                </div>
                <div className="step-item">
                  <div className="step-number">4</div>
                  <p>If the new person accepts the Live Airdrop invitation, their profile (name and facial data) is securely saved on-device to enable future automatic recognition.</p>
                </div>
                <div className="step-item">
                  <div className="step-number">5</div>
                  <p>The next time that same person appears in photos, Live Airdrop will instantly detect them and suggest or auto-share based on consent preferences.</p>
                </div>
              </div>
            </div>

            {/* User Permission Flow */}
            <div className="info-card permission-card">
              <h3>🔐 User Permission Flow</h3>
              <div className="permission-flow">
                <div className="permission-step">
                  <div className="permission-number">1</div>
                  <div className="permission-content">
                    <p className="permission-prompt">When the photo is shared for the first time, the recipient's iPhone displays:</p>
                    <div className="prompt-box">
                      "Allow [Photographer Name] to share photos of you via Live Airdrop?"
                    </div>
                  </div>
                </div>
                <div className="permission-step">
                  <div className="permission-number">2</div>
                  <div className="permission-content">
                    <p>The recipient can choose:</p>
                    <div className="choice-options">
                      <div className="choice-option allow">
                        <CheckCircle size={20} />
                        <div>
                          <strong>Always Allow</strong>
                          <p>Automatically receive all future photos taken by this photographer</p>
                        </div>
                      </div>
                      <div className="choice-option once">
                        <RefreshCw size={20} />
                        <div>
                          <strong>Only This Time</strong>
                          <p>Receive just this one photo</p>
                        </div>
                      </div>
                      <div className="choice-option deny">
                        <XCircle size={20} />
                        <div>
                          <strong>Don't Allow</strong>
                          <p>Decline and remove recognition data</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="permission-step">
                  <div className="permission-number">3</div>
                  <div className="permission-content">
                    <p>Once approved, the recognition remains stored securely for future instant sharing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="info-card benefits-card">
              <h3>✨ Key Benefits</h3>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <Zap className="benefit-icon" size={32} />
                  <h4>Instant Sharing</h4>
                  <p>Eliminates manual photo sending steps</p>
                </div>
                <div className="benefit-item">
                  <HardDrive className="benefit-icon" size={32} />
                  <h4>Storage Optimization</h4>
                  <p>Avoids duplicate photos, saving space on both devices</p>
                </div>
                <div className="benefit-item">
                  <Lock className="benefit-icon" size={32} />
                  <h4>Privacy First</h4>
                  <p>All facial data and permissions are stored securely on-device</p>
                </div>
                <div className="benefit-item">
                  <Users className="benefit-icon" size={32} />
                  <h4>Ecosystem Integration</h4>
                  <p>Works seamlessly with Photos, iCloud, and AirDrop APIs</p>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="info-card impact-card">
              <h3>📊 Impact</h3>
              <div className="impact-metrics">
                <div className="metric-item">
                  <div className="metric-value">70%</div>
                  <div className="metric-label">Reduces post-capture steps</div>
                </div>
                <div className="metric-item">
                  <div className="metric-value">20-30%</div>
                  <div className="metric-label">Improves storage efficiency</div>
                </div>
                <div className="metric-item">
                  <div className="metric-value">100%</div>
                  <div className="metric-label">Privacy-conscious sharing network</div>
                </div>
              </div>
            </div>

            {/* User Flow Summary */}
            <div className="info-card flow-summary-card">
              <h3>🔄 User Flow Summary</h3>
              <div className="flow-steps">
                <div className="flow-item">
                  <strong>Step 1:</strong> Capture → Detect → Recognize (or Suggest Nearby) → Prompt → Confirm → Notify → Share
                </div>
                <div className="flow-item">
                  <strong>Step 2:</strong> New faces → Optional Nearby AirDrop share → Future auto-recognition if accepted
                </div>
                <div className="flow-item">
                  <strong>Step 3:</strong> Recipients set consent preferences (Always / One-Time / Decline)
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="info-card">
              <h3>🛠️ Technology Stack</h3>
              <div className="tech-pills-grid">
                <span className="tech-pill">SwiftUI</span>
                <span className="tech-pill">Xcode</span>
                <span className="tech-pill">iOS SDK</span>
                <span className="tech-pill">Figma</span>
                <span className="tech-pill">UIKit</span>
                <span className="tech-pill">Core ML</span>
                <span className="tech-pill">Vision Framework</span>
                <span className="tech-pill">UWB</span>
                <span className="tech-pill">Bluetooth LE</span>
              </div>
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

