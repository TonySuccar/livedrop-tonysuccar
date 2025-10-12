
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/organisms/Navbar";
import { Footer } from "./components/organisms/Footer";
import Catalog from "./pages/Catalog";
import { ProductDetails } from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";

import { SupportPanel } from "./components/organisms/SupportPanel";
import { SupportLauncher } from "./components/molecules/SupportLauncher";

// NEW: import the cart + store flags
import { CartDrawer } from "./components/organisms/CartDrawer";
import { useCart } from "./lib/store";

export default function App() {
  const [supportOpen, setSupportOpen] = React.useState(false);

  // ✅ use the new keys from your store
  const cartOpen  = useCart(s => s.cartOpen);
  const closeCart = useCart(s => s.closeCart);

  React.useEffect(() => {
    const h = () => setSupportOpen(false);
    window.addEventListener("support:close", h);
    return () => window.removeEventListener("support:close", h);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) setSupportOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text)]">
      <Navbar />
      <main>
        {/* routes... */}
                <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/p/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<Order />} />
        </Routes>
      </main>
      <Footer />

      {/* Support (global) */}
      <SupportLauncher onClick={() => setSupportOpen(true)} />
      <SupportPanel open={supportOpen} onClose={() => setSupportOpen(false)} />

      {/* Cart (global) */}
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </div>
  );
}