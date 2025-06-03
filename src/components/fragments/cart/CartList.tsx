import { useEffect, useState } from "react";
import { CiShop } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

interface CartItem {
  title: string;
  price: number;
  image: string;
}

const CartList = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedCart);
  }, []);

  //fungsi hapus items di keranjang
  const handleRemoveCart = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  //fungsi buat buy product
  const handleBuy = () => {
   if (cartItems.length > 0) {
     navigate(
       `/bayar?title=${cartItems[0].title}&price=${cartItems[0].price}&image=${cartItems[0].image}`
     );
   } else {
     alert("Keranjang kosong!");
   }

  };

  return (
    <div className="min-h-screen bg-[#EFEEEA] flex flex-col items-center py-8">
      <h1 className="text-3xl mb-8 font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-lg space-y-4">
          {cartItems.map((item, index) => (
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
              <div className="flex flex-col  ">
                <button
                  className="text-red-500 hover:underline border-b-2 border-white"
                  onClick={() => handleRemoveCart(index)}
                >
                  Remove
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={handleBuy}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link
        to={`/bayar`}
        className="mt-8 px-6 py-2 bg-[#A6FAFF] hover:bg-[#79F7FF] rounded-full border border-black"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartList;
