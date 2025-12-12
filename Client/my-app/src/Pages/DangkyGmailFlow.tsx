"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "@tanstack/react-router"
import Swal from "sweetalert2"
import { useSendOtp, useRegister } from "@/Hooks/Auth"
import { Mail, Lock, Key, CheckCircle, ArrowRight } from "lucide-react"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
const OTP_LEN = 6
const RESEND_SECONDS = 60

export default function DangkyGmailFlow() {
  const sendOtp = useSendOtp()
  const register = useRegister()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [emailExists, setEmailExists] = useState(false)
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [count, setCount] = useState(RESEND_SECONDS)

  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const API_BASE = "https://foodecomerceapi.runasp.net"

  // ---- Debounce kiểm tra email tồn tại ----
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!EMAIL_REGEX.test(email)) {
      setEmailExists(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/Auth/CheckEmail?email=${encodeURIComponent(email)}`)
        const data = await res.json()
        setEmailExists(data.exists)
      } catch (err) {
        console.error(err)
        setEmailExists(false)
      }
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [email])

  // ---- Countdown OTP ----
  useEffect(() => {
    if (step === 2 && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [count, step])

  // ---- Validate mật khẩu ----
  const validatePassword = (pwd: string) => {
    const minLength = 6
    const hasUpper = /[A-Z]/.test(pwd)
    const hasLower = /[a-z]/.test(pwd)
    const hasNumber = /\d/.test(pwd)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    return pwd.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial
  }

  // ---- Gửi OTP ----
  const handleSendOtp = async () => {
    if (!EMAIL_REGEX.test(email)) return Swal.fire("Email không hợp lệ!")
    if (emailExists) return Swal.fire("Email này đã được đăng ký!")

    try {
      const res = await sendOtp.mutateAsync(email)
      if (res.status === 200 || res.success) {
        Swal.fire("Đã gửi OTP tới Gmail của bạn!")
        setStep(2)
        setCount(RESEND_SECONDS)
      } else Swal.fire(res.message || "Gửi OTP thất bại")
    } catch {
      Swal.fire("Không thể gửi OTP, thử lại sau.")
    }
  }

  const handleNextOtp = () => {
    if (otp.trim().length !== OTP_LEN) return Swal.fire("OTP phải có 6 số!")
    setStep(3)
  }

  const handleRegister = async () => {
    if (!validatePassword(password)) {
      return Swal.fire(
        "Mật khẩu chưa hợp lệ!",
        "Mật khẩu phải ≥6 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt"
      )
    }

    if (password !== confirm) return Swal.fire("Mật khẩu và xác nhận mật khẩu không khớp!")

    try {
      const payload = { email, otp, password }
      const res = await register.mutateAsync(payload)
      if (res.status === 200 || res.success) {
        Swal.fire("Đăng ký thành công!")
        setStep(4)
      } else Swal.fire(res.message || "Lỗi khi đăng ký.")
    } catch {
      Swal.fire("Không thể đăng ký, thử lại sau.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>

      <div className="w-full max-w-md relative z-10">
        {step === 1 && (
          <StepEmail
            email={email}
            setEmail={setEmail}
            emailExists={emailExists}
            handleSendOtp={handleSendOtp}
          />
        )}

        {step === 2 && (
          <StepOtp
            email={email}
            otp={otp}
            setOtp={setOtp}
            count={count}
            handleNextOtp={handleNextOtp}
          />
        )}

        {step === 3 && (
          <StepPassword
            password={password}
            setPassword={setPassword}
            confirm={confirm}
            setConfirm={setConfirm}
            validatePassword={validatePassword}
            handleRegister={handleRegister}
          />
        )}

        {step === 4 && <SuccessRedirect email={email} navigate={navigate} />}
      </div>
    </div>
  )
}

// ---------------- Components nhỏ ----------------

function StepEmail({
  email,
  setEmail,
  emailExists,
  handleSendOtp,
}: {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  emailExists: boolean
  handleSendOtp: () => void
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          FreshMart
        </h1>
        <h2 className="text-2xl font-light text-white">Đăng ký tài khoản</h2>
        <p className="text-slate-400 text-sm font-light">Trải nghiệm mua sắm thực phẩm tươi ngon</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-4 w-5 h-5 text-emerald-400/60 group-focus-within:text-emerald-400 transition" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-700/50 focus:ring-1 focus:ring-emerald-400/30 transition duration-300"
            />
          </div>
          {emailExists && <p className="text-red-400 text-xs mt-1">Email này đã được đăng ký</p>}
        </div>

        <button
          onClick={handleSendOtp}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-900 font-semibold py-3.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 group"
        >
          Tiếp theo
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  )
}

function StepOtp({
  email,
  otp,
  setOtp,
  count,
  handleNextOtp,
}: {
  email: string
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
  count: number
  handleNextOtp: () => void
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <Key className="w-8 h-8 text-slate-900 font-bold" />
        </div>
        <h2 className="text-2xl font-light text-white">Xác minh Email</h2>
        <p className="text-slate-400 text-sm">
          Nhập mã OTP được gửi tới <br />
          <span className="text-emerald-400 font-semibold">{email}</span>
        </p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">Mã OTP</label>
          <div className="relative group">
            <Key className="absolute left-4 top-4 w-5 h-5 text-emerald-400/60 group-focus-within:text-emerald-400 transition" />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LEN))}
              placeholder="000000"
              maxLength={6}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-700/30 border border-slate-600/50 rounded-xl text-center text-2xl font-bold tracking-widest text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-700/50 focus:ring-1 focus:ring-emerald-400/30 transition duration-300"
            />
          </div>
        </div>

        <button
          onClick={handleNextOtp}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-900 font-semibold py-3.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
        >
          Xác minh
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-sm text-slate-400">
          Chưa nhận được?{" "}
          <span className="text-emerald-400 font-semibold cursor-pointer hover:text-emerald-300 transition">
            Gửi lại
          </span>{" "}
          sau <span className="text-emerald-400 font-bold">{count}s</span>
        </p>
      </div>
    </div>
  )
}

function StepPassword({
  password,
  setPassword,
  confirm,
  setConfirm,
  validatePassword,
  handleRegister,
}: {
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  confirm: string
  setConfirm: React.Dispatch<React.SetStateAction<string>>
  validatePassword: (pwd: string) => boolean
  handleRegister: () => void
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <Lock className="w-8 h-8 text-slate-900 font-bold" />
        </div>
        <h2 className="text-2xl font-light text-white">Thiết lập mật khẩu</h2>
        <p className="text-slate-400 text-sm">Tạo mật khẩu mạnh để bảo vệ tài khoản</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">Mật khẩu</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-4 w-5 h-5 text-emerald-400/60 group-focus-within:text-emerald-400 transition" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-700/50 focus:ring-1 focus:ring-emerald-400/30 transition duration-300"
            />
          </div>
          <p className={`text-xs mt-1 ${validatePassword(password) ? "text-emerald-400" : "text-red-400"}`}>
            Mật khẩu phải ≥8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">Xác nhận mật khẩu</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-4 w-5 h-5 text-emerald-400/60 group-focus-within:text-emerald-400 transition" />
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-700/30 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-slate-700/50 focus:ring-1 focus:ring-emerald-400/30 transition duration-300"
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-900 font-semibold py-3.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 group mt-2"
        >
          Hoàn thành đăng ký
          <CheckCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function SuccessRedirect({ email, navigate }: { email: string; navigate: any }) {
  const [seconds, setSeconds] = useState(3)

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      navigate({ to: "/Dangnhap" })
    }
  }, [seconds])

  return (
    <div className="text-center space-y-6 animate-in fade-in duration-500 py-12">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-slate-900" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-light text-white">Đăng ký thành công!</h2>
        <p className="text-slate-400">
          Tài khoản <span className="text-emerald-400 font-semibold">{email}</span> đã được tạo
        </p>
      </div>
      <p className="text-sm text-slate-500">
        Quay lại trong <span className="text-emerald-400 font-bold">{seconds}</span> giây...
      </p>
    </div>
  )
}
