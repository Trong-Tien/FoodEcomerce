interface OrderNoteProps {
  note: string
  setNote: (value: string) => void
}

export default function OrderNote({ note, setNote }: OrderNoteProps) {
  return (
    <div className="mx-4 mb-6">
      <textarea
        id="order-note"
        rows={3}
        value={note}
        onChange={(e) => e.target.value.length <= 300 && setNote(e.target.value)}
        placeholder="Gi chú giao cho đơn hàng"
        className={`w-full border-2 p-3 text-sm transition-all duration-200 resize-none 
          ${note.length > 250
            ? "border-amber-300 focus:ring-2 focus:ring-amber-200"
            : "border-slate-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
          } focus:outline-none bg-white`}
      />
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-slate-500">Gợi ý: Cho biết giờ giao, yêu cầu đặc biệt...</p>
        <span
          className={`text-xs font-semibold ${
            note.length > 250 ? "text-amber-600" : note.length > 0 ? "text-emerald-600" : "text-slate-400"
          }`}
        >
          {note.length}/300
        </span>
      </div>
    </div>
  )
}
