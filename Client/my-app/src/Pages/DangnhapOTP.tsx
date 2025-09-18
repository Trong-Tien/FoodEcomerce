// src/pages/Auth/LoginOtp.tsx
import { useState } from "react";
import Input from "@/Component/Common/Input";

export default function DangnhapOtp() {
  const [identity, setIdentity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.trim()) {
      setError("Vui lòng nhập số điện thoại hoặc email");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      // 👉 gọi API gửi OTP tại đây
      // await AuthService.sendOtp(identity)
      await new Promise((r) => setTimeout(r, 1000));
      alert(`OTP đã gửi tới ${identity}`);
      // 👉 điều hướng sang trang nhập OTP, ví dụ: /otp-verify
    } catch {
      setError("Gửi OTP thất bại, thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Đăng nhập bằng OTP
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Số điện thoại hoặc Email"
            placeholder="Ví dụ: 0901234567 hoặc name@example.com"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
            autoComplete="username"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white ${
              loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Đang gửi..." : "Tiếp tục"}
          </button>
        </form>
      </div>
    </div>
  );
}
