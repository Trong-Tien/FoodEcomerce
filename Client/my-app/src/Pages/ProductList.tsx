import { useEffect, useState } from "react";
import { productService } from "@/Services/ProductService";
import type { Product } from "@/Type/Product";
import ProductCard from "@/Component/Common/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService
      .getAll(1, 12)
      .then((data) => {
        // ✅ Map dữ liệu để ProductCard hiểu đúng
        const mapped = data.map((p) => ({
          ...p,
          img:
            typeof p.images === "string" && p.images.length > 0
              ? p.images.split(",")[0] // lấy ảnh đầu tiên
              : "/assets/img/no-image.png",
          price: p.unitPrice * (1 - p.discount / 100),
          oldPrice: p.discount > 0 ? p.unitPrice : undefined,
        }));
        setProducts(mapped);
      })
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        🛒 Danh sách sản phẩm
      </h2>

      {loading ? (
        <div className="text-gray-500 text-center py-4">Đang tải...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p as any} />
          ))}
        </div>
      )}
    </div>
  );
}
