
import type { Brand } from "../Types/brand";
// Fallback dữ liệu tĩnh
const BRANDS: Brand[] = [
  {
    id: 1,
    name: "Thịt bò Mỹ tươi 500g",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/14/bannerbrandpromo/sis280x440_202506010909536791.jpg",
    link: "/brand/meo-bao-quan-thuc-pham",
  },
  {
    id: 2,
    name: "Thịt bò Mỹ tươi 500g",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/16/bannerbrandpromo/freecompress-280x440_202501031511500527.jpg",
    link: "/brand/meo-bao-quan-thuc-pham",
  },
  {
    id: 3,
    name: "Thịt bò Mỹ tươi 500g",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/8/bannerbrandpromo/280x440_202502190843520494.jpg",
    link: "/brand/meo-bao-quan-thuc-pham",
  },
  {
    id: 4,
    name: "Thịt bò Mỹ tươi 500g",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/30/bannerbrandpromo/tt-cheo-280440_202502231605356698.jpg",
    link: "/brand/meo-bao-quan-thuc-pham",
  },
  {
    id: 5,
    name: "Thịt bò Mỹ tươi 500g",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/30/bannerbrandpromo/tt-cheo-280440_202502231605356698.jpg",
    link: "/brand/meo-bao-quan-thuc-pham",
  },
];
// ... thêm các blog khác

const brandService = {
  getBrands: async (): Promise<Brand[]> => {
    // Giả lập delay
    await new Promise((res) => setTimeout(res, 200));
    return BRANDS;
  },
};
export default brandService;
