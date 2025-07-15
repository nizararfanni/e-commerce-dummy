import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-700 py-20 text-center text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4">Welcome to our online store</h2>
        <p className="text-lg mb-6">
          Temukan koleksi baju, celana, dan aksesoris terbaru dengan harga
          terbaik. Dapatkan produk berkualitas dengan harga terbaik
        </p>
        <a
          href="/products"
          className="h-12 text-black font-bold  p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] shadow-[12px_12px_0px_rgba(0,0,0,1)] shadow-gray-400 active:bg-[#00E1EF]"
        >
          Belanja Sekarang
        </a>
      </div>
    </section>
  );
};

export default Hero;
