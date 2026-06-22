import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navbar = [
    { name: "Home", link: "/" },
    { name: "Flight", link: "/flight" },
    { name: "Stay", link: "/stay" },
  ];

  const token = localStorage.getItem("token");

  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-bold">GhumGham</h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 font-semibold text-lg">
          {navbar.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className="hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <Link to="/profile">
              <button className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-300">
                Profile
              </button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="px-5 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-300">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-6 flex flex-col gap-5 items-center">
          {navbar.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-lg font-semibold hover:text-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {token ? (
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
            >
              <button className="w-40 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-300">
                Profile
              </button>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                <button className="w-40 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-all duration-300">
                  Login
                </button>
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
              >
                <button className="w-40 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-300">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}