// src/pages/PaymentPage.jsx

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pending = localStorage.getItem("pendingPaymentOrder");
    if (pending) {
      try {
        const parsedOrder = JSON.parse(pending);
        setOrder(parsedOrder);
        localStorage.removeItem("pendingPaymentOrder");
      } catch (error) {
        console.error("Error parsing order data:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-2xl text-gray-600">Memuat data pembayaran...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-red-600 mb-6">
              Data Pesanan Tidak Ditemukan
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Maaf, data pesanan untuk pembayaran tidak tersedia.
            </p>
            <p className="text-gray-600 mb-10">
              Kemungkinan halaman ini dibuka secara langsung atau data sudah kedaluwarsa.
            </p>
            <button
              onClick={() => window.location.href = "/account/orders"}
              className="bg-teal-700 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-teal-800 transition shadow-lg"
            >
              Kembali ke Pesanan Saya
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const paymentMethod = order.paymentMethod.toLowerCase().includes("transfer")
    ? "transfer"
    : order.paymentMethod.toLowerCase().includes("e-wallet")
    ? "ewallet"
    : order.paymentMethod.toLowerCase().includes("kartu")
    ? "kartu"
    : "cod";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-teal-800">
            Lanjutkan Pembayaran Pesanan
          </h1>

          {/* Header No Pesanan & Total */}
          <div className="bg-orange-100 border-4 border-orange-400 rounded-3xl p-10 text-center mb-12 shadow-2xl">
            <p className="text-2xl text-orange-800 font-semibold mb-2">No. Pesanan:</p>
            <p className="text-5xl font-bold text-orange-900 mb-6">{order.id}</p>
            <p className="text-6xl font-bold text-red-700">Rp {order.total.toLocaleString("id-ID")}</p>
            <p className="text-lg text-gray-700 mt-6">
              Metode Pembayaran: <strong>{order.paymentMethod}</strong>
            </p>
          </div>

          {/* INSTRUKSI BERDASARKAN METODE PEMBAYARAN */}
          <div className="bg-white rounded-3xl shadow-2xl p-12">

            {/* TRANSFER BANK */}
            {paymentMethod === "transfer" && (
              <>
                <h2 className="text-4xl font-bold text-center mb-10 text-teal-800">Transfer Bank</h2>
                <p className="text-center text-xl text-gray-700 mb-12">
                  Silakan transfer tepat sejumlah <strong>Rp {order.total.toLocaleString("id-ID")}</strong> ke salah satu rekening berikut:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-10 rounded-2xl text-center border-4 border-teal-200 shadow-lg">
                    <p className="text-3xl font-bold text-teal-800">BCA</p>
                    <p className="text-gray-600 mt-3">a/n MIYOOT FASHION</p>
                    <p className="text-5xl font-bold text-teal-900 mt-6">1234 5678 90</p>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-10 rounded-2xl text-center border-4 border-teal-200 shadow-lg">
                    <p className="text-3xl font-bold text-teal-800">BNI</p>
                    <p className="text-gray-600 mt-3">a/n MIYOOT FASHION</p>
                    <p className="text-5xl font-bold text-teal-900 mt-6">9876 5432 10</p>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-10 rounded-2xl text-center border-4 border-teal-200 shadow-lg">
                    <p className="text-3xl font-bold text-teal-800">Mandiri</p>
                    <p className="text-gray-600 mt-3">a/n MIYOOT</p>
                    <p className="text-5xl font-bold text-teal-900 mt-6">1122 3344 5566</p>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-10 rounded-2xl text-center border-4 border-teal-200 shadow-lg">
                    <p className="text-3xl font-bold text-teal-800">BRI</p>
                    <p className="text-gray-600 mt-3">a/n MIYOOT STORE</p>
                    <p className="text-5xl font-bold text-teal-900 mt-6">7788 9900 1122</p>
                  </div>
                </div>

                <div className="mt-12 bg-blue-50 border-4 border-blue-300 rounded-2xl p-8 text-center">
                  <p className="text-2xl text-blue-800 font-bold">
                    ✅ Pembayaran akan terdeteksi otomatis dalam <strong>5-10 menit</strong>
                  </p>
                  <p className="text-lg text-gray-700 mt-4">
                    Setelah terdeteksi, status pesanan akan berubah menjadi <strong>"Sedang Diproses"</strong>
                  </p>
                </div>
              </>
            )}

            {/* E-WALLET */}
            {paymentMethod === "ewallet" && (
              <div className="text-center">
                <h2 className="text-4xl font-bold text-teal-800 mb-10">Bayar dengan E-Wallet</h2>
                <p className="text-xl text-gray-700 mb-12">
                  Scan QRIS di bawah ini dengan GoPay, OVO, DANA, atau ShopeePay:
                </p>

                <div className="inline-block bg-white p-12 rounded-3xl shadow-2xl border-8 border-dashed border-gray-300">
                  <div className="bg-gray-200 border-4 border-dashed rounded-xl w-80 h-80 flex flex-col items-center justify-center text-gray-500 text-4xl font-bold">
                    QRIS
                    <p className="text-3xl mt-4 text-red-600">Rp {order.total.toLocaleString("id-ID")}</p>
                  </div>
                </div>

                <p className="text-6xl font-bold text-red-700 mt-10">
                  Rp {order.total.toLocaleString("id-ID")}
                </p>
                <p className="text-xl text-gray-700 mt-6">
                  Pembayaran akan terdeteksi otomatis dalam <strong>1-2 menit</strong>
                </p>
              </div>
            )}

            {/* KARTU KREDIT/DEBIT */}
            {paymentMethod === "kartu" && (
              <div className="text-center">
                <h2 className="text-4xl font-bold text-teal-800 mb-10">Kartu Kredit / Debit</h2>
                <p className="text-xl text-gray-700 mb-8">
                  Pembayaran Anda telah berhasil diproses melalui gateway aman.
                </p>
                <div className="bg-green-50 border-4 border-green-400 rounded-3xl p-10 inline-block">
                  <p className="text-3xl font-bold text-green-800">
                    ✅ Pembayaran Berhasil!
                  </p>
                  <p className="text-xl text-gray-700 mt-4">
                    Pesanan Anda akan segera diproses.
                  </p>
                </div>
                <p className="text-lg text-gray-600 mt-8">
                  Cicilan 0% hingga 12 bulan tersedia untuk bank tertentu.
                </p>
              </div>
            )}

            {/* COD */}
            {paymentMethod === "cod" && (
              <div className="text-center">
                <h2 className="text-4xl font-bold text-teal-800 mb-10">Bayar di Tempat (COD)</h2>
                <div className="bg-yellow-50 border-4 border-yellow-400 rounded-3xl p-10 max-w-3xl mx-auto">
                  <p className="text-2xl font-bold text-yellow-800 mb-6">
                    Siapkan uang tunai sejumlah
                  </p>
                  <p className="text-6xl font-bold text-red-700 mb-8">
                    Rp {order.total.toLocaleString("id-ID")}
                  </p>
                  <ul className="text-left text-lg text-gray-700 space-y-4 max-w-xl mx-auto">
                    <li>• Pembayaran hanya diterima dalam bentuk tunai</li>
                    <li>• Siapkan uang pas (tidak ada kembalian)</li>
                    <li>• Kurir akan menunggu pembayaran sebelum menyerahkan paket</li>
                  </ul>
                </div>
                <p className="text-xl text-gray-700 mt-10">
                  Pesanan Anda akan segera diproses dan dikirim.
                </p>
              </div>
            )}

            {/* Tombol Kembali - Sudah benar ke /account/orders */}
            <div className="mt-16 text-center">
              <button
                onClick={() => window.location.href = "/accountlayout/Orders"}
                className="bg-teal-700 text-white px-16 py-6 rounded-2xl font-bold text-2xl hover:bg-teal-800 transition shadow-2xl"
              >
                Kembali ke Pesanan Saya
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPage;