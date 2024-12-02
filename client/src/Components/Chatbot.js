import React, { useState } from "react";
import { useTheme } from "./ThemeContext"; // Adjust the import path if necessary
import { HfInference } from "@huggingface/inference"; // HuggingFace Inference

const client = new HfInference("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"); // Replace with your actual API key

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { theme, toggleTheme } = useTheme();

  const getResponse = async (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();

    try {
      const chatCompletion = await client.chatCompletion({
        model: "Qwen/Qwen2.5-Coder-32B-Instruct",
        messages: [
          { role: "user", content: userInput }
        ],
        max_tokens: 500
      });

      let response = chatCompletion.choices[0].message.content;

      // Format response (split into bullet points or lines if necessary)
      if (response.includes("\n")) {
        response = response.split("\n").map((line, index) => (
          <div key={index} className="mb-2">
            <span>{line}</span>
          </div>
        ));
      }

      return response;
    } catch (error) {
      console.error("Error fetching response:", error);
      return "I'm sorry, I couldn't get a response at the moment.";
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { user: true, text: input }]);
      setInput("");

      const botResponse = await getResponse(input);
      setMessages((prev) => [...prev, { user: false, text: botResponse }]);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        theme === "light"
          ? "bg-gray-100 text-black"
          : "bg-gray-900 text-white"
      }`}
    >
      {/* Navbar */}
      <div className="sticky top-0 z-10 flex justify-end p-4">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-full text-sm ${
            theme === "light" ? "bg-gray-200" : "bg-gray-700 text-white"
          }`}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-4 ${
                msg.user ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-sm ${
                  msg.user
                    ? theme === "light"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-700 text-white"
                    : theme === "light"
                    ? "bg-gray-200 text-black"
                    : "bg-gray-800 text-white"
                }`}
              >
                {typeof msg.text === "string" ? (
                  msg.text
                ) : (
                  <div>{msg.text}</div> // This is for rendering formatted responses (e.g., bullet points)
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="flex items-center max-w-2xl mx-auto p-4 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about watering, soil, pests, etc."
          className={`flex-grow p-3 rounded-l-full ${
            theme === "light"
              ? "border border-gray-300 bg-gray-100 text-black"
              : "border border-gray-700 bg-gray-800 text-white"
          }`}
          style={{ height: "50px" }} // Increased height for better user experience
        />
        <button
          onClick={handleSend}
          className={`px-6 py-3 rounded-r-full ml-2 ${
            theme === "light"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
