"use client";
import { useState } from "react";
import Header from "../../components/navBar";
import Footer from "../../components/footer";
import { useRouter } from "next/navigation";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signUp";
        const body = isLogin
            ? { username: form.username, password: form.password }
            : { name: form.name, username: form.username, email: form.email, password: form.password };

        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) return setError(data.error);

        setMessage(data.message || "Success!");
        if(res.ok){
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1 flex-col items-center justify-center">
                <div className="w-[500px] p-[30px] bg-white rounded-[50px] shadow relative">
                    <h2 className="text-2xl font-bold mb-2 text-center">{isLogin ? "Login" : "Sign Up"}</h2>
                    <p className="text-center text-gray-500">See what Tarot Enigma is capable of for free</p>
                    {error && <p className="text-red-500">{typeof error === "string" ? error : error.message}</p>}
                    {message && <p className="text-green-500">{typeof message === "string" ? message : JSON.stringify(message)}</p>}
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center mt-12">
                        {!isLogin && (
                            <>
                                <input type="text" name="name" placeholder="Full Name" required className="input p-3 border-b-2 border-black bg-[#D7D0E0] text-white h-12 w-[300px]  focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                                <input type="email" name="email" placeholder="Email" required className="input p-3 border-b-2 border-black bg-[#D7D0E0] text-white h-12 w-[300px]  focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                                <input type="text" name="username" placeholder="Username" required className="input  h-12 w-[300px] p-3 border-b-2 border-black bg-[#D7D0E0] text-white focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                            </>
                        )}
                        {isLogin && (
                            <>
                                <input type="text" name="username" placeholder="Username or email" required className="input h-12 w-[300px] p-3 border-b-2 border-black bg-[#D7D0E0] text-white focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                            </>
                        )}
                        <input type="password" name="password" placeholder="Password" required className="input p-3 border-b-2 border-black bg-[#D7D0E0] text-white h-12 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                        <button type="submit" className="bg-[#581C87] h-10 w-[300px] text-white p-2 rounded-[100px] hover:bg-pink-500 hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-8 mb-8">{isLogin ? "Login" : "Sign Up"}</button>
                    </form>

                    <p className="text-center absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button className="text-blue-500" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Sign Up" : "Login"}
                        </button>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AuthPage;
