import {
  FaHotjar,
  FaDrumstickBite,
  FaLeaf,
  FaWineBottle,
  FaCheese,
  FaBacon,
  FaIceCream,
  FaFish,
  FaBroom,
  FaBaby,
  FaCookieBite,
} from "react-icons/fa";
import { Link } from "@tanstack/react-router";

// ⚡ thêm slug cho từng category để dùng trên URL
const CATS = [
  { name: "Khuyến mãi sốc", slug: "khuyen-mai", icon: <FaHotjar /> },
  {
    name: "Thịt, cá, trứng, hải sản",
    slug: "thit-ca",
    icon: <FaDrumstickBite />,
  },
  { name: "Rau, củ, nấm, trái cây", slug: "rau-cu", icon: <FaLeaf /> },
  { name: "Bia, nước giải khát", slug: "bia-nuoc", icon: <FaWineBottle /> },
  { name: "Sữa các loại", slug: "sua", icon: <FaCheese /> },
  { name: "Gạo, bột, đồ khô", slug: "gao-bot", icon: <FaBacon /> },
  { name: "Kem, sữa chua", slug: "kem", icon: <FaIceCream /> },
  { name: "Thực phẩm đông mát", slug: "dong-mat", icon: <FaFish /> },
  { name: "Vệ sinh nhà cửa", slug: "ve-sinh", icon: <FaBroom /> },
  { name: "Mẹ & bé", slug: "me-be", icon: <FaBaby /> },
  { name: "Bánh kẹo các loại", slug: "banh-keo", icon: <FaCookieBite /> },
];

function CategorySidebar() {
  return (
    <aside className="bg-white shadow-md w-[260px] rounded-lg overflow-hidden">
      <ul>
        {CATS.map((c) => (
          <li key={c.slug}>
            <Link
              to="/category/$category"
              params={{ category: c.slug }}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <span className="text-green-600">{c.icon}</span>
              <span className="text-sm font-medium">{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategorySidebar;
