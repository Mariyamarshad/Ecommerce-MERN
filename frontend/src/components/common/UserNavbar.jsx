import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const UserNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    toast.success("You have been logged out!");
    navigate("/login");
  };

  return (
    <>
      <div>
        {/* Top banner */}
        <nav className="bg-gray-900 text-white px-6 py-1 fixed top-0 left-0 w-full z-50 text-center">
          Summer Sale For All Swim Suits And Express Delivery - OFF 50%!
        </nav>

        {/* Main navbar */}
        <div className="bg-white text-gray-900 w-full fixed top-[28px] left-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 mb-4 sm:mt-8 md:mt-10">
            {/* Brand */}
            <h4 className="font-bold text-xl text-gray-900">Exclusive</h4>

            {/* Navigation links (desktop) */}
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
                About
              </Link>
              {!token ? (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 font-medium transition"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Search + Icons (hidden on small screens) */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search input */}
              <div className="relative w-64 lg:64">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full rounded-lg pl-3 pr-10 py-2 bg-gray-100 focus:outline-none text-gray-900"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 
                          104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </button>
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5
                        -1.935 0-3.597 1.126-4.312 2.733
                        -.715-1.607-2.377-2.733-4.313-2.733
                        C5.1 3.75 3 5.765 3 8.25
                        c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835
                        l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75
                        m-12.75-3h11.218c1.121-2.3 2.1-4.684
                        2.924-7.138a60.114 60.114 0 0 0-16.536-1.84
                        M7.5 14.25 5.106 5.272
                        M6 20.25a.75.75 0 1 1-1.5 0
                        .75.75 0 0 1 1.5 0Zm12.75 0
                        a.75.75 0 1 1-1.5 0
                        .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-gray-700 hover:text-indigo-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2">
              <Link
                to="/"
                className="block text-gray-700 hover:text-indigo-600"
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="block text-gray-700 hover:text-indigo-600"
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="block text-gray-700 hover:text-indigo-600"
              >
                About
              </Link>
              {!token ? (
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              )}

              {/* Mobile Search */}
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-lg pl-3 pr-10 py-2 bg-gray-100 focus:outline-none"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 
                          104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-200 w-full" />
    </>
  );
};

export default UserNavbar;
