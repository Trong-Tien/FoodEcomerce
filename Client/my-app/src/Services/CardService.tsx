// src/Services/CardService.ts
import type { Product } from "@/Type/Product";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  images: string;
}

const STORAGE_KEY = "cart";

function getCart(): CartItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(product: Product, qty = 1): CartItem[] {
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      quantity: qty,
      unitPrice: product.unitPrice,
      discount: product.discount,
      images: product.images,
    });
  }

  saveCart(cart);
  return cart;
}

// ✅ Đổi id: number → string
function updateQuantity(id: string, qty: number): CartItem[] {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) item.quantity = qty;
  saveCart(cart);
  return cart;
}

// ✅ Đổi id: number → string
function removeFromCart(id: string): CartItem[] {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEY);
}

export const CartService = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
