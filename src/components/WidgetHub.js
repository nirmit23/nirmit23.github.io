import React, { useState } from 'react';
import { Sparkles, Cloud, MessageCircle, Clock, X } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import ChatWidget from './ChatWidget';
import TimeWidget from './TimeWidget';
import './WidgetHub.css';

export default function WidgetHub() {
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [activeWidget, setActiveWidget] = useState(null);

  const toggleHub = () => {
    if (activeWidget) {
      // Close active widget if any is open
      setActiveWidget(null);
    }
    setIsHubOpen(!isHubOpen);
  };

  const toggleWidget = (widgetName) => {
    if (activeWidget === widgetName) {
      // If clicking the same widget, close it
      setActiveWidget(null);
    } else {
      // Open the new widget (closes any other)
      setActiveWidget(widgetName);
      setIsHubOpen(false); // Hide the widget FABs when a widget opens
    }
  };

  const closeWidget = () => {
    setActiveWidget(null);
  };

  return (
    <>
      {/* Main FAB Button */}
      <button 
        className={`widget-hub-fab ${isHubOpen || activeWidget ? 'active' : ''}`}
        onClick={toggleHub}
        title="Widgets"
      >
        {isHubOpen || activeWidget ? <X size={24} /> : <Sparkles size={24} />}
      </button>

      {/* Widget FAB Buttons - Only show when hub is open and no widget is active */}
      {isHubOpen && !activeWidget && (
        <>
          {/* Weather Widget FAB - 12 o'clock */}
          <button
            className="widget-fab weather-fab"
            onClick={() => toggleWidget('weather')}
            title="Weather"
          >
            <Cloud size={22} />
          </button>

          {/* Chat Widget FAB - 1:30 */}
          <button
            className="widget-fab chat-fab"
            onClick={() => toggleWidget('chat')}
            title="Chat"
          >
            <MessageCircle size={22} />
          </button>

          {/* Time Widget FAB - 3 o'clock */}
          <button
            className="widget-fab time-fab"
            onClick={() => toggleWidget('time')}
            title="Time & Date"
          >
            <Clock size={22} />
          </button>
        </>
      )}

      {/* Active Widget - All render in same position */}
      {activeWidget && (
        <div className="widget-container">
          {activeWidget === 'weather' && (
            <WeatherWidget onClose={closeWidget} />
          )}

          {activeWidget === 'chat' && (
            <ChatWidget onClose={closeWidget} />
          )}

          {activeWidget === 'time' && (
            <TimeWidget onClose={closeWidget} />
          )}
        </div>
      )}
    </>
  );
}