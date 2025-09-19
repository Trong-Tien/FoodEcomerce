import { useState } from "react";
import { useCart } from "@/Context/CartContext";
import type { Product } from "@/Types/product";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";
import SuggestProductCard from "./SuggestProductCard";


interface Props {
  product: Product;
  onClose: () => void;
  suggestedProducts?: Product[];
}

export default function ProductModal({
  product,
  onClose,
  suggestedProducts = [],
}: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const handleDone = () => {
    add(product, qty);
    toast.success("✅ Đã thêm vào giỏ hàng!");
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-5 w-[600px] relative max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Thông tin sản phẩm chính */}
        <div className="flex flex-col items-center text-center border-b pb-4">
          <img
            src={product.img}
            alt={product.name}
            className="w-28 h-28 object-cover rounded"
          />
          <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
          <p className="text-red-600 font-bold text-xl">
            {product.price.toLocaleString("vi-VN")}₫
          </p>
          <div className="flex items-center gap-6 mt-3">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-lg"
            >
              -
            </button>
            <span className="text-lg">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Sản phẩm gợi ý */}
        {suggestedProducts.length > 0 && (
          <div className="mt-5">
            <h3 className="font-semibold mb-3 text-left">
              Nguyên liệu cần thiết để nấu
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {suggestedProducts.map((sp) => (
                <SuggestProductCard key={sp.id} product={sp} />
              ))}
            </div>
          </div>
        )}

        {/* Nút hoàn tất */}
        <button
          onClick={handleDone}
          className="mt-6 w-full h-[40px] bg-[#F0FFF3] text-[#007E42] text-[14px] font-bold uppercase rounded-md hover:bg-[#E0FFE8] transition"
        >
          Hoàn tất
        </button>
      </div>
    </div>,
    document.body
  );
}
