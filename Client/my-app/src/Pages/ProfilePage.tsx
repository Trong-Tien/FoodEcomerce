import { useEffect, useState } from "react";
import Header from "@/Component/Home/Header";
import Footer from "@/Component/Home/Footer";
import Swal from "sweetalert2";
import { UserService } from "@/Services/UserService";
import type { User } from "@/Type/User";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const userId =
    localStorage.getItem("userId") ||
    "00000000-0000-0000-0000-000000000000";

  useEffect(() => {
    UserService.getById(userId).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  const handleUpdate = async () => {
    if (!user) return;
    setSaving(true);
    const success = await UserService.update(user);

    if (success) {
      Swal.fire({
        icon: "success",
        title: "🎉 Cập nhật thành công!",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Không thể cập nhật!",
        text: "Vui lòng thử lại.",
      });
    }
    setSaving(false);
  };

  const handleChange = (field: keyof User, value: string | boolean) => {
    setUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Đang tải thông tin người dùng...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Không tìm thấy người dùng.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100">
      <Header />

      <div className="pt-[130px] max-w-5xl mx-auto px-6">
        {/* Hiệu ứng card nổi 3D */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl shadow-green-200 p-8 border border-green-100 backdrop-blur-lg"
        >
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            🌿 Thông tin cá nhân
          </h1>

          {/* Grid 2 cột hiện đại */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột trái */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={user.userName || ""}
                  onChange={(e) => handleChange("userName", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:shadow-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:shadow-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={user.phoneNumber || ""}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:shadow-md"
                />
              </div>
            </div>

            {/* Cột phải */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  value={user.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mt-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:shadow-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vai trò
                  </label>
                  <input
                    disabled
                    value={user.role?.name || "Không xác định"}
                    className="w-full border rounded-xl px-4 py-2 mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Trạng thái
                  </label>
                  <input
                    disabled
                    value={user.statusId?.name || "Không xác định"}
                    className="w-full border rounded-xl px-4 py-2 mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="active"
                  type="checkbox"
                  checked={user.active}
                  onChange={(e) => handleChange("active", e.target.checked)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="active" className="text-sm text-gray-700">
                  Tài khoản đang hoạt động
                </label>
              </div>
            </div>
          </div>

          {/* Nút cập nhật */}
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleUpdate}
              disabled={saving}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-green-300 transition-all disabled:opacity-60"
            >
              {saving ? "Đang lưu..." : "💾 Cập nhật thông tin"}
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
