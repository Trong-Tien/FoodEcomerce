"use client"

import { useState } from "react"
import { geminiService } from "@/Services/aiService"
import { Send, Sparkles } from "lucide-react"
import type { Product } from "@/Type/Product"

export type ChatMessage = {
  sender: "user" | "ai"
  text: string
}

type GeminiChatProps = {
  chatHistory: ChatMessage[]
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>
}

export default function GeminiChat({ chatHistory, setChatHistory }: GeminiChatProps) {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [productSuggest , setProductSuggest] = useState<Product[]>([])

  
  const suggestedProducts = [
    { id: 1, name: "Bánh mì đặc ruột", price: 25000, description: "Bánh mì thơm ngon truyền thống", icon: "🥖" },
    { id: 2, name: "Trà sữa trân châu", price: 40000, description: "Trà sữa tươi mát với trân châu", icon: "🧋" },
    { id: 3, name: "Cà phê sữa đá", price: 30000, description: "Cà phê đậm đà kiểu Việt", icon: "☕" },
  ]

  async function handleAsk() {
    if (!prompt.trim()) return

    setChatHistory(prev => [...prev, { sender: "user", text: prompt }])
    setLoading(true)

    try {
      const res = await geminiService.ask(prompt)
      setChatHistory(prev => [...prev, { sender: "ai", text: res?.recipeResponse?.recipe }])
      setProductSuggest(res.product)
      setPrompt("")
    } catch (err: any) {
      setChatHistory(prev => [...prev, { sender: "ai", text: `Lỗi: ${err.message}` }])
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

      {/* Chat messages */}
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
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
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
      </div>

      {/* Input và nút gửi */}
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
          {productSuggest.length > 0 &&  productSuggest.map(product => (
            <div
              key={product.id}
              className="p-3 border-2 border-slate-200 rounded-xl hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl"></span>
                <div>
                  <p className="font-semibold text-slate-900">{product.name}</p>
                  {/* <p className="text-sm text-slate-600">{product.description}</p> */}
                </div>
              </div>
              <span className="text-emerald-600 font-bold">{product.unitPrice.toLocaleString()}₫</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
