import React, { useState, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const SingleTabWithDropdown = ({ setPosition, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div ref={ref} className="relative">
      <li
        onClick={() => setIsOpen((prev) => !prev)}
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
        Features
      </li>

      {isOpen && (
        <ul className={`absolute left-0 mt-2 w-full rounded-md shadow-lg z-30 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
<li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            <Link to="/remainders">Remainders</Link> {/* Add a Link to navigate */}
          </li>
          {/* Add more dropdown items here if needed */}
        </ul>
      )}
    </div>
  );
};

export default SingleTabWithDropdown;
