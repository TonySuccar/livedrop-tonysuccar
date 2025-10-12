// /src/lib/api.ts
/* -------------------- Products (unchanged) -------------------- */
export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  tags: string[];
  stockQty: number;
  description?: string;
};

let cache: Product[] | null = null;

export async function listProducts(): Promise<Product[]> {
  if (cache) return cache;
  const res = await fetch("/mock-catalog.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load catalog");
  cache = await res.json();
  return cache!;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const all = await listProducts();
  return all.find(p => p.id === id);
}

/* -------------------- Orders -------------------- */
export type OrderStatus = "Placed" | "Packed" | "Shipped" | "Delivered";

export type OrderItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

export type OrderRecord = {
  id: string;
  createdAt: string;        // ISO
  items: OrderItem[];
  total: number;
};

export type OrderTracking = {
  id: string;
  status: OrderStatus;
  carrier?: string;
  tracking?: string;
  eta?: string;             // ISO string
};

const ORDERS_LS_KEY = "orders:v1";
let _seedOrders: OrderRecord[] | null = null;

/** Load seed orders from /mock-orders.json exactly once. */
async function loadSeedOrders(): Promise<OrderRecord[]> {
  if (_seedOrders) return _seedOrders;
  try {
    const res = await fetch("/mock-orders.json", { cache: "no-store" });
    if (!res.ok) throw new Error("failed");
    _seedOrders = (await res.json()) as OrderRecord[];
  } catch {
    _seedOrders = [];
  }
  return _seedOrders!;
}

/** Load appended orders from localStorage. */
function loadLocalOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(ORDERS_LS_KEY);
    return raw ? (JSON.parse(raw) as OrderRecord[]) : [];
  } catch {
    return [];
  }
}

/** Save appended orders to localStorage. */
function saveLocalOrders(orders: OrderRecord[]) {
  localStorage.setItem(ORDERS_LS_KEY, JSON.stringify(orders));
}

/** Merge seed + local (local wins on id collision). */
export async function listOrders(): Promise<OrderRecord[]> {
  const [seed, local] = await Promise.all([loadSeedOrders(), Promise.resolve(loadLocalOrders())]);
  const map = new Map<string, OrderRecord>();
  seed.forEach(o => map.set(o.id, o));
  local.forEach(o => map.set(o.id, o)); // overwrite if same id
  return Array.from(map.values());
}

export async function getOrderById(id: string): Promise<OrderRecord | undefined> {
  const all = await listOrders();
  return all.find(o => o.id === id);
}

/** Append a new order (from Checkout). */
export async function appendOrder(order: OrderRecord): Promise<void> {
  const local = loadLocalOrders();
  // de-dup just in case
  if (!local.some(o => o.id === order.id)) {
    local.push(order);
    saveLocalOrders(local);
  }
}

/* -------------------- Tracking logic -------------------- */

/** 5s per stage progression, based on createdAt. */
function computeStatusFromCreated(createdAtISO: string): OrderStatus {
  const created = new Date(createdAtISO).getTime();
  const elapsed = Math.floor((Date.now() - created) / 5000); // every 5s next stage
  const idx = Math.min(elapsed, 3);
  return (["Placed", "Packed", "Shipped", "Delivered"][idx] as OrderStatus);
}

/** Get current tracking info for an existing order id. */
export async function getOrderStatus(id: string): Promise<OrderTracking> {
  const order = await getOrderById(id);
  if (!order) {
    throw Object.assign(new Error("Order not found"), { code: "NOT_FOUND" });
  }

  const status = computeStatusFromCreated(order.createdAt);
  const base: OrderTracking = { id, status };

  if (status === "Shipped" || status === "Delivered") {
    // ship time = createdAt + (2 stages * 5s) i.e., when it first becomes Shipped
    const created = new Date(order.createdAt).getTime();
    const shipTime = created + 2 * 5000;
    return {
      ...base,
      carrier: "DHL",
      tracking: `DHL-${id.slice(-6)}`,
      eta: new Date(shipTime + 2 * 24 * 60 * 60 * 1000).toISOString(), // +2 days mock
    };
  }
  return base;
}

/* -------------------- Support helper -------------------- */

export const ORDER_ID_RE =
  /ORD-\d{4}-\d{2}-\d{2}-[A-Z0-9]{5}/i; // e.g., ORD-2025-10-12-7GQ4K

// /src/lib/api.ts
export type TrackResponse =
  | {
      handled: true;
      order: {
        id: string;
        status: OrderStatus;
        carrier?: string;
        tracking?: string;
        eta?: string; // ISO
      };
    }
  | { handled: false };

export async function trackOrderFromInput(input: string): Promise<TrackResponse> {
  const match = input.match(ORDER_ID_RE);
  if (!match) return { handled: false };

  const id = match[0];
  const t = await getOrderStatus(id); // will throw only on unexpected errors
  return {
    handled: true,
    order: {
      id,
      status: t.status,
      carrier: t.carrier,
      tracking: t.tracking,
      eta: t.eta,
    },
  };
}
