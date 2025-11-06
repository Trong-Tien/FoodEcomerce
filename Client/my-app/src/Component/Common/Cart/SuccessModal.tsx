"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "@tanstack/react-router"

interface SuccessModalProps {
  finalTotal: number
  itemCount: number
}

export default function SuccessModal({ finalTotal, itemCount }: SuccessModalProps) {
  const [displayTotal, setDisplayTotal] = useState(0)
  const [progress, setProgress] = useState(100)
  const navigate = useNavigate()

  useEffect(() => {
    let counter = 0
    const interval = setInterval(() => {
      counter += finalTotal / 30
      if (counter >= finalTotal) {
        setDisplayTotal(finalTotal)
        clearInterval(interval)
      } else {
        setDisplayTotal(Math.floor(counter))
      }
    }, 30)

    return () => clearInterval(interval)
  }, [finalTotal])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          navigate({ to: "/" })
          return 0
        }
        return prev - 3.33
      })
    }, 100)

    return () => clearInterval(interval)
  }, [navigate])

  useEffect(() => {
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
      })
    })
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <style>{`
        @keyframes checkmark-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes checkmark-rotate {
          0% { transform: rotate(-45deg) scale(0); }
          50% { transform: rotate(0deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes text-fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-up {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-50px); }
        }
        .animate-checkmark-bounce {
          animation: checkmark-bounce 2s ease-in-out;
        }
        .animate-checkmark-rotate {
          animation: checkmark-rotate 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
        .animate-text-fade-in {
          animation: text-fade-in 0.6s ease-out forwards;
        }
        .animate-float-up {
          animation: float-up 2s ease-out forwards;
        }
      `}</style>

      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full mx-4 transform transition-all animate-text-fade-in">
        {/* Checkmark Circle */}
        <div className="relative mb-6 inline-block">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse-ring"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white animate-checkmark-rotate"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-3xl font-bold text-slate-900 mb-2"
          style={{ animation: "text-fade-in 0.6s ease-out 0.2s both" }}
        >
          Đặt hàng thành công!
        </h2>

        {/* Subtitle */}
        <p className="text-slate-600 mb-4" style={{ animation: "text-fade-in 0.6s ease-out 0.3s both" }}>
          Cảm ơn bạn đã mua sắm tại Bách Hóa Xanh 💚
        </p>

        {/* Order Total with Counter */}
        <div
          className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200"
          style={{ animation: "text-fade-in 0.6s ease-out 0.4s both" }}
        >
          <p className="text-sm text-slate-600 mb-1">Tổng đơn hàng</p>
          <p className="text-3xl font-bold text-emerald-600 font-mono">{displayTotal.toLocaleString("vi-VN")}₫</p>
          <p className="text-xs text-slate-500 mt-2">{itemCount} sản phẩm</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6" style={{ animation: "text-fade-in 0.6s ease-out 0.5s both" }}>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500">Chuyển hướng về trang chủ trong giây lát...</p>
        </div>

        {/* Floating Emojis */}
        <div className="flex justify-center gap-6 mb-6">
          {["🎉", "🎊", "🛍️"].map((emoji, idx) => (
            <span key={idx} className="text-2xl animate-float-up" style={{ animationDelay: `${idx * 0.2}s` }}>
              {emoji}
            </span>
          ))}
        </div>

        {/* Info */}
        <div className="text-xs text-slate-500 space-y-1" style={{ animation: "text-fade-in 0.6s ease-out 0.6s both" }}>
          <p>Bạn sẽ nhận được email xác nhận đơn hàng</p>
          <p>Theo dõi trạng thái đơn hàng tại "Đơn của tôi"</p>
        </div>
      </div>
    </div>
  )
}
