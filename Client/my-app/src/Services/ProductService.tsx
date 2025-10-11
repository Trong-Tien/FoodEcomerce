// src/Services/ProductService.ts
import type { Product } from "@/Type/Product";

const API_BASE = "http://localhost:5292/api";

// ✅ Hàm chuẩn hóa đường dẫn ảnh (xử lý imageProducts & images)
const mapProduct = (p: Product): Product => ({
  ...p,
  images:
    Array.isArray(p.imageProducts) && p.imageProducts.length > 0
      ? p.imageProducts
          .map(
            (img) =>
              `${API_BASE}/File/image?path=${encodeURIComponent(img.imageUrl)}`
          )
          .join(",")
      : typeof p.images === "string" && p.images.length > 0
      ? p.images
          .split(",")
          .map(
            (path) => `${API_BASE}/File/image?path=${encodeURIComponent(path)}`
          )
          .join(",")
      : "",
});

export const productService = {
  // ✅ Lấy toàn bộ sản phẩm (có phân trang)
  async getAll(
    pageNumber: number = 1,
    pageSize: number = 12
  ): Promise<Product[]> {
    const url = `${API_BASE}/Product/getall?pageNumber=${pageNumber}&pageSize=${pageSize}&ids=00000000-0000-0000-0000-000000000000`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Không tải được danh sách sản phẩm");
    const data: Product[] = await res.json();
    return data.map(mapProduct);
  },

  // ✅ Lấy sản phẩm theo danh mục (dùng query param `ids=` — vì backend của bạn dùng cách này)
  async getByCategory(
    categoryId: string,
    pageNumber: number = 1,
    pageSize: number = 12
  ): Promise<Product[]> {
    const url = `${API_BASE}/Product/getall?pageNumber=${pageNumber}&pageSize=${pageSize}&ids=${categoryId}`;
    const res = await fetch(url);
    if (!res.ok)
      throw new Error("Không tải được sản phẩm theo danh mục");
    const data: Product[] = await res.json();
    return data.map(mapProduct);
  },

  // ✅ Lấy chi tiết 1 sản phẩm
  async getById(id: string): Promise<Product | null> {
    const url = `${API_BASE}/Product/getbyid/${id}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data: Product = await res.json();
    return mapProduct(data);
  },
};

export default productService;
