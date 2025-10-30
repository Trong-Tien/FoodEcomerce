import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router"; // ✅ thêm navigate
import Swal from "sweetalert2";
import { useSendOtp, useRegister } from "@/Hooks/Auth";
import { FaEnvelope, FaLock, FaKey, FaUser, FaPhone } from "react-icons/fa";
import Input from "@/Component/Common/Input";
import bannerFood from "@/assets/img/food-sale-banner.jpg"; // ảnh nền khuyến mãi

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const OTP_LEN = 6;
const RESEND_SECONDS = 60;

export default function DangkyGmailFlow() {
  const sendOtp = useSendOtp();
  const register = useRegister();
  const navigate = useNavigate(); // ✅ hook điều hướng

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [count, setCount] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (count > 0 && step === 2) {
      const timer = setInterval(() => setCount((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [count, step]);

  const handleSendOtp = async () => {
    if (!EMAIL_REGEX.test(email)) return Swal.fire("Email không hợp lệ!");
    try {
      const res = await sendOtp.mutateAsync(email);
      if (res.status === 200) {
        Swal.fire("Đã gửi OTP tới Gmail của bạn!");
        setStep(2);
        setCount(RESEND_SECONDS);
      } else Swal.fire("Gửi OTP thất bại");
    } catch {
      Swal.fire("Không thể gửi OTP, thử lại sau.");
    }
  };

  const handleNextOtp = () => {
    if (otp.trim().length !== OTP_LEN) return Swal.fire("OTP phải có 6 số!");
    setStep(3);
  };

  const handleRegister = async () => {
    if (!userName || !phone || !password || password !== confirm)
      return Swal.fire("Vui lòng nhập đầy đủ thông tin và mật khẩu hợp lệ!");

    try {
      const payload = {
        userName,
        email,
        phoneNumber: phone,
        otp,
        password,
        confirmPassword: confirm,
      };
      const res = await register.mutateAsync(payload);
      if (res.status === 200) setStep(4);
      else Swal.fire(res.message || "Lỗi khi đăng ký.");
    } catch {
      Swal.fire("Không thể đăng ký, thử lại sau.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* =============== Bên trái: Banner =============== */}
      <div
        className="hidden md:flex w-2/3 bg-cover bg-center items-center justify-center"
        style={{ backgroundImage: `url(${bannerFood})` }}
      ></div>

      {/* =============== Bên phải: Form =============== */}
      <div className="flex w-full md:w-1/3 items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow-md p-8">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
                Đăng ký bằng Gmail
              </h2>
              <Input
                label="Email"
                icon={<FaEnvelope />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập Gmail của bạn"
              />
              <button
                onClick={handleSendOtp}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
              >
                Tiếp theo
              </button>

              <div className="my-4 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-3 text-gray-400 text-sm">HOẶC</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="flex justify-between">
                <button className="w-[48%] flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-50">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                    className="w-5 mr-2"
                  />
                  Facebook
                </button>
                <button className="w-[48%] flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-50">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                    className="w-5 mr-2"
                  />
                  Google
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Bằng việc đăng ký, bạn đồng ý với{" "}
                <span className="text-green-600 cursor-pointer hover:underline">
                  Điều khoản dịch vụ & Chính sách bảo mật
                </span>
              </p>

              <p className="text-center text-sm mt-4">
                Đã có tài khoản?{" "}
                <span
                  className="text-green-700 font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate({ to: "/Dangnhap" })}
                >
                  Đăng nhập
                </span>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold text-center mb-4 text-green-700">
                Xác minh Gmail
              </h2>
              <p className="text-center text-gray-500 mb-4">
                Mã xác minh đã gửi tới <b>{email}</b>
              </p>
              <Input
                label="Mã OTP"
                icon={<FaKey />}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LEN))
                }
                placeholder="Nhập 6 số OTP"
              />
              <button
                onClick={handleNextOtp}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
              >
                Kế tiếp
              </button>
              <p className="text-sm text-center text-gray-500 mt-3">
                Gửi lại OTP sau {count}s
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold text-center mb-4 text-green-700">
                Thiết lập mật khẩu
              </h2>
              <Input
                label="Tên người dùng"
                icon={<FaUser />}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                label="Số điện thoại"
                icon={<FaPhone />}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                label="Mật khẩu"
                icon={<FaLock />}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label="Xác nhận mật khẩu"
                icon={<FaLock />}
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                onClick={handleRegister}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
              >
                Đăng ký
              </button>
            </>
          )}

          {step === 4 && <SuccessRedirect email={email} navigate={navigate} />}
        </div>
      </div>
    </div>
  );
}

/* ✅ Component riêng để hiển thị thông báo + đếm ngược */
function SuccessRedirect({
  email,
  navigate,
}: {
  email: string;
  navigate: any;
}) {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate({ to: "/Dangnhap" }); // ✅ tự động chuyển về trang đăng nhập
    }
  }, [seconds]);

  return (
    <div className="text-center py-10">
      <div className="text-green-600 text-5xl mb-3">✓</div>
      <h2 className="text-2xl font-bold mb-2 text-green-700">
        Đăng ký thành công!
      </h2>
      <p>Bạn đã tạo tài khoản với Gmail {email}</p>
      <p className="text-sm text-gray-500 mt-2">
        Tự động quay lại sau <b>{seconds}</b> giây...
      </p>
    </div>
  );
}
