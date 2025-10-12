// /src/pages/Catalog.tsx
import React from "react";
import { listProducts, type Product } from "../lib/api";
import { ProductGrid } from "../components/organisms/ProductGrid";
import { Text } from "../components/atoms/Text";
import { CatalogToolbar, type SortKey } from "../components/molecules/CatalogToolbar";

export default function Catalog() {
  const [all, setAll] = React.useState<Product[]>([]);
  const [query, setQuery] = React.useState("");
  const [tag, setTag] = React.useState<string>("all");
  const [sort, setSort] = React.useState<SortKey>("price-asc");
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    listProducts().then(setAll).catch(e => setErr(e?.message ?? "Failed to load"));
  }, []);

  const tags = React.useMemo(() => {
    const t = new Set<string>(); all.forEach(p => p.tags.forEach(x => t.add(x)));
    return ["all", ...Array.from(t).sort()];
  }, [all]);

  const filtered = React.useMemo(() => {
    let v = all;
    const q = query.trim().toLowerCase();
    if (q) v = v.filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    if (tag !== "all") v = v.filter(p => p.tags.includes(tag));
    v = [...v].sort((a,b) => sort==="price-asc" ? a.price - b.price : b.price - a.price);
    return v;
  }, [all, query, tag, sort]);

  if (err) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800 shadow">
          <Text variant="sectionTitle" as="h2" className="mb-1">Could not load catalog</Text>
          <Text variant="muted">{err}</Text>
        </div>
      </main>
    );
  }

  const clearFilters = () => {
    setQuery(""); setTag("all"); setSort("price-asc");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* header */}
      <header className="mb-6 text-center">
        <Text as="h1" variant="pageTitle" align="center">Discover Today’s Tech Finds</Text>
        <Text variant="subtitle" align="center">Fresh picks, smart prices, zero fluff.</Text>
        <div className="mx-auto mt-3 h-1 w-24 rounded bg-[var(--brand)]/20" />
      </header>

      {/* toolbar (now a separate component) */}
      <CatalogToolbar
        query={query}
        onQuery={setQuery}
        tag={tag}
        onTag={setTag}
        sort={sort}
        onSort={setSort}
        tags={tags}
        onReset={clearFilters}
      />

      {/* results meta */}
      <Text variant="muted" className="mb-4">
        {filtered.length} result{filtered.length === 1 ? "" : "s"}
      </Text>

      {/* products */}
      {filtered.length > 0 ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="rounded-2xl border border-[var(--neutral)] bg-[var(--bg-base)] p-10 text-center shadow-sm">
          <Text variant="muted">No products match your filters.</Text>
        </div>
      )}
    </main>
  );
}
