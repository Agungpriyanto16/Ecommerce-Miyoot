// src/pages/account/Voucher.jsx

import React from "react";
import { FaTicketAlt, FaCalendarAlt, FaTag } from "react-icons/fa";

const Voucher = () => {
  // Simulasi data voucher user
  const vouchers = [
    {
      code: "MIYOOT25",
      discount: "25%",
      minPurchase: 200000,
      description: "Diskon 25% untuk pembelian minimal Rp200.000",
      expiryDate: "31 Desember 2025",
      status: "active",
    },
    {
      code: "FREESHIP",
      discount: "Gratis Ongkir",
      minPurchase: 0,
      description: "Gratis ongkir ke seluruh Indonesia",
      expiryDate: "15 Januari 2026",
      status: "active",
    },
    {
      code: "WELCOME10",
      discount: "Rp10.000",
      minPurchase: 100000,
      description: "Potongan Rp10.000 untuk pembelanjaan pertama",
      expiryDate: "10 Desember 2025",
      status: "expired",
    },
  ];

  const activeVouchers = vouchers.filter(v => v.status === "active");
  const expiredVouchers = vouchers.filter(v => v.status === "expired");

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Voucher Saya</h1>
      <p className="text-gray-600 mb-8">
        Gunakan voucher di bawah ini saat checkout untuk mendapatkan diskon spesial!
      </p>

      {/* Voucher Aktif */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-teal-700 flex items-center gap-2">
          <FaTicketAlt /> Voucher Aktif ({activeVouchers.length})
        </h2>

        {activeVouchers.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center border border-gray-200">
            <FaTag className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Belum ada voucher aktif</p>
            <p className="text-gray-500 mt-2">Ikuti promo kami untuk mendapatkan voucher menarik!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeVouchers.map((voucher) => (
              <div
                key={voucher.code}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl shadow-lg overflow-hidden relative"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm opacity-90">Kode Voucher</p>
                      <p className="text-2xl font-bold">{voucher.code}</p>
                    </div>
                    <FaTicketAlt className="text-4xl opacity-30" />
                  </div>

                  <div className="space-y-3">
                    <p className="text-3xl font-bold">{voucher.discount}</p>
                    <p className="text-sm opacity-90">{voucher.description}</p>
                    {voucher.minPurchase > 0 && (
                      <p className="text-xs opacity-80">
                        Min. belanja Rp{voucher.minPurchase.toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white border-opacity-30 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <FaCalendarAlt />
                      <span>Berlaku hingga {voucher.expiryDate}</span>
                    </div>
                    <button className="bg-white text-teal-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                      Gunakan
                    </button>
                  </div>
                </div>

                {/* Pattern dekoratif */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-bl-full"></div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Voucher Kadaluarsa */}
      {expiredVouchers.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-6 text-gray-500 flex items-center gap-2">
            <FaTicketAlt /> Voucher Kadaluarsa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expiredVouchers.map((voucher) => (
              <div
                key={voucher.code}
                className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-6 relative overflow-hidden opacity-70"
              >
                <div className="text-center">
                  <p className="text-sm text-gray-500">Kode Voucher</p>
                  <p className="text-2xl font-bold text-gray-600">{voucher.code}</p>
                  <p className="text-xl font-semibold text-gray-600 mt-3">{voucher.discount}</p>
                  <p className="text-sm text-gray-500 mt-2">{voucher.description}</p>
                  <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                    <FaCalendarAlt />
                    Kadaluarsa pada {voucher.expiryDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tips Tambahan */}
      <div className="mt-10 p-6 bg-teal-50 border border-teal-200 rounded-lg">
        <p className="text-sm text-teal-800">
          <strong>Cara mendapatkan voucher:</strong>
          <br />
          • Ikuti promo flash sale dan event spesial
          <br />
          • Subscribe newsletter untuk voucher eksklusif
          <br />
          • Belanja rutin untuk mendapatkan reward voucher
        </p>
      </div>
    </div>
  );
};

export default Voucher;