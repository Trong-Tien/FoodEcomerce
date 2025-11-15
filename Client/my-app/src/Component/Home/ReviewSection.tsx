"use client";

import { useState, useRef } from "react";
import { foodReviewService } from "@/Services/FoodReviewService";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";

type ReviewFormProps = {
  productId: string;
  onSuccess: () => void;
};

export default function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chuyển file thành base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject("Lỗi đọc file");
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArr = Array.from(files);
    setImages(fileArr);
    setPreviewUrls(fileArr.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("Bạn cần đăng nhập để đánh giá");
      return;
    }
    if (rating === 0) {
      toast.error("Vui lòng chọn số sao đánh giá");
      return;
    }

    try {
      setLoading(true);

      // Chuyển ảnh sang base64
      const imageDTOs = await Promise.all(
        images.map(async (file) => ({
          imageUrl: await convertFileToBase64(file),
        }))
      );

      const now = new Date().toISOString(); // Ngày giờ hợp lệ

      const reviewPayload = {
        productId,
        userId: user.id,
        rating,
        comment,
        createdAt: now,
        updatedAt: now,
        productReviewImageDTOs: imageDTOs,
      };

      await foodReviewService.create(reviewPayload);

      toast.success("Gửi đánh giá thành công!");
      onSuccess();

      // Reset form
      setRating(0);
      setComment("");
      setImages([]);
      setPreviewUrls([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Lỗi gửi đánh giá:", err);
      toast.error("Gửi đánh giá thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-4 rounded-xl shadow-md space-y-4">
      {/* Rating */}
      <div>
        <label className="font-semibold">Đánh giá sao:</label>
        <div className="flex gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <textarea
        placeholder="Nhập nhận xét của bạn..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-md p-2 min-h-[80px]"
      />

      {/* Upload ảnh */}
      <div>
        <label className="font-semibold">Ảnh (tùy chọn):</label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1"
        />
      </div>

      {/* Preview ảnh */}
      {previewUrls.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {previewUrls.map((url, idx) => (
            <img key={idx} src={url} className="w-20 h-20 object-cover rounded border" alt="preview" />
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || rating === 0}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Đang gửi..." : "Gửi đánh giá"}
      </button>
    </form>
  );
}
