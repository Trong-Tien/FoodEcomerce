"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Header from "@/Component/Home/Header"
import { productService } from "@/Services/ProductService"
import type { Product } from "@/Type/Product"
import ProductGroup from "@/Component/Home/ProductGroup"
import { useNavigate } from "@tanstack/react-router"
import Footer from "@/Component/Home/Footer"
import toast from "react-hot-toast"
import ProductReviewSection from "@/Component/Home/ProductReviewSection"
import { useAuth } from "@/Hooks/useAuth"
import { Route as ProductRoute } from "@/routes/product.$id"
import { ArrowLeft, Heart, ShoppingCart, Truck, Shield, ChevronLeft, ChevronRight } from "lucide-react"

// ❗ Import modal mua ngay
import ProductModal from "@/Component/Common/ProductModal"

const DetailProduct: React.FC = () => {
  const { id } = ProductRoute.useParams()

  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [activeTab, setActiveTab] = useState<"info" | "desc">("info")
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const leftRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  // ✅ State modal mua ngay
  const [open, setOpen] = useState(false)

  // -----------------------------------------------------------------------------------
  // 📌 LOAD SẢN PHẨM
  // -----------------------------------------------------------------------------------
  useEffect(() => {
    if (!id) return

    productService.getById(id).then((res) => {
      setProduct(res ?? null)

      if (res && res.images) {
        const imageArray =
          typeof res.images === "string" ? res.images.split(",").filter((img) => img.trim()) : [res.images]

        setImages(imageArray.length > 0 ? imageArray : ["/assets/img/no-image.png"])
        setActiveImageIndex(0)
      }
    })

    productService.getAll().then((all) => {
      const filtered = all.filter((p) => p.id !== id)
      setRelated(filtered.slice(0, 5))
    })
  }, [id])

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-emerald-50 to-white">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600 font-medium">Đang tải sản phẩm...</p>
        </div>
      </div>
    )
  }

  const discountedPrice = product.unitPrice * (1 - product.discount / 100)

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // ===================================================================================
  // ⭐⭐⭐ JSX RETURN ⭐⭐⭐
  // ===================================================================================
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 min-h-screen">
      <Header />

      <div className="pt-[122px] max-w-7xl mx-auto px-4 relative">
        <button
          onClick={() => navigate({ to: ".." })}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100"
        >
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Quay lại</span>
        </button>

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* LEFT SIDE */}
          <div className="col-span-12 lg:col-span-8" ref={leftRef}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
              <div className="space-y-4 p-4">
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center group">
                  <img
                    src={images[activeImageIndex] || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-slate-700 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-slate-700 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                      {activeImageIndex + 1}/{images.length}
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          activeImageIndex === idx
                            ? "border-emerald-600 shadow-md"
                            : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Ảnh ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* TAB */}
              <div className="border-b border-slate-200">
                <div className="flex px-6">
                  <button
                    className={`px-6 py-4 text-sm font-semibold relative transition-colors duration-300 ${
                      activeTab === "info" ? "text-emerald-600" : "text-slate-600 hover:text-slate-900"
                    }`}
                    onClick={() => setActiveTab("info")}
                  >
                    Thông tin sản phẩm
                    {activeTab === "info" && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                    )}
                  </button>

                  <button
                    className={`px-6 py-4 text-sm font-semibold relative transition-colors duration-300 ${
                      activeTab === "desc" ? "text-emerald-600" : "text-slate-600 hover:text-slate-900"
                    }`}
                    onClick={() => setActiveTab("desc")}
                  >
                    Mô tả chi tiết
                    {activeTab === "desc" && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                    )}
                  </button>
                </div>
              </div>

              {/* TAB CONTENT */}
              <div className="p-6 text-slate-700 leading-relaxed">
                {activeTab === "info" ? (
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-semibold mt-0.5">•</span>
                      <span>
                        <strong>Tên sản phẩm:</strong> {product.name}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-semibold mt-0.5">•</span>
                      <span>
                        <strong>Giá gốc:</strong> {product.unitPrice.toLocaleString("vi-VN")}₫
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-semibold mt-0.5">•</span>
                      <span>
                        <strong>Giảm giá:</strong> {product.discount}%
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-emerald-600 font-semibold mt-0.5">•</span>
                      <span>
                        <strong>Giá hiện tại:</strong>{" "}
                        <span className="text-lg text-emerald-600 font-bold">
                          {discountedPrice.toLocaleString("vi-VN")}₫
                        </span>
                      </span>
                    </li>
                  </ul>
                ) : (
                  <p className="text-slate-600 leading-relaxed">
                    {product.description ||
                      "Sản phẩm chất lượng cao, được nhập từ nguồn đáng tin cậy. Thích hợp cho mọi gia đình!"}
                  </p>
                )}
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-8">
                <ProductGroup
                  title="Sản phẩm liên quan"
                  products={related}
                  showMore={false}
                  titleStyle="minimal"
                  titleAlign="left"
                  bgVariant="emerald-light"
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDE (SIDEBAR) */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-32 space-y-4">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h2 className="text-xl font-bold text-slate-900 flex-1">{product.name}</h2>

                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-300"
                    >
                      <Heart
                        size={20}
                        className={`transition-all duration-300 ${
                          isFavorite ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-slate-600"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                        {discountedPrice.toLocaleString("vi-VN")}₫
                      </span>

                      {product.discount > 0 && (
                        <span className="inline-block bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {product.discount > 0 && (
                      <p className="text-sm text-slate-500 line-through">
                        {product.unitPrice.toLocaleString("vi-VN")}₫
                      </p>
                    )}
                  </div>
                </div>

                {/* NÚT MUA NGAY */}
                <div className="p-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast.error("Vui lòng đăng nhập để mua hàng!")
                        return
                      }
                      setOpen(true) // 🌟 MỞ MODAL CHUẨN
                    }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 active:scale-95"
                  >
                    <ShoppingCart size={20} />
                    <span>MUA NGAY</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
                      <Truck size={18} className="text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-900">Giao miễn phí</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <Shield size={18} className="text-blue-600" />
                      <span className="text-xs font-medium text-blue-900">100% hữu cơ</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
                <p className="text-sm text-emerald-900 font-medium">
                  ✓ Nếu tồn kho thay đổi, chúng tôi sẽ liên hệ trước khi giao hàng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEW */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h3>
          <ProductReviewSection productId={String(product.id)} />
        </div>

        <div className="mt-12">
          <Footer />
        </div>
      </div>

      {/*  MODAL MUA NGAY  */}
      {open && (
        <ProductModal
          product={product}     
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

export default DetailProduct
