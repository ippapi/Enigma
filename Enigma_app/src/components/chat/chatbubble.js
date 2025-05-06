"use client";
import { useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import ChatHome from "@/components/chat/home"; 

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Nút tròn chat ở góc phải */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <FaCommentDots size={24} />
          </button>
        )}
      </div>

      {/* Popup chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50">
          <div className="relative">
            {/* Nút đóng */}
            <button
              className="absolute -top-3 -right-3 bg-white border border-gray-300 rounded-full p-1 text-gray-600 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>

            {/* Giao diện chat */}
            <ChatHome onBackToMain={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
