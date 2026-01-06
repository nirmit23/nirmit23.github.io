import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Maximize2, User, Bot } from 'lucide-react';
import './ChatWidget.css';

export default function ChatWidget({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Nirmit's AI assistant. How can I help you today?", sender: 'bot', time: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Tell me about Nirmit",
    "What are his skills?",
    "View projects",
    "Contact information"
  ];

  const getBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('nirmit') || lowerMsg.includes('about') || lowerMsg.includes('who')) {
      return "Nirmit is a Software Development Engineer pursuing his Master's in Computer Software Engineering at Northeastern University. He has experience in full-stack development, mobile development, and cloud infrastructure!";
    } else if (lowerMsg.includes('skill') || lowerMsg.includes('technology')) {
      return "Nirmit is proficient in React, Node.js, Python, Swift, Java, AWS, and many more technologies. Check out the Skills section for the complete list!";
    } else if (lowerMsg.includes('project')) {
      return "Nirmit has worked on various projects including Supply Chain Management Systems, Live Air Drop iOS app, Credit Card Fraud Detection, and more. Scroll to the Projects section to see them all!";
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
      return "You can reach Nirmit via email at shah.nirm@northeastern.edu or connect on LinkedIn. Check the Contact section at the bottom!";
    } else if (lowerMsg.includes('experience') || lowerMsg.includes('work')) {
      return "Nirmit has worked at Enlabel Global Services Inc. in Boston, Finalyca Technologies in Mumbai, and Shaalastic. He has experience in full-stack development, QA automation, and cloud infrastructure.";
    } else if (lowerMsg.includes('education') || lowerMsg.includes('study')) {
      return "Nirmit is currently pursuing his Master's in Computer Software Engineering at Northeastern University (graduating May 2026). He holds a Bachelor's degree in Computer Engineering.";
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return "Hello! 👋 How can I help you learn more about Nirmit's work and experience?";
    } else if (lowerMsg.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any other questions about Nirmit's portfolio.";
    } else {
      return "I'm here to help you learn about Nirmit's skills, projects, and experience. Try asking about his projects, skills, or contact information!";
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: 'bot',
        time: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply) => {
    setInputText(reply);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`chat-widget ${isExpanded ? 'expanded' : ''}`}>
      <div className="chat-widget-header">
        <div className="chat-title">
          <MessageCircle size={18} />
          <div>
            <span className="chat-title-text">Chat Assistant</span>
            <span className="chat-status">● Online</span>
          </div>
        </div>
        <div className="chat-actions">
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="expand-btn"
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            <Maximize2 size={16} />
          </button>
          <button onClick={onClose} className="chat-close-btn">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.sender}`}>
            <div className="message-avatar">
              {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className="message-content">
              <div className="message-bubble">
                {message.text}
              </div>
              <div className="message-time">
                {message.time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="chat-message bot">
            <div className="message-avatar">
              <Bot size={16} />
            </div>
            <div className="message-content">
              <div className="message-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="quick-replies">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="quick-reply-btn"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button 
          onClick={handleSend} 
          className="chat-send-btn"
          disabled={!inputText.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}