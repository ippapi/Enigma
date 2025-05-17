"use client";

import { useEffect, useState, useRef } from "react";
import {
  Bot,
  ShoppingBag,
  ShoppingCart,
  Moon,
  Wand2,
  Mail,
  User,
  LogOut,
  PanelTop,
} from "lucide-react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Lỗi lấy user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const err = await res.json();
        console.error("Lỗi logout:", err?.error || "Unknown error");
      }
    } catch (err) {
      console.error("Lỗi logout:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-transparent absolute top-0 left-0 w-full z-50 text-white py-4 px-8 flex justify-between items-center font-light tracking-wider">
      <a href="/" className="text-xl tracking-wide">Tarot Enigma</a>

      <nav className="flex items-center space-x-6 text-sm uppercase relative">
        <a href="/tarot" className="hover:text-gray-300 transition flex items-center gap-1">
          <Bot size={16} /> Tarobot
        </a>
        <a href="/shop" className="hover:text-gray-300 transition flex items-center gap-1">
          <ShoppingBag size={16} /> Shop
        </a>
        <a href="/cart" className="hover:text-gray-300 transition flex items-center gap-1">
          <ShoppingCart size={16} /> Cart
        </a>
        <a href="/booking" className="hover:text-gray-300 transition flex items-center gap-1">
          <Moon size={16} /> Booking
        </a>
        <a href="/booking/user" className="hover:text-gray-300 transition flex items-center gap-1">
          <Wand2 size={16} /> Scheduling
        </a>
        <a href="/contact" className="hover:text-gray-300 transition flex items-center gap-1">
          <Mail size={16} /> Contacts
        </a>

        {loading ? (
          <span className="opacity-75 italic">...</span>
        ) : user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="hover:text-gray-300 transition flex items-center gap-1"
            >
              Xin chào, {user.show_name}
              <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg text-sm z-50">
                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                  <User size={16} /> Trang cá nhân
                </a>
                {user.role === "ADMIN" && (
                  <a href="/admin" className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                    <PanelTop size={16} /> Trang quản lý
                  </a>
                )}
                {user.role === "READER" && (
                  <a href="/booking/reader" className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                    <Wand2 size={16} /> Lập lịch biểu
                  </a>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/auth" className="hover:text-gray-300 transition">Login</a>
        )}
      </nav>
    </header>
  );
};

export default Header;
