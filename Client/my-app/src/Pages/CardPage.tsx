import { useCart } from "@/Context/CartContext";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Header from "@/Component/Home/Header";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import confetti from "canvas-confetti"; // ✅ Hiệu ứng pháo hoa

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

// ============ Tabs ============
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

// ============ Address ============
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

// ============ Cart Item Row ============
function CartItemRow({
  item,
  update,
  remove,
}: {
  item: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    unitPrice: number;
    discount: number;
  };
  update: (id: string, qty: number) => void;
  remove: (id: string) => void;
}) {
  const finalPrice = item.unitPrice * (1 - item.discount / 100);

  return (
    <div className="flex gap-3 p-4 hover:bg-gray-50 transition border-b border-gray-100 last:border-0">
      <img
        src={
          item.image
            ? item.image.includes(",")
              ? item.image.split(",")[0]
              : item.image
            : "/assets/img/no-image.png"
        }
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md border border-gray-200"
      />
      <div className="flex-1 flex flex-col justify-between">
        <p className="font-medium text-sm line-clamp-2">{item.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-red-600 font-bold text-sm">
            {finalPrice.toLocaleString("vi-VN")}₫
          </p>
          {item.discount > 0 && (
            <p className="line-through text-xs text-gray-400">
              {item.unitPrice.toLocaleString("vi-VN")}₫
            </p>
          )}
        </div>
        <div className="flex items-center mt-2 gap-2">
          <button
            onClick={() => update(item.id, Math.max(1, item.quantity - 1))}
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

// ============ Summary ============
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

// ============ Main Cart Page ============
export default function CartPage() {
  const { items, update, remove, total, shipping, clear } = useCart();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    document.title = "Giỏ hàng - FoodEcommerce";
  }, []);

  const handleOrder = () => {
    toast.success("🎉 Đặt hàng thành công!");
    clear();
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate({ to: "/" });
    }, 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <Header />
        <p>Bạn cần đăng nhập để xem giỏ hàng.</p>
        <button
          onClick={() => navigate({ to: "/DangNhap" })}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

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
      <div className="flex-1 max-w-2xl mx-auto w-full px-3 pt-32">
        <div className="bg-white shadow-md p-4 space-y-3 flex flex-col h-full">
          <CartHeaderCard />
          <CartTabs />
          <AddressInfo />

          <div className="bg-white rounded-lg border border-gray-200">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={{
                  id: item.id,
                  name: item.name,
                  image: item.images,
                  quantity: item.quantity,
                  unitPrice: item.unitPrice,
                  discount: item.discount,
                }}
                update={update}
                remove={remove}
              />
            ))}
          </div>

          <Summary total={total} shipping={shipping} />

          {/* ✅ Nút đặt hàng */}
          <div className="mt-auto sticky bottom-0 bg-white p-3 shadow-md">
            <button
              onClick={handleOrder}
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

      {/* ✅ Modal thành công */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in-up">
            <div className="text-green-600 text-6xl mb-3">✅</div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Đặt hàng thành công!
            </h2>
            <p className="text-gray-500 mb-3">
              Cảm ơn bạn đã mua sắm tại Bách Hóa Xanh 💚
            </p>
            <p className="text-sm text-gray-400">
              Hệ thống đang chuyển bạn về trang chủ...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
