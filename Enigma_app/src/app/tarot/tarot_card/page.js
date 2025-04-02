"use client";

import { useState } from "react";

export default function TarotLookupPage() {
    const [number, setNumber] = useState("");
    const [card, setCard] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCard = async () => {
        if (!number.trim()) {
            setError("Please enter a card number.");
            return;
        }

        setLoading(true);
        setError(null);
        setCard(null);

        try {
            const response = await fetch(`/api/tarotCard/${number}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            if (response.ok) {
                setCard(data);
            } else {
                setError(data.message || "Card not found.");
            }
        } catch (err) {
            setError(`Error fetching card.: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Tarot Card Lookup</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="number"
                    placeholder="Enter card number..."
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={fetchCard}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {card && (
                <div className="border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{card.name}</h2>
                    {card.img && <img src={card.img} alt={card.name} className="w-full rounded-lg mt-2" />}
                    <p><strong>Arcana:</strong> {card.arcana}</p>
                    <p><strong>Meaning:</strong> {card.meanings?.light?.join(", ")}</p>
                </div>
            )}
        </div>
    );
}
