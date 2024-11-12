"use client";

import { FaInstagram, FaTwitter, FaFacebook, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-pink-100 to-pink-300 text-gray-800 py-6 px-4 sm:px-6">
      {/* Footer Content */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Social Media Icons */}
        <div className="flex gap-4 mb-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 text-2xl hover:text-pink-700"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 text-2xl hover:text-pink-700"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 text-2xl hover:text-pink-700"
          >
            <FaFacebook />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} HerVibe. All rights reserved.</p>
          <p className="flex items-center justify-center mt-1">
            Made with <FaHeart className="mx-1 text-pink-500" /> to brighten
            your day.
          </p>
        </div>
      </div>
    </footer>
  );
}
