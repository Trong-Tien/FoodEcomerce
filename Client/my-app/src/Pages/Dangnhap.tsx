"use client"

import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { FaLock, FaEnvelope } from "react-icons/fa"
import { AuthService } from "@/Services/AuthService"
import { useAuth } from "@/Context/AuthContext"
import toast from "react-hot-toast"
import logo from "@/assets/img/logo.jpg"

interface LoginForm {
  email: string
  password: string
}

export default function Dangnhap() {
  const navigate = useNavigate()
  const { login: setAuth } = useAuth()
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setServerError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setServerError("Vui lòng nhập đầy đủ thông tin đăng nhập.")
      return
    }

    try {
      setLoading(true)
      setServerError(null)
      const res = await AuthService.login({
        email: form.email,
        password: form.password,
      })

      if (res?.token && res?.user) {
        setAuth(res.user, res.token)
        toast.success("🎉 Đăng nhập thành công!")
        navigate({ to: "/" })
      } else {
        setServerError("Sai thông tin đăng nhập hoặc phản hồi không hợp lệ.")
      }
    } catch (err: any) {
      setServerError(err.message || "Không thể kết nối đến máy chủ.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Hiệu ứng nền neon mờ */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>

      {/* Form login */}
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/60 shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 mb-3 rounded-full bg-white/10 p-2 border border-slate-600 shadow-lg"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-md">
            Đăng nhập tài khoản
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Chào mừng bạn quay lại FreshMart 🌿
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Email
            </label>
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-3.5 w-4 h-4 text-emerald-400/60 group-focus-within:text-emerald-400 transition" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Nhập email của bạn"
                className="w-full pl-10 pr-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-700/50 focus:ring-1 focus:ring-emerald-400/30 transition duration-300"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Mật khẩu
            </label>
            <div className="relative group">
              <FaLock className="absolute left-4 top-3.5 w-4 h-4 text-emerald-400/60 group-focus-within:text-emerald-400 transition" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-700/50 focus:ring-1 focus:ring-emerald-400/30 transition duration-300"
              />
            </div>
          </div>

          {/* Thông báo lỗi */}
          {serverError && (
            <div className="text-red-400 text-sm text-center">{serverError}</div>
          )}

          {/* Nút đăng nhập */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-slate-900 transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 ${
              loading
                ? "bg-gradient-to-r from-emerald-400/40 to-teal-400/40 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-slate-800/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                Hoặc tiếp tục bằng
              </span>
            </div>
          </div>

          {/* Nút đăng nhập bằng MXH */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 rounded-xl py-3 transition duration-300 flex items-center justify-center gap-2 group"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                className="w-5 h-5"
                alt="Facebook"
              />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition">
                Facebook
              </span>
            </button>
            <button
              type="button"
              className="bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 rounded-xl py-3 transition duration-300 flex items-center justify-center gap-2 group"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                className="w-5 h-5"
                alt="Google"
              />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition">
                Google
              </span>
            </button>
          </div>

          {/* Liên kết phụ */}
          <div className="text-center space-y-2 mt-3">
            <Link
              to="/forgot-password"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition"
            >
              Quên mật khẩu?
            </Link>

            <p className="text-sm text-slate-400">
              Chưa có tài khoản?{" "}
              <Link
                to="/DangKyGmailFlow"
                className="text-emerald-400 font-semibold hover:text-emerald-300 transition"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Footer nhỏ */}
          <p className="text-center text-[11px] text-slate-500 mt-6">
            © 2025 FreshMart. Tất cả quyền được bảo lưu.
          </p>
        </form>
      </div>
    </div>
  )
}
