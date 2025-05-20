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
      <h1 className="text-4xl font-bold text-center mb-12">🔮 AI Tarot Reader 🔮</h1>

      <div className="w-full max-w-7xl flex flex-col md:flex-row items-start justify-center md:justify-between gap-10 px-4">
        {/* Cards Section */}
        <div className="flex flex-col items-center gap-6 w-full md:w-[48%] bg-black/30 p-6 rounded-xl shadow-xl min-h-[650px]">
          <div className="flex justify-center items-center gap-4 w-full">
            {cardInfo.map((card, index) => (
              <FlipCard
                key={index}
                front={card.img}
                name={card.name}
                rotation={[0, 0, 0]}
                position={[0, index === 1 ? 0.5 : -0.5, 0]}
              />
            ))}
          </div>
        </div>

        {/* Reply Section */}
        <div className="w-full md:w-[48%] bg-black/30 backdrop-blur-md border border-purple-500 rounded-xl p-6 shadow-xl min-h-[600px] flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Tarot Insights</h2>

          <div className="flex-1 overflow-auto min-h-[500px] max-h-[500px] pr-2 bg-black/40 p-4 rounded-lg border border-purple-400 flex flex-col gap-2">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg text-sm whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-right"
                      : "bg-purple-800 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Hiển thị bot đang nghĩ nếu loading */}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[75%] p-2 rounded-lg bg-purple-800 text-sm text-left font-mono">
                  <div className="flex gap-1 text-lg bouncing-dots">
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Bạn đang cần hỏi vũ trụ điều gì..."
              className="flex-1 p-2 rounded bg-white/10 text-white outline-none"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-lg transition-all"
            >
              {loading ? "Shuffling..." : "Send"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
