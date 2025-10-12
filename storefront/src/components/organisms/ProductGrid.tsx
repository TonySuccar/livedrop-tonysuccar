import type { Product } from "../../lib/api";
import { ProductCard } from "../molecules/ProductCard";

export const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
    {products.map(p => <ProductCard key={p.id} product={p} />)}
  </div>
);
