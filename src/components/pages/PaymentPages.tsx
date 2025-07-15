import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PaymentsButton from "../fragments/PaymentsButton";

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Simpan query params dalam state supaya data tidak hilang saat terjadi re-render
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    setProductInfo({
      title: searchParams.get("title") ?? "Unknown Product",
      price: searchParams.get("price") ?? "0",
      image: searchParams.get("image") ?? "https://via.placeholder.com/150",
    });
  }, [searchParams]);

  // State untuk error dan status pembayaran
  const [error, setError] = useState<string | null>(null);
  const [cardInfo, setCardInfo] = useState({
    first_name: "",
    email: "",
    phone: "",
  });
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "failed" | null
  >(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Jika input kosong, hanya tampilkan error, tapi data produk tetap ada
    if (!cardInfo.first_name || !cardInfo.email) {
      setError("Nama dan nomor kartu harus diisi");
      setPaymentStatus(null); // Reset status pembayaran
      return; // Hentikan eksekusi fungsi tanpa mengubah state lainnya
    }

    setError(null); // Hapus error jika input valid

    // Simulasi sukses pembayaran
    const isPaymentSuccessful = Math.random() > 0.5;
    setPaymentStatus(isPaymentSuccessful ? "success" : "failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Pembayaran</h2>

        {/* Tampilan Produk */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={productInfo?.image || "https://via.placeholder.com/150"}
            alt={productInfo.title}
            className="w-24 h-24 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg font-medium">{productInfo.title}</h3>
          <p className="text-sm text-gray-600">Harga: Rp{productInfo.price}</p>
        </div>

        {/* Form Pembayaran */}
        <form onSubmit={handlePayment}>
          <label className="block mb-2 text-sm font-medium" id="name">
            full name
            <input
              type="text"
              name="first_name"
              value={cardInfo.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Masukkan nama"
            />
          </label>

          <label className="block mb-2 text-sm font-medium">email</label>
          <input
            type="email"
            name="email"
            value={cardInfo.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
          <label className="block mb-2 text-sm font-medium">nomor hp</label>
          <input
            type="text"
            name="phone"
            value={cardInfo.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
            placeholder="92589258352"
          />

          <PaymentsButton
            cartTotal={parseInt(productInfo.price)}
            cardInfo={cardInfo}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Bayar Sekarang
          </PaymentsButton>
        </form>

        {/* Notifikasi Error */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Notifikasi Pembayaran */}
        {paymentStatus === "success" && (
          <div className="mt-4 bg-green-100 text-green-700 py-2 px-4 rounded-md text-center">
            Pembayaran berhasil untuk produk{" "}
            <strong>{productInfo.title}</strong>! 🎉
          </div>
        )}
        {paymentStatus === "failed" && (
          <div className="mt-4 bg-red-100 text-red-700 py-2 px-4 rounded-md text-center">
            Pembayaran gagal. Silakan coba lagi! 😢
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
