import { useNavigate, useParams } from "react-router-dom";
import { UseDetailProduct } from "../../hooks/UseGetProduct";
import { UseQuantityDispatch } from "../../hooks/UseCartItems";

const DetailPages = () => {
  const { id } = useParams<{ id: string }>();
  const { detailProduct, isLoading } = UseDetailProduct(Number(id));
  const dispatch = UseQuantityDispatch();
  const navigate = useNavigate();

  // Fungsi untuk melakukan pembayaran
  const handleBuy = () => {
    if (!detailProduct?.title || !detailProduct?.image) {
      console.error("Title or image is undefined!");
      return;
    }

    navigate(
      `/bayar?title=${encodeURIComponent(detailProduct?.title)}&price=${
        detailProduct?.price
      }&image=${encodeURIComponent(detailProduct?.image)}`
    );
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
  {
    console.log(detailProduct);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700">
      <div className="w-96 bg-gray-300  px-8 py-4  shadow-[18px_18px_0px_rgba(0,0,0,1)] grid place-content-center shadow-gray-400">
        <div className="flex justify-center items-center flex-col h-full">
          <h1 className="text-2xl mb-4 font-bold">{detailProduct?.title}</h1>
          {isLoading ? (
            <div>loading........</div>
          ) : (
            <div className="flex justify-center items-center ">
              {detailProduct && (
                <div className="flex flex-col gap-4 justify-center items-center">
                  <img
                    src={detailProduct.image}
                    alt={detailProduct.title}
                    className="w-64 h-64 object-top items-center"
                  />
                  <p className="line-clamp-3 text-sm py-2">
                    {detailProduct.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-black font-bold">
                    <p>Price: {detailProduct.price}$</p>
                    <p>Rate: {detailProduct?.rating?.rate}</p>
                    <p>Count: {detailProduct?.rating.count}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-center items-center py-5 gap-4 mx-auto w-32">
            <button
              className="h-12 border-black border-2 p-2.5 bg-white hover:bg-gray-400 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:text-white active:bg-gray-400 rounded-md"
              onClick={handleAddToCart}
            >
              AddToCart
            </button>
            <button
              className="h-12 border-black border-2 p-2.5 bg-white hover:bg-gray-400 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:text-white active:bg-gray-400 rounded-md"
              onClick={handleBuy}
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
