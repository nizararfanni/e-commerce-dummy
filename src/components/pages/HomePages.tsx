import ProductCard from "../fragments/home/ProdukCard";
import Footer from "../fragments/home/Footer";
import Hero from "../fragments/home/Hero";
import { UseGetAllProduct } from "../../hooks/UseGetProduct";
import { Link } from "react-router-dom";

const HomePages = () => {
  const { product, isLoading } = UseGetAllProduct();

  return (
    <div>
      <Hero />
      <hr className="border-gray-400 border-2" />
      <section className="container mx-auto py-10 bg-gray-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Produk Terbaru
        </h2>
        {isLoading ? (
          <>Loading......</>
        ) : (
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
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
