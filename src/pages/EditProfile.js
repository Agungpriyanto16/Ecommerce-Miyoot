import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // sesuaikan path

function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // ambil data dari localStorage
    const storedName = localStorage.getItem("name") || "";
    const storedEmail = localStorage.getItem("email") || "";
    setName(storedName);
    setEmail(storedEmail);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    // simpan perubahan ke localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    // kembali ke profile
    navigate("/profile");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="flex-grow flex justify-center py-10 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Edit Profil
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nama
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Simpan
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </main>

    </div>
  );
}

export default EditProfile;
