// src/Pages/DetailProduct.tsx
import React, { useEffect, useState, useRef } from "react";
import Header from "@/Component/Home/Header";
import CategorySidebar from "@/Component/Home/CategorySidebar";
import productService from "@/Services/ProductService";
import type { Product } from "@/Types/product";
import ProductGroup from "@/Component/Home/ProductGroup";
import { useNavigate } from "@tanstack/react-router";
import Footer from "@/Component/Home/Footer";
import ReviewSection from "@/Component/Home/ReviewSection";

// 👇 import Route từ file route
import { Route as ProductRoute } from "@/routes/product.$id";

const DetailProduct: React.FC = () => {
  // ✅ Lấy params trực tiếp, không cần opts
  const { id } = ProductRoute.useParams();

  const [showSidebar, setShowSidebar] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [upsell, setUpsell] = useState<Product[]>([]);
  const leftRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const numericId = Number(id);

    productService.getById(numericId).then((res) => setProduct(res ?? null));

    productService.getProducts().then((all) => {
      const filtered = all.filter((p) => p.id !== numericId);
      setRelated(filtered.slice(0, 5));
      setUpsell(filtered.slice(0, 3));
    });
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="pt-[122px] max-w-7xl mx-auto px-0 relative">
        <button
          onClick={() => navigate({ to: ".." })}
          className="mb-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          ← Quay lại
        </button>

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

        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12 lg:col-span-8" ref={leftRef}>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="w-full h-[400px] flex items-center justify-center shadow-md bg-gray-50 rounded-xl overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 flex space-x-4 border-b">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                  Hình ảnh sản phẩm
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Thông tin sản phẩm
                </button>
              </div>
            </div>

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

          <div className="col-span-12 lg:col-span-4 flex justify-center">
            <div className="p-6 rounded-2xl shadow-md bg-white flex flex-col w-full">
              <div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <div className="text-red-600 text-2xl font-bold mt-2">
                  {product.price.toLocaleString("vi-VN")}₫
                  {product.oldPrice && (
                    <span className="line-through text-gray-400 text-sm ml-2">
                      {product.oldPrice.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                  {product.badge && (
                    <span className="text-green-600 text-sm ml-2">
                      {product.badge}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="mt-3 w-full bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
                >
                  MUA NGAY
                </button>

                {upsell.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-sm text-gray-700">
                      Sản phẩm đi kèm
                    </h4>
                    <div className="flex space-x-3 overflow-x-auto">
                      {upsell.map((p) => (
                        <div
                          key={p.id}
                          className="w-28 flex-shrink-0 bg-gray-50 p-2 rounded-lg shadow hover:shadow-md cursor-pointer"
                          onClick={() =>
                            navigate({
                              to: "/product/$id",
                              params: { id: String(p.id) },
                            })
                          }
                        >
                          <img
                            src={p.img}
                            alt={p.name}
                            className="h-16 w-full object-cover rounded"
                          />
                          <p className="text-xs mt-1 text-gray-600 line-clamp-2">
                            {p.name}
                          </p>
                          <p className="text-xs text-red-600 font-semibold">
                            {p.price.toLocaleString("vi-VN")}₫
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 p-3 bg-green-50 text-green-700 text-sm rounded-lg shadow-sm">
                Nếu tồn kho có thay đổi, chúng tôi sẽ liên hệ trước khi giao
                hàng
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ReviewSection productId={Number(id)} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DetailProduct;
