export interface Review {
  id: number;
  productId: number;
  user: string;
  rating: number; // số sao (1-5)
  comment: string;
  createdAt: string;
  images?: string[]; // danh sách ảnh review (url hoặc base64)
}
