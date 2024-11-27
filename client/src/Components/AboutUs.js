import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight} from "react-icons/fi";
import { FaInstagram } from "react-icons/fa"; // Use Instagram logo
import { useTheme } from "./ThemeContext"; // Adjust the path as necessary

export const AboutUs = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <div className={`min-h-screen px-4 py-12 ${theme === "light" ? "bg-white text-black pt-24" : "bg-zinc-900 text-zinc-50 pt-24"}`}>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
      </motion.div>
    </div>
  );
};

const Block = ({ className, ...rest }) => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        `col-span-4 rounded-lg border ${theme === "light" ? "border-gray-300 bg-white" : "border-zinc-700 bg-zinc-800"} p-6`,
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
      alt="avatar"
      className="mb-4 size-14 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Hi, I'm Tom.{" "}
      <span className="text-zinc-400">
        I build cool websites like this one.
      </span>
    </h1>

    <a
      href="https://www.instagram.com/not_.teja?igsh=cjljbjJwZTJ1ZDdn"
      className="flex items-center gap-1 text-red-300 hover:underline"
    >
      Contact me <FiArrowRight />
    </a>
  </Block>
);


const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 md:col-span-3"
    >
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <FaInstagram />
      </a>
    </Block>

    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 md:col-span-3"
    >
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <FaInstagram />
      </a>
    </Block>

    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 md:col-span-3"
    >
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <FaInstagram />
      </a>
    </Block>

    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 md:col-span-3"
    >
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <FaInstagram />
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      My passion is building cool stuff.{" "}
      <span className="text-zinc-400">
        I build primarily with React, Tailwind CSS, and Framer Motion. I love
        this stack so much that I even built a website about it. I've made over
        a hundred videos on the subject across YouTube and TikTok.
      </span>
    </p>
  </Block>
);
