// src/Pages/CartPage.tsx
import { useCart } from "@/Context/CartContext";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { CartItem } from "@/Types/product";
import Header from "@/Component/Home/Header";
import { ArrowLeft } from "lucide-react";

// ============ Card Header =============
function CartHeaderCard() {
  return (
    <div className="relative flex items-center p-4 border-b border-gray-200">
      <button
        onClick={() => window.history.back()}
        className="absolute left-4 p-2 rounded-full hover:bg-gray-100"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>
      <h2 className="mx-auto text-lg font-semibold text-gray-800">Giỏ hàng</h2>
    </div>
  );
}

// ============ Tabs =============
function CartTabs() {
  const [active, setActive] = useState<"home" | "store">("home");
  return (
    <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setActive("home")}
        className={`flex-1 py-3 text-center font-semibold text-sm ${
          active === "home"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500"
        }`}
      >
        Giao hàng tận nơi
      </button>
      <button
        onClick={() => setActive("store")}
        className={`flex-1 py-3 text-center font-semibold text-sm ${
          active === "store"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500"
        }`}
      >
        Nhận tại cửa hàng
      </button>
    </div>
  );
}

// ============ Address =============
function AddressInfo() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm space-y-2">
      <div className="flex justify-between">
        <div>
          <p>
            <span className="font-semibold">Giao đến:</span> Anh Thịnh
            0947xxxxxx
          </p>
          <p className="text-gray-600">87/1, Xã Long Phú, TP. Cần Thơ</p>
        </div>
        <button className="text-green-600 text-xs font-medium">Đổi</button>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-gray-600">Giao từ: BHX Long Phú</p>
          <p className="text-xs text-gray-400">
            Thửa đất số 137, tờ bản đồ số 41, ấp 4, Long Phú, Cần Thơ
          </p>
        </div>
        <button className="text-green-600 text-xs font-medium">Đổi</button>
      </div>
    </div>
  );
}

// ============ Cart Item Row =============
function CartItemRow({
  item,
  update,
  remove,
}: {
  item: CartItem;
  update: (id: number, qty: number) => void;
  remove: (id: number) => void;
}) {
  return (
    <div className="flex gap-3 p-4 hover:bg-gray-50 transition border-b border-gray-100 last:border-0">
      <img
        src={item.img}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md border border-gray-200"
      />
      <div className="flex-1 flex flex-col justify-between">
        <p className="font-medium text-sm line-clamp-2">{item.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-red-600 font-bold text-sm">
            {item.price.toLocaleString("vi-VN")}₫
          </p>
          {item.originalPrice && (
            <p className="line-through text-xs text-gray-400">
              {item.originalPrice.toLocaleString("vi-VN")}₫
            </p>
          )}
        </div>
        <div className="flex items-center mt-2 gap-2">
          <button
            onClick={() => update(item.id, item.quantity - 1)}
            className="px-2 rounded border border-gray-300 bg-gray-50"
          >
            -
          </button>
          <span className="text-sm">{item.quantity}</span>
          <button
            onClick={() => update(item.id, item.quantity + 1)}
            className="px-2 rounded border border-gray-300 bg-gray-50"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => remove(item.id)}
        className="text-red-500 text-xs hover:underline"
      >
        Xoá
      </button>
    </div>
  );
}

// ============ Summary =============
function Summary({ total, shipping }: { total: number; shipping: number }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm space-y-2">
      {total < 300000 && (
        <p className="text-green-600 text-xs">
          Mua thêm {(300000 - total).toLocaleString("vi-VN")}₫ để được Freeship
        </p>
      )}
      <div className="flex justify-between">
        <span>Tiền hàng</span>
        <span>{total.toLocaleString("vi-VN")}₫</span>
      </div>
      <div className="flex justify-between">
        <span>Phí giao hàng</span>
        <span>{shipping.toLocaleString("vi-VN")}₫</span>
      </div>
      <div className="flex justify-between font-bold text-base">
        <span>Tổng đơn hàng</span>
        <span>{(total + shipping).toLocaleString("vi-VN")}₫</span>
      </div>
    </div>
  );
}

