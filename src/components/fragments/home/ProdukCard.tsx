import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
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
              src={product.image}
              alt={product.title}
              className="w-64 h-64 object-top object-cover"
            />
          </figure>

          {/* Bagian Deskripsi */}
          <div className="px-6 py-5 text-left flex-grow overflow-hidden">
            <p className="text-base mb-4">{product.category}</p>
            <h1 className="text-sm mb-4 line-clamp-2">{product.title}</h1>
            <p className="text-xs mb-4 line-clamp-3 truncate">
              {product.description}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProductCard;
