import React from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";

const Contact = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">#let's_talk</h1>
        <p className="mt-3 text-lg md:text-xl drop-shadow-md max-w-2xl">
          LEAVE A MESSAGE. We love to hear from you!!
        </p>
      </div>

      {/* Contact Info + Map Section */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase">Get in Touch!</h3>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Visit our offline store or contact us today
          </h2>

          <h4 className="font-semibold mb-4">Miyoot Offline Store</h4>

          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-teal-600" />
              Petemon Timur Street, Surabaya, Indonesia
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-teal-600" />
              miyoootcs@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-teal-600" />
              +62 81515683080
            </li>
            <li className="flex items-center gap-3">
              <FaClock className="text-teal-600" />
              Monday to Saturday: 07.00 AM to 07.00 PM
            </li>
          </ul>
        </div>

        {/* Google Map */}
        <div className="w-full h-[350px] md:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.248349081809!2d112.72002357404558!3d-7.968327792071259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f95b6b5bb8c5%3A0x1d9f35c8f3f16c7b!2sPetemon%20Timur%2C%20Sawahan%2C%20Surabaya!5e0!3m2!1sid!2sid!4v1695134923185!5m2!1sid!2sid"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg shadow-md"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Leave a Message Section */}
      <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 bg-white shadow-md p-8 rounded-md">
        {/* Form */}
        <div className="md:col-span-2">
      <p className="text-sm uppercase text-gray-500 font-medium">Leave a Message</p>
      <h2 className="text-2xl font-bold mt-2 mb-6">We love to hear from you</h2>

      <form action="#" method="POST" className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-800"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <textarea
          rows="6"
          placeholder="Your Message"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
        ></textarea>
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md shadow-md"
        >
          Submit
        </button>
      </form>
    </div>

    {/* Contact Person (di kanan) */}
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src="https://i.pravatar.cc/80?img=1"
          className="w-14 h-14 rounded-full"
          alt="John Doe"
        />
        <div>
          <h4 className="font-semibold text-gray-800">John Doe</h4>
          <p className="text-gray-500 text-sm">Senior Marketing Manager</p>
          <p className="text-gray-500 text-sm">Phone: +62 815530990</p>
          <p className="text-gray-500 text-sm">Email: johndoe@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <img
          src="https://i.pravatar.cc/80?img=2"
          className="w-14 h-14 rounded-full"
          alt="Smith Rowe"
        />
        <div>
          <h4 className="font-semibold text-gray-800">Smith Rowe</h4>
          <p className="text-gray-500 text-sm">Senior Marketing Manager</p>
          <p className="text-gray-500 text-sm">Phone: +62 815530990</p>
          <p className="text-gray-500 text-sm">Email: smithrowe@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <img
          src="https://i.pravatar.cc/80?img=3"
          className="w-14 h-14 rounded-full"
          alt="Sophia Willson"
        />
        <div>
          <h4 className="font-semibold text-gray-800">Sophia Willson</h4>
          <p className="text-gray-500 text-sm">Senior Marketing Manager</p>
          <p className="text-gray-500 text-sm">Phone: +62 815530990</p>
          <p className="text-gray-500 text-sm">Email: swillson@gmail.com</p>
        </div>
      </div>
    </div>
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

export default Contact;
