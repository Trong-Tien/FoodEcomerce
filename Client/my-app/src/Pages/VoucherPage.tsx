import { useEffect, useState } from "react";
import Header from "@/Component/Home/Header";
import Footer from "@/Component/Home/Footer";
import Swal from "sweetalert2";
import type { Voucher } from "@/Type/Voucher";

export default function VoucherPage() {
  const API_BASE = "http://localhost:5292";
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Lấy userId từ localStorage
  const userId =
    localStorage.getItem("userId") ||
    "00000000-0000-0000-0000-000000000000";

  // 🟢 Lấy danh sách voucher
  const fetchVouchers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/VoucherUser/GetAll`);
      const data = await res.json();
      setVouchers(data?.items ?? []);
    } catch (err) {
      console.error("❌ Lỗi tải danh sách voucher:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  // 🟢 Nhận voucher
  const handleClaimVoucher = async (voucherId: number) => {
  try {
    const body = {
      id: 0, // ✅ int
      voucherId: voucherId, // ✅ int
      userId: userId, // ✅ GUID string
      isUsed: false,
      usedAt: new Date().toISOString(),
    };

    const res = await fetch(`${API_BASE}/api/VoucherUser/Create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "🎉 Nhận voucher thành công!",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const errText = await res.text();
      console.error("❌ Server error:", errText);
      Swal.fire({
        icon: "error",
        title: "Không thể nhận voucher!",
        text: "Voucher có thể đã hết hoặc bạn đã nhận rồi.",
      });
    }
  } catch (err) {
    console.error("❌ Network error:", err);
    Swal.fire({
      icon: "error",
      title: "Lỗi kết nối!",
      text: "Vui lòng thử lại sau.",
    });
  }
};

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* 🔹 Nội dung chính */}
      <div className="pt-[122px] max-w-7xl mx-auto px-3 relative">
        {/* ✅ Tiêu đề */}
        <h1 className="text-2xl font-bold text-green-700 border-b pb-2 mb-5">
          Ưu đãi phiếu mua hàng độc quyền
        </h1>

        {/* ✅ Thẻ container đồng bộ với ProductDetail */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          {loading ? (
            <p className="text-gray-500 italic text-center">
              Đang tải danh sách voucher...
            </p>
          ) : vouchers.length === 0 ? (
            <p className="text-center text-gray-500">
              Hiện chưa có voucher nào khả dụng.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {vouchers.map((v) => (
                <div
                  key={v.id}
                  className="relative flex bg-white border border-green-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  {/* Phần ảnh bên trái */}
                  <div className="relative w-1/3 bg-green-50 flex items-center justify-center p-2">
                    <img
                      src={
                        v.imageUrl
                          ? `${API_BASE}/api/File/image?path=${encodeURIComponent(
                              v.imageUrl
                            )}`
                          : "/assets/img/no-image.png"
                      }
                      alt={v.name}
                      className="rounded-md object-contain max-h-[100px]"
                    />

                    {/* Răng cưa chia giữa hai phần */}
                    <div
                      className="absolute top-0 right-[-5px] w-[10px] h-full bg-white z-10"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 5px 8px, #f9fafb 5px, transparent 6px),
                          radial-gradient(circle at 5px 24px, #f9fafb 5px, transparent 6px),
                          radial-gradient(circle at 5px 40px, #f9fafb 5px, transparent 6px),
                          radial-gradient(circle at 5px 56px, #f9fafb 5px, transparent 6px),
                          radial-gradient(circle at 5px 72px, #f9fafb 5px, transparent 6px),
                          radial-gradient(circle at 5px 88px, #f9fafb 5px, transparent 6px)
                        `,
                        backgroundSize: "10px 16px",
                        backgroundRepeat: "repeat-y",
                        mixBlendMode: "screen",
                      }}
                    ></div>
                  </div>

                  {/* Phần nội dung bên phải */}
                  <div className="w-2/3 p-3 flex flex-col justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2">
                        {v.name}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        {v.startDate
                          ? new Date(v.startDate).toLocaleDateString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                            })
                          : ""}{" "}
                        -{" "}
                        {v.endTime
                          ? new Date(v.endTime).toLocaleDateString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                    </div>

                    <button
                      onClick={() => handleClaimVoucher(v.id)}
                      className="mt-2 bg-green-100 text-green-700 border border-green-400 font-semibold text-sm py-1 rounded-md hover:bg-green-600 hover:text-white transition-all"
                    >
                      🎁 NHẬN NGAY
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
