import type { Category } from "@/Type/Category";

const API_BASE = "https://localhost:7004/api";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/Category/GetAll`);
    if (!res.ok) throw new Error("Không tải được danh mục");

    const data: Category[] = await res.json();

    // Hàm đệ quy để map cả category con
    const mapCategory = (c: Category): Category => ({
      ...c,
      imageUrl: c.imageUrl
        ? `${API_BASE}/File/image?path=${encodeURIComponent(c.imageUrl)}`
        : "", // ✅ fallback về chuỗi rỗng
      categorys: c.categorys ? c.categorys.map(mapCategory) : [], // luôn trả về mảng
    });

    return data.map(mapCategory);
  },
};
