import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext"; // Adjust path as necessary
import Footer from "./Footer";

const SeeWeather = () => {
  const [city, setCity] = useState(""); // Store user input city
  const [weather, setWeather] = useState(null); // Store weather data
  const [error, setError] = useState(""); // Store error message
  const [loading, setLoading] = useState(false); // Loading state
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    const apiKey = "600be118c7b47ded4c7593ae06e39b91"; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      setLoading(true); // Start loading
      const response = await axios.get(apiUrl);
      setWeather(response.data); // Update weather data
      setError(""); // Clear error if successful
    } catch (err) {
      setError("City not found. Please try again."); // Error message
      setWeather(null); // Clear weather data on error
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen transition-all ${
        theme === "light"
          ? "bg-gradient-to-r from-green-100 via-blue-100 to-green-200 text-black"
          : "bg-gradient-to-r from-green-900 via-blue-900 to-green-800 text-white"
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-lg w-96 ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        {/* Theme Switcher */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Weather Checker</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-1 rounded ${
              theme === "light" ? "bg-gray-200" : "bg-gray-600 text-white"
            }`}
          >
            {theme === "light" ? "Dark" : "Light"} Theme
          </button>
        </div>

        {/* Input for city */}
        <div className="mb-4">
          <input
            type="text"
            className={`w-full p-2 border rounded-md ${
              theme === "light"
                ? "border-gray-300 bg-gray-100"
                : "border-gray-700 bg-gray-900"
            }`}
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Show error if there's one */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Button to trigger weather fetch */}
        <div className="flex justify-center">
          <button
            className={`px-6 py-2 rounded-full ${
              theme === "light"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
            onClick={fetchWeather}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "See the Weather"}
          </button>
        </div>

        {/* Weather data display */}
        {weather && !loading && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg capitalize">{weather.weather[0].description}</p>
            <p className="text-xl font-bold">{weather.main.temp}°C</p>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-sm">
                <span className="font-semibold">Humidity:</span> {weather.main.humidity}%
              </p>
              <p className="text-sm">
                <span className="font-semibold">Wind Speed:</span> {weather.wind.speed} m/s
              </p>
              <p className="text-sm">
                <span className="font-semibold">Pressure:</span> {weather.main.pressure} hPa
              </p>
              <p className="text-sm">
                <span className="font-semibold">Feels Like:</span> {weather.main.feels_like}°C
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeWeather;
