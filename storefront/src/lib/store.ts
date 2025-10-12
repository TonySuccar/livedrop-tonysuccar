import { create } from "zustand";

/* ---------- Types ---------- */
export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  // cart data
  items: CartItem[];

  // cart data actions
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;

  // UI state for global cart drawer
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

/* ---------- Persistence helpers ---------- */
const LS_KEY = "cart:v1";
const load = (): CartItem[] => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
};
const save = (items: CartItem[]) => localStorage.setItem(LS_KEY, JSON.stringify(items));

/* ---------- Store ---------- */
export const useCart = create<CartState>((set, get) => ({
  // data
  items: load(),

  // actions
  add: (item, q = 1) => {
    const items = [...get().items];
    const found = items.find(i => i.id === item.id);
    if (found) found.qty += q;
    else items.push({ ...item, qty: q });
    save(items);
    set({ items });
  },

  remove: (id) => {
    const items = get().items.filter(i => i.id !== id);
    save(items);
    set({ items });
  },

  setQty: (id, qty) => {
    let items = [...get().items];
    items = items.map(i => (i.id === id ? { ...i, qty } : i)).filter(i => i.qty > 0);
    save(items);
    set({ items });
  },

  clear: () => {
    save([]);
    set({ items: [] });
  },

  count: () => get().items.reduce((s, i) => s + i.qty, 0),
  total: () => get().items.reduce((s, i) => s + i.qty * i.price, 0),

  // UI
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set({ cartOpen: !get().cartOpen }),
}));
