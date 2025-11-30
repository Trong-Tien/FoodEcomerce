import axios from "axios";

const API_URL = "http://localhost:5292/api/FoodReview";

export const foodReviewService = {
  create: async (data : any) => {
    const formData = new FormData();

    formData.append("productId", data.productId);
    formData.append("userId", data.userId);
    formData.append("rating", data.rating.toString());
    formData.append("comment", data.comment);
    formData.append("createdAt",data.now);
    formData.append("updatedAt", data.now);
    formData.append("productReviewImageDTOs", data.productReviewImageDTOs)
    
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
