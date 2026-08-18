// src/pages/CheckoutPage.jsx
import React, { useContext, useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const [showAddressModal, setShowAddressModal] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    district: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [editingAddress, setEditingAddress] = useState(null);
  const [editingData, setEditingData] = useState({});

  // === PERBAIKAN UTAMA: useEffect untuk load alamat ===
  useEffect(() => {
    const primary = localStorage.getItem("savedShippingAddress");
    const all = JSON.parse(localStorage.getItem("userAddresses") || "[]");

    setAddresses(all);

    if (primary) {
      // Ada alamat primary yang tersimpan sebelumnya
      const parsedPrimary = JSON.parse(primary);
      setSelectedAddress(parsedPrimary);
    } else if (all.length > 0) {
      // Tidak ada primary, tapi ada alamat → pilih yang pertama sebagai default
      const defaultAddress = all[0];
      setSelectedAddress(defaultAddress);
      localStorage.setItem("savedShippingAddress", JSON.stringify(defaultAddress));
    } else {
      // Benar-benar belum ada alamat sama sekali → buka modal tambah alamat
      setShowAddressModal(true);
      setIsAddingNew(true);
    }
  }, []);

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  // === PERBAIKAN: Setelah simpan alamat baru, modal tertutup otomatis ===
  const handleSaveNewAddress = () => {
    const required = ["fullName", "phone", "address", "district", "city", "province", "postalCode"];
    for (const field of required) {
      if (!newAddress[field].trim()) {
        alert("Mohon lengkapi semua kolom alamat!");
        return;
      }
    }

    const savedAddress = {
      ...newAddress,
      id: Date.now(),
      isPrimary: addresses.length === 0, // Otomatis primary jika ini alamat pertama
    };

    const updatedAddresses = [...addresses, savedAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));

    // Set sebagai alamat terpilih & primary
    setSelectedAddress(savedAddress);
    localStorage.setItem("savedShippingAddress", JSON.stringify(savedAddress));

    // Reset form dan tutup modal
    setNewAddress({
      fullName: "", phone: "", address: "", district: "", city: "", province: "", postalCode: "",
    });
    setIsAddingNew(false);
    setShowAddressModal(false); // ← Tambahan: tutup modal setelah simpan
  };

  const handleStartEdit = (addr) => {
    setEditingAddress(addr.id);
    setEditingData({ ...addr });
    setIsAddingNew(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingData({ ...editingData, [name]: value });
  };

  const handleSaveEdit = () => {
    const required = ["fullName", "phone", "address", "district", "city", "province", "postalCode"];
    for (const field of required) {
      if (!editingData[field].trim()) {
        alert("Mohon lengkapi semua kolom alamat!");
        return;
      }
    }

    const updatedAddresses = addresses.map((addr) =>
      addr.id === editingAddress ? { ...editingData, id: addr.id, isPrimary: addr.isPrimary } : addr
    );

    setAddresses(updatedAddresses);
    localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));

    if (selectedAddress?.id === editingAddress) {
      setSelectedAddress(editingData);
      localStorage.setItem("savedShippingAddress", JSON.stringify(editingData));
    }

    setEditingAddress(null);
  };

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    localStorage.setItem("savedShippingAddress", JSON.stringify(addr));
  };

  const provinces = [
    "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "DI Yogyakarta",
    "Banten", "Bali", "Sumatera Utara", "Sumatera Barat", "Sumatera Selatan",
  ];

  const citiesByProvince = {
    "DKI Jakarta": ["Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur", "Kepulauan Seribu"],
    "Jawa Barat": ["Bandung", "Bekasi", "Bogor", "Depok", "Cimahi", "Tasikmalaya", "Cirebon", "Sukabumi"],
    "Jawa Tengah": ["Semarang", "Surakarta (Solo)", "Tegal", "Pekalongan", "Magelang", "Salatiga"],
    "Jawa Timur": ["Surabaya", "Malang", "Kediri", "Sidoarjo", "Probolinggo", "Madiun", "Blitar"],
    "DI Yogyakarta": ["Yogyakarta", "Bantul", "Sleman", "Gunungkidul", "Kulon Progo"],
    "Banten": ["Tangerang", "Serang", "Cilegon", "Tangerang Selatan"],
    "Bali": ["Denpasar", "Badung", "Gianyar", "Tabanan", "Klungkung"],
    "Sumatera Utara": ["Medan", "Binjai", "Pematangsiantar", "Tebing Tinggi"],
    "Sumatera Barat": ["Padang", "Bukittinggi", "Payakumbuh", "Padang Panjang"],
    "Sumatera Selatan": ["Palembang", "Lubuklinggau", "Prabumulih", "Pagar Alam"],
  };

  const availableCitiesNew = newAddress.province ? citiesByProvince[newAddress.province] || [] : [];
  const availableCitiesEdit = editingData.province ? citiesByProvince[editingData.province] || [] : [];

  // Hitung berat total
  const totalWeightGram = cartItems.reduce((acc, item) => (item.weight || 500) * item.quantity + acc, 0);
  const totalWeightKg = Math.ceil(totalWeightGram / 1000);

  // Ekspedisi
  const shippingOptions = [
    { id: "jne", name: "JNE Reguler", baseRate: 9000, estimate: "3-5 hari" },
    { id: "jnt", name: "J&T Express", baseRate: 8000, estimate: "2-4 hari" },
    { id: "sicepat", name: "SiCepat Reguler", baseRate: 7000, estimate: "2-3 hari" },
    { id: "gosend", name: "GoSend Instant", baseRate: 18000, estimate: "Hari yang sama" },
  ];

  const getShippingCategory = (address) => {
    if (!address || !address.province) return "unknown";

    const province = address.province.toLowerCase();
    const city = (address.city || "").toLowerCase();

    if (province.includes("jawa timur")) {
      if (city.includes("surabaya")) return "surabaya";
      return "jatim_lain";
    }
    if (province.includes("jawa") || province.includes("banten") || province.includes("yogyakarta")) return "java_lain";
    if (province.includes("bali")) return "bali";
    if (province.includes("sumatera")) return "sumatera";
    return "luar_jawa";
  };

  const getRateMultiplier = (category) => {
    switch (category) {
      case "surabaya": return { rate: 1.0, min: 1.0 };
      case "jatim_lain": return { rate: 1.3, min: 1.2 };
      case "java_lain": return { rate: 1.6, min: 1.4 };
      case "bali": return { rate: 2.0, min: 1.8 };
      case "sumatera": return { rate: 2.2, min: 2.0 };
      case "luar_jawa": return { rate: 2.8, min: 2.5 };
      default: return { rate: 1.5, min: 1.3 };
    }
  };

  const calculateShippingCost = (optionId) => {
    if (!selectedAddress) return 0;

    const option = shippingOptions.find((opt) => opt.id === optionId);
    if (!option) return 0;

    const category = getShippingCategory(selectedAddress);
    const multiplier = getRateMultiplier(category);

    if (option.id === "gosend" && category !== "surabaya") {
      return 0;
    }

    const ratePerKg = option.baseRate * multiplier.rate;
    const minCost = option.baseRate * 1.5 * multiplier.min;

    const cost = ratePerKg * totalWeightKg;
    return Math.max(minCost, cost);
  };

  const getOptionDisplayCost = (option) => {
    if (!selectedAddress) return "Pilih alamat dulu";

    if (option.id === "gosend" && getShippingCategory(selectedAddress) !== "surabaya") {
      return "Tidak tersedia";
    }

    const cost = calculateShippingCost(option.id);
    return cost > 0 ? `Rp ${cost.toLocaleString("id-ID")}` : "Gratis";
  };

  const shippingCost = selectedShipping ? calculateShippingCost(selectedShipping) : 0;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const paymentOptions = [
    { id: "transfer", name: "Transfer Bank (BCA, BNI, Mandiri, BRI)" },
    { id: "ewallet", name: "E-Wallet (GoPay, OVO, DANA, ShopeePay)" },
    { id: "cod", name: "Cash on Delivery (Bayar di Tempat)" },
    { id: "kartu", name: "Kartu Kredit / Debit" },
  ];

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      alert("Pilih alamat pengiriman terlebih dahulu!");
      setShowAddressModal(true);
      return;
    }
    if (!selectedShipping) {
      alert("Pilih metode pengiriman terlebih dahulu!");
      return;
    }
    if (!selectedPayment) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
      alert("Anda harus login terlebih dahulu!");
      navigate("/shop");
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const orderData = {
      id: orderId,
      userEmail,
      date: new Date().toISOString(),
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      shippingAddress: { ...selectedAddress },
      shippingMethod: shippingOptions.find((opt) => opt.id === selectedShipping)?.name || "",
      shippingCost,
      paymentMethod: paymentOptions.find((p) => p.id === selectedPayment).name,
      status: selectedPayment === "cod" ? "Sedang Diproses" : "Menunggu Pembayaran",
    };

    try {
      await axios.post("http://localhost:5001/orders", orderData);

      const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
      existingOrders.unshift({
        ...orderData,
        date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
      });
      localStorage.setItem("userOrders", JSON.stringify(existingOrders));

      if (typeof clearCart === "function") clearCart();

      alert(`Pesanan berhasil dibuat! 🎉\n\nNo. Pesanan: ${orderId}\nTotal: Rp ${total.toLocaleString("id-ID")}`);
      navigate("/checkout");
    } catch (err) {
      console.error("Gagal menyimpan pesanan:", err);
      alert("Terjadi kesalahan saat membuat pesanan.");
    }
  };

  const formatAddressLine = (addr) => {
    if (!addr) return "";
    return `${addr.address}, ${addr.district}, ${addr.city}, ${addr.province}, ID ${addr.postalCode}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div
        className="relative w-full h-[300px] flex flex-col items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/Images/about/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Checkout</h1>
        <p className="mt-3 text-lg md:text-xl drop-shadow-md">
          Lengkapi data pengiriman dan selesaikan pesananmu
        </p>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* ALAMAT PENGIRIMAN */}
            <div className="border rounded-xl p-6 bg-white shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex gap-5">
                  <div className="text-red-500 text-4xl">📍</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Alamat Pengiriman</h2>
                    {selectedAddress ? (
                      <>
                        <div className="flex items-center gap-3 mb-3">
                          <p className="font-bold text-lg text-gray-900">
                            {selectedAddress.fullName} ({selectedAddress.phone})
                          </p>
                          {selectedAddress.isPrimary && (
                            <span className="bg-pink-100 text-pink-700 text-xs font-bold px-4 py-1 rounded-full">
                              Utama
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {formatAddressLine(selectedAddress)}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-500 italic">Belum ada alamat pengiriman dipilih</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Ubah
                </button>
              </div>
            </div>

            {/* EKSPEDISI */}
            <div className="border rounded-xl p-6 bg-white shadow-md">
              <h2 className="text-xl font-semibold mb-5">
                Pilih Ekspedisi (Berat Total: {totalWeightKg} kg)
              </h2>
              <div className="space-y-4">
                {shippingOptions.map((option) => {
                  const displayCost = getOptionDisplayCost(option);
                  const isDisabled = displayCost === "Tidak tersedia";

                  return (
                    <label
                      key={option.id}
                      className={`flex justify-between items-center border-2 rounded-xl p-5 cursor-pointer transition-all ${
                        selectedShipping === option.id
                          ? "border-teal-600 bg-teal-50 shadow-sm"
                          : isDisabled
                          ? "border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          disabled={isDisabled}
                          className="w-5 h-5 text-teal-600"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{option.name}</p>
                          <p className="text-sm text-gray-600">Estimasi tiba: {option.estimate}</p>
                          {isDisabled && <p className="text-xs text-red-600 mt-1">Hanya tersedia di Surabaya</p>}
                        </div>
                      </div>
                      <span className={`font-bold text-lg ${isDisabled ? "text-gray-500" : "text-teal-700"}`}>
                        {displayCost}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* PEMBAYARAN */}
            <div className="border rounded-xl p-6 bg-white shadow-md">
              <h2 className="text-xl font-semibold mb-5">Pilih Metode Pembayaran</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center border-2 rounded-xl p-5 cursor-pointer transition-all shadow-sm ${
                      selectedPayment === option.id
                        ? "border-teal-600 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={selectedPayment === option.id}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-5 h-5 text-teal-600 mr-4"
                    />
                    <span className="font-medium text-gray-800">{option.name}</span>
                  </label>
                ))}
              </div>

              {selectedPayment === "transfer" && (
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-5 text-teal-800">Instruksi Transfer Bank</h3>
                  <p className="font-medium text-gray-700 mb-4">Silakan transfer tepat sejumlah:</p>
                  <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5 text-center mb-6">
                    <p className="text-4xl font-bold text-red-700">Rp {total.toLocaleString("id-ID")}</p>
                  </div>
                  <p className="font-semibold mb-4">Pilih salah satu rekening:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border text-center"><p className="font-bold text-teal-700 text-lg">BCA</p><p className="text-sm">a/n MIYOOT FASHION</p><p className="text-2xl font-bold mt-2">1234 5678 90</p></div>
                    <div className="bg-white p-4 rounded-lg border text-center"><p className="font-bold text-teal-700 text-lg">BNI</p><p className="text-sm">a/n MIYOOT FASHION</p><p className="text-2xl font-bold mt-2">9876 5432 10</p></div>
                    <div className="bg-white p-4 rounded-lg border text-center"><p className="font-bold text-teal-700 text-lg">Mandiri</p><p className="text-sm">a/n MIYOOT</p><p className="text-2xl font-bold mt-2">1122 3344 5566</p></div>
                    <div className="bg-white p-4 rounded-lg border text-center"><p className="font-bold text-teal-700 text-lg">BRI</p><p className="text-sm">a/n MIYOOT STORE</p><p className="text-2xl font-bold mt-2">7788 9900 1122</p></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RINGKASAN PESANAN */}
          <div className="lg:col-span-1">
            <div className="border rounded-xl p-6 bg-white shadow-md sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h2>
              <div className="space-y-5 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.quantity} × Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                    <p className="font-semibold">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-5 space-y-3">
                <div className="flex justify-between text-gray-700"><span>Subtotal Produk</span><span>Rp {subtotal.toLocaleString("id-ID")}</span></div>
                <div className="flex justify-between text-gray-700"><span>Ongkos Kirim</span><span>{shippingCost > 0 ? `Rp ${shippingCost.toLocaleString("id-ID")}` : "Belum dipilih"}</span></div>
                <div className="flex justify-between text-2xl font-bold pt-5 border-t text-teal-700"><span>Total Bayar</span><span>Rp {total.toLocaleString("id-ID")}</span></div>
              </div>
              <button onClick={handleConfirmOrder} className="mt-8 w-full bg-teal-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-800 transition shadow-lg">
                Konfirmasi & Bayar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ALAMAT */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Alamat Saya</h2>
              <button onClick={() => {
                setShowAddressModal(false);
                setIsAddingNew(false);
                setEditingAddress(null);
              }} className="text-gray-500 text-2xl hover:text-gray-700">×</button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedAddress?.id === addr.id ? "border-red-500 bg-red-50" : "border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelectAddress(addr)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        checked={selectedAddress?.id === addr.id}
                        onChange={() => handleSelectAddress(addr)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold">
                            {addr.fullName} ({addr.phone})
                          </p>
                          {addr.isPrimary && (
                            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                              Utama
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{formatAddressLine(addr)}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(addr);
                      }}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Ubah
                    </button>
                  </div>
                </div>
              ))}

              {editingAddress !== null && (
                <div className="border rounded-lg p-5 bg-gray-50">
                  <h3 className="font-bold text-lg mb-4">Ubah Alamat</h3>
                  <div className="space-y-4">
                    <input name="fullName" placeholder="Nama Lengkap *" value={editingData.fullName || ""} onChange={handleEditChange} className="w-full border rounded-lg px-4 py-3" />
                    <input name="phone" placeholder="No. Telepon / WA *" value={editingData.phone || ""} onChange={handleEditChange} className="w-full border rounded-lg px-4 py-3" />
                    <textarea name="address" placeholder="Alamat Lengkap *" rows="3" value={editingData.address || ""} onChange={handleEditChange} className="w-full border rounded-lg px-4 py-3" />
                    <input name="district" placeholder="Kecamatan *" value={editingData.district || ""} onChange={handleEditChange} className="w-full border rounded-lg px-4 py-3" />
                    <select name="province" value={editingData.province || ""} onChange={handleEditChange} className="w-full border rounded-lg px-4 py-3">
                      <option value="">Pilih Provinsi *</option>
                      {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select name="city" value={editingData.city || ""} onChange={handleEditChange} disabled={!editingData.province} className="w-full border rounded-lg px-4 py-3 disabled:bg-gray-100">
                      <option value="">{editingData.province ? "Pilih Kota/Kabupaten *" : "Pilih provinsi dulu"}</option>
                      {availableCitiesEdit.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input name="postalCode" placeholder="Kode Pos *" value={editingData.postalCode || ""} onChange={handleEditChange} className="w-full border rounded-lg px-4 py-3" />
                  </div>
                  <div className="mt-5 flex justify-end gap-3">
                    <button onClick={() => setEditingAddress(null)} className="px-6 py-2 border rounded-lg">Batal</button>
                    <button onClick={handleSaveEdit} className="px-6 py-2 bg-teal-700 text-white rounded-lg">Simpan Perubahan</button>
                  </div>
                </div>
              )}

              {isAddingNew && editingAddress === null && (
                <div className="border rounded-lg p-5 bg-gray-50">
                  <h3 className="font-bold text-lg mb-4">Tambah Alamat Baru</h3>
                  <div className="space-y-4">
                    <input name="fullName" placeholder="Nama Lengkap *" value={newAddress.fullName} onChange={handleNewAddressChange} className="w-full border rounded-lg px-4 py-3" />
                    <input name="phone" placeholder="No. Telepon / WA *" value={newAddress.phone} onChange={handleNewAddressChange} className="w-full border rounded-lg px-4 py-3" />
                    <textarea name="address" placeholder="Alamat Lengkap *" rows="3" value={newAddress.address} onChange={handleNewAddressChange} className="w-full border rounded-lg px-4 py-3" />
                    <input name="district" placeholder="Kecamatan *" value={newAddress.district} onChange={handleNewAddressChange} className="w-full border rounded-lg px-4 py-3" />
                    <select name="province" value={newAddress.province} onChange={handleNewAddressChange} className="w-full border rounded-lg px-4 py-3">
                      <option value="">Pilih Provinsi *</option>
                      {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <select name="city" value={newAddress.city} onChange={handleNewAddressChange} disabled={!newAddress.province} className="w-full border rounded-lg px-4 py-3 disabled:bg-gray-100">
                      <option value="">{newAddress.province ? "Pilih Kota/Kabupaten *" : "Pilih provinsi dulu"}</option>
                      {availableCitiesNew.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input name="postalCode" placeholder="Kode Pos *" value={newAddress.postalCode} onChange={handleNewAddressChange} className="w-full border rounded-lg px-4 py-3" />
                  </div>
                  <div className="mt-5 flex justify-end gap-3">
                    <button onClick={() => setIsAddingNew(false)} className="px-6 py-2 border rounded-lg">Batal</button>
                    <button onClick={handleSaveNewAddress} className="px-6 py-2 bg-teal-700 text-white rounded-lg">Simpan</button>
                  </div>
                </div>
              )}

              {!isAddingNew && editingAddress === null && (
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="w-full border border-dashed border-gray-400 rounded-lg py-6 text-gray-600 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <span className="text-2xl">+</span> Tambah Alamat Baru
                </button>
              )}
            </div>

            <div className="p-5 border-t flex justify-between">
              <button
                onClick={() => {
                  setShowAddressModal(false);
                  setIsAddingNew(false);
                  setEditingAddress(null);
                }}
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium"
              >
                Batalkan
              </button>
              <button
                onClick={() => setShowAddressModal(false)}
                disabled={!selectedAddress}
                className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold disabled:bg-gray-400"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

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

export default CheckoutPage;