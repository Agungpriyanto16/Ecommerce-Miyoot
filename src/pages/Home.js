import React, { useEffect, useState, useContext } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext"; // ✅ Import CartContext

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // ✅ Ambil fungsi addToCart
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 pt-20 pb-5 gap-6 bg-[#f3f4f6]">
        <div className="max-w-lg">
          <p className="text-gray-700 text-lg">Trade-In-Offer</p>
          <h1 className="text-5xl font-bold text-gray-800">
            Super value deals
            <span className="block text-teal-700">On all products</span>
          </h1>
          <p className="text-gray-500 mt-4 text-xl">
            Save more with coupons up to 70% off!
          </p>

          <button className="relative mt-6 w-[180px] h-[60px]">
            <img
              src="/Images/button.png"
              alt="Shop Now"
              className="w-full h-full"
            />
            <span className="absolute inset-0 flex items-center justify-center text-teal-700 font-bold text-lg">
              Shop Now
            </span>
          </button>
        </div>

        <div className="mt-5 md:mt-0">
          <img
            src="/Images/hero4.png"
            alt="Model"
            className="w-full md:w-[600px] lg:w-[500px] xl:w-[1000px] h-[500px] object-cover object-top"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="px-16 py-16 bg-white mt-[-20px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            {
              img: "/Images/features/f1.png",
              text: "Free Shipping",
              bg: "bg-red-100",
              textColor: "text-red-600",
            },
            {
              img: "/Images/features/f2.png",
              text: "Online Order",
              bg: "bg-green-100",
              textColor: "text-green-600",
            },
            {
              img: "/Images/features/f3.png",
              text: "Save Money",
              bg: "bg-blue-100",
              textColor: "text-blue-600",
            },
            {
              img: "/Images/features/f4.png",
              text: "Promotions",
              bg: "bg-indigo-100",
              textColor: "text-indigo-600",
            },
            {
              img: "/Images/features/f5.png",
              text: "Happy Sell",
              bg: "bg-purple-100",
              textColor: "text-purple-600",
            },
            {
              img: "/Images/features/f6.png",
              text: "24/7 Support",
              bg: "bg-yellow-100",
              textColor: "text-yellow-600",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="border border-gray-300 p-6 py-12 rounded-lg text-center shadow-sm"
            >
              <img
                src={service.img}
                alt={service.text}
                className="w-32 mx-auto"
              />
              <span
                className={`${service.bg} ${service.textColor} text-base font-semibold px-4 py-2 mt-4 inline-block rounded-md`}
              >
                {service.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="text-center py-16 bg-white">
        <h2 className="text-4xl font-bold text-gray-800">Featured Products</h2>
        <p className="text-gray-500 text-lg mt-2">
          Summer Collections is Here !!!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-16 mt-10">
          {products.length === 0 ? (
            <p className="col-span-4 text-gray-500">Loading products...</p>
          ) : (
            products.slice(0, 8).map((product, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-5 text-left shadow-sm hover:shadow-xl transition bg-white"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] object-cover rounded-md"
                />
                <p className="text-gray-400 text-sm mt-3">{product.brand}</p>
                <h3 className="text-lg font-semibold text-gray-700 mt-1">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex text-yellow-400 mt-1">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>

                {/* Harga & Tombol Keranjang */}
                <div className="flex justify-between items-center mt-3">
                  <p className="text-teal-700 font-bold text-lg">
                    Rp. {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Banner Promo */}
      <div className="relative w-full">
        <img
          src="/Images/banner/b2.jpg"
          alt="Promo Banner"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-white text-sm font-semibold">Repair Services</p>
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            Up to <span className="text-red-500">65% Off</span> - All T-Shirts &
            Accessories
          </h2>
          <button className="mt-3 px-5 py-2 bg-white text-gray-800 font-semibold rounded-md hover:bg-[#0F766E] hover:text-white transition">
            Explore More
          </button>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="text-center py-16 bg-white">
        <h2 className="text-3xl font-bold text-gray-800">New Arrivals</h2>
        <p className="text-gray-500 text-lg mt-2">
          Brand New Collections Available
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-16 mt-10">
          {products.slice(8, 16).map((product, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 text-left shadow-sm hover:shadow-xl transition bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[280px] object-cover rounded-md"
              />
              <p className="text-gray-400 text-sm mt-3">{product.brand}</p>
              <h3 className="text-lg font-semibold text-gray-700 mt-1">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex text-yellow-400 mt-1">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>

              {/* Harga & Tombol Keranjang */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-teal-700 font-bold text-lg">
                  Rp. {product.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Banners */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-16 py-10 bg-white">
        <div className="relative w-full md:w-1/2">
          <img
            src="/Images/banner/b17.jpg"
            alt="Promo 1"
            className="w-full h-[300px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-10 text-white">
            <p className="text-lg font-semibold">Crazy Deals</p>
            <h3 className="text-3xl font-bold">Buy 2 get 1 free</h3>
            <p className="text-sm">
              Classic dresses & T-Shirts are on sale at Miyoot
            </p>
            <button className="mt-4 px-4 py-2 bg-white-100 border-2 border-white text-white font-semibold rounded-md hover:bg-[#0F766E] hover:border-[#0F766E] hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <img
            src="/Images/banner/b10.jpg"
            alt="Promo 2"
            className="w-full h-[300px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-10 text-white">
            <p className="text-lg font-semibold">Spring / Summer</p>
            <h3 className="text-3xl font-bold">Upcoming Season</h3>
            <p className="text-sm">
              Classic dresses & T-Shirts are on sale at Miyoot
            </p>
            <button className="mt-4 px-4 py-2 bg-white-100 border-2 border-white text-white font-semibold rounded-md hover:bg-[#0F766E] hover:border-[#0F766E] hover:text-white transition">
              Collection
            </button>
          </div>
        </div>
      </div>

      {/* Seasonal Sale Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-16 py-10 bg-white">
        {[
          { img: "/Images/banner/b7.jpg" },
          { img: "/Images/banner/b4.jpg" },
          { img: "/Images/banner/b18.jpg" },
        ].map((sale, index) => (
          <div key={index} className="relative w-full md:w-1/3">
            <img
              src={sale.img}
              alt="Winter Sale"
              className="w-full h-[250px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">
              <p className="text-red-600 font-bold text-lg">SEASONAL SALE</p>
              <h3 className="text-xl font-bold text-black">
                Winter Collection -35% OFF
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Signup Section */}
      <div
        className="relative text-white py-14 px-10 flex flex-col md:flex-row items-center justify-between gap-4"
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
export default Home;
