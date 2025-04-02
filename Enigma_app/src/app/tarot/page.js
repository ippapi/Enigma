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
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <h1 className="text-2xl font-bold mb-4 text-black">AI Tarot Reader</h1>
            <div className="mt-4 flex justify-center gap-4 text-center">
                {cardInfo.map((card, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <FlipCard front={card.img} rotation={[0, 0, -Math.PI / 9 * (index - 1)]} position={[0, index == 1? 0.5: -0.5, 0]} name={card.name}/>
                    </div>
                ))}
            </div>
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 border border-gray-300">
                <button 
                    onClick={sendMessage} 
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Loading..." : "Ask"}
                </button>

                <div className="mt-4 p-3 bg-gray-100 rounded border border-gray-300">
                    <p className="text-black">
                        <strong>Bot:</strong> {reply || "Waiting for your question..."}
                    </p>
                </div>
            </div>
        </div>
    );
}
