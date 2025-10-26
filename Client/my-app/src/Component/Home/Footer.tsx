// src/components/common/Footer.tsx
import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  const brands = [
    "MWG",
    "thegioididong",
    "Điện máy XANH",
    "topzone",
    "NHÀ THUỐC AN KHANG",
    "AVA Kids",
    "erablue",
  ];

  return (
    <footer className="bg-[#007e42] text-gray-800 text-sm">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-8 font-medium leading-relaxed">
        <div className="flex flex-row flex-wrap md:flex-nowrap gap-6 items-center text-white whitespace-nowrap overflow-hidden">
          <span>
            Bán hàng 7:00 - 21:30 📞 <b>1900 1908</b>
          </span>
          <span>
            Khiếu nại 7:30 - 21:00 📞 <b>1800 1067</b>
          </span>
        </div>
        <div className="flex flex-row flex-wrap md:flex-nowrap gap-6 items-center text-white whitespace-nowrap overflow-hidden">
          <span className="font-semibold">Cam kết:</span>
          <span>✔ 15.000 sản phẩm</span>
        </div>
      </div>

      {/* Middle links & social */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 bg-white shadow-sm leading-relaxed">
        {/* Link columns */}
        <div className="space-y-2 flex flex-col">
          <p className="font-semibold text-green-700">Công ty</p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Giới thiệu công ty
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Q.trình kiểm soát chất lượng
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Tích điểm QTV/App BHX
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Cần thuê mặt bằng
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Đăng ký chào hàng
          </p>
        </div>
        <div className="space-y-2 flex flex-col">
          <p className="font-semibold text-green-700">Hỗ trợ</p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Mua Phiếu mua hàng
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Hóa đơn điện tử
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Hướng dẫn mua hàng
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Chính sách đổi trả
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Tuyển 6555 việc
          </p>
        </div>
        <div className="space-y-2 flex flex-col">
          <p className="font-semibold text-green-700">Khách hàng</p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Mua sim, thẻ cào
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Chính sách khách hàng
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Chính sách giao hàng
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Hỏi đáp
          </p>
          <p className="hover:text-green-600 cursor-pointer transition truncate">
            Quy chế Web
          </p>
        </div>

        {/* Social & App */}
        <div className="space-y-3 flex flex-col">
          <p className="font-semibold text-green-700">Kết nối</p>
          <div className="flex gap-3">
            <FaFacebookF className="text-blue-600 hover:text-blue-400 transition cursor-pointer" />
            <FaYoutube className="text-red-600 hover:text-red-400 transition cursor-pointer" />
            <FaTiktok className="text-black hover:text-gray-600 transition cursor-pointer" />
            <FaInstagram className="text-pink-500 hover:text-pink-300 transition cursor-pointer" />
          </div>
          <p className="font-semibold text-green-700 mt-2">Tải app</p>
          <div className="flex gap-2 mt-1">
            <img
              src="/google-play-badge.png"
              alt="Google Play"
              className="h-9 cursor-pointer hover:scale-105 transition"
            />
            <img
              src="/app-store-badge.png"
              alt="App Store"
              className="h-9 cursor-pointer hover:scale-105 transition"
            />
          </div>
        </div>

        {/* Certifications */}
        <div className="col-span-2 flex flex-col gap-3 justify-center items-start md:items-end">
          <img
            src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
            alt="Bộ Công Thương"
            className="h-12"
          />
          <img src="/dmca.png" alt="DMCA Protected" className="h-12" />
          <img src="/nca.png" alt="NCA" className="h-12" />
        </div>
      </div>

      {/* Brands */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-3 justify-center bg-green-50 mt-4">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            className="bg-white px-3 py-1 rounded shadow text-green-900 font-semibold cursor-pointer hover:shadow-md transition text-sm"
          >
            {brand}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
