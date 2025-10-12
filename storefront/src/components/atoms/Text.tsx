// /src/components/atoms/Text.tsx
import * as React from "react";

type Variant =
  | "pageTitle"
  | "sectionTitle"
  | "subtitle"
  | "body"
  | "muted"
  | "price";

type OwnProps = {
  variant?: Variant;
  align?: "left" | "center" | "right";
  clamp?: number;
  className?: string;
  children: React.ReactNode;
};

// Polymorphic Text: supports `as` + native props (id, href, onClick, etc.)
export type TextProps<T extends React.ElementType = "p"> = OwnProps & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const cn = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(" ");

export function Text<T extends React.ElementType = "p">({
  as,
  variant = "body",
  align = "left",
  clamp,
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Tag = (as || "p") as React.ElementType;

  const styles: Record<Variant, string> = {
    pageTitle:   "text-2xl font-bold text-[var(--text)]",
    sectionTitle:"text-lg font-semibold text-[var(--text)]",
    subtitle:    "text-sm text-[#555]",
    body:        "text-sm text-[var(--text)]",
    muted:       "text-sm text-[#666]",
    price:       "text-lg font-semibold text-[var(--brand)]",
  };

  const alignCls =
    align === "center" ? "text-center" :
    align === "right"  ? "text-right"  : "text-left";

  const clampCls = clamp ? `line-clamp-${clamp}` : "";

  return (
    <Tag
      className={cn("tracking-tight", styles[variant], alignCls, clampCls, className)}
      {...rest} // ← forwards id, aria-*, onClick, etc.
    >
      {children}
    </Tag>
  );
}
