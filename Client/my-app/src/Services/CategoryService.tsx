const API_BASE = "http://localhost:5292/api";

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string; // backend trả về relative path
}

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/Category/GetAll`);
    if (!res.ok) throw new Error("Không tải được danh mục");

    const data = await res.json();
    const items: Category[] = data.items || [];

    // ✅ map thêm full URL cho imageUrl để frontend chỉ việc dùng
    return items.map((c) => ({
      ...c,
      imageUrl: c.imageUrl
        ? `${API_BASE}/File/image?path=${encodeURIComponent(c.imageUrl)}`
        : undefined,
    }));
  },
};
