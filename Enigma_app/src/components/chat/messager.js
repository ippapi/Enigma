"use client";
import { FaPaperPlane } from "react-icons/fa";

export default function messager({ onBack }) {
  const messages = [
    {
      name: "Chat room",
      avatar: "/images/avatar1.png",
      message: "You: Tụi m nằm s mà hiểu đực",
      time: "1 hour",
    },
    {
      name: "Minatozaki Sana",
      avatar: "/images/avatar2.png",
      message: "You have two choices: YES or YES",
      time: "2 hours",
    },
    {
      name: "Sang Do Luong",
      avatar: "/images/avatar3.png",
      message: "You: Đội cái quần em xin lỗi thầy",
      time: "2 days",
    },
    {
      name: "Phong Vu Thanh",
      avatar: "/images/avatar4.png",
      message: "Phong Vu Thanh send a sticker",
      time: "2 days",
    },
  ];

  return (
    <div className="w-[350px] rounded-xl shadow-xl bg-white overflow-hidden">
      <div className="px-4 py-2 border-b text-lg font-semibold">Messager</div>
      <div className="divide-y">
        {messages.map((m, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-100"
          >
            <img src={m.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-gray-600 truncate">{m.message}</div>
            </div>
            <div className="text-xs text-gray-500">{m.time}</div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3">
        <button
          onClick={onBack}
          className="w-full flex justify-center items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
        >
          <FaPaperPlane /> Send us a messager
        </button>
      </div>
    </div>
  );
}
