"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "@tanstack/react-router"
import ProductModal from "./ProductModal"
import type { Product } from "@/Type/Product"
import { useCart } from "@/Context/CartContext"
import { useAuth } from "@/Hooks/useAuth"
import { toast } from "react-hot-toast"
import { Heart, ShoppingCart, Star } from "lucide-react"

type ProductWithSuggest = Product & { suggestedProducts?: Product[] }

function ProductCard({ p }: { p: ProductWithSuggest }) {
  const [open, setOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { add } = useCart()
  const { isLoggedIn } = useAuth()

  const finalPrice = p.discount ? Math.round(p.unitPrice * (1 - p.discount / 100)) : p.unitPrice



 
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      toast.error("Vui lòng đăng nhập để mua hàng!")
      return
    }
    if (p.inventory === 0) {
      toast.error("Sản phẩm hiện đã hết hàng!")
      return
    }
    setOpen(true)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <>
      <div className="group flex flex-col border border-gray-200 rounded-md bg-white overflow-hidden min-h-[380px] shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-200 relative">
        {/* Overlay hết hàng */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-red-600 font-bold text-lg z-10 rounded-md">
            HẾT HÀNG
          </div>
        )}

        <Link
          to="/product/$id"
          params={{ id: String(p.id) }}
          className="relative w-full aspect-square block overflow-hidden bg-gray-50"
        >
          <img
            src={Url || "/placeholder.svg"}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {p.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
              -{p.discount}%
            </div>
          )}

          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-sm hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
          >
            <Heart
              size={18}
              className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        </Link>

        <div className="flex flex-col justify-between flex-1">
          <div className="space-y-2 p-3 pb-2">
            <Link to="/product/$id" params={{ id: String(p.id) }} className="block">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors min-h-[2.5rem]">
                {p.name}
              </h3>
            </Link>

            {/* ⭐ Rating */}
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={`${i < (p.rating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 ml-1">({p.rating || 0})</span>
            </div>

            {/* 📦 Tồn kho */}
            <p className="text-xs text-gray-600">
              Tồn kho: <span className="font-semibold">{p.inventory}</span>
            </p>

            {/* 💵 Giá */}
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-emerald-600">{finalPrice.toLocaleString("vi-VN")}đ</span>
              {p.discount > 0 && (
                <span className="text-xs line-through text-gray-400">{p.unitPrice.toLocaleString("vi-VN")}đ</span>
              )}
            </div>
          </div>

          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`w-full h-10 bg-emerald-50 border-t border-emerald-200 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-auto ${
              isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ShoppingCart size={16} />
            {isOutOfStock ? "Hết hàng" : "Mua ngay"}
          </button>
        </div>
      </div>

      {open && (
        <ProductModal
          product={p}
          suggestedProducts={p.suggestedProducts}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default ProductCard
