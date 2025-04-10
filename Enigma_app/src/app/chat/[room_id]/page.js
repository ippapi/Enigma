"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import io from "socket.io-client";

// Get socket url
const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;

// Initialize socket info
const socket = io(socket_url, {
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
});

const chat = () => {
    const { room_id } = useParams();
    const [receivedMessages, setReceivedMessages] = useState([]); // Contains global chat
    const [sendingMessage, setSendingMessage] = useState(""); // Contains message client want to send
    const [user, setUser] = useState(null); // Contains user info

    // Handle new message
    useEffect(() => {
        // Get current user data (1 time)
        if(!user){
            fetch("/api/auth/verify", {
                method: "GET",
                credentials: "include",
            })
            .then((res) => res.json())
            .then((data) => {
                if(data){
                    setUser(data.user); // Set user data to user state
                }
            });
        }

        // Create connect to socket server side
        socket.connect();

        // Fetch for all messages in database
        fetch("/api/room_message", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",  
                "x-room_id": `${room_id}`,
            },
        }).then((res) => res.json())
          .then((data) => setReceivedMessages(data.messages))
          .catch((err) => console.error("Error fetching messages:", err));

        // Listen to new message received event
        socket.on("messageReceived", (newMessage) => {
            setReceivedMessages((prev) => [...prev, newMessage]); // Add new received message to the receivedMessages
        });

        return () => {
            socket.off("messageReceived"); // Stop listen to messageReceived event
            return () => socket.disconnect(); // Disconnect server socket
        };
    }, []);

    // Send message from current user
    const sendMessage = async () => {
        // If message want to send is all space
        if (!sendingMessage.trim()) return;

        // Prepare user info and sending message
        const newMessage = { room_id: room_id, senderId: user.id, senderName: user.name, message: sendingMessage };

        try {
            // POST newMessage to write on database
            const res = await fetch("/api/room_message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMessage),
            });

            // If POST got error, stop function
            if(!res.ok) throw new Error("Failed to send message");

            socket.emit("sendMessage", newMessage);

            // Clear input
            setSendingMessage("");
        }catch(error){
            console.error("Error sending message:", error); // Log error
        }
    };

    return(
        <div>
            <div>
                {receivedMessages.map((msg, idx) => (
                <p key={idx}>
                    <strong>{msg.senderName}: </strong> {msg.message}
                </p>
                ))}
            </div>
            <input value={sendingMessage} onChange={(e) => setSendingMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default chat;
