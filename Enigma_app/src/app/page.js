"use client";

import { useState, useEffect } from "react";
import Scene from "@/components/threejs/threeModelViewer";
import TarotCard from "@/components/threejs/flipCard";

export default function Home() {
    const [number] = useState(3); // Number is fixed, no need for setNumber
    const [card, setCard] = useState(null);

    const fetchCard = async () => { // Add `async` here
        console.log("Fetching card...");
        try {
            const response = await fetch(`/api/protected/tarotCard/${number}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log("Fetched card:", data);

            setCard(data); // Now we correctly update state
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchCard();
    }, []);

    return (
        <div>
            <Scene />
            {card ? <TarotCard front={card.img} /> : <p>Loading...</p>}
        </div>
    );
}
