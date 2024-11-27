import React, { useEffect } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const SlideInNotifications = ({ notifications, removeNotif }) => {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-4 flex items-start rounded gap-3 text-sm font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto" // Increased padding and font size
    >
      <FiCheckSquare className="mt-0.5 text-lg" /> {/* Adjust icon size if needed */}
      <span className="text-lg">{text}</span> {/* Increased font size */}
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5 text-lg">
        <FiX />
      </button>
    </motion.div>
  );
};

export default SlideInNotifications;
