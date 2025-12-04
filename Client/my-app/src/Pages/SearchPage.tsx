"use client";

import { useEffect, useState } from "react";
import productService from "@/Services/ProductService";
import type { Product } from "@/Type/Product";
import { Link, useSearch } from "@tanstack/react-router";

export default function SearchPage() {
  const { keyword } = useSearch({ from: "/SearchProduct/" });

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Gọi API với param đúng tên "keyword"
        const result = await productService.searchProduct({
          keyWord: keyword
        });

        console.log("Keyword gửi đi:", keyword);
        console.log("Kết quả trả về:", result);

        setProducts(result || []);
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (keyword && keyword.trim() !== "") {
      fetchData();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [keyword]);

  if (loading) {
    return <div className="p-6 text-center text-lg">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Kết quả tìm kiếm cho: "{keyword}"
      </h2>

      {products.length === 0 && (
        <p className="text-gray-500">Không tìm thấy sản phẩm nào.</p>
      )}

      {/* Grid sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link
            key={p.id}
            to="/Product/$id"
            params={{ id: p.id }}
            className="border rounded-lg shadow hover:shadow-lg p-3 transition"
          >
            <img
              src={p.images?.split(",")[0] || "/no-image.png"}
              alt={p.name}
              className="h-32 w-full object-cover rounded"
            />

            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p className="text-red-600 font-bold">
              {p.unitPrice?.toLocaleString() || 0} đ
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
