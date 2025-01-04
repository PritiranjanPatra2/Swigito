import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-gray-800 text-white">
      {/* Logo and Tagline */}
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-2xl font-bold text-yellow-400">Swigito</h1>
        <p className="text-sm text-gray-400">Your cravings, our delivery!</p>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 mt-4 md:mt-0">
        <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
          About Us
        </Link>
        <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
          Contact
        </Link>
        <Link to="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
          Terms of Service
        </Link>
        <Link to="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
          Privacy Policy
        </Link>
      </div>

      {/* Copyright and Social Icons */}
      <div className="flex flex-col items-center mt-4 md:mt-0">
        <p className="text-sm text-gray-400">&copy; 2024 Swigito. All rights reserved.</p>
        <div className="flex space-x-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
