// src/pages/Cart.jsx

import React, { useContext } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaTimes } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          #YourCartYourStyle
        </h1>
        <p className="mt-3 text-lg md:text-xl drop-shadow-md max-w-2xl">
          Ready to check out? Your perfect look is just a click away!
        </p>
      </div>

      {/* Cart Table */}
      <div className="container mx-auto px-6 py-12">
        <div className="overflow-x-auto">
          {cartItems.length > 0 ? (
            <table className="w-full border-collapse border-t border-gray-200 text-left">
              <thead>
                <tr className="border-b border-gray-200 text-sm uppercase tracking-wide text-gray-500">
                  <th className="py-3">Remove</th>
                  <th className="py-3">Image</th>
                  <th className="py-3">Product</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-4">
                      <button
                        className="text-black hover:text-red-500 transition"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FaTimes />
                      </button>
                    </td>
                    <td className="py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="py-4 font-medium">{item.name}</td>
                    <td className="py-4">
                      Rp. {item.price.toLocaleString("id-ID")}
                    </td>
                    <td className="py-4">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-16 border rounded px-2 py-1 text-center focus:outline-none focus:border-teal-700"
                      />
                    </td>
                    <td className="py-4 font-medium">
                      Rp. {(item.price * item.quantity).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-2xl text-gray-600 mb-4">
                Keranjang belanja Anda kosong 🛒
              </p>
              <Link
                to="/shop"
                className="inline-block bg-teal-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-teal-800 transition shadow-lg"
              >
                Mulai Belanja
              </Link>
            </div>
          )}
        </div>

        {/* Apply Coupon & Cart Total */}
        {cartItems.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between mt-10 gap-8">
            {/* Apply Coupon */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-3">Apply Coupon</h2>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter Your Coupon"
                  className="border rounded-l px-4 py-2 flex-1 focus:outline-none focus:border-teal-700"
                />
                <button className="bg-teal-700 text-white px-6 py-2 rounded-r hover:bg-teal-800 transition">
                  Apply
                </button>
              </div>
            </div>

            {/* Cart Total */}
            <div className="flex-1 md:max-w-md border rounded-lg p-6 shadow-sm bg-white">
              <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">Subtotal</td>
                    <td className="py-3 text-right">
                      Rp. {subtotal.toLocaleString("id-ID")}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Pengiriman</td>
                    <td className="py-3 text-right">Dihitung di Checkout</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-lg">Total</td>
                    <td className="py-3 font-bold text-right text-lg text-teal-700">
                      Rp. {subtotal.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tbody>
              </table>

              <Link to="/checkout">
                <button className="mt-6 w-full bg-teal-700 text-white py-4 rounded-lg font-bold hover:bg-teal-800 transition shadow-lg">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white py-10 px-8 md:px-20 border-t">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

export default Cart;