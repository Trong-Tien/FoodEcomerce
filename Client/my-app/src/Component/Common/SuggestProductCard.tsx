import { useCart } from "@/Context/CartContext";
import type { Product } from "@/Type/Product";

export default function SuggestProductCard({ product }: { product: Product }) {
  const { items, add, update, remove } = useCart();
  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity || 0;

  // ✅ Tính giá sau khi giảm
  const finalPrice = product.discount
    ? Math.round(product.unitPrice * (1 - product.discount / 100))
    : product.unitPrice;

  // ✅ Ảnh sản phẩm đầu tiên (nếu có)
  const imageUrl =
    product.images && product.images.length > 0
      ? `https://localhost:7004/${product.images[0]}`
      : "/assets/img/no-image.png";

  return (
    <div className="min-w-[140px] border rounded-md p-2 flex-shrink-0 text-center bg-white hover:shadow-md transition">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-20 object-cover rounded"
      />

      <p className="text-xs mt-1 line-clamp-2">{product.name}</p>

      <p className="text-green-700 text-sm font-bold">
        {finalPrice.toLocaleString("vi-VN")}₫
      </p>

      {product.discount > 0 && (
        <p className="text-gray-400 text-xs line-through">
          {product.unitPrice.toLocaleString("vi-VN")}₫
        </p>
      )}

      {qty > 0 ? (
        <div className="flex items-center justify-center gap-2 mt-1">
          <button
            onClick={() =>
              qty > 1 ? update(product.id, qty - 1) : remove(product.id)
            }
            className="px-2 bg-gray-200 rounded"
          >
            -
          </button>
          <span>{qty}</span>
          <button
            onClick={() => update(product.id, qty + 1)}
            className="px-2 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => add(product, 1)}
          className="mt-1 w-full text-xs py-1 rounded bg-[#F0FFF3] text-[#007E42] hover:bg-[#E0FFE8]"
        >
          Mua ngay
        </button>
      )}
    </div>
  );
}
