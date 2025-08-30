// src/components/home/BrandOfferGroup.tsx
import React from "react";
import BrandCard from "../Common/BrandCard";
import type { Brand } from "../../Types/brand";

interface BrandOfferGroupProps {
  title: string;
  brands: Brand[];
  titleStyle?: "minimal" | "ecommerce";
  titleAlign?: "left" | "center";
  titleVariant?: "default" | "boxed";
  showTitle?: boolean;
}

const BrandOfferGroup: React.FC<BrandOfferGroupProps> = ({
  title,
  brands,
  titleStyle = "minimal",
  titleAlign = "left",
  titleVariant = "default",
  showTitle = true,
}) => {
  if (!brands || brands.length === 0) return null;

  const limitedBrands = brands.slice(0, 4);

  // Hàm render tiêu đề
  const renderTitle = () => {
    if (!showTitle) return null;

    const titleElement = (
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
    );

    if (titleVariant === "boxed") {
      return (
        <div className="relative mb-5">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-yellow-200 to-pink-200 px-10 py-1 shadow-md rounded-b-xl">
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
          className={`flex items-center gap-3 mb-4 ${
            titleAlign === "center" ? "justify-center" : ""
          }`}
        >
          <div className="w-2 h-6 bg-green-500 rounded-md"></div>
          {titleElement}
        </div>
      );
    }

    // ecommerce style
    return (
      <div
        className={`flex justify-between mb-4 ${
          titleAlign === "center" ? "justify-center" : ""
        }`}
      >
        {titleElement}
        {titleAlign !== "center" && (
          <a href="/brands" className="text-sm text-green-600 hover:underline">
            Xem tất cả →
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="shadow-md p-4 mb-2 bg-gradient-to-b from-yellow-100 to-pink-100">
      {/* Tiêu đề */}
      {renderTitle()}

      {/* Grid hiển thị hãng */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {limitedBrands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default BrandOfferGroup;
