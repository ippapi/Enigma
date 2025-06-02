"use client";

import { useEffect, useState, useRef } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
          cache: "no-store", // tránh cache cũ
        });
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched user:", data); // debug
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

  if (loading) {
    return (
      <header className="py-4 px-8 text-white">
        <span className="italic opacity-75">Loading...</span>
      </header>
    );
  }

  return (
    <header className="bg-transparent absolute top-0 left-0 w-full z-50 text-white py-4 px-8 flex justify-between items-center font-light tracking-wider">
      <a href="/" className="text-xl tracking-wide">Tarot Enigma</a>

      <nav className="flex items-center space-x-6 text-sm uppercase relative">
        <a href="/tarot" className="hover:text-gray-300 transition flex items-center gap-1">
          Tarobot
        </a>
        <a href="/shop" className="hover:text-gray-300 transition flex items-center gap-1">
          Shop
        </a>
        <a href="/cart" className="hover:text-gray-300 transition flex items-center gap-1">
          Cart
        </a>
        <a href="/booking" className="hover:text-gray-300 transition flex items-center gap-1">
          Booking
        </a>
        <a href="/booking/user" className="hover:text-gray-300 transition flex items-center gap-1">
          Scheduling
        </a>
        <a href="/contact" className="hover:text-gray-300 transition flex items-center gap-1">
          Contacts
        </a>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="hover:text-gray-300 transition flex items-center gap-1"
            >
              HELLO, {user.show_name}
              <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg text-sm z-50">
                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                  PROFILE
                </a>
                {user.role === "ADMIN" && (
                  <a href="/admin" className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                    ADMIN
                  </a>
                )}
                {user.role === "READER" && (
                  <a href="/booking/reader" className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                    SCHEDULE
                  </a>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/auth" className="hover:text-gray-300 transition">LOGIN</a>
        )}
      </nav>
    </header>
  );
};

export default Header;
