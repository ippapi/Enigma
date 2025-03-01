"use client";
import { useState } from "react";

export default function ChatPage() {
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        setLoading(true);
        const response = await fetch("/api/chatBotQuery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setReply(data.reply);
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <h1 className="text-2xl font-bold mb-4 text-black">AI tarot reader</h1>
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
                        <strong>Bot:</strong>{" "}
                        <span dangerouslySetInnerHTML={{ __html: reply || "Waiting for your question..." }} />
                    </p>
                </div>
            </div>
        </div>
    );
}
