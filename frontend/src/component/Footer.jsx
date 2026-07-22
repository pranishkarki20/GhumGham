import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white rounded-2xl mt-20 px-10 py-12">
      <div className="flex justify-between items-start flex-wrap gap-12">

        {/* Logo */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold">
            GhumGham
          </h1>
        </div>
        <div className="flex flex-col gap-4 font-semibold">
          <h1 className="text-xl mb-2">Explore</h1>

          <Link to="/" className="hover:text-cyan-400 duration-300">
            Home
          </Link>

          <Link to="#" className="hover:text-cyan-400 duration-300">
            Flight
          </Link>

          <Link to="#" className="hover:text-cyan-400 duration-300">
            Stay
          </Link>
        </div>

        {/* Quote + Socials */}
        <div className="flex flex-col gap-8 max-w-sm">
          <h1 className="italic text-xl text-gray-300 leading-relaxed">
            "Plan your journey the way you like!!"
          </h1>

          <div className="flex gap-6 text-gray-300">
            <a href="#" className="hover:text-blue-500 duration-300">
              <FaFacebookF size={24} />
            </a>

            <a href="#" className="hover:text-pink-500 duration-300">
              <FaInstagram size={24} />
            </a>

            <a href="#" className="hover:text-gray-400 duration-300">
              <FaXTwitter size={24} />
            </a>

            <a href="#" className="hover:text-red-500 duration-300">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
        © 2025 GhumGham. All rights reserved.
      </div>
    </footer>
  );
}