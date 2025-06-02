"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";

const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;
const socket = io(socket_url, {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

const ChatRoom = () => {
  const { room_id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [roomValid, setRoomValid] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messageEndRef = useRef(null);

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
          setReceivedMessages(data.messages || []);
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

  useEffect(() => {
    if (roomValid !== true) return;

    socket.connect();

    socket.on("messageReceived", (newMessage) => {
      if (newMessage.room_id == room_id) {
        setReceivedMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
    };
  }, [roomValid]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessages]);

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

  const handleEmojiSelect = (emojiData) => {
    setSendingMessage((prev) => prev + emojiData.emoji);
  };

  if (roomValid === null) {
    return <div className="text-center text-white p-10">Checking room...</div>;
  }

  if (!roomValid) {
    return (
      <div className="text-center p-10 text-red-400">
        Room does not exist or has been declared.{" "}
        <button
          onClick={() => router.push("/booking")}
          className="underline text-purple-400 hover:text-purple-300"
        >
          Back to Join
        </button>
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col items-center p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4">Chat Room</h1>

      <div className="w-full max-w-2xl h-96 overflow-y-auto bg-[#2a243d] border border-purple-700 rounded-lg p-4 shadow-lg mb-4">
        {receivedMessages?.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-semibold text-purple-300">{msg.senderName}:</span>{" "}
            <span>{msg.message}</span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="relative w-full max-w-2xl mb-2">
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-0 z-10">
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              theme="dark"
              searchDisabled
              width={300}
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 w-full max-w-2xl">
        <input
          value={sendingMessage}
          onChange={(e) => setSendingMessage(e.target.value)}
          className="flex-1 bg-[#322b4b] text-white border border-purple-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter messager..."
        />
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          😀
        </button>
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
