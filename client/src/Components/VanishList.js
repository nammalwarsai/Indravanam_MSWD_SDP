import React, { useState, useEffect } from "react";
import { FiPlus, FiClock, FiTrash2 } from "react-icons/fi";
import SlideInNotifications from "./SlideInNotifications";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeContext"; // Adjust path as necessary

export const VanishList = () => {
  const [todos, setTodos] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { theme, toggleTheme } = useTheme(); // Access theme context

  const removeNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const notify = (text) => {
    const newNotification = {
      id: Math.random(),
      text,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const handleAddTodo = (text, time) => {
    const newTodo = {
      id: Math.random(),
      text,
      time: `${time} mins`,
      createdAt: Date.now(),
      checked: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      todos.forEach((todo) => {
        const time = parseInt(todo.time);
        const elapsedTime = Math.floor((now - todo.createdAt) / 1000 / 60); // Minutes

        if (elapsedTime >= time && !todo.checked) {
          notify(`Time is up for: ${todo.text}`);
          setTodos((prev) =>
            prev.map((t) => (t.id === todo.id ? { ...t, checked: true } : t))
          );
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [todos]);

  const handleCheck = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const removeElement = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section
      className={`min-h-screen py-24 m-0 p-0 transition-all ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <SlideInNotifications notifications={notifications} removeNotif={removeNotif} />
      <div className="mx-auto w-full max-w-xl px-4">
        <Header toggleTheme={toggleTheme} theme={theme} />
        <Todos
          removeElement={removeElement}
          todos={todos}
          handleCheck={handleCheck}
          theme={theme}
        />
        <Form setTodos={setTodos} handleAddTodo={handleAddTodo} theme={theme} />
      </div>
    </section>
  );
};

// Header Component
const Header = ({ toggleTheme, theme }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
     
      <h1
        className={`text-xl font-medium ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
        Welcome To Your Custom Kanban Board
      </h1>
      <h1
        className={`text-x1 font-medium ${
          theme === "light" ? "text-black" : "text-white"
        }`}
      >
          EXPLORE OUR FEATURE TO MEET YOUR UNIQUE NEEDS AND TIME MANAGEMENT NEEDS
      </h1>
    </div>
  );
};

// Todos Component
const Todos = ({ todos, removeElement, handleCheck, theme }) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`flex justify-between items-center p-4 border rounded-md shadow-sm ${
            theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleCheck(todo.id)}
              className="mr-4"
            />
            <span>{todo.text}</span>
          </div>
          <button
            onClick={() => removeElement(todo.id)}
            className="text-red-500"
          >
            <FiTrash2 />
          </button>
        </div>
      ))}
    </div>
  );
};

// Form Component
const Form = ({ setTodos, handleAddTodo, theme }) => {
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(15);
  const [text, setText] = useState("");
  const [unit, setUnit] = useState("mins");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.length) return;

    handleAddTodo(text, time);
    setTime(15);
    setText("");
    setUnit("mins");
  };

  return (
    <div className="fixed bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
      <AnimatePresence>
        {visible && (
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            onSubmit={handleSubmit}
            className={`mb-6 w-full rounded border p-3 ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What do you need to do?"
              className={`h-24 w-full resize-none rounded p-3 text-sm ${
                theme === "light" ? "bg-gray-100 text-black" : "bg-gray-700 text-white"
              }`}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  className="w-24 rounded bg-zinc-700 px-1.5 py-1 text-sm text-zinc-50 focus:outline-0"
                  value={time}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                />
                <button
                  type="button"
                  onClick={() => setUnit("mins")}
                  className={`rounded px-1.5 py-1 text-xs ${
                    unit === "mins"
                      ? "bg-white text-zinc-950"
                      : "bg-zinc-300/20 text-zinc-300"
                  }`}
                >
                  mins
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("hrs")}
                  className={`rounded px-1.5 py-1 text-xs ${
                    unit === "hrs"
                      ? "bg-white text-zinc-950"
                      : "bg-zinc-300/20 text-zinc-300"
                  }`}
                >
                  hrs
                </button>
              </div>
              <button
                type="submit"
                className={`rounded px-1.5 py-1 text-xs ${
                  theme === "light" ? "bg-indigo-600 text-indigo-50" : "bg-indigo-500 text-indigo-200"
                }`}
              >
                Submit
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <button
        onClick={() => setVisible((prev) => !prev)}
        className={`grid w-full place-content-center rounded-full border py-3 text-lg text-white transition-colors ${
          theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default VanishList;
