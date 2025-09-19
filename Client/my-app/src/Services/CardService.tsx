import type { Product, CartItem } from "@/Types/product";

const STORAGE_KEY = "cart:items";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const CartService = {
  getCart(): CartItem[] {
    return loadCart();
  },

  addToCart(product: Product, qty: number = 1) {
    const items = loadCart();
    const idx = items.findIndex((i) => i.id === product.id);
    if (idx >= 0) {
      items[idx].quantity += qty;
    } else {
      items.push({ ...product, quantity: qty });
    }
    saveCart(items);
    return items;
  },

  updateQuantity(productId: number, qty: number) {
    const items = loadCart().map((i) =>
      i.id === productId ? { ...i, quantity: Math.max(1, qty) } : i
    );
    saveCart(items);
    return items;
  },

  removeFromCart(productId: number) {
    const items = loadCart().filter((i) => i.id !== productId);
    saveCart(items);
    return items;
  },

  clearCart() {
    saveCart([]);
  },
};
