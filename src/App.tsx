import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePages from "./components/pages/HomePages";
import DetailPages from "./components/pages/DetailPages";
import PaymentPage from "./components/pages/PaymentPages";
import Header from "./components/fragments/home/Header";
import CartList from "./components/fragments/cart/CartList";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/detail/:id" element={<DetailPages />} />
          <Route path="/bayar" element={<PaymentPage />} />
          <Route path="/cart" element={< CartList/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
