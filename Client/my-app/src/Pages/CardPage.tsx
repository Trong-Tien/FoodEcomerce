// src/Pages/CartPage.tsx
import { useCart } from "@/Context/CartContext";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Header from "@/Component/Home/Header";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import { productService } from "@/Services/ProductService";
import { voucherUserService } from "@/Services/VoucherUserService";
import type { Voucher } from "@/Type/Voucher";

/* ========================== Header ========================== */
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

/* ========================== Tabs ========================== */
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

/* ========================== Address ========================== */
function AddressInfo() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm space-y-2">
      <div className="flex justify-between">
        <div>
          <p>
            <span className="font-semibold">Giao đến:</span> Anh Thịnh 0947xxxxxx
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

/* ========================== Summary ========================== */
function Summary({
  total,
  shipping,
  discount,
}: {
  total: number;
  shipping: number;
  discount: number;
}) {
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

      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Giảm giá voucher</span>
          <span>-{discount.toLocaleString("vi-VN")}₫</span>
        </div>
      )}

      <div className="flex justify-between">
        <span>Phí giao hàng</span>
        <span>{shipping.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="flex justify-between font-bold text-base">
        <span>Tổng đơn hàng</span>
        <span>{(total - discount + shipping).toLocaleString("vi-VN")}₫</span>
      </div>
    </div>
  );
}

/* ========================== Apply Voucher Button ========================== */
function ApplyVoucherButton({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
      <p className="text-sm text-gray-700 font-medium">Chọn voucher của bạn</p>
      <button
        onClick={onOpen}
        className="px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm font-semibold shadow"
      >
        Chọn voucher
      </button>
    </div>
  );
}

