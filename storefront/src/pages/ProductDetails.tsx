// /src/pages/ProductDetails.tsx
import * as React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { listProducts, type Product } from "../lib/api";
import { Text } from "../components/atoms/Text";
import { Divider } from "../components/atoms/Divider";
import { ProductGrid } from "../components/organisms/ProductGrid";
import { DetailsCard } from "../components/molecules/DetailsCard";
import { Button } from "../components/atoms/Button";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  // 🔧 useNavigate must be called unconditionally (before any early return)
  const nav = useNavigate();

  const [all, setAll] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    listProducts()
      .then(setAll)
      .catch(e => setErr(e?.message ?? "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const product = React.useMemo(() => all.find(p => p.id === id), [all, id]);

  const related = React.useMemo(() => {
    if (!product) return [];
    const tagSet = new Set(product.tags);
    return all
      .filter(p => p.id !== product.id && p.tags.some(t => tagSet.has(t)))
      .slice(0, 3);
  }, [all, product]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-[#f1f1f1] animate-pulse" />
          <div className="space-y-3">
            <div className="h-6 w-2/3 rounded bg-[#eee] animate-pulse" />
            <div className="h-5 w-1/3 rounded bg-[#eee] animate-pulse" />
            <div className="h-24 w-full rounded bg-[#eee] animate-pulse" />
            <div className="h-10 w-48 rounded bg-[#eee] animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (err || !product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800 shadow">
          <Text as="h2" variant="sectionTitle" className="mb-1">Product not found</Text>
          <Text variant="muted">{err ?? "This product may have been moved or removed."}</Text>
          <div className="mt-4">
            <Link to="/" className="underline text-[var(--brand)]">Back to shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Back button */}
      <div className="mb-4">
        <Button
          variant="primary"
          size="sm"
          onClick={() => (window.history.length > 1 ? nav(-1) : nav("/"))}
          aria-label="Go back"
          className="inline-flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Button>
      </div>

      {/* Details */}
      <DetailsCard product={product} />

      {/* Related */}
      {related.length > 0 && (
        <>
          <Divider />
          <section className="mt-6">
            <Text as="h2" variant="sectionTitle" className="mb-3">Related items</Text>
            <ProductGrid products={related} />
          </section>
        </>
      )}
    </main>
  );
}
