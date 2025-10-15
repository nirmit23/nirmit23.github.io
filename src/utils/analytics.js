import ReactGA from 'react-ga4';

// Track page views
export const trackPageView = (page) => {
  ReactGA.send({ 
    hitType: "pageview", 
    page: page,
    title: page 
  });
};

// Track button clicks
export const trackButtonClick = (buttonName, section) => {
  ReactGA.event({
    category: 'Button',
    action: 'Click',
    label: buttonName,
    value: section
  });
};

// Track section views
export const trackSectionView = (sectionName) => {
  ReactGA.event({
    category: 'Navigation',
    action: 'Section View',
    label: sectionName
  });
};

// Track game interactions
export const trackGameEvent = (gameName, action, value) => {
  ReactGA.event({
    category: 'Games',
    action: action,
    label: gameName,
    value: value
  });
};

// Track project clicks
export const trackProjectClick = (projectName) => {
  ReactGA.event({
    category: 'Projects',
    action: 'View Project',
    label: projectName
  });
};

// Track contact clicks
export const trackContactClick = (contactType) => {
  ReactGA.event({
    category: 'Contact',
    action: 'Click',
    label: contactType
  });
};

// Track theme toggle
export const trackThemeToggle = (newTheme) => {
  ReactGA.event({
    category: 'User Interaction',
    action: 'Theme Toggle',
    label: newTheme
  });
};