import { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import productService from "@/Services/ProductService";
import ProductCard from "@/Component/Common/ProductCard";
import type { Product } from "@/Type/Product";
import Header from "@/Component/Home/Header";
import Footer from "@/Component/Home/Footer";
import SubCategoryMenu from "@/Component/Home/SubCategoryMenu";

interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  categoryParentId?: string | null;
  categorys?: Category[] | null;
}

export default function CategoryPage() {
  const { category } = useParams({ from: "/category/$category" });
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // ✅ Phân trang “xem thêm”
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const API_BASE = "http://localhost:5292";

  /* ==========================================================
     🔹 Flatten danh mục
  ========================================================== */
  const flattenCategories = (categories: Category[]): Category[] => {
    const result: Category[] = [];
    const traverse = (cats: Category[]) => {
      for (const c of cats) {
        result.push({
          id: c.id,
          name: c.name,
          description: c.description,
          imageUrl: c.imageUrl,
          categoryParentId: c.categoryParentId,
        });
        if (Array.isArray(c.categorys) && c.categorys.length > 0) {
          traverse(c.categorys);
        }
      }
    };
    traverse(categories);
    return result;
  };

  /* ==========================================================
     🔹 Lấy danh mục
  ========================================================== */
  useEffect(() => {
    fetch(`${API_BASE}/api/Category/GetAll`)
      .then((res) => res.json())
      .then((data: Category[]) => setAllCategories(flattenCategories(data)))
      .catch(() => setAllCategories([]));
  }, []);

  /* ==========================================================
     🔹 Lấy thông tin danh mục hiện tại
  ========================================================== */
  useEffect(() => {
    if (!category) return;
    fetch(`${API_BASE}/api/Category/GetById?id=${category}`)
      .then((res) => res.json())
      .then((data: Category) => setCategoryInfo(data))
      .catch(() => setCategoryInfo(null));
  }, [category]);

  /* ==========================================================
     🔹 Lọc danh mục con đúng cấp
  ========================================================== */
  useEffect(() => {
    if (!categoryInfo || allCategories.length === 0) return;

    const isRoot =
      !categoryInfo.categoryParentId ||
      categoryInfo.categoryParentId === "00000000-0000-0000-0000-000000000000";

    let filtered: Category[] = [];

    if (isRoot) {
      filtered = allCategories.filter(
        (c) => c.categoryParentId === categoryInfo.id
      );
    } else {
      filtered = allCategories.filter(
        (c) => c.categoryParentId === categoryInfo.categoryParentId
      );
    }

    if (filtered.length === 0) {
      filtered = allCategories.filter(
        (c) =>
          !c.categoryParentId ||
          c.categoryParentId === "00000000-0000-0000-0000-000000000000"
      );
    }

    setSubCategories(filtered);
  }, [categoryInfo, allCategories]);

  /* ==========================================================
     🔹 Lấy sản phẩm (theo trang)
  ========================================================== */
  const loadProducts = async (page: number, append = false) => {
    if (!category) return;

    if (append) setLoadingMore(true);
    else setLoading(true);

    try {
      // ✅ productService trả về mảng Product[], không có .items
      const res = await productService.getByCategory(category, page, pageSize);
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
                  path.startsWith("http")
                    ? path
                    : `${API_BASE}/${path.replace(/^\/+/, "")}`
                )
                .join(",")
            : "/no-image.png",
      }));

      if (append) {
        setProducts((prev) => [...prev, ...fixed]);
      } else {
        setProducts(fixed);
      }

      // ✅ Kiểm tra còn sản phẩm để “Xem thêm” không
      if (items.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (err) {
      console.error("❌ Lỗi tải sản phẩm:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // ✅ Gọi khi thay danh mục
  useEffect(() => {
    setProducts([]);
    setPageNumber(1);
    setHasMore(true);
    loadProducts(1, false);
  }, [category]);

  /* ==========================================================
     🔹 Xử lý nút “Xem thêm”
  ========================================================== */
  const handleLoadMore = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    loadProducts(nextPage, true);
  };

  /* ==========================================================
     🔹 Giao diện
  ========================================================== */
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* ✅ Breadcrumb */}
      <div className="pt-[130px] max-w-7xl mx-auto px-4">
        <div className="text-sm text-gray-600 mb-3 flex flex-wrap items-center gap-1">
          <span
            onClick={() => navigate({ to: "/" })}
            className="cursor-pointer text-green-600 hover:underline"
          >
            Trang chủ
          </span>
          <span>/</span>
          <span className="text-green-800 font-semibold">
            {categoryInfo?.name || "Danh mục"}
          </span>
        </div>
      </div>

      {/* ✅ Menu ngang danh mục con */}
      {subCategories.length > 0 && (
        <SubCategoryMenu
          subCategories={subCategories.map((c) => ({
            id: c.id,
            name: c.name,
            icon: c.imageUrl
              ? `${API_BASE}/api/File/image?path=${encodeURIComponent(
                  c.imageUrl
                )}`
              : undefined,
          }))}
          activeId={category}
        />
      )}

      {/* ✅ Danh sách sản phẩm */}
      <main className="max-w-7xl mx-auto px-3 py-6 space-y-6">
        <h1 className="text-2xl font-bold capitalize border-b pb-2 text-green-700">
          {categoryInfo?.name || "Danh mục sản phẩm"}
        </h1>

        {loading ? (
          <p className="text-gray-500 italic text-center">Đang tải sản phẩm...</p>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>

            {/* ✅ Nút “Xem thêm sản phẩm” */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 shadow transition-all disabled:opacity-60"
                >
                  {loadingMore ? "Đang tải thêm..." : "Xem thêm sản phẩm"}
                </button>
              </div>
            )}

            {!hasMore && (
              <p className="text-center text-gray-500 mt-4">
                🎉 Bạn đã xem hết tất cả sản phẩm trong danh mục này!
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center">
            Không có sản phẩm nào trong danh mục này.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
