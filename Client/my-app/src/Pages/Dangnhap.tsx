// src/pages/Auth/Login.tsx
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FaLock, FaUser } from "react-icons/fa";
import Input from "@/Component/Common/Input";

interface LoginForm {
  identity: string; // số điện thoại hoặc email
  password: string;
}

export default function Dangnhap() {
  const [form, setForm] = useState<LoginForm>({ identity: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.identity || !form.password) return;
    try {
      setLoading(true);
      setServerError(null);
      // 👉 gọi API login ở đây
      // await AuthService.login(form)
      await new Promise((r) => setTimeout(r, 1000));
      alert("Đăng nhập thành công!");
    } catch {
      setServerError("Sai thông tin đăng nhập.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {/* Logo */}
        <div className="flex flex-col items-center py-6">
          <img src="/images/logo2.png" alt="Logo" className="w-20 h-20 mb-2" />
          <h1 className="text-xl font-bold text-green-700">
            Chào mừng đến với Organic Store
          </h1>
          <p className="text-gray-500 text-sm">Đăng nhập để tiếp tục</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
          <Input
            placeholder="Số điện thoại hoặc email"
            value={form.identity}
            onChange={(e) => handleChange("identity", e.target.value)}
            icon={<FaUser className="text-gray-400" />}
            autoComplete="username"
          />
          <Input
            placeholder="Mật khẩu"
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            icon={<FaLock className="text-gray-400" />}
            autoComplete="current-password"
          />

          {serverError && (
            <div className="text-red-600 text-sm">{serverError}</div>
          )}

          {/* Nút đăng nhập */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white ${
              loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>

          {/* Đăng nhập OTP */}
          <button
            type="button"
            className="w-full py-3 rounded-md font-semibold border border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => alert("Đi tới đăng nhập OTP")}
          >
            Đăng nhập bằng OTP
          </button>

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
              to="/DangKy/"
              className="text-green-600 font-semibold hover:underline"
            >
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
