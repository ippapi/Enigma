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
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const selectedCards = getThreeCard();

    const card_info = await Promise.all(
      selectedCards.map(async (number) => {
        const response = await fetch(`/api/tarotCard/${number}`);
        return response.json();
      })
    );

    setCardInfo(card_info);
    setLoading(true);

    const response = await fetch("/api/chatBotQuery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardInfo: card_info }),
    });

    const data = await response.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white font-serif px-4 py-10 flex flex-col items-center mt-20">
      <h1 className="text-4xl font-bold text-center mb-12">🔮 AI Tarot Reader 🔮</h1>

      <div className="w-full max-w-7xl flex flex-col md:flex-row items-start justify-center md:justify-between gap-10 px-4">
        {/* Cards Section */}
        <div className="flex flex-col items-center gap-6 w-full md:w-[48%] bg-black/30 p-6 rounded-xl shadow-xl min-h-[400px]">
          <div className="flex justify-center gap-4">
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
          <button
            onClick={sendMessage}
            disabled={loading}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-lg transition-all"
          >
            {loading ? "Shuffling the deck..." : "Reveal Your Fate"}
          </button>
        </div>

        {/* Reply Section */}
        <div className="w-full md:w-[48%] bg-black/30 backdrop-blur-md border border-purple-500 rounded-xl p-6 shadow-xl min-h-[500px]">
          <h2 className="text-xl font-semibold mb-4">Tarot Insights</h2>
          <div className="bg-black/40 p-4 rounded-lg border border-purple-400 overflow-auto max-h-[500px]">
            <p className="whitespace-pre-line text-sm leading-relaxed">
              {reply || "Your fortune will appear here after the cards are drawn..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
