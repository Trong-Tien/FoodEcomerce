import { useState } from "react";
import { Flame } from "lucide-react";
import ProductCard from "../Common/ProductCard";
import type { Product } from "../../Types/product";

interface ProductGroupProps {
  title: string;
  products: Product[];
  loading?: boolean;
  badge?: string;
  bgColor?: string;
  maxItems?: number;
  topBanners?: string[];
  bottomBanners?: string[];
  titleStyle?: "minimal" | "ecommerce";
  titleAlign?: "left" | "center";
  titleVariant?: "default" | "boxed";
  showTitle?: boolean;
  showMore?: boolean; // 🆕 thêm prop này
}

const ProductGroup: React.FC<ProductGroupProps> = ({
  title,
  products,
  loading,
  badge,
  bgColor = "bg-white",
  maxItems = 10,
  topBanners = [],
  bottomBanners = [],
  titleStyle = "minimal",
  titleAlign = "left",
  titleVariant = "default",
  showTitle = true,
  showMore = true,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [topBannerIndex, setTopBannerIndex] = useState(0);
  const [bottomBannerIndex, setBottomBannerIndex] = useState(0);

  // Xử lý chuyển sản phẩm
  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - maxItems));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + maxItems;
      const maxStartIndex = Math.max(0, products.length - maxItems);
      return newIndex > maxStartIndex ? maxStartIndex : newIndex;
    });
  };

  // ✅ chỉ lấy đúng maxItems sản phẩm (fix lỗi thêm hàng)
  const visibleProducts = products.slice(startIndex, startIndex + maxItems);

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < Math.max(0, products.length - maxItems);

  // Banner handler
  const prevTop = () =>
    setTopBannerIndex(
      (topBannerIndex - 1 + topBanners.length) % topBanners.length
    );
  const nextTop = () =>
    setTopBannerIndex((topBannerIndex + 1) % topBanners.length);

  const prevBottom = () =>
    setBottomBannerIndex(
      (bottomBannerIndex - 1 + bottomBanners.length) % bottomBanners.length
    );
  const nextBottom = () =>
    setBottomBannerIndex((bottomBannerIndex + 1) % bottomBanners.length);

  // Render tiêu đề
  const renderTitle = () => {
    const titleElement = (
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
    );

    if (titleVariant === "boxed") {
      return (
        <div className="relative mb-8">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-yellow-200 to-pink-200 px-4 py-1 shadow-md rounded-b-xl">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {title}
              </h2>
            </div>
          </div>
        </div>
      );
    }

    if (titleStyle === "minimal") {
      return (
        <div
          className={`flex items-center gap-3 mb-6 group relative ${
            titleAlign === "center" ? "justify-center" : ""
          }`}
        >
          <div className="w-2 h-6 bg-green-500 rounded-md"></div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-gray-800 relative">
            {title}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-500 transition-all duration-500 group-hover:w-full origin-left"></span>
          </h2>
          {badge && (
            <span className="bg-red-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow">
              {badge}
            </span>
          )}
        </div>
      );
    }

    // ecommerce style
    return (
      <div
        className={`flex items-center justify-between mb-6 ${
          titleAlign === "center" ? "justify-center" : ""
        }`}
      >
        <div className="flex items-center gap-2 group">
          <Flame className="text-red-500 w-5 h-5 group-hover:animate-pulse" />
          {titleElement}
          {badge && (
            <span className="bg-red-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow">
              {badge}
            </span>
          )}
        </div>
        
      </div>
    );
  };

  // Render banner
  const renderBanner = (
    banners: string[],
    index: number,
    onPrev: () => void,
    onNext: () => void
  ) => {
    if (banners.length === 0) return null;

    return (
      <div className="-mx-1 sm:-mx-2 lg:-mx-3 relative">
        <img
          src={banners[index]}
          alt={`${title} banner`}
          className="w-full h-auto object-cover"
        />
        {banners.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full z-10 bg-black/30 text-white hover:bg-black/50 transition"
            >
              &#10094;
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full z-10 bg-black/30 text-white hover:bg-black/50 transition"
            >
              &#10095;
            </button>
          </>
        )}

        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === index ? "bg-green-500 scale-110" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className={`${bgColor} relative shadow-2xl px-1 sm:px-2 lg:px-3 pt-0 mb-[20px] border border-gray-200`}
    >
      {renderBanner(topBanners, topBannerIndex, prevTop, nextTop)}

      {showTitle && renderTitle()}

      {loading ? (
        <p className="text-gray-400 italic">Đang tải sản phẩm...</p>
      ) : (
        <div className="relative mt-4">
          {canGoPrev && (
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full z-10 bg-black/30 text-white hover:bg-black/50 transition"
            >
              &#10094;
            </button>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 relative z-0">
            {visibleProducts.map((p) => (
              <div
                key={p.id}
                className="w-full h-full transform hover:scale-105 transition-transform duration-300"
              >
                <ProductCard p={p} />
              </div>
            ))}
            {/* Giữ layout 2 hàng luôn ổn định */}
            {Array.from({
              length: Math.max(0, maxItems - visibleProducts.length),
            }).map((_, index) => (
              <div key={`placeholder-${index}`} className="w-full h-full" />
            ))}
          </div>
          {canGoNext && (
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full z-10 bg-black/30 text-white hover:bg-black/50 transition"
            >
              &#10095;
            </button>
          )}
        </div>
      )}

      {showMore && ( // 🆕 chỉ hiển thị khi true
        <div className="flex justify-center mt-4">
          <a
            href={`/category/${title}`}
            className="text-green-600 font-medium hover:underline transition"
          >
            Xem thêm sản phẩm →
          </a>
        </div>
      )}

      {renderBanner(bottomBanners, bottomBannerIndex, prevBottom, nextBottom)}
    </section>
  );
};

export default ProductGroup;
