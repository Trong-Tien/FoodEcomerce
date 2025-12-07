// src/Services/ProductService.ts
import type { Product } from "@/Type/Product";

const API_BASE = "https://foodecomerceapi.runasp.net/api";


const mapProduct = (p: any): Product => ({
  ...p,

  // ✅ Chuẩn hóa hình ảnh (xử lý cả imageProducts & images)
  images:
    Array.isArray(p.imageProducts) && p.imageProducts.length > 0
      ? p.imageProducts
          .map(
            (img: any) =>
              `${API_BASE}/File/image?path=${encodeURIComponent(img.imageUrl)}`
          )
          .join(",")
      : typeof p.images === "string" && p.images.length > 0
      ? p.images
          .split(",")
          .map(
            (path: string) =>
              `${API_BASE}/File/image?path=${encodeURIComponent(path)}`
          )
          .join(",")
      : "",

  // ✅ Đảm bảo luôn có unitCaculateId để dùng trong Cart
  unitCaculateId:
    p.unitCaculate?.id || p.unitCaculateId || "00000000-0000-0000-0000-000000000000",

  // ✅ Gắn thêm tên đơn vị (nếu cần hiển thị)
  unitCaculate: p.unitCaculate
    ? {
        id: p.unitCaculate.id,
        name: p.unitCaculate.name,
      }
    : undefined,

  // ✅ Chuẩn hóa danh mục (phòng trường hợp backend trả trống)
  productCategories: Array.isArray(p.productCategories)
    ? p.productCategories
    : [],

  // ✅ Gắn thêm các khóa phụ trợ nếu backend trả null
  tradeMarkId: p.tradeMark?.id || p.tradeMarkId || "",
  placeProductId: p.placeProduct?.id || p.placeProductId || "",
  categoryId:
    Array.isArray(p.productCategories) && p.productCategories.length > 0
      ? p.productCategories[0].categoryId
      : "",
});


export const productService = {
  /** 🔹 Lấy toàn bộ sản phẩm (có phân trang) */
  async getAll(pageNumber: number = 1, pageSize: number = 12): Promise<Product[]> {
    const url = `${API_BASE}/Product/getall?pageNumber=${pageNumber}&pageSize=${pageSize}&ids=00000000-0000-0000-0000-000000000000`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Không tải được danh sách sản phẩm");
    const data = await res.json();
    return (data.items || data).map(mapProduct);
  },

  // ✅ Lấy sản phẩm theo danh mục (dùng query param `ids=` — vì backend của bạn dùng cách này)
  async getByCategory(
    categoryId: string,
    pageNumber: number = 1,
    pageSize: number = 12
  ): Promise<Product[]> {
    const url = `${API_BASE}/Product/getall?pageNumber=${pageNumber}&pageSize=${pageSize}&ids=${categoryId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Không tải được sản phẩm theo danh mục");
    const data = await res.json();
    return (data.items || data).map(mapProduct);
  },

  /** 🔹 Lấy chi tiết 1 sản phẩm */
  async getById(id: string): Promise<Product | null> {
    const url = `${API_BASE}/Product/getbyid/${id}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return mapProduct(data);
  },


    async searchProduct({
  pageNumber = 1,
  pageSize = 12,
  ids = "00000000-0000-0000-0000-000000000000",
  orderType = 3,
  keyWord = ""
}: {
  pageNumber?: number;
  pageSize?: number;
  ids?: string;
  orderType?: number;
  keyWord?: string;
}): Promise<Product[]> {

  const params = new URLSearchParams();
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());
  params.append("ids", ids);
  params.append("orderType", orderType.toString());
  if (keyWord.trim() !== "") params.append("keyword", keyWord);

  const url = `${API_BASE}/Product/getall?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Không tìm được sản phẩm");

  const data = await res.json();
  return (data.items || data).map(mapProduct);
},


};



export default productService;
