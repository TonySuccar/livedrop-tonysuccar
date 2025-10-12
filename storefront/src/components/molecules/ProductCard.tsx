// /src/components/molecules/ProductCard.tsx
import { Link } from "react-router-dom";            // ← add this
import { Button } from "../atoms/Button";
import { formatCurrency } from "../../lib/format";
import { useCart } from "../../lib/store";
import type { Product } from "../../lib/api";

export const ProductCard = ({ product }: { product: Product }) => {
  const add = useCart(s => s.add);
  const setQty = useCart(s => s.setQty);
  const qty = useCart(s => s.items.find(i => i.id === product.id)?.qty ?? 0);
  const out = product.stockQty === 0;

  const inc = () => setQty(product.id, Math.min(product.stockQty, qty + 1));
  const dec = () => setQty(product.id, Math.max(0, qty - 1));

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--neutral)] bg-[var(--bg-base)] shadow-sm transition hover:shadow-md">
      {/* Clickable media area */}
      <Link to={`/p/${product.id}`} className="block group focus:outline-none">
        <div className="relative aspect-square w-full bg-[#f7f7f7]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        {/* Clickable title */}
        <Link to={`/p/${product.id}`} className="block">
          <h3 className="line-clamp-1 text-base font-semibold text-[var(--text)] hover:underline">
            {product.title}
          </h3>
        </Link>

        <div className="mt-1 text-lg font-semibold text-[var(--brand)]">
          {formatCurrency(product.price)}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className={`text-sm ${out ? "text-[var(--alert)]" : "text-[var(--success)]"}`}>
            {out ? "Unavailable" : "In stock"}
          </span>

          {/* Action area: Add to Cart -> Qty controls */}
          {out ? (
            <Button disabled variant="primary" size="sm">Add to Cart</Button>
          ) : qty === 0 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // ensure no accidental navigation
                add({ id: product.id, title: product.title, price: product.price, image: product.image });
              }}
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </Button>
          ) : (
            <div className="inline-flex items-center rounded-xl border border-[var(--neutral)] bg-white shadow-sm overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); dec(); }}
                aria-label={`Decrease ${product.title} quantity`}
                className="rounded-none px-3"
              >
                −
              </Button>
              <span className="min-w-8 text-center text-sm font-semibold text-[var(--text)]">{qty}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); inc(); }}
                aria-label={`Increase ${product.title} quantity`}
                className="rounded-none px-3"
                disabled={qty >= product.stockQty}
                title={qty >= product.stockQty ? "No more stock available" : undefined}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
