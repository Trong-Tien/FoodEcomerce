"use client"
import { Minus, Plus, Trash2} from "lucide-react"

interface CartItem {
  id: string
  productId: string
  name: string
  image: string
  quantity: number
  unitPrice: number
  discount: number
}

interface CartItemRowProps {
  item: CartItem
  update: (id: string, quantity: number) => void
  remove: (id: string) => void
}

export default function CartItemRow({ item, update, remove }: CartItemRowProps) {
  const handleChange = (delta: number) => {
    const newQty = Math.max(1, item.quantity + delta)
    update(item.id, newQty)
  }

  const finalPrice = item.unitPrice * (1 - item.discount / 100)
  const totalPrice = finalPrice * item.quantity

  return (
<div className="group flex items-center gap-4 p-4 bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300">

  {/* Product Image */}
  <div className="relative flex-shrink-0">
    <img
      src={item.image || "/placeholder.svg"}
      alt={item.name}
      className="w-20 h-20 object-cover border border-slate-100 group-hover:scale-105 transition-transform duration-300"
    />
    {item.discount > 0 && (
      <span className="absolute -top-2 -left-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
        -{item.discount}%
      </span>
    )}
  </div>

  {/* Product Info */}
  <div className="flex-1 min-w-0">
    <p className="font-semibold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
      {item.name}
    </p>

    <div className="flex items-center gap-2 mt-1">
      <span className="text-emerald-600 font-bold">{finalPrice.toLocaleString("vi-VN")}₫</span>
      {item.discount > 0 && (
        <span className="text-sm text-slate-400 line-through">{item.unitPrice.toLocaleString("vi-VN")}₫</span>
      )}
    </div>

    {/* Quantity Controls */}
    <div className="flex items-center gap-2 mt-3">
      <div className="flex items-center border border-slate-200 overflow-hidden">
        <button
          onClick={() => handleChange(-1)}
          className="p-2 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition-colors disabled:opacity-50"
          disabled={item.quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-10 text-center font-medium text-slate-800 bg-slate-50">
          {item.quantity}
        </span>

        <button
          onClick={() => handleChange(1)}
          className="p-2 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>

  {/* Total Price & Actions */}
  <div className="flex flex-col items-end gap-3">
    <div className="text-right">
      <p className="text-xs text-slate-400 uppercase tracking-wide">Tổng</p>
      <p className="font-bold text-lg text-emerald-600">
        {totalPrice.toLocaleString("vi-VN")}₫
      </p>
    </div>

    <div className="flex items-center gap-2">
      <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all" />

      <button
        onClick={() => remove(item.id)}
        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>

</div>

  )
}
