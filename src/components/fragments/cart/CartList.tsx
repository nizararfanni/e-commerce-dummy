import { Link, useNavigate } from "react-router-dom";
import { UseQuantity, UseQuantityDispatch } from "../../../hooks/UseCartItems";
import { FaTrash } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

const CartList = () => {
  const dispatch = UseQuantityDispatch();
  const cartContextItems = UseQuantity() || [];

  const navigate = useNavigate();

  //fungsi buat buy product
  const handleBuy = () => {
    if (!cartContextItems.length) return;
    //simpan data  ke local storage
    localStorage.setItem("cartItems", JSON.stringify(cartContextItems));
    navigate("/bayar");
  };
  {
    console.log("cart context items", cartContextItems);
  }

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
                <p className="text-white">${item.price}</p>
              </div>
              <div className="flex flex-col mx-4">
                <div>
                  <button
                    className="mr-2 text-2xl font-bold"
                    onClick={() =>
                      dispatch({
                        type: "decrese_quantity",
                        payload: { ...item, id: String(item.id) },
                      })
                    }
                  >
                    -
                  </button>
                  Qty:{" "}
                  {cartContextItems.find((qtyi) => qtyi.id === item.id)
                    ?.quantity ?? 1}{" "}
                  <button
                    className="mr-2 text-2xl font-bold"
                    onClick={() =>
                      dispatch({
                        type: "add_quantity",
                        payload: { ...item, id: String(item.id) },
                      })
                    }
                  >
                    +
                  </button>
                </div>
                <div>
                  total: Rp.{" "}
                  {(item.price * (item.quantity ?? 1)).toLocaleString("id-ID")}
                </div>
              </div>
              <div className="flex flex-col  ">
                <button
                  className="text-white hover:text-red-500 hover:underline "
                  onClick={() =>
                    dispatch({
                      type: "deleted_product",
                      payload: { ...item, id: String(item.id) },
                    })
                  }
                >
                  <FaTrash />
                </button>
                <button
                  className="text-red-500 hover:underline mt-4"
                  onClick={handleBuy}
                >
                  <FcCheckmark />
                </button>
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
