import React, { useState, useEffect } from "react";
import PaymentsButton from "../fragments/PaymentsButton";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
  title: string;
};

const PaymentPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    const product = localStorage.getItem("cartItems");
    if (!product) return;
    setProducts(JSON.parse(product));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Jika input kosong, hanya tampilkan error, tapi data produk tetap ada
    if (!cardInfo.first_name || !cardInfo.email) {
      setError("Nama dan nomor kartu harus diisi");
      // Reset status pembayaran
      setPaymentStatus(null);
      return;
    }
    // Hapus error jika input valid
    setError(null);

    // Simulasi sukses pembayaran
    const isPaymentSuccessful = Math.random() > 0.5;
    setPaymentStatus(isPaymentSuccessful ? "success" : "failed");
  };

  // {
  //   console.log(products);
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="w-full max-w-md bg-gray-300 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Pembayaran</h2>

        {/* Tampilan Produk */}
        <div className="flex flex-col items-center mb-4">
          {products.map((product, index) => {
            const totalPrice = Math.round(
              product.price * product.quantity * 1000
            ).toLocaleString("id-ID");
            return (
              <div
                key={index}
                className="mb-4 flex justify-center flex-col items-center"
              >
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL_IMG}/${
                    product?.images
                  }`}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">Harga: Rp{totalPrice}</p>
              </div>
            );
          })}
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
            cartTotal={products.reduce(
              (total, product) => total + product.price * product.quantity,
              0
            )}
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
            <strong>
              {products.map((product) => product.title).join(", ")}
            </strong>
            ! 🎉
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
