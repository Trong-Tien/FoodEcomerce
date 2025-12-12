"use client"

import { useEffect, useState } from "react"
import Header from "@/Component/Home/Header"
import Footer from "@/Component/Home/Footer"
import { voucherUserService } from "@/Services/VoucherUserService"
import type { Voucher } from "@/Type/Voucher"
import { Sparkles, Ticket } from "lucide-react"

export default function VoucherUserPage() {
  const API_BASE = "https://foodecomerceapi.runasp.net"
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // ✅ Lấy userId từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedUserId = localStorage.getItem("userId")
    let id: string | null = null

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        id = parsed?.id || null
      } catch {
        console.error("❌ Lỗi parse user")
      }
    }
    if (!id && storedUserId) id = storedUserId
    if (id) setUserId(id)
  }, [])

  // 🟢 Gọi API lấy voucher của user
  useEffect(() => {
    if (!userId) return
    voucherUserService
      .getByUserId(userId)
      .then((res) => setVouchers(res))
      .catch((err) => console.error("❌ Lỗi tải voucher:", err))
      .finally(() => setLoading(false))
  }, [userId])

  // 🎨 Gradient mẫu cho từng thẻ
  const cardGradients = [
    "from-emerald-400 via-teal-400 to-cyan-500",
    "from-blue-400 via-indigo-400 to-purple-500",
    "from-orange-400 via-red-400 to-pink-500",
    "from-pink-400 via-rose-400 to-red-500",
    "from-violet-400 via-purple-400 to-indigo-500",
  ]

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="pt-[122px] pb-20">
        {/* 🔹 Banner tiêu đề */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 mb-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Voucher của tôi</h1>
                <p className="text-emerald-100 text-sm mt-1">
                  Danh sách mã giảm giá bạn đã nhận
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Danh sách voucher - body nổi lên */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600"></div>
                  <p className="text-slate-600 font-medium">Đang tải voucher...</p>
                </div>
              </div>
            ) : vouchers.length === 0 ? (
              <div className="text-center py-32">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full mb-6">
                  <Ticket className="w-12 h-12 text-slate-400" />
                </div>
                <p className="text-slate-600 text-lg font-medium">
                  Bạn chưa có voucher nào
                </p>
                <p className="text-slate-500 text-sm mt-1">
                  Nhận voucher mới tại trang ưu đãi 🎁
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vouchers.map((v, idx) => {
                  const colorIdx = idx % cardGradients.length
                  const discountLabel =
                    v.discountType === "PERCENT"
                      ? `Giảm ${v.discountValue}%`
                      : `Giảm ${v.discountValue.toLocaleString("vi-VN")}₫`

                  return (
                    <div
                      key={v.id}
                      className="group relative h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                      {/* Nền gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${cardGradients[colorIdx]} opacity-90`}
                      />

                      {/* Overlay mờ */}
                      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_50%)]" />

                      {/* Nội dung voucher */}
                      <div className="relative p-6 h-full flex flex-col justify-between">
                        {/* Ảnh và giảm giá */}
                        <div>
                          <div className="flex items-start justify-between mb-6">
                            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 flex-1 mr-4">
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
                                className="w-full h-24 object-contain"
                              />
                            </div>

                            <div className="bg-white rounded-xl p-3 text-center shadow-lg">
                              <div className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent">
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

                          {/* Thông tin voucher */}
                          <div className="text-white">
                            <h2 className="text-lg font-bold mb-2 line-clamp-2">
                              {v.name}
                            </h2>
                            <p className="text-sm font-medium text-white text-opacity-90 mb-3">
                              {discountLabel}
                            </p>
                            <div className="text-xs font-medium text-white text-opacity-80">
                              HSD:{" "}
                              {v.endTime
                                ? new Date(v.endTime).toLocaleDateString("vi-VN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  })
                                : "Không giới hạn"}
                            </div>
                          </div>
                        </div>

                        {/* Trạng thái */}
                        <div className="mt-6">
                          <button
                            disabled
                            className="w-full py-3 flex items-center justify-center gap-2 rounded-xl 
               bg-white/20 border border-white/30 text-white font-semibold text-sm 
               cursor-not-allowed backdrop-blur-sm"
                          >
                            <span className="text-lg">✅</span>
                            <span>ĐÃ NHẬN</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
