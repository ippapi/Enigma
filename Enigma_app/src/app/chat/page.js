"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

// Create socket on client side
const socket = io("http://localhost:3000", {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    autoConnect: false,
});

const chat = () => {
    const [receivedMessages, setReceivedMessages] = useState([]); // Contains global chat
    const [sendingMessage, setSendingMessage] = useState(""); // Contains message client want to send

    useEffect(() => {
        socket.connect();
        fetch("/api/messages")
            .then((res) => res.json())
            .then((data) => setReceivedMessages(data))
            .catch((err) => console.error("Error fetching messages:", err));

        socket.on("messageReceived", (newMessage) => {
            setReceivedMessages((prev) => [...prev, newMessage]);
        });

        return () => {
            socket.off("messageReceived");
            return () => socket.disconnect();
        };
    }, []);

    const sendMessage = async () => {
        if (!sendingMessage.trim()) return;

        const newMessage = { user: "User1", message: sendingMessage };

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMessage),
            });

            if(!res.ok) throw new Error("Failed to send message");

            const savedMessage = await res.json();

            socket.emit("sendMessage", savedMessage);

            setSendingMessage("");
        }catch(error){
            console.error("Error sending message:", error);
        }
    };

    return(
        <div>
            <div>
                {receivedMessages.map((msg, idx) => (
                <p key={idx}>
                    <strong>{msg.user}: </strong> {msg.message}
                </p>
                ))}
            </div>
            <input value={sendingMessage} onChange={(e) => setSendingMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default chat;
