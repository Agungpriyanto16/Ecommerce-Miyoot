// src/components/AdminNavbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const AdminNavbar = () => {
  const [name, setName] = useState("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem("name") || "Admin";
    setName(savedName);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Yakin ingin keluar dari panel Admin?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 shadow-md">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo & Title */}
        <Link to="/admin-dashboard" className="flex items-center gap-5">
          <img src="/Images/logo1.png" alt="Miyoot" className="h-16 rounded-lg shadow-md" />
          <div className="text-black">
            <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-teal-10 text-sm">Miyoot Fashion Management</p>
          </div>
        </Link>

        {/* User Info & Logout */}
        <div className="flex items-center gap-6">
          <div className="text-right text-black">
            <p className="text-sm opacity-80">Selamat datang,</p>
            <div className="flex items-center gap-3">
              <FaUserCircle size={32} />
              <p className="font-semibold text-xl">{name}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/30"
          >
            <FaSignOutAlt size={20} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;