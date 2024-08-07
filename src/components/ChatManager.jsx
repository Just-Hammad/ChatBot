// ChatManager.jsx
import React, { useState } from 'react';
import ChatWidget from './ChatWidget';
import Chat from './Chat'; // Import the Chat component

const ChatManager = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleChatWidgetClick = () => {
    setIsChatVisible(true);
  };

  const handleCloseChat = () => {
    setIsChatVisible(false);
  };

  return (
    <div>
      {/* Render Chat component conditionally */}
      {isChatVisible && (
        <div className="chat-container">
          <Chat onClose={handleCloseChat} />
        </div>
      )}

      {/* Render ChatWidget */}
      <ChatWidget onClick={handleChatWidgetClick} />
    </div>
  );
};

export default ChatManager;
