//nav nar component 
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import Example from "./SliderToggle";
import { useTheme } from "./ThemeContext"; 
import SingleTabWithDropdown from "./SingleTabWithDropdown"; // Import the new component

export const SlideTabsExample = () => {
  return (
    <div className="relative">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const { theme } = useTheme(); // Get the theme from context

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="absolute top-3 left-1/2 transform -translate-x-1/2 flex w-fit rounded-full p-0 z-20 mt-2"
    >
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/">Home</Link>
      </Tab>
      <SingleTabWithDropdown setPosition={setPosition} theme={theme} /> {/* Use the new component */}
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/gardening-tips">Gardening Tips</Link> {/* Ensure this matches the route */}
      </Tab>
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/about-us">Contact Team</Link>
      </Tab>
      
      <Tab setPosition={setPosition} theme={theme}>
        <Link to="/">Login</Link> 
      </Tab>
      

      <Example />
      <Cursor position={position} />
    </ul>
  );
};

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
