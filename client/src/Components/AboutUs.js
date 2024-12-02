import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FaInstagram, FaLinkedin } from "react-icons/fa"; // Use Instagram and LinkedIn icons
import { useTheme } from "./ThemeContext"; // Adjust the path as necessary
import Footer from "./Footer"; // Import Footer component

export const AboutUs = () => {
  const { theme } = useTheme();

  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Frontend Developer",
      id: "ID001",
      avatar: "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Alice",
      instagram: "https://www.instagram.com/alice",
      linkedin: "https://www.linkedin.com/in/alice",
    },
    {
      name: "Bob Smith",
      role: "Backend Developer",
      id: "ID002",
      avatar: "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Bob",
      instagram: "https://www.instagram.com/bob",
      linkedin: "https://www.linkedin.com/in/bob",
    },
    {
      name: "Charlie Davis",
      role: "UI/UX Designer",
      id: "ID003",
      avatar: "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Charlie",
      instagram: "https://www.instagram.com/charlie",
      linkedin: "https://www.linkedin.com/in/charlie",
    },
  ];

  return (
    <div
      className={twMerge(
        `min-h-screen px-4 py-12 pt-24`,
        theme === "light" ? "bg-gradient-to-r from-green-200 to-blue-100 text-black" : "bg-gradient-to-r from-blue-900 to-gray-800 text-white"
      )}
    >
      {/* Main Content */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="mx-auto grid max-w-4xl gap-8"
      >
        {teamMembers.map((member, index) => (
          <TeamMemberBlock key={index} member={member} />
        ))}
      </motion.div>

      {/* Footer */}
      <Footer /> {/* Footer component remains unchanged */}
    </div>
  );
};

const Block = ({ children, className, ...rest }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={{
        initial: { scale: 0.5, y: 50, opacity: 0 },
        animate: { scale: 1, y: 0, opacity: 1 },
      }}
      transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
      className={twMerge(
        `rounded-lg border p-6`,
        theme === "light" ? "border-gray-300 bg-white" : "border-zinc-700 bg-zinc-800",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

const TeamMemberBlock = ({ member }) => (
  <div className="grid grid-cols-12 gap-4">
    <Block className="col-span-12 md:col-span-6">
      <img
        src={member.avatar}
        alt={`${member.name}'s Avatar`}
        className="mb-4 h-16 w-16 rounded-full"
      />
      <h2 className="mb-2 text-2xl font-medium">{member.name}</h2>
      <p className="text-lg text-zinc-400">{member.role}</p>
      <p className="text-sm text-zinc-500">ID: {member.id}</p>
    </Block>
    <div className="col-span-12 md:col-span-6 grid grid-cols-12 gap-4">
      <SocialCard href={member.instagram} gradient="from-pink-500 via-red-500 to-orange-500" icon={<FaInstagram />} />
      <SocialCard href={member.linkedin} gradient="from-blue-600 to-cyan-500" icon={<FaLinkedin />} />
    </div>
  </div>
);

const SocialCard = ({ href, gradient, icon }) => (
  <Block
    whileHover={{ rotate: "2.5deg", scale: 1.1 }}
    className={`col-span-6 bg-gradient-to-r ${gradient}`}
  >
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-full place-content-center text-3xl text-white"
    >
      {icon}
    </a>
  </Block>
);
