"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import io from "socket.io-client";

// Get socket URL
const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;

// Initialize socket
const socket = io(socket_url, {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

const ChatRoom = () => {
  const { room_id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [roomValid, setRoomValid] = useState(null); // null: loading, false: invalid, true: valid
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState("");

  // Validate room and user
  useEffect(() => {
    const validateRoom = async () => {
      try {
        const res = await fetch("/api/room_control", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-room-id": `${room_id}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setRoomValid(true);
          setReceivedMessages(data.messages || [])
        } else {
          setRoomValid(false);
          setReceivedMessages([]);
        }
      } catch (err) {
        setRoomValid(false);
        setReceivedMessages([]);
      }
    };

    const fetchUser = async () => {
      const res = await fetch("/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data?.user) setUser(data.user);
    };

    validateRoom();
    fetchUser();
  }, [room_id]);

  // Initialize chat after room is verified
  useEffect(() => {
    if (roomValid !== true) return;

    socket.connect();

    socket.on("messageReceived", (newMessage) => {
      setReceivedMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
    };
  }, [roomValid]);

  const sendMessage = async () => {
    if (!sendingMessage.trim() || !user) return;

    const newMessage = {
      room_id,
      senderId: user.id,
      senderName: user.name,
      message: sendingMessage,
    };

    try {
      const res = await fetch("/api/room_control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) throw new Error("Failed to send message");

      socket.emit("sendMessage", newMessage);
      setSendingMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // UI based on room status
  if (roomValid === null) {
    return <div className="text-center p-10">🔄 Đang kiểm tra phòng...</div>;
  }

  if (!roomValid) {
    return (
      <div className="text-center p-10 text-red-600">
        ❌ Phòng không tồn tại hoặc đã bị huỷ.{" "}
        <button
          onClick={() => router.push("/join")}
          className="underline text-blue-600"
        >
          Quay lại trang Join
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-xl font-bold mb-4">💬 Chat Room: </h1>
      <div className="w-full max-w-lg h-80 overflow-y-auto border p-4 mb-4 rounded">
        {receivedMessages?.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.senderName}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <div className="flex gap-2 w-full max-w-lg">
        <input
          value={sendingMessage}
          onChange={(e) => setSendingMessage(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
