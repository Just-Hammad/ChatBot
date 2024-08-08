// pages/widget.tsx
import Chat from '@/app/chat';
import ChatWidget from '@/components/ChatWidget';
import './page.css';

const Widget = () => {
return (
    <main className="min-h-screen bg-black transition-all transition-delay-300">
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
};

export default Widget;
