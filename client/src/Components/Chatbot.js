import React, { useState, useEffect } from "react";
import { HfInference } from "@huggingface/inference";
import { FaCopy, FaTrash, FaSun, FaMoon } from "react-icons/fa";

const client = new HfInference("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");

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showHeading, setShowHeading] = useState(true);

  const getResponse = async (userInput) => {
    try {
      setIsTyping(true);
      const chatCompletion = await client.chatCompletion({
        model: "Qwen/Qwen2.5-Coder-32B-Instruct",
        messages: [{ role: "user", content: userInput }],
        max_tokens: 500,
      });

      const response = chatCompletion.choices[0].message.content;
      return response;
    } catch (error) {
      console.error("Error fetching response:", error);
      return "I'm sorry, I couldn't get a response at the moment.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      setShowHeading(false);
      const userMessage = { user: true, text: input, timestamp: new Date() };
      setMessages([...messages, userMessage]);
      setInput("");

      const botResponse = await getResponse(input);
      const botMessage = {
        user: false,
        text: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowHeading(true);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen flex flex-col`}>
      {/* Header */}
      <div className={`p-4 flex justify-end items-center ${theme === "dark" ? "bg-gray-800" : "bg-blue-500"} text-white`}>
        <button
          onClick={toggleTheme}
          className="mr-4 p-2 rounded hover:bg-gray-700 transition"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        {showHeading && (
          <div className="text-center text-lg font-semibold mb-4">
            Start a conversation by typing your message below.
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 flex ${msg.user ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg shadow ${
                msg.user
                  ? theme === "dark" ? "bg-blue-600" : "bg-blue-500 text-white"
                  : theme === "dark" ? "bg-gray-700" : "bg-gray-100 text-gray-800"
              } max-w-xl`}
            >
              {msg.text}
              {!msg.user && (
                <button
                  onClick={() => handleCopy(msg.text)}
                  className="text-gray-500 ml-2 hover:text-gray-700"
                >
                  <FaCopy />
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div
              className={`p-3 rounded-lg shadow ${
                theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className={`p-4 border-t ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowHeading(false)}
            placeholder="Enter your question here..."
            className={`flex-grow px-4 py-2 border rounded shadow focus:outline-none ${
              theme === "dark" ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400" : "bg-white text-black border-gray-300 focus:ring-blue-500"
            }`}
          />
          <button
            onClick={handleSend}
            className={`px-4 py-2 rounded ${
              theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600 text-white"
            } transition`}
          >
            Send
          </button>
          <button
            onClick={handleClearChat}
            className={`px-4 py-2 rounded ${
              theme === "dark" ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600 text-white"
            } transition`}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
