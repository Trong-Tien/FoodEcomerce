import { useState } from "react";
import { Link } from "@tanstack/react-router";
import ProductModal from "./ProductModal";
import type { Product } from "@/Type/Product";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Hooks/useAuth"; // ✅ Thêm dòng này
import { toast } from "react-hot-toast"; // ✅ Thêm dòng này

type ProductWithSuggest = Product & { suggestedProducts?: Product[] };

function ProductCard({ p }: { p: ProductWithSuggest }) {
  const [open, setOpen] = useState(false);
  const { add } = useCart();
  const { isLoggedIn } = useAuth(); // ✅ Kiểm tra login

  // ✅ Tính giá sau khi giảm
  const finalPrice = p.discount
    ? Math.round(p.unitPrice * (1 - p.discount / 100))
    : p.unitPrice;

  // ✅ Tạo URL ảnh đúng format (không encode 2 lần)
  const imgUrl =
    typeof p.images === "string" && p.images.length > 0
      ? p.images.split(",")[0] // 🔥 Không nối thêm prefix nữa
      : "/assets/img/no-image.png";

  // ✅ Xử lý khi nhấn "Mua ngay"
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      toast.error("Vui lòng đăng nhập để mua hàng!");
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-col border border-gray-200 rounded-lg bg-white overflow-hidden min-h-[354px] shadow-sm hover:shadow-md transition">
        {/* Ảnh sản phẩm */}
        <Link
          to="/product/$id"
          params={{ id: String(p.id) }}
          className="relative w-full aspect-square block"
        >
          <img
            src={imgUrl}
            alt={p.name}
            className="w-full h-full object-cover"
          />

          {p.discount > 0 && (
            <div className="absolute top-1 left-1 bg-[#FF0101]/70 text-white text-[11px] font-semibold px-[4px] py-[1px] rounded-sm">
              -{p.discount}%
            </div>
          )}
        </Link>

        {/* Nội dung sản phẩm */}
        <div className="flex flex-col justify-between flex-1 p-3">
          <div>
            <h3 className="text-[13px] leading-[16px] font-medium text-gray-800 line-clamp-2 h-[32px]">
              {p.name}
            </h3>

            {/* Giá */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[15px] font-bold text-[#007E42]">
                {finalPrice.toLocaleString("vi-VN")}đ
              </span>

              {p.discount > 0 && (
                <span className="text-[13px] line-through text-gray-400">
                  {p.unitPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>
          </div>

          {/* ✅ Nút mua ngay */}
          <button
            onClick={handleBuyNow}
            className="mt-3 w-full h-[35px] bg-[#F0FFF3] text-[#007E42] text-[13px] font-bold uppercase rounded-md hover:bg-[#E0FFE8] transition"
          >
            Mua ngay
          </button>
        </div>
      </div>

      {/* ✅ Mở modal chỉ khi đã đăng nhập */}
      {open && (
        <ProductModal
          product={p}
          suggestedProducts={p.suggestedProducts}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default ProductCard;
