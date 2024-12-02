import React, { useEffect, useState } from "react";
import { FiPlus, FiClock, FiTrash2 } from "react-icons/fi";
import SlideInNotifications from "./SlideInNotifications"; 
import { AnimatePresence, motion } from "framer-motion";

export const VanishList = () => {
  const [todos, setTodos] = useState([]);
  const [notifications, setNotifications] = useState([]);

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
    <section className="min-h-screen bg-zinc-950 py-24 m-0 p-0">
      <SlideInNotifications notifications={notifications} removeNotif={removeNotif} />
      <div className="mx-auto w-full max-w-xl px-4">
        <Header />
        <Todos
          removeElement={removeElement}
          todos={todos}
          handleCheck={handleCheck}
        />
        <Form setTodos={setTodos} handleAddTodo={handleAddTodo} />
      </div>
    </section>
  );
};

// Header Component
const Header = () => {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-medium text-white">Good morning! ☀️</h1>
      <p className="text-zinc-400">Let's see what we've got to do today.</p>
    </div>
  );
};

// Form Component
const Form = ({ setTodos, handleAddTodo }) => {
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
            className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What do you need to do?"
              className="h-24 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
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
                  className={`rounded px-1.5 py-1 text-xs ${unit === "mins" ? "bg-white text-zinc-950" : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"}`}
                >
                  mins
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("hrs")}
                  className={`rounded px-1.5 py-1 text-xs ${unit === "hrs" ? "bg-white text-zinc-950" : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"}`}
                >
                  hrs
                </button>
              </div>
              <button type="submit" className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500">
                Submit
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900"
      >
        <FiPlus className={`transition-transform ${visible ? "rotate-45" : "rotate-0"}`} />
      </button>
    </div>
  );
};

// Todos Component
const Todos = ({ todos, handleCheck, removeElement }) => {
  return (
    <div className="w-full space-y-3">
      <AnimatePresence>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            checked={todo.checked}
            time={todo.time}
            handleCheck={handleCheck}
            removeElement={removeElement}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Todo Component
const Todo = ({ id, text, checked, time, handleCheck, removeElement }) => {
  return (
    <motion.div layout className="relative flex w-full items-center gap-3 rounded border border-zinc-700 bg-zinc-900 p-3">
      <input type="checkbox" checked={checked} onChange={() => handleCheck(id)} className="size-4 accent-indigo-400" />
      <p className={`text-white ${checked && "text-zinc-400"}`}>{text}</p>
      <div className="ml-auto flex gap-1.5">
        <div className="flex items-center gap-1.5 rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
          <FiClock />
          <span>{time}</span>
        </div>
        <button onClick={() => removeElement(id)} className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200">
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default VanishList;
