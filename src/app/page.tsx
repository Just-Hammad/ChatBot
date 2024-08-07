import Image from "next/image";
import Chat from "@/app/chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-800 text-white p-4 flex items-center gap-4">
          <img
            src="/chatbotlogo.jpg"
            alt="chatbotlogo"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">Goldsbet</h1>
            <p className="text-sm text-gray-300">Ask anything</p>
          </div>
        </div>
        <div className="h-[calc(100vh-8rem)] overflow-y-auto p-4">
          <Chat />
        </div>
      </div>
    </main>
  );
}