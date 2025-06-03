import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20 text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4">Welcome to our online store</h2>
        <p className="text-lg mb-6">
          Temukan koleksi baju, celana, dan aksesoris terbaru dengan harga
          terbaik. Dapatkan produk berkualitas dengan harga terbaik
        </p>
        <a
          href="/products"
          className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]"
        >
          Belanja Sekarang
        </a>
      </div>
    </section>
  );
};

export default Hero;
