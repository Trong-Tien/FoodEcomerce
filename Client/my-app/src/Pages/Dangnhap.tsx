// src/pages/Auth/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FaLock, FaUser } from "react-icons/fa";
import Input from "@/Component/Common/Input";
import { AuthService } from "@/Services/AuthService";
import logo from "@/assets/img/logo.jpg";

interface LoginForm {
  identity: string;
  password: string;
}

export default function Dangnhap() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({ identity: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.identity || !form.password) {
      setServerError("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }

    try {
      setLoading(true);
      setServerError(null);

      // 👉 Gọi API đăng nhập thật
      const data = await AuthService.login({
        phoneNumber: form.identity, // backend login theo PhoneNumber
        password: form.password,
      });

      // ✅ Xóa token & user cũ (nếu có)
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      // ✅ Lưu token & user mới
      if (data.token) localStorage.setItem("access_token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Điều hướng về trang chủ
      navigate({ to: "/" });
    } catch (err: unknown) {
      if (err instanceof Error) setServerError(err.message);
      else setServerError("Sai thông tin đăng nhập.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/60">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2E7D32] via-[#4CAF50] to-[#7CB342] py-7 flex flex-col items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 mb-2 rounded-full bg-white/80 p-2"
          />
          <h1 className="text-xl font-extrabold text-white">
            Đăng nhập tài khoản
          </h1>
          <p className="text-green-100 text-sm mt-1">
            Chào mừng bạn quay lại
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <Input
            label="Số điện thoại"
            placeholder="Ví dụ: 0901234567"
            value={form.identity}
            onChange={(e) => handleChange("identity", e.target.value)}
            icon={<FaUser className="text-gray-400" />}
            autoComplete="username"
          />

          <Input
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            icon={<FaLock className="text-gray-400" />}
            autoComplete="current-password"
          />

          {serverError && (
            <div className="text-red-600 text-sm text-center">
              {serverError}
            </div>
          )}

          {/* Nút đăng nhập */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>

          {/* Đăng nhập OTP */}
          <Link
            to="/DangNhapOTP"
            className="w-full block text-center py-3 rounded-lg font-semibold border border-green-600 text-green-700 hover:bg-green-50"
          >
            Đăng nhập bằng OTP
          </Link>

          {/* Link phụ */}
          <div className="flex justify-center">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <p className="text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/DangKy"
              className="text-green-600 font-semibold hover:underline"
            >
              Đăng ký
            </Link>
          </p>

          <p className="text-center text-[11px] text-gray-400 mt-2">
            © 2025 Bách Hóa Xanh. Tất cả quyền được bảo lưu.
          </p>
        </form>
      </div>
    </div>
  );
}
