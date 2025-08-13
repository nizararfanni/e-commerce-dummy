import { useNavigate, useParams } from "react-router-dom";
import { UseDetailProduct } from "../../hooks/UseGetProduct";
import { UseQuantityDispatch } from "../../hooks/UseCartItems";

const DetailPages = () => {
  const { id } = useParams<{ id: string }>();
  const { detailProduct, isLoading } = UseDetailProduct(Number(id));
  const dispatch = UseQuantityDispatch();
  const navigate = useNavigate();

  //validasi produk adas sebelum beli
  const isProductValid =
    !!detailProduct?.id &&
    typeof detailProduct?.price === "number" &&
    detailProduct.price > 0;
  // Fungsi untuk melakukan pembayaran
  const handleBuy = () => {
    if (!isProductValid) {
      console.error("Product ID or price invalid");
      return;
    }
    //simpan single produk ke local storage
    localStorage.setItem("singleProduct", JSON.stringify(detailProduct));
    navigate(`/buyer/payment?mode=single`);
  };

  //fungsi untuk nambah ke keranjang
  const handleAddToCart = () => {
    if (detailProduct) {
      dispatch({
        type: "add_product",
        payload: {
          ...detailProduct,
          id: String(detailProduct.id),
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700">
      <div className="w-96 bg-gray-300 rounded-md  px-8 py-4  shadow-[18px_18px_0px_rgba(0,0,0,1)] grid place-content-center shadow-gray-400">
        <div className="flex justify-center items-center flex-col h-full">
          <h1 className="text-2xl mb-4 font-bold">{detailProduct?.name}</h1>
          {isLoading ? (
            <div>loading........</div>
          ) : (
            <div className="flex justify-center items-center">
              {detailProduct && (
                <div className="flex flex-col items-center gap-4 w-full max-w-md px-4 py-6">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL_IMG}/${
                      detailProduct.images
                    }`}
                    alt={detailProduct.name}
                    className="w-64 h-64 object-cover rounded-md"
                  />

                  <h2 className="text-lg font-semibold text-center">
                    {detailProduct.name}
                  </h2>

                  <p className="line-clamp-3 text-sm text-gray-600 text-center">
                    {detailProduct.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 w-full text-sm font-medium text-gray-800">
                    <p className="text-blue-700">
                      Rp {detailProduct.price.toLocaleString("id-ID")}
                    </p>
                    <p>⭐ {detailProduct.rate || 4.5}/5</p>
                    <p>🛒 {detailProduct.count || 100}x</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-center items-center py-5 gap-4 mx-auto w-32">
            <button
              className="h-12 border-black border-2 p-2.5 bg-white hover:bg-[#00E1EF] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:text-white active:bg-gray-400 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={!detailProduct}
            >
              AddToCart
            </button>
            <button
              className="h-12 border-black border-2 p-2.5 bg-white hover:bg-[#00E1EF] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:text-white active:bg-gray-400 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBuy}
              disabled={!isProductValid}
            >
              BuyNow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPages;
