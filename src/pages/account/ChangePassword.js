import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validasi input
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Semua kolom harus diisi!");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password baru minimal 6 karakter!");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi tidak cocok!");
      setLoading(false);
      return;
    }

    try {
      // Ambil email user yang sedang login dari localStorage
      const currentEmail = localStorage.getItem("email");
      if (!currentEmail) {
        alert("Sesi login tidak ditemukan. Silakan login ulang.");
        navigate("/login");
        setLoading(false);
        return;
      }

      // Ambil data semua user dari json-server
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;

      // Cari user berdasarkan email
      const currentUser = users.find((u) => u.email === currentEmail);

      if (!currentUser) {
        alert("Akun tidak ditemukan di server. Silakan login ulang.");
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
        setLoading(false);
        return;
      }

      // Validasi password lama
      if (currentUser.password !== oldPassword) {
        setError("Password lama salah!");
        setLoading(false);
        return;
      }

      // Update password baru ke server
      await axios.patch(`http://localhost:5000/users/${currentUser.id}`, {
        password: newPassword,
      });

      // Berhasil!
      setSuccess("Password berhasil diubah! Gunakan password baru saat login berikutnya. 🎉");

      // Reset form
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Hilangkan pesan sukses setelah 5 detik
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error(err);
      setError("Gagal mengubah password. Pastikan json-server sedang berjalan di port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Ubah Password</h1>
      <p className="text-gray-600 mb-8">
        Pastikan password baru Anda kuat dan berbeda dari yang sebelumnya untuk menjaga keamanan akun.
      </p>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
          {/* Password Lama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Lama
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-700 transition"
              placeholder="Masukkan password lama"
              required
              disabled={loading}
            />
          </div>

          {/* Password Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-700 transition"
              placeholder="Masukkan password baru (min. 6 karakter)"
              required
              disabled={loading}
            />
          </div>

          {/* Konfirmasi Password Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-700 transition"
              placeholder="Ketik ulang password baru"
              required
              disabled={loading}
            />
          </div>

          {/* Pesan Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Pesan Sukses */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
              {success}
            </div>
          )}

          {/* Tombol Simpan */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-700 text-white py-3 px-8 rounded-lg font-semibold hover:bg-teal-800 transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Ubah Password"}
            </button>
          </div>
        </form>

        {/* Tips Keamanan */}
        <div className="mt-10 p-6 bg-teal-50 border border-teal-200 rounded-lg max-w-lg">
          <p className="text-sm text-teal-800">
            <strong>Tips Keamanan Password:</strong><br />
            • Gunakan minimal 6 karakter dengan kombinasi huruf besar/kecil, angka, dan simbol<br />
            • Jangan gunakan password yang sama di akun lain<br />
            • Ganti password secara berkala untuk keamanan lebih baik
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;