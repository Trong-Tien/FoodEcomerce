import { useEffect, useState } from "react";
import Header from "@/Component/Home/Header";
import CategorySidebar from "@/Component/Home/CategorySidebar";
import Carousel from "@/Component/Home/Carousel";
import CategoryHorizontal from "@/Component/Home/CategoryHorizontal"; // ✅ Thay QuickMenu bằng CategoryHorizontal
import ProductGroup from "@/Component/Home/ProductGroup";
import BlogGroup from "@/Component/Home/BlogGroup";
import BrandOfferGroup from "@/Component/Home/BrandOffGroup";
import Footer from "@/Component/Home/Footer";
import AIChatFloating from "@/Component/Home/AIChatFloating";

import { productService } from "@/Services/ProductService";
import blogService from "@/Services/BlogService";
import brandService from "@/Services/BrandService";

import type { Blog } from "@/Types/blog";
import type { Brand } from "@/Types/brand";
import type { Product } from "@/Type/Product";

/// ✅ Chuẩn hóa đường dẫn ảnh sản phẩm (dùng API File/image)
const mapProductToUI = (p: Product) => ({
  ...p,
  price: p.unitPrice * (1 - p.discount / 100),
  oldPrice: p.discount > 0 ? p.unitPrice : undefined,
  img:
    typeof p.images === "string" && p.images.length > 0
      ? `https://foodecomerceapi.runasp.net/api/File/image?path=${encodeURIComponent(
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
  const [banhProducts, setBanhProducts] = useState<Product[]>([]);
  const [suaProducts, setSuaProducts] = useState<Product[]>([]);
  const [biaProducts, setBiaProducts] = useState<Product[]>([]);
  const [gaoProducts, setGaoProducts] = useState<Product[]>([]);
  const [dauAnProducts, setDauAnProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      productService.getAll(),
      productService.getByCategory("4693d14a-b0fa-4a71-8693-bd3ea4322cd3"), // Rau củ
      productService.getByCategory("7de26305-0653-4d4f-b40b-40284cceee84"), // Bánh
      productService.getByCategory("10926cc4-5cf1-4207-b132-9197ddd7937f"), // Sữa
      productService.getByCategory("78025e59-d7bd-41e1-8a44-3b38fd299782"), // Bia
      productService.getByCategory("5ca471b0-0f40-418b-882f-9d81b73f8d81"), // Gao
      productService.getByCategory("c595ba91-67ab-4671-a9ed-83cf0d986b53"), // Dầu ăn
      blogService.getBlogs(),
      brandService.getBrands(),
    ])
      .then(([allProducts, rauData, banhData, suaData,biaData,gaoData,dauAnData, blogData, brandData]) => {
        setProducts(allProducts);
        setRauProducts(rauData);
        setBanhProducts(banhData);
        setSuaProducts(suaData);
        setBiaProducts(biaData);
        setGaoProducts(gaoData);
        setDauAnProducts(dauAnData);
        setBlogs(blogData);
        setBrands(brandData);
      })
      .catch((err) => console.error("❌ Lỗi khi fetch data:", err))
      .finally(() => setLoading(false));
  }, []);

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
          {/* ✅ Menu ngang động */}
          <CategoryHorizontal />

          {/* 🔁 Carousel */}
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

          {/* 🆕 Sản phẩm mới (ví dụ: rau) */}
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

          {/* 🥬 Rau củ nấm */}
          <ProductGroup
            title="Rau, củ, nấm"
            titleAlign="left"
            titleVariant="boxed"
            badge="RAU"
            products={banhProducts.map(mapProductToUI)}
            loading={loading}
            maxItems={5}
          />

          {/* Sữa */}
          <ProductGroup
            title="Sữa"
            titleVariant="boxed"
            badge="SỮA"
            products={suaProducts.map(mapProductToUI)}
            loading={loading}
            maxItems={5}
          />

          {/* Bia */}
          <ProductGroup
            topBanners={[
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5562/trang-cate-pc_202509301429490138.jpg",
            ]}
            title="BIA"
            badge="NEW"
            products={biaProducts.map(mapProductToUI)}
            loading={loading}
            maxItems={5}
            bgColor="bg-gradient-to-b from-yellow-50 to-yellow-400"
            bottomBanners={[
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5562/freecompress-trang-cate-pc-1_202510301054158760.jpg"
            ]}
            
            showTitle={false}
          />

          {/* Gạo */}
          <ProductGroup
            title="Gạo"
            titleVariant="boxed"
            badge="GẠO"
            products={gaoProducts.map(mapProductToUI)}
            loading={loading}
            maxItems={5}
          />

          {/* Dầu ăn */}
          <ProductGroup
            topBanners={[
              "https://cdnv2.tgdd.vn/bhx-static/bhx/5562/freecompress-trang-cate-pc_202510301637057098.jpg",
            ]}
            title="Dầu ăn"
            badge="DẦU ĂN"
            products={dauAnProducts.map(mapProductToUI)}
            loading={loading}
            maxItems={10}
            bgColor="bg-gradient-to-b from-yellow-50 to-yellow-400"
            showTitle={false}
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

          {/* Footer */}
          <Footer />
          <AIChatFloating />
        </main>
      </div>
    </div>
  );
}
