// src/pages/Auth/Dangky.tsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FaUser, FaEnvelope, FaLock, FaPaperPlane, FaRedo } from "react-icons/fa";
import Input from "@/Component/Common/Input";
import type { Register } from "@/Types/RegisterForm";
import { AuthService } from "@/Services/AuthService";

type Errors = Partial<Record<keyof Register, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // đơn giản & đủ dùng cho client
const USERNAME_MIN = 3;
const OTP_LEN = 6;
const PWD_MIN = 6;
const RESEND_SECONDS = 60;

export default function Dangky() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Register>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendLeft, setResendLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Đếm ngược nút Gửi lại OTP
  useEffect(() => {
    if (resendLeft <= 0) return;
    const t = setInterval(() => setResendLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendLeft]);

  const handleChange = (field: keyof Register, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setServerError(null);
  };

  const errors: Errors = useMemo(() => {
    const e: Errors = {};
    if (form.username.trim().length < USERNAME_MIN) {
      e.username = `Username tối thiểu ${USERNAME_MIN} ký tự.`;
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      e.email = "E-mail không hợp lệ.";
    }
    if (form.otp && form.otp.trim().length !== OTP_LEN) {
      e.otp = `OTP phải gồm ${OTP_LEN} số.`;
    }
    if (form.password.length < PWD_MIN) {
      e.password = `Mật khẩu tối thiểu ${PWD_MIN} ký tự.`;
    }
    if (form.confirmPassword !== form.password) {
      e.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }
    return e;
  }, [form]);

  const canSendOtp = EMAIL_REGEX.test(form.email.trim()) && !sendingOtp && resendLeft === 0;

  const canSubmit =
    form.username.trim().length >= USERNAME_MIN &&
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    EMAIL_REGEX.test(form.email.trim()) &&
    form.otp.trim().length === OTP_LEN &&
    form.password.length >= PWD_MIN &&
    form.confirmPassword === form.password &&
    !submitting;

  // Gửi OTP (fake). Nếu bạn có AuthService.sendOtp(email) thì thay đoạn setTimeout() bằng call thật.
  const handleSendOtp = async () => {
    if (!canSendOtp) return;
    try {
      setSendingOtp(true);
      setServerError(null);
      // 👉 Call thật (nếu đã có):
      // await AuthService.sendOtp({ email: form.email, purpose: "register" });
      await new Promise((r) => setTimeout(r, 900)); // fake delay
      setResendLeft(RESEND_SECONDS);
    } catch (err: unknown) {
      if (err instanceof Error) setServerError(err.message);
      else setServerError("Đã xảy ra lỗi không xác định.");
    } finally {
      setSendingOtp(false);
    }
  };

  // Đăng ký (gọi AuthService.register fake)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      setSubmitting(true);
      setServerError(null);

      await AuthService.register({
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        otp: form.otp,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      alert("Đăng ký thành công!");
      navigate({ to: "/DangNhap" });
    } catch (err: unknown) {
      if (err instanceof Error) setServerError(err.message);
      else setServerError("Đăng ký thất bại, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/60">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2E7D32] via-[#4CAF50] to-[#7CB342] py-7 flex flex-col items-center">
          <img src="/images/logo2.png" alt="Logo" className="w-16 h-16 mb-2 rounded-full bg-white/80 p-2" />
          <h1 className="text-xl font-extrabold text-white">Tạo tài khoản</h1>
          <p className="text-green-100 text-sm mt-1">Đăng ký để mua sắm dễ dàng hơn</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {/* Username */}
          <Input
            label="Username"
            placeholder={`Nhập username (>= ${USERNAME_MIN} ký tự)`}
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            icon={<FaUser className="text-gray-400" />}
            error={errors.username}
            autoComplete="username"
          />

          {/* First Name */}
          <Input
            label="First Name"
            placeholder="Ví dụ: An"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            icon={<FaUser className="text-gray-400" />}
            autoComplete="given-name"
          />

          {/* Last Name */}
          <Input
            label="Last Name"
            placeholder="Ví dụ: Nguyễn"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            icon={<FaUser className="text-gray-400" />}
            autoComplete="family-name"
          />

          {/* Email */}
          <Input
            label="E-mail Address"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            icon={<FaEnvelope className="text-gray-400" />}
            error={errors.email}
            type="email"
            autoComplete="email"
          />

          {/* Send OTP */}
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={!canSendOtp}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition ${
              canSendOtp ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"
            }`}
          >
            {sendingOtp ? "Đang gửi..." : (<><FaPaperPlane /> Click Here to send OTP</>)}
          </button>

          {/* OTP + Resend */}
          <div>
            <label className="mb-1 font-medium text-gray-700 block">OTP</label>
            <div className="flex gap-3">
              <input
                type="tel"
                inputMode="numeric"
                maxLength={OTP_LEN}
                placeholder={`Nhập ${OTP_LEN} số OTP`}
                value={form.otp}
                onChange={(e) =>
                  handleChange("otp", e.target.value.replace(/\D/g, "").slice(0, OTP_LEN))
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={!EMAIL_REGEX.test(form.email) || resendLeft > 0}
                className={`px-4 rounded-md text-white flex items-center justify-center gap-2 transition ${
                  resendLeft > 0 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
                aria-label="Resend OTP"
              >
                <FaRedo />
                {resendLeft > 0 ? `Gửi lại (${resendLeft}s)` : "Gửi lại"}
              </button>
            </div>
            {errors.otp && <div className="text-red-500 text-sm mt-1">{errors.otp}</div>}
          </div>

          {/* Password */}
          <Input
            label="Password"
            placeholder={`Tối thiểu ${PWD_MIN} ký tự`}
            type="password"
            icon={<FaLock className="text-gray-400" />}
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
            autoComplete="new-password"
          />

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            placeholder="Nhập lại mật khẩu"
            type="password"
            icon={<FaLock className="text-gray-400" />}
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          {serverError && <div className="text-red-600 text-sm">{serverError}</div>}

          {/* Register */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              canSubmit ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"
            }`}
          >
            {submitting ? "Đang xử lý..." : "Đăng ký"}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/DangNhap" className="text-green-600 font-semibold hover:underline">
              Đăng nhập
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
