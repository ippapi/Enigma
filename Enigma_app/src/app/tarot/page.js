"use client";
import { useState } from "react";

export default function ChatPage() {
    const [queryType, setQueryType] = useState("tarot");
    const [param, setParam] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        setLoading(true);
        const response = await fetch("/api/chatBotQuery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ queryType, param }),
        });

        const data = await response.json();
        setReply(data.reply);
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <h1 className="text-2xl font-bold mb-4 text-black">AI Chatbot</h1>
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 border border-gray-300">
                <label className="block text-black font-semibold mb-2">Select a Topic:</label>
                <select 
                    value={queryType} 
                    onChange={(e) => setQueryType(e.target.value)} 
                    className="w-full p-2 border border-gray-400 rounded mb-4 bg-white text-black"
                >
                    <option value="tarot">Tarot</option>
                    <option value="numerology">Numerology</option>
                    <option value="starmap">Stellarium</option>
                </select>
                
                {queryType !== "tarot" && (
                    <input
                        type="date"
                        value={param}
                        onChange={(e) => setParam(e.target.value)}
                        placeholder="Ask your question..."
                        className="w-full p-2 border border-gray-400 rounded mb-4 bg-white text-black"
                    />
                )}

                <button 
                    onClick={sendMessage} 
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Loading..." : "Ask"}
                </button>

                <div className="mt-4 p-3 bg-gray-100 rounded border border-gray-300">
                    <p className="text-black">
                        <strong>Bot:</strong>{" "}
                        <span dangerouslySetInnerHTML={{ __html: reply || "Waiting for your question..." }} />
                    </p>
                </div>
            </div>
        </div>
    );
}
