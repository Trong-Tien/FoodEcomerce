import type { Review } from "../Types/review";

const REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, giao hàng nhanh.",
    createdAt: "2025-08-20",
    images: ["/uploads/review1.jpg", "/uploads/review2.jpg"], // 👈 thêm demo ảnh
  },
  {
    id: 2,
    productId: 1,
    user: "Trần Thị B",
    rating: 4,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
  {
    id: 3,
    productId: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, giao hàng nhanh.",
    createdAt: "2025-08-20",
    images: ["/uploads/review1.jpg", "/uploads/review2.jpg"], // 👈 thêm demo ảnh
  },
  {
    id: 4,
    productId: 1,
    user: "Trần Thị B",
    rating: 4,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
  {
    id: 5,
    productId: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, giao hàng nhanh.",
    createdAt: "2025-08-20",
    images: ["/uploads/review1.jpg", "/uploads/review2.jpg"], // 👈 thêm demo ảnh
  },
  {
    id: 6,
    productId: 1,
    user: "Trần Thị B",
    rating: 4,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
  {
    id: 7,
    productId: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, giao hàng nhanh.",
    createdAt: "2025-08-20",
    images: ["/uploads/review1.jpg", "/uploads/review2.jpg"], // 👈 thêm demo ảnh
  },
  {
    id: 8,
    productId: 1,
    user: "Trần Thị B",
    rating: 4,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
  {
    id: 9,
    productId: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, giao hàng nhanh.",
    createdAt: "2025-08-20",
    images: ["/uploads/review1.jpg", "/uploads/review2.jpg"], // 👈 thêm demo ảnh
  },
  {
    id: 10,
    productId: 1,
    user: "Trần Thị B",
    rating: 4,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
  {
    id: 11,
    productId: 1,
    user: "Nguyễn Văn A",
    rating: 2,
    comment: "Sản phẩm rất tốt, giao hàng nhanh.",
    createdAt: "2025-08-20",
    images: ["/uploads/review1.jpg", "/uploads/review2.jpg"], // 👈 thêm demo ảnh
  },
  {
    id: 12,
    productId: 1,
    user: "Trần Thị B",
    rating: 1,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
  {
    id: 13,
    productId: 1,
    user: "Trần Thị B",
    rating: 4,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
  {
    id: 14,
    productId: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, giao hàng nhanh.",
    createdAt: "2025-08-20",
    images: ["/uploads/review1.jpg", "/uploads/review2.jpg"], // 👈 thêm demo ảnh
  },
  {
    id: 15,
    productId: 1,
    user: "Trần Thị B",
    rating: 1,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
  {
    id: 16,
    productId: 1,
    user: "Trần Thị B",
    rating: 4,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
  {
    id: 17,
    productId: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Sản phẩm rất tốt, giao hàng nhanh.",
    createdAt: "2025-08-20",
    images: ["/uploads/review1.jpg", "/uploads/review2.jpg"], // 👈 thêm demo ảnh
  },
  {
    id: 18,
    productId: 1,
    user: "Trần Thị B",
    rating: 1,
    comment: "Chất lượng ổn, sẽ mua lại.",
    createdAt: "2025-08-21",
    images: [],
  },
];

const ReviewService = {
  async getByProductId(productId: number): Promise<Review[]> {
    return REVIEWS.filter((r) => r.productId === productId);
  },

  async addReview(
    newReview: Omit<Review, "id" | "createdAt">
  ): Promise<Review> {
    const review: Review = {
      id: REVIEWS.length + 1,
      createdAt: new Date().toISOString().split("T")[0],
      ...newReview,
    };
    REVIEWS.push(review);
    return review;
  },
};

export default ReviewService;
