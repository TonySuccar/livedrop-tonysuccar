// /src/components/atoms/Select.tsx
import * as React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  fullWidth?: boolean;
  // Optional controlled value; if omitted, falls back to props.defaultValue or first option
  value?: string;
};

const cn = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(" ");

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ size = "md", invalid, fullWidth, className, children, value: valueProp, onChange, defaultValue, disabled, ...rest }, _ref) => {
    // Parse <option> children into a list we control
    const items = React.useMemo(() => {
      return React.Children.toArray(children)
        .filter(Boolean)
        .map((child: any) => {
          const val = child?.props?.value ?? String(child?.props?.children ?? "");
          const label = String(child?.props?.children ?? val);
          const disabled = Boolean(child?.props?.disabled);
          return { value: String(val), label, disabled };
        });
    }, [children]);

    const initial = React.useMemo(() => {
      const v = valueProp ?? (defaultValue as string | undefined) ?? items[0]?.value ?? "";
      return items.find(i => i.value === v)?.value ?? "";
    }, [valueProp, defaultValue, items]);

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(initial);
    const [highlight, setHighlight] = React.useState(
      Math.max(0, items.findIndex(i => i.value === initial))
    );

    // Keep internal in sync if controlled
    React.useEffect(() => {
      if (valueProp !== undefined) setValue(valueProp);
    }, [valueProp]);

    const selected = items.find(i => i.value === value);
    const sizes =
      size === "sm" ? "h-9 text-sm" :
      size === "lg" ? "h-11 text-base" :
                      "h-10 text-sm";

    const buttonClasses = cn(
      "relative inline-flex items-center justify-between rounded-lg border shadow-sm",
      "bg-[var(--bg-base)] text-[var(--text)]",
      "focus:outline-none focus:ring-2",
      sizes,
      "pl-3 pr-9",                            // room for chevron
      fullWidth ? "w-full" : "w-auto",
      disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      invalid
        ? "border-[var(--alert)] focus:ring-[var(--alert)]"
        : "border-[var(--neutral)] focus:ring-[var(--brand)]",
      className
    );

    const listboxId = React.useId();

    const commit = (idx: number) => {
      const item = items[idx];
      if (!item || item.disabled) return;
      if (valueProp === undefined) setValue(item.value); // uncontrolled
      // Fire a synthetic change event to match native signature
      onChange?.({
        ...({} as any),
        target: { value: item.value },
        currentTarget: { value: item.value }
      } as React.ChangeEvent<HTMLSelectElement>);
      setOpen(false);
    };

    const move = (delta: number) => {
      if (!items.length) return;
      let i = highlight;
      do {
        i = (i + delta + items.length) % items.length;
      } while (items[i].disabled && i !== highlight);
      setHighlight(i);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ")){
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (!open) return;

      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Home") { e.preventDefault(); setHighlight(0); }
      else if (e.key === "End") { e.preventDefault(); setHighlight(items.length - 1); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); commit(highlight); }
      else if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
    };

    React.useEffect(() => {
      if (!open) return;
      const onClickAway = (e: MouseEvent) => {
        const target = e.target as Node;
        const root = containerRef.current;
        if (root && !root.contains(target)) setOpen(false);
      };
      document.addEventListener("mousedown", onClickAway);
      return () => document.removeEventListener("mousedown", onClickAway);
    }, [open]);

    const containerRef = React.useRef<HTMLDivElement>(null);

    // Ensure highlight follows current value when opening
    React.useEffect(() => {
      if (!open) return;
      const idx = Math.max(0, items.findIndex(i => i.value === value));
      setHighlight(idx);
    }, [open, value, items]);

    return (
      <div ref={containerRef} className={cn("relative inline-block", fullWidth && "w-full")} onKeyDown={onKeyDown}>
        {/* The visible button */}
        <button
          type="button"
          className={buttonClasses}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          onClick={() => !disabled && setOpen(o => !o)}
          disabled={disabled}
          {...Object.fromEntries(Object.entries(rest).filter(([key]) => key !== "onClick"))}
        >
          <span className="truncate">{selected?.label ?? "Select…"}</span>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#777]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>

        {/* Popover list */}
        {open && (
          <div
            className="absolute z-50 mt-1 w-full min-w-[12rem] rounded-lg border border-[var(--neutral)] bg-[var(--bg-base)] shadow-lg"
            role="listbox"
            id={listboxId}
            aria-activedescendant={items[highlight]?.value}
          >
            <ul className="max-h-64 overflow-auto sl-scrollbar py-1">
              {items.map((it, i) => {
                const selected = it.value === value;
                const active = i === highlight;
                return (
                  <li
                    key={it.value}
                    id={it.value}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={it.disabled || undefined}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => e.preventDefault()} // keep focus
                    onClick={() => !it.disabled && commit(i)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 px-3 py-2 text-sm",
                      it.disabled && "opacity-50 cursor-not-allowed",
                      active ? "bg-[var(--brand)]/10" : "",
                      selected ? "text-[var(--brand)] font-medium" : "text-[var(--text)]"
                    )}
                  >
                    {it.label}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
