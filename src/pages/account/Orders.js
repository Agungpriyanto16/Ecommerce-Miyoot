// src/pages/account/Orders.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBox, FaTruck, FaCheckCircle, FaHourglassHalf, FaMapMarkerAlt, FaCreditCard, FaTimes } from "react-icons/fa";

const ITEMS_PER_PAGE = 5;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Untuk modal konfirmasi batal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");

    if (!userEmail) {
      setError("Silakan login terlebih dahulu untuk melihat pesanan.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5001/orders")
      .then((res) => {
        const userOrders = res.data.filter((order) => order.userEmail === userEmail);
        const sortedOrders = userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil pesanan:", err);
        setError("Gagal memuat pesanan. Pastikan server berjalan.");
        setLoading(false);
      });
  }, []);

  // Fungsi batal pesanan
  const handleCancelOrder = async () => {
    if (!orderToCancel) return;

    setCancelling(true);

    try {
      // Update di server
      await axios.patch(`http://localhost:5001/orders/${orderToCancel.id}`, {
        status: "Dibatalkan",
      });

      // Update di state lokal
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderToCancel.id ? { ...order, status: "Dibatalkan" } : order
        )
      );

      // Update juga di localStorage userOrders agar tetap sinkron
      const storedOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
      const updatedStored = storedOrders.map((order) =>
        order.id === orderToCancel.id ? { ...order, status: "Dibatalkan" } : order
      );
      localStorage.setItem("userOrders", JSON.stringify(updatedStored));

      alert("Pesanan berhasil dibatalkan.");
      setShowCancelModal(false);
      setOrderToCancel(null);
    } catch (err) {
      console.error("Gagal membatalkan pesanan:", err);
      alert("Gagal membatalkan pesanan. Coba lagi nanti.");
    } finally {
      setCancelling(false);
    }
  };

  const openCancelModal = (order) => {
    setOrderToCancel(order);
    setShowCancelModal(true);
  };

  // Hitung pagination
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = orders.slice(startIndex, endIndex);

  const getStatusInfo = (status) => {
    switch (status) {
      case "Menunggu Pembayaran":
        return { label: "Menunggu Pembayaran", color: "bg-orange-100 text-orange-800", icon: <FaHourglassHalf className="text-orange-600" /> };
      case "Sedang Diproses":
        return { label: "Sedang Diproses", color: "bg-blue-100 text-blue-800", icon: <FaBox className="text-blue-600" /> };
      case "Dikirim":
        return { label: "Sedang Dikirim", color: "bg-purple-100 text-purple-800", icon: <FaTruck className="text-purple-600" /> };
      case "Selesai":
        return { label: "Selesai", color: "bg-green-100 text-green-800", icon: <FaCheckCircle className="text-green-600" /> };
      case "Dibatalkan":
        return { label: "Dibatalkan", color: "bg-red-100 text-red-800", icon: <FaTimes className="text-red-600" /> };
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-800", icon: <FaBox /> };
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

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-2xl text-gray-600">Memuat pesanan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-2xl text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-teal-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-800 transition"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">Pesanan Saya</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-16 text-center">
          <p className="text-2xl text-gray-600 mb-4">Belum ada pesanan</p>
          <p className="text-lg text-gray-500">Yuk, mulai belanja dan temukan gaya terbaikmu di Miyoot!</p>
          <a
            href="/shop"
            className="inline-block mt-8 bg-teal-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-teal-800 transition shadow-lg"
          >
            Mulai Belanja
          </a>
        </div>
      ) : (
        <>
          <div className="space-y-10 mb-12">
            {currentOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const items = order.items || [];
              const canCancel = order.status === "Menunggu Pembayaran" || order.status === "Sedang Diproses";

              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gray-50 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <p className="font-bold text-lg text-gray-700">
                        No. Pesanan: <span className="text-teal-700 font-extrabold text-xl">{order.id}</span>
                      </p>
                      <p className="text-gray-600 mt-1">
                        {order.date
                          ? new Date(order.date).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "Tanggal tidak tersedia"}{" "}
                        • {items.length} barang
                      </p>
                    </div>
                    <div className={`flex items-center gap-3 px-5 py-3 rounded-full ${statusInfo.color} font-semibold`}>
                      {statusInfo.icon}
                      <span>{statusInfo.label}</span>
                    </div>
                  </div>

                  {/* Konten */}
                  <div className="p-8 space-y-8">
                    {/* Produk */}
                    <div>
                      <h3 className="font-bold text-lg text-gray-700 mb-4">Produk yang Dipesan</h3>
                      <div className="space-y-5">
                        {items.map((item, i) => (
                          <div key={i} className="flex items-center gap-5 border-b pb-5 last:border-0">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg border"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{item.name || "Produk"}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.quantity || 1} × Rp {(item.price || 0).toLocaleString("id-ID")}
                              </p>
                            </div>
                            <p className="font-bold text-gray-800">
                              Rp {((item.price || 0) * (item.quantity || 1)).toLocaleString("id-ID")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alamat */}
                    {order.shippingAddress && (
                      <div className="bg-gray-50 rounded-xl p-5 flex items-start gap-4">
                        <FaMapMarkerAlt className="text-teal-700 text-2xl mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">
                            {order.shippingAddress.fullName} ({order.shippingAddress.phone})
                          </p>
                          <p className="text-gray-700 mt-2 leading-relaxed">
                            {formatAddressLine(order.shippingAddress)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Info tambahan */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-600 text-sm">Ekspedisi</p>
                        <p className="font-bold text-gray-800 mt-1">{order.shippingMethod || "-"}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-600 text-sm">Pembayaran</p>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <FaCreditCard className="text-teal-700" />
                          <p className="font-bold text-gray-800">{order.paymentMethod || "-"}</p>
                        </div>
                      </div>
                      <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                        <p className="text-gray-600 text-sm">Total Bayar</p>
                        <p className="text-3xl font-bold text-teal-800 mt-2">
                          Rp {(order.total || 0).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="flex flex-wrap gap-4 justify-end">
                      {order.status === "Menunggu Pembayaran" && (
                        <button
                          onClick={() => {
                            localStorage.setItem("pendingPaymentOrder", JSON.stringify(order));
                            window.location.href = "/payment";
                          }}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold transition shadow"
                        >
                          Bayar Sekarang
                        </button>
                      )}

                      {canCancel && (
                        <button
                          onClick={() => openCancelModal(order)}
                          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition shadow"
                        >
                          Batalkan Pesanan
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-5 py-3 rounded-xl font-medium transition ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-teal-100 text-teal-700 hover:bg-teal-200"
                }`}
              >
                Sebelumnya
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-full font-medium transition ${
                      currentPage === page
                        ? "bg-teal-700 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-5 py-3 rounded-xl font-medium transition ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-teal-100 text-teal-700 hover:bg-teal-200"
                }`}
              >
                Selanjutnya
              </button>
            </div>
          )}

          <p className="text-center text-gray-500 mt-4">
            Menampilkan {startIndex + 1} - {Math.min(endIndex, orders.length)} dari {orders.length} pesanan
          </p>
        </>
      )}

      {/* Modal Konfirmasi Batal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="text-red-600 text-6xl mb-6">⚠</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Batalkan Pesanan?</h3>
            <p className="text-gray-600 mb-2">
              No. Pesanan: <strong>{orderToCancel?.id}</strong>
            </p>
            <p className="text-gray-600 mb-8">
              Tindakan ini tidak dapat dibatalkan. Pesanan akan langsung berstatus <strong>Dibatalkan</strong>.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setOrderToCancel(null);
                }}
                className="px-8 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
                disabled={cancelling}
              >
                Tidak, Kembali
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition shadow-lg disabled:opacity-70"
              >
                {cancelling ? "Membatalkan..." : "Ya, Batalkan Pesanan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;