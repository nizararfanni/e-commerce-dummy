import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartItemsContextProvider } from "./hooks/UseCartItems.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartItemsContextProvider>
      <App />
    </CartItemsContextProvider>
  </StrictMode>
);
