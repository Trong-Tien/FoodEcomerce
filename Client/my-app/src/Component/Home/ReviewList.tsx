"use client";

import { useEffect, useState } from "react";
import { foodReviewService } from "@/Services/FoodReviewService";

type Review = {
  id: number;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  productReviewImageModals?: { ImageUrl: string }[];
};

type ReviewListProps = {
  productId: string;
};

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await foodReviewService.getByProductId(productId);
      setReviews(data);
    } catch (err) {
      console.error("Lỗi load review:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  if (loading) return <p>Đang tải đánh giá...</p>;

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <p>Chưa có đánh giá nào.</p>}
      {reviews.map((r) => (
        <div key={r.id} className="border p-3 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">User: {r.userId}</span>
            <span className="text-yellow-500">
              {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
            </span>
          </div>
          <p>{r.comment}</p>
          {r.productReviewImageModals?.length && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {r.productReviewImageModals.map((img, idx) => (
                <img
                  key={idx}
                  src={img.ImageUrl}
                  className="w-20 h-20 object-cover rounded border"
                  alt="review image"
                />
              ))}
            </div>
          )}
          <small className="text-gray-400">{new Date(r.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
