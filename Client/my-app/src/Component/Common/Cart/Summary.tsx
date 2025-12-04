import { Receipt, Truck, Tag, Sparkles } from "lucide-react"

interface SummaryProps {
  total: number
  shipping: number
  shippingDiscount: number
  discount: number
}

export default function Summary({ total, shipping, shippingDiscount, discount }: SummaryProps) {
  const final = total + shipping - shippingDiscount - discount
  const totalSavings = shippingDiscount + discount

  return (
    <div className="mx-4 mb-2 bg-white border border-slate-200 overflow-hidden shadow-sm">
      
      {/* Header trắng - không còn xanh */}
      <div className="px-5 py-3 flex items-center gap-2 border-b border-slate-200 bg-white">
        <Receipt className="w-5 h-5 text-slate-600" />
        <h3 className="font-semibold text-slate-800">Tóm tắt đơn hàng</h3>
      </div>

      <div className="p-5 space-y-4">

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Tạm tính</span>
            <span className="font-medium text-slate-800">{total.toLocaleString("vi-VN")}₫</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-600 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-slate-400" />
              Phí vận chuyển
            </span>
            <span className="font-medium text-slate-800">{shipping.toLocaleString("vi-VN")}₫</span>
          </div>

          {shippingDiscount > 0 && (
            <div className="flex justify-between items-center bg-slate-50 -mx-5 px-5 py-2">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-slate-500" />
                Giảm phí vận chuyển
              </span>
              <span className="font-medium text-slate-700">-{shippingDiscount.toLocaleString("vi-VN")}₫</span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between items-center bg-slate-50 -mx-5 px-5 py-2">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-slate-500" />
                Giảm giá
              </span>
              <span className="font-medium text-slate-700">-{discount.toLocaleString("vi-VN")}₫</span>
            </div>
          )}
        </div>

        <div className="border-t border-dashed border-slate-200" />

        {/* TỔNG CỘNG — Giữ màu xanh nổi bật */}
        <div className="flex justify-between items-center pt-1">
          <span className="font-semibold text-slate-900">Tổng cộng</span>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            {final.toLocaleString("vi-VN")}₫
          </span>
        </div>

        {totalSavings > 0 && (
          <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-center gap-2 border border-slate-200">
            <Sparkles className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Bạn đã tiết kiệm được {totalSavings.toLocaleString("vi-VN")}₫
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
