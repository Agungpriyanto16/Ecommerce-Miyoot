import React from "react";

const BankCard = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Kartu Kredit / Debit</h1>
      <p className="mb-4">kamu belum memiliki kartu yang terdaftar</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded">
        + Tambahkan Kartu Kredit / Debit Baru
      </button>

      <h1 className="text-xl font-bold mt-8 mb-4">BCA OneKlik</h1>
      <p className="mb-4">kamu belum memiliki kartu yang terdaftar</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded">
        + Tambah Kartu BCA OneKlik Baru
      </button>
    </div>
  );
};

export default BankCard;
