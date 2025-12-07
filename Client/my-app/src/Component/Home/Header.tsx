"use client";

import { useState, useRef, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import CategorySidebar from "./CategorySidebar";
import { useNavigate, useLocation, Link } from "@tanstack/react-router";
import LocationModal from "../Common/LocationModal";
import AccountSidebar from "../Common/AccountSidebar";
import logo from "@/assets/img/logo.jpg";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import { productService } from "@/Services/ProductService";
import type { Product } from "@/Type/Product";

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationInput, setLocationInput] = useState<string>("");
  const [openAccount, setOpenAccount] = useState(false);

  // 🔎 Search state
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const { totalQuantity, clear } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    clear();
    setOpenAccount(false);
    navigate({ to: "/Dangnhap" });
  };

  // 🧩 Hover xử lý mở/đóng danh mục
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (!isHome) setShowSidebar(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setShowSidebar(false), 150);
  };

  // 🔰 Handle search submit
  const handleSearch = () => {
    if (!searchText.trim()) return;
    navigate({
      to: "/SearchProduct",
      search: { keyword: searchText.trim() },
    });
    setShowSuggestions(false);
  };

  // 🔰 Autocomplete / gợi ý
  useEffect(() => {
    if (!searchText.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        const results = await productService.searchProduct({
          keyWord: searchText,
          pageNumber: 1,
          pageSize: 5, // chỉ show 5 gợi ý
        });
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchText]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 shadow-lg">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => navigate({ to: "/" })}
              >
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Logo"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>

            {/* Danh mục */}
            <div className="hidden sm:flex flex-shrink-0 relative">
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-2 rounded-lg bg-white/15 backdrop-blur-sm px-4 py-2 text-white font-medium transition-all duration-300 hover:bg-white/25 hover:shadow-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span className="text-sm">DANH MỤC</span>
                </button>

                {!isHome && showSidebar && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 animate-in fade-in"
                      onClick={() => setShowSidebar(false)}
                    ></div>

                    <div
                      className="absolute top-full left-0 mt-2 w-64 bg-white shadow-2xl rounded-lg border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2"
                      onMouseEnter={() => setShowSidebar(true)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <CategorySidebar />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-4 relative">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 group-focus-within:text-white transition-colors">
                  <FaSearch size={16} />
                </div>

                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white shadow-md transition-all duration-300"
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  onBlur={() => {
                    // delay để click vào gợi ý trước khi ẩn
                    setTimeout(() => setShowSuggestions(false), 150);
                  }}
                />

                {/* Dropdown gợi ý */}
{showSuggestions && suggestions.length > 0 && (
  <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 mt-1 max-h-80 overflow-y-auto z-50 shadow-lg rounded-lg">
    {suggestions.map((p) => {
      const firstImage = p.images?.split(",")[0] || "/no-image.png";
      const finalPrice = p.discount
        ? Math.round(p.unitPrice * (1 - p.discount / 100))
        : p.unitPrice;

      return (
        <li
          key={p.id}
          className="flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 cursor-pointer transition-colors rounded-lg"
          onClick={() => {
            navigate({ to: `/product/${p.id}` });
            setSearchText("");
            setShowSuggestions(false);
          }}
        >
          <img
            src={firstImage}
            alt={p.name}
            className="w-14 h-14 object-cover rounded-md border border-gray-200"
          />
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-sm font-semibold text-gray-800 line-clamp-2">
              {p.name}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold text-emerald-600">
                {finalPrice.toLocaleString("vi-VN")}đ
              </span>
              {p.discount > 0 && (
                <span className="text-xs line-through text-gray-400">
                  {p.unitPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>
          </div>
          {p.discount > 0 && (
            <span className="text-xs font-bold text-red-500 bg-red-100 px-1 py-0.5 rounded">
              -{p.discount}%
            </span>
          )}
        </li>
      );
    })}
  </ul>
)}

              </div>
            </div>

            {/* Nút phải: Giỏ hàng, vị trí, tài khoản */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/GioHang"
                className="relative p-2.5 rounded-full bg-white/15 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/25 hover:shadow-md"
              >
                <FaShoppingCart size={20} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                    {totalQuantity > 99 ? "99+" : totalQuantity}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setShowLocationModal(true)}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/15 backdrop-blur-sm text-white text-sm font-medium transition-all duration-300 hover:bg-white/25 hover:shadow-md"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="truncate max-w-[120px] text-xs">
                  {locationInput || "Chọn vị trí"}
                </span>
              </button>

              {isAuthenticated && user ? (
                <button
                  onClick={() => setOpenAccount(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/15 backdrop-blur-sm text-white font-medium transition-all duration-300 hover:bg-white/25 hover:shadow-md"
                >
                  <FaUser size={16} />
                  <span className="hidden sm:inline text-sm truncate">
                    {user.userName || user.email}
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/DangKyGmailFlow"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-emerald-600 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <FaUser size={16} />
                    <span className="hidden sm:inline text-sm">Đăng ký</span>
                  </Link>

                  <Link
                    to="/Dangnhap"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-emerald-600 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <FaUser size={16} />
                    <span className="hidden sm:inline text-sm">Đăng nhập</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Sidebar */}
      <AccountSidebar
        open={openAccount}
        onClose={() => setOpenAccount(false)}
        user={user || undefined}
        onLogout={handleLogout}
      />

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onConfirm={(address) => {
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
