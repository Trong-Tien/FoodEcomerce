// src/Services/CartService.ts
import type { Product, CartItem } from "@/Type/Product";

const CART_KEY_PREFIX = "cart_";

// 🔹 Lấy key lưu giỏ hàng theo user
function getUserCartKey(): string {
  const userStr = localStorage.getItem("user");
  if (!userStr) return `${CART_KEY_PREFIX}guest`;

  try {
    const user = JSON.parse(userStr);
    if (user && user.id) return `${CART_KEY_PREFIX}${user.id}`;
    return `${CART_KEY_PREFIX}guest`;
  } catch {
    return `${CART_KEY_PREFIX}guest`;
  }
}

// 🔹 Lấy giỏ hàng của user hiện tại
function getCart(): CartItem[] {
  const key = getUserCartKey();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// 🔹 Lưu giỏ hàng của user hiện tại
function saveCart(cart: CartItem[]) {
  const key = getUserCartKey();
  localStorage.setItem(key, JSON.stringify(cart));
}

// 🔹 Thêm sản phẩm vào giỏ
function addToCart(product: Product, qty = 1): CartItem[] {
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);

  if (existing) {
    existing.quantity += qty;
  } else {
    const firstImage =
      typeof product.images === "string"
        ? product.images.split(",")[0]
        : "/assets/img/no-image.png";

    cart.push({
      id: product.id,
      name: product.name,
      quantity: qty,
      unitPrice: product.unitPrice,
      discount: product.discount,
      images: firstImage,
    });
  }

  saveCart(cart);
  return cart;
}

// 🔹 Cập nhật số lượng sản phẩm
function updateQuantity(id: string, qty: number): CartItem[] {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) item.quantity = qty;
  saveCart(cart);
  return cart;
}

// 🔹 Xóa 1 sản phẩm khỏi giỏ
function removeFromCart(id: string): CartItem[] {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

// 🔹 Xóa giỏ hàng của user hiện tại
function clearCart() {
  const key = getUserCartKey();
  localStorage.removeItem(key);
  return [];
}

export const CartService = {
  getCart,
  saveCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
