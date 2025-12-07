"use client";

import { useEffect, useState } from "react";
import productService from "@/Services/ProductService";
import type { Product } from "@/Type/Product";
import Header from "@/Component/Home/Header";
import Footer from "@/Component/Home/Footer";
import ProductCard from "@/Component/Common/ProductCard";
import { useSearch } from "@tanstack/react-router";

export default function SearchPage() {
  const { keyword } = useSearch({ from: "/SearchProduct/" });
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const API_BASE = "https://localhost:7004";

  const loadProducts = async (page: number, append = false) => {
    if (!keyword || keyword.trim() === "") return;

    if (append) setLoadingMore(true);
    else setLoading(true);

    try {
      const res = await productService.searchProduct({
        keyWord: keyword,
        pageNumber: page,
        pageSize: pageSize
      });
      const items: Product[] = Array.isArray(res) ? res : [];

      const fixed = items.map((p: any) => ({
        ...p,
        images:
          Array.isArray(p.imageProducts) && p.imageProducts.length > 0
            ? p.imageProducts
                .map((img: any) =>
                  img.imageUrl?.startsWith("http")
                    ? img.imageUrl
                    : `${API_BASE}/${img.imageUrl.replace(/^\/+/, "")}`
                )
                .join(",")
            : typeof p.images === "string" && p.images.length > 0
            ? p.images
                .split(",")
                .map((path: string) =>
                  path.startsWith("http") ? path : `${API_BASE}/${path.replace(/^\/+/, "")}`
                )
                .join(",")
            : "/no-image.png",
      }));

      if (append) {
        setProducts((prev) => [...prev, ...fixed]);
      } else {
        setProducts(fixed);
      }

      setHasMore(items.length >= pageSize);
    } catch (err) {
      console.error("❌ Lỗi tải sản phẩm:", err);
      if (!append) setProducts([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPageNumber(1);
    setHasMore(true);
    loadProducts(1, false);
  }, [keyword]);

  const handleLoadMore = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    loadProducts(nextPage, true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      <div className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Keyword */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className="text-slate-700 font-semibold">
            Kết quả tìm kiếm cho: "{keyword}"
          </span>
        </div>

        {/* Products container */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 border border-slate-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-emerald-600 animate-spin"></div>
              <p className="text-slate-500 mt-4 font-medium">Đang tải sản phẩm...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                {products.map((p: Product) => (
                  <div key={p.id} className="transform transition-transform duration-200 hover:scale-105">
                    <ProductCard p={p} />
                  </div>
                ))}
              </div>

              {hasMore ? (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="relative px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {loadingMore ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Đang tải thêm...
                      </span>
                    ) : (
                      "Xem thêm sản phẩm"
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 font-medium">✓ Bạn đã xem hết tất cả sản phẩm</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-slate-600 font-medium">Không tìm thấy sản phẩm nào.</p>
              <p className="text-slate-500 text-sm mt-2">
                Hãy thử nhập từ khóa khác
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
