"use client"

import { useState, useRef, useEffect } from "react"
import { geminiService } from "@/Services/aiService"
import { Send, Sparkles } from "lucide-react"

export type ChatMessage = {
  sender: "user" | "ai"
  text: string
}

type GeminiChatProps = {
  chatHistory: ChatMessage[]
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>
}

type SuggestedProduct = {
  productId: string
  productText: string
  unitPrice: string
  image?: string
}

// Hàm chuẩn hóa đường dẫn ảnh
const getImageUrl = (path?: string) => {
  if (!path) return "/images/placeholder.png" // fallback nếu null
  if (path.startsWith("http")) return path // đã là URL đầy đủ
  return `https://foodecomerceapi.runasp.net/api/File/image?path=${encodeURIComponent(path)}`
}

export default function GeminiChat({ chatHistory, setChatHistory }: GeminiChatProps) {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [productSuggest, setProductSuggest] = useState<SuggestedProduct[]>([])
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Scroll chat tự động xuống dưới khi chatHistory thay đổi
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  async function handleAsk() {
    if (!prompt.trim()) return
    setChatHistory(prev => [...prev, { sender: "user", text: prompt }])
    setLoading(true)

    try {
      const res = await geminiService.ask(prompt)

      // Lấy công thức
      const recipeText = res?.recipeResponse?.recipe ?? "(Không có công thức trả về)"
      setChatHistory(prev => [...prev, { sender: "ai", text: recipeText }])

      // Chuyển đổi product từ backend thành SuggestedProduct[]
      const suggestedProducts: SuggestedProduct[] =
        res?.product?.map(p => ({
          productId: p.productId,
          productText: p.productText,
          unitPrice: p.unitPrice,
          image: getImageUrl(p.image),
        })) ?? []

      setProductSuggest(suggestedProducts)
      setPrompt("")
    } catch (err: any) {
      setChatHistory(prev => [
        ...prev,
        { sender: "ai", text: `Lỗi: ${err?.message ?? err}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[600px] w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Sparkles className="w-8 h-8 text-emerald-600" />
        <h1 className="text-2xl font-bold text-slate-900">Food Assistant</h1>
      </div>

      {/* Chat history */}
      <div className="bg-white rounded-2xl shadow-lg p-4 flex-1 overflow-y-auto space-y-4 border border-slate-200">
        {chatHistory.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-2xl text-slate-400 mb-2">👋</p>
              <p className="text-slate-500">Bắt đầu cuộc trò chuyện của bạn</p>
            </div>
          </div>
        ) : (
          chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-5 py-4 rounded-2xl text-base leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-emerald-600 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 items-center">
        <textarea
          rows={2}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleAsk()
            }
          }}
          placeholder="Nhập câu hỏi..."
          className="flex-1 p-2 border border-slate-300 rounded-lg resize-none focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-200 text-sm"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold py-4.5 px-4 rounded-lg flex items-center justify-center gap-1 text-sm"
        >
          <Send className="w-4 h-4" />
          {loading ? "..." : "Gửi"}
        </button>
      </div>

      {/* Sản phẩm gợi ý */}
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-200 mt-4">
        <h3 className="text-xl font-bold text-slate-900 mb-3">Sản phẩm nổi bật</h3>
        <div className="flex flex-col gap-3">
          {productSuggest.length > 0 ? (
            productSuggest.map(p => {
              const priceNumber = Number(p.unitPrice)
              const priceText = Number.isFinite(priceNumber)
                ? priceNumber.toLocaleString("vi-VN")
                : p.unitPrice
              const imageUrl = getImageUrl(p.image)

              return (
                <div
                  key={p.productId}
                  className="p-3 border-2 border-slate-200 rounded-xl hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={imageUrl || "/images/placeholder.png"}
                      alt={p.productText}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                      onError={e => {
                        ;(e.currentTarget as HTMLImageElement).src =
                          "/images/placeholder.png"
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate max-w-[220px]">
                        {p.productText}
                      </p>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold whitespace-nowrap">
                    {priceText}₫
                  </span>
                </div>
              )
            })
          ) : (
            <p className="text-slate-500">Chưa có gợi ý sản phẩm.</p>
          )}
        </div>
      </div>
    </div>
  )
}
