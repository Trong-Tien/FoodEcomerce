import type { PaymentMethodType } from "@/Type/PaymentmethodType"

interface PaymentMethodProps {
  methods: PaymentMethodType[]
  selected: number | null
  setSelected: (id: number) => void
}

export default function PaymentMethod({ methods, selected, setSelected }: PaymentMethodProps) {
  const getIcon = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes("card")) return "💳"
    if (n.includes("wallet") || n.includes("ví")) return "👛"
    if (n.includes("bank")) return "🏦"
    if (n.includes("mobile") || n.includes("phone")) return "📱"
    return "💰"
  }

  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-2 text-slate-900">💳 Phương thức thanh toán</h3>
      <div className="space-y-2">
        {methods.map(m => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`w-full p-4 border-2 transition-all duration-200 ${
              selected === m.id
                ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-md"
                : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{getIcon(m.name)}</div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-slate-900">{m.name}</p>
                <p className="text-sm text-slate-500">{m.description}</p>
              </div>
              {selected === m.id && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white font-bold">✓</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
          ✓ Đã chọn: <b>{methods.find(m => m.id === selected)?.name}</b>
        </div>
      )}
    </div>
  )
}
