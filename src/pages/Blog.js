// src/pages/Blog.jsx

import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: "01/05",
      img: "/Images/blog/b1.jpg",
      title: "Cotton-Jersey Zip-Up Hoodie",
      shortDesc: "The Cotton-Jersey Zip-Up Hoodie combines comfort and versatility, crafted from soft, breathable cotton-jersey fabric for a relaxed yet stylish fit. Designed ...",
      fullDesc: "The Cotton-Jersey Zip-Up Hoodie is the perfect blend of comfort and style. Made from premium cotton-jersey fabric, it offers exceptional softness and breathability, making it ideal for everyday wear. Whether you're lounging at home or heading out for a casual day, this hoodie provides a relaxed fit with a modern touch. Featuring a smooth zipper, ribbed cuffs, and a drawstring hood, it's designed for both functionality and fashion. Available in a range of colors, it's a wardrobe essential that pairs effortlessly with jeans, joggers, or leggings.",
    },
    {
      id: "02/05",
      img: "/Images/blog/b2.jpg",
      title: "Original Blouse Collection",
      shortDesc: "Discover the elegance of our Original Blouses—designed for effortless style, versatility, and timeless appeal. Read our latest blog to explore the inspiration behind the designs and how to style them for any occasion!",
      fullDesc: "Our Original Blouse Collection is crafted with love and attention to detail. Each piece is designed to bring elegance and comfort to your daily wardrobe. From flowy chiffon to structured cotton, these blouses feature unique cuts, delicate embroidery, and beautiful color palettes inspired by nature and modern trends. Perfect for office wear, casual outings, or special events — pair them with skirts, trousers, or jeans for endless styling possibilities. Discover how these timeless pieces can elevate your look effortlessly.",
    },
    {
      id: "03/05",
      img: "/Images/blog/b3.jpg",
      title: "Our Offline Store Just Opened in Surabaya!",
      shortDesc: "Visit us now to explore our latest collections in person, experience premium quality firsthand, and enjoy exclusive in-store deals. Located in the heart of Surabaya, our new store offers a stylish and welcoming space for all your fashion needs!",
      fullDesc: "We're thrilled to announce the grand opening of our first offline store in Surabaya! Now you can touch, feel, and try on your favorite Miyoot pieces in real life. Enjoy exclusive in-store promotions, personal styling assistance from our friendly team, and a beautiful shopping atmosphere designed for comfort and inspiration. Whether you're looking for everyday essentials or statement pieces, our Surabaya store has it all. Come visit us at Petemon Timur 38 and be part of the Miyoot experience!",
    },
    {
      id: "04/05",
      img: "/Images/blog/b4.jpg",
      title: "Cardigan Looks & Inspiration",
      shortDesc: "Our Cardigan Collection is inspired by effortless elegance and everyday comfort, perfect for layering in any season. From classic button-ups to modern oversized designs, each piece is crafted with soft, high-quality fabrics for a timeless and versatile look.",
      fullDesc: "Cardigans are the ultimate layering piece — and our latest collection takes them to the next level. From lightweight knits perfect for summer evenings to cozy chunky styles for cooler days, we've designed cardigans that are as beautiful as they are functional. Explore different ways to style them: over dresses for a feminine look, with jeans for casual weekends, or layered with scarves for extra warmth. Each cardigan is made with premium yarn for lasting softness and shape retention. Find your perfect cardigan match today!",
    },
    {
      id: "05/05",
      img: "/Images/blog/b6.jpg",
      title: "Food Inspired Designs",
      shortDesc: "From the vibrant hues of fresh produce to the intricate textures of baked goods, food has long been a source of inspiration in fashion design. Discover how flavors, colors, and culinary artistry influence fabric choices, patterns, and silhouettes in our latest blog!",
      fullDesc: "Fashion and food have more in common than you think! This season, our design team drew inspiration from the rich colors of spices, the delicate layers of pastries, and the fresh vibrancy of fruits and vegetables. The result? A collection filled with warm terracotta tones, soft cream textures, berry-inspired prints, and flowing silhouettes that remind us of natural abundance. We believe beauty is all around us — even on our plates — and we're excited to bring that joyful energy into your wardrobe. Taste the inspiration!",
    },
  ];

  const openModal = (post) => setSelectedPost(post);
  const closeModal = () => setSelectedPost(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Blog Banner */}
      <div
        className="relative w-full h-[300px] flex flex-col items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/Images/banner/b19.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">#MoreToRead</h1>
        <p className="mt-3 text-lg md:text-xl drop-shadow-md">
          Read all about our newest products!
        </p>
      </div>

      {/* Blog Posts */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="relative cursor-pointer" onClick={() => openModal(post)}>
              <img
                src={post.img}
                alt={post.title}
                className="rounded-lg shadow-md hover:shadow-xl transition-shadow"
              />
              <span className="absolute top-4 left-4 text-6xl font-bold text-gray-300 opacity-60">
                {post.id}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-5">{post.shortDesc}</p>
              <button
                onClick={() => openModal(post)}
                className="font-semibold text-black hover:text-teal-600 transition flex items-center gap-2 group"
              >
                CONTINUE READING
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

{/* Newsletter Signup Section */}
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

      {/* MODAL - Harus di akhir return, setelah semua konten */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedPost.img}
                alt={selectedPost.title}
                className="w-full h-96 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition text-2xl"
              >
                ×
              </button>
              <span className="absolute top-8 left-8 text-8xl font-bold text-white opacity-30">
                {selectedPost.id}
              </span>
            </div>

            <div className="p-10">
              <h1 className="text-4xl font-bold text-teal-800 mb-6">{selectedPost.title}</h1>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedPost.fullDesc}
              </p>
              <div className="mt-10 text-center">
                <button
                  onClick={closeModal}
                  className="bg-teal-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-teal-800 transition shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;