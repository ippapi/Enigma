"use client";
import { useState } from "react";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // State control login or sign up
    const [form, setForm] = useState({ name: "", username: "", email: "", password: "" }); // State contains both login form and sign up form
    const [error, setError] = useState(""); //  State contains error in login and sign up process
    const [message, setMessage] = useState(""); // State contain login or sign up result

    // Easy to set login and sign up form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle login and sign up
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent reloading page after submit form
        setError(""); // Set error to ""
        setMessage(""); // Set result to ""

        // Fill data for login or sign up api
        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signUp"; // Set endpoint api to POST login or sign up data
        const body = isLogin // Get input for login or sign up form
            ? { username: form.username, password: form.password }
            : { name: form.name, username: form.username, email: form.email, password: form.password };

        // POST form to endpoint api
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include",
        });

        // Get result and error in login or sign up
        const data = await res.json();
        if (!res.ok) return setError(data.error);

        setMessage(data.message || "Success!");
        if (isLogin) window.location.href = "/";
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-[500px] p-[30px] bg-white rounded-[50px] shadow relative">
                <h2 className="text-2xl font-bold mb-2 text-center">{isLogin ? "Login" : "Sign Up"}</h2>
                <p className="text-center text-gray-500">See what Tarot Enigma is capable of for free</p>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center mt-12">
                    {!isLogin && (
                        <>
                            <input type="text" name="name" placeholder="Full Name" required className="input bg-[#4B297138] h-12 w-[300px] rounded-[10px] border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email" required className="input bg-[#4B297138] h-12 w-[300px] rounded-[10px] border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                            <input type="text" name="username" placeholder="Username" required className="input bg-[#4B297138] h-12 w-[300px] rounded-[10px] border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                        </>
                    )}
                    {isLogin && (
                        <>
                            <input type="text" name="username" placeholder="Username or email" required className="input bg-[#4B297138] h-12 w-[300px] rounded-[10px] border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                        </>
                    )}
                    <input type="password" name="password" placeholder="Password" required className="input bg-[#4B297138] h-12 w-[300px] rounded-[10px] border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                    <button type="submit" className="bg-[#581C87] h-10 w-[300px] text-white p-2 rounded-[100px] hover:bg-pink-500 hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-8 mb-8">{isLogin ? "Login" : "Sign Up"}</button>
                </form>

                <p className="text-center absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button className="text-blue-500" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
