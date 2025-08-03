import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePages from "./components/pages/HomePages";
import DetailPages from "./components/pages/DetailPages";
import PaymentPage from "./components/pages/PaymentPages";
import Header from "./components/fragments/home/Header";
import CartList from "./components/fragments/cart/CartList";
import OnSuccess from "./components/payments/OnSuccess";
import AboutPage from "./components/pages/AboutPages";
import AddProducts from "./components/pages/buyer/AddProducts";
import TryPages from "./components/pages/TryPages";
import Register from "./components/fragments/auth/Register";
import Login from "./components/fragments/auth/Login";


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-700">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/products" element={<HomePages />} />
          <Route path="/detail/:id" element={<DetailPages />} />
          <Route path="/bayar" element={<PaymentPage />} />
          <Route path="/cart" element={<CartList />} />
          <Route path="/payments" element={<OnSuccess />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/AddProducts" element={<AddProducts />} />
          <Route path="/dummy" element={<TryPages />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
