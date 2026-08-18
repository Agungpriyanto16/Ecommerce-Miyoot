import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State untuk role, name, dan profileImage
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null); // <-- tambahan

  // Update semua data saat mount atau route berubah
  useEffect(() => {
    const updateUserData = () => {
      const currentRole = localStorage.getItem("role") || "";
      const currentName = localStorage.getItem("name") || "";
      const storedImage =
        sessionStorage.getItem("profileImage") ||
        localStorage.getItem("profileImage");

      setRole(currentRole);
      setName(currentName);
      setProfileImage(storedImage || null);
    };

    updateUserData();

    // Dengarkan event storage agar foto langsung update saat diganti di tab/halaman lain
    window.addEventListener("storage", updateUserData);

    return () => {
      window.removeEventListener("storage", updateUserData);
    };
  }, [location]); // re-run saat route berubah (misal setelah login/logout)

  // Fungsi logout
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear(); // hapus gambar profil juga
    setRole("");
    setName("");
    setProfileImage(null);
    navigate("/");
  };

  // Fungsi untuk menentukan apakah link aktif
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Tentukan tujuan link berdasarkan role
  const getLinkTo = (userPath) => {
    return role === "admin" ? "/admin-dashboard" : userPath;
  };

  return (
    <div className="bg-gray-200">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-200 shadow-md">
        {/* Logo */}
        <Link to={getLinkTo("/miyoot")}>
          <img src="/Images/logo1.png" alt="Logo" className="h-16" />
        </Link>

        <ul className="flex space-x-8 text-gray-600 items-center">
          {/* Home */}
          <li>
            <Link
              to={getLinkTo("/miyoot")}
              className={`text-black hover:text-[#0F766E] cursor-pointer pb-1 transition-all ${
                isActive("/miyoot") || (role === "admin" && location.pathname === "/admin-dashboard")
                  ? "border-b-4 border-[#0F766E] text-[#0F766E]"
                  : ""
              }`}
            >
              Home
            </Link>
          </li>

          {/* Shop */}
          <li>
            <Link
              to={getLinkTo("/shop")}
              className={`text-black hover:text-[#0F766E] cursor-pointer pb-1 transition-all ${
                isActive("/shop") ? "border-b-4 border-[#0F766E] text-[#0F766E]" : ""
              }`}
            >
              Shop
            </Link>
          </li>

          {/* Blog */}
          <li>
            <Link
              to={getLinkTo("/blog")}
              className={`text-black hover:text-[#0F766E] cursor-pointer pb-1 transition-all ${
                isActive("/blog") ? "border-b-4 border-[#0F766E] text-[#0F766E]" : ""
              }`}
            >
              Blog
            </Link>
          </li>

          {/* About */}
          <li>
            <Link
              to={getLinkTo("/about")}
              className={`text-black hover:text-[#0F766E] cursor-pointer pb-1 transition-all ${
                isActive("/about") ? "border-b-4 border-[#0F766E] text-[#0F766E]" : ""
              }`}
            >
              About
            </Link>
          </li>

          {/* Contact */}
          <li>
            <Link
              to={getLinkTo("/contact")}
              className={`text-black hover:text-[#0F766E] cursor-pointer pb-1 transition-all ${
                isActive("/contact") ? "border-b-4 border-[#0F766E] text-[#0F766E]" : ""
              }`}
            >
              Contact
            </Link>
          </li>

          {/* Cart Icon */}
          <li>
            <Link
              to="/cart"
              className={`text-black hover:text-[#0F766E] cursor-pointer flex items-center gap-1 pb-1 transition-all ${
                isActive("/cart") ? "text-[#0F766E]" : ""
              }`}
            >
              <FaShoppingBag className="text-xl" />
            </Link>
          </li>

          {/* Account + Foto Profil + Name */}
          <li className="flex items-center gap-3">
            <Link
              to={role === "admin" ? "/admin-dashboard" : "/accountlayout"}
              className={`text-black hover:text-[#0F766E] cursor-pointer pb-1 transition-all flex items-center gap-3 ${
                location.pathname.startsWith("/accountlayout") ||
                location.pathname.startsWith("/account") ||
                (role === "admin" && location.pathname === "/admin-dashboard")
                  ? "text-[#0F766E]"
                  : ""
              }`}
            >
              {/* Foto Profil atau fallback */}
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-md"
                />
              ) : (
                // Fallback: lingkaran dengan inisial atau ikon user
                <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {name ? name.charAt(0).toUpperCase() : <FaUser size={20} />}
                </div>
              )}

              <span className="font-medium">
                {role
                  ? name || (role === "admin" ? "Admin" : "User")
                  : "Login"}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;