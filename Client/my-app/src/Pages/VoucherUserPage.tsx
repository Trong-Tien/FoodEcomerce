import { useEffect, useState } from "react";
import { voucherUserService } from "@/Services/VoucherUserService";
import Header from "@/Component/Home/Header";
import Footer from "@/Component/Home/Footer";
import type { Voucher } from "@/Type/Voucher";

export default function VoucherUserPage() {
  const API_BASE = "http://localhost:5292";
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Lấy userId từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = localStorage.getItem("userId");
    let id: string | null = null;

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        id = parsed?.id || null;
      } catch {
        console.error("❌ Lỗi parse user");
      }
    }
    if (!id && storedUserId) id = storedUserId;
    if (id) setUserId(id);
  }, []);

  // 🟢 Gọi API lấy voucher của user
  useEffect(() => {
    if (!userId) return;
    voucherUserService
      .getByUserId(userId)
      .then((res) => setVouchers(res))
      .catch((err) => console.error("❌ Lỗi tải voucher:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* 🔹 Nội dung chính */}
      <div className="pt-[122px] max-w-7xl mx-auto px-3 relative">
        {/* ✅ Tiêu đề */}
        <h1 className="text-2xl font-bold text-green-700 border-b pb-2 mb-5 flex items-center gap-2">
          <span>🎟️</span> Voucher của tôi
        </h1>

        {/* ✅ Container đồng bộ */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          {loading ? (
            <p className="text-gray-500 italic text-center">
              Đang tải voucher...
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
                  {/* Ảnh voucher */}
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
                    {/* Răng cưa */}
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

                  {/* Nội dung voucher */}
                  <div className="w-2/3 p-3 flex flex-col justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2">
                        {v.name || "Không có tên"}
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
                      disabled
                      className="mt-2 bg-green-100 text-green-700 border border-green-400 font-semibold text-sm py-1 rounded-md cursor-not-allowed"
                    >
                      ✅ ĐÃ NHẬN
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
