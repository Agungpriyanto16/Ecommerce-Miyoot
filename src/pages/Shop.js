// src/pages/Shop.jsx

import React, { useEffect, useState, useContext } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000); // Notifikasi hilang setelah 2 detik
  };

  return (
    <div className="relative">
      <Navbar />

      {/* ✅ Notifikasi Popup */}
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center flex flex-col items-center">
            <div className="bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <span className="text-4xl">✓</span>
            </div>
            <p className="text-gray-700 font-medium text-lg">
              Produk telah ditambahkan ke keranjang belanja
            </p>
          </div>
        </div>
      )}

      {/* Banner */}
      <div
        className="relative w-full h-[300px] flex flex-col items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/Images/banner/b1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          #VacationVibes
        </h1>
        <p className="mt-3 text-lg md:text-xl drop-shadow-md">
          See our newest Summer Collection
        </p>
      </div>

      {/* Produk dari API */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-16 mt-16">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[280px] object-cover rounded-lg"
              />
              <p className="text-left text-gray-500 mt-3">{product.brand}</p>
              <h3 className="text-left text-lg font-semibold text-gray-700">
                {product.name}
              </h3>

              <div className="flex justify-left text-yellow-500">
                {"★".repeat(product.rating || 5)}
              </div>

              <div className="flex items-center justify-between mt-2">
                <p className="text-teal-600 font-bold text-lg">
                  Rp {(product.price || 0).toLocaleString("id-ID")}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="ml-3 p-2 rounded-full bg-gray-200 text-green-600 hover:bg-[#0F766E] hover:text-white transition"
                >
                  🛒
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500 py-12 text-xl">
            Loading products...
          </p>
        )}
      </div>

      {/* Newsletter */}
      <div
        className="relative text-white py-14 px-10 flex flex-col md:flex-row items-center justify-between gap-4 mt-16"
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

      {/* Footer */}
      <footer className="bg-white py-10 px-8 md:px-20 border-t">
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
              <li><a href="/cart" className="hover:underline">View Cart</a></li>
              <li><a href="#" className="hover:underline">My Wishlist</a></li>
              <li><a href="/accountlayout/orders" className="hover:underline">Track My Order</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>

          {/* Install App & Payment */}
          <div>
            <h3 className="font-bold mb-2">Install App</h3>
            <p>From App Store or Google Play</p>

            <div className="flex space-x-3 mt-3">
              <div className="border-2 border-green-800 rounded-lg p-2 hover:shadow-lg transition cursor-pointer">
                <img src="/images/pay/app.jpg" alt="App Store" className="h-12 md:h-10" />
              </div>
              <div className="border-2 border-green-800 rounded-lg p-2 hover:shadow-lg transition cursor-pointer">
                <img src="/images/pay/play.jpg" alt="Google Play" className="h-12 md:h-10" />
              </div>
            </div>

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
  );
};

export default Shop;