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
    const [cardNums, setCardNums] = useState([]);

    const sendMessage = async () => {
        const selectedCards = getThreeCard();
        setCardNums(selectedCards);

        const card_info = await Promise.all(selectedCards.map(async (number) => {
            const response = await fetch(`/api/tarotCard/${number}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            return response.json();
        }));

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
        <div className="min-h-screen flex flex-col justify-center items-center text-white font-serif">
          <h1 className="text-4xl text-center font-bold pt-10 mb-6">🔮 AI Tarot Reader 🔮</h1>
          <div className="flex flex-row justify-center items-start gap-10 px-10 pb-20">
            {/* Cards Left */}
            <div className="flex flex-col gap-6 items-center w-1/2">
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
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-lg transition-all"
              >
                {loading ? "Shuffling the deck..." : "Reveal Your Fate"}
              </button>
            </div>
      
            {/* Chat Right */}
            <div className="w-1/2 max-w-lg bg-black/20 backdrop-blur-md border border-purple-500 rounded-xl p-6 shadow-xl text-white">
              <h2 className="text-xl font-semibold mb-4">Tarot Insights</h2>
              <div className="bg-black/40 p-4 rounded-lg min-h-[200px] border border-purple-400">
                <p className="whitespace-pre-line">
                  {reply || "Your fortune will appear here after the cards are drawn..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      );      
}
