import { useState } from "react"
import { useAuth } from "@/Hooks/useAuth"
import { toast } from "react-hot-toast"
import { ShoppingCart, Heart } from "lucide-react"

type SuggestedProductCardProps = {
  product: {
    id: string
    name: string
    unitPrice: number
    inventory: number
    discount: number
    image?: string
  }
}

export default function SuggestedProductCard({ product }: SuggestedProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { isLoggedIn } = useAuth()

  const finalPrice = product.discount
    ? Math.round(product.unitPrice * (1 - product.discount / 100))
    : product.unitPrice

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      toast.error("Vui lòng đăng nhập để mua hàng!")
      return
    }
    if (product.inventory === 0) {
      toast.error("Sản phẩm hiện đã hết hàng!")
      return
    }
    toast.success(`Bạn đã chọn mua: ${product.name}`)
    // TODO: Thêm vào giỏ hàng hoặc mở modal
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  const isOutOfStock = product.inventory === 0
  const Url = product.image || "/placeholder.svg"

  return (
    <div className="flex flex-col border border-gray-200 rounded-md bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative">
      {isOutOfStock && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-red-600 font-bold text-lg z-10 rounded-md">
          HẾT HÀNG
        </div>
      )}

      <div className="relative w-full aspect-square bg-gray-50">
        <img
          src={Url}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={e => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" }}
        />

        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 bg-white/90 p-2 rounded-md shadow-sm hover:bg-white z-20"
        >
          <Heart
            size={18}
            className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>

        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-emerald-600">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-emerald-600 font-bold">{finalPrice.toLocaleString("vi-VN")}₫</span>
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`bg-emerald-50 text-emerald-700 text-xs font-medium px-2 py-1 rounded transition-all duration-200 ${
              isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-100"
            } flex items-center gap-1`}
          >
            <ShoppingCart size={14} /> {isOutOfStock ? "Hết hàng" : "Mua ngay"}
          </button>
        </div>
      </div>
    </div>
  )
}
