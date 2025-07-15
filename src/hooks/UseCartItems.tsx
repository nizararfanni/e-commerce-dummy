import { createContext, useContext, useEffect, useReducer } from "react";

const CartItemsContext = createContext<CartItem[] | null>(null);

type CartDispatch = (action: CartAction) => void;
const CartDispatchContext = createContext<CartDispatch>(() => {});

interface CartItem {
  id: string;
  quantity?: number;
  price: number;
  [key: string]: any;
}

type CartAction = {
  type: string;
  payload: CartItem;
};

///fungsion buat nangin reducer
const CartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "add_quantity": {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    case "decrese_quantity": {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    case "add_product": {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }
    case "deleted_product":
      return state.filter((item) => item.id != action.payload.id);
    default:
      return state;
  }
};

interface CartItemsContextProviderProps {
  children: React.ReactNode;
}

export function CartItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, dispatch] = useReducer(CartReducer, [], () => {
    // ambil data dari local storage
    try {
      const raw = localStorage.getItem("cartItems");
      if (!raw || raw === "undefined") return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn("Gagal parse cartItems dari localStorage:", err);
      return [];
    }
  });

  // simpan ke localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartItemsContext.Provider value={cartItems}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartItemsContext.Provider>
  );
}

export function UseQuantity() {
  return useContext(CartItemsContext);
}
export function UseQuantityDispatch() {
  return useContext(CartDispatchContext);
}
