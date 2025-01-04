import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth.jsx";
import { CgProfile } from "react-icons/cg";
import useCart from "../hooks/useCart";

function Header() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { cart, fetchCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) fetchCart();
  }, [isAuthenticated]);

  async function handleLogout() {
    await logout();
    setIsOpen(false); 
  }

  function handleDropdown() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <header className="flex justify-center items-center h-16 bg-zinc-700 text-white">
        <p>Loading...</p>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center px-8 bg-zinc-700 text-white py-4 z-10">
      <h1 className="font-bold text-3xl  text-yellow-400">
        <Link to="/">Swigito</Link>
      </h1>

      <ul className="flex items-center gap-6">
        <li>
          <Link to="/" className="text-lg hover:text-zinc-400">
          Home
          </Link>
          </li>
        <li>
          <Link to="/contact" className="hover:text-gray-300">
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/register-seller" className="hover:text-gray-300">
            Register as a Restaurant Owner
          </Link>
        </li>
        <li>
          <Link to="/blogs" className="hover:text-gray-300">
            Blogs
          </Link>
        </li>

        {!isAuthenticated ? (
          <li>
            <Link to="/login" className="hover:text-gray-300">
              Sign In
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/add-product" className="hover:text-gray-300">
                Add Product
              </Link>
            </li>
            <li>
              <Link to="/cart" className="relative">
                Cart{" "}
                {cart?.items?.length > 0 && (
                  <span className="absolute -top-4 -right-3 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.items.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdown}
                className="hover:text-gray-300 focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <CgProfile className="text-2xl" />
              </button>

              {isOpen && (
                <ul className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-lg flex flex-col py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-blue-500"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-500 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
