import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Load data dari localStorage saat mount
  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    const storedEmail = localStorage.getItem("email") || "-";
    const storedImage =
      sessionStorage.getItem("profileImage") ||
      localStorage.getItem("profileImage");

    setName(storedName);
    setEmail(storedEmail);
    if (storedImage) setProfileImage(storedImage);
  }, []);

  // Handle upload gambar profil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar (JPEG/PNG)");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Ukuran gambar maksimal 1 MB!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setProfileImage(imageData);
      sessionStorage.setItem("profileImage", imageData);
      localStorage.setItem("profileImage", imageData);
      window.dispatchEvent(new Event("storage"));
    };
    reader.readAsDataURL(file);
  };

  // Handle simpan perubahan nama & email (update ke server)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);

    if (!name.trim()) {
      alert("Nama tidak boleh kosong!");
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      alert("Email tidak boleh kosong!");
      setLoading(false);
      return;
    }

    try {
      const currentEmail = localStorage.getItem("email");
      if (!currentEmail) {
        alert("Sesi login tidak ditemukan. Silakan login ulang.");
        navigate("/login");
        setLoading(false);
        return;
      }

      // Ambil semua user dari server
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;

      // Cari user saat ini berdasarkan email di localStorage
      const currentUser = users.find((u) => u.email === currentEmail);

      if (!currentUser) {
        alert("Akun tidak ditemukan di server. Silakan login ulang.");
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
        setLoading(false);
        return;
      }

      // Validasi: email baru tidak boleh sudah dipakai orang lain
      const emailExists = users.find(
        (u) => u.email === email.trim() && u.id !== currentUser.id
      );

      if (emailExists) {
        alert("Email ini sudah digunakan oleh akun lain!");
        setLoading(false);
        return;
      }

      // Update data user di server
      await axios.patch(`http://localhost:5000/users/${currentUser.id}`, {
        name: name.trim(),
        email: email.trim(),
      });

      // Update localStorage dengan data baru
      localStorage.setItem("name", name.trim());
      localStorage.setItem("email", email.trim());

      setSuccess("Profil berhasil diperbarui! 🎉");
      window.dispatchEvent(new Event("storage"));

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui profil. Pastikan json-server sedang berjalan di port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Profil Saya</h1>
      <p className="text-gray-600 mb-8">
        Kelola informasi profil Anda untuk pengalaman belanja yang lebih personal dan aman.
      </p>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Kolom Kiri: Form Input */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-700 transition"
                placeholder="Masukkan nama lengkap"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-700 transition"
                placeholder="Masukkan alamat email"
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                Anda dapat mengubah email di sini. Email baru akan digunakan untuk login selanjutnya.
              </p>
            </div>

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                {success}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-teal-700 text-white py-3 px-8 rounded-lg font-semibold hover:bg-teal-800 transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Foto Profil */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-4 border-teal-100 shadow-lg"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 border-4 border-teal-300 shadow-lg flex items-center justify-center">
                  <span className="text-5xl font-bold text-teal-700">
                    {name.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}

              <label className="absolute bottom-0 right-0 bg-teal-700 text-white p-3 rounded-full cursor-pointer hover:bg-teal-800 transition shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <p className="mt-6 text-sm text-gray-600 text-center">
              Klik ikon pensil untuk mengganti foto profil
            </p>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Format: <strong>JPEG, PNG</strong> | Maks: <strong>1 MB</strong>
            </p>
          </div>
        </form>
      </div>

      <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-lg">
        <p className="text-sm text-teal-800">
          <strong>Tips:</strong> Gunakan nama asli dan foto profil yang jelas agar proses verifikasi dan pengiriman lebih lancar.
        </p>
      </div>
    </div>
  );
};

export default Profile;