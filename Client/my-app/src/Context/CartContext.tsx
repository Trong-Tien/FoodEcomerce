/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartService } from "@/Services/CardService";
import type { Product, CartItem } from "@/Types/product";

interface CartContextType {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  update: (productId: number, qty: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
  total: number;
  shipping: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(CartService.getCart());
  }, []);

  const add = (p: Product, qty = 1) => {
    const updated = CartService.addToCart(p, qty);
    setItems(updated);
  };

  const update = (id: number, qty: number) => {
    const updated = CartService.updateQuantity(id, qty);
    setItems(updated);
  };

  const remove = (id: number) => {
    const updated = CartService.removeFromCart(id);
    setItems(updated);
  };

  const clear = () => {
    CartService.clearCart();
    setItems([]);
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = total >= 300000 ? 0 : 15000; // freeship trên 300k

  return (
    <CartContext.Provider
      value={{ items, add, update, remove, clear, total, shipping }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải được bọc bởi CartProvider");
  return ctx;
}
