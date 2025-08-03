import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import { CartItemsContextProvider } from "./hooks/UseCartItems.tsx";
import { AuthContextProvider } from "./hooks/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <CartItemsContextProvider>
        <App />
      </CartItemsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
