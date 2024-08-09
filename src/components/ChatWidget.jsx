// ChatWidget.jsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

const SOCKET_SERVER_URL = 'http://localhost:3000';

const handleClick = () => {
  const chatCtn = document.getElementById("chat-ctn");
  const chatWidget = document.getElementById("show");

  if (chatCtn.classList.contains("hidden")) {
    chatCtn.classList.remove("hidden");
    setTimeout(() => chatCtn.classList.add("show"), 50); // small delay to trigger animation
  } else {
    chatCtn.classList.remove("show");
    setTimeout(() => chatCtn.classList.add("hidden"), 2000); // match transition duration
  }

}
function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const chatBodyRef = useRef(null);


  return (
    <div className={`chat-widget absolute bottom-0 right-0 ${isOpen ? 'open' : ''}`} onClick={handleClick}>
      <button className="chat-icon">
        🗨️
      </button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <button className="close-btn">
              &times;
            </button>
            <h3>Chat</h3>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.isUser ? 'user' : 'bot'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
