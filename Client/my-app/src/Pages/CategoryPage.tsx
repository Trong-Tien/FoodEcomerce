import { useEffect, useState } from "react"
import { useParams, useNavigate } from "@tanstack/react-router"
import productService from "@/Services/ProductService"
import ProductCard from "@/Component/Common/ProductCard"
import type { Product } from "@/Type/Product"
import Header from "@/Component/Home/Header"
import Footer from "@/Component/Home/Footer"
import SubCategoryMenu from "@/Component/Home/SubCategoryMenu"

interface Category {
  id: string
  name: string
  description?: string
  imageUrl?: string
  categoryParentId?: string | null
  categorys?: Category[] | null
}

export default function CategoryPage() {
  const { category } = useParams({ from: "/category/$category" })
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null)
  const [subCategories, setSubCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [pageSize] = useState(10)

  // kiểu sắp xếp hiện tại
  const [sortType, setSortType] = useState<string>("")

  const API_BASE = "https://foodecomerceapi.runasp.net"

  // ✅ Flatten danh mục
  const flattenCategories = (categories: Category[]): Category[] => {
    const result: Category[] = []
    const traverse = (cats: Category[]): void => {
      for (const c of cats) {
        result.push({
          id: c.id,
          name: c.name,
          description: c.description,
          imageUrl: c.imageUrl,
          categoryParentId: c.categoryParentId,
        })
        if (Array.isArray(c.categorys) && c.categorys.length > 0) traverse(c.categorys)
      }
    }
    traverse(categories)
    return result
  }

  // ✅ Hàm lấy giá & tên để sort (chỉnh lại field nếu khác)
  const getPrice = (p: any): number => {
    // đổi sang field thật của bạn, ví dụ p.price, p.unitPrice, p.sellPrice...
    return Number(p.price ?? p.unitPrice ?? p.salePrice ?? 0)
  }

  const getName = (p: any): string => {
    // đổi sang field thật của bạn, ví dụ p.name hoặc p.productName
    return (p.name ?? p.productName ?? "").toString()
  }

  // ✅ Hàm sắp xếp
  const sortProducts = (items: Product[], sort: string): Product[] => {
    const sorted = [...items]

    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => getPrice(a) - getPrice(b))
        break
      case "price-desc":
        sorted.sort((a, b) => getPrice(b) - getPrice(a))
        break
      case "name-asc":
        sorted.sort((a, b) => getName(a).localeCompare(getName(b)))
        break
      case "name-desc":
        sorted.sort((a, b) => getName(b).localeCompare(getName(a)))
        break
      default:
        return items
    }

    return sorted
  }

  // ✅ Load tất cả danh mục
  useEffect(() => {
    fetch(`${API_BASE}/api/Category/GetAll`)
      .then((res) => res.json())
      .then((data: Category[]) => setAllCategories(flattenCategories(data)))
      .catch(() => setAllCategories([]))
  }, [])

  // ✅ Lấy thông tin danh mục hiện tại
  useEffect(() => {
    if (!category) return
    fetch(`${API_BASE}/api/Category/GetById?id=${category}`)
      .then((res) => res.json())
      .then((data: Category) => setCategoryInfo(data))
      .catch(() => setCategoryInfo(null))
  }, [category])

  // ✅ Lọc danh mục con cùng cấp
  useEffect(() => {
    if (!categoryInfo || allCategories.length === 0) return

    const isRoot =
      !categoryInfo.categoryParentId || categoryInfo.categoryParentId === "00000000-0000-0000-0000-000000000000"

    let filtered: Category[] = []

    if (isRoot) {
      filtered = allCategories.filter((c: Category) => c.categoryParentId === categoryInfo.id)
    } else {
      filtered = allCategories.filter((c: Category) => c.categoryParentId === categoryInfo.categoryParentId)
    }

    if (filtered.length === 0) {
      filtered = allCategories.filter(
        (c: Category) => !c.categoryParentId || c.categoryParentId === "00000000-0000-0000-0000-000000000000",
      )
    }

    setSubCategories(filtered)
  }, [categoryInfo, allCategories])

  // ✅ Lấy sản phẩm
  const loadProducts = async (page: number, append = false): Promise<void> => {
    if (!category) return

    if (append) setLoadingMore(true)
    else setLoading(true)

    try {
      const res = await productService.getByCategory(category, page, pageSize)
      const items: Product[] = Array.isArray(res) ? res : []

      const fixed = items.map((p: any) => ({
        ...p,
        images:
          Array.isArray(p.imageProducts) && p.imageProducts.length > 0
            ? p.imageProducts
                .map((img: any) =>
                  img.imageUrl?.startsWith("http") ? img.imageUrl : `${API_BASE}/${img.imageUrl.replace(/^\/+/, "")}`,
                )
                .join(",")
            :  p?.image=="" ? p.image
              : "/no-image.png",
      }))

      if (append) {
        setProducts((prev) => {
          const merged = [...prev, ...fixed]
          return sortProducts(merged, sortType)
        })
      } else {
        setProducts(sortProducts(fixed, sortType))
      }

      setHasMore(items.length >= pageSize)
    } catch (err) {
      console.error("❌ Lỗi tải sản phẩm:", err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // Khi đổi danh mục → reset list & gọi lại
  useEffect(() => {
    setProducts([])
    setPageNumber(1)
    setHasMore(true)
    loadProducts(1, false)
  }, [category])

  // Khi đổi kiểu sort → sắp xếp lại list hiện tại
  useEffect(() => {
    setProducts((prev) => sortProducts(prev, sortType))
  }, [sortType])

  const handleLoadMore = (): void => {
    const nextPage = pageNumber + 1
    setPageNumber(nextPage)
    loadProducts(nextPage, true)
  }

  /* ==========================================================
     🎨 MODERN DESIGN - Hiện đại & Tối ưu UX
  ========================================================== */
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />

      <div className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <button
            onClick={() => navigate({ to: "/" })}
            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
          >
            Trang chủ
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-semibold">{categoryInfo?.name || "Danh mục"}</span>
        </div>

        {/* Subcategory menu */}
        {subCategories.length > 0 && (
          <div className="mb-8">
            <SubCategoryMenu
              subCategories={subCategories.map((c: Category) => ({
                id: c.id,
                name: c.name,
                icon: c.imageUrl ? `${API_BASE}/api/File/image?path=${encodeURIComponent(c.imageUrl)}` : undefined,
              }))}
              activeId={category}
            />
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 border border-slate-100">
          {/* Header section */}
          <div className="mb-6 pb-6 border-b border-slate-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                {categoryInfo?.name || "Danh mục sản phẩm"}
              </h1>
              {categoryInfo?.description && (
                <p className="text-slate-600 mt-2 leading-relaxed">{categoryInfo.description}</p>
              )}
            </div>

            {/* SORT BAR – vị trí bạn khoanh đỏ */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">Sắp xếp:</span>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Mặc định</option>
                <option value="price-asc">Giá: Thấp → Cao</option>
                <option value="price-desc">Giá: Cao → Thấp</option>
                <option value="name-asc">Tên: A → Z</option>
                <option value="name-desc">Tên: Z → A</option>
              </select>
            </div>
          </div>

          {/* Products grid */}
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

              {/* Load more section */}
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
                  <p className="text-slate-500 font-medium">✓ Bạn đã xem hết tất cả sản phẩm trong danh mục này</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-slate-600 font-medium">Không có sản phẩm nào trong danh mục này</p>
              <p className="text-slate-500 text-sm mt-2">Hãy thử chọn danh mục khác hoặc quay lại trang chủ</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
