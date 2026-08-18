// src/context/CartContext.js

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load keranjang dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const storedCart = localStorage.getItem("miyootCart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Gagal membaca keranjang dari localStorage:", error);
        setCartItems([]);
      }
    }
  }, []);

  // Simpan ke localStorage setiap kali cartItems berubah
  useEffect(() => {
    localStorage.setItem("miyootCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Tambah produk ke keranjang
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Jika sudah ada, tambah quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Jika belum ada, tambah baru dengan quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Hapus produk dari keranjang
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update jumlah produk
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return; // Minimal 1
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Kosongkan keranjang (dipanggil setelah checkout sukses)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("miyootCart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};