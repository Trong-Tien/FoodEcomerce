import { useState, useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useCart } from "@/Context/CartContext"
import { useAuth } from "@/Hooks/useAuth"
import { productService } from "@/Services/ProductService"
import toast from "react-hot-toast"
import { useGetPaymentMethod } from "@/Hooks/PaymentMethod"
import { useCreateOrders } from "@/Hooks/Orders"
import type { AddOrder } from "@/Type/AddOrder"
import type { Voucher } from "@/Type/Voucher"
import type { ResponseType } from "@/Type/ResponseType"
import type { PaymentMethodType } from "@/Type/PaymentmethodType"

export function useCartPage() {
  const { items, update, remove, total, shipping, clear } = useCart()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const { data } = useGetPaymentMethod(1, 10)
  const createOrders = useCreateOrders()

  const dataPayment: PaymentMethodType[] = data?.items ?? []
  const [selected, setSelected] = useState<number>(0)
  const [productCache, setProductCache] = useState<Record<string, any>>({})
  const [voucher, setVoucher] = useState<Voucher[]>([])
  const [showVoucherModal, setShowVoucherModal] = useState(false)
  const [disCountValue, setDiscountValue] = useState<number>(0)
  const [shipValue, setShipValue] = useState<number>(0)
  const [note, setNote] = useState<string>("")
  const [addressCurrent, setAddressCurrent] = useState<string>("")
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    document.title = "Giỏ hàng - FoodEcommerce"
  }, [])

  // 🔹 Load thông tin sản phẩm trong giỏ
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

  // 🔹 Tính tổng giảm giá & phí ship
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
    setShipValue(totalShipDiscount)
  }, [voucher, total])

  const finalTotal = Math.max(0, total - disCountValue + shipping - shipValue)

  // 🔹 Xử lý đặt hàng
  const handleOrder = async () => {
    const userId = localStorage.getItem("userId")

    const tempData: AddOrder = {
      userId: userId ? userId : null,
      voucherId: voucher.find((r) => r.discountType != "Giảm giá phí ship")?.id ?? null,
      paymentMenthodId: selected,
      note,
      totalPrice: finalTotal,
      shippingFee: shipping - shipValue,
      shippingAddress: addressCurrent,
      OrdersDetails: items.map((item) => ({
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        productId: item.productId,
        unitCaculateId: item.unitCaculateId ?? "",
      })),
    }

    if (selected === 0) {
      toast.error("Vui lòng chọn phương thức thanh toán")
      return
    }
    if (addressCurrent === "") {
      toast.error("Vui lòng chọn địa chỉ giao hàng")
      return
    }

    try {
      const response: ResponseType = await createOrders.mutateAsync(tempData)
      if (response.status === 200) {
        toast.success(`${response.message}`)
        clear()
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          navigate({ to: "/" })
        }, 3000)
      } else {
        toast.error(`${response.message}`)
      }
    } catch (error) {
      console.error("❌ Lỗi khi đặt hàng:", error)
      toast.error("Đặt hàng thất bại, vui lòng thử lại.")
    }
  }

  return {
    // dữ liệu
    items,
    total,
    shipping,
    disCountValue,
    shipValue,
    finalTotal,
    isLoggedIn,

    // state
    selected,
    note,
    voucher,
    showVoucherModal,
    showSuccess,
    productCache,
    addressCurrent,

    // setter
    setSelected,
    setNote,
    setVoucher,
    setShowVoucherModal,
    setAddressCurrent,
    setShowSuccess,

    // hành động
    handleOrder,
    update,
    remove,
    clear,
    dataPayment,
  }
}
