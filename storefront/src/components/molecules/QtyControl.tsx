// /src/components/molecules/QtyControl.tsx
import "react";
import { Button } from "../atoms/Button";
import { useCart } from "../../lib/store";

type Props = { id: string; max: number; title: string; price: number; image: string };

export function QtyControl({ id, max, title, price, image }: Props) {
  const add = useCart(s => s.add);
  const setQty = useCart(s => s.setQty);
  const qty = useCart(s => s.items.find(i => i.id === id)?.qty ?? 0);

  if (qty === 0) {
    return (
      <Button
        variant="primary"
        onClick={() => add({ id, title, price, image })}
        aria-label={`Add ${title} to cart`}
      >
        Add to Cart
      </Button>
    );
  }

  const inc = () => setQty(id, Math.min(max, qty + 1));
  const dec = () => setQty(id, Math.max(0, qty - 1));

  return (
    <div className="inline-flex items-center rounded-xl border border-[var(--neutral)] bg-white shadow-sm overflow-hidden">
      <Button variant="ghost" size="sm" className="rounded-none px-3" onClick={dec} aria-label="Decrease">−</Button>
      <span className="min-w-10 text-center text-sm font-semibold text-[var(--text)]">{qty}</span>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-none px-3"
        onClick={inc}
        disabled={qty >= max}
        title={qty >= max ? "No more stock available" : undefined}
        aria-label="Increase"
      >
        +
      </Button>
    </div>
  );
}
