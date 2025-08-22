import ProductCard from "../fragments/home/ProdukCard";
import Footer from "../fragments/home/Footer";
import Hero from "../fragments/home/Hero";
import { UseGetAllProduct } from "../../hooks/UseGetProduct";
import { Link } from "react-router-dom";

const HomePages = () => {
  const { product, isLoading } = UseGetAllProduct();



  return (
    <div className="">
      <Hero></Hero>
      <section className=" border-t-2 border-white bg-gray-700  mx-auto py-10 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Produk Terbaru
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-[300px] md:w-80 h-[450px] border-black border-2 rounded-md shadow-white/80 animate-pulse bg-white"
              >
                <div className=" rounded-md w-full h-full flex flex-col justify-between">
                  {/* Skeleton Gambar */}
                  <div className="w-full h-1/2 border-black border-b-2 bg-gray-300" />

                  {/* Skeleton Deskripsi */}
                  <div className="px-6 py-5 text-left flex-grow space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-2/3 bg-gray-300 rounded" />
                      <div className="h-4 w-1/4 bg-gray-300 rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-1/2 bg-gray-300 rounded" />
                      <div className="h-3 w-1/4 bg-gray-300 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
            {product.map((product) => (
              <Link to={`/detail/${product.id}`} key={product.id}>
                <ProductCard key={product.id} product={product} />
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default HomePages;