/* ========================== Cart Item Row ========================== */
function CartItemRow({
  item,
  update,
  remove,
}: {
  item: {
    id: string;
    productId: string;
    name: string;
    image: string;
    quantity: number;
    unitPrice: number;
    discount: number;
  };
  update: (id: string, qty: number) => void;
  remove: (id: string) => void;
}) {
  const finalPrice =
    item.unitPrice * item.quantity * (1 - (item.discount || 0) / 100);

  return (
    <div className="flex gap-3 p-4 hover:bg-gray-50 transition border-b border-gray-100 last:border-0">
      <img
        src={item.image || "/assets/img/no-image.png"}
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

/* ========================== Voucher Modal (API trả mảng Voucher trực tiếp) ========================== */
function VoucherModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (voucher: Voucher) => void;
}) {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5292";

  useEffect(() => {
    let userId: string | null = localStorage.getItem("userId");
    if (!userId) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const parsed = JSON.parse(userStr);
          userId = parsed?.id || null;
        } catch {}
      }
    }

    if (!userId) {
      console.warn("⚠️ Không tìm thấy userId");
      setLoading(false);
      return;
    }

    voucherUserService
      .getByUserId(userId)
      .then((res) => {
        console.log("📦 VoucherUser API result:", res);
        setVouchers(res);
      })
      .catch((err) => console.error("❌ Lỗi tải voucher:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-4xl p-6 max-h-[80vh] overflow-y-auto animate-fade-in-up">
        <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
          🎟️ Chọn voucher của bạn
        </h2>

        {loading ? (
          <p className="text-gray-500 italic text-center">Đang tải voucher...</p>
        ) : vouchers.length === 0 ? (
          <p className="text-center text-gray-500">Bạn chưa sở hữu voucher nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {vouchers.map((v) => (
              <div
                key={v.id}
                onClick={() => onSelect(v)}
                className="relative flex bg-white border border-green-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative w-1/3 bg-green-50 flex items-center justify-center p-2">
                  <img
                    src={
                      v.imageUrl
                        ? v.imageUrl.startsWith("http")
                          ? v.imageUrl
                          : `${API_BASE}/api/File/image?path=${encodeURIComponent(
                              v.imageUrl.replace(/^\/+/, "")
                            )}`
                        : "/assets/img/voucher-default.png"
                    }
                    alt={v.name}
                    className="rounded-md object-contain max-h-[100px]"
                  />
                </div>

                <div className="w-2/3 p-3 flex flex-col justify-between">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {v.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {v.discountType === "PERCENT"
                      ? `Giảm ${v.discountValue}% (tối đa ${v.maxDiscountAmount?.toLocaleString(
                          "vi-VN"
                        )}₫)`
                      : `Giảm ${v.discountValue.toLocaleString("vi-VN")}₫`}{" "}
                    • HSD{" "}
                    {v.endTime
                      ? new Date(v.endTime).toLocaleDateString("vi-VN")
                      : "N/A"}
                  </p>
                  <button className="mt-2 bg-green-100 text-green-700 border border-green-400 font-semibold text-sm py-1 rounded-md hover:bg-green-600 hover:text-white transition-all">
                    🎁 Áp dụng
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

/* ========================== MAIN CART PAGE ========================== */
export default function CartPage() {
  const { items, update, remove, total, shipping, clear } = useCart();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [productCache, setProductCache] = useState<Record<string, any>>({});
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  useEffect(() => {
    document.title = "Giỏ hàng - FoodEcommerce";
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const cache: Record<string, any> = {};
      for (const item of items) {
        const p = await productService.getById(item.productId);
        if (p) {
          cache[item.productId] = {
            name: p.name,
            image:
              p.images?.split(",")[0] ||
              p.imageProducts?.[0]?.imageUrl ||
              "/assets/img/no-image.png",
          };
        }
      }
      setProductCache(cache);
    };
    if (items.length > 0) loadProducts();
  }, [items]);

  // ✅ Tính giảm giá có giới hạn
  const discountAmount = (() => {
    if (!voucher) return 0;
    if (voucher.discountType === "PERCENT") {
      const percentDiscount = (total * voucher.discountValue) / 100;
      return Math.min(percentDiscount, voucher.maxDiscountAmount || percentDiscount);
    }
    return voucher.discountValue;
  })();

  const finalTotal = Math.max(0, total - discountAmount + shipping);

  const handleOrder = () => {
    toast.success(
      `🎉 Đặt hàng thành công! Tổng thanh toán ${finalTotal.toLocaleString("vi-VN")}₫`
    );
    clear();
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });
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

          {/* ✅ Danh sách sản phẩm */}
          <div className="bg-white rounded-lg border border-gray-200">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={{
                  id: item.id,
                  productId: item.productId,
                  name: productCache[item.productId]?.name || "Đang tải...",
                  image:
                    productCache[item.productId]?.image ||
                    "/assets/img/no-image.png",
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
          <Summary total={total} shipping={shipping} discount={discountAmount} />

          <ApplyVoucherButton onOpen={() => setShowVoucherModal(true)} />

          {voucher && (
            <div className="mt-2 bg-green-50 border border-green-200 text-green-700 rounded-md p-3 text-sm flex justify-between items-center">
              <span>
                🎟️ Đã áp dụng <b>{voucher.name}</b>{" "}
                ({voucher.discountType === "PERCENT"
                  ? `-${voucher.discountValue}%`
                  : `-${voucher.discountValue.toLocaleString("vi-VN")}₫`})
              </span>
              <button
                onClick={() => setVoucher(null)}
                className="text-xs font-medium hover:underline"
              >
                Huỷ
              </button>
            </div>
          )}

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
              <span>Đặt hàng {finalTotal.toLocaleString("vi-VN")}₫</span>
            </button>
          </div>
        </div>
      </div>

      {showVoucherModal && (
        <VoucherModal
          onClose={() => setShowVoucherModal(false)}
          onSelect={(v) => {
            setVoucher(v);
            toast.success(`🎉 Đã áp dụng voucher ${v.name}!`);
            setShowVoucherModal(false);
          }}
        />
      )}

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
