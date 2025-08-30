import type { Product } from "../Types/product";
// Fallback data (dùng khi chưa có API thật)
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Thịt bò Mỹ tươi 500g",
    price: 250000,
    oldPrice: 300000,
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/223418/bhx/buoi-da-xanh-loai-2-1kg_202504122259394989.jpg",
  },
  {
    id: 2,
    name: "Táo Mỹ Fuji 1kg",
    price: 120000,
    oldPrice: 300000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
    badge: "NEW",
  },
  {
    id: 3,
    name: "Cá hồi Nauy phi lê 300g",
    price: 190000,
    oldPrice: 210000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
  },
  {
    id: 4,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
  },
  {
    id: 5,
    name: "Thịt bò Mỹ tươi 500g",
    price: 250000,
    oldPrice: 300000,
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/223418/bhx/buoi-da-xanh-loai-2-1kg_202504122259394989.jpg",
  },
  {
    id: 6,
    name: "Táo Mỹ Fuji 1kg",
    price: 120000,
    oldPrice: 300000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
    badge: "NEW",
  },
  {
    id: 7,
    name: "Cá hồi Nauy phi lê 300g",
    price: 190000,
    oldPrice: 210000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
  },
  {
    id: 8,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
  },
  {
    id: 9,
    name: "Thịt bò Mỹ tươi 500g",
    price: 250000,
    oldPrice: 300000,
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/223418/bhx/buoi-da-xanh-loai-2-1kg_202504122259394989.jpg",
  },
  {
    id: 10,
    name: "Táo Mỹ Fuji 1kg",
    price: 120000,
    oldPrice: 300000,
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/308046/bhx/ca-basa-cat-khuc_202505231333267464.jpg",
    badge: "NEW",
  },
  {
    id: 11,
    name: "Cá hồi Nauy phi lê 300g",
    price: 190000,
    oldPrice: 210000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
  },
  {
    id: 12,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
  },
  {
    id: 13,
    name: "Thịt bò Mỹ tươi 500g",
    price: 250000,
    oldPrice: 300000,
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/226837/bhx/ca-huong-lam-sach_202505281415480509.jpg",
  },
  {
    id: 14,
    name: "Táo Mỹ Fuji 1kg",
    price: 120000,
    oldPrice: 300000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
    badge: "NEW",
  },
  {
    id: 15,
    name: "Cá hồi Nauy phi lê 300g",
    price: 190000,
    oldPrice: 210000,
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
  },
  {
    id: 16,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    badge: "NEW",
    img: "https://kamereo.vn/blog/wp-content/uploads/2025/01/ca-nuoc-ngot-2.jpg",
  },
  {
    id: 17,
    name: "Thịt bò Mỹ tươi 500g",
    price: 250000,
    oldPrice: 300000,
    badge: "NEW",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/226837/bhx/ca-huong-lam-sach_202505281415480509.jpg",
  },
  {
    id: 18,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    badge: "RAU",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/310775/bhx/thumb-rau-mong-toi_202506131107467690.jpg",
  },
  {
    id: 19,
    name: "Thịt bò Mỹ tươi 500g",
    price: 250000,
    oldPrice: 300000,
    badge: "RAU",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8785/241815/bhx/thumb-gio-heo-gia-soc-4_202508121526479724.jpg",
  },
  {
    id: 20,
    name: "Táo Mỹ Fuji 1kg",
    price: 120000,
    oldPrice: 300000,
    badge: "RAU",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/335480/bhx/335480optimized_202506131007320723.jpg",
  },
  {
    id: 21,
    name: "Cá hồi Nauy phi lê 300g",
    price: 190000,
    oldPrice: 210000,
    badge: "RAU",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/309156/bhx/thumb-cai-be-tich-xanh_202508040904307716.jpg",
  },
  {
    id: 22,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    badge: "RAU",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/310775/bhx/thumb-rau-mong-toi_202506131107467690.jpg",
  },
  {
    id: 23,
    name: "Thịt bò Mỹ tươi 500g",
    price: 250000,
    oldPrice: 300000,
    badge: "RAU",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/238556/bhx/thumb-cai-thia-tich-xanh_202507110937368060.jpg",
  },
  {
    id: 24,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8678/149459/bhx/149459_202411261308396817.jpg",
  },
  {
    id: 19,
    name: "Thịt bò Mỹ tươi 500g",
    price: 250000,
    oldPrice: 300000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3023/318581/bhx/nuoc-xa-vai-comfort-diu-nhe-thom-diu-em-32-lit_202507141103321613.jpg",
  },
  {
    id: 25,
    name: "Táo Mỹ Fuji 1kg",
    price: 120000,
    oldPrice: 300000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8678/182246/bhx/tam-goi-cho-be-pigeon-chiet-xuat-jojoba-200ml_202508121540358267.jpg",
  },
  {
    id: 26,
    name: "Cá hồi Nauy phi lê 300g",
    price: 190000,
    oldPrice: 210000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3027/106662/bhx/106662_202411251409174820.png",
  },
  {
    id: 27,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8678/182287/bhx/tam-goi-cho-be-pigeon-chiet-xuat-jojoba-700ml_202508121549187880.jpg",
  },
  {
    id: 18,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8678/149459/bhx/149459_202411261308396817.jpg",
  },
  {
    id: 29,
    name: "Thịt bò Mỹ tươi 500g",
    price: 250000,
    oldPrice: 300000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3023/318581/bhx/nuoc-xa-vai-comfort-diu-nhe-thom-diu-em-32-lit_202507141103321613.jpg",
  },
  {
    id: 30,
    name: "Táo Mỹ Fuji 1kg",
    price: 120000,
    oldPrice: 300000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8678/182246/bhx/tam-goi-cho-be-pigeon-chiet-xuat-jojoba-200ml_202508121540358267.jpg",
  },
  {
    id: 31,
    name: "Cá hồi Nauy phi lê 300g",
    price: 190000,
    oldPrice: 210000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/3027/106662/bhx/106662_202411251409174820.png",
  },
  {
    id: 32,
    name: "Sữa tươi Vinamilk 1L",
    price: 32000,
    oldPrice: 300000,
    badge: "M&B",
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8678/182287/bhx/tam-goi-cho-be-pigeon-chiet-xuat-jojoba-700ml_202508121549187880.jpg",
  },
];

const productService = {
  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FALLBACK_PRODUCTS), 500);
    });
  },

  getById: async (id: number): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(FALLBACK_PRODUCTS.find((p) => p.id === id)),
        300
      );
    });
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve(
            FALLBACK_PRODUCTS.filter(
              (p) => p.badge?.toLowerCase() === category.toLowerCase()
            )
          ),
        300
      );
    });
  },
};

export default productService;
