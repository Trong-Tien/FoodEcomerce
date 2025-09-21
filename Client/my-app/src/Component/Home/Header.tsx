import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import CategorySidebar from "./CategorySidebar";
import { useNavigate, useLocation } from "@tanstack/react-router";
import LocationModal from "../Common/LocationModal";
import logo from "@/assets/img/logo.jpg";


function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationInput, setLocationInput] = useState<string>(""); // ✅ chỉ lưu string

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  return (
    <header className="background_header_mobile m-auto w-full fixed inset-x-0 top-0 z-[11] pt-3 bg-gradient-to-r from-[#2E7D32] via-[#4CAF50] to-[#CDDC39]">
      <div className="mx-auto flex max-w-screen-xl items-start justify-between transition-all duration-400 ease-in-out">
        {/* Logo + Danh mục */}
        <div className="flex flex-col justify-between relative">
          <div
            className="icon__logo ml-[22px] mt-[6px] cursor-pointer"
            onClick={() => navigate({ to: "/" })}
          >
            <img
              src={logo} alt="Logo"
              className="h-[60px] w-auto"
            />
          </div>

          <div
            onMouseEnter={() => !isHome && setShowSidebar(true)}
            onMouseLeave={() => !isHome && setShowSidebar(false)}
            className="relative mt-[10px]"
          >
            <button className="flex w-[320px] items-center rounded-t-md bg-[#4CAF50] px-[20px] py-1 text-[16px] text-white cursor-default">
              <span className="relative inline-block mr-2 w-5 h-5">
                <img
                  alt="menu"
                  src="https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/icons/menu_icon.svg"
                  className="w-full h-auto"
                />
              </span>
              DANH MỤC SẢN PHẨM
            </button>

            {!isHome && showSidebar && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-lg border border-gray-200 z-50">
                <CategorySidebar />
              </div>
            )}
          </div>
        </div>

        {/* Search box + Cart */}
        <div className="flex items-center px-15">
          <div className="h-[40px] mt-3 relative flex rounded-md bg-white w-[615px] ml-auto border border-[#4CAF50]">
            <div className="relative w-[44px] text-[#4CAF50] flex items-center justify-center">
              <FaSearch className="text-[#4CAF50]" />
            </div>
            <input
              type="text"
              placeholder="Thịt cá đặt trước giảm đến 37%"
              className="rounded-r-md w-full relative bg-white flex items-center pr-[64px] text-sm text-gray-700 focus:outline-none"
            />
            <a
              className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#4CAF50]"
              href="/GioHang"
            >
              <FaShoppingCart size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div
            id="btn_choose_location"
            onClick={() => setShowLocationModal(true)}
            className="relative mt-3 mr-[16px] flex w-[272px] cursor-pointer items-center justify-start
               bg-white border border-[#4CAF50] rounded-md px-3 py-1.5 min-h-[36px]
               hover:shadow-sm transition"
          >
            {locationInput ? (
              <span className="text-sm text-gray-700 truncate">
                {locationInput}
              </span>
            ) : (
              <div className="flex items-center gap-2">
                {/* icon nhỏ, KHÔNG dùng w-full */}
                <img
                  alt="Select Location"
                  src="https://cdnv2.tgdd.vn/bhx/product-fe/cart/home/_next/public/static/images/unselect-location.svg"
                  className="h-5 w-5 object-contain"
                  onError={(e) => {
                    // nếu ảnh bị chặn/404, fallback sang emoji/icon
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
                <span className="text-sm text-gray-600">
                  Chọn vị trí nhận hàng
                </span>
              </div>
            )}
          </div>

          <div className="flex">
            <a
              className="mt-2 mr-[16px] flex w-fit cursor-pointer items-center rounded-md bg-[#4CAF50] px-2 py-1 text-sm text-white"
              href="/Dangnhap"
            >
              <FaUser className="mr-2" /> Đăng nhập
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Modal nhập vị trí */}
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onConfirm={(address) => {
            // address: { province: string; ward: string; addressDetail: string }
            const parts = [
              address.addressDetail,
              address.ward,
              address.province,
            ].filter(Boolean);
            setLocationInput(parts.join(", "));
            setShowLocationModal(false);
          }}
        />
      )}
    </header>
  );
}

export default Header;
