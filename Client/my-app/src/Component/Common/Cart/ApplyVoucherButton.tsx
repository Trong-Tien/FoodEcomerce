import { Tag } from "lucide-react"

function ApplyVoucherButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="block mb-2 w-[calc(100%-2rem)] mx-auto p-4 flex items-center justify-between 
           bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 
          hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3">
        <Tag className="w-5 h-5 text-emerald-600" />
        <span className="text-sm font-semibold text-slate-800">Chọn mã giảm giá</span>
      </div>
      <span className="text-emerald-600 font-bold">→</span>
    </button>
  )
} export default ApplyVoucherButton
