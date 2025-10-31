"use client"

import { useCart } from "@/Context/CartContext"
import { useNavigate } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import Header from "@/Component/Home/Header"
import { ArrowLeft, Trash2, Plus, Minus, Tag } from "lucide-react"
import { useAuth } from "@/Hooks/useAuth"
import toast from "react-hot-toast"
import confetti from "canvas-confetti"
import { productService } from "@/Services/ProductService"
import { voucherUserService } from "@/Services/VoucherUserService"
import type { Voucher } from "@/Type/Voucher"

/* ========================== Header ========================== */
function CartHeaderCard() {
  return (
    <div className="relative flex items-center p-5 bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <button onClick={() => window.history.back()} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
        <ArrowLeft className="w-5 h-5 text-slate-700" />
      </button>
      <h2 className="mx-auto text-xl font-bold text-slate-900">Giỏ hàng của bạn</h2>
    </div>
  )
}

/* ========================== Tabs ========================== */
function CartTabs() {
  return (
    <div className="flex gap-2 p-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="flex-1 py-3 text-center font-semibold text-sm rounded-lg bg-emerald-600 text-white shadow-md">
        Giao hàng tận nơi
      </div>
    </div>
  )
}

/* ========================== Address ========================== */
function AddressInfo() {
  return (
    <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200 space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-semibold text-slate-900">
            📍 Giao đến: <span className="text-emerald-700">Anh Thịnh (0947xxxxxx)</span>
          </p>
          <p className="text-sm text-slate-600 mt-1">87/1, Xã Long Phú, TP. Cần Thơ</p>
        </div>
        <button className="text-emerald-600 text-xs font-semibold hover:underline">Đổi</button>
      </div>
      <div className="border-t border-emerald-200 pt-3 flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-700">🏪 Từ: BHX Long Phú</p>
          <p className="text-xs text-slate-500 mt-1">Thửa đất số 137, tờ bản đồ số 41, ấp 4, Long Phú, Cần Thơ</p>
        </div>
        <button className="text-emerald-600 text-xs font-semibold hover:underline">Đổi</button>
      </div>
    </div>
  )
}

/* ========================== Summary ========================== */
function Summary({
  total,
  shipping,
  shippingDiscount,
  discount,
}: {
  total: number
  shipping: number
  discount: number
  shippingDiscount: number
}) {
  const finalTotal = Math.max(0, total - discount + shipping - shippingDiscount)

  return (
    <div className="mx-4 mb-4 p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 space-y-3 shadow-sm">
      {total < 300000 && (
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <span className="text-lg">🎁</span>
          <p className="text-sm text-amber-700">
            Mua thêm <span className="font-bold">{(300000 - total).toLocaleString("vi-VN")}₫</span> được Freeship
          </p>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-700">
          <span>Tiền hàng</span>
          <span className="font-semibold">{total.toLocaleString("vi-VN")}₫</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600">
            <span>Giảm giá sản phẩm</span>
            <span className="font-semibold">-{discount.toLocaleString("vi-VN")}₫</span>
          </div>
        )}

        <div className="flex justify-between text-sm text-slate-700">
          <span>Phí giao hàng</span>
          <span className="font-semibold">{shipping.toLocaleString("vi-VN")}₫</span>
        </div>

        {shippingDiscount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600">
            <span>Giảm giá phí ship</span>
            <span className="font-semibold">-{shippingDiscount.toLocaleString("vi-VN")}₫</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <span className="text-slate-700 font-semibold">Tổng đơn hàng</span>
          <span className="text-2xl font-bold text-emerald-600">{finalTotal.toLocaleString("vi-VN")}₫</span>
        </div>
      </div>
    </div>
  )
}

/* ========================== Apply Voucher Button ========================== */
function ApplyVoucherButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="block mb-4 w-[calc(100%-2rem)] mx-auto p-4 flex items-center justify-between 
           bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 
           rounded-xl hover:shadow-md transition-all"

    >
      <div className="flex items-center gap-3">
        <Tag className="w-5 h-5 text-emerald-600" />
        <span className="text-sm font-semibold text-slate-800">Chọn mã giảm giá</span>
      </div>
      <span className="text-emerald-600 font-bold">→</span>
    </button>
  )
}

