import React from "react";
import { motion } from "framer-motion";

const ShuffleHero2 = () => {
  return (
    <section className="w-full h-screen px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-full mx-auto">
      <div className="relative group text-container p-8 md:p-12">
        {/* DrawOutline for the entire content */}
        {/* TOP */}
        <span className="absolute -top-4 left-0 h-[2px] w-0 bg-[#4CAF50] transition-all duration-100 group-hover:w-full" />

        {/* RIGHT */}
        <span className="absolute top-0 -right-4 h-0 w-[2px] bg-[#4CAF50] transition-all delay-100 duration-100 group-hover:h-full" />

        {/* BOTTOM */}
        <span className="absolute -bottom-4 right-0 h-[2px] w-0 bg-[#4CAF50] transition-all delay-200 duration-100 group-hover:w-full" />

        {/* LEFT */}
        <span className="absolute bottom-0 -left-4 h-0 w-[2px] bg-[#4CAF50] transition-all delay-300 duration-100 group-hover:h-full" />

        {/* Text Content */}
        <motion.div
          whileHover={{ scale: 1.05 }} // Optional zoom effect for the entire content
          className="relative z-10"
        >
          {/* Main Heading */}
          <h3 className="text-4xl md:text-6xl font-semibold animate-fly-in">
            Welcome to YOUR Virtual Gardening Assistant
          </h3>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6 animate-fly-in">
            Discover expert guidance and tips tailored to nurture your garden. 
            Let us help you make your plants thrive and create a green sanctuary at home.
          </p>
        </motion.div>
      </div>

      <div className="image-container relative w-full h-full">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-full animate-fade-in"
          style={{
            backgroundImage: `url('https://imgs.search.brave.com/TA_r8SOSlG7nqkXB-W0QneXmyHJVx2yORhjjcANAtgs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L2Fz/TGFMNThKZFZaSk5F/dEt0dU5oZUUtNDE1/LTgwLmpwZw')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </section>
  );
};

export default ShuffleHero2;
