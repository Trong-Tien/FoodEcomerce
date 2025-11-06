interface SummaryProps {
  total: number
  shipping: number
  shippingDiscount: number
  discount: number
}

export default function Summary({ total, shipping, shippingDiscount, discount }: SummaryProps) {
  const final = total + shipping - shippingDiscount - discount

  return (
    <div className="mx-4 mb-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-3 text-slate-900">🧾 Tóm tắt đơn hàng</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span>Tạm tính:</span><span>{total.toLocaleString("vi-VN")}₫</span></div>
        <div className="flex justify-between"><span>Phí vận chuyển:</span><span>{shipping.toLocaleString("vi-VN")}₫</span></div>
        {shippingDiscount > 0 && (
          <div className="flex justify-between text-emerald-600"><span>Giảm phí vận chuyển:</span><span>-{shippingDiscount.toLocaleString("vi-VN")}₫</span></div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-emerald-600"><span>Giảm giá:</span><span>-{discount.toLocaleString("vi-VN")}₫</span></div>
        )}
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-slate-900">
          <span>Tổng cộng:</span>
          <span className="text-emerald-600">{final.toLocaleString("vi-VN")}₫</span>
        </div>
      </div>
    </div>
  )
}
