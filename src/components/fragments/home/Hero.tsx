import { Link } from "react-router-dom";
import Beams from "../../react-Layouts/Beams";
import { useState } from "react";
import { UseGetAllProduct } from "../../../hooks/UseGetProduct";
import SpotlightCard from "../../react-Layouts/SpotlightCard";

const Hero: React.FC = () => {
  const { product, isLoading } = UseGetAllProduct();
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };

  //filter serach product
  const query = search.trim().toLowerCase();
  const filteredProducts = query
    ? product.filter((product) => product.name.toLowerCase().includes(query))
    : [];
  console.log("filteredProducts", filteredProducts);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Beams
        beamWidth={1}
        beamHeight={25}
        beamNumber={22}
        lightColor="white"
        speed={2}
        noiseIntensity={3.75}
        scale={0.2}
        rotation={40}
      />

      <div className="absolute  flex flex-col justify-center items-center min-h-screen py-12 left-0 top-0 right-0 w-full z-30">
        <div className="flex justify-center items-center w-full">
          {/* input search */}
          <div className="relative w-full max-w-xl">
            <label
              htmlFor="search"
              className="flex items-center gap-3 px-6 py-2 w-full text-white backdrop-blur-lg border-2 border-white/40 rounded-[25px]"
            >
              <input
                type="search"
                onChange={handleSearch}
                value={search}
                placeholder="Search product"
                className="bg-transparent pl-0 pr-16 py-3 w-full text-white font-bold focus:outline-none"
              />
              <Link to={"/#"} className="hover:underline">
                Home
              </Link>
              <Link to={"/#"} className="hover:underline">
                Docs
              </Link>
            </label>

            {/* hasil pencarian */}
            {query && (
              <div className="absolute top-full left-0 mt-2 w-full z-50 bg-gray-700 backdrop-blur-lg border border-white/40 rounded-lg max-h-[300px] overflow-y-scroll p-4">
                {isLoading ? (
                  <p className="text-white text-center">Loading...</p>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map((item) => (
                      <Link to={`/detail/${item.id}`} key={item.id}>
                        <SpotlightCard
                          className="p-4 bg-white"
                          spotlightColor="rgba(0, 222, 255, 0.9)"
                        >
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL_IMG}/${
                              item.images ?? ""
                            }`}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <div className="mt-2">
                            <h3 className="font-semibold line-clamp-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-400">
                              {item.category ?? "T-Shirt"}
                            </p>
                            <p className="text-sm font-bold mt-1">
                              Rp {item.price.toLocaleString("id-ID")}
                            </p>
                          </div>
                        </SpotlightCard>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">
                    Produk tidak ditemukan
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center flex-col text-white py-12">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to our online store
          </h2>
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
      </div>
    </div>
  );
};

export default Hero;
