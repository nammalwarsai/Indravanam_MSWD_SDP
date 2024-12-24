import React, { useState, useRef, useEffect } from "react";
import { HfInference } from "@huggingface/inference";
import { FaPaperPlane, FaTrash, FaCopy, FaRedo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const client = new HfInference("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");
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const [retryCount, setRetryCount] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleRetry = async () => {
    if (messages.length > 0) {
      const lastUserMessage = messages.find(m => m.user)?.text;
      if (lastUserMessage) {
        setError(null);
        const response = await getResponse(lastUserMessage);
        if (response) {
          const botMessage = {
            user: false,
            text: response,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
        }
      }
    }
  };

  const getResponse = async (userInput, retryAttempt = 0) => {
    try {
      setIsTyping(true);
      setError(null);

      const response = await client.chatCompletion({
        model: "Qwen/Qwen2.5-Coder-32B-Instruct",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          ...messages.map(msg => ({
            role: msg.user ? "user" : "assistant",
            content: msg.text
          })),
          { role: "user", content: userInput }
        ],
        max_tokens: 500000,
        temperature: 0.7,
        retry: true,
        timeout: 30000,
      });

      if (!response?.choices?.[0]?.message?.content) {
        throw new Error("Invalid response format");
      }

      return response.choices[0].message.content;

    } catch (error) {
      console.error("API Error:", error);
      
      if (retryAttempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return getResponse(userInput, retryAttempt + 1);
      }

      setError({
        message: "Failed to get response. Please try again.",
        details: error.message
      });
      return null;
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      user: true,
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const botResponse = await getResponse(input);
    if (botResponse) {
      const botMessage = {
        user: false,
        text: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const formatMessage = (text) => {
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        });
      }

      parts.push({
        type: 'code',
        language: match[1] || 'javascript',
        content: match[2].trim()
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      });
    }

    return parts.map((part, index) => {
      if (part.type === 'code') {
        return (
          <div key={index} className="my-4 rounded-lg overflow-hidden">
            <SyntaxHighlighter
              language={part.language}
              style={atomOneDark}
              className="!bg-gray-900"
            >
              {part.content}
            </SyntaxHighlighter>
          </div>
        );
      }
      return <p key={index}>{part.content}</p>;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.user ? "justify-end" : "justify-start"} mb-4`}
              >
                <div className={`max-w-3xl rounded-lg p-4 ${
                  message.user
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 shadow-lg"
                }`}>
                  <div className="prose dark:prose-invert">
                    {formatMessage(message.text)}
                  </div>
                  
                  <div className="flex items-center mt-2 space-x-2 text-sm opacity-70">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {!message.user && (
                      <button
                        onClick={() => copyToClipboard(message.text)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Copy message"
                      >
                        <FaCopy size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 p-4"
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
              </div>
              <span className="text-sm text-gray-500">AI is thinking...</span>
            </motion.div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{error.message}</span>
              <button
                onClick={handleRetry}
                className="ml-2 text-sm underline flex items-center"
              >
                <FaRedo className="mr-1" /> Retry
              </button>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t dark:border-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
            </button>
            <button
              onClick={() => setMessages([])}
              className="px-6 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;