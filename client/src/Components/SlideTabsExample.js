import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Example from "./SliderToggle";
import { useTheme } from "./ThemeContext";
import SingleTabWithDropdown from "./SingleTabWithDropdown";

// Main SlideTabsExample component
export const SlideTabsExample = ({ onLogout }) => {
  return (
    <div className="relative">
      <SlideTabs onLogout={onLogout} />
    </div>
  );
};


const SlideTabs = ({ onLogout }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const { theme, toggleTheme } = useTheme(); // Assuming 'toggleTheme' is provided by the context
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    onLogout(); // Clear authentication state
    navigate("/login"); // Redirect to login page
  };

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="absolute top-3 left-1/2 transform -translate-x-1/2 flex w-fit rounded-full p-0 z-10 mt-2"
    >
      {/* Navbar Links */}
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/">Home</Link>
      </Tab>
      <SingleTabWithDropdown setPosition={setPosition} theme={theme} />
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/gardening-tips">Gardening Tips</Link>
      </Tab>
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/about-us">OUR_TEAM</Link>
      </Tab>
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/See-weather">See Weather</Link>
      </Tab>
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/community">Explore Community</Link>
      </Tab>
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/GardenPlanner">Garden Planner</Link>
      </Tab>
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/Chatbot">Chatbot</Link>
      </Tab>
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/MailUs">MAIL_US</Link>
      </Tab>

      {/* Container for Theme Toggle and Logout Button */}
      <div className="absolute top-3 right-5 flex items-center z-20 mt-2">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 15px",
            backgroundColor: theme === "light" ? "#4CAF50" : "#333",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          {theme === "light" ? "Light" : "Dark"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            backgroundColor: "#ff5252",
            border: "none",
            borderRadius: "5px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Animation effect for tab sliding */}
      <Example />
      <Cursor position={position} />
    </ul>
  );
};

// Tab component for navigation links
const Tab = ({ children, setPosition, theme }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-3 md:text-base ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      {children}
    </li>
  );
};

// Cursor effect for tab sliding
const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-green-500 md:h-12"
    />
  );
};

export default SlideTabsExample;
