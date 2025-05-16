// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const AuthPage = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
//     const [error, setError] = useState("");
//     const [message, setMessage] = useState("");
//     const router = useRouter();

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setMessage("");

//         const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signUp";
//         const body = isLogin
//             ? { username: form.username, password: form.password }
//             : { name: form.name, username: form.username, email: form.email, password: form.password };

//         const res = await fetch(endpoint, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body),
//             credentials: "include",
//         });

//         const data = await res.json();
//         if (!res.ok) return setError(data.error);

//         setMessage(data.message || "Success!");
//         if(res.ok){
//             router.push("/");
//         }
//     };

//     return (
//         <div className="flex flex-col min-h-screen">
//             <main className="flex flex-1 flex-col items-center justify-center">
//                 <div className="w-[500px] p-[30px] bg-white rounded-[50px] shadow relative">
//                     <h2 className="text-2xl font-bold mb-2 text-center">{isLogin ? "Login" : "Sign Up"}</h2>
//                     <p className="text-center text-gray-500">See what Tarot Enigma is capable of for free</p>
//                     {error && <p className="text-red-500">{typeof error === "string" ? error : error.message}</p>}
//                     {message && <p className="text-green-500">{typeof message === "string" ? message : JSON.stringify(message)}</p>}
                    
//                     <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center mt-12">
//                         {!isLogin && (
//                             <>
//                                 <input type="text" name="name" placeholder="Full Name" required className="input p-3 border-b-2 border-black bg-[#D7D0E0] text-white h-12 w-[300px]  focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
//                                 <input type="email" name="email" placeholder="Email" required className="input p-3 border-b-2 border-black bg-[#D7D0E0] text-white h-12 w-[300px]  focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
//                                 <input type="text" name="username" placeholder="Username" required className="input  h-12 w-[300px] p-3 border-b-2 border-black bg-[#D7D0E0] text-white focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
//                             </>
//                         )}
//                         {isLogin && (
//                             <>
//                                 <input type="text" name="username" placeholder="Username or email" required className="input h-12 w-[300px] p-3 border-b-2 border-black bg-[#D7D0E0] text-white focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
//                             </>
//                         )}
//                         <input type="password" name="password" placeholder="Password" required className="input p-3 border-b-2 border-black bg-[#D7D0E0] text-white h-12 w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
//                         <button type="submit" className="bg-[#581C87] h-10 w-[300px] text-white p-2 rounded-[100px] hover:bg-pink-500 hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-8 mb-8">{isLogin ? "Login" : "Sign Up"}</button>
//                     </form>

//                     <p className="text-center absolute bottom-4 left-1/2 transform -translate-x-1/2">
//                         {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//                         <button className="text-blue-500" onClick={() => setIsLogin(!isLogin)}>
//                             {isLogin ? "Sign Up" : "Login"}
//                         </button>
//                     </p>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default AuthPage;
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
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
            ? { email: form.email, password: form.password }
            : { firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password };

        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) return setError(data.error);

        setMessage(data.message || "Success!");
        if (res.ok) {
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* <Header /> */}
            <main className="flex flex-1 flex-col items-center justify-center">
                <div className="w-[45%] p-[30px] bg-white rounded-[50px] shadow relative">
                    <h2 className="text-xl font-bold mb-2 text-center">{isLogin ? "SIGN IN" : "SIGN UP"}</h2>
                    <p className="text-center text-base text-gray-500">See what Tarot Enigma is capable of for free</p>
                    {error && <p className="text-red-500">{typeof error === "string" ? error : error.message}</p>}
                    {message && <p className="text-green-500">{typeof message === "string" ? message : JSON.stringify(message)}</p>}
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center mt-10">
                        {isLogin && (
                            <>
                                <input type="email" name="email" placeholder="Email*" required className="input text-xl h-16 w-[80%] p-3 border-b-2 border-black bg-[#D7D0E0] text-black focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                                <input type="password" name="password" placeholder="Password*" required className="input mt-4 mb-4 text-xl p-3 border-b-2 border-black bg-[#D7D0E0] text-black h-16 w-[80%] focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                                <div className="flex items-center text-xl w-[80%] justify-start">                                    
                                    <input type="checkbox" className="mr-2 h-8 w-8" />
                                    <label>I am not a robot.</label>
                                </div>
                            </>
                        )}
                        {!isLogin && (
                            <>
                                <div className="flex items-center justify-center bg-white h-12 mb-4 w-[80%] border-[1px] border-black text-black p-2 rounded-[10px] hover:bg-[#F3E8FF]">
                                    <button className="flex items-center justify-center">
                                        <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google logo" className="mr-2" />
                                            Sign up with Google
                                    </button>
                                </div>
                                <div className="flex w-[80%] gap-5">
                                    <input type="text" name="firstName" placeholder="First Name*" required className="input p-3 border-b-2 border-black bg-[#D7D0E0] text-black h-16 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                                    <input type="text" name="lastName" placeholder="Last Name*" required className="input p-3 border-b-2 border-black bg-[#D7D0E0] text-black h-16 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                                </div>
                                <input type="email" name="email" placeholder="Email*" required className=" mt-4 mb-4 input p-3 border-b-2 border-black bg-[#D7D0E0] text-black h-16 w-[80%] focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                                <input type="password" name="password" placeholder="Password*" required className="input mb-4 p-3 border-b-2 border-black bg-[#D7D0E0] text-black h-16 w-[80%] focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
                                <div className="flex items-center text-base w-[80%] justify-start">
                                    <input type="checkbox" className="mr-2 h-8 w-8" />
                                    <label>
                                    I agree to the{' '}
                                    <a href="/service" className="font-bold">
                                        Terms of Service
                                    </a>{' '}and{' '}
                                    <a href="/policies" className="font-bold">
                                        Privacy Policy
                                    </a>
                                    .
                                    </label>
                                </div>
                            </>
                        )}
                        <button type="submit" className="bg-[#581C87] font-semibold text-base h-12 w-[80%] text-white p-2 rounded-[100px] hover:bg-pink-500 hover:border-pink-400 mt-1 mb-1">{isLogin ? "SIGN IN" : "CREATE YOUR TAROT ENIGMA ACCOUNT"}</button>
                        {isLogin && (
                            <button type="submit" className="bg-white font-semibold h-12 w-[80%] border-[1px] border-[#581C87] text-black p-2 rounded-[100px] hover:bg-pink-500 hover:border-pink-400" onClick={() => alert("Redirect to reset password page")}>
                                FORGET MY PASSWORD
                            </button>
                        )}
                        <button
                            className="text-black text-base font-semibold hover:text-[#581C87]"
                            onClick={() => setIsLogin(!isLogin)}
                            >
                            {isLogin ? "SIGN UP" : "SIGN IN"}
                        </button>
                    </form>
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default AuthPage;
