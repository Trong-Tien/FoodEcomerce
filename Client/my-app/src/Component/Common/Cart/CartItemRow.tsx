"use client"
import { Minus, Plus, Trash2 } from "lucide-react"

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

  return (
    <div className="flex items-center gap-3 p-4 border-b last:border-0">
      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border" />
      <div className="flex-1">
        <p className="font-semibold text-slate-900">{item.name}</p>
        <p className="text-sm text-slate-500">{item.unitPrice.toLocaleString("vi-VN")}₫</p>
        <div className="flex items-center gap-3 mt-2">
          <button onClick={() => handleChange(-1)} className="p-1 rounded border hover:bg-slate-100">
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-6 text-center">{item.quantity}</span>
          <button onClick={() => handleChange(1)} className="p-1 rounded border hover:bg-slate-100">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button onClick={() => remove(item.id)} className="text-rose-500 hover:text-rose-600">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
