// /src/pages/Checkout.tsx
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../lib/store";
import { Text } from "../components/atoms/Text";
import { formatCurrency } from "../lib/format";

import { CheckoutItemsList } from "../components/molecules/CheckoutItemsList";
import { CheckoutSummaryCard } from "../components/molecules/CheckoutSummaryCard";
import { CheckoutEmptyCard } from "../components/molecules/CheckoutEmptyCard";

// ⬇️ NEW: persist orders so tracking works
import { appendOrder } from "../lib/api";

function createFakeOrderId() {
  const d = new Date();
  const date = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const rand = Math.random().toString(36).slice(2,7).toUpperCase();
  return `ORD-${date}-${rand}`;
}

export default function Checkout() {
  const nav = useNavigate();
  const { items, total, clear } = useCart();
  const [placing, setPlacing] = React.useState(false);

  const subtotal = total();
  const shipping = items.length > 0 ? 0 : 0; // stub
  const taxes = 0;                           // stub
  const grand = subtotal + shipping + taxes;

  const placeOrder = async () => {
    if (items.length === 0 || placing) return;
    setPlacing(true);

    const id = createFakeOrderId();
    const createdAt = new Date().toISOString();

    try {
      // 1) Save a snapshot for the order page “Items” list (unchanged)
      sessionStorage.setItem(
        "shoplite:lastOrder",
        JSON.stringify({ id, at: createdAt, items, total: subtotal })
      );

      // 2) ⬅️ NEW: append to persistent orders (localStorage) for real tracking
      await appendOrder({
        id,
        createdAt,
        items,        // Cart items match OrderItem shape
        total: subtotal
      });

      // 3) Clear cart & go to order page
      clear();
      nav(`/order/${encodeURIComponent(id)}`);
    } catch (e) {
      console.error(e);
      alert("Sorry, we couldn’t place the order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Text as="h1" variant="pageTitle" className="mb-1">Checkout</Text>
      <Text variant="subtitle" className="mb-6">Summary only — no payment in this stub.</Text>

      {items.length === 0 ? (
        <CheckoutEmptyCard onBack={() => nav("/")} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <CheckoutItemsList
            items={items}
            format={(n) => formatCurrency(n)}
          />
          <CheckoutSummaryCard
            subtotal={subtotal}
            shipping={shipping}
            taxes={taxes}
            total={grand}
            placing={placing}
            disabled={items.length === 0 || placing}
            onPlaceOrder={placeOrder}
            onContinue={() => nav("/")}
            format={(n) => formatCurrency(n)}
          />
        </div>
      )}
    </main>
  );
}
