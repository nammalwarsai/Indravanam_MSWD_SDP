import React, { useState, useRef, useEffect } from "react";
import { HfInference } from "@huggingface/inference";
import { FaCopy, FaPaperPlane, FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from "./ThemeContext";

const client = new HfInference("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");

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { theme } = useTheme();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getResponse = async (userInput) => {
    try {
      setIsTyping(true);
      const chatCompletion = await client.chatCompletion({
        model: "Qwen/Qwen2.5-Coder-32B-Instruct",
        messages: [{ role: "user", content: userInput }],
        max_tokens: 500000,
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
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const formatMessage = (text) => {
    if (text.includes("```")) {
      const parts = text.split("```");
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <div className="my-4 rounded-lg overflow-hidden">
              <SyntaxHighlighter
                language="javascript"
                style={theme === "dark" ? docco : undefined}
                className="p-4"
              >
                {part.trim()}
              </SyntaxHighlighter>
            </div>
          );
        }
        return <p className="mb-2">{part}</p>;
      });
    }
    return <p>{text}</p>;
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Main Messages Container */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-6 ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
      }`}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${msg.user ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-3xl ${msg.user ? "ml-12" : "mr-12"}`}>
                <div className={`p-4 rounded-2xl shadow-lg ${
                  msg.user
                    ? theme === "dark" 
                      ? "bg-blue-600 text-white" 
                      : "bg-blue-500 text-white"
                    : theme === "dark" 
                      ? "bg-gray-700 text-white" 
                      : "bg-white text-gray-800"
                }`}>
                  {formatMessage(msg.text)}
                  {!msg.user && (
                    <button
                      onClick={() => handleCopy(msg.text)}
                      className="mt-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <FaCopy className="inline mr-1" /> Copy
                    </button>
                  )}
                </div>
                <span className={`text-xs mt-1 block ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className={`p-4 rounded-2xl shadow-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className={`p-4 border-t ${
        theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className={`flex-1 p-4 rounded-xl border focus:ring-2 focus:outline-none transition-all ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
                : "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-400"
            }`}
          />
          <button
            onClick={handleSend}
            className="px-6 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <FaPaperPlane />
          </button>
          <button
            onClick={handleClearChat}
            className="px-6 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
