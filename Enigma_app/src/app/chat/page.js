"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/navBar";
import Footer from "../../components/footer";

const JoinRoom = () => {
    const [room_id, setRoomId] = useState(""); // User input for Room ID
    const [error, setError] = useState(""); // Store error messages
    const router = useRouter(); // Navigation hook

    const handleJoinRoom = async () => {
        if (!room_id.trim())
            return setError("Please enter a valid Room ID.");

        setError("");

        try {
            const res = await fetch("/api/room_check", {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "x-room-id": `${room_id}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                router.push(`/chat/${room_id}`); // Redirect to chat room
            } else {
                setError(data.message || "Failed to join the room.");
            }
        } catch (error) {
            setError("Server error, please try again later.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Join a Chat Room</h1>
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={room_id}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="border px-4 py-2 mb-2"
                />
                <button onClick={handleJoinRoom} className="bg-blue-500 text-white px-4 py-2">
                    Join Room
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div> 
            <Footer />
        </div>
    );
};

export default JoinRoom;
