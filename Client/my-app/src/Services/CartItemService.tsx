import type { CartItem, Product } from "@/Type/Product";

const API_BASE = "http://localhost:5292/api/CartItem" ;

/* ============================================================
   🔹 Lấy token từ localStorage để xác thực
============================================================ */
function getAuthHeader(): Record<string, string> {
  try {
    const token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

/* ============================================================
   🔹 Lấy CartId từ user (ưu tiên cartId, fallback user.id)
============================================================ */
function getCartId(): string | null {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user.cartId || user.id || null;
  } catch {
    return null;
  }
}

/* ============================================================
   🔹 Service quản lý CartItem
============================================================ */
export const CartItemService = {
  /** 🔹 Lấy danh sách item trong giỏ hàng */
  async getByCartId(): Promise<CartItem[]> {
    const cartId = getCartId();
    if (!cartId) {
      console.warn("⚠️ Không có CartId trong localStorage!");
      return [];
    }

    const res = await fetch(`${API_BASE}/GetByCartId?cartId=${cartId}`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (!res.ok) throw new Error("Không thể tải giỏ hàng");
    const data = await res.json();

    // ✅ Backend trả mảng trực tiếp
    return Array.isArray(data) ? data : [];
  },

  /** 🔹 Thêm sản phẩm vào giỏ hàng */
async create(product: Product, qty: number): Promise<CartItem> {
  const cartId = getCartId();
  if (!cartId) throw new Error("Thiếu cartId");

  localStorage.setItem("lastProduct", JSON.stringify(product));

  // ✅ Tính giá sau giảm
  const discountedPrice =
    product.discount && product.discount > 0
      ? Math.round(product.unitPrice * (1 - product.discount / 100))
      : Number(product.unitPrice) || 0;

  // ✅ Kiểm tra xem đã có item cùng productId chưa
  const existingItemsStr = localStorage.getItem("cart_items_cache");
  if (existingItemsStr) {
    const existingItems = JSON.parse(existingItemsStr);
    const existing = existingItems.find(
      (i: any) => i.productId === product.id
    );

    if (existing) {
      // ✅ Nếu đã có → chỉ cập nhật số lượng
      const newQty = Number(existing.quantity || 0) + qty;
      console.log(
        `🧮 Đã có sẵn ${product.name}, tăng số lượng lên ${newQty}`
      );
      await this.update(existing.id, newQty);
      return existing;
    }
  }

  // ✅ Nếu chưa có → tạo mới
  const payload = {
    Id: crypto.randomUUID(),
    CartId: cartId,
    ProductId: product.id,
    UnitCaculateId:
      product.unitCaculateId ||
      product.unitCaculate?.id ||
      "00000000-0000-0000-0000-000000000000",
    Quantity: qty,
    UnitPrice: discountedPrice,
    TotalPrice: discountedPrice * qty,
  };

  console.log("🧾 [CartItemService.create] Payload gửi BE:", payload);

  const res = await fetch(`${API_BASE}/Create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ [CartItemService.create] Lỗi:", errText);
    throw new Error("Không thể thêm sản phẩm vào giỏ");
  }

  const result = await res.json().catch(() => null);

  return (
    result || {
      id: crypto.randomUUID(),
      cartId,
      productId: product.id,
      quantity: qty,
      unitPrice: discountedPrice,
      discount: product.discount || 0,
      totalPrice: discountedPrice * qty,
      productName: product.name,
    }
  );
}
,

  /** 🔹 Cập nhật số lượng sản phẩm */
  async update(id: string, qty: number): Promise<void> {
    const cartId = getCartId();
    if (!cartId) throw new Error("Thiếu cartId");

    // ✅ Lấy thông tin item hiện tại từ cache FE
    const allItemsStr = localStorage.getItem("cart_items_cache");
    let currentItem: any = null;
    if (allItemsStr) {
      const allItems = JSON.parse(allItemsStr);
      currentItem = allItems.find((i: any) => i.id === id);
    }

    if (!currentItem) {
      console.warn("⚠️ Không tìm thấy item trong cache để update.");
      return;
    }

    // ✅ Tính lại tổng tiền theo số lượng mới
    const newTotalPrice = (Number(currentItem.unitPrice) || 0) * qty;

    const payload = {
      Id: id,
      CartId: cartId,
      ProductId: currentItem.productId,
      UnitCaculateId: currentItem.unitCaculateId,
      Quantity: qty,
      UnitPrice: Number(currentItem.unitPrice) || 0,
      TotalPrice: newTotalPrice,
    };

    console.log("🧾 [CartItemService.update] Payload gửi BE:", payload);

    const res = await fetch(`${API_BASE}/Update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ [CartItemService.update] Lỗi cập nhật:", errText);
      throw new Error("Không thể cập nhật sản phẩm");
    }

    console.log(
      `✅ [CartItemService.update] Cập nhật thành công: SL ${qty} → Tổng ${newTotalPrice}`
    );
  },

  /** 🔹 Xoá 1 sản phẩm khỏi giỏ hàng */
  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/Delete?id=${id}`, {
      method: "DELETE",
      headers: {
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ [CartItemService.delete] Lỗi xoá sản phẩm:", errText);
      throw new Error("Không thể xoá sản phẩm");
    }

    console.log(`🗑️ [CartItemService.delete] Đã xoá sản phẩm id=${id}`);
  },
};