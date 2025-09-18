import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FaUser, FaEnvelope, FaLock, FaPaperPlane, FaRedo, FaPhone } from "react-icons/fa";
import Input from "@/Component/Common/Input";
import { AuthService } from "@/Services/AuthService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const USERNAME_MIN = 3;
const OTP_LEN = 6;
const PWD_MIN = 6;
const RESEND_SECONDS = 60;

interface RegisterForm {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export default function Dangky() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendLeft, setResendLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (resendLeft <= 0) return;
    const t = setInterval(() => setResendLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendLeft]);

  const handleChange = (field: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setServerError(null);
  };

  const errors = useMemo(() => {
    const e: Partial<Record<keyof RegisterForm, string>> = {};
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
    form.phoneNumber.trim().length > 0 &&
    EMAIL_REGEX.test(form.email.trim()) &&
    form.otp.trim().length === OTP_LEN &&
    form.password.length >= PWD_MIN &&
    form.confirmPassword === form.password &&
    !submitting;

  const handleSendOtp = async () => {
    if (!canSendOtp) return;
    try {
      setSendingOtp(true);
      setServerError(null);
      await AuthService.sendOtp(form.email);
      alert("OTP đã được gửi đến email của bạn!");
      setResendLeft(RESEND_SECONDS);
    } catch (err: unknown) {
      if (err instanceof Error) setServerError(err.message);
      else setServerError("Đã xảy ra lỗi không xác định.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      setSubmitting(true);
      setServerError(null);

      await AuthService.register({
        userName: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        otp: form.otp,
        password: form.password,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col items-center py-6">
          <img src="/images/logo2.png" alt="Logo" className="w-16 h-16 mb-2" />
          <h1 className="text-2xl font-extrabold text-green-700">Tạo tài khoản</h1>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
          <Input label="Username" value={form.username} onChange={(e) => handleChange("username", e.target.value)} icon={<FaUser />} error={errors.username} />
          <Input label="First Name" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} icon={<FaUser />} />
          <Input label="Last Name" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} icon={<FaUser />} />
          <Input label="Số điện thoại" value={form.phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} icon={<FaPhone />} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} icon={<FaEnvelope />} error={errors.email} />

          {/* Gửi OTP */}
          <button type="button" onClick={handleSendOtp} disabled={!canSendOtp} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold">
            {sendingOtp ? "Đang gửi..." : "Gửi OTP"}
          </button>

          {/* OTP + Gửi lại */}
          <div className="flex gap-2">
            <input
              type="tel"
              maxLength={OTP_LEN}
              value={form.otp}
              onChange={(e) => handleChange("otp", e.target.value.replace(/\D/g, "").slice(0, OTP_LEN))}
              className="flex-1 border rounded-md px-3 py-2 outline-none"
              placeholder="Nhập OTP"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={resendLeft > 0 || !EMAIL_REGEX.test(form.email)}
              className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold"
            >
              {resendLeft > 0 ? `Gửi lại (${resendLeft}s)` : "Gửi lại"}
            </button>
          </div>
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

          <Input label="Password" type="password" value={form.password} onChange={(e) => handleChange("password", e.target.value)} icon={<FaLock />} error={errors.password} />
          <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} icon={<FaLock />} error={errors.confirmPassword} />

          {serverError && <div className="text-red-600 text-sm">{serverError}</div>}

          <button type="submit" disabled={!canSubmit} className="w-full py-3 bg-green-600 text-white rounded-md font-bold">
            {submitting ? "Đang xử lý..." : "Đăng ký"}
          </button>

          <Link to="/DangNhap" className="block text-center mt-3 text-sm text-gray-600 hover:underline">
            Đã có tài khoản? Đăng nhập
          </Link>
        </form>
      </div>
    </div>
  );
}
