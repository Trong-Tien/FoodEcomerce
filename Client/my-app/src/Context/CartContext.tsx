/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartService } from "@/Services/CardService"; // ✅ nhớ sửa đúng tên file
import type { CartItem } from "@/Type/Product";
import type { Product } from "@/Type/Product";

interface CartContextType {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  update: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;           // tổng tiền hàng
  shipping: number;        // phí vận chuyển
  totalQuantity: number;   // tổng số lượng sản phẩm trong giỏ
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // ✅ Lấy giỏ hàng đúng theo user đang đăng nhập
  const loadCart = () => {
    const data = CartService.getCart();
    setItems(data);
  };

  // ✅ Load giỏ hàng khi app khởi động
  useEffect(() => {
    loadCart();
  }, []);

  // ✅ Theo dõi thay đổi user → tự load lại giỏ hàng
  useEffect(() => {
    const handleStorageChange = () => {
      loadCart();
    };

    // Khi localStorage (user) thay đổi => load lại
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Thêm sản phẩm vào giỏ
  const add = (p: Product, qty = 1) => {
    const updated = CartService.addToCart(p, qty);
    setItems(updated);
  };

  // ✅ Cập nhật số lượng
  const update = (id: string, qty: number) => {
    const updated = CartService.updateQuantity(id, qty);
    setItems(updated);
  };

  // ✅ Xóa sản phẩm khỏi giỏ
  const remove = (id: string) => {
    const updated = CartService.removeFromCart(id);
    setItems(updated);
  };

  // ✅ Xóa toàn bộ giỏ hàng
  const clear = () => {
    CartService.clearCart();
    setItems([]);
  };

  // ✅ Tính tổng tiền
  const total = items.reduce(
    (sum, i) => sum + i.unitPrice * (1 - i.discount / 100) * i.quantity,
    0
  );

  // ✅ Tính tổng số lượng
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  // ✅ Tính phí vận chuyển
  const shipping = total >= 300000 ? 0 : 15000;

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        update,
        remove,
        clear,
        total,
        shipping,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ✅ Hook tiện dụng
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải được bọc trong <CartProvider>");
  return ctx;
}
