import { useEffect, useState } from "react";
import Header from "@/Component/Home/Header";
import CategorySidebar from "@/Component/Home/CategorySidebar";
import Carousel from "@/Component/Home/Carousel";
import QuickMenu from "@/Component/Home/QuickMenu";
import ProductGroup from "@/Component/Home/ProductGroup";
import BlogGroup from "@/Component/Home/BlogGroup";
import BrandOfferGroup from "@/Component/Home/BrandOffGroup";
import Footer from "@/Component/Home/Footer";
import { productService } from "@/Services/ProductService";
import blogService from "@/Services/BlogService";
import brandService from "@/Services/BrandService";

import type { Blog } from "@/Types/blog";
import type { Brand } from "@/Types/brand";
import type { Product } from "@/Type/Product";

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



/// ✅ Chuẩn hóa đường dẫn ảnh sản phẩm (dùng API File/image)
const mapProductToUI = (p: Product) => ({
  ...p,
  price: p.unitPrice * (1 - p.discount / 100),
  oldPrice: p.discount > 0 ? p.unitPrice : undefined,
  img:
    typeof p.images === "string" && p.images.length > 0
      ? `http://localhost:5292/api/File/image?path=${encodeURIComponent(
        p.images.split(",")[0]
      )}`
      : "/assets/img/no-image.png",
});


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rauProducts, setRauProducts] = useState<Product[]>([]);


  useEffect(() => {
    setLoading(true);
    Promise.all([
      productService.getAll(),
      productService.getByCategory("4693d14a-b0fa-4a71-8693-bd3ea4322cd3"), // 🌿 danh mục Rau củ nấm
      blogService.getBlogs(),
      brandService.getBrands(),
    ])
      .then(([allProducts, rauData, blogData, brandData]) => {
        setProducts(allProducts);
        setRauProducts(rauData);
        setBlogs(blogData);
        setBrands(brandData);
      })
      .catch((err) => console.error("Lỗi khi fetch data:", err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch dữ liệu song song

  // ✅ Map toàn bộ sản phẩm sang format UI
  const mappedProducts = products.map(mapProductToUI);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Container chính */}
      <div className="pt-[122px] max-w-7xl mx-auto px-0 grid grid-cols-12 gap-0 bg-white">
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-3">
          <div className="sticky top-[122px] h-[calc(100vh-122px)] overflow-y-auto">
            <CategorySidebar />
          </div>
        </div>

        {/* Nội dung chính */}
        <main className="col-span-12 lg:col-span-9 space-y-5">
          <QuickMenu items={QUICK_MENU} />
          <Carousel />

          {/* 🔥 Sản phẩm khuyến mãi */}
          <ProductGroup
            title="Sản phẩm khuyến mãi"
            titleStyle="ecommerce"
            badge="HOT"
            products={mappedProducts.filter((p) => p.discount > 0)}
            loading={loading}
            maxItems={10}
            bgColor="bg-gradient-to-b from-orange-100 to-orange-500"
          />

          {/* 🆕 Sản phẩm mới (ví dụ: chưa giảm giá) */}
          <ProductGroup
            topBanners={[
              "https://cdnv2.tgdd.vn/bhx-static/bhx/8010/untitled-2-1-compressifyio_202508151512054563.png",
            ]}
            title="Sản phẩm mới"
            badge="NEW"
             products={rauProducts.map(mapProductToUI)}
            loading={loading}
            maxItems={5}
            bgColor="bg-gradient-to-b from-yellow-50 to-yellow-400"
            bottomBanners={[
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/trang-cate-pc-2_202507070959119347.jpg",
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/freecompress-trang-cate-pc_202508060854314815.jpg",
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5185/trang-cate-pc-1_202507100918255110.jpg",
            ]}
            showTitle={false}
          />

          {/* 🥬 Rau củ nấm (lọc theo CategoryId) */}
          {/* 🥬 Rau củ nấm */}
          <ProductGroup
            title="Rau, củ, nấm"
            titleAlign="left"
            titleVariant="boxed"
            badge="RAU"
            products={rauProducts.map(mapProductToUI)}
            loading={loading}
            maxItems={5}
          />


          {/* 👶 Mẹ và bé (lọc tên chứa “sữa”) */}
          <ProductGroup
            title="Mẹ và bé"
            titleVariant="boxed"
            badge="M&B"
            products={mappedProducts.filter((p) =>
              p.name.toLowerCase().includes("sữa")
            )}
            loading={loading}
            maxItems={10}
          />

          {/* 🏷️ Brand */}
          <BrandOfferGroup
            title="Gian hàng và ưu đãi từ hãng"
            brands={brands}
            titleAlign="left"
            titleVariant="boxed"
          />

          {/* 📰 Blog */}
          <BlogGroup title="Góc Blog & Mẹo Vặt" blogs={blogs} showTitle={false} />

          <Footer />
        </main>
      </div>
    </div>
  );
}
