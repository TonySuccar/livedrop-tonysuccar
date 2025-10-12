// /src/components/molecules/DetailsCard.tsx
import * as React from "react";
import type { Product } from "../../lib/api";
import { Text } from "../atoms/Text";
import { Badge } from "../atoms/Badge";
import { Divider } from "../atoms/Divider";
import { QtyControl } from "./QtyControl";
import { formatCurrency } from "../../lib/format";

// normalize for /p/:id route so relative paths don't break
const resolveImage = (src: string) => {
  if (!src) return "";
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src; // absolute or data
  if (src.startsWith("/")) return src;                                    // already absolute to public root
  // If your images are in /public/images:
  return `/images/${src}`; // or just `/${src}` if your files live directly under /public
};

type Props = { product: Product };

export function DetailsCard({ product }: Props) {
  const inStock = product.stockQty > 0;

  const [imgSrc, setImgSrc] = React.useState(() => resolveImage(product.image));
  React.useEffect(() => {
    setImgSrc(resolveImage(product.image));
  }, [product.image]);

  const onImgError = () =>
    setImgSrc("https://picsum.photos/seed/shoplite-fallback/800/800");

  const description =
    product.description ??
    `Premium ${product.title} designed for everyday performance. Tags: ${product.tags.join(", ")}.`;

  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Image */}
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[var(--neutral)] bg-white shadow-sm">
          <img
            src={imgSrc}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="eager"
            onError={onImgError}
          />
        </div>
      </div>

      {/* Info */}
      <div>
        <Text as="h1" variant="pageTitle" className="mb-1">
          {product.title}
        </Text>

        <div className="mb-3 flex items-center gap-3">
          <Text variant="price">{formatCurrency(product.price)}</Text>
          <Badge>{inStock ? "In Stock" : "Out of Stock"}</Badge>
        </div>

        <Text variant="body" className="leading-relaxed">
          {description}
        </Text>

        <Divider />

        <div className="flex items-center gap-3">
          <QtyControl
            id={product.id}
            max={product.stockQty}
            title={product.title}
            price={product.price}
            image={product.image}
          />
          <Text variant="muted">Free returns within 30 days</Text>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
