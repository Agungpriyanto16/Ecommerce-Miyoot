import React from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />

      {/* Banner Section */}
      <div
        className="relative w-full h-[300px] flex flex-col items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/Images/about/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">#KnowsUs</h1>
        <p className="mt-3 text-lg md:text-xl drop-shadow-md max-w-2xl">
          Get to Know Us – Discover our journey, vision, and the passion behind every piece we create.
        </p>
      </div>

      {/* Who Are We Section */}
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="flex-1 flex justify-center md:justify-start">
          <img
            src="/Images/about/a6.jpg"
            alt="About Us"
            className="w-[420px] md:w-[500px] lg:w-[550px] object-contain"
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Are We?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to Miyoot, your go-to destination for stylish and high-quality clothing in Surabaya,
            Indonesia. Inspired by the vibrant culture and modern trends, we offer a curated collection
            of fashion essentials designed for comfort, elegance, and versatility. Whether you're looking
            for timeless classics or the latest styles, our pieces are crafted with premium fabrics to
            suit every occasion. Shop with confidence and experience a seamless online shopping journey
            with fast delivery across Indonesia. Join us in redefining fashion—where style meets
            authenticity!
          </p>
          <p className="text-gray-600 italic underline mb-6">
            Authentic Style, Timeless Confidence.
          </p>

          {/* Running Text */}
          <div className="mt-4 overflow-hidden bg-teal-700 text-white rounded-md">
            <p className="whitespace-nowrap animate-marquee px-4 py-2 font-medium">
            We value quality, authenticity, and self-expression,creating
          timeless fashion with premium materials.
            </p>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Try Out Our <span className="text-purple-700">App</span>
        </h2>
        <div className="flex justify-center">
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg max-w-[900px] w-full flex justify-center items-center min-h-[600px]"> 
            {/* min-h-[600px] bikin background hitam lebih panjang */}
            <div className="w-[460px] md:w-[520px] lg:w-[560px] rounded-3xl overflow-hidden shadow-xl">
              <video
                src="/Images/about/1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              ></video>
            </div>
          </div>
        </div>
      </div>

{/* Services Section */}
<div className="px-16 py-16 bg-white mt-[-20px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { img: "/Images/features/f1.png", text: "Free Shipping", bg: "bg-red-100", textColor: "text-red-600" },
            { img: "/Images/features/f2.png", text: "Online Order", bg: "bg-green-100", textColor: "text-green-600" },
            { img: "/Images/features/f3.png", text: "Save Money", bg: "bg-blue-100", textColor: "text-blue-600" },
            { img: "/Images/features/f4.png", text: "Promotions", bg: "bg-indigo-100", textColor: "text-indigo-600" },
            { img: "/Images/features/f5.png", text: "Happy Sell", bg: "bg-purple-100", textColor: "text-purple-600" },
            { img: "/Images/features/f6.png", text: "24/7 Support", bg: "bg-yellow-100", textColor: "text-yellow-600" },
          ].map((service, index) => (
            <div key={index} className="border border-gray-300 p-6 py-12 rounded-lg text-center shadow-sm">
              <img src={service.img} alt={service.text} className="w-32 mx-auto" />
              <span className={`${service.bg} ${service.textColor} text-base font-semibold px-4 py-2 mt-4 inline-block rounded-md`}>
                {service.text}
              </span>
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default About;
