import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    // ==========================================
    // VALIDASI INPUT
    // ==========================================

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Semua kolom harus diisi.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    try {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();

      // ==========================================
      // CEK EMAIL KE SERVER
      // ==========================================

      const checkResponse = await axios.get(
        `http://localhost:5001/users?email=${encodeURIComponent(
          cleanEmail
        )}`
      );

      if (
        checkResponse.data &&
        checkResponse.data.length > 0
      ) {
        setError(
          "Email sudah digunakan. Silakan gunakan email lain."
        );

        setLoading(false);
        return;
      }

      // ==========================================
      // REGISTER USER
      // ==========================================

      const response = await axios.post(
        "http://localhost:5001/users",
        {
          name: cleanName,
          email: cleanEmail,
          password: password,
        }
      );

      console.log("Registrasi berhasil:", response.data);

      setSuccess(
        "Registrasi berhasil! Mengalihkan ke halaman login..."
      );

      // Kosongkan form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // ==========================================
      // PINDAH KE LOGIN
      // ==========================================

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Registrasi gagal:", err);

      if (err.response) {
        if (err.response.status === 409) {
          setError(
            "Email sudah digunakan. Silakan gunakan email lain."
          );
        } else {
          setError(
            err.response.data?.message ||
              "Registrasi gagal."
          );
        }
      } else {
        setError(
          "Tidak dapat menghubungi server. Pastikan server Express berjalan di http://localhost:5001"
        );
      }
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

        {/* FORM REGISTER */}

        <div className="flex flex-1 justify-center w-full">

          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm border">

            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Register
            </h2>

            {/* ERROR */}

            {error && (
              <p className="text-red-500 text-center mb-4">
                {error}
              </p>
            )}

            {/* SUCCESS */}

            {success && (
              <p className="text-green-500 text-center mb-4">
                {success}
              </p>
            )}

            <form
              onSubmit={registerHandler}
              className="space-y-4"
            >

              {/* NAMA */}

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
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              {/* EMAIL */}

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
                  placeholder="contoh@email.com"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              {/* PASSWORD */}

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
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              {/* KONFIRMASI PASSWORD */}

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Konfirmasi Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Ketik ulang password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              {/* BUTTON */}

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
                  ? "Mendaftar..."
                  : "Register"}
              </button>

            </form>

            {/* LINK LOGIN */}

            <p className="mt-6 text-center text-gray-600">
              Sudah punya akun?{" "}

              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-blue-500 hover:underline font-medium"
              >
                Login di sini
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;