// ============ Promotions =============
function PromotionSection() {
  const promotions = [
    {
      id: "gift1",
      name: "Nước ngọt Coca 6 lon",
      price: 39000,
      img: "https://cdn.tgdd.vn/Products/Images/2282/247939/bhx/6-lon-nuoc-ngot-coca-cola-320ml-202203231016459797.jpg",
    },
    {
      id: "gift2",
      name: "Táo Gala mini",
      price: 39900,
      img: "https://cdn.tgdd.vn/Products/Images/8788/226928/bhx/tao-gala-mini-new-zealand-tui-1kg-202111011450022144.jpg",
    },
    {
      id: "gift3",
      name: "Sữa tắm Pigeon",
      price: 150000,
      img: "https://cdn.tgdd.vn/Products/Images/2282/247939/bhx/sua-tam-pigeon-202203231016459797.jpg",
    },
  ];
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-sm mb-2 text-orange-600">
        🎁 Ưu đãi cho đơn hàng này
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {promotions.map((p) => (
          <div
            key={p.id}
            className="min-w-[140px] border border-gray-200 rounded-md p-2 flex-shrink-0 text-center hover:shadow-md transition"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-20 object-cover rounded"
            />
            <p className="text-xs mt-1 line-clamp-2">{p.name}</p>
            <p className="text-green-700 text-sm font-bold">
              {p.price.toLocaleString("vi-VN")}₫
            </p>
            <button className="mt-1 w-full text-xs py-1 rounded bg-[#F0FFF3] text-[#007E42] hover:bg-[#E0FFE8]">
              Mua
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ Payment Options =============
function PaymentOptions() {
  const [method, setMethod] = useState<"cash" | "card" | "wallet">("cash");
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 text-sm">
      <h3 className="font-semibold mb-2">Thanh toán</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={method === "cash"}
            onChange={() => setMethod("cash")}
          />
          <span>Tiền mặt khi nhận hàng</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          <span>Thẻ ATM / Visa / Mastercard</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={method === "wallet"}
            onChange={() => setMethod("wallet")}
          />
          <span>Ví điện tử (Momo, ZaloPay, ShopeePay)</span>
        </label>
      </div>
    </div>
  );
}

// ============ Invoice =============
function InvoiceOption() {
  const [companyInvoice, setCompanyInvoice] = useState(false);
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={companyInvoice}
          onChange={(e) => setCompanyInvoice(e.target.checked)}
        />
        <span>Xuất hoá đơn công ty</span>
      </label>
      {companyInvoice && (
        <textarea
          placeholder="Nhập thông tin xuất hoá đơn..."
          className="mt-2 w-full border rounded p-2 text-sm"
        />
      )}
    </div>
  );
}

// ============ Extra Note =============
function ExtraNote() {
  return (
      <textarea
        placeholder="Yêu cầu khác (nếu có)"
        className="w-full border border-gray-200 rounded p-2 text-sm"
      />
  );
}

// ============ Main Cart Page =============
export default function CartPage() {
  const { items, update, remove, total, shipping } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Giỏ hàng - FoodEcommerce";
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <Header />
        <p>Giỏ hàng trống.</p>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Mua sắm ngay
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6F7] min-h-screen flex flex-col">
      <Header />

      {/* Container giỏ hàng */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-3 pt-32">
        <div className="bg-white shadow-md p-4 space-y-3 flex flex-col h-full">
          <CartHeaderCard />
          <CartTabs />
          <AddressInfo />
          <div className="bg-white rounded-lg border border-gray-200">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                update={update}
                remove={remove}
              />
            ))}
          </div>
          <Summary total={total} shipping={shipping} />
          <PromotionSection />
          <PaymentOptions />
          <InvoiceOption />
          <ExtraNote />

          {/* ✅ Nút luôn ở cuối giỏ hàng */}
          <div className="mt-auto sticky bottom-0 bg-white p-3 shadow-md">
            <button
              onClick={() => navigate({ to: "/checkout" })}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-md 
                     bg-gradient-to-r from-green-600 to-green-700 
                     text-white font-bold text-lg shadow-md relative"
            >
              <span className="absolute left-4 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-400 text-green-900 text-xs font-bold">
                {items.length}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293A1 1 0 007 17h10a1 1 0 00.894-.553L21 9M7 13l1.5 9h7L17 13"
                />
              </svg>
              <span>
                Đặt hàng {(total + shipping).toLocaleString("vi-VN")}₫
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
