import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    // ==========================================
    // VALIDASI
    // ==========================================

    if (!name.trim() || !email.trim() || !password) {
      setError("Nama, email, dan password harus diisi.");
      setLoading(false);
      return;
    }

    try {
      // ==========================================
      // AMBIL DATA USER DARI EXPRESS
      // ==========================================

      const response = await axios.get(
        "http://localhost:5001/users"
      );

      const users = response.data;

      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();

      // ==========================================
      // CARI USER BERDASARKAN EMAIL & PASSWORD
      // Nama TIDAK digunakan untuk autentikasi
      // ==========================================

      const user = users.find(
        (u) =>
          u.email.toLowerCase() === cleanEmail &&
          u.password === password
      );

      // ==========================================
      // USER DITEMUKAN
      // ==========================================

      if (user) {
        // Simpan data login
        localStorage.setItem(
          "token",
          "mock-token-" + user.id
        );

        localStorage.setItem(
          "userId",
          user.id.toString()
        );

        localStorage.setItem(
          "email",
          user.email
        );

        // Nama dari data user/server
        localStorage.setItem(
          "name",
          user.name || cleanName || "User"
        );

        localStorage.setItem(
          "role",
          user.role || "user"
        );

        console.log("Login berhasil:", user);

        // ==========================================
        // REDIRECT BERDASARKAN ROLE
        // ==========================================

        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/miyoot");
        }
      } else {
        setError("Email atau password salah.");
      }
    } catch (err) {
      console.error("Login gagal:", err);

      setError(
        "Tidak dapat menghubungi server. Pastikan server Express berjalan di http://localhost:5001"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <nav className="flex justify-between items-center p-4 bg-gray-200 shadow-md">
        <img
          src="/Images/logo1.png"
          alt="Logo"
          className="h-16"
        />
      </nav>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="flex flex-1 flex-col md:flex-row items-center justify-center px-8 py-10">

        {/* LOGO KIRI */}

        <div className="hidden md:flex flex-1 justify-center">
          <img
            src="/Images/logo1.png"
            alt="Logo"
            className="w-36 h-36 object-contain"
          />
        </div>

        {/* FORM LOGIN */}

        <div className="flex flex-1 justify-center w-full">

          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm border">

            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Log in
            </h2>

            {/* ERROR */}

            {error && (
              <p className="text-red-500 text-center mb-4">
                {error}
              </p>
            )}

            <form
              onSubmit={loginHandler}
              className="space-y-4"
            >

              {/* ==========================================
                  NAMA
              ========================================== */}

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Nama
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Masukkan nama"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              {/* ==========================================
                  EMAIL
              ========================================== */}

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Masukkan email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              {/* ==========================================
                  PASSWORD
              ========================================== */}

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Masukkan password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              {/* ==========================================
                  BUTTON
              ========================================== */}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg font-medium transition duration-300 ${
                  loading
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {loading
                  ? "Memproses..."
                  : "Log in"}
              </button>

            </form>

            {/* ==========================================
                REGISTER
            ========================================== */}

            <p className="mt-6 text-center text-gray-600">
              Belum punya akun?{" "}

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-500 hover:underline font-medium"
              >
                Register
              </button>
            </p>

            {/* ==========================================
                INFO ADMIN
            ========================================== */}

            <p className="mt-4 text-center text-sm text-gray-500">
              Admin: admin@miyoot.com / admin123
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;