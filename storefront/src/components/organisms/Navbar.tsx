// /src/components/organisms/Navbar.tsx
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../lib/store";
import { Button } from "../atoms/Button";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const count = useCart(s => s.count());
  // don't dispatch on every render — only close support when opening the cart

  const toggleCart = useCart(s => s.toggleCart);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 m-2 text-sm font-medium ${
      isActive
        ? "bg-white/15 text-white"
        : "text-white/90 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[var(--brand)] text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/Logo.png" alt="" className="h-8 w-8" />
          <span className="text-lg font-semibold">ShopLite</span>
        </Link>


        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              // if we're opening the cart, notify any global listeners to close support
              // toggleCart flips the state; detect intent by reading from the store instead
              const cartIsOpen = (useCart.getState && useCart.getState().cartOpen) || false;
              if (!cartIsOpen) window.dispatchEvent(new Event("support:close"));
              toggleCart();
            }}
            aria-label="Open cart"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className="-ml-1">
              <path d="M3 3h2l2.4 12.3a2 2 0 0 0 2 1.7h7.9a2 2 0 0 0 2-1.6l1.3-7.4H7.1"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="ml-1">Cart</span>
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black/80 px-1.5 text-xs text-white">
                {count}
              </span>
            )}
          </Button>

          {/* Burger (mobile only) */}
          <button
            className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(v => !v)}
          >
            {/* icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-64" : "max-h-0"}`}
      >
        <div className="mx-4 mb-3 rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Catalog</NavLink>
        </div>
      </div>
    </header>
  );
}
