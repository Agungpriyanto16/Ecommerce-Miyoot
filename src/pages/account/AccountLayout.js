import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook, FaWhatsapp, FaSignOutAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const AccountLayout = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("User");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Proteksi: jika belum login, redirect ke login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Load data awal
  useEffect(() => {
    const storedName = localStorage.getItem("name") || "User";
    const storedEmail = localStorage.getItem("email") || "";
    const storedImage =
      sessionStorage.getItem("profileImage") ||
      localStorage.getItem("profileImage");

    setName(storedName);
    setEmail(storedEmail);
    if (storedImage) setProfileImage(storedImage);
  }, []);

  // Listen perubahan storage dari halaman lain (Profile)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedName = localStorage.getItem("name") || "User";
      const updatedEmail = localStorage.getItem("email") || "";
      const updatedImage =
        sessionStorage.getItem("profileImage") ||
        localStorage.getItem("profileImage");

      setName(updatedName);
      setEmail(updatedEmail);
      if (updatedImage) setProfileImage(updatedImage);
      else setProfileImage(null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-80 bg-white flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex flex-col items-center mb-10">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-teal-200 shadow-md mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-teal-200 mb-4 flex items-center justify-center">
                    <span className="text-3xl text-gray-600 font-bold">
                      {name.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}

                <h2 className="text-xl font-bold text-gray-800 capitalize">{name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {email || "Email belum terdaftar"}
                </p>
                <NavLink
                  to="profile"
                  className="text-sm text-teal-600 font-medium mt-3 hover:underline"
                >
                  Ubah Profil →
                </NavLink>
              </div>

              {/* Menu Navigasi */}
              <nav className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    AKUN SAYA
                  </p>
                  <div className="space-y-2">
                    <NavLink to="profile" className={({ isActive }) => `block py-3 px-4 rounded-lg text-gray-700 font-medium transition ${isActive ? "bg-teal-100 text-teal-800" : "hover:bg-gray-100"}`}>Profil</NavLink>
                    <NavLink to="bankcard" className={({ isActive }) => `block py-3 px-4 rounded-lg text-gray-700 font-medium transition ${isActive ? "bg-teal-100 text-teal-800" : "hover:bg-gray-100"}`}>Bank & Kartu</NavLink>
                    <NavLink to="changepassword" className={({ isActive }) => `block py-3 px-4 rounded-lg text-gray-700 font-medium transition ${isActive ? "bg-teal-100 text-teal-800" : "hover:bg-gray-100"}`}>Ubah Password</NavLink>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    PESANAN SAYA
                  </p>
                  <div className="space-y-2">
                    <NavLink to="orders" className={({ isActive }) => `block py-3 px-4 rounded-lg text-gray-700 font-medium transition ${isActive ? "bg-teal-100 text-teal-800" : "hover:bg-gray-100"}`}>Pesanan</NavLink>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    LAINNYA
                  </p>
                  <div className="space-y-2">
                    <NavLink to="voucher" className={({ isActive }) => `block py-3 px-4 rounded-lg text-gray-700 font-medium transition ${isActive ? "bg-teal-100 text-teal-800" : "hover:bg-gray-100"}`}>Voucher Saya</NavLink>
                  </div>
                </div>
              </nav>
            </div>

            <div className="p-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-4 bg-red-600 text-white py-4 rounded-full font-bold text-lg hover:bg-red-700 transition shadow-md"
              >
                <FaSignOutAlt className="rotate-180" size={22} />
                Logout
              </button>
            </div>
          </div>

          {/* Konten Utama */}
          <div className="flex-1 p-8 md:p-12">
            <Outlet />
          </div>
        </div>

         {/* Newsletter - langsung menyambung di bawah sidebar tanpa celah */}
         <div
          className="relative text-white py-16 px-10 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
           backgroundImage: "url('/Images/banner/b14.png')",
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                     backgroundColor: "#0B2A50",
                   }}
                 >
                   <div className="text-center md:text-left">
                     <h2 className="text-2xl font-bold">Sign Up For Newsletter</h2>
                     <p className="text-gray-300">
                       Get E-mail updates about our latest shop and
                       <span className="text-yellow-400 font-semibold"> special offers</span>
                     </p>
                   </div>
                   <div className="flex w-full max-w-lg">
                     <input
                       type="email"
                       placeholder="Your email address"
                       className="p-3 rounded-l-md text-black w-[250px] md:w-[400px] focus:outline-none"
                     />
                     <button className="bg-teal-600 px-5 py-3 rounded-r-md text-white font-semibold hover:bg-teal-700 transition">
                       Sign Up
                     </button>
                   </div>
                 </div>
             <footer className="bg-white py-10 px-8 md:px-20">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 
                 {/* Contact */}
                 <div>
                   <img src="/images/logo2.png" alt="Miyoot Logo" className="h-20 mb-6" /> 
                   <h3 className="font-bold">Contact</h3>
                   <p><strong>Address:</strong> Petemon Timur 38 Street, Surabaya, Indonesia</p>
                   <p><strong>Phone:</strong> +62 8155683080</p>
                   <p><strong>Hours:</strong> 07.00 - 19.00 | Mon - Sat</p>
                   
                   <h3 className="font-semibold mt-4">Follow Us</h3>
                   <div className="flex space-x-4 mt-2">
                     <a href="#" className="text-gray-500 hover:text-pink-500"><FaInstagram size={24} /></a>
                     <a href="#" className="text-gray-500 hover:text-green-500"><FaWhatsapp size={24} /></a>
                     <a href="#" className="text-gray-500 hover:text-blue-600"><FaFacebook size={24} /></a>
                   </div>
                 </div>
             
                 {/* About */}
                 <div>
                   <h3 className="font-bold mb-2">About</h3>
                   <ul className="space-y-1">
                     <li><a href="#" className="hover:underline">About Us</a></li>
                     <li><a href="#" className="hover:underline">Delivery Information</a></li>
                     <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                     <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                     <li><a href="#" className="hover:underline">Contact Us</a></li>
                   </ul>
                 </div>
             
                 {/* My Account */}
                 <div>
                   <h3 className="font-bold mb-2">My Account</h3>
                   <ul className="space-y-1">
                     <li><a href="#" className="hover:underline">Sign In</a></li>
                     <li><a href="#" className="hover:underline">View Cart</a></li>
                     <li><a href="#" className="hover:underline">My Wishlist</a></li>
                     <li><a href="#" className="hover:underline">Track My Order</a></li>
                     <li><a href="#" className="hover:underline">Help</a></li>
                   </ul>
                 </div>
                 
                   {/* Install App & Payment */}
                   <div>
                     <h3 className="font-bold mb-2">Install App</h3>
                     <p>From App Store or Google Play</p>
             
                     {/* Tombol App Store & Google Play */}
                     <div className="flex space-x-3 mt-3">
                       <div className="border-2 border-green-800 rounded-lg p-2 inline-block hover:shadow-lg transition cursor-pointer">
                         <img src="/images/pay/app.jpg" alt="App Store" className="h-12 md:h-10" />
                       </div>
                       <div className="border-2 border-green-800 rounded-lg p-2 inline-block hover:shadow-lg transition cursor-pointer">
                         <img src="/images/pay/play.jpg" alt="Google Play" className="h-12 md:h-10" />
                       </div>
                     </div>
             
                     {/* Payment */}
                     <p className="mt-5 font-semibold">Secured Payment Gateways</p>
                     <div className="flex space-x-3 mt-3">
                       <div className="rounded-lg p-2 hover:shadow-lg transition cursor-pointer">
                         <img src="/images/pay/pay.png" alt="Payment Methods" className="h-8" />
                       </div>
                     </div>
                   </div>
             
                   </div>
                   </footer>

        <Footer />
      </div>
    </div>
  );
};

export default AccountLayout;