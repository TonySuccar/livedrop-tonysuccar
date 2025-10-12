// /src/components/molecules/CatalogToolbar.tsx
import * as React from "react";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";

export type SortKey = "price-asc" | "price-desc";

type Props = {
  query: string;
  onQuery: (value: string) => void;
  tag: string;
  onTag: (value: string) => void;
  sort: SortKey;
  onSort: (value: SortKey) => void;
  tags: string[];
  onReset: () => void;
};

export function CatalogToolbar({
  query, onQuery, tag, onTag, sort, onSort, tags, onReset,
}: Props) {
  return (
    <section
      className="mb-3 flex flex-col gap-2 rounded-xl border border-[var(--neutral)] bg-[var(--bg-base)] p-3 shadow-sm sm:flex-row sm:items-center sm:gap-3"
      aria-label="Catalog filters"
    >
      <div className="flex-1">
        <Input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search products…"
          aria-label="Search products"
        />
      </div>

      <div className="flex items-center gap-2 sm:ml-auto">
        <Select
          aria-label="Filter by tag"
          value={tag}
          onChange={(e) => onTag(e.target.value)}
        >
          {tags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>

        <Select
          aria-label="Sort by price"
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
        >
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </Select>

        <Button variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
    </section>
  );
}
