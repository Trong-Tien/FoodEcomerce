import axios from "axios";

const API_URL = "http://foodecomerceapi.runasp.net/api/FoodReview";

export const foodReviewService = {
  create: async (formData: FormData) => {
    const res = await axios.post(`${API_URL}/Create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  getByProductId: async (productId: string) => {
  const res = await axios.get(`${API_URL}/GetByProductId`, {
    params: { id: productId },
  });
  return res.data;
},
};
