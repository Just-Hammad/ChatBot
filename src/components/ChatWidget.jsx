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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.0867 21.3877L13.6288 20.4718C14.0492 19.7614 14.2595 19.4062 14.5972 19.2098C14.9349 19.0134 15.36 19.0061 16.2104 18.9915C17.4658 18.9698 18.2531 18.8929 18.9134 18.6194C20.1386 18.1119 21.1119 17.1386 21.6194 15.9134C22 14.9946 22 13.8297 22 11.5V10.5C22 7.22657 22 5.58985 21.2632 4.38751C20.8509 3.71473 20.2853 3.14908 19.6125 2.7368C18.4101 2 16.7734 2 13.5 2H10.5C7.22657 2 5.58985 2 4.38751 2.7368C3.71473 3.14908 3.14908 3.71473 2.7368 4.38751C2 5.58985 2 7.22657 2 10.5V11.5C2 13.8297 2 14.9946 2.3806 15.9134C2.88807 17.1386 3.86144 18.1119 5.08658 18.6194C5.74689 18.8929 6.53422 18.9698 7.78958 18.9915C8.63992 19.0061 9.06509 19.0134 9.40279 19.2098C9.74049 19.4063 9.95073 19.7614 10.3712 20.4718L10.9133 21.3877C11.3965 22.204 12.6035 22.204 13.0867 21.3877ZM16 12C16.5523 12 17 11.5523 17 11C17 10.4477 16.5523 10 16 10C15.4477 10 15 10.4477 15 11C15 11.5523 15.4477 12 16 12ZM13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11ZM8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z"
            fill="#ffffff"
          />
        </svg>
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
