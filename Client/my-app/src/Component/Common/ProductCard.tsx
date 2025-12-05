"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "@tanstack/react-router"
import ProductModal from "./ProductModal"
import type { Product } from "@/Type/Product"
import { useAuth } from "@/Hooks/useAuth"
import { toast } from "react-hot-toast"
import { Heart, ShoppingCart, Star } from "lucide-react"

type ProductWithSuggest = Product & { suggestedProducts?: Product[] }

function ProductCard({ p }: { p: ProductWithSuggest }) {
  const [open, setOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { isLoggedIn } = useAuth()

  const finalPrice = p.discount ? Math.round(p.unitPrice * (1 - p.discount / 100)) : p.unitPrice



 
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      toast.error("Vui lòng đăng nhập để mua hàng!")
      return
    }
    setOpen(true)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  const Url = p.image 
  ? `data:image/jpeg;base64,${p.image}`
  : "/placeholder.svg";


  return (
    <>
      <div className="group flex flex-col border border-gray-100 rounded-xl bg-white overflow-hidden min-h-[380px] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              -{p.discount}%
            </div>
          )}

          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <Heart
              size={18}
              className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        </Link>

        <div className="flex flex-col justify-between flex-1 p-4">
          <div className="space-y-2">
            <Link to="/product/$id" params={{ id: String(p.id) }} className="block">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors min-h-[2.5rem]">
                {p.name}
              </h3>
            </Link>

            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={`${i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">(120)</span>
            </div>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-lg font-bold text-emerald-600">{finalPrice.toLocaleString("vi-VN")}đ</span>
              {p.discount > 0 && (
                <span className="text-sm line-through text-gray-400">{p.unitPrice.toLocaleString("vi-VN")}đ</span>
              )}
            </div>
          </div>

          <button
            onClick={handleBuyNow}
            className="mt-4 w-full h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <ShoppingCart size={16} />
            Mua ngay
          </button>
        </div>
      </div>

      {open && <ProductModal product={p}  onClose={() => setOpen(false)} />}
    </>
  )
}

export default ProductCard
