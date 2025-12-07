"use client"

import type React from "react"
import { useState } from "react"
import { Flame, ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "../Common/ProductCard"
import type { Product } from "@/Type/Product"

interface ProductGroupProps {
  title: string
  products: Product[]
  loading?: boolean
  badge?: string
  bgColor?: string
  bgVariant?: "neutral" | "emerald-light" | "cream" | "sage" | "mint"
  maxItems?: number
  topBanners?: string[]
  bottomBanners?: string[]
  titleStyle?: "minimal" | "ecommerce"
  titleAlign?: "left" | "center"
  titleVariant?: "default" | "boxed" | "minimal"
  showTitle?: boolean
  showMore?: boolean
}

const ProductGroup: React.FC<ProductGroupProps> = ({
  title,
  products,
  loading,
  badge,
  bgColor = "bg-white",
  bgVariant = "neutral",
  maxItems = 10,
  topBanners = [],
  bottomBanners = [],
  titleStyle = "minimal",
  titleAlign = "left",
  titleVariant = "default",
  showTitle = true,
  showMore = true,
}) => {
  const bgVariantMap: Record<string, string> = {
    neutral: "bg-white",
    "emerald-light": "bg-gradient-to-br from-emerald-50 via-white to-emerald-50",
    cream: "bg-gradient-to-br from-amber-50 via-white to-orange-50",
    sage: "bg-gradient-to-br from-slate-50 via-white to-green-50",
    mint: "bg-gradient-to-br from-teal-50 via-white to-cyan-50",
  }

  const finalBgColor = bgVariant ? bgVariantMap[bgVariant] : bgColor

  const [startIndex, setStartIndex] = useState(0)
  const [topBannerIndex, setTopBannerIndex] = useState(0)
  const [bottomBannerIndex, setBottomBannerIndex] = useState(0)

  const handlePrev = () => setStartIndex((prev) => Math.max(prev - maxItems, 0))
  const handleNext = () => setStartIndex((prev) => Math.min(prev + maxItems, products.length - maxItems))
  const prevTop = () => setTopBannerIndex((prev) => (prev - 1 + topBanners.length) % topBanners.length)
  const nextTop = () => setTopBannerIndex((prev) => (prev + 1) % topBanners.length)
  const prevBottom = () => setBottomBannerIndex((prev) => (prev - 1 + bottomBanners.length) % bottomBanners.length)
  const nextBottom = () => setBottomBannerIndex((prev) => (prev + 1) % bottomBanners.length)

  const visibleProducts = products.slice(startIndex, startIndex + maxItems)
  const canGoPrev = startIndex > 0
  const canGoNext = startIndex + maxItems < products.length

  // ===== Banner render =====
  const renderBanner = (
    banners: string[],
    index: number,
    onPrev: () => void,
    onNext: () => void
  ) => {
    if (banners.length === 0) return null
    console.log(banners)
    return (
      <div className="relative group overflow-hidden rounded-lg">
        <img
          src={banners[index]|| "/placeholder.svg"}
          alt={`${title} banner`}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {banners.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full z-10 bg-white/20 backdrop-blur text-white hover:bg-white/40 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full z-10 bg-white/20 backdrop-blur text-white hover:bg-white/40 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    )
  }

  // ===== Title render =====
  const renderTitle = () => {
    const titleElement = (
      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        {title}
      </h2>
    )

    if (titleVariant === "boxed") {
      return (
        <div className="relative mb-8">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-300 px-6 py-2 shadow-lg rounded-xl">
              <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
            </div>
          </div>
        </div>
      )
    }

    if (titleStyle === "minimal") {
      return (
        <div
          className={`flex items-center gap-3 mb-5 group relative ${
            titleAlign === "center" ? "justify-center" : ""
          }`}
        >
          <div className="w-1.5 h-7 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full shadow-md"></div>
          <div className="relative">
            {titleElement}
            <span className="absolute left-0 -bottom-1.5 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 group-hover:w-full origin-left"></span>
          </div>
          {badge && (
            <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow-md font-medium">
              {badge}
            </span>
          )}
        </div>
      )
    }

    return (
      <div
        className={`flex items-center gap-3 mb-5 ${
          titleAlign === "center" ? "justify-center" : ""
        }`}
      >
        <Flame className="text-red-500 w-6 h-6 drop-shadow animate-pulse" />
        {titleElement}
        {badge && (
          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow-md font-medium">
            {badge}
          </span>
        )}
      </div>
    )
  }

  // ===== Render main section =====
  return (
    <section
      className={`${finalBgColor} relative shadow rounded-xl px-3 sm:px-4 lg:px-5 pt-5 pb-5 mb-4 border border-gray-100/40 overflow-hidden transition-all duration-300`}
    >
      <div
        className={`absolute top-0 right-0 w-40 h-40 rounded-full -mr-20 -mt-20 pointer-events-none opacity-40 ${
          bgVariant === "cream"
            ? "bg-amber-200"
            : bgVariant === "sage"
            ? "bg-green-200"
            : bgVariant === "mint"
            ? "bg-teal-200"
            : "bg-emerald-50"
        }`}
      />

      {renderBanner(topBanners, topBannerIndex, prevTop, nextTop)}
      {showTitle && renderTitle()}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="inline-flex gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce delay-100"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce delay-200"></div>
          </div>
        </div>
      ) : (
        <div className="relative mt-4 z-10">
          {canGoPrev && (
            <button
              onClick={handlePrev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full z-20 bg-white shadow-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 relative z-0 px-3">
            {visibleProducts.map((p) => (
              <div
                key={p.id}
                className="w-full h-full transform transition-all duration-300 hover:scale-105"
              >
                <ProductCard p={p} />
              </div>
            ))}
          </div>
          {canGoNext && (
            <button
              onClick={handleNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full z-20 bg-white shadow-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {showMore && (
        <div className="flex justify-center mt-4">
          <a
            href={`/category/${title}`}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition"
          >
            Xem thêm sản phẩm →
          </a>
        </div>
      )}

      {renderBanner(bottomBanners, bottomBannerIndex, prevBottom, nextBottom)}
    </section>
  )
}

export default ProductGroup
