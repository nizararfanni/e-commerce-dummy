import React, { useState, useEffect } from "react";
import PaymentsButton from "../fragments/PaymentsButton";
import { useSearchParams } from "react-router-dom";
import SpotlightCard from "../react-Layouts/SpotlightCard";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string;
  title: string;
};
type ProductType = {
  mode: "single" | " multi";
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
  const [urlSearchParams] = useSearchParams();
  const mode = urlSearchParams.get("mode") as ProductType["mode"];
  console.log("mode", mode);

  useEffect(() => {
    //jika ada produk single
    if (mode === "single") {
      const singleProduct = localStorage.getItem("singleProduct");
      if (singleProduct) {
        const parsedProduct = JSON.parse(singleProduct) as Product;
        setProducts([parsedProduct]);
      }
    } else {
      const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        const parsedItems = JSON.parse(cartItems) as Product[];
        setProducts(parsedItems);
      }
    }
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
    //hapus produk
    localStorage.removeItem("singleProduct");

    // Simulasi sukses pembayaran
    const isPaymentSuccessful = Math.random() > 0.5;
    setPaymentStatus(isPaymentSuccessful ? "success" : "failed");
  };
  //harga total
  const totalPrice = Math.round(
    products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );
  const formatIdrTotal = totalPrice.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <SpotlightCard spotlightColor="rgba(0, 222, 255, 0.9)" className="w-full max-w-md bg-gray-300 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Pembayaran</h2>

        {/* Tampilan Produk */}
        <div className="flex flex-col mb-4 w-full">
          {products.length === 0 && (
            <p className="text-center text-sm text-gray-700">
              Tidak ada produk untuk dibayar.
            </p>
          )}
          {products.map((product, index) => {
            const total = product.price * product.quantity;
            const imgSrc = product.images
              ? `${import.meta.env.VITE_API_BASE_URL_IMG}/${product.images}`
              : product.name;

            return (
              <div key={index} className="mb-4 flex gap-3 max-w-md">
                <img
                  src={imgSrc}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md mb-2"
                />
                <div className="flex justify-start flex-1 w-full flex-col">
                  <h3 className="text-sm font-medium">
                    Produk: {product.name.toUpperCase()}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Qty: {product.quantity}
                  </p>
                  <p className="text-sm font-semibold">
                    Subtotal{" "}
                    {total.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        {products.length > 0 && (
          <div className="flex justify-between items-center border-t border-gray-400 pt-3 mb-4 text-sm font-semibold">
            <span>Total</span>
            <span> {formatIdrTotal}</span>
          </div>
        )}

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
      </SpotlightCard>
    </div>
  );
};

export default PaymentPage;
