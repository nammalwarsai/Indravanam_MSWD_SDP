import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext"; // Adjust path as necessary

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
      className={`flex flex-col justify-center items-center min-h-screen transition-all ${
        theme === "light"
          ? "bg-gradient-to-r from-green-100 via-blue-100 to-green-200 text-black"
          : "bg-gradient-to-r from-green-900 via-blue-900 to-green-800 text-white"
      }`}
    >
      {/* Main Card */}
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
      </div>

      {/* Weather Data Display */}
      {weather && !loading && (
        <div
          className={`mt-8 p-6 rounded-lg shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 ${
            theme === "light" ? "bg-white" : "bg-gray-800 text-white"
          }`}
        >
          <div className="p-4 border rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Weather Details</h2>
            <div>Description: {weather.weather[0].description}</div>
            <div>Temperature: {weather.main.temp}°C</div>
            <div>Feels Like: {weather.main.feels_like}°C</div>
            <div>Min Temp: {weather.main.temp_min}°C</div>
            <div>Max Temp: {weather.main.temp_max}°C</div>
          </div>

          <div className="p-4 border rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Atmospheric Conditions</h2>
            <div>Pressure: {weather.main.pressure} hPa</div>
            <div>Wind Speed: {weather.wind.speed} m/s</div>
            <div>Wind Direction: {weather.wind.deg}°</div>
            <div>Cloudiness: {weather.clouds.all}%</div>
            <div>Visibility: {weather.visibility / 1000} km</div>
          </div>

          <div className="p-4 border rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sun Position</h2>
            <div>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</div>
            <div>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeeWeather;
