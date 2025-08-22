import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePages from "./components/pages/HomePages";
import DetailPages from "./components/pages/DetailPages";
import PaymentPage from "./components/pages/PaymentPages";
import CartList from "./components/fragments/cart/CartList";
import OnSuccess from "./components/payments/OnSuccess";
import AboutPage from "./components/pages/AboutPages";
import AddProducts from "./components/pages/buyer/AddProducts";
import TryPages from "./components/pages/TryPages";
import Register from "./components/fragments/auth/Register";
import Login from "./components/fragments/auth/Login";
import ProfilPages from "./components/pages/ProfilPages";
import PaymentStatus from "./components/pages/PaymentsStatus";
import UserLayouts from "./components/layouts/UserLayouts";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayouts />}>
            <Route index element={<HomePages />} />
            <Route path="products" element={<HomePages />} />
            <Route path="detail/:id" element={<DetailPages />} />
            <Route path="cart" element={<CartList />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="profile" element={<ProfilPages />} />
          </Route>
          <Route path="/buyer" element={<UserLayouts />}>
            <Route path="payment" element={<PaymentPage />} />
            <Route path="payments" element={<OnSuccess />} />
            <Route path="payments/:orderId" element={<PaymentStatus />} />
          </Route>
          <Route path="/AddProducts" element={<AddProducts />} />
          <Route path="/dummy" element={<TryPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
