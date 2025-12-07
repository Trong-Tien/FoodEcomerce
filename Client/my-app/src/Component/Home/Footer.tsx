"use client"

import type React from "react"
import { Mail, Phone, Leaf } from "lucide-react"

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-900">
      {/* Main content section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Organic</h2>
                <p className="text-xs text-emerald-600">Store</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Mang đến những sản phẩm hữu cơ nguyên chất, an toàn cho sức khỏe gia đình bạn.
            </p>
            
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-900">Khám phá</h3>
            <ul className="space-y-3">
              {["Sản phẩm mới", "Bán chạy nhất", "Flash sale", "Khuyến mãi"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-900">Hỗ trợ</h3>
            <ul className="space-y-3">
              {["Chính sách bảo hành", "Vận chuyển & trả hàng", "Hướng dẫn mua sắm", "Câu hỏi thường gặp"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-900">Liên hệ</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Hotline</p>
                  <p className="text-sm font-medium text-slate-900">1900-1234</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-900">support@organic.vn</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 rounded-xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2 text-slate-900">Nhận ưu đãi độc quyền</h3>
            <p className="text-sm text-slate-600 mb-6">Đăng ký nhận thông báo về sản phẩm mới và khuyến mãi đặc biệt</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
              />
              <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors duration-300">
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-200 mb-8"></div>

        {/* Bottom info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Giao hàng miễn phí", desc: "Từ 299k trở lên" },
            { label: "Hỗ trợ 24/7", desc: "Luôn sẵn sàng giúp bạn" },
            { label: "Chất lượng 100%", desc: "Hữu cơ xác nhận" },
          ].map(({ label, desc }) => (
            <div key={label} className="text-center">
              <p className="text-sm font-semibold text-emerald-600 mb-1">{label}</p>
              <p className="text-xs text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>© 2025 Organic Store. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-600 transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#" className="hover:text-emerald-600 transition-colors">
                Chính sách riêng tư
              </a>
              <a href="#" className="hover:text-emerald-600 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
