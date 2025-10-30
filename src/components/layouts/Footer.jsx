// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">Monkeyblog</div>

          {/* Menu */}
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <a href="/about" className="hover:text-white transition">
              About
            </a>
            <a href="/contact" className="hover:text-white transition">
              Contact
            </a>
            <a href="/privacy" className="hover:text-white transition">
              Privacy
            </a>
          </div>

          {/* Social links as text */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-white transition"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-white transition"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-white transition"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Monkeyblog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
