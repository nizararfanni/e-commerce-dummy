import SpotlightCard from "../../react-Layouts/SpotlightCard";

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
    <div className="text-white w-[300px] md:w-80 h-[450px] border-black border-2 rounded-md hover:shadow-[18px_18px_0px_rgba(255,255,255,1)] shadow-white/80  ">
      <SpotlightCard
        className="block cursor-pointer rounded-md  bg-white items-center justify-center w-full h-full"
        spotlightColor="rgba(0, 222, 255, 0.9)"
      >
        <div className="w-full flex flex-col justify-between">
          {/* Bagian Gambar */}
          <div className="w-full h-1/2 border-black border-b-2">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL_IMG}/${product.images}`}
              alt={product.name}
              className="w-64 h-64 object-top object-cover"
            />
          </div>
          {/* Bagian Deskripsi */}
          <div className="px-6 py-5 text-[17px] text-left flex-grow overflow-hidden">
            <div className="mb-2 flex justify-between ">
              <h1 className=" mb-2 text-black font-semibold line-clamp-2">
                {product.name}
              </h1>
              <p className=" mb-4 text-gray-500">
                {product.category || "T-Shirt"}
              </p>
            </div>
            <div className="flex items-center justify-between mt-2  text-gray-600">
              <p className="font-bold text-black">
                Rp. {product.price.toLocaleString("id-ID")}
              </p>
              {product.count >= 0 && (
                <p className="text-xs text-gray-500">{product.count} dibeli</p>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default ProductCard;
