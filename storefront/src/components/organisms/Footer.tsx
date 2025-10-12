// /src/components/organisms/Footer.tsx
import "react";
import { Link } from "react-router-dom";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-[var(--neutral)] bg-[var(--brand)]">
      {/* Top: brand + links + newsletter */}
      <div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:grid-cols-3"
        role="contentinfo"
        aria-labelledby="footer-brand"
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <img src="/Logo.png" alt="ShopLite logo" className="h-8 w-8 shrink-0" />
            <Text as="h2" variant="sectionTitle" className="text-white">
              ShopLite
            </Text>
          </div>
          <Text variant="subtitle" className="mt-2 text-white/80">
            Smart gadgets, sharp prices.
          </Text>
        </div>

        {/* Links */}
        <nav className="grid grid-cols-2 gap-6 sm:grid-cols-2" aria-labelledby="footer-links">
          <Text id="footer-links" className="sr-only">
            Footer navigation
          </Text>

          <div>
            <Text as="h3" variant="sectionTitle" className="mb-2 text-white">
              Shop
            </Text>
            <ul className="space-y-2">
              <li>
                <Text as={Link} to="/" variant="body" className="text-white/90 hover:text-white">
                  Home
                </Text>
              </li>
              <li>
                <Text as={Link} to="/" variant="body" className="text-white/90 hover:text-white">
                  Catalog
                </Text>
              </li>
              <li>
                <Text as={Link} to="/" variant="body" className="text-white/90 hover:text-white">
                  Deals
                </Text>
              </li>
            </ul>
          </div>

          <div>
            <Text as="h3" variant="sectionTitle" className="mb-2 text-white">
              Support
            </Text>
            <ul className="space-y-2">
              <li>
                <Text as="a" href="#" variant="body" className="text-white/90 hover:text-white">
                  Shipping
                </Text>
              </li>
              <li>
                <Text as="a" href="#" variant="body" className="text-white/90 hover:text-white">
                  Returns
                </Text>
              </li>
              <li>
                <Text as="a" href="#" variant="body" className="text-white/90 hover:text-white">
                  Contact
                </Text>
              </li>
            </ul>
          </div>
        </nav>

        {/* Newsletter */}
        <div aria-labelledby="footer-newsletter">
          <Text as="h3" id="footer-newsletter" variant="sectionTitle" className="mb-2 text-white">
            Stay in the loop
          </Text>

          <form
            className="flex flex-col items-stretch gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! You’re subscribed.");
            }}
          >
            <Input
              placeholder="Email address"
              type="email"
              aria-label="Email address"
              className="sm:flex-1 bg-white text-[var(--text)] placeholder-white/60"
            />
            <Button variant="primary" className="sm:shrink-0">
              Subscribe
            </Button>
          </form>

          <Text variant="muted" className="mt-2 text-xs text-white/70">
            We never spam. Unsubscribe anytime.
          </Text>
        </div>
      </div>

      {/* HR divider */}
      <hr className="mx-auto max-w-7xl border-white/15" />

      {/* Bottom bar */}
      <div className="py-3 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
          <Text variant="body" className="text-xs text-white/90">
            © {year} ShopLite
          </Text>
          <div className="flex items-center gap-4 text-white/90">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 19c7.5 0 11.6-6.2 11.6-11.6v-.5A8.3 8.3 0 0 0 22 4.8a8 8 0 0 1-2.3.6 4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.6 1A4 4 0 0 0 12 7.6a11.3 11.3 0 0 1-8.2-4.2 4 4 0 0 0 1.2 5.4 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9c-.5.1-1 .2-1.6.1a4 4 0 0 0 3.7 2.8A8.1 8.1 0 0 1 2 17.5 11.4 11.4 0 0 0 8 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
