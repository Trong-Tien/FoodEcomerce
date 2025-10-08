// src/Services/ProductService.ts
import type { Product } from "@/Type/Product";

const API_BASE = "http://localhost:5292/api";

export const productService = {
  // ✅ Thêm 2 tham số mặc định pageNumber & pageSize
  async getAll(pageNumber: number = 1, pageSize: number = 12): Promise<Product[]> {
  const url = `${API_BASE}/Product/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}&ids=00000000-0000-0000-0000-000000000000`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Không tải được sản phẩm");

  const data: Product[] = await res.json();

  const mapProduct = (p: Product): Product => ({
    ...p,
    images:
      typeof p.images === "string" && p.images.length > 0
        ? p.images
            .split(",")
            .map(
              (path) =>
                `${API_BASE}/File/image?path=${encodeURIComponent(path)}`
            )
            .join(",")
        : "",
  });

  return data.map(mapProduct);
}
};
