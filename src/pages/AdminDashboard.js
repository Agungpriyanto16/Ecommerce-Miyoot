// src/pages/AdminDashboard.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { 
  FaBoxOpen, 
  FaUsers, 
  FaShoppingCart, 
  FaPlus, 
  FaTrash, 
  FaChartBar, 
  FaSearch, 
  FaCalendarAlt, 
  FaPrint, 
  FaTruck,
  FaEdit,
  FaUserTimes
} from "react-icons/fa";

// Import Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [resiInput, setResiInput] = useState({});

  const [searchId, setSearchId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [currentPageOrders, setCurrentPageOrders] = useState(1);
  const ORDERS_PER_PAGE = 5;

  const [searchUser, setSearchUser] = useState("");
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const USERS_PER_PAGE = 10;

  const [stats, setStats] = useState({
    totalSalesThisMonth: 0,
    newOrdersToday: 0,
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    rating: 5,
    weight: 500,
  });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
      return;
    }

    fetchProducts();
    fetchOrders();
    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    setCurrentPageOrders(1);
  }, [searchId, filterStatus, filterDate]);

  useEffect(() => {
    setCurrentPageUsers(1);
  }, [searchUser]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5001/orders");
      const data = res.data;

      const sortedOrders = data.sort((a, b) => new Date(b.date) - new Date(a.date));

      setOrders(sortedOrders);

      const now = new Date();
      const thisMonth = now.getMonth();

      const totalSalesThisMonth = sortedOrders
        .filter(order => new Date(order.date).getMonth() === thisMonth && order.status === "Selesai")
        .reduce((acc, order) => acc + (order.total || 0), 0);

      const newOrdersToday = sortedOrders.filter(order => 
        new Date(order.date).toDateString() === now.toDateString()
      ).length;

      setStats({ totalSalesThisMonth, newOrdersToday });
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const getUserOrderCount = (userId) => {
    return orders.filter(order => order.userId === userId).length;
  };

  const handleToggleRole = async (userId, currentRole) => {
    if (!window.confirm(`Ubah role menjadi ${currentRole === "admin" ? "user" : "admin"}?`)) return;

    try {
      const newRole = currentRole === "admin" ? "user" : "admin";
      await axios.patch(`http://localhost:5001/users/${userId}`, { role: newRole });
      fetchUsers();
      alert("✅ Role berhasil diubah!");
    } catch (err) {
      alert("❌ Gagal mengubah role.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Hapus pengguna ini secara permanen? (Termasuk data terkait)")) return;

    try {
      await axios.delete(`http://localhost:5001/users/${userId}`);
      fetchUsers();
      alert("🗑️ Pengguna dihapus!");
    } catch (err) {
      alert("❌ Gagal menghapus pengguna.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/products", {
        ...newProduct,
        price: Number(newProduct.price),
        rating: Number(newProduct.rating),
        weight: Number(newProduct.weight),
      });
      fetchProducts();
      setNewProduct({ name: "", price: "", image: "", brand: "", rating: 5, weight: 500 });
      alert("✅ Produk berhasil ditambahkan!");
    } catch (err) {
      alert("❌ Gagal menambah produk.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Hapus produk ini secara permanen?")) {
      try {
        await axios.delete(`http://localhost:5001/api/products/${id}`);
        fetchProducts();
        alert("🗑️ Produk dihapus!");
      } catch (err) {
        alert("❌ Gagal menghapus.");
      }
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5001/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      alert("❌ Gagal update status.");
    }
  };

  const handleSaveResi = async (id) => {
    const resi = resiInput[id]?.trim();
    if (!resi) {
      alert("Masukkan nomor resi terlebih dahulu!");
      return;
    }

    try {
      await axios.patch(`http://localhost:5001/orders/${id}`, { resi });
      fetchOrders();
      alert("✅ Nomor resi berhasil disimpan!");
      setResiInput(prev => ({ ...prev, [id]: "" }));
    } catch (err) {
      alert("❌ Gagal menyimpan resi.");
    }
  };

  const handlePrintInvoice = (order) => {
    const invoiceContent = `
======================================
          INVOICE MIYOOT
======================================
No. Pesanan   : ${order.id}
Tanggal       : ${new Date(order.date).toLocaleString("id-ID")}
Status        : ${order.status}
Total         : Rp ${order.total.toLocaleString("id-ID")}
Pembayaran    : ${order.paymentMethod}
Ekspedisi     : ${order.shippingMethod}
Resi          : ${order.resi || "Belum ada"}

Alamat Pengiriman:
${order.shippingAddress?.fullName || "-"}
${order.shippingAddress?.phone || "-"}
${order.shippingAddress?.address || "-"}
${order.shippingAddress?.city || "-"}, ${order.shippingAddress?.province || "-"} ${order.shippingAddress?.postalCode || "-"}

Produk:
${(order.items || []).map(item => `• ${item.name} x${item.quantity} - Rp ${item.price.toLocaleString("id-ID")}`).join("\n")}

======================================
Terima kasih telah berbelanja di Miyoot!
======================================
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head><title>Invoice - ${order.id}</title></head>
        <body>
          <pre style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6; padding: 30px;">
${invoiceContent}
          </pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const filteredOrders = orders
    .filter((order) => {
      if (!order.date) return false;

      const orderDate = new Date(order.date);
      const year = orderDate.getFullYear();
      const month = String(orderDate.getMonth() + 1).padStart(2, "0");
      const day = String(orderDate.getDate()).padStart(2, "0");
      const orderDateStr = `${year}-${month}-${day}`;

      return (
        (searchId ? order.id.toLowerCase().includes(searchId.toLowerCase()) : true) &&
        (filterStatus ? order.status === filterStatus : true) &&
        (filterDate ? orderDateStr === filterDate : true)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredUsers = users.filter(user => 
    (user.name?.toLowerCase().includes(searchUser.toLowerCase()) || 
     user.email?.toLowerCase().includes(searchUser.toLowerCase()))
  );

  const totalPagesUsers = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPageUsers - 1) * USERS_PER_PAGE,
    currentPageUsers * USERS_PER_PAGE
  );

  const totalFilteredOrders = filteredOrders.length;
  const totalPagesOrders = Math.ceil(totalFilteredOrders / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPageOrders - 1) * ORDERS_PER_PAGE,
    currentPageOrders * ORDERS_PER_PAGE
  );

  const goToPageOrders = (page) => {
    if (page >= 1 && page <= totalPagesOrders) {
      setCurrentPageOrders(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPageUsers = (page) => {
    if (page >= 1 && page <= totalPagesUsers) {
      setCurrentPageUsers(page);
    }
  };

  const formatAddressLine = (addr) => {
    if (!addr) return "-";
    const parts = [
      addr.address?.trim(),
      addr.district?.trim(),
      addr.city?.trim(),
      addr.province?.trim(),
      addr.postalCode?.trim() ? `ID ${addr.postalCode.trim()}` : null,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const tabs = [
    { key: "products", label: "Produk", icon: <FaBoxOpen size={28} /> },
    { key: "orders", label: "Pesanan", icon: <FaShoppingCart size={28} /> },
    { key: "users", label: "Pengguna", icon: <FaUsers size={28} /> },
    { key: "stats", label: "Statistik", icon: <FaChartBar size={28} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div
        className="relative w-full h-[300px] flex flex-col items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/Images/about/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-2xl">#AdminPanel</h1>
          <p className="mt-4 text-xl md:text-2xl drop-shadow-lg">
            Kelola Miyoot dengan mudah dan profesional
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 -mt-10 relative z-20">
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-col items-center gap-4 px-12 py-8 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl ${
                activeTab === tab.key
                  ? "bg-teal-700 text-white scale-105"
                  : "bg-white text-gray-800 hover:bg-gray-50 hover:shadow-2xl"
              }`}
            >
              <div className={activeTab === tab.key ? "text-white" : "text-teal-700"}>
                {tab.icon}
              </div>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Tab Produk */}
          {activeTab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800">Kelola Produk</h2>
                <span className="text-lg text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  Total: {products.length} produk
                </span>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-gray-50 p-10 rounded-2xl mb-12 border border-teal-100">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 text-teal-800">
                  <FaPlus size={28} /> Tambah Produk Baru
                </h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <input
                    type="text"
                    placeholder="Nama Produk"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                    className="border border-gray-300 rounded-xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  />
                  <input
                    type="number"
                    placeholder="Harga (contoh: 350000)"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                    className="border border-gray-300 rounded-xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  />
                  <input
                    type="text"
                    placeholder="URL Gambar"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    required
                    className="border border-gray-300 rounded-xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  />
                  <input
                    type="text"
                    placeholder="Brand (opsional)"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="border border-gray-300 rounded-xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  />
                  <div className="md:col-span-2 lg:col-span-3">
                    <button
                      type="submit"
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white py-5 rounded-xl font-bold text-xl transition shadow-lg"
                    >
                      ➕ Tambah Produk
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.length === 0 ? (
                  <p className="col-span-full text-center text-gray-500 py-12 text-xl">Belum ada produk.</p>
                ) : (
                  products.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <img 
                        src={product.image || "/Images/placeholder.jpg"} 
                        alt={product.name} 
                        className="w-full h-72 object-cover" 
                      />
                      <div className="p-6">
                        <h4 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h4>
                        <p className="text-teal-700 font-bold text-2xl mb-4">
                          Rp {(product.price || 0).toLocaleString("id-ID")}
                        </p>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-3"
                        >
                          <FaTrash /> Hapus Produk
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab Pesanan */}
          {activeTab === "orders" && (
            <div>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800">Daftar Pesanan</h2>
                <span className="text-lg text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  Total: {orders.length} pesanan ({totalFilteredOrders} sesuai filter)
                </span>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-12 border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 flex items-center gap-2">
                  <FaSearch className="text-gray-500 text-xl" />
                  <input
                    type="text"
                    placeholder="Cari ID Pesanan (misal: ORD-1766488054457)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-xl px-6 py-3 focus:outline-none focus:ring-4 focus:ring-teal-300 min-w-[200px]"
                >
                  <option value="">Semua Status</option>
                  <option>Menunggu Pembayaran</option>
                  <option>Sedang Diproses</option>
                  <option>Dikirim</option>
                  <option>Selesai</option>
                  <option>Dibatalkan</option>
                </select>

                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500 text-xl" />
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-teal-300"
                  />
                  {filterDate && (
                    <button onClick={() => setFilterDate("")} className="text-red-600 hover:text-red-800 font-bold text-lg">✕</button>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                {totalFilteredOrders === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <p className="text-2xl text-gray-500">Tidak ada pesanan yang sesuai filter.</p>
                  </div>
                ) : (
                  <>
                    {paginatedOrders.map((order) => (
                      <div key={order.id} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">Pesanan #{order.id}</h3>
                            <p className="text-gray-600 mt-2">
                              Tanggal: {order.date ? new Date(order.date).toLocaleString("id-ID") : "Tidak tersedia"}
                            </p>
                            <p className="text-gray-600">
                              Metode Pembayaran: <span className="font-medium">{order.paymentMethod || "-"}</span>
                            </p>
                          </div>

                          <div className="flex flex-col items-start md:items-end">
                            <label className="text-sm text-gray-600 mb-1">Status Pesanan</label>
                            <select
                              value={order.status || "Menunggu Pembayaran"}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="w-full md:w-auto border border-gray-300 rounded-xl px-6 py-3 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
                            >
                              <option>Menunggu Pembayaran</option>
                              <option>Sedang Diproses</option>
                              <option>Dikirim</option>
                              <option>Selesai</option>
                              <option>Dibatalkan</option>
                            </select>
                          </div>
                        </div>

                        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 mb-6 text-center">
                          <p className="text-lg text-gray-700">Total Pembayaran</p>
                          <p className="text-4xl font-bold text-teal-800 mt-2">
                            Rp {(order.total || 0).toLocaleString("id-ID")}
                          </p>
                        </div>

                        {order.status === "Dikirim" && (
                          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <label className="block text-sm font-medium mb-2">Nomor Resi Pengiriman</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={resiInput[order.id] || order.resi || ""}
                                onChange={(e) => setResiInput({ ...resiInput, [order.id]: e.target.value })}
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-teal-300"
                                placeholder="Masukkan nomor resi..."
                              />
                              <button
                                onClick={() => handleSaveResi(order.id)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                              >
                                <FaTruck /> Simpan
                              </button>
                            </div>
                          </div>
                        )}

                        <details className="bg-gray-50 rounded-xl overflow-hidden mb-6">
                          <summary className="cursor-pointer font-bold text-teal-700 px-6 py-4 hover:bg-gray-100 transition">
                            👁 Lihat Detail Item Pesanan ({(order.items || []).length} produk)
                          </summary>
                          <div className="bg-white p-6 border-t border-gray-200">
                            {(order.items || []).length > 0 ? (
                              <ul className="space-y-4">
                                {order.items.map((item, i) => (
                                  <li key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                                    <div className="flex items-center gap-4">
                                      {item.image && (
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                                      )}
                                      <div>
                                        <p className="font-medium text-gray-900">{item.name || "Produk tidak diketahui"}</p>
                                        <p className="text-sm text-gray-600">Jumlah: {item.quantity || 1}</p>
                                      </div>
                                    </div>
                                    <p className="font-semibold text-gray-800">
                                      Rp {((item.price || 0) * (item.quantity || 1)).toLocaleString("id-ID")}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-center text-gray-500 py-8 italic">Tidak ada detail item tersedia.</p>
                            )}
                          </div>
                        </details>

                        {order.shippingAddress && (
                          <div className="mb-6 bg-blue-50 p-5 rounded-xl border border-blue-200">
                            <p className="font-semibold text-blue-900 mb-3">📍 Alamat Pengiriman</p>
                            <div className="text-gray-800">
                              <p className="font-bold text-lg">
                                {order.shippingAddress.fullName} ({order.shippingAddress.phone})
                              </p>
                              <p className="text-gray-700 mt-2 leading-relaxed">
                                {formatAddressLine(order.shippingAddress)}
                              </p>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() => handlePrintInvoice(order)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg flex items-center justify-center gap-3"
                        >
                          <FaPrint /> Cetak Invoice / Resi
                        </button>
                      </div>
                    ))}

                    {totalPagesOrders > 1 && (
                      <div className="flex flex-col items-center mt-12 gap-6">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            onClick={() => goToPageOrders(currentPageOrders - 1)}
                            disabled={currentPageOrders === 1}
                            className={`px-6 py-3 rounded-xl font-medium transition ${
                              currentPageOrders === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-teal-100 text-teal-700 hover:bg-teal-200"
                            }`}
                          >
                            Sebelumnya
                          </button>

                          {[...Array(totalPagesOrders)].map((_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => goToPageOrders(i + 1)}
                              className={`w-12 h-12 rounded-full font-medium transition ${
                                currentPageOrders === i + 1
                                  ? "bg-teal-700 text-white shadow-lg"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}

                          <button
                            onClick={() => goToPageOrders(currentPageOrders + 1)}
                            disabled={currentPageOrders === totalPagesOrders}
                            className={`px-6 py-3 rounded-xl font-medium transition ${
                              currentPageOrders === totalPagesOrders
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-teal-100 text-teal-700 hover:bg-teal-200"
                            }`}
                          >
                            Selanjutnya
                          </button>
                        </div>

                        <p className="text-gray-600">
                          Menampilkan {(currentPageOrders - 1) * ORDERS_PER_PAGE + 1} - {Math.min(currentPageOrders * ORDERS_PER_PAGE, totalFilteredOrders)} dari {totalFilteredOrders} pesanan
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tab Pengguna */}
          {activeTab === "users" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <h2 className="text-4xl font-bold text-gray-800">Daftar Pengguna</h2>
                <span className="text-lg text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  Total: {users.length} pengguna ({filteredUsers.length} sesuai pencarian)
                </span>
              </div>

              <div className="mb-8 flex items-center gap-3">
                <FaSearch className="text-gray-500 text-xl" />
                <input
                  type="text"
                  placeholder="Cari nama atau email pengguna..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-teal-300"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-gray-600">Avatar</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">Nama</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">Bergabung</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">Total Pesanan</th>
                      <th className="p-4 text-sm font-semibold text-gray-600">Role</th>
                      <th className="p-4 text-sm font-semibold text-gray-600 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-gray-500">Tidak ada pengguna yang sesuai pencarian.</td>
                      </tr>
                    ) : (
                      paginatedUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                          <td className="p-4">
                            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                              {getInitials(user.name)}
                            </div>
                          </td>
                          <td className="p-4 font-medium text-gray-900">{user.name || "-"}</td>
                          <td className="p-4 text-gray-600">{user.email}</td>
                          <td className="p-4 text-gray-600">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString("id-ID") : "-"}
                          </td>
                          <td className="p-4 text-gray-600 text-center">{getUserOrderCount(user.id)}</td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.role === "admin" ? "bg-red-100 text-red-700" : "bg-teal-100 text-teal-700"
                              }`}
                            >
                              {user.role || "user"}
                            </span>
                          </td>
                          <td className="p-4 text-center flex justify-center gap-4">
                            <button
                              onClick={() => handleToggleRole(user.id, user.role)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPagesUsers > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => goToPageUsers(currentPageUsers - 1)}
                    disabled={currentPageUsers === 1}
                    className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    Sebelumnya
                  </button>
                  <span className="text-gray-600">
                    Halaman {currentPageUsers} dari {totalPagesUsers}
                  </span>
                  <button
                    onClick={() => goToPageUsers(currentPageUsers + 1)}
                    disabled={currentPageUsers === totalPagesUsers}
                    className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    Selanjutnya
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab Statistik */}
          {activeTab === "stats" && (
            <div>
              <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Statistik Penjualan</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-green-50 p-8 rounded-2xl text-center border border-green-200 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4">Total Penjualan Bulan Ini</h3>
                  <p className="text-5xl font-bold text-green-800">
                    Rp {stats.totalSalesThisMonth.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="bg-blue-50 p-8 rounded-2xl text-center border border-blue-200 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4">Pesanan Baru Hari Ini</h3>
                  <p className="text-5xl font-bold text-blue-800">
                    {stats.newOrdersToday}
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-center">Grafik Penjualan Bulan Ini</h3>
                <Bar
                  data={{
                    labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
                    datasets: [{
                      label: "Penjualan (Rp)",
                      data: [
                        stats.totalSalesThisMonth * 0.2,
                        stats.totalSalesThisMonth * 0.3,
                        stats.totalSalesThisMonth * 0.25,
                        stats.totalSalesThisMonth * 0.25
                      ],
                      backgroundColor: "rgba(75, 192, 192, 0.6)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 2,
                    }],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: { display: false },
                    },
                    scales: {
                      y: { beginAtZero: true },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;