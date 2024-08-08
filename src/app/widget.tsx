// pages/widget.tsx
import Chat from '@/app/chat';
import Head from 'next/head';

const Widget = () => {
  return (
    <>
      <Head>
        <title>Chat Widget</title>
        <style>
          {`
            .chat-widget-container {
              width: 300px;
              height: 400px;
              border: 1px solid #ccc;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              position: relative;
            }
            .chat-widget-container iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
          `}
        </style>
      </Head>
      <div className="chat-widget-container">
        <Chat />
      </div>
    </>
  );
};

export default Widget;
