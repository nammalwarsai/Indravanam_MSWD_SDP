import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-5">
        <div className="row">
          {/* Logo and About Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="text-2xl font-bold mb-3">Indravanam</h3>
            <p className="text-gray-400">
              Bringing you the best products and services with innovation and
              trust. Stay connected with us for exclusive offers and updates.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/Community" className="text-gray-400 hover:text-white">
                  See the Community
                </Link>
              </li>
              <li>
                <Link
                  to="/gardening-tips"
                  className="text-gray-400 hover:text-white"
                >
                  Gardening Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-12">
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="text-gray-400">
              <i className="fas fa-map-marker-alt text-lg mr-2"></i>
              KL University, Vaddeswaram, Andhra Pradesh, India
            </p>
            <p className="text-gray-400">
              <i className="fas fa-phone-alt text-lg mr-2"></i>
              +91 866-257-7722
            </p>
            <p className="text-gray-400">
              <i className="fas fa-envelope text-lg mr-2"></i>
              info@kluniversity.in
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-4">
            Follow us on social media for the latest updates!
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-xl transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-xl transition"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 border-t border-gray-700 pt-4">
        <p>© 2024 Indravanam. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
