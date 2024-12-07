import React, { useRef } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const SingleTabWithDropdown = ({ setPosition, theme }) => {
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
      <Link to="/remainders">Remainders</Link> {/* Directly link to Remainders */}
    </li>
  );
};

export default SingleTabWithDropdown;
