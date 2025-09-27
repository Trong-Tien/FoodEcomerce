import { useState } from "react";
import { Link } from "@tanstack/react-router";
import ProductModal from "./ProductModal";
import type { Product } from "@/Types/product";

// 👉 Product từ service sẽ có thêm suggestedProducts
type ProductWithSuggest = Product & { suggestedProducts?: Product[] };

function ProductCard({ p }: { p: ProductWithSuggest }) {
  const [open, setOpen] = useState(false);

  const discount =
    p.oldPrice && p.oldPrice > p.price
      ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
      : null;

  return (
    <>
      <div className="flex flex-col border border-gray-200 rounded-lg bg-white overflow-hidden min-h-[354px] shadow-sm hover:shadow-md transition">
        {/* Ảnh và link chi tiết */}
        <Link
          to="/product/$id"
          params={{ id: String(p.id) }}
          className="relative w-full aspect-square block"
        >
          <img
            src={p.img}
            alt={p.name}
            className="w-full h-full object-cover"
          />
          {discount && (
            <div className="absolute top-1 left-1 bg-[#FF0101]/70 text-white text-[11px] font-semibold px-[4px] py-[1px] rounded-sm">
              -{discount}%
            </div>
          )}
          {p.badge && !discount && (
            <div className="absolute top-1 left-1 bg-[#007E42]/70 text-white text-[11px] font-semibold px-[4px] py-[1px] rounded-sm">
              {p.badge}
            </div>
          )}
        </Link>

        {/* Nội dung */}
        <div className="flex flex-col justify-between flex-1 p-3">
          <div>
            <h3 className="text-[13px] leading-[16px] font-medium text-gray-800 line-clamp-2 h-[32px]">
              {p.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[15px] font-bold text-[#007E42]">
                {p.price.toLocaleString("vi-VN")}đ
              </span>
              {p.oldPrice && (
                <span className="text-[13px] line-through text-gray-400">
                  {p.oldPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>
            {p.badge === "COMBO" && (
              <div className="text-[#FF6600] text-[11px] mt-1 font-semibold">
                COMBO tiết kiệm
              </div>
            )}
          </div>

          {/* Nút mua ngay */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-3 w-full h-[35px] bg-[#F0FFF3] text-[#007E42] text-[13px] font-bold uppercase rounded-md hover:bg-[#E0FFE8] transition"
          >
            Mua ngay
          </button>
        </div>
      </div>

      {open && (
        <ProductModal
          product={p}
          suggestedProducts={p.suggestedProducts} // 👈 lấy từ service
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default ProductCard;
