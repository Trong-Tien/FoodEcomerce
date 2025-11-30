"use client"

import { useState, useRef, useEffect } from "react"
import GeminiChat from "./AIChat"
import type { ChatMessage } from "./AIChat"
import { MessageCircle, X } from "lucide-react"

export default function AIChatFloating() {
  const [open, setOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]) // giữ lịch sử chat
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll khi có tin nhắn mới
  useEffect(() => {
  const chatContainer = chatEndRef.current?.parentElement
  if (!chatContainer) return

  // Kiểm tra xem người dùng đang ở gần cuối (ví dụ cách cuối <= 100px)
  const isNearBottom =
    chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 100

  if (isNearBottom) {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
}, [chatHistory])

  return (
    <>
      {/* Nút chat nhỏ góc phải */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Popup chat */}
      {open && (
        <div className="fixed bottom-16 right-6 z-50 w-96 h-[550px] bg-white border border-gray-200 shadow-2xl rounded-xl flex flex-col overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Trợ lý nấu ăn AI</h2>
            <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nội dung chat */}
          <div className="flex-1 overflow-y-auto p-2">
            <GeminiChat chatHistory={chatHistory} setChatHistory={setChatHistory} />
            <div ref={chatEndRef} />
          </div>
        </div>
      )}
    </>
  )
}
    