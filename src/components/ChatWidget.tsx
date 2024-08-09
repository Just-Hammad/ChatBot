"use client";

import React, { useState, useRef, FormEvent } from 'react';
import './ChatWidget.css';

interface Message {
  text: string;
  isUser: boolean;
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, isUser: true }]);
      setMessage('');
    }
  };

  const handleClick = () => {
    const chatCtn = document.getElementById("chat-ctn");
    const chatWidget = document.getElementById("show");

    if (chatCtn && chatWidget) {
      if (chatCtn.classList.contains("hidden")) {
        chatCtn.classList.remove("hidden");
        setTimeout(() => chatCtn.classList.add("show"), 50);
      } else {
        chatCtn.classList.remove("show");
        setTimeout(() => chatCtn.classList.add("hidden"), 2000);
      }
    }
  };

  return (
    <div className={`chat-widget absolute bottom-0 right-0 ${isOpen ? 'open' : ''}`} onClick={handleClick}>
      <button className="chat-icon">
        🗨️
      </button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <button className="close-btn" onClick={() => setIsOpen(false)}>
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
