"use client";

import { useState, useRef } from "react";
import { foodReviewService } from "@/Services/FoodReviewService";
import { useAuth } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import { Star, Upload, X } from 'lucide-react';

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArr = Array.from(files);
    setImages(fileArr);
    setPreviewUrls(fileArr.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (idx: number) => {
    URL.revokeObjectURL(previewUrls[idx]);
    setImages(images.filter((_, i) => i !== idx));
    setPreviewUrls(previewUrls.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("Bạn cần đăng nhập để đánh giá");
      return;
    }
    if (!productId) {
      toast.error("ID sản phẩm không hợp lệ");
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error("Vui lòng chọn số sao đánh giá (1-5)");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("ProductId", productId);
      formData.append("UserId", user.id);
      formData.append("Rating", rating.toString());
      formData.append("Comment", comment || "");

      images.forEach((file, idx) => {
        formData.append(`productReviewImageModals[${idx}].ImageUrl`, file, file.name);
      });

      const result = await foodReviewService.create(formData);

      toast.success(result?.message || "Gửi đánh giá thành công!");
      onSuccess();

      setRating(0);
      setComment("");
      images.forEach((_, idx) => URL.revokeObjectURL(previewUrls[idx]));
      setImages([]);
      setPreviewUrls([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error("Lỗi gửi đánh giá:", err);

      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Gửi đánh giá thất bại!";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Chia sẻ đánh giá của bạn</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Rating + Comment */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-900">Đánh giá sao</label>
              <div className="flex gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-all duration-200 transform hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={star <= rating ? "fill-emerald-600 text-emerald-600" : "text-slate-400"}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-slate-600 mt-1">Bạn đã chọn {rating} sao</p>
              )}
            </div>

            <div>
              <label htmlFor="comment" className="text-sm font-semibold text-slate-900">Nhận xét</label>
              <textarea
                id="comment"
                placeholder="Chia sẻ trải nghiệm của bạn..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 resize-none transition-all"
                rows={5}
              />
              <p className="text-xs text-slate-500">{comment.length}/500 ký tự</p>
            </div>
          </div>

          {/* Right: Image Upload + Preview */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
            <label className="text-sm font-semibold text-slate-900">Hình ảnh (tùy chọn)</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-all group flex flex-col items-center justify-center"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="text-emerald-600" size={28} />
              <p className="text-sm text-slate-600 mt-2 text-center">Nhấp để tải lên hoặc kéo thả</p>
            </div>

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-slate-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 p-1 rounded-full bg-red-600 text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || rating === 0}
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <span className="animate-spin">⟳ Đang gửi...</span> : "Gửi đánh giá"}
        </button>
      </form>
    </div>
  );
}
