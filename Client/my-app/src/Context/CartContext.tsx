/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItemService } from "@/Services/CartItemService";
import type { CartItem, Product } from "@/Type/Product";

interface CartContextType {
  items: CartItem[];
  add: (product: Product, qty?: number) => Promise<void>;
  update: (id: string, qty: number) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  total: number;
  shipping: number;
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  /* ============================================================
     🔹 Load giỏ hàng từ API
  ============================================================ */
  const loadCart = async () => {
    try {
      const data = await CartItemService.getByCartId();

      if (!Array.isArray(data)) {
        console.warn("⚠️ Dữ liệu giỏ hàng không hợp lệ:", data);
        setItems([]);
        return;
      }

      // ✅ Gom nhóm các item cùng productId
const grouped = Object.values(
  data.reduce((acc: Record<string, any>, item: any) => {
    const pid = item.productId;
    if (!acc[pid]) {
      acc[pid] = {
        ...item,
        unitPrice: Number(item.unitPrice) || 0,
        quantity: Number(item.quantity) || 1,
        discount: Number(item.discount) || 0,
      };
    } else {
      acc[pid].quantity += Number(item.quantity) || 1;
      acc[pid].totalPrice += Number(item.totalPrice) || 0;
    }
    return acc;
  }, {})
);

setItems(grouped);
localStorage.setItem("cart_items_cache", JSON.stringify(grouped));

    } catch (err) {
      console.error("❌ Lỗi khi tải giỏ hàng:", err);
      setItems([]);
    }
  };

  /* ============================================================
     🔹 Tự động load khi login hoặc reload trang
  ============================================================ */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { cartId } = JSON.parse(storedUser);
      if (cartId) {
        console.log("🛒 Đang tải giỏ hàng cho CartId:", cartId);
        loadCart();
      } else {
        console.warn("⚠️ Không tìm thấy cartId trong user localStorage");
      }
    }
  }, []);

  /* ============================================================
     🔹 Thêm sản phẩm
  ============================================================ */
  const add = async (product: Product, qty = 1) => {
    try {
      await CartItemService.create(product, qty);
      await loadCart();
    } catch (error) {
      console.error("❌ Lỗi khi thêm sản phẩm:", error);
    }
  };

  /* ============================================================
     🔹 Cập nhật số lượng (UI mượt + đồng bộ BE)
  ============================================================ */
  const update = async (id: string, qty: number) => {
    try {
      // ✅ Cập nhật ngay trên UI (phản hồi tức thời)
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: qty,
                totalPrice: (Number(item.unitPrice) || 0) * qty,
              }
            : item
        )
      );

      // ✅ Gửi lên server
      await CartItemService.update(id, qty);

      // ⏳ Đợi backend commit DB rồi mới reload
      await new Promise((r) => setTimeout(r, 300));

      // ✅ Reload lại từ DB để đảm bảo dữ liệu chính xác
      await loadCart();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật giỏ hàng:", error);
    }
  };

  /* ============================================================
     🔹 Xoá sản phẩm
  ============================================================ */
  const remove = async (id: string) => {
    try {
      await CartItemService.delete(id);
      await loadCart();
    } catch (error) {
      console.error("❌ Lỗi khi xoá sản phẩm:", error);
    }
  };

  /* ============================================================
     🔹 Xoá toàn bộ giỏ
  ============================================================ */
  const clear = async () => {
    try {
      setItems([]);
      localStorage.removeItem("cart_items_cache");
    } catch (error) {
      console.error("❌ Lỗi khi xoá toàn bộ giỏ hàng:", error);
    }
  };

  /* ============================================================
     🔹 Tính tổng tiền, tổng SL và phí giao hàng
  ============================================================ */
  const total = items.reduce((sum, i) => {
    const price = Number(i.unitPrice) || 0;
    const discount = Number(i.discount) || 0;
    const quantity = Number(i.quantity) || 0;
    return sum + price * (1 - discount / 100) * quantity;
  }, 0);

  const totalQuantity = items.reduce(
    (sum, i) => sum + (Number(i.quantity) || 0),
    0
  );

  const shipping = total >= 300000 ? 0 : 15000;

  /* ============================================================
     🔹 Context Provider
  ============================================================ */
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

/* ============================================================
   🔹 Hook useCart để gọi nhanh
============================================================ */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải được bọc trong <CartProvider>");
  return ctx;
}
