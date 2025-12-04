"use client";

import { useEffect, useState } from "react";
import { foodReviewService } from "@/Services/FoodReviewService";
import { Star } from 'lucide-react';

type ReviewImage = {
  id: string;
  imageUrl: string;
};

type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: String;
  rating: number;
  comment: string;
  createdAt: string;
  productReviewImages?: ReviewImage[];
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

  if (loading) {
    return (
      <div className="w-full space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-100 rounded-2xl p-6 animate-pulse h-32"></div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="w-full bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center">
        <p className="text-slate-600">Chưa có đánh giá nào.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {reviews.map((r) => {
        const images = r.productReviewImages || [];
        return (
          <div
            key={r.id}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-shadow"
          >
            {/* Header with user and rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-900">{r.userName || r.userId}</span>
                <p className="text-xs text-slate-500">
                  {new Date(r.createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={
                      star <= r.rating
                        ? "fill-emerald-600 text-emerald-600"
                        : "text-slate-300"
                    }
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <p className="text-slate-700 leading-relaxed mb-4">{r.comment}</p>

            {images.length > 0 && (
              <div className="mt-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {images.map((img) => {
                    const encodedPath = encodeURIComponent(img.imageUrl);
                    const imgUrl = `https://foodecomerceapi.runasp.net/api/File/image?path=${encodedPath}`;
                    return (
                      <div
                        key={img.id}
                        className="relative group overflow-hidden rounded-lg border border-slate-200"
                      >
                        <img
                          src={imgUrl || "/placeholder.svg"}
                          className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-200"
                          alt="review image"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
