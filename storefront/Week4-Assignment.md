# Week 4 - Frontend at Lightspeed — Assignment

## Goal

Ship **Storefront v1** — a minimal, fast UI that completes the single journey (Catalog → Product → Cart → Checkout stub → Order status) and includes an **Ask Support** panel that answers strictly from your existing prompt pack and ground-truth Q&A.

---

## Deliverables and Exact Paths

This project follows **Atomic Design principles**, with colocated tests and Storybook documentation for every component.

Create these paths in the existing repo. Keep names exact:

```
/apps/storefront/
  README.md
  vite.config.ts
  package.json
  tsconfig.json
  index.html

  /src/
    main.tsx
    app.tsx

    /pages/
      catalog.tsx
      product.tsx
      cart.tsx
      checkout.tsx
      order-status.tsx

    /components (atomic design)
      /atoms
      /molecules
      /organisms
      /templates

    /lib/
      api.ts            # mock data + fetch helpers
      router.tsx
      store.ts          # cart state (zustand or simple context)
      format.ts         # currency helpers

    /assistant/
      ground-truth.json # 20 Q&As distilled from your ground-truth-qa.md
      prompt.txt        # template extracted from your prompt pack’s guidelines
      engine.ts         # calls local matcher; if OPENAI_API_KEY set, can call model, else fallback

  /public/
    logo.svg
    mock-catalog.json  # ≥ 20 items, include id, title, price, image, tags, stockQty

  component-prompts.md  # brief “prompt-to-component” log: what you asked AI to scaffold
```

### Notes

* No secrets in the repo.
* If you support a live model call, read keys from `.env` and include `/apps/storefront/.env.example`.
* Keep dependencies lean (React, Vite, Tailwind, a tiny state lib, vitest). No heavy UI kits.

---

## Functional Requirements

### A) Catalog

* Grid with product-card (title, price, image, “Add to Cart”).
* Client-side search box using tokens from `mock-catalog.json` titles/tags.
* Sorting (price asc/desc) and a basic tag filter.

### B) Product Details

* Route `/p/:id` shows title, price, description, stock indicator, add-to-cart.
* Render 3 related items by shared tag.

### C) Cart

* Persistent cart (in-memory + localStorage rehydrate).
* Line items with qty +/- and remove; totals with currency format.

### D) Checkout Stub

* Route `/checkout`, summary only (no payment).
* “Place order” button creates a fake order id and navigates to `/order/:id`.

### E) Order Status

* Route `/order/:id` reads a mocked status from `api.ts` (statuses: Placed, Packed, Shipped, Delivered).
* Show carrier + ETA when Shipped or later.

### F) Ask Support Panel

* Slide-over on all routes. Input box with submit and response area.
* **Not a retrieval chatbot** — no embeddings, vector DB, or web search.
* Allowed data: `ground-truth.json` and `getOrderStatus(orderId)` from `api.ts` only.

#### Flow

* Detect order id (`[A-Z0-9]{10,}`) and fetch status if present.
* Score Q&As by keyword overlap; pick best one. If confidence is low, refuse.
* Always show citation `[Qxx]`. If out of scope, refuse politely.

#### PII 

* Never echo full PII (show last 4 of any id only).

#### Tests to Include

* Known policy question returns answer with `[Qxx]`.
* Out-of-scope question refuses.
* Question with valid order id includes status and citation.

---

## Non-Functional Requirements

### Performance

* Cold load ≤ 200 KB JS (gzipped) excluding images.
* Lazy-load image assets.
* Route transition p95 < 250 ms on dev build.

### Accessibility

* Keyboard navigation for cart drawer and support panel.
* Focus trapping in modals.
* ARIA labels on form controls.

### Styling

* Tailwind utility-first.
* Consistent spacing scale.
* No custom CSS frameworks.

### DX

* `pnpm dev` (or npm/yarn) runs.
* `pnpm test` runs unit tests.

---

## Unit Tests & Documentation

* **Unit tests:** all components (props, accessibility, user events, etc.).
* **Documentation:** Storybook for all reusable components.
* You may bootstrap test stubs with AI.

---

## Minimal API & Data Contract

### mock-catalog.json

```ts
{ id: string, title: string, price: number, image: string, tags: string[], stockQty: number }[]
```

### api.ts

```ts
listProducts()
getProduct(id)
getOrderStatus(id)
placeOrder(cart) // returns { orderId }
```

### ground-truth.json

```ts
{ qid: "Q01", category: "Returns", question: "...", answer: "..." }[] // 20 items mirrored from your Q&A doc
```

---

## Submission

Push all stated files and folders. Provide **run instructions** in `/apps/storefront/README.md`:

```
install
pnpm dev
pnpm build
pnpm test
```

---

### Deadline

**12 October, 6 PM**
