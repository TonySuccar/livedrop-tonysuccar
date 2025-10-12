// /src/components/organisms/CartDrawer.tsx
import { useRef, useEffect, useCallback } from "react";
import { useCart } from "../../lib/store";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";
import { formatCurrency } from "../../lib/format";
import { useNavigate } from "react-router-dom";

export const CartDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { items, setQty, remove, total, clear } = useCart();
  const isEmpty = items.length === 0;
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on ESC
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  // Focus trap + body scroll lock + ESC
  useEffect(() => {
    if (!open) return;
    const el = panelRef.current;
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    el?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      prev?.focus();
    };
  }, [open, onKeyDown]);

  return (
<div className={`fixed inset-0 z-[999] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        tabIndex={-1}
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform
                    ${open ? "translate-x-0" : "translate-x-full"} outline-none`}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
      >
        <header className="flex items-center justify-between border-b bg-[var(--brand)] p-4 text-white">
          <Text as="h2" variant="sectionTitle" className="text-white">Your Cart</Text>
          <Button variant="primary" size="sm" onClick={onClose} aria-label="Close cart">Close</Button>
        </header>

        <div className="h-[calc(100%-184px)] space-y-4 overflow-y-auto p-4">
          {isEmpty ? (
            <div className="rounded-xl border border-[var(--neutral)] bg-[var(--bg-base)] p-6 text-center">
              <Text variant="muted">Your cart is empty. Add some goodies ✨</Text>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex items-center gap-3 rounded-xl border border-[var(--neutral)] bg-[var(--bg-base)] p-3">
                <img src={item.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <Text variant="body" className="font-medium line-clamp-1">{item.title}</Text>
                  <Text variant="muted">{formatCurrency(item.price)}</Text>
                  <div className="mt-2 inline-flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => setQty(item.id, Math.max(0, item.qty - 1))} aria-label={`Decrease ${item.title} quantity`}>−</Button>
                    <Text as="span" variant="body" className="w-6 text-center font-semibold">{item.qty}</Text>
                    <Button size="sm" variant="outline" onClick={() => setQty(item.id, item.qty + 1)} aria-label={`Increase ${item.title} quantity`}>+</Button>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => remove(item.id)} aria-label={`Remove ${item.title} from cart`}>Remove</Button>
              </div>
            ))
          )}
        </div>

        <footer className="border-t p-4">
          <div className="mb-3 flex items-center justify-between">
            <Text variant="muted">Total</Text>
            <Text variant="price">{formatCurrency(total())}</Text>
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="primary"
              disabled={isEmpty}
              aria-disabled={isEmpty}
              title={isEmpty ? "Add items to proceed to checkout" : undefined}
              onClick={() => {
    if (isEmpty) return;
    onClose();              // close drawer (also releases body scroll lock)
    navigate("/checkout");  // then navigate
  }}
            >
              Checkout
            </Button>
            <Button className="flex-1" variant="outline" onClick={clear} disabled={isEmpty}>
              Clear
            </Button>
          </div>
        </footer>
      </aside>
    </div>
  );
};
