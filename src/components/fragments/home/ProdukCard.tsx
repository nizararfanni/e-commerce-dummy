import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  images?: string;
  description: string;
  category: string;
  count: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-[300px] md:w-80 h-[450px] border-black border-2 rounded-md hover:shadow-[18px_18px_0px_rgba(0,0,0,1)] shadow-gray-400 bg-gray-300">
      <div className="block cursor-pointer">
        <article className="w-full h-full p-4 flex flex-col justify-between">
          {/* Bagian Gambar */}
          <figure className="w-full h-1/2 border-black border-b-2">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL_IMG}/${product.images}`}
              alt={product.name}
              className="w-64 h-64 object-top object-cover"
            />
          </figure>

          {/* Bagian Deskripsi */}
          <div className="px-6 py-5 text-[17px] text-left flex-grow overflow-hidden">
            <div className="mb-2 flex justify-between ">
              <h1 className=" mb-2 font-semibold line-clamp-2">
                {product.name}
              </h1>
              <p className=" mb-4 text-gray-500">
                {product.category || "T-Shirt"}
              </p>
            </div>
            <div className="flex items-center justify-between mt-2  text-gray-600">
              <p className="font-bold text-blue-700">
                Rp. {product.price.toLocaleString("id-ID")}
              </p>
              {product.count >= 0 && (
                <p className="text-xs text-gray-500">{product.count} dibeli</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProductCard;
