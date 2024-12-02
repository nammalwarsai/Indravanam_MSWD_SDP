import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = ({ onAuthenticate }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to authenticate user or create an account here.
    // Once successful:
    onAuthenticate();
    navigate('/');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all ${
        theme === "light"
          ? "bg-gradient-to-r from-green-200 to-blue-200 text-black"
          : "bg-gradient-to-r from-teal-800 to-gray-900 text-gray-200"
      }`}
    >
      <div
        className={`w-96 rounded-3xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 ${
          theme === "light" ? "bg-white" : "bg-teal-950"
        }`}
      >
        {/* Theme Toggle */}
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-center">
            {isSignup ? "Create Your Account" : "Welcome Back!"}
          </h2>
          <button
            onClick={toggleTheme}
            className={`px-4 py-1 rounded ${
              theme === "light" ? "bg-gray-200" : "bg-gray-600 text-white"
            }`}
          >
            {theme === "light" ? "Dark" : "Light"} Theme
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${
                theme === "light"
                  ? "focus:ring-2 focus:ring-green-400 bg-gray-100"
                  : "focus:ring-2 focus:ring-teal-500 bg-gray-800 text-white"
              }`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${
                theme === "light"
                  ? "focus:ring-2 focus:ring-green-400 bg-gray-100"
                  : "focus:ring-2 focus:ring-teal-500 bg-gray-800 text-white"
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg shadow-lg focus:outline-none ${
              theme === "light"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-teal-700 hover:bg-teal-800"
            } text-white`}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          <p className="text-center mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className={`cursor-pointer hover:underline ${
                theme === "light" ? "text-green-500" : "text-teal-400"
              }`}
              onClick={toggleForm}
            >
              {isSignup ? "Log In" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
