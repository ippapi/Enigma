"use client";
import { useState } from "react";
import FlipCard from "@/components/threejs/flipCard";

const getThreeCard = () => {
  let numbers = Array.from({ length: 78 }, (_, i) => i);
  numbers.sort(() => Math.random() - 0.5);
  return numbers.slice(0, 3);
};

export default function ChatPage() {
  const [cardInfo, setCardInfo] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);
    setUserMessage("");
    setLoading(true);
    const selectedCards = getThreeCard();

    const card_info = await Promise.all(
      selectedCards.map(async (number) => {
        const response = await fetch(`/api/tarotCard/${number}`);
        return response.json();
      })
    );

    setCardInfo(card_info);

    const response = await fetch("/api/chatBotQuery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardInfo: card_info, userMessage: userMessage }),
    });

    const data = await response.json();
    setChatHistory((prev) => [
      ...prev,
      { sender: "bot", text: data.reply },
    ]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white px-4 py-10 flex flex-col items-center mt-20">
      <h2 className="text-4xl font-black bg-clip-text text-transparent mb-6 inline-block tracking-tighter text-left"
              style={{
                backgroundImage: 'linear-gradient(-30deg, #00A1C7, #F5559E, #ED7D0C)',
                fontFamily: 'Anton, sans-serif',
              }}>
            TAROBOT PINK PANTHER
          </h2>
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-start justify-between gap-8 px-4">
        {/* Cards Section - Enhanced */}
        <div className="flex flex-col items-center w-full lg:w-[48%] bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-8 rounded-2xl shadow-2xl min-h-[650px] backdrop-blur-sm">
          <div className="relative w-full flex-1 flex justify-center items-center pb-16">
            {cardInfo.map((card, index) => (
              <FlipCard
                key={index}
                front={card.img}
                name={card.name}
                rotation={[0, 0, 0]}
                position={[0, index === 1 ? 0.5 : -0.5, 0]}
                className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
              />
            ))}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none rounded-xl"></div>
          </div>
          <div className="mt-auto">
            <img 
              src="images/Pink Panther/Pink Panther.png" 
              alt="Pink Panther"
              className="w-[280px] h-[280px] object-cover z-0"
            />
          </div>
        </div>

        {/* Chat Section - Enhanced */}
        <div className="w-full lg:w-[48%] bg-gradient-to-br from-gray-900/80 to-indigo-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl min-h-[650px] flex flex-col border border-purple-500/30">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
              Tarot Insights
            </h2>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-auto min-h-[500px] max-h-[500px] pr-3 bg-gray-900/40 p-6 rounded-xl flex flex-col gap-4 custom-scrollbar">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm whitespace-pre-line transition-all ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md"
                      : "bg-gray-800/90 border border-gray-700 text-gray-100 shadow-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-4 rounded-2xl bg-gray-800/90 border border-gray-700 text-sm text-left">
                  <div className="flex items-center gap-2 text-purple-300">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span>The cards are revealing ...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="mt-6 flex gap-3">
            <input
              type="text"
              placeholder="Ask anything..."
              className="flex-1 p-4 rounded-xl bg-gray-800/70 text-white outline-none border border-gray-600/50 focus:border-purple-500/70 transition-all placeholder:text-gray-400"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Reading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  Send
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
