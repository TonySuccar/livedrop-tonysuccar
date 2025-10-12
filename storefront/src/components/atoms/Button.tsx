// /src/components/atoms/Button.tsx
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export const Button: React.FC<Props> = ({
  variant="primary", size="md", className="", iconLeft, iconRight, children, ...props
}) => {
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4",
    lg: "h-11 px-5 text-base",
  }[size];

  const variants = {
    // CTA = Conversion Orange
    primary: "bg-[var(--cta)] text-black hover:bg-[#e68900] focus-visible:ring-2 focus-visible:ring-[#e68900]",
    // Secondary on brand surface (deep blue accents on white)
    secondary: "bg-[var(--brand)] text-white hover:bg-[#00264d] focus-visible:ring-2 focus-visible:ring-[#6aa7ff]",
    // Outline with charcoal text
    outline: "border border-[var(--neutral)] bg-white text-[var(--text)] hover:bg-[#fafafa] focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
    // Ghost minimal
    ghost: "bg-transparent text-[var(--text)] hover:bg-[#f6f7f9] focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
    // Danger for destructive
    danger: "bg-[var(--alert)] text-white hover:bg-[#a30000] focus-visible:ring-2 focus-visible:ring-[#ffb3b3]",
  }[variant];

  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button className={`${base} ${sizes} ${variants} ${className}`} {...props}>
      {iconLeft}{children}{iconRight}
    </button>
  );
};
