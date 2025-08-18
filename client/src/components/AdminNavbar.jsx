import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AdminNavbar = () => {
  const { isAdmin, admin } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50"
          : "bg-white border-b border-gray-200"
      } px-8 py-4 flex justify-between items-center rounded-b-lg`}
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative">
          <img
            className="h-12 w-12 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            src="/Emblem_of_IMC_Indore.jpg"
            alt="IMC Logo"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-sm text-blue-900 tracking-wide transition-all duration-300 group-hover:text-blue-700">
            Admin Dashboard
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <ul className="flex gap-6 m-0 list-none items-center">
        <li>
          <Link
            to="/admin"
            className="no-underline text-gray-700 font-bold px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-800"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/complaints"
            className="no-underline text-gray-700 font-bold px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-800"
          >
            Complaints
          </Link>
        </li>
        <li>
          <Link
            to="/admin/departments"
            className="no-underline text-gray-700 font-bold px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-800"
          >
            Departments
          </Link>
        </li>
        {isAdmin ? (
          <li>
            <Link
              to="/admin/profile"
              className="no-underline text-gray-700 font-bold px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-800"
            >
              Profile
            </Link>
          </li>
        ) : (
          <li>
            <Link
              to="/admin/login"
              className="no-underline text-gray-700 font-bold px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-100 hover:text-blue-800"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
