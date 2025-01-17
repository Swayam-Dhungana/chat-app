import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/createContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { connectSocket } = useContext(UserContext);
    const [creds, setCreds] = useState({ email: "", password: "" });
    const [height, setHeight] = useState("100vh");
    const [isNavigated, setIsNavigated] = useState(false);  // Prevent multiple navigations
    const navigate = useNavigate();

    useEffect(() => {
        const checkvalidity=async()=>{
            if(localStorage.getItem('auth-token')){
                navigate('/')
            }
        }

        const navbarHeight = 60;
        setHeight(`calc(100vh - ${navbarHeight}px)`);
        checkvalidity()
    }, [navigate]);  // Add isNavigated as a dependency to track state

    const handleChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: creds.email,
                    password: creds.password,
                }),
            });

            const json = await response.json();
            if (!json.success) {
                alert(json.msg);
            } else {
                localStorage.setItem('auth-token', json.msg);
                setIsNavigated(true);  // Set flag to prevent future navigation
                navigate('/'); // Navigate to homepage after successful login
                connectSocket()
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div
            className="w-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-indigo-300 overflow-hidden"
            style={{ height }}
        >
            {/* Left Side: Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10">
                <form className="bg-indigo-950 p-6 md:p-8 rounded-lg shadow-2xl w-full md:w-3/4">
                    <h2 className="text-2xl md:text-3xl font-bold text-purple-400 tracking-wide text-center mb-6 md:mb-8">
                        Enter the Realm
                    </h2>
                    <div className="mb-4 md:mb-6">
                        <label htmlFor="email" className="block text-purple-300 mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={creds.email}
                            onChange={handleChange}
                            className="block w-full p-3 rounded-lg bg-purple-800 text-indigo-200 outline-none focus:ring focus:ring-purple-500"
                        />
                    </div>
                    <div className="mb-4 md:mb-6">
                        <label htmlFor="password" className="block text-purple-300 mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={creds.password}
                            onChange={handleChange}
                            className="block w-full p-3 rounded-lg bg-purple-800 text-indigo-200 outline-none focus:ring focus:ring-purple-500"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>

            {/* Right Side: Grid and Text */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
                <h2 className="text-xl md:text-2xl font-semibold text-purple-300 mb-4 md:mb-6">
                    Login to join and Communicate
                </h2>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-lg shadow-md transition-transform transform hover:scale-105"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
