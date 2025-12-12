"use client"
import { useEffect, useState } from "react"
import { Tag } from "lucide-react"
import { voucherUserService } from "@/Services/VoucherUserService"
import type { Voucher } from "@/Type/Voucher"

interface Props {
  onClose: () => void
  dataVoucher: Voucher[]
  onSelect: (voucher: Voucher) => void
}

export default function VoucherModal({ onClose, dataVoucher, onSelect }: Props) {
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const API_BASE = import.meta.env.VITE_API_URL || "https://foodecomerceapi.runasp.net"
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    // ✅ Lấy userId từ localStorage (an toàn)
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        const parsed = JSON.parse(userStr)
        setUserId(parsed?.id || null)
      } catch {
        setUserId(localStorage.getItem("userId"))
      }
    } else {
      setUserId(localStorage.getItem("userId"))
    }
  }, [])

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    voucherUserService
      .getByUserId(userId)
      .then((res) => setVouchers(res))
      .catch((err) => console.error("❌ Lỗi tải voucher:", err))
      .finally(() => setLoading(false))
  }, [userId])

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
          <button onClick={onClose} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition">
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
            <p className="text-slate-500 text-sm mt-1">Hãy nhận voucher tại trang Ưu Đãi để sử dụng 💚</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vouchers.map((v, idx) => {
              const colorIdx = idx % cardGradients.length
              const isUsed = Array.isArray(dataVoucher) && dataVoucher.some((d) => d.code === v.code)

              return (
                <div
                  key={v.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onClick={() => !isUsed && onSelect(v)}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cardGradients[colorIdx]} opacity-90`} />

                  {/* Overlay pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_50%)]" />

                  {/* Content */}
                  <div className="relative p-6 flex flex-col justify-between h-full text-white">
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex-1 mr-3">
                          <img
                            src={
                              v.imageUrl
                                ? v.imageUrl.startsWith("http")
                                  ? v.imageUrl
                                  : `${API_BASE}/api/File/image?path=${encodeURIComponent(
                                      v.imageUrl.replace(/^\/+/, ""),
                                    )}`
                                : "/assets/img/no-image.png"
                            }
                            alt={v.name}
                            className="w-full h-20 object-contain"
                          />
                        </div>
                        <div className="bg-white rounded-xl p-2 text-center shadow-md">
                          <div className="text-lg font-bold bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                            {v.discountType === "PERCENT" ? `${v.discountValue}%` : "GIẢM"}
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
                        HSD: {v.endTime ? new Date(v.endTime).toLocaleDateString("vi-VN") : "Không giới hạn"}
                      </p>
                    </div>

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
