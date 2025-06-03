import { useNavigate, useParams } from "react-router-dom";
import { UseDetailProduct } from "../../hooks/UseGetProduct";

const DetailPages = () => {
  const { id } = useParams<{ id: string }>();
  const { detailProduct, isLoading } = UseDetailProduct(Number(id));
  const navigate = useNavigate();


  // Fungsi untuk melakukan pembayaran
  const handleBuy = () => {
    if (!detailProduct?.title || !detailProduct?.image) {
      console.error("Title or image is undefined!");
      return;
    }

    navigate(
      `/bayar?title=${encodeURIComponent(
        detailProduct?.title
      )}&price=${detailProduct?.price}&image=${encodeURIComponent(
        detailProduct?.image
      )}`
    );
  };


  //fungsi untuk nambah ke keranjang
  const handleAddToCart = () => {
    if (!detailProduct?.title || !detailProduct?.image) {
      console.error("Title or image is undefined!");
      return;
    }
    const newItems = {
      title: detailProduct?.title,
      price: detailProduct?.price,
      image: detailProduct?.image,
    };
//mengambil data KALO ADA
    const currentItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    //set ke local storage
    localStorage.setItem(
      "cartItems",
      JSON.stringify([...currentItems, newItems])
    );
    console.log("Item added to cart:", newItems);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EFEEEA]">
      <div className="w-96  px-8 py-4  border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center">
        <div className="flex justify-center items-center flex-col h-full">
          <h1 className="text-2xl mb-4 font-bold">{detailProduct?.title}</h1>
          {isLoading ? (
            <div>loading........</div>
          ) : (
            <div className="flex justify-center items-center ">
              {detailProduct && (
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={detailProduct.image}
                    alt={detailProduct.title}
                    className="w-64 h-64 object-top items-center"
                  />
                  <p className="line-clamp-3 text-sm py-2">
                    {detailProduct.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-gray-400">
                    <p>Price: {detailProduct.price}$</p>
                    <p>Rate: {detailProduct?.rating?.rate}</p>
                    <p>Count: {detailProduct?.rating.count}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-center items-center gap-4 mx-auto w-32">
            <button className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full" onClick={handleAddToCart}>
              AddToCart
            </button>
            <button
              className="h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] rounded-full"
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
