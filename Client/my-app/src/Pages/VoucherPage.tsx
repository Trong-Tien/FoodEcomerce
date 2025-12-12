"use client"

import { useEffect, useState } from "react"
import Header from "@/Component/Home/Header"
import Footer from "@/Component/Home/Footer"
import Swal from "sweetalert2"
import type { Voucher } from "@/Type/Voucher"
import { Ticket, Gift, ArrowRight, Sparkles } from "lucide-react"

export default function VoucherPage() {
  const API_BASE = "https://foodecomerceapi.runasp.net"
  const [vouchers, setVouchers] = useState<Voucher[]>([])
  const [loading, setLoading] = useState(true)
  const [claimedIds, setClaimedIds] = useState<number[]>([])

  const userId = localStorage.getItem("userId") || "00000000-0000-0000-0000-000000000000"

  // Lấy danh sách voucher từ API
  const fetchVouchers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/VoucherUser/GetAll`)
      const data = await res.json()
      setVouchers(data?.items ?? [])
    } catch (err) {
      console.error("❌ Lỗi tải danh sách voucher:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVouchers()
  }, [])

  const cardGradients = [
    "from-emerald-400 via-teal-400 to-cyan-500",
    "from-blue-400 via-indigo-400 to-purple-500",
    "from-orange-400 via-red-400 to-pink-500",
    "from-pink-400 via-rose-400 to-red-500",
    "from-violet-400 via-purple-400 to-indigo-500",
  ]

  // Xử lý nhận voucher
  const handleClaimVoucher = async (voucher: Voucher) => {
    try {
      const body = {
        voucherId: voucher.id,
        userId,
        isUsed: false,
        usedAt: null,
      }

      const res = await fetch(`${API_BASE}/api/VoucherUser/Create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        // Đánh dấu voucher đã nhận
        setClaimedIds([...claimedIds, voucher.id])
        Swal.fire({
          icon: "success",
          title: "Nhận voucher thành công!",
          timer: 1500,
          showConfirmButton: false,
        })
      } else {
        const errText = await res.text()
        console.error("❌ Server error:", errText)
        Swal.fire({
          icon: "error",
          title: "Không thể nhận voucher!",
          text: "Voucher có thể đã hết hoặc bạn đã nhận rồi.",
        })
      }
    } catch (err) {
      console.error("❌ Network error:", err)
      Swal.fire({
        icon: "error",
        title: "Lỗi kết nối!",
        text: "Vui lòng thử lại sau.",
      })
    }
  }

  // Kiểm tra trạng thái voucher: đã nhận / hết hạn / hết lượt
  const isVoucherClaimed = (v: Voucher) => {
    const claimedByUser = v.voucherUsers?.some(u => u.userId === userId)
    const outOfUsage = v.usedCount >= (v.usageLimit || 0)
    const expired = !v.isActive || (v.endTime && new Date(v.endTime) < new Date())
    const alreadyClaimedState = claimedIds.includes(v.id)
    return claimedByUser || outOfUsage || expired || alreadyClaimedState
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="pt-[122px] pb-20">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 mb-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Voucher Độc Quyền</h1>
                <p className="text-emerald-100 text-sm mt-1">
                  Tiết kiệm tối đa khi mua sắm ngay hôm nay
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher List */}
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
                <p className="text-slate-600 text-lg font-medium">Hiện chưa có voucher nào</p>
                <p className="text-slate-500 text-sm mt-1">
                  Hãy quay lại lúc khác để xem các ưu đãi mới
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vouchers.map((v, idx) => {
                  const colorIdx = idx % cardGradients.length
                  const disabled = isVoucherClaimed(v)

                  const discountLabel =
                    v.discountType === "PERCENT"
                      ? `Giảm ${v.discountValue}%`
                      : `Giảm ${v.discountValue.toLocaleString("vi-VN")}₫`

                  return (
                    <div
                      key={v.id}
                      className="group relative h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                      {/* Background gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${cardGradients[colorIdx]} opacity-90`}
                      />
                      {/* Overlay pattern */}
                      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_50%)]" />
                      {/* Content */}
                      <div className="relative p-6 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-6">
                            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 flex-1 mr-4">
                              <img
                                src={
                                  v.imageUrl
                                    ? `${API_BASE}/api/File/image?path=${encodeURIComponent(
                                        v.imageUrl
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
                              {v.discountType === "MONEY" && (
                                <div className="text-xs font-semibold text-slate-600 mt-1">
                                  {v.discountValue.toLocaleString("vi-VN")}₫
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-white">
                            <h2 className="text-lg font-bold mb-2 line-clamp-2">{v.name}</h2>
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
                        <div className="mt-6">
                          <button
                            onClick={() => handleClaimVoucher(v)}
                            disabled={disabled}
                            className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform ${
                              disabled
                                ? "bg-white bg-opacity-20 text-white cursor-not-allowed"
                                : "bg-white text-emerald-600 hover:shadow-2xl hover:scale-105 active:scale-95"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              {disabled ? (
                                <>
                                  <Ticket className="w-4 h-4" />
                                  ĐÃ NHẬN
                                </>
                              ) : (
                                <>
                                  <Gift className="w-4 h-4" />
                                  NHẬN NGAY
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </div>
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
