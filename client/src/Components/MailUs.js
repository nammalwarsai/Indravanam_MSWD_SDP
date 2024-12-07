import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTheme } from "./ThemeContext"; // Using the same ThemeContext

const MailUs = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function

  // EmailJS credentials
  const SERVICE_ID = "service_7yusury";
  const TEMPLATE_ID = "template_g3bkrml";
  const USER_ID = "MuVxvwd1td-HnO_tc";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const templateParams = {
        to_name: "Admin", // Customizable recipient name
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      setStatus("Email sent successfully!");
      setShowPopup(true); // Show success popup
      setFormData({ name: "", phone: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Failed to send email.");
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup and reset form
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all ${
        theme === "light"
          ? "bg-gradient-to-r from-green-200 to-blue-100 text-black"
          : "bg-gradient-to-r from-blue-900 to-gray-800 text-white"
      } p-4`}
    >
      <div
        className={`max-w-lg w-full p-6 rounded-lg shadow-lg transition-all ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Mail Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full p-2 border rounded-md ${
                theme === "light"
                  ? "border-gray-300 bg-gray-100"
                  : "border-gray-700 bg-gray-900"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="phone">
              Your Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full p-2 border rounded-md ${
                theme === "light"
                  ? "border-gray-300 bg-gray-100"
                  : "border-gray-700 bg-gray-900"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`w-full p-2 border rounded-md ${
                theme === "light"
                  ? "border-gray-300 bg-gray-100"
                  : "border-gray-700 bg-gray-900"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              className={`w-full p-2 border rounded-md ${
                theme === "light"
                  ? "border-gray-300 bg-gray-100"
                  : "border-gray-700 bg-gray-900"
              }`}
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg ${
              theme === "light"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Send
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center ${
              status.includes("successfully") ? "text-green-500" : "text-red-500"
            }`}
          >
            {status}
          </p>
        )}

        {/* Success Popup */}
        {showPopup && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20"
            onClick={closePopup}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Success!</h3>
              <p className="mb-4">Your message has been successfully sent to the admin.</p>
              <button
                onClick={closePopup}
                className="bg-blue-600 text-white py-2 px-6 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailUs;
