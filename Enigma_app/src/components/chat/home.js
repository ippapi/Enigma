"use client";
import { useState } from "react";
import { FaSearch, FaPaperPlane, FaCommentDots, FaUserCircle } from "react-icons/fa";
import Messager from "./messager";

export default function ChatHome({ onBackToMain }) {
  const [showMessager, setShowMessager] = useState(false);

  if (showMessager) return <Messager onBack={() => setShowMessager(false)} />;

  return (
    <div className="w-80 rounded-2xl shadow-xl overflow-hidden bg-gradient-to-b from-[#1c2232] to-[#3c4261] text-white">
      {/* Header */}
      <div className="px-5 py-4">
        <h2 className="text-sm font-light">Tarot Enigma</h2>
        <h1 className="text-2xl font-bold text-pink-300 mt-1">
          Hello Phuong!
          <br />
          <span className="text-white">How can we help?</span>
        </h1>
      </div>

      {/* Recent message */}
      <div
        className="mx-4 mb-3 p-3 bg-gray-100 rounded-xl cursor-pointer"
        onClick={() => setShowMessager(true)}
      >
        <p className="text-xs text-gray-500">Recent message</p>
        <div className="flex items-center gap-2 mt-1">
          <img src="/images/avatar1.png" className="w-6 h-6 rounded-full" />
          <div className="flex-1">
            <p className="font-semibold text-sm">Chat room</p>
            <p className="text-xs text-gray-600 truncate">You: Tụi m nằm s mà hiểu đựt</p>
          </div>
          <span className="text-xs text-gray-400">1 hour</span>
        </div>
      </div>

      {/* Search box */}
      <div className="mx-4 mb-2 flex items-center bg-gray-200 px-3 py-2 rounded-xl">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for help"
          className="bg-transparent outline-none flex-1 text-sm"
        />
      </div>

      {/* Suggestions */}
      <div className="mx-4 mb-3 space-y-2">
        <div className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <span className="text-sm">Reset your password</span>
          <FaPaperPlane className="text-gray-400" />
        </div>
        <div className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <span className="text-sm">How to booking reader</span>
          <FaPaperPlane className="text-gray-400" />
        </div>
      </div>

      {/* Bottom button */}
      <div className="border-t px-4 py-3">
        <button
          onClick={() => setShowMessager(true)}
          className="w-full flex justify-center items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700"
        >
          <FaPaperPlane /> Send us a messager
        </button>
      </div>

      {/* Bottom nav (giả lập biểu tượng) */}
      <div className="flex justify-around border-t py-2 text-gray-400">
        <FaUserCircle size={20} className="hover:text-purple-600 cursor-pointer" />
        <FaCommentDots
          size={20}
          className="hover:text-purple-600 cursor-pointer"
          onClick={() => setShowMessager(true)}
        />
        <FaSearch size={20} className="hover:text-purple-600 cursor-pointer" />
      </div>
    </div>
  );
}
