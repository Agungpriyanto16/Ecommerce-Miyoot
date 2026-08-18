import { CartProvider } from "./context/CartContext";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";
import AccountLayout from "./pages/account/AccountLayout";
import Profile from "./pages/account/Profile";
import BankCard from "./pages/account/BankCard";
import ChangePassword from "./pages/account/ChangePassword";
import Orders from "./pages/account/Orders";
import Voucher from "./pages/account/Voucher";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/miyoot" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutPage/>} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />

              {/* Account sebagai parent */}
              <Route path="accountlayout" element={<AccountLayout />}>
                <Route path="profile" element={<Profile />} />
                <Route path="bankcard" element={<BankCard />} />
                <Route path="changepassword" element={<ChangePassword />} />
                <Route path="orders" element={<Orders />} />
                <Route path="voucher" element={<Voucher />} />
              </Route>

              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
