import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Route } from "@/routes/category/$category"; // 👈 import Route
import productService from "@/Services/ProductService";
import ProductCard from "@/Component/Common/ProductCard";
import type { Product } from "@/Types/product";

export default function CategoryPage() {
  // ✅ đúng cú pháp cho TanStack Router v1
  const { category } = useParams({ from: Route.id });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    productService.getByCategory(category).then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-3 py-6 space-y-6">
      <h1 className="text-2xl font-bold capitalize border-b pb-2">
        Danh mục: {category}
      </h1>

      {loading && <p className="text-gray-500 italic">Đang tải sản phẩm...</p>}

      {!loading && products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500">Không có sản phẩm nào</p>
      )}
    </div>
  );
}
