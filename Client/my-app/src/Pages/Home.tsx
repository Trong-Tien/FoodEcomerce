
import { useEffect, useState } from "react";
import Header from "@/Component/Home/Header";
import CategorySidebar from "@/Component/Home/CategorySidebar";
import Carousel from "@/Component/Home/Carousel";
import QuickMenu from "@/Component/Home/QuickMenu";
import ProductGroup from "@/Component/Home/ProductGroup";
import BlogGroup from "@/Component/Home/BlogGroup";
import BrandOfferGroup from "@/Component/Home/BrandOffGroup";
import Footer from "@/Component/Home/Footer";

import productService from "@/Services/ProductService";
import blogService from "@/Services/BlogService";
import brandService from "@/Services/BrandService";

import type { Blog } from "@/Types/blog";
import type { Brand } from "@/Types/brand";
import type { Product } from "@/Types/product";

import {
  FaHotjar,
  FaDrumstickBite,
  FaLeaf,
  FaWineBottle,
  FaCheese,
  FaBacon,
  FaIceCream,
  FaFish,
  FaPepperHot,
} from "react-icons/fa";

// Quick menu
const QUICK_MENU = [
  { name: "Khuyến mãi", icon: <FaHotjar /> },
  { name: "Thịt, cá", icon: <FaDrumstickBite /> },
  { name: "Rau, củ, quả", icon: <FaLeaf /> },
  { name: "Đồ uống", icon: <FaWineBottle /> },
  { name: "Sữa, trứng", icon: <FaCheese /> },
  { name: "Gạo, bột, đồ khô", icon: <FaBacon /> },
  { name: "Kem, sữa chua", icon: <FaIceCream /> },
  { name: "Hải sản đông lạnh", icon: <FaFish /> },
  { name: "Gia vị", icon: <FaPepperHot /> },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch tất cả dữ liệu song song
  useEffect(() => {
    setLoading(true);
    Promise.all([
      productService.getProducts(),
      blogService.getBlogs(),
      brandService.getBrands(), // 👉 sửa lại, tránh gọi nhầm getBlogs()
    ])
      .then(([productData, blogData, brandData]) => {
        setProducts(productData);
        setBlogs(blogData);
        setBrands(brandData);
      })
      .catch((err) => console.error("Lỗi khi fetch data:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Container chính */}
      <div className="pt-[122px] max-w-7xl mx-auto px-0 grid grid-cols-12 gap-0 bg-white">
        {/* Sidebar desktop sticky */}
        <div className="col-span-12 lg:col-span-3">
          <div className="sticky top-[122px] h-[calc(100vh-122px)] overflow-y-auto">
            <CategorySidebar />
          </div>
        </div>

        {/* Nội dung chính */}
        <main className="col-span-12 lg:col-span-9 space-y-5">
          <QuickMenu items={QUICK_MENU} />
          <Carousel />

          {/* Nhóm sản phẩm khuyến mãi */}
          <ProductGroup
            title="Sản phẩm khuyến mãi"
            titleStyle="ecommerce"
            badge="HOT"
            products={products.filter(
              (p) => p.oldPrice && p.oldPrice > p.price
            )}
            loading={loading}
            maxItems={10}
            bgColor="bg-gradient-to-b from-orange-100 to-orange-500"
          />

          {/* Nhóm sản phẩm mới */}
          <ProductGroup
            topBanners={[
              "https://cdnv2.tgdd.vn/bhx-static/bhx/8010/untitled-2-1-compressifyio_202508151512054563.png",
            ]}
            title="Sản phẩm mới"
            badge="NEW"
            products={products.filter((p) => p.badge === "NEW")}
            loading={loading}
            maxItems={5}
            bgColor="bg-gradient-to-b from-yellow-50 to-yellow-400"
            bottomBanners={[
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/trang-cate-pc-2_202507070959119347.jpg",
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/freecompress-trang-cate-pc_202508060854314815.jpg",
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/trang-cate-pc-1_202507100918255110.jpg",
              "https://www.bachhoaxanh.com/game/san-kho-bau-co-qua?utm_source=line&utm_medium=banner&utm_campaign=sankhobau&utm_id=gamethang8",
            ]}
            showTitle={false}
          />

          {/* Rau củ */}
          <ProductGroup
            title="Rau, củ, nấm"
            titleAlign="left"
            titleVariant="boxed"
            badge="RAU"
            products={products.filter((p) => p.badge === "RAU")}
            loading={loading}
            maxItems={5}
            bottomBanners={[
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/trang-cate-pc_202508110826550750.jpg",
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/cate-pc-1_202508140928545981.jpg",
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/freecompress-1960-250-cat_202508041526197571.png",
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/freecompress-trang-cate-pc_202507310945268547.jpg",
            ]}
          />

          {/* Mẹ và bé */}
          <ProductGroup
            title="Mẹ và bé"
            titleVariant="boxed"
            badge="M&B"
            products={products.filter((p) => p.badge === "M&B")}
            loading={loading}
            maxItems={10}
          />

          {/* Brand */}
          <BrandOfferGroup
            title="Gian hàng và ưu đãi từ hãng"
            brands={brands}
            titleAlign="left"
            titleVariant="boxed"
          />

          {/* Blog */}
          <BlogGroup
            title="Góc Blog & Mẹo Vặt"
            blogs={blogs}
            showTitle={false}
          />

          <Footer />
        </main>
      </div>
    </div>
  );
}
