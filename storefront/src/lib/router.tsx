// /src/lib/router.tsx
import { Routes, Route } from "react-router-dom";
import Catalog from "../pages/Catalog";
import { ProductDetails } from "../pages/ProductDetails"; // ← new
import Checkout from "../pages/Checkout";
import Order from "../pages/Order";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Catalog />} />
    <Route path="/p/:id" element={<ProductDetails />} />  {/* ← details route */}
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/order/:id" element={<Order />} />
  </Routes>
);
