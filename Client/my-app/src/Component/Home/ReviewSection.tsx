import React, { useEffect, useState, useMemo } from "react";
import ReviewService from "../../Services/ReviewService";
import type { Review } from "../../Types/review";

interface ReviewSectionProps {
  productId: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState("");
  const [images, setImages] = useState<string[]>([]); // lưu URL tạm thời
  const [showWithMedia, setShowWithMedia] = useState(false);
  const [filterStar, setFilterStar] = useState<number | null>(null); // mặc định là tất cả
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;

  // Lấy dữ liệu review
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await ReviewService.getByProductId(productId);
      // sắp xếp mới nhất
      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setReviews(sorted);
    };
    fetchReviews();
  }, [productId]);

  // Submit review mới
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !comment.trim()) return;

    const newReview = await ReviewService.addReview({
      productId,
      user,
      rating,
      comment,
      images, // đây là string[] (URL tạm thời hoặc base64)
    });

    setReviews((prev) => [newReview, ...prev]); // thêm review mới lên đầu
    setComment("");
    setUser("");
    setRating(5);
    setImages([]);
  };

  // Thống kê review
  const stats = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
      counts[r.rating] = (counts[r.rating] || 0) + 1;
    });
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: total ? sum / total : 0,
      total,
      counts,
    };
  }, [reviews]);

  // 1️⃣ Sắp xếp review theo ưu tiên: có media → sao cao → mới nhất
  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      const aMedia = a.images && a.images.length > 0 ? 1 : 0;
      const bMedia = b.images && b.images.length > 0 ? 1 : 0;
      if (bMedia !== aMedia) return bMedia - aMedia;
      if (b.rating !== a.rating) return b.rating - a.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [reviews]);

  // 2️⃣ Lọc review theo filter hiện tại
  const filteredReviews = useMemo(() => {
    return sortedReviews.filter((r) => {
      if (showWithMedia && (!r.images || r.images.length === 0)) return false;
      if (filterStar !== null && r.rating !== filterStar) return false;
      return true;
    });
  }, [sortedReviews, showWithMedia, filterStar]);

  // 3️⃣ Phân trang
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirst, indexOfLast);

  // 4️⃣ Handle upload file
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileArray = Array.from(e.target.files);
    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Đánh giá sản phẩm</h3>

      {/* ⭐ Thống kê tổng quan */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl border">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-yellow-500">
            {stats.average.toFixed(1)}⭐
          </div>
          <div className="text-sm text-gray-600">{stats.total} đánh giá</div>
        </div>

        {/* Thanh số sao */}
        <div className="mt-3 space-y-1">
          <div
            className={`flex items-center gap-2 text-sm cursor-pointer ${
              filterStar === null ? "font-semibold text-blue-600" : ""
            }`}
            onClick={() => {
              setFilterStar(null);
              setCurrentPage(1);
            }}
          >
            <span className="w-14">Tất cả</span>
            <div className="flex-1 h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-yellow-400 rounded"
                style={{ width: "100%" }}
              ></div>
            </div>
            <span className="w-10 text-right">{stats.total}</span>
          </div>

          {[5, 4, 3, 2, 1].map((s) => (
            <div
              key={s}
              className={`flex items-center gap-2 text-sm cursor-pointer ${
                filterStar === s ? "font-semibold text-blue-600" : ""
              }`}
              onClick={() => {
                setFilterStar(filterStar === s ? null : s);
                setCurrentPage(1);
              }}
            >
              <span className="w-14">{s} ⭐</span>
              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-yellow-400 rounded"
                  style={{
                    width: `${
                      stats.total ? (stats.counts[s] / stats.total) * 100 : 0
                    }%`,
                  }}
                ></div>
              </div>
              <span className="w-10 text-right">{stats.counts[s]}</span>
            </div>
          ))}
        </div>

        {/* Toggle review có media */}
        <div className="mt-3 flex items-center gap-2">
          <input
            type="checkbox"
            id="withMedia"
            checked={showWithMedia}
            onChange={(e) => {
              setShowWithMedia(e.target.checked);
              setCurrentPage(1);
            }}
          />
          <label htmlFor="withMedia" className="text-sm text-gray-700">
            Chỉ hiện đánh giá có hình ảnh/video
          </label>
        </div>
      </div>

      {/* Danh sách review */}
      <div className="space-y-4">
        {currentReviews.length === 0 ? (
          <p className="text-gray-500 text-sm">Chưa có đánh giá nào.</p>
        ) : (
          currentReviews.map((r) => (
            <div key={r.id} className="border-b pb-3">
              <p className="text-sm font-semibold">{r.user}</p>
              <p className="text-yellow-500">
                {"⭐".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </p>
              <p className="text-gray-600 text-sm mt-1">{r.comment}</p>

              {r.images && r.images.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {r.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review ${r.id} - ${idx}`}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-400 mt-1">{r.createdAt}</p>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Thanh phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Form thêm review */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          placeholder="Tên của bạn"
          className="w-full border rounded-lg p-2 text-sm"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <select
          className="w-full border rounded-lg p-2 text-sm"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>

        <textarea
          className="w-full border rounded-lg p-2 text-sm"
          rows={3}
          placeholder="Viết đánh giá của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-20 h-20 border rounded-lg overflow-hidden"
            >
              <img
                src={img}
                alt={`Preview ${idx}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl"
                onClick={() => setImages(images.filter((_, i) => i !== idx))}
              >
                x
              </button>
            </div>
          ))}
          <label className="w-20 h-20 border border-dashed rounded-lg flex items-center justify-center cursor-pointer text-gray-400">
            + Thêm
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFilesChange}
            />
          </label>
        </div>

        {/* Hiển thị preview ảnh */}
        {images.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preview ${idx}`}
                className="w-16 h-16 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
