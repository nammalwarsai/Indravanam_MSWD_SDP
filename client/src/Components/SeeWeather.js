import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "./ThemeContext"; // Adjust path as necessary
import { WiThermometer, WiStrongWind, WiHumidity, WiSunrise, WiSunset, WiBarometer, WiCloudy, WiDaySunny, WiRaindrop } from "react-icons/wi";
import { FaSearch } from "react-icons/fa";

const WeatherCard = ({ title, children, theme }) => (
  <div className={`p-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 ${
    theme === "light" ? "bg-white/80" : "bg-gray-800/80"
  }`}>
    <h3 className="text-xl font-bold mb-4 border-b pb-2">{title}</h3>
    {children}
  </div>
);

const SeeWeather = () => {
  const [city, setCity] = useState(""); // Store user input city
  const [weather, setWeather] = useState(null); // Store weather data
  const [error, setError] = useState(""); // Store error message
  const [loading, setLoading] = useState(false); // Loading state
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function
  const [showSearch, setShowSearch] = useState(true); // Add new state for controlling search visibility

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
      setShowSearch(false); // Hide search after successful fetch
    } catch (err) {
      setError("City not found. Please try again."); // Error message
      setWeather(null); // Clear weather data on error
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleReset = () => {
    setWeather(null);
    setCity("");
    setError("");
    setShowSearch(true);
  };

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen transition-all duration-500 backdrop-blur-sm ${
        theme === "light"
          ? "bg-gradient-to-r from-blue-200 via-purple-100 to-pink-200 text-gray-800"
          : "bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white"
      }`}
    >
      {showSearch ? (
        <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-md mb-8 ${
          theme === "light" ? "bg-white/80" : "bg-gray-800/80"
        }`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weather App
            </h1>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                theme === "light"
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative mb-8">
            <input
              type="text"
              className={`w-full p-4 pl-12 rounded-xl transition-all duration-300 ${
                theme === "light"
                  ? "bg-gray-100 focus:bg-white border-gray-200"
                  : "bg-gray-700 focus:bg-gray-600 border-gray-600"
              } border-2 focus:border-blue-500 outline-none`}
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              onClick={fetchWeather}
              disabled={loading}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg ${
                theme === "light"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-purple-500 hover:bg-purple-600"
              } text-white transition-all duration-300`}
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"/>
              ) : (
                "Search"
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 mb-4 rounded-lg bg-red-100 text-red-700 text-center">
              {error}
            </div>
          )}
        </div>
      ) : null}

      {/* Weather Data Display */}
      {weather && !loading && (
        <div className="w-full max-w-7xl p-6 space-y-6">
          {/* Main Weather Overview - Added mt-16 for extra top margin */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <WeatherCard title="Current Weather" theme={theme}>
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">{weather.name}</h2>
                <div className="text-7xl font-bold my-6">{Math.round(weather.main.temp)}°C</div>
                <div className="text-2xl capitalize flex items-center justify-center gap-2">
                  <WiDaySunny className="text-3xl" />
                  {weather.weather[0].description}
                </div>
              </div>
            </WeatherCard>

            <WeatherCard title="Temperature Details" theme={theme}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <WiThermometer className="text-3xl text-red-500" />
                  <div>
                    <div className="text-sm opacity-70">Feels Like</div>
                    <div className="font-bold">{Math.round(weather.main.feels_like)}°C</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WiThermometer className="text-3xl text-blue-500" />
                  <div>
                    <div className="text-sm opacity-70">Min Temp</div>
                    <div className="font-bold">{Math.round(weather.main.temp_min)}°C</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WiThermometer className="text-3xl text-orange-500" />
                  <div>
                    <div className="text-sm opacity-70">Max Temp</div>
                    <div className="font-bold">{Math.round(weather.main.temp_max)}°C</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WiRaindrop className="text-3xl text-blue-400" />
                  <div>
                    <div className="text-sm opacity-70">Humidity</div>
                    <div className="font-bold">{weather.main.humidity}%</div>
                  </div>
                </div>
              </div>
            </WeatherCard>

            <WeatherCard title="Wind & Atmosphere" theme={theme}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <WiStrongWind className="text-3xl text-cyan-500" />
                  <div>
                    <div className="text-sm opacity-70">Wind Speed</div>
                    <div className="font-bold">{weather.wind.speed} m/s</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WiBarometer className="text-3xl text-purple-500" />
                  <div>
                    <div className="text-sm opacity-70">Pressure</div>
                    <div className="font-bold">{weather.main.pressure} hPa</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WiCloudy className="text-3xl text-gray-500" />
                  <div>
                    <div className="text-sm opacity-70">Cloudiness</div>
                    <div className="font-bold">{weather.clouds.all}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WiDaySunny className="text-3xl text-yellow-500" />
                  <div>
                    <div className="text-sm opacity-70">Visibility</div>
                    <div className="font-bold">{(weather.visibility / 1000).toFixed(1)} km</div>
                  </div>
                </div>
              </div>
            </WeatherCard>
          </div>

          {/* Rest of the weather cards */}
          <div className="space-y-6">
            {/* Sun Position */}
            <WeatherCard title="Sun Position" theme={theme}>
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <WiSunrise className="text-6xl text-yellow-500 mx-auto" />
                  <div className="text-sm opacity-70">Sunrise</div>
                  <div className="font-bold">
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                  </div>
                </div>
                <div className="text-center">
                  <WiSunset className="text-6xl text-orange-500 mx-auto" />
                  <div className="text-sm opacity-70">Sunset</div>
                  <div className="font-bold">
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </WeatherCard>

            {/* Location Info */}
            <WeatherCard title="Location Information" theme={theme}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm opacity-70">Country</div>
                  <div className="font-bold">{weather.sys.country}</div>
                </div>
                <div>
                  <div className="text-sm opacity-70">Coordinates</div>
                  <div className="font-bold">
                    {weather.coord.lat.toFixed(2)}°N, {weather.coord.lon.toFixed(2)}°E
                  </div>
                </div>
              </div>
            </WeatherCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeeWeather;
