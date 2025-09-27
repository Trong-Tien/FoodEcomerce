// src/Pages/Dangky.tsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import Input from "@/Component/Common/Input";
import { useRegister, useSendOtp } from "@/Hooks/Auth";
import type { ResponseType } from "@/Type/ResponseType";
import Swal from "sweetalert2";
import type { Register } from "@/Types/RegisterForm";
import logo from "@/assets/img/logo.jpg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const USERNAME_MIN = 3;
const OTP_LEN = 6;
const PWD_MIN = 6;
const RESEND_SECONDS = 60;

interface RegisterForm {
  username: string;
  email: string;
  phoneNumber: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export default function Dangky() {
  const navigate = useNavigate();
  const sendOtp = useSendOtp();
  const register = useRegister();

  const [form, setForm] = useState<RegisterForm>({
    username: "",
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

  // countdown resend OTP
  useEffect(() => {
    if (resendLeft <= 0) return;
    const timer = setInterval(() => setResendLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [resendLeft]);

  const handleChange = (field: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setServerError(null);
  };

  // validate form
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

  const canSubmit =
    form.username.trim().length >= USERNAME_MIN &&
    form.phoneNumber.trim().length > 0 &&
    EMAIL_REGEX.test(form.email.trim()) &&
    form.otp.trim().length === OTP_LEN &&
    form.password.length >= PWD_MIN &&
    form.confirmPassword === form.password &&
    !submitting;

  // gửi OTP
  const handleSendOtp = async () => {
    try {
      setSendingOtp(true);
      setServerError(null);

      const response: ResponseType = await sendOtp.mutateAsync(form.email);

      if (response.status === 200) {
        Swal.fire("Gửi OTP thành công");
        setResendLeft(RESEND_SECONDS);
      } else {
        Swal.fire(
          "Đã có lỗi xảy ra , xin vui lòng liên hệ với bộ phận chăm sóc khách hàng"
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) setServerError(err.message);
      else setServerError("Đã xảy ra lỗi không xác định.");
    } finally {
      setSendingOtp(false);
    }
  };

  // đăng ký
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      setServerError(null);

      const payload: Register = {
        username: form.username,
        email: form.email,
        phoneNumber: form.phoneNumber,
        otp: form.otp,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };

      const response: ResponseType = await register.mutateAsync(payload);

      if (response.status === 200) {
        await Swal.fire("Đăng ký thành công");
        navigate({ to: "/DangNhap" });
      } else {
        Swal.fire("Đã có lỗi xảy ra vui lòng liên hệ với bộ phận CSKH");
      }
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
          <img src={logo} alt="Logo" className="w-16 h-16 mb-2" />
          <h1 className="text-2xl font-extrabold text-green-700">
            Tạo tài khoản
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            icon={<FaUser />}
            error={errors.username}
          />
          <Input
            label="Số điện thoại"
            value={form.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            icon={<FaPhone />}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            icon={<FaEnvelope />}
            error={errors.email}
          />

          {/* Gửi OTP */}
          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
          >
            {sendingOtp ? "Đang gửi..." : "Gửi OTP"}
          </button>

          <div className="flex gap-2">
            <input
              type="tel"
              maxLength={OTP_LEN}
              value={form.otp}
              onChange={(e) =>
                handleChange(
                  "otp",
                  e.target.value.replace(/\D/g, "").slice(0, OTP_LEN)
                )
              }
              className="flex-1 border rounded-md px-3 py-2 outline-none"
              placeholder="Nhập OTP"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={resendLeft > 0 || !EMAIL_REGEX.test(form.email)}
              className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold disabled:opacity-50"
            >
              {resendLeft > 0 ? `Gửi lại (${resendLeft}s)` : "Gửi lại"}
            </button>
          </div>
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            icon={<FaLock />}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              handleChange("confirmPassword", e.target.value)
            }
            icon={<FaLock />}
            error={errors.confirmPassword}
          />

          {serverError && (
            <div className="text-red-600 text-sm">{serverError}</div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-3 bg-green-600 text-white rounded-md font-bold disabled:opacity-50"
          >
            {submitting ? "Đang xử lý..." : "Đăng ký"}
          </button>

          <Link
            to="/DangNhap"
            className="block text-center mt-3 text-sm text-gray-600 hover:underline"
          >
            Đã có tài khoản? Đăng nhập
          </Link>
        </form>
      </div>
    </div>
  );
}
