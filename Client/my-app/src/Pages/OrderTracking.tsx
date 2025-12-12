"use client"

import { useEffect, useState, useMemo } from "react"
import { Loader2, Package, MapPin, Calendar, DollarSign, Truck } from "lucide-react"
import toast from "react-hot-toast"

import Header from "@/Component/Home/Header"
import Footer from "@/Component/Home/Footer"

import { orderService } from "@/Services/orderService"
import { orderStatusService } from "@/Services/orderStatusService"

import type { Order } from "@/Type/Order"
import type { OrderStatus } from "@/Type/OrderStatus"

interface OrderDetail {
  Id: string
  ProductName: string
  ImageUrl: string
  Quantity: number
  UnitPrice: number
}

// ----- HELPERS -----
const parseOrderDetails = (orderDetails?: string): OrderDetail[] => {
  if (!orderDetails) return []
  try {
    return JSON.parse(orderDetails)
  } catch {
    console.warn("Invalid orderDetails JSON:", orderDetails)
    return []
  }
}

const getImageUrl = (url: string) =>
  url.startsWith("http") ? url : `https://foodecomerceapi.runasp.net/api/File/image?path=${encodeURIComponent(url)}`

const getStatusBadgeStyle = (statusName: string) => {
  const statusLower = statusName.toLowerCase()
  if (statusLower.includes("pending") || statusLower.includes("chờ"))
    return "bg-amber-50 text-amber-700 border border-amber-200"
  if (statusLower.includes("confirmed") || statusLower.includes("xác nhận"))
    return "bg-blue-50 text-blue-700 border border-blue-200"
  if (statusLower.includes("shipping") || statusLower.includes("vận chuyển"))
    return "bg-indigo-50 text-indigo-700 border border-indigo-200"
  if (statusLower.includes("delivered") || statusLower.includes("giao"))
    return "bg-emerald-50 text-emerald-700 border border-emerald-200"
  if (statusLower.includes("cancelled") || statusLower.includes("hủy"))
    return "bg-red-50 text-red-700 border border-red-200"
  return "bg-slate-50 text-slate-700 border border-slate-200"
}

// ----- COMPONENT -----
export default function OrderTracking() {
  const [orders, setOrders] = useState<Order[]>([])
  const [statuses, setStatuses] = useState<OrderStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [activeStatusId, setActiveStatusId] = useState<number | "all">("all")

  // Fetch orders & statuses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderList, statusList] = await Promise.all([orderService.getAll(1, 10), orderStatusService.getAll()])
        setOrders(orderList)
        setStatuses(statusList)
      } catch (err: any) {
        toast.error(err.message || "Không thể tải dữ liệu")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statusMap = useMemo(() => {
    const map = new Map<number, string>()
    statuses.forEach((s) => map.set(s.id, s.statusName))
    return map
  }, [statuses])

  const getStatusName = (id: number) => statusMap.get(id) || "Không rõ"

  const filteredOrders = useMemo(() => {
    if (activeStatusId === "all") return orders
    return orders.filter((o) => o.statusId === activeStatusId)
  }, [orders, activeStatusId])

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 min-h-screen">
      <Header />

      <main className="pt-32 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Theo dõi đơn hàng</h1>
          <p className="text-slate-600">Quản lý và kiểm tra trạng thái các đơn hàng của bạn</p>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
          <button
            onClick={() => setActiveStatusId("all")}
            className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
              activeStatusId === "all"
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
            }`}
          >
            Tất cả
          </button>
          {statuses.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStatusId(s.id)}
              className={`px-6 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                activeStatusId === s.id
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              {s.statusName}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-16 h-16 mb-4">
              <Loader2 className="absolute inset-0 animate-spin w-16 h-16 text-emerald-600" />
            </div>
            <p className="text-slate-600 font-medium">Đang tải đơn hàng...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">Bạn chưa có đơn hàng nào ở trạng thái này</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const details: OrderDetail[] = parseOrderDetails(order.orderDetails)
              const statusName = getStatusName(order.statusId)

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-slate-100"
                >
                  <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Mã đơn hàng</p>
                        <p className="text-lg font-semibold text-slate-900">{order.id.slice(0, 12).toUpperCase()}</p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusBadgeStyle(statusName)}`}
                    >
                      {statusName}
                    </span>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Order Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Ngày đặt</p>
                          <p className="text-sm font-medium text-slate-900">
                            {new Date(order.orderDate).toLocaleString("vi-VN")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Địa chỉ giao hàng</p>
                          <p className="text-sm font-medium text-slate-900 truncate">{order.shippingAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Tổng tiền</p>
                          <p className="text-sm font-semibold text-emerald-600">
                            {(order.totalPrice + order.shippingFee).toLocaleString("vi-VN")}₫
                          </p>
                        </div>
                      </div>
                    </div>

                    {details.length > 0 && (
                      <div className="border-t border-slate-100 pt-6">
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-emerald-600" />
                          Chi tiết sản phẩm ({details.length})
                        </h3>
                        <div className="space-y-3">
                          {details.map((d) => (
                            <div
                              key={d.Id}
                              className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                              <img
                                src={getImageUrl(d.ImageUrl) || "/placeholder.svg"}
                                alt={d.ProductName}
                                className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 truncate">{d.ProductName}</p>
                                <p className="text-sm text-slate-600 mt-1">
                                  {d.Quantity} × {d.UnitPrice.toLocaleString("vi-VN")}₫
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="font-semibold text-emerald-600">
                                  {(d.Quantity * d.UnitPrice).toLocaleString("vi-VN")}₫
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Note */}
                    {order.note && (
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <p className="text-sm text-blue-900">
                          <span className="font-semibold">Ghi chú:</span> {order.note}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
