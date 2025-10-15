// ========== Kiểu con ==========
export type ImageProduct = {
  id: string;
  imageUrl: string;
};

export type ProductCategory = {
  productId: string;
  categoryId: string;
};

// ========== Sản phẩm ==========
export type Product = {
  id: string;
  managementCode: string;
  name: string;
  description: string;
  unitPrice: number;
  quantityInStock: number;
  discount: number;
  isActive: boolean;
  inventory: number;
  expiry: string;
  preserve: string;
   unitCaculate?: {
    id: string;
    name: string;
  };

  // ✅ Vẫn giữ cho các service khác (form thêm sản phẩm)
  unitCaculateId?: string;
  images?: string; // ✅ có thể rỗng hoặc được map từ imageProducts
  tradeMarkId: string;
  placeProductId: string;
  imageProducts?: ImageProduct[];
  productCategories?: ProductCategory[];
  categoryId: string;

  

  tradeMark?: {
    id: number;
    name: string;
    imageUrl?: string | null;
    discription?: string | null;
    isDelete?: boolean;
  };

  placeProduct?: {
    id: number;
    name: string;
    discription?: string | null;
  };
};

// ========== Giỏ hàng ==========
export type CartItem = {
  id: string; // Guid của item
  cartId: string; // ✅ thêm
  productId: string; // ✅ thêm
  unitCaculateId?: string; // ✅ thêm (backend có)
  quantity: number;
  unitPrice: number;
  totalPrice: number; // ✅ thêm
  discount?: number; // Có thể null
  images?: string; // ảnh hiển thị (FE tự map)
  name?: string; // tên hiển thị (FE tự map)
};
