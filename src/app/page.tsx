import React from 'react';
import './page.css';
import Chat from "@/app/chat";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="">
      <div className="h-[calc(100vh-2rem)] overflow-y-auto p-4 relative">
        <div id="chat-ctn" className="chat-ctn hidden custom-scrollbar">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-auto">
            <Chat />
          </div>
        </div>
      </div>
      <div id="chat-widget" className="">
      <ChatWidget />
      </div>
    </main>
  );
}