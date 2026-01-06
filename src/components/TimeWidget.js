import React, { useState, useEffect } from 'react';
import { Clock, X, Maximize2, Calendar, Globe } from 'lucide-react';
import './TimeWidget.css';

export default function TimeWidget({ onClose }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Update every 50ms for smooth second hand movement
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const worldTimes = [
    { city: 'Boston', timezone: 'America/New_York', flag: '🇺🇸' },
    { city: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
    { city: 'Mumbai', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
    { city: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { city: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWorldTime = (timezone) => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDayPeriod = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: 'Good Morning', emoji: '🌅' };
    if (hour < 17) return { text: 'Good Afternoon', emoji: '☀️' };
    if (hour < 21) return { text: 'Good Evening', emoji: '🌆' };
    return { text: 'Good Night', emoji: '🌙' };
  };

  // Calculate smooth angles for clock hands
  const getClockAngles = () => {
    const hours = currentTime.getHours() % 12;
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const milliseconds = currentTime.getMilliseconds();

    // Smooth second hand - includes milliseconds
    const secondAngle = (seconds + milliseconds / 1000) * 6;

    // Smooth minute hand - includes seconds
    const minuteAngle = (minutes + seconds / 60) * 6;

    // Smooth hour hand - includes minutes and seconds
    const hourAngle = (hours + minutes / 60 + seconds / 3600) * 30;

    return { hourAngle, minuteAngle, secondAngle };
  };

  const { hourAngle, minuteAngle, secondAngle } = getClockAngles();
  const period = getDayPeriod();

  return (
    <div className={`time-widget ${isExpanded ? 'expanded' : ''}`}>
      <div className="time-widget-header">
        <div className="time-title">
          <Clock size={18} />
          <span>Time & Date</span>
        </div>
        <div className="time-actions">
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="expand-btn"
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            <Maximize2 size={16} />
          </button>
          <button onClick={onClose} className="time-close-btn">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="time-content">
        {/* Greeting */}
        <div className="time-greeting">
          <span className="greeting-emoji">{period.emoji}</span>
          <span className="greeting-text">{period.text}</span>
        </div>

        {/* Main Clock */}
        <div className="main-clock">
          <div className="time-display">{formatTime(currentTime)}</div>
          <div className="date-display">
            <Calendar size={16} />
            <span>{formatDate(currentTime)}</span>
          </div>
        </div>

        {/* Analog Clock */}
        <div className="analog-clock">
          <div className="clock-face">
            <div 
              className="clock-hand hour" 
              style={{ 
                transform: `rotate(${hourAngle}deg)` 
              }}
            />
            <div 
              className="clock-hand minute" 
              style={{ 
                transform: `rotate(${minuteAngle}deg)` 
              }}
            />
            <div 
              className="clock-hand second" 
              style={{ 
                transform: `rotate(${secondAngle}deg)` 
              }}
            />
            <div className="clock-center" />
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="clock-number"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-85px)`
                }}
              >
                <span style={{ transform: `rotate(-${i * 30}deg)` }}>
                  {i === 0 ? 12 : i}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* World Clocks */}
        {isExpanded && (
          <div className="world-times">
            <div className="world-times-header">
              <Globe size={16} />
              <span>World Clocks</span>
            </div>
            <div className="world-times-grid">
              {worldTimes.map((location, index) => (
                <div key={index} className="world-time-card">
                  <div className="world-time-flag">{location.flag}</div>
                  <div className="world-time-info">
                    <div className="world-time-city">{location.city}</div>
                    <div className="world-time-time">{getWorldTime(location.timezone)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}