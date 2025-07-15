import { Link } from "react-router-dom";
import { UseQuantity, UseQuantityDispatch } from "../../../hooks/UseCartItems";


const CartList = () => {
  const dispatch = UseQuantityDispatch();
  const cartContextItems = UseQuantity() || [];

  // const navigate = useNavigate();

  //fungsi buat buy product
  const handleBuy = () => {
    // if (cartItems.length > 0) {
    //   navigate(
    //     `/bayar?title=${cartItems[0].title}&price=${cartItems[0].price}&image=${cartItems[0].image}`
    //   );
    // } else {
    //   alert("Keranjang kosong!");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-700 text-white flex flex-col items-center py-8">
      <h1 className="text-3xl mb-8 font-bold">Your Cart</h1>
      {cartContextItems?.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-lg space-y-4">
          {cartContextItems?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1 mx-4">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-gray-500">${item.price}</p>
              </div>
              <div className="flex flex-col mx-4">
                <div>
                  Qty:{" "}
                  {cartContextItems.find((qtyi) => qtyi.id === item.id)
                    ?.quantity ?? 1}
                </div>
                <div>
                  total: Rp.{" "}
                  {(item.price * (item.quantity ?? 1)).toLocaleString("id-ID")}
                </div>
              </div>
              <div className="flex flex-col  ">
                <button
                  className="text-red-500 hover:underline border-b-2 border-white"
                  onClick={() =>
                    dispatch({
                      type: "deleted_product",
                      payload: { ...item, id: String(item.id) },
                    })
                  }
                >
                  Remove
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={handleBuy}
                >
                  Buy
                </button>
                <div>
                  {" "}
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() =>
                      dispatch({
                        type: "add_quantity",
                        payload: { ...item, id: String(item.id) },
                      })
                    }
                  >
                    +
                  </button>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() =>
                      dispatch({
                        type: "decrese_quantity",
                        payload: { ...item, id: String(item.id) },
                      })
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link
        to={`/bayar`}
        className="mt-8 text-black border-black border-2 p-2.5 bg-white hover:bg-gray-400 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:text-white active:bg-gray-400 rounded-md"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartList;