/* ========================== Cart Item Row ========================== */
function CartItemRow({
  item,
  update,
  remove,
}: {
  item: {
    id: string
    productId: string
    name: string
    image: string
    quantity: number
    unitPrice: number
    discount: number
  }
  update: (id: string, qty: number) => void
  remove: (id: string) => void
}) {
  const finalPrice = item.unitPrice * item.quantity * (1 - (item.discount || 0) / 100)

  return (
    <div className="flex gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 items-start">
      <img
        src={item.image || "/assets/img/no-image.png"}
        alt={item.name}
        className="w-28 h-28 object-cover rounded-lg border border-slate-200 shadow-sm flex-shrink-0"
      />

      <div className="flex-1 flex flex-col justify-between h-28">
        <div>
          <p className="font-semibold text-slate-900 line-clamp-2 text-sm">{item.name}</p>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-emerald-600 font-bold text-base">{finalPrice.toLocaleString("vi-VN")}₫</p>
            {item.discount > 0 && (
              <p className="line-through text-xs text-slate-400">{item.unitPrice.toLocaleString("vi-VN")}₫</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => update(item.id, Math.max(1, item.quantity - 1))}
              className="p-1.5 hover:bg-slate-200 rounded transition-colors"
            >
              <Minus className="w-4 h-4 text-slate-700" />
            </button>
            <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => update(item.id, item.quantity + 1)}
              className="p-1.5 hover:bg-slate-200 rounded transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-700" />
            </button>
          </div>

          <button
            onClick={() => remove(item.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ========================== Voucher Modal (đồng bộ giao diện VoucherPage) ========================== */
function VoucherModal({
  onClose,
  dataVoucher,
  onSelect,
}: {
  dataVoucher: Voucher[]
  onClose: () => void
  onSelect: (voucher: Voucher) => void
}) {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5292"

  useEffect(() => {
    let userId: string | null = localStorage.getItem("userId")
    if (!userId) {
      const userStr = localStorage.getItem("user")
      if (userStr) {
        try {
          const parsed = JSON.parse(userStr)
          userId = parsed?.id || null
        } catch {}
      }
    }

    if (!userId) {
      setLoading(false)
      return
    }

    voucherUserService
      .getByUserId(userId)
      .then((res) => setVouchers(res))
      .catch((err) => console.error("❌ Lỗi tải voucher:", err))
      .finally(() => setLoading(false))
  }, [])

  const cardGradients = [
    "from-emerald-400 via-teal-400 to-cyan-500",
    "from-blue-400 via-indigo-400 to-purple-500",
    "from-orange-400 via-red-400 to-pink-500",
    "from-pink-400 via-rose-400 to-red-500",
    "from-violet-400 via-purple-400 to-indigo-500",
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎟️</span>
            <h2 className="text-xl font-bold text-slate-900">Chọn mã giảm giá</h2>
          </div>
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            ✕ Đóng
          </button>
        </div>

        {/* Body */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin w-10 h-10 border-4 border-emerald-300 border-t-emerald-600 rounded-full"></div>
              <p className="text-slate-600 text-sm font-medium">Đang tải voucher...</p>
            </div>
          </div>
        ) : vouchers.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-6">
              <Tag className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-600 text-lg font-medium">Bạn chưa có mã giảm giá nào.</p>
            <p className="text-slate-500 text-sm mt-1">
              Hãy nhận voucher tại trang Ưu Đãi để sử dụng 💚
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vouchers.map((v, idx) => {
              const colorIdx = idx % cardGradients.length
              const isUsed =
                Array.isArray(dataVoucher) && dataVoucher.some((d) => d.code === v.code)

              return (
                <div
                  key={v.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onClick={() => !isUsed && onSelect(v)}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cardGradients[colorIdx]} opacity-90`}
                  />

                  {/* Overlay pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_50%)]" />

                  {/* Content */}
                  <div className="relative p-6 flex flex-col justify-between h-full text-white">
                    {/* Top: image + discount */}
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex-1 mr-3">
                          <img
                            src={
                              v.imageUrl
                                ? v.imageUrl.startsWith("http")
                                  ? v.imageUrl
                                  : `${API_BASE}/api/File/image?path=${encodeURIComponent(
                                      v.imageUrl.replace(/^\/+/, "")
                                    )}`
                                : "/assets/img/no-image.png"
                            }
                            alt={v.name}
                            className="w-full h-20 object-contain"
                          />
                        </div>
                        <div className="bg-white rounded-xl p-2 text-center shadow-md">
                          <div className="text-lg font-bold bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                            {v.discountType === "PERCENT"
                              ? `${v.discountValue}%`
                              : "GIẢM"}
                          </div>
                          {v.discountType !== "PERCENT" && (
                            <div className="text-xs font-semibold text-slate-600 mt-1">
                              {v.discountValue.toLocaleString("vi-VN")}₫
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-bold line-clamp-2">{v.name}</h3>
                      <p className="text-sm font-medium text-white/90 mt-2">
                        {v.discountType === "PERCENT"
                          ? `Giảm ${v.discountValue}%`
                          : `Giảm ${v.discountValue.toLocaleString("vi-VN")}₫`}
                      </p>
                      <p className="text-xs text-white/80 mt-1">
                        HSD:{" "}
                        {v.endTime
                          ? new Date(v.endTime).toLocaleDateString("vi-VN")
                          : "Không giới hạn"}
                      </p>
                    </div>

                    {/* Button */}
                    <button
                      disabled={isUsed}
                      className={`mt-4 py-2 w-full rounded-lg font-semibold text-sm transition-all ${
                        isUsed
                          ? "bg-white/30 text-white cursor-not-allowed"
                          : "bg-white text-emerald-600 hover:scale-105 hover:shadow-lg"
                      }`}
                    >
                      {isUsed ? "ĐÃ ÁP DỤNG" : "ÁP DỤNG"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}


/* ========================== Main Component ========================== */
export default function CartPage() {
  const { items, update, remove, total, shipping, clear } = useCart()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [showSuccess, setShowSuccess] = useState(false)
  const [productCache, setProductCache] = useState<Record<string, any>>({})
  const [voucher, setVoucher] = useState<Voucher[]>([])
  const [showVoucherModal, setShowVoucherModal] = useState(false)
  const [disCountValue, setDiscountValue] = useState<number>(0)
  const [shipValue, setShipValue] = useState<number>(0)

  useEffect(() => {
    document.title = "Giỏ hàng - FoodEcommerce"
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      const cache: Record<string, any> = {}
      for (const item of items) {
        const p = await productService.getById(item.productId)
        if (p) {
          cache[item.productId] = {
            name: p.name,
            image: p.images?.split(",")[0] || p.imageProducts?.[0]?.imageUrl || "/assets/img/no-image.png",
          }
        }
      }
      setProductCache(cache)
    }
    if (items.length > 0) loadProducts()
  }, [items])

  useEffect(() => {
    if (!voucher || voucher.length === 0) {
      setDiscountValue(0)
      return
    }

    let totalDiscount = 0
    let totalShipDiscount = 0

    voucher.forEach((v) => {
      if (total < v.minOrderAmount) return

      if (v.discountType === "Giảm giá theo %") {
        const percentDiscount = (total * v.discountValue) / 100
        totalDiscount += Math.min(percentDiscount, v.maxDiscountAmount)
      }

      if (v.discountType === "Giảm giá phí ship") {
        totalShipDiscount += v.discountValue
      }
    })

    setDiscountValue(totalDiscount)
    setShipValue(shipping < shipValue ? shipping : totalShipDiscount)
  }, [voucher, total])

  const finalTotal = Math.max(0, total - disCountValue + shipping - shipValue)

  const handleOrder = () => {
    toast.success(`🎉 Đặt hàng thành công! Tổng thanh toán ${finalTotal.toLocaleString("vi-VN")}₫`)
    clear()
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } })
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      navigate({ to: "/" })
    }, 3000)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-600">
        <Header />
        <p className="text-lg">Bạn cần đăng nhập để xem giỏ hàng.</p>
        <button
          onClick={() => navigate({ to: "/DangNhap" })}
          className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
        >
          Đăng nhập ngay
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-600">
        <Header />
        <p className="text-lg">Giỏ hàng trống.</p>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
        >
          Mua sắm ngay
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 max-w-2xl mx-auto w-full pt-32 pb-6">
        <CartHeaderCard />
        <CartTabs />
        <AddressInfo />

        {/* ✅ Danh sách sản phẩm */}
        <div className="mx-4 mb-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={{
                id: item.id,
                productId: item.productId,
                name: productCache[item.productId]?.name || "Đang tải...",
                image: productCache[item.productId]?.image || "/assets/img/no-image.png",
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                discount: 0,
              }}
              update={update}
              remove={remove}
            />
          ))}
        </div>

        {/* ✅ Hiển thị tổng hợp */}
        <Summary total={finalTotal} shipping={shipping} shippingDiscount={shipValue} discount={disCountValue} />

        <ApplyVoucherButton onOpen={() => setShowVoucherModal(true)} />

        {voucher && voucher.length > 0 && (
          <div className="mx-4 mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex justify-between items-center">
            <span className="text-sm font-semibold">
              🎟️ Đã áp dụng <b>{voucher.length}</b> mã giảm giá
            </span>
            <button onClick={() => setVoucher([])} className="text-xs font-semibold hover:underline">
              Huỷ
            </button>
          </div>
        )}

        {/* ✅ CTA Button */}
        <div className="mx-4 sticky bottom-6">
          <button
            onClick={handleOrder}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-xl 
                   bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700
                   text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-emerald-600 text-sm font-bold">
              {items.length}
            </span>
            <span>Đặt hàng {finalTotal.toLocaleString("vi-VN")}₫</span>
          </button>
        </div>
      </div>

      {showVoucherModal && (
        <VoucherModal
          dataVoucher={voucher}
          onClose={() => setShowVoucherModal(false)}
          onSelect={(v) => {
            const exists = voucher.some((item) => item.code === v.code)
            if (!exists) {
              setVoucher([...voucher, v])
              toast.success(`Đã áp dụng voucher ${v.name}!`)
            } else {
              toast.error(`⚠️ Voucher ${v.name} đã được áp dụng rồi.`)
            }
            setShowVoucherModal(false)
          }}
        />
      )}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm">
            <div className="text-emerald-600 text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Đặt hàng thành công!</h2>
            <p className="text-slate-600 mb-1">Cảm ơn bạn đã mua sắm tại Bách Hóa Xanh 💚</p>
            <p className="text-sm text-slate-500">Hệ thống đang chuyển bạn về trang chủ...</p>
          </div>
        </div>
      )}
    </div>
  )
}
