import Header from "@/Component/Home/Header"
import { ArrowLeft } from "lucide-react"
import PaymentMethod from "@/Component/Common/Cart/PaymentMethod"
import CartItemRow from "@/Component/Common/Cart/CartItemRow"
import Summary from "@/Component/Common/Cart/Summary"
import OrderNote from "@/Component/Common/Cart/OrderNote"
import SuccessModal from "@/Component/Common/Cart/SuccessModal"
import AddressInfo from "@/Component/Common/Cart/AddressInfo"
import ApplyVoucherButton from "@/Component/Common/Cart/ApplyVoucherButton"
import VoucherModal from "@/Component/Common/Cart/VocherModal"
import toast from "react-hot-toast"
import { useCartPage } from "@/Hooks/useCartPage"

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

function CartTabs() {
  return (
    <div className="flex gap-2 p-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="flex-1 py-3 text-center font-semibold text-sm rounded-lg bg-emerald-600 text-white shadow-md">
        Giao hàng tận nơi
      </div>
    </div>
  )
}

export default function CartPage() {
  const {
    items,
    total,
    shipping,
    disCountValue,
    shipValue,
    finalTotal,
    isLoggedIn,

    selected,
    note,
    voucher,
    showVoucherModal,
    showSuccess,
    productCache,
    addressCurrent,

    setSelected,
    setNote,
    setVoucher,
    setShowVoucherModal,
    setAddressCurrent,

    handleOrder,
    update,
    remove,
    dataPayment,
  } = useCartPage()

  // Nếu chưa đăng nhập
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-600">
        <Header />
        <p className="text-lg">Bạn cần đăng nhập để xem giỏ hàng.</p>
        <button
          onClick={() => window.location.href = "/DangNhap"}
          className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
        >
          Đăng nhập ngay
        </button>
      </div>
    )
  }

  // Nếu giỏ hàng trống
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-600">
        <Header />
        <p className="text-lg">Giỏ hàng trống.</p>
        <button
          onClick={() => window.location.href = "/"}
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
        <AddressInfo setAddressCurrent={setAddressCurrent} />

        {/* Sản phẩm */}
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

        {/* Tổng hợp */}
        <Summary total={finalTotal} shipping={shipping} shippingDiscount={shipValue} discount={disCountValue} />

        <ApplyVoucherButton onOpen={() => setShowVoucherModal(true)} />

        {voucher.length > 0 && (
          <div className="mx-4 mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex justify-between items-center">
            <span className="text-sm font-semibold">🎟️ Đã áp dụng <b>{voucher.length}</b> mã giảm giá</span>
            <button onClick={() => setVoucher([])} className="text-xs font-semibold hover:underline">Huỷ</button>
          </div>
        )}

        {/* Thanh toán + ghi chú */}
        <div className="mx-4 mb-6">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">🛒 Phương thức thanh toán</h2>

            <PaymentMethod
              methods={dataPayment}
              selected={selected}
              setSelected={setSelected}
            />

            {selected !== 0 && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium animate-fade-in">
                ✓ Đã chọn: <b>{dataPayment.find((m) => m.id === selected)?.name ?? "—"}</b>
              </div>
            )}
          </div>

          <OrderNote note={note} setNote={setNote} />
        </div>

        {/* Nút đặt hàng */}
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

      {showSuccess && <SuccessModal finalTotal={finalTotal} itemCount={items.length} />}
    </div>
  )
}
