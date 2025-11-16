import axios from "axios";

const API_URL = "http://localhost:5292/api/FoodReview";

export const foodReviewService = {
  create: async (formData: FormData) => {
    const res = await axios.post(`${API_URL}/Create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  getByProductId: async (productId: string) => {
    const res = await axios.get(`${API_URL}/GetByProduct`, {
      params: { productId, pageNumber: 1, pageSize: 9999 },
    });
    return res.data;
  },
};
