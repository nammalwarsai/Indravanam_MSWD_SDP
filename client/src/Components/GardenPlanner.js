import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useTheme } from "./ThemeContext"; // Adjust path as necessary

const GardenPlanner = () => {
  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [layoutType, setLayoutType] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("");
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [soilType, setSoilType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const indoorLayouts = ["9x9 cm", "12x12 cm", "15x15 cm","17x17 m","19x19 m","21x21 m"];
  const outdoorLayouts = ["3x3 m", "5x5 m", "7x7 m","9x9 m","11x11 m","13x13 m"];
  const plantOptions = ["Roses", "Tulips", "Cacti", "Basil", "Tomatoes","Tulasi","Lavender", "Corn", "Chrysanthemums", "Sunflowers", "Peonies", "Bell Peppers", "Sweet Potatoes"];

  const fetchWeather = async () => {
    const apiKey = "600be118c7b47ded4c7593ae06e39b91";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setWeather(response.data);
      setError("");
    } catch {
      setError("City not found. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    await fetchWeather();
    if (!weather) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`${userInfo.name}'s Garden Planning Report`, 20, 20);

    doc.setFontSize(14);
    doc.text(`User Details:`, 20, 40);
    doc.text(`Name: ${userInfo.name}`, 20, 50);
    doc.text(`Email: ${userInfo.email}`, 20, 60);
    doc.text(`Phone: ${userInfo.phone}`, 20, 70);

    doc.text(`Garden Preferences:`, 20, 90);
    doc.text(`Garden Type: ${layoutType}`, 20, 100);
    doc.text(`Layout: ${selectedLayout}`, 20, 110);
    doc.text(`Plants: ${selectedPlants.join(", ")}`, 20, 120);

    doc.text(`Region Details:`, 20, 140);
    doc.text(`City: ${city}`, 20, 150);
    doc.text(`Soil Type: ${soilType}`, 20, 160);

    if (weather) {
      doc.text("Weather Details:", 20, 180);
      doc.text(`Temperature: ${weather.main.temp}°C`, 20, 190);
      doc.text(`Conditions: ${weather.weather[0].description}`, 20, 200);
    }
    doc.save(`${userInfo.name}_Garden_Planning_Report.pdf`);
  };

  const isUserInfoValid =
    userInfo.name &&
    userInfo.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) &&
    userInfo.phone.match(/^\d{10}$/);

  return (
    <div
      className={`min-h-screen transition-all ${
        theme === "light"
          ? "bg-gradient-to-r from-green-200 to-blue-200 text-black"
          : "bg-gradient-to-r from-gray-900 to-black text-white"
      } flex items-center justify-center p-6`}
    >
      <div
        className={`shadow-lg rounded-lg p-8 max-w-3xl w-full ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        {/* Theme Toggle */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Garden Planner</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-1 rounded ${
              theme === "light" ? "bg-gray-200" : "bg-gray-600 text-white"
            }`}
          >
            {theme === "light" ? "Dark" : "Light"} Theme
          </button>
        </div>

        {/* Step 0: User Info */}
        {step === 0 && (
          <div>
            <h1 className="text-4xl font-bold mb-6 text-center">
              Welcome to Garden Planner _  plan your garden like a master
            </h1>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, name: e.target.value }))
                }
                className={`p-3 border rounded-lg w-full ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
                }`}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`p-3 border rounded-lg w-full ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
                }`}
              />
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, phone: e.target.value }))
                }
                className={`p-3 border rounded-lg w-full ${
                  theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
                }`}
              />
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={!isUserInfoValid}
              className={`w-full mt-6 p-3 rounded-lg ${
                theme === "light" ? "bg-green-500" : "bg-purple-600"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 1: Choose Garden Type */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Choose Garden Type
            </h2>
            <div className="flex justify-around">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => {
                  setLayoutType("Indoor");
                  setStep(2);
                }}
              >
                Indoor
              </button>
              <button
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                onClick={() => {
                  setLayoutType("Outdoor");
                  setStep(2);
                }}
              >
                Outdoor
              </button>
            </div>
          </div>
        )}

  {/* Step 2: Select Layout */}
{step === 2 && (
  <div>
    <h2 className="text-2xl font-bold mb-4 text-center">
      Select {layoutType} Layout
    </h2>
    <div className="grid grid-cols-3 gap-4">
      {(layoutType === "Indoor" ? indoorLayouts : outdoorLayouts).map(
        (layout, index) => (
          <button
            key={index}
            className={`p-4 rounded-lg border ${
              selectedLayout === layout
                ? "bg-green-300 border-green-500 text-black"
                : theme === "light"
                ? "bg-gray-100 border-gray-300 text-black"
                : "bg-gray-900 border-gray-700 text-white"
            }`}
            onClick={() => setSelectedLayout(layout)}
          >
            {layout}
          </button>
        )
      )}
    </div>
    <button
      className="mt-6 w-full bg-green-500 text-white p-3 rounded-lg"
      disabled={!selectedLayout}
      onClick={() => setStep(3)}
    >
      Next
    </button>
  </div>
)}

{/* Step 3: Select Plants */}
{step === 3 && (
  <div>
    <h2 className="text-2xl font-bold mb-4 text-center">
      Select Your Plants
    </h2>
    <div className="grid grid-cols-3 gap-4">
      {plantOptions.map((plant, index) => (
        <button
          key={index}
          className={`p-4 rounded-lg border ${
            selectedPlants.includes(plant)
              ? "bg-green-300 border-green-500 text-black"
              : theme === "light"
              ? "bg-gray-100 border-gray-300 text-black"
              : "bg-gray-900 border-gray-700 text-white"
          }`}
          onClick={() =>
            setSelectedPlants((prev) =>
              prev.includes(plant)
                ? prev.filter((p) => p !== plant)
                : [...prev, plant]
            )
          }
        >
          {plant}
        </button>
      ))}
    </div>
    <button
      className="mt-6 w-full bg-green-500 text-white p-3 rounded-lg"
      disabled={selectedPlants.length === 0}
      onClick={() => setStep(4)}
    >
      Next
    </button>
  </div>
)}


        {/* Step 4: Enter Region Details */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Enter Region Details
            </h2>
            <input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`p-3 border rounded-lg w-full ${
                theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
              }`}
            />
          <select
  value={soilType}
  onChange={(e) => setSoilType(e.target.value)}
  className={`mt-4 p-3 border rounded-lg w-full ${
    theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
  }`}
>
  <option value="">Select soil type</option>
  <option value="Red Soil">Red Soil</option>
  <option value="Black Cotton Soil">Black Cotton Soil</option>
  <option value="Alluvial Soil">Alluvial Soil</option>
  <option value="Laterite Soil">Laterite Soil</option>
  <option value="Sandy Soil">Sandy Soil</option>
  <option value="Clayey Soil">Clayey Soil</option>
  <option value="Loamy Soil">Loamy Soil</option>
  <option value="Saline Soil">Saline Soil</option>
  <option value="Alkaline Soil">Alkaline Soil</option>
  <option value="Peaty and Marshy Soil">Peaty and Marshy Soil</option>
</select>

            <button
              className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg"
              disabled={!city || !soilType}
              onClick={generatePDF}
            >
              Generate Report
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-500 mt-4">
            <strong>Error:</strong> {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default GardenPlanner;
