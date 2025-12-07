import { useState } from "react";
import { useCart } from "@/Context/CartContext";
import type { Product } from "@/Type/Product";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";

interface Props {
  product: Product;
  onClose: () => void;
  suggestedProducts?: Product[];
}

export default function ProductModal({
  product,
  onClose,
}: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  // ✅ Chuẩn hóa ảnh (fix hiển thị)
  const API_BASE = "https://foodecomerceapi.runasp.net/api";
  const imageSrc =
    Array.isArray(product.imageProducts) && product.imageProducts.length > 0
      ? `${API_BASE}/File/image?path=${encodeURIComponent(
          product.imageProducts[0].imageUrl
        )}`
      : typeof product.images === "string" && product.images.length > 0
      ? product.images.split(",")[0]
      : "/assets/img/no-image.png";

  // ✅ Tính giá sau giảm
  const finalPrice =
    product.discount && product.discount > 0
      ? Math.round(product.unitPrice * (1 - product.discount / 100))
      : product.unitPrice;

  const handleDone = () => {
    add(product, qty);
    toast.success("🛒 Đã thêm vào giỏ hàng!");
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl w-[480px] sm:w-[560px] 
                   max-h-[90vh] overflow-y-auto relative p-6 
                   animate-scaleIn border border-gray-100"
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>

        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-xl shadow-md border border-gray-200"
            />
            {product.discount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Tên sản phẩm */}
          <h2 className="mt-4 text-lg sm:text-xl font-bold text-gray-800">
            {product.name}
          </h2>

          {/* Giá hiển thị */}
          <div className="flex items-center gap-2 mt-2">
            <p className="text-red-600 font-extrabold text-2xl">
              {(finalPrice * qty).toLocaleString("vi-VN")}₫
            </p>
            {product.discount > 0 && (
              <p className="text-gray-400 line-through text-sm">
                {(product.unitPrice * qty).toLocaleString("vi-VN")}₫
              </p>
            )}
          </div>

          {/* Số lượng chọn */}
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-9 h-9 flex items-center justify-center rounded-full 
                         bg-gray-100 text-gray-700 text-xl font-semibold hover:bg-gray-200 transition"
            >
              −
            </button>
            <span className="text-lg font-semibold">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-full 
                         bg-green-600 text-white text-xl font-semibold hover:bg-green-700 transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        {product.description && (
          <div
            className="mt-5 text-sm text-gray-700 leading-relaxed text-left border-t border-gray-100 pt-4"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        )}

        

        {/* Nút hoàn tất */}
        <button
          onClick={handleDone}
          className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r 
                     from-green-600 to-green-700 text-white font-semibold 
                     text-lg shadow hover:shadow-lg hover:opacity-95 transition"
        >
          Hoàn tất nha
        </button>
      </div>
    </div>,
    document.body
  );
}
