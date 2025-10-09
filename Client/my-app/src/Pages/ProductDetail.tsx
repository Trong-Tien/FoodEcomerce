import React, { useEffect, useState, useRef } from "react";
import Header from "@/Component/Home/Header";
import CategorySidebar from "@/Component/Home/CategorySidebar";
import { productService } from "@/Services/ProductService";
import type { Product } from "@/Type/Product";
import ProductGroup from "@/Component/Home/ProductGroup";
import { useNavigate } from "@tanstack/react-router";
import Footer from "@/Component/Home/Footer";
import { useCart } from "@/Context/CartContext";
import toast from "react-hot-toast";
import ReviewSection from "@/Component/Home/ReviewSection";
import { useAuth } from "@/Hooks/useAuth"; // thêm import ở đầu file


// 👇 import Route từ file route
import { Route as ProductRoute } from "@/routes/product.$id";

const { isLoggedIn } = useAuth(); // thêm dòng này bên trên useCart()

const DetailProduct: React.FC = () => {
  const { id } = ProductRoute.useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [upsell, setUpsell] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"info" | "desc">("info");
  const leftRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { add } = useCart();

  useEffect(() => {
    if (!id) return;

    // ✅ Không ép kiểu sang Number nữa
    productService.getById(id).then((res) => setProduct(res ?? null));

    productService.getAll().then((all) => {
      const filtered = all.filter((p) => p.id !== id);
      setRelated(filtered.slice(0, 5));
      setUpsell(filtered.slice(0, 3));
    });
  }, [id]);


  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="pt-[122px] max-w-7xl mx-auto px-3 relative">
        <button
          onClick={() => navigate({ to: ".." })}
          className="mb-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          ← Quay lại
        </button>

        {/* Sidebar nổi khi hover */}
        <div className="relative">
          {showSidebar && (
            <div
              onMouseEnter={() => setShowSidebar(true)}
              onMouseLeave={() => setShowSidebar(false)}
              className="absolute top-full left-0 w-64 bg-white shadow-lg border border-gray-200 z-50"
            >
              <CategorySidebar />
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6 mt-4">
          {/* Khung trái: hình ảnh + mô tả */}
          <div className="col-span-12 lg:col-span-8" ref={leftRef}>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="w-full h-[420px] flex items-center justify-center shadow-md bg-gray-50 rounded-xl overflow-hidden">
                <img
                  src={
                    typeof product.images === "string" && product.images.length > 0
                      ? product.images.split(",")[0] // ✅ lấy ảnh đầu tiên
                      : "/assets/img/no-image.png"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover rounded-xl"
                />

              </div>

              {/* Tabs */}
              <div className="mt-4 flex border-b">
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "info"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab("info")}
                >
                  Thông tin sản phẩm
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "desc"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab("desc")}
                >
                  Mô tả chi tiết
                </button>
              </div>

              {/* Nội dung tab */}
              <div className="mt-4 text-gray-700 leading-relaxed text-sm">
                {activeTab === "info" ? (
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Tên sản phẩm: {product.name}</li>
                    <li>Giá gốc: {product.unitPrice.toLocaleString("vi-VN")}₫</li>
                    <li>Giảm giá: {product.discount}%</li>
                    <li>
                      Giá hiện tại:{" "}
                      {(product.unitPrice * (1 - product.discount / 100)).toLocaleString(
                        "vi-VN"
                      )}
                      ₫
                    </li>
                  </ul>
                ) : (
                  <p>
                    {product.description ||
                      "Sản phẩm chất lượng cao, được nhập từ nguồn đáng tin cậy. Thích hợp cho mọi gia đình!"}
                  </p>
                )}
              </div>
            </div>

            {/* Sản phẩm liên quan */}
            {related.length > 0 && (
              <div className="mt-6">
                <ProductGroup
                  title="Sản phẩm liên quan"
                  products={related}
                  showMore={false}
                  titleStyle="minimal"
                  titleAlign="left"
                />
              </div>
            )}
          </div>

          {/* Khung phải: mua hàng */}
          <div className="col-span-12 lg:col-span-4">
            <div className="p-6 rounded-2xl shadow-md bg-white flex flex-col">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <div className="text-red-600 text-2xl font-bold mt-2">
                {(product.unitPrice * (1 - product.discount / 100)).toLocaleString(
                  "vi-VN"
                )}
                ₫
                {product.discount > 0 && (
                  <span className="line-through text-gray-400 text-sm ml-2">
                    {product.unitPrice.toLocaleString("vi-VN")}₫
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isLoggedIn) {
                    toast.error("Vui lòng đăng nhập để mua hàng!");
                    return; // ❗ chỉ hiển thị thông báo, không chuyển trang
                  }

                  add(product);
                  toast.success("🎉 Đã thêm vào giỏ hàng!");
                }}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
              >
                🛒 MUA NGAY
              </button>



              {/* Upsell */}
              {upsell.length > 0 && (
                <div className="mt-5">
                  <h4 className="font-semibold mb-2 text-sm text-gray-700">
                    Sản phẩm đi kèm
                  </h4>
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {upsell.map((p) => (
                      <div
                        key={p.id}
                        className="w-28 flex-shrink-0 bg-gray-50 p-2 rounded-lg shadow hover:shadow-md cursor-pointer"
                        onClick={() =>
                          navigate({ to: "/product/$id", params: { id: String(p.id) } })
                        }
                      >
                        <img
                          src={
                            p.images?.includes(",")
                              ? p.images.split(",")[0]
                              : p.images
                          }
                          alt={p.name}
                          className="h-16 w-full object-cover rounded"
                        />
                        <p className="text-xs mt-1 text-gray-600 line-clamp-2">
                          {p.name}
                        </p>
                        <p className="text-xs text-red-600 font-semibold">
                          {(p.unitPrice * (1 - p.discount / 100)).toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg shadow-sm">
                Nếu tồn kho thay đổi, chúng tôi sẽ liên hệ trước khi giao hàng.
              </div>
            </div>
          </div>
        </div>

        {/* Đánh giá sản phẩm */}
        <div className="mt-6">
          <ReviewSection productId={Number(id)} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DetailProduct;
