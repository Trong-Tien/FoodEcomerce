import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import productService from "@/Services/ProductService";
import ProductCard from "@/Component/Common/ProductCard";
import type { Product } from "@/Type/Product";

// ✅ Chuẩn hóa ảnh theo quy tắc ngày 8/10
const mapProductToUI = (p: Product) => ({
  ...p,
  price: p.unitPrice * (1 - p.discount / 100),
  oldPrice: p.discount > 0 ? p.unitPrice : undefined,
  img:
    typeof p.images === "string" && p.images.length > 0
      ? `https://localhost:7004/api/File/image?path=${encodeURIComponent(
          p.images.split(",")[0]
        )}`
      : "/assets/img/no-image.png",
});

export default function CategoryPage() {
  // ✅ Lấy categoryId từ URL
  const { category } = useParams({ from: "/category/$category" });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    productService
      .getByCategory(category)
      .then((res) => setProducts(res))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err))
      .finally(() => setLoading(false));
  }, [category]);

  const mapped = products.map(mapProductToUI);

  return (
    <div className="max-w-7xl mx-auto px-3 py-6 space-y-6">
      <h1 className="text-2xl font-bold capitalize border-b pb-2 text-green-700">
        Danh mục: {category}
      </h1>

      {loading && (
        <p className="text-gray-500 italic text-center">Đang tải sản phẩm...</p>
      )}

      {!loading && mapped.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mapped.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-gray-500 text-center">
            Không có sản phẩm nào trong danh mục này
          </p>
        )
      )}
    </div>
  );
}
