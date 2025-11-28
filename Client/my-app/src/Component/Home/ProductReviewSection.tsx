"use client";

import { useState } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

type ProductReviewSectionProps = {
  productId: string;
};

export default function ProductReviewSection({ productId }: ProductReviewSectionProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">

      <div>
        <h3 className="font-bold text-lg mb-2">Đánh giá của khách hàng</h3>
        <ReviewList key={refreshKey} productId={productId} />
      </div>
      
      <div>
        <h3 className="font-bold text-lg mb-2">Viết đánh giá</h3>
        <ReviewForm productId={productId} onSuccess={handleReviewSuccess} />
      </div>

      
    </div>
  );
}
