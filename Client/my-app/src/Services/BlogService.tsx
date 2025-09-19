// src/services/blogService.ts
import type { Blog } from "../Types/blog";
// Fallback dữ liệu tĩnh
const BLOGS: Blog[] = [
  {
    id: 1,
    title: "5 mẹo bảo quản thực phẩm tươi lâu",
    description:
      "Những bí quyết đơn giản giúp bạn bảo quản rau củ và thịt cá lâu hơn mà vẫn giữ được hương vị.",
    img: "https://cdn.tgdd.vn/Files/2022/07/05/1444852/ngay-that-tich-tang-qua-gi-10-mon-qua-tang-ngay-that-tich-202207051122076308.jpg",
    link: "/blog/meo-bao-quan-thuc-pham",
  },
  {
    id: 2,
    title: "Cách làm bánh flan ngon mịn",
    description:
      "Bánh flan là món tráng miệng được nhiều người yêu thích. Cùng xem công thức chuẩn nhé!",
    img: "https://cdn.tgdd.vn/Files/2022/07/05/1444852/ngay-that-tich-tang-qua-gi-10-mon-qua-tang-ngay-that-tich-202207051122076308.jpg",
    link: "/blog/cach-lam-banh-flan",
  },
  {
    id: 3,
    title: "Nên mua gì vào ngày rằm?",
    description:
      "Gợi ý danh sách thực phẩm và vật phẩm nên mua sắm vào ngày rằm hàng tháng.",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/News/Images/2025/08/16/1581652/image18_202508160017070003.jpg",
    link: "/blog/nen-mua-gi-ngay-ram",
  },
  {
    id: 4,
    title: "Cách làm bánh flan ngon mịn",
    description:
      "Bánh flan là món tráng miệng được nhiều người yêu thích. Cùng xem công thức chuẩn nhé!",
    img: "https://cdn.tgdd.vn/Files/2022/07/05/1444852/ngay-that-tich-tang-qua-gi-10-mon-qua-tang-ngay-that-tich-202207051122076308.jpg",
    link: "/blog/cach-lam-banh-flan",
  },
  {
    id: 5,
    title: "Nên mua gì vào ngày rằm?",
    description:
      "Gợi ý danh sách thực phẩm và vật phẩm nên mua sắm vào ngày rằm hàng tháng.",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/News/Images/2025/08/16/1581652/image18_202508160017070003.jpg",
    link: "/blog/nen-mua-gi-ngay-ram",
  },
];
  // ... thêm các blog khác

const blogService = {
  getBlogs: async (): Promise<Blog[]> => {
    // Giả lập delay
    await new Promise((res) => setTimeout(res, 200));
    return BLOGS;
  },
};
export default blogService;
