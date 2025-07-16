// src/pages/About.tsx
import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-700 text-white  px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-2">Tentang Toko Baju</h1>
          <p className="text-lg text-white">
            Menemani Gaya Anda Setiap Hari
          </p>
        </section>

        {/* Sejarah */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Sejarah Kami</h2>
          <p className="leading-relaxed">
            Toko Baju didirikan pada tahun 2020 oleh sekelompok pecinta fashion
            dengan satu visi: menghadirkan busana berkualitas tinggi dengan
            harga terjangkau. Berawal dari gerai offline kecil, kini kami
            melayani pelanggan di seluruh Indonesia melalui platform online yang
            mudah diakses.
          </p>
        </section>

        {/* Visi & Misi */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Visi</h3>
            <p className=" leading-relaxed">
              Menjadi destinasi belanja busana online pilihan utama yang
              mengutamakan kualitas, inovasi, dan kepuasan pelanggan.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Misi</h3>
            <ul className="list-disc list-inside  space-y-1">
              <li>Menyediakan koleksi busana trendi dan timeless.</li>
              <li>
                Memberikan pengalaman belanja yang cepat, aman, dan
                menyenangkan.
              </li>
              <li>Menjaga kualitas produk dengan standar seleksi ketat.</li>
              <li>Memberdayakan usaha lokal dan desainer Indonesia.</li>
            </ul>
          </div>
        </section>

        {/* Nilai-Nilai Brand */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Nilai-Nilai Kami</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-black">
            <div className="p-4 bg-gray-50 rounded-md text-center">
              <h4 className="font-medium mb-1">Kualitas</h4>
              <p className=" text-sm">
                Hanya memilih bahan dan jahitan terbaik untuk kenyamanan Anda.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md text-center">
              <h4 className="font-medium mb-1">Keaslian</h4>
              <p className="text-sm">
                Setiap koleksi kami 100% original, tanpa kompromi.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md text-center">
              <h4 className="font-medium mb-1">Pelayanan</h4>
              <p className="text-sm">
                Responsif, ramah, dan selalu siap membantu Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Ajak Bergabung */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Bergabunglah dengan Kami
          </h2>
          <p className=" mb-6 leading-relaxed">
            Ikuti media sosial kami untuk update koleksi terbaru, promo
            eksklusif, dan inspirasi style harian.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Instagram
            </a>
            <a
              href="#"
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
              TikTok
            </a>
            <a
              href="#"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-black"
            >
              Facebook
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
