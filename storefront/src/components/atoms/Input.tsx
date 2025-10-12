// /src/components/atoms/Input.tsx
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const cn = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(" ");

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ size = "md", invalid, leftIcon, rightIcon, className, ...props }, ref) => {
    const heights =
      size === "sm" ? "h-9 text-sm" :
      size === "lg" ? "h-11 text-base" :
                      "h-10 text-sm";

    const paddingX =
      leftIcon && rightIcon ? "pl-9 pr-9" :
      leftIcon ? "pl-9 pr-3" :
      rightIcon ? "pl-3 pr-9" :
                  "px-3";

    // No border/ring/shadow; use outline only on focus-visible
    const outline =
      invalid
        ? "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--alert)]"
        : "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand)]";

    const base = cn(
      "w-full rounded-lg",
      "bg-[var(--bg-base)] text-[var(--text)] placeholder-[#888]",
      "border-0 ring-0 shadow-none",   // ensure no border, no ring, no box shadow
      heights,
      paddingX,
      outline,
      className
    );

    return (
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#777]">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={base}
          aria-invalid={invalid || undefined}
          {...props}
        />
        {rightIcon && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#777]">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
