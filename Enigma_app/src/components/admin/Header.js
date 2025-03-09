'use client';

import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Image from 'next/image';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark';
        setDarkMode(isDark);
        document.body.classList.toggle('dark', isDark);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.body.classList.toggle('dark', newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    };

    return (
        <nav className="w-full h-16 flex items-center justify-between px-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-md">
            {/* Left Spacer (keeps content centered) */}
            <div className="w-1/3"></div>

            {/* Center Search Bar */}
            <div className="flex items-center w-2/3 bg-gray-200/70 dark:bg-gray-700/70 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2">
                <FaSearch className="h-4 w-4 text-gray-500 dark:text-white" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-2 text-sm bg-transparent outline-none text-gray-800 dark:text-white"
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center w-1/3 justify-end gap-4">
                <button className="text-gray-600 dark:text-white">
                    <IoMdNotificationsOutline className="h-5 w-5" />
                </button>

                <button className="text-gray-600 dark:text-white" onClick={toggleDarkMode}>
                    {darkMode ? <RiSunFill className="h-5 w-5" /> : <RiMoonFill className="h-5 w-5" />}
                </button>

                <Image src="/icons/admin/user.svg" width={35} height={35} className="rounded-full" alt="User Avatar" />
            </div>
        </nav>
    );
};

export default Header;
