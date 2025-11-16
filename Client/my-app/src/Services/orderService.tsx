import axios from "axios";

const API_URL = "http://localhost:5292/api/FoodReview";

export interface ProductReview {
  id: number;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  productReviewImages?: {
    id: number;
    productReviewId: number;
    imageUrl: string; // BE tuỳ bạn trả thế nào
    createdAt: string;
    updatedAt: string;
  }[];
}

interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

export const FoodReviewService = {
  // Lấy tất cả review (BE chưa filter theo ProductId nên ta filter ở FE)
  getAll: async (pageNumber: number = 1, pageSize: number = 9999) => {
    const res = await axios.get<PagedResult<ProductReview>>(
      `${API_URL}/GetAll`,
      {
        params: { pageNumber, pageSize },
      }
    );
    return res.data;
  },

  // Lấy review theo ProductId (lọc ở FE)
  getByProductId: async (productId: string) => {
    const data = await FoodReviewService.getAll(1, 9999);
    return data.items.filter((item) => item.productId === productId);
  },

  // Tạo review mới + upload nhiều ảnh
  create: async (data: {
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    images?: File[];
  }) => {
    const formData = new FormData();

    formData.append("ProductId", data.productId);
    formData.append("UserId", data.userId);
    formData.append("Rating", data.rating.toString());
    formData.append("Comment", data.comment || "");

    if (data.images && data.images.length > 0) {
      data.images.forEach((file, index) => {
        formData.append(`productReviewImageModals[${index}].ImageUrl`, file);
      });
    }

    const res = await axios.post(`${API_URL}/Create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },
};